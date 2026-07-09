// Utility functions for Spotify PKCE Auth Flow

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = 'http://127.0.0.1:5173/callback';
const AUTH_URL = 'https://accounts.spotify.com/authorize';
const TOKEN_URL = 'https://accounts.spotify.com/api/token';

// Scopes dictate what permissions we are asking from the user
const SCOPES = [
  'user-read-private',
  'user-read-email',
  'user-top-read',
  'user-read-currently-playing',
  'user-read-playback-state',
  'playlist-modify-public',
  'playlist-modify-private'
].join(' ');

function generateRandomString(length: number) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier: string) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export async function loginToSpotify() {
  if (!CLIENT_ID) {
    alert("Spotify Client ID is missing. Please add VITE_SPOTIFY_CLIENT_ID to your .env file.");
    return;
  }

  const codeVerifier = generateRandomString(128);
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  // Store the verifier securely in localStorage for the callback phase
  window.localStorage.setItem('spotify_code_verifier', codeVerifier);

  const args = new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: SCOPES,
    redirect_uri: REDIRECT_URI,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge
  });

  window.location.href = `${AUTH_URL}?${args.toString()}`;
}

export async function getToken(code: string) {
  const codeVerifier = window.localStorage.getItem('spotify_code_verifier');

  if (!codeVerifier) {
    throw new Error('Code verifier not found in localStorage');
  }

  const payload = new URLSearchParams({
    client_id: CLIENT_ID,
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: REDIRECT_URI,
    code_verifier: codeVerifier,
  });

  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: payload
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Failed to get token: ${error.error_description}`);
  }

  const data = await response.json();
  
  // Store the access token
  window.localStorage.setItem('spotify_access_token', data.access_token);
  if (data.refresh_token) {
    window.localStorage.setItem('spotify_refresh_token', data.refresh_token);
  }
  
  // Clean up the verifier
  window.localStorage.removeItem('spotify_code_verifier');

  return data.access_token;
}

export function getAccessToken() {
  return window.localStorage.getItem('spotify_access_token');
}

export function logout() {
  window.localStorage.removeItem('spotify_access_token');
  window.localStorage.removeItem('spotify_refresh_token');
  window.location.href = '/';
}

export async function getUserProfile() {
  const token = getAccessToken();
  if (!token) throw new Error('No access token');

  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!response.ok) {
    let errMsg = `HTTP ${response.status}`;
    try {
      const errBody = await response.json();
      errMsg = errBody.error?.message || JSON.stringify(errBody);
    } catch(e) {}

    if (response.status === 401) {
      logout();
      return;
    }
    throw new Error(errMsg);
  }

  return response.json();
}
