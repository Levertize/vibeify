import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getToken } from '../lib/spotify';

export default function Callback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      console.error('Spotify Auth Error:', error);
      navigate('/');
      return;
    }

    if (code) {
      getToken(code)
        .then(() => {
          navigate('/dashboard');
        })
        .catch(err => {
          console.error('Error fetching token:', err);
          alert('Failed to authenticate with Spotify. Please ensure your Client ID is correct.');
          navigate('/');
        });
    } else {
      navigate('/');
    }
  }, [searchParams, navigate]);

  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: '18px', fontWeight: 500, letterSpacing: '0.05em' }}>
        Authenticating with Spotify...
      </p>
    </div>
  );
}
