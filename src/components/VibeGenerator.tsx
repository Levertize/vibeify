import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Key, X } from 'lucide-react';

interface SliderProps {
  label: string;
  value: number;
  setValue: (val: number) => void;
  leftText: string;
  rightText: string;
}

const VibeSlider = ({ label, value, setValue, leftText, rightText }: SliderProps) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <label style={{ fontWeight: 600, fontSize: '16px', letterSpacing: '-0.01em' }}>{label}</label>
        <span style={{ fontSize: '14px', color: 'var(--color-accent-primary)', fontWeight: 500 }}>{value}%</span>
      </div>
      
      <div style={{ position: 'relative', padding: '12px 0' }}>
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={value} 
          onChange={(e) => setValue(Number(e.target.value))}
          className="vibe-slider"
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--color-text-secondary)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        <span>{leftText}</span>
        <span>{rightText}</span>
      </div>
    </div>
  );
};

export default function VibeGenerator() {
  const [vibe, setVibe] = useState(50);
  const [energy, setEnergy] = useState(50);
  const [acousticness, setAcousticness] = useState(50);
  const [generatorMode, setGeneratorMode] = useState<'manual' | 'ai'>('manual');
  const [showApiModal, setShowApiModal] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [danceability, setDanceability] = useState(80);
  const [valence, setValence] = useState(60);

  return (
    <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
      <div className="glass-panel" style={{ padding: '40px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '8px' }}>Vibe Generator</h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '16px' }}>Craft your perfect sonic atmosphere.</p>
          </div>

          <div style={{ display: 'flex', background: 'var(--color-bg-secondary)', borderRadius: '999px', padding: '4px' }}>
            <button
              onClick={() => setGeneratorMode('manual')}
              style={{
                padding: '8px 24px',
                borderRadius: '999px',
                border: 'none',
                background: generatorMode === 'manual' ? 'var(--color-surface-glass)' : 'transparent',
                color: generatorMode === 'manual' ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: generatorMode === 'manual' ? '0 2px 8px rgba(0,0,0,0.2)' : 'none'
              }}
            >
              Manual
            </button>
            <button
              onClick={() => setGeneratorMode('ai')}
              style={{
                padding: '8px 24px',
                borderRadius: '999px',
                border: 'none',
                background: generatorMode === 'ai' ? 'var(--color-surface-glass)' : 'transparent',
                color: generatorMode === 'ai' ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: generatorMode === 'ai' ? '0 2px 8px rgba(0,0,0,0.2)' : 'none'
              }}
            >
              AI Prompt
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {generatorMode === 'manual' ? (
            <motion.div
              key="manual"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
            >
              <VibeSlider label="Acousticness" value={acousticness} setValue={setAcousticness} leftText="Electronic" rightText="Acoustic" />
              <VibeSlider label="Danceability" value={danceability} setValue={setDanceability} leftText="Chill" rightText="Upbeat" />
              <VibeSlider label="Energy" value={energy} setValue={setEnergy} leftText="Relaxing" rightText="Intense" />
              <VibeSlider label="Valence (Mood)" value={valence} setValue={setValence} leftText="Melancholic" rightText="Happy" />

              <div style={{ marginTop: '16px' }}>
                <button style={{
                  width: '100%',
                  background: 'var(--color-text-primary)',
                  color: 'var(--color-bg-primary)',
                  border: 'none',
                  padding: '16px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  transition: 'transform 0.2s ease, opacity 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <Sparkles size={20} />
                  Generate Playlist
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="ai"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
            >
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your perfect playlist..."
                style={{
                  width: '100%',
                  minHeight: '120px',
                  background: 'var(--color-bg-secondary)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: '12px',
                  padding: '16px',
                  color: 'var(--color-text-primary)',
                  fontSize: '16px',
                  resize: 'vertical',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
              />

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['Rainy Day Lo-Fi', 'Late Night Drive', 'Cyberpunk Focus'].map((chip) => (
                  <button
                    key={chip}
                    onClick={() => setPrompt(chip)}
                    style={{
                      background: 'transparent',
                      border: '1px solid var(--color-border-subtle)',
                      color: 'var(--color-text-secondary)',
                      padding: '6px 16px',
                      borderRadius: '999px',
                      fontSize: '14px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-text-primary)';
                      e.currentTarget.style.color = 'var(--color-text-primary)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-border-subtle)';
                      e.currentTarget.style.color = 'var(--color-text-secondary)';
                    }}
                  >
                    {chip}
                  </button>
                ))}
              </div>

              <div style={{ marginTop: '8px' }}>
                <button 
                  onClick={() => setShowApiModal(true)}
                  style={{
                  width: '100%',
                  background: 'var(--color-text-primary)',
                  color: 'var(--color-bg-primary)',
                  border: 'none',
                  padding: '16px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  transition: 'transform 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <Sparkles size={20} />
                  Generate with AI
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showApiModal && (
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
                maxWidth: '400px',
                width: '100%',
                padding: '32px',
                position: 'relative'
              }}
            >
              <button 
                onClick={() => setShowApiModal(false)}
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

              <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: 'var(--color-bg-secondary)', padding: '12px', borderRadius: '50%' }}>
                  <Key size={24} color="var(--color-accent-primary)" />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 600 }}>API Configuration</h3>
              </div>

              <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', lineHeight: 1.6, marginBottom: '24px' }}>
                To unlock AI-powered generation, please provide your personal API key. Your key is stored locally in your browser and never sent to our servers.
              </p>

              <input
                type="password"
                placeholder="sk-..."
                style={{
                  width: '100%',
                  background: 'var(--color-bg-secondary)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  color: 'var(--color-text-primary)',
                  fontSize: '16px',
                  marginBottom: '24px',
                  outline: 'none',
                  fontFamily: 'monospace'
                }}
              />

              <button 
                onClick={() => setShowApiModal(false)}
                style={{
                  width: '100%',
                  background: 'var(--color-text-primary)',
                  color: 'var(--color-bg-primary)',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'opacity 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              >
                Save Configuration
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
