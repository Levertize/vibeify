import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, User, Music, Sparkles } from 'lucide-react';
import TopStats from './TopStats';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'stats' | 'generator'>('stats');

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
          alignItems: 'center',
          gap: '24px',
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
          
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '8px',
            background: 'var(--color-border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1
          }}>
            <Play size={32} color="var(--color-text-muted)" />
          </div>
          <div style={{ zIndex: 1 }}>
            <p style={{ color: 'var(--color-accent-primary)', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-accent-primary)', boxShadow: '0 0 8px var(--color-accent-primary)' }}/>
              Now Playing
            </p>
            <h3 style={{ fontSize: '18px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>Midnight City</h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>M83</p>
          </div>
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
              className="glass-panel"
              style={{ padding: '48px', textAlign: 'center', color: 'var(--color-text-muted)' }}
            >
              [ Vibe Generator Sliders will go here ]
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </motion.div>
  );
}
