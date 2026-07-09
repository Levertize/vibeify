import { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getToken } from '../lib/spotify';

export default function Callback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const hasRequested = useRef(false);

  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      console.error('Spotify Auth Error:', error);
      navigate('/');
      return;
    }

    if (code) {
      if (hasRequested.current) return;
      hasRequested.current = true;

      getToken(code)
        .then(() => {
          navigate('/dashboard');
        })
        .catch(err => {
          console.error('Error fetching token:', err);
          setErrorMsg(`Spotify Error: ${err.message}`);
        });
    } else {
      navigate('/');
    }
  }, [searchParams, navigate]);

  if (errorMsg) {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center' }}>
        <h1 style={{ color: 'var(--color-status-error)', marginBottom: '16px' }}>Authentication Failed</h1>
        <p style={{ color: 'var(--color-text-primary)', marginBottom: '24px', maxWidth: '400px' }}>{errorMsg}</p>
        <button 
          onClick={() => navigate('/')}
          style={{ padding: '12px 24px', background: 'var(--color-text-primary)', color: 'var(--color-background)', border: 'none', borderRadius: '30px', fontWeight: 600, cursor: 'pointer' }}
        >
          Back to Login
        </button>
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: '18px', fontWeight: 500, letterSpacing: '0.05em' }}>
        Authenticating with Spotify...
      </p>
    </div>
  );
}
