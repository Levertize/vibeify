import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, User, Music, Sparkles, Mic2 } from 'lucide-react';
import TopStats from './TopStats';
import VibeGenerator from './VibeGenerator';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'stats' | 'generator'>('stats');
  const [showLyrics, setShowLyrics] = useState(false);
  const [lyricsSize, setLyricsSize] = useState<'minimal' | 'standard' | 'karaoke'>('minimal');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        width: '100%',
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '24px 0',
      }}
    >
      {/* --- Profile Header & Now Playing Shell --- */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px'
      }}>
        
        {/* Dummy Profile Card */}
        <div className="glass-panel" style={{
          padding: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '24px'
        }}>
          <div style={{
            width: '96px',
            height: '96px',
            borderRadius: '50%',
            background: 'var(--color-border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <User size={40} color="var(--color-text-muted)" />
          </div>
          <div>
            <h2 style={{ fontSize: '32px', letterSpacing: '-0.02em', marginBottom: '4px' }}>Alex Doe</h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
              <span style={{ color: 'var(--color-accent-primary)', fontWeight: 500 }}>PREMIUM</span> • 1.2K Followers
            </p>
          </div>
        </div>

        {/* Dummy Now Playing Card */}
        <div className="glass-panel" style={{
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle glow behind album art */}
          <div style={{
            position: 'absolute',
            left: '24px',
            top: '24px',
            width: '80px',
            height: '80px',
            background: 'var(--color-accent-primary)',
            filter: 'blur(30px)',
            opacity: 0.2,
            zIndex: 0
          }}/>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '8px',
              background: 'var(--color-border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
              flexShrink: 0
            }}>
              <Play size={32} color="var(--color-text-muted)" />
            </div>
            
            <div style={{ zIndex: 1, flexGrow: 1 }}>
              <p style={{ color: 'var(--color-accent-primary)', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-accent-primary)', boxShadow: '0 0 8px var(--color-accent-primary)' }}/>
                Now Playing
              </p>
              <h3 style={{ fontSize: '18px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '180px' }}>Midnight City</h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>M83</p>
            </div>

            <motion.button 
              onClick={() => setShowLyrics(!showLyrics)}
              whileHover={{ scale: 1.1, color: 'var(--color-accent-primary)' }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: showLyrics ? 'var(--color-surface-glass)' : 'transparent',
                color: showLyrics ? 'var(--color-accent-primary)' : 'var(--color-text-muted)',
                border: showLyrics ? '1px solid var(--color-accent-primary)' : '1px solid transparent',
                padding: '10px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                zIndex: 1
              }}
              title="Toggle Lyrics"
            >
              <Mic2 size={20} />
            </motion.button>
          </div>

          {/* Expandable Lyrics Panel */}
          <AnimatePresence>
            {showLyrics && (
              <motion.div
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: 'auto', opacity: 1, marginTop: '24px' }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                style={{ overflow: 'hidden', zIndex: 1 }}
              >
                <div style={{ 
                  background: 'var(--color-bg-secondary)', 
                  borderRadius: '12px', 
                  padding: '16px',
                  border: '1px solid var(--color-border-subtle)',
                  maxHeight: lyricsSize === 'karaoke' ? '500px' : lyricsSize === 'standard' ? '300px' : '150px',
                  overflowY: 'auto',
                  transition: 'max-height 0.4s ease'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
                    {(['minimal', 'standard', 'karaoke'] as const).map((size) => (
                      <button
                        key={size}
                        onClick={() => setLyricsSize(size)}
                        style={{
                          background: lyricsSize === size ? 'var(--color-accent-primary)' : 'transparent',
                          color: lyricsSize === size ? '#000' : 'var(--color-text-secondary)',
                          border: `1px solid ${lyricsSize === size ? 'var(--color-accent-primary)' : 'var(--color-border-subtle)'}`,
                          padding: '4px 12px',
                          borderRadius: '999px',
                          fontSize: '12px',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>

                  <p style={{ 
                    color: 'var(--color-text-muted)', 
                    fontSize: lyricsSize === 'karaoke' ? '20px' : lyricsSize === 'standard' ? '16px' : '14px', 
                    lineHeight: lyricsSize === 'karaoke' ? 2.5 : 2, 
                    textAlign: 'center',
                    transition: 'all 0.3s ease'
                  }}>
                    <span style={{ 
                      color: 'var(--color-text-primary)', 
                      fontWeight: 600, 
                      fontSize: lyricsSize === 'karaoke' ? '24px' : lyricsSize === 'standard' ? '18px' : '16px', 
                      display: 'block', 
                      textShadow: '0 0 12px rgba(255,255,255,0.4)',
                      transition: 'all 0.3s ease'
                    }}>
                      Waiting in a car
                    </span>
                    Waiting for a ride in the dark
                    <br />
                    The night city grows
                    <br />
                    Look at the horizon glow
                    <br />
                    <br />
                    (City lights reflecting in your eyes)
                    <br />
                    (Synth pop dreams and neon skies)
                    <br />
                    We can own the night
                    <br />
                    We can make it right
                    <br />
                    Just drive...
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>

      {/* --- Navigation Tabs --- */}
      <div style={{
        display: 'flex',
        gap: '8px',
        background: 'var(--color-surface-glass)',
        padding: '6px',
        borderRadius: '999px',
        width: 'fit-content',
        border: '1px solid var(--color-border-subtle)'
      }}>
        <button
          onClick={() => setActiveTab('stats')}
          style={{
            background: activeTab === 'stats' ? 'var(--color-border-subtle)' : 'transparent',
            color: activeTab === 'stats' ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
            border: 'none',
            padding: '10px 24px',
            borderRadius: '999px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease'
          }}
        >
          <Music size={16} /> Top Stats
        </button>
        <button
          onClick={() => setActiveTab('generator')}
          style={{
            background: activeTab === 'generator' ? 'var(--color-border-subtle)' : 'transparent',
            color: activeTab === 'generator' ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
            border: 'none',
            padding: '10px 24px',
            borderRadius: '999px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease'
          }}
        >
          <Sparkles size={16} /> Vibe Generator
        </button>
      </div>

      {/* --- Main Content Area --- */}
      <div style={{ minHeight: '50vh' }}>
        <AnimatePresence mode="wait">
          {activeTab === 'stats' ? (
            <motion.div
              key="stats"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              style={{ width: '100%' }}
            >
              <TopStats />
            </motion.div>
          ) : (
            <motion.div
              key="generator"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              style={{ width: '100%' }}
            >
              <VibeGenerator />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </motion.div>
  );
}
