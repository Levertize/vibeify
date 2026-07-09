import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Play, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Login() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Determine the total width we need to move horizontally
    const totalWidth = trackRef.current!.scrollWidth - window.innerWidth;

    // 1. The Main Horizontal Scroll Tween
    const horizontalTween = gsap.to(trackRef.current, {
      x: -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1, // Smooth scrubbing inertia
        end: () => `+=${totalWidth}`, // Pin duration matches the width to scroll
      }
    });

    // 2. Interior Animations using containerAnimation
    // SLIDE 1: Fades out as we scroll away
    gsap.to('.slide-1-content', {
      opacity: 0,
      scale: 0.8,
      ease: 'none',
      scrollTrigger: {
        trigger: '.slide-1',
        containerAnimation: horizontalTween,
        start: 'center center',
        end: 'right center',
        scrub: true,
      }
    });

    // SLIDE 2: Slides up and fades in
    gsap.from('.slide-2-content', {
      opacity: 0,
      y: 100,
      ease: 'none',
      scrollTrigger: {
        trigger: '.slide-2',
        containerAnimation: horizontalTween,
        start: 'left right',
        end: 'center center',
        scrub: true,
      }
    });
    
    // Slide 2: Fades out as it leaves to the left
    gsap.to('.slide-2-content', {
      opacity: 0,
      y: -100,
      ease: 'none',
      scrollTrigger: {
        trigger: '.slide-2',
        containerAnimation: horizontalTween,
        start: 'center center',
        end: 'right center',
        scrub: true,
      }
    });

    // SLIDE 3: Scales up and fades in
    gsap.from('.slide-3-content', {
      opacity: 0,
      scale: 0.5,
      ease: 'none',
      scrollTrigger: {
        trigger: '.slide-3',
        containerAnimation: horizontalTween,
        start: 'left right',
        end: 'center center',
        scrub: true,
      }
    });

    // Slide 3: Fades out as it leaves
    gsap.to('.slide-3-content', {
      opacity: 0,
      scale: 1.2,
      ease: 'none',
      scrollTrigger: {
        trigger: '.slide-3',
        containerAnimation: horizontalTween,
        start: 'center center',
        end: 'right center',
        scrub: true,
      }
    });

    // SLIDE 4: Slides up at the very end
    gsap.from('.slide-4-content', {
      opacity: 0,
      y: 100,
      ease: 'none',
      scrollTrigger: {
        trigger: '.slide-4',
        containerAnimation: horizontalTween,
        start: 'left right',
        end: 'center center',
        scrub: true,
      }
    });

    // Bouncing line animation for Slide 1
    gsap.to('.scroll-indicator', {
      y: 15,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: 'power1.inOut'
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} style={{ overflow: 'hidden', height: '100vh', background: 'var(--color-background)' }}>
      <div 
        ref={trackRef} 
        style={{ 
          display: 'flex', 
          width: '400vw', 
          height: '100%',
          willChange: 'transform' // Optimize performance
        }}
      >
        
        {/* SLIDE 1 */}
        <div className="slide slide-1" style={{ width: '100vw', height: '100%', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
          <div className="slide-1-content" style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '10vw', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '24px' }}>
              VibeIfy
            </h1>
            <p style={{ fontSize: '24px', color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
              Scroll down to discover a new way to experience music.
            </p>
            
            <div style={{ marginTop: '80px', opacity: 0.5 }}>
              <div className="scroll-indicator" style={{ width: '2px', height: '60px', background: 'linear-gradient(to bottom, var(--color-text-primary), transparent)', margin: '0 auto' }} />
            </div>
          </div>
        </div>

        {/* SLIDE 2 */}
        <div className="slide slide-2" style={{ width: '100vw', height: '100%', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', background: 'rgba(255,255,255,0.02)' }}>
          <div className="slide-2-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 style={{ fontSize: '5vw', fontWeight: 700, letterSpacing: '-0.02em', textAlign: 'center', maxWidth: '1000px', lineHeight: 1.1 }}>
              One line of lyrics can <br/><span style={{ color: 'var(--color-accent-primary)' }}>change your whole day.</span>
            </h2>
            <div className="glass-panel" style={{ marginTop: '80px', padding: '40px', borderRadius: '24px', maxWidth: '700px', textAlign: 'center' }}>
              <p style={{ fontSize: '28px', fontStyle: 'italic', color: 'var(--color-text-secondary)' }}>
                "Waiting in a car, waiting for a ride in the dark..."
              </p>
            </div>
          </div>
        </div>

        {/* SLIDE 3 */}
        <div className="slide slide-3" style={{ width: '100vw', height: '100%', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
          <div className="slide-3-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ 
              width: '160px', height: '160px', borderRadius: '50%', 
              background: 'rgba(29, 185, 84, 0.1)', border: '2px solid var(--color-accent-primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '60px',
              boxShadow: '0 0 60px rgba(29, 185, 84, 0.4)'
            }}>
              <Sparkles size={64} color="var(--color-accent-primary)" />
            </div>
            <h2 style={{ fontSize: '5vw', fontWeight: 700, letterSpacing: '-0.02em', textAlign: 'center', lineHeight: 1.1 }}>
              Describe your mood.<br/>Let AI curate the vibe.
            </h2>
          </div>
        </div>

        {/* SLIDE 4 */}
        <div className="slide slide-4" style={{ width: '100vw', height: '100%', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', background: 'rgba(29, 185, 84, 0.05)' }}>
          <div className="slide-4-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{ fontSize: '6vw', fontWeight: 800, letterSpacing: '-0.04em', marginBottom: '60px' }}>
              Ready to Dive In?
            </h1>
            <button
              onClick={() => navigate('/dashboard')}
              style={{
                background: 'var(--color-accent-primary)',
                color: '#000',
                border: 'none',
                padding: '24px 56px',
                borderRadius: '50px',
                fontSize: '24px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 0 32px rgba(29, 185, 84, 0.4)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
              onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            >
              <Play fill="currentColor" size={28} />
              Enter Dashboard
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
