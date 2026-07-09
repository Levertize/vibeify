import { motion } from 'framer-motion';

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
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', textAlign: 'left' }}>
      
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

    </div>
  );
}
