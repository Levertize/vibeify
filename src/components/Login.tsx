import { motion } from 'framer-motion';
import { loginToSpotify } from '../lib/spotify';

export default function Login() {
  const handleLogin = () => {
    loginToSpotify();
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      flexGrow: 1,
      width: '100%',
      padding: '24px',
      position: 'relative'
    }}>
      
      {/* Subtle Spotlight/Glow in the center */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60vw',
          height: '60vw',
          background: 'radial-gradient(circle, var(--color-accent-primary) 0%, transparent 70%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div style={{ zIndex: 1, textAlign: 'center' }}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(48px, 8vw, 96px)',
            letterSpacing: '-0.04em',
            marginBottom: '16px',
            color: 'var(--color-text-primary)'
          }}
        >
          VibeIfy.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: 'var(--color-text-secondary)',
            marginBottom: '48px',
            letterSpacing: '-0.01em'
          }}
        >
          Experience your sound. Differently.
        </motion.p>

        <motion.button
          onClick={loginToSpotify}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 32px rgba(29, 185, 84, 0.3)' }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{
            background: 'var(--color-surface-glass)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid var(--color-border-subtle)',
            color: 'var(--color-text-primary)',
            padding: '16px 32px',
            borderRadius: '999px',
            fontSize: '16px',
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            margin: '0 auto',
            outline: 'none',
          }}
        >
          <img src="/spotify-logo.svg" alt="Spotify Logo" width="24" height="24" style={{ filter: 'drop-shadow(0px 2px 8px rgba(29, 185, 84, 0.4))' }} />
          Connect with Spotify
        </motion.button>
      </div>
    </div>
  );
}
