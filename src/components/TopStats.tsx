import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, X, Receipt } from 'lucide-react';

const topArtists = [
  { id: 1, name: 'Synthwave Dreams', image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=150&h=150' },
  { id: 2, name: 'Midnight Echo', image: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f5f924?auto=format&fit=crop&q=80&w=150&h=150' },
  { id: 3, name: 'Neon City', image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=80&w=150&h=150' },
  { id: 4, name: 'Astral Projection', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=150&h=150' },
];

const topTracks = [
  { id: 1, title: 'Lost in the Void', artist: 'Synthwave Dreams', album: 'Neon Nights', duration: '4:12', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=64&h=64' },
  { id: 2, title: 'Cybernetic Love', artist: 'Midnight Echo', album: 'Future Past', duration: '3:45', image: 'https://images.unsplash.com/photo-1518972553047-92040182ceba?auto=format&fit=crop&q=80&w=64&h=64' },
  { id: 3, title: 'Holographic', artist: 'Neon City', album: 'Digital Love', duration: '5:01', image: 'https://images.unsplash.com/photo-1614613535808-32a2a075d045?auto=format&fit=crop&q=80&w=64&h=64' },
  { id: 4, title: 'Starlight Orbit', artist: 'Astral Projection', album: 'Space Odyssey', duration: '3:20', image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=64&h=64' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
};

export default function TopStats() {
  const [showRoast, setShowRoast] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', textAlign: 'left', position: 'relative' }}>
      
      {/* Top Actions Bar */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
        <motion.button
          onClick={() => setShowReceipt(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: 'var(--color-surface-glass)',
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-border-subtle)',
            padding: '10px 20px',
            borderRadius: '999px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Receipt size={16} />
          Get Receipt
        </motion.button>

        <motion.button
          onClick={() => setShowRoast(true)}
          whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255, 69, 58, 0.4)' }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: 'linear-gradient(135deg, #ff453a 0%, #ff9f0a 100%)',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '999px',
            fontSize: '14px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 12px rgba(255, 69, 58, 0.2)'
          }}
        >
          <Flame size={16} />
          Roast My Taste
        </motion.button>
      </div>

      {/* Top Artists Section */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '24px', letterSpacing: '-0.02em' }}>Your Top Artists</h3>
          <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)', background: 'var(--color-border-subtle)', padding: '4px 12px', borderRadius: '999px' }}>
            Last 4 Weeks
          </span>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '24px' }}
        >
          {topArtists.map((artist) => (
            <motion.div 
              key={artist.id} 
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
            >
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                border: '2px solid transparent',
                transition: 'border-color 0.2s ease'
              }}>
                <img src={artist.image} alt={artist.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <p style={{ fontWeight: 600, fontSize: '14px', textAlign: 'center' }}>{artist.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Top Tracks Section */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '24px', letterSpacing: '-0.02em' }}>Your Top Tracks</h3>
          <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)', background: 'var(--color-border-subtle)', padding: '4px 12px', borderRadius: '999px' }}>
            Last 4 Weeks
          </span>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="glass-panel"
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          {topTracks.map((track, index) => (
            <motion.div 
              key={track.id}
              variants={itemVariants}
              whileHover={{ backgroundColor: 'var(--color-surface-glass)' }}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '16px 24px',
                gap: '16px',
                borderBottom: index !== topTracks.length - 1 ? '1px solid var(--color-border-subtle)' : 'none',
                transition: 'background-color 0.2s ease',
                cursor: 'pointer'
              }}
            >
              <div style={{ width: '24px', color: 'var(--color-text-muted)', fontSize: '14px', fontWeight: 600 }}>
                {index + 1}
              </div>
              <img 
                src={track.image} 
                alt={track.album} 
                style={{ width: '48px', height: '48px', borderRadius: '4px', objectFit: 'cover' }} 
              />
              <div style={{ flexGrow: 1 }}>
                <p style={{ fontWeight: 600, fontSize: '16px', color: 'var(--color-text-primary)' }}>{track.title}</p>
                <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>{track.artist}</p>
              </div>
              <div style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>
                {track.duration}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* AI Roast Modal */}
      <AnimatePresence>
        {showRoast && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(10px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="glass-panel"
              style={{
                maxWidth: '500px',
                width: '100%',
                padding: '40px',
                position: 'relative',
                background: 'linear-gradient(180deg, rgba(30, 10, 10, 0.9) 0%, rgba(10, 10, 10, 0.9) 100%)',
                border: '1px solid rgba(255, 69, 58, 0.3)',
                boxShadow: '0 24px 64px rgba(255, 69, 58, 0.15)'
              }}
            >
              <button 
                onClick={() => setShowRoast(false)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--color-text-muted)',
                  cursor: 'pointer'
                }}
              >
                <X size={24} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <div style={{ background: 'rgba(255,69,58,0.2)', padding: '12px', borderRadius: '50%' }}>
                  <Flame size={24} color="#ff453a" />
                </div>
                <h2 style={{ fontSize: '24px', letterSpacing: '-0.02em', color: '#fff' }}>Vibe Check Failed.</h2>
              </div>

              <p style={{ color: 'var(--color-text-secondary)', fontSize: '16px', lineHeight: 1.6, fontStyle: 'italic' }}>
                "Oh wow, another 'Synthwave' phase. Do you actually listen to the music, or do you just leave it on so you can pretend you're driving a DeLorean through a neon grid? Because your top tracks scream 'I bought a mechanical keyboard and now I make it my whole personality.' 💀"
              </p>
              
              <div style={{ marginTop: '32px', textAlign: 'center' }}>
                <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Generated by VibeIfy AI
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shareable Receipt Modal */}
      <AnimatePresence>
        {showReceipt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(10px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{
                maxWidth: '350px',
                width: '100%',
                background: '#f4f4f4',
                color: '#111',
                padding: '32px 24px',
                fontFamily: '"Courier New", Courier, monospace',
                position: 'relative',
                boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 95% 98%, 90% 100%, 85% 98%, 80% 100%, 75% 98%, 70% 100%, 65% 98%, 60% 100%, 55% 98%, 50% 100%, 45% 98%, 40% 100%, 35% 98%, 30% 100%, 25% 98%, 20% 100%, 15% 98%, 10% 100%, 5% 98%, 0 100%)'
              }}
            >
              <button 
                onClick={() => setShowReceipt(false)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'transparent',
                  border: 'none',
                  color: '#999',
                  cursor: 'pointer'
                }}
              >
                <X size={24} />
              </button>

              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>VIBEIFY RECEIPT</h2>
                <p style={{ fontSize: '12px', borderBottom: '1px dashed #ccc', paddingBottom: '16px' }}>ORDER #0001 FOR ALEX DOE</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px', fontSize: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, borderBottom: '1px dashed #ccc', paddingBottom: '8px' }}>
                  <span>QTY ITEM</span>
                  <span>AMT</span>
                </div>
                {topTracks.map((track, index) => (
                  <div key={track.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {String(index + 1).padStart(2, '0')} {track.title.toUpperCase()}
                    </span>
                    <span>{track.duration}</span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px dashed #ccc', paddingTop: '16px', textAlign: 'center', fontSize: '12px' }}>
                <p style={{ marginBottom: '8px' }}>ITEM COUNT: {topTracks.length}</p>
                <p>TOTAL VIBES: 100%</p>
                <div style={{ marginTop: '24px' }}>
                  <p>THANK YOU FOR LISTENING!</p>
                  <p>vibeify.app</p>
                </div>
                
                {/* Barcode Mock */}
                <div style={{ marginTop: '16px', fontSize: '32px', letterSpacing: '-2px', fontFamily: 'monospace', opacity: 0.8 }}>
                  |||| ||| || ||||| | |||
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
