import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Play, Sparkles, Quote, AudioWaveform } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Login() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. The Main Horizontal Scroll Tween based on the 400vh wrapper
    const horizontalTween = gsap.to(trackRef.current, {
      x: () => -(trackRef.current!.scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });

    // 2. Parallax & Staggered Animations using containerAnimation
    
    // SLIDE 1 Parallax
    gsap.to('.hero-title-bg-1', {
      x: 300, // moves slower than scroll
      ease: 'none',
      scrollTrigger: {
        trigger: '.slide-1',
        containerAnimation: horizontalTween,
        start: 'left center',
        end: 'right left',
        scrub: true,
      }
    });

    gsap.to('.hero-title-bg-2', {
      x: -300, // moves in opposite direction
      ease: 'none',
      scrollTrigger: {
        trigger: '.slide-1',
        containerAnimation: horizontalTween,
        start: 'left center',
        end: 'right left',
        scrub: true,
      }
    });

    gsap.to('.hero-title-fg', {
      x: -150, // moves faster than scroll
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '.slide-1',
        containerAnimation: horizontalTween,
        start: 'center center',
        end: 'right left',
        scrub: true,
      }
    });

    // SLIDE 2 Parallax & Entrance
    gsap.from('.lyric-card', {
      y: 150,
      opacity: 0,
      rotation: 5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.slide-2',
        containerAnimation: horizontalTween,
        start: 'left right',
        end: 'center center',
        scrub: 1,
      }
    });
    
    gsap.to('.slide-2-bg-text', {
      x: -600,
      ease: 'none',
      scrollTrigger: {
        trigger: '.slide-2',
        containerAnimation: horizontalTween,
        start: 'left right',
        end: 'right left',
        scrub: true,
      }
    });

    // SLIDE 3 Parallax
    gsap.from('.ai-orb', {
      scale: 0,
      rotation: -180,
      opacity: 0,
      ease: 'back.out(1.5)',
      scrollTrigger: {
        trigger: '.slide-3',
        containerAnimation: horizontalTween,
        start: 'left right',
        end: 'center center',
        scrub: 1,
      }
    });
    
    gsap.from('.slide-3-text', {
      y: 100,
      opacity: 0,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.slide-3',
        containerAnimation: horizontalTween,
        start: 'left center',
        end: 'center center',
        scrub: true,
      }
    });

    // SLIDE 4 CTA
    gsap.from('.cta-content', {
      scale: 0.8,
      y: 50,
      opacity: 0,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.slide-4',
        containerAnimation: horizontalTween,
        start: 'left right',
        end: 'center center',
        scrub: 1,
      }
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} style={{ height: '400vh', position: 'relative', background: 'var(--color-background)' }}>
      {/* Global Ambient Noise Overlay */}
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
        opacity: 0.03, pointerEvents: 'none', zIndex: 10
      }} />

      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        <div 
          ref={trackRef} 
          style={{ 
            display: 'flex', 
            width: '400vw', 
            height: '100%',
            willChange: 'transform'
          }}
        >
        
        {/* SLIDE 1: Hero */}
        <div className="slide slide-1" style={{ position: 'relative', width: '100vw', height: '100%', flexShrink: 0, overflow: 'hidden' }}>
          {/* Background Massive Text */}
          <div className="hero-title-bg-1 text-massive text-outline" style={{ position: 'absolute', top: '5%', left: '-5%', whiteSpace: 'nowrap', opacity: 0.2 }}>
            VIBEIFY VIBEIFY VIBEIFY
          </div>
          <div className="hero-title-bg-2 text-massive text-outline" style={{ position: 'absolute', bottom: '5%', right: '-15%', whiteSpace: 'nowrap', opacity: 0.2 }}>
            MUSIC REDEFINED
          </div>

          <div className="hero-title-fg" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: '8vw' }}>
            <h1 className="text-massive text-gradient" style={{ margin: 0 }}>
              FEEL
            </h1>
            <h1 className="text-massive" style={{ margin: 0, color: 'var(--color-accent-primary)', textShadow: '0 0 80px rgba(29,185,84,0.3)' }}>
              THE MUSIC.
            </h1>
          </div>
        </div>

        {/* SLIDE 2: Lyrics Hook */}
        <div className="slide slide-2" style={{ position: 'relative', width: '100vw', height: '100%', flexShrink: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="slide-2-bg-text text-massive text-outline" style={{ position: 'absolute', top: '35%', left: '80vw', whiteSpace: 'nowrap', opacity: 0.1 }}>
            WORDS THAT MATTER
          </div>

          <div className="lyric-card glass-card-premium" style={{ width: '80%', maxWidth: '900px', padding: 'clamp(40px, 6vw, 80px)', position: 'relative', zIndex: 2 }}>
            <Quote size={48} color="var(--color-accent-primary)" style={{ marginBottom: '32px', opacity: 0.5 }} />
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 4rem)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.2, color: '#fff', marginBottom: '40px' }}>
              "Waiting in a car, waiting for a ride in the dark..."
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(45deg, #444, #111)', border: '1px solid rgba(255,255,255,0.1)' }} />
              <div>
                <h4 style={{ fontSize: '20px', fontWeight: 600, margin: 0, letterSpacing: '-0.02em' }}>Night Drive</h4>
                <p style={{ fontSize: '14px', color: 'var(--color-accent-primary)', margin: 0, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>Late Night Vibes</p>
              </div>
            </div>
          </div>
        </div>

        {/* SLIDE 3: AI Generator */}
        <div className="slide slide-3" style={{ position: 'relative', width: '100vw', height: '100%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Abstract background glow */}
          <div style={{ position: 'absolute', top: '20%', left: '30%', width: '30vw', height: '30vw', background: 'radial-gradient(circle, rgba(29,185,84,0.15) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(80px)' }} />
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(40px, 8vw, 120px)', width: '90%', maxWidth: '1400px', flexWrap: 'wrap' }}>
            <div className="ai-orb" style={{ 
              width: 'clamp(250px, 25vw, 450px)', 
              height: 'clamp(250px, 25vw, 450px)', 
              borderRadius: '50%', 
              background: 'linear-gradient(135deg, rgba(29,185,84,0.15) 0%, rgba(0,0,0,0) 100%)',
              border: '1px solid rgba(29,185,84,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: 'inset 0 0 100px rgba(29,185,84,0.1), 0 0 100px rgba(29,185,84,0.15)',
              position: 'relative'
            }}>
              <Sparkles size={80} color="var(--color-accent-primary)" />
              {/* Orbiting rings */}
              <div style={{ position: 'absolute', width: '120%', height: '120%', borderRadius: '50%', border: '1px dashed rgba(29,185,84,0.2)', animation: 'spin 20s linear infinite' }} />
              <div style={{ position: 'absolute', width: '140%', height: '140%', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)', animation: 'spin 30s linear infinite reverse' }} />
            </div>

            <div className="slide-3-text" style={{ flex: 1, minWidth: '300px' }}>
              <h2 style={{ fontSize: 'clamp(3rem, 6vw, 6.5rem)', fontWeight: 900, lineHeight: 0.95, marginBottom: '32px', letterSpacing: '-0.04em' }}>
                AI-POWERED<br/><span className="text-accent-gradient">CURATION.</span>
              </h2>
              <p style={{ fontSize: '22px', color: 'var(--color-text-secondary)', fontWeight: 300, maxWidth: '450px' }}>
                Describe your mood in natural language, and let our intelligence build the perfect soundtrack for your exact moment in time.
              </p>
            </div>
          </div>
        </div>

        {/* SLIDE 4: Call to Action */}
        <div className="slide slide-4" style={{ position: 'relative', width: '100vw', height: '100%', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          
          {/* Giant Background Waves */}
          <AudioWaveform size={800} color="rgba(29,185,84,0.03)" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 0 }} />

          <div className="cta-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
            <h1 style={{ fontSize: 'clamp(4rem, 8vw, 10rem)', fontWeight: 900, letterSpacing: '-0.05em', marginBottom: '60px', textAlign: 'center', lineHeight: 0.9 }}>
              YOUR VIBE.<br/>YOUR RULES.
            </h1>
            <button
              onClick={() => navigate('/dashboard')}
              style={{
                background: 'var(--color-text-primary)',
                color: '#000',
                border: 'none',
                padding: '24px 64px',
                borderRadius: '60px',
                fontSize: '24px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
              }}
              onMouseEnter={(e) => { 
                e.currentTarget.style.transform = 'translateY(-8px)'; 
                e.currentTarget.style.boxShadow = '0 30px 60px rgba(29, 185, 84, 0.3)'; 
                e.currentTarget.style.background = 'var(--color-accent-primary)';
              }}
              onMouseLeave={(e) => { 
                e.currentTarget.style.transform = 'translateY(0)'; 
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)'; 
                e.currentTarget.style.background = 'var(--color-text-primary)';
              }}
              onMouseDown={(e) => e.currentTarget.style.transform = 'translateY(4px)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
            >
              Enter Dashboard
              <div style={{ background: '#000', color: '#fff', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Play fill="currentColor" size={20} style={{ marginLeft: '4px' }} />
              </div>
            </button>
          </div>
        </div>
      </div>
      </div>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
