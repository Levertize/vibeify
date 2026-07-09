import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, PlayCircle } from 'lucide-react';

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
  const [acousticness, setAcousticness] = useState(20);
  const [danceability, setDanceability] = useState(80);
  const [energy, setEnergy] = useState(85);
  const [valence, setValence] = useState(60);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', textAlign: 'left', maxWidth: '800px', margin: '0 auto' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '32px', letterSpacing: '-0.02em', marginBottom: '8px' }}>Craft Your Vibe</h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '16px' }}>Adjust the sliders below to generate a custom playlist tailored to your exact mood.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-panel" 
        style={{ padding: '48px' }}
      >
        <VibeSlider 
          label="Acousticness" 
          value={acousticness} 
          setValue={setAcousticness} 
          leftText="Electronic" 
          rightText="Acoustic" 
        />
        <VibeSlider 
          label="Danceability" 
          value={danceability} 
          setValue={setDanceability} 
          leftText="Chill" 
          rightText="Upbeat" 
        />
        <VibeSlider 
          label="Energy" 
          value={energy} 
          setValue={setEnergy} 
          leftText="Relaxing" 
          rightText="Intense" 
        />
        <VibeSlider 
          label="Valence (Mood)" 
          value={valence} 
          setValue={setValence} 
          leftText="Melancholic" 
          rightText="Happy" 
        />

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '48px' }}>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 24px rgba(29, 185, 84, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'linear-gradient(135deg, var(--color-accent-primary) 0%, #179143 100%)',
              color: '#000',
              border: 'none',
              padding: '16px 48px',
              borderRadius: '999px',
              fontSize: '16px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 8px 32px rgba(29, 185, 84, 0.2)'
            }}
          >
            <Sparkles size={20} />
            Generate Playlist
          </motion.button>
        </div>
      </motion.div>

    </div>
  );
}
