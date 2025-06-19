import { useEffect, useState } from "react";

interface LoaderProps {
  onComplete: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'breaking' | 'zooming' | 'complete'>('loading');
  const [displayProgress, setDisplayProgress] = useState('000');

  useEffect(() => {
    let animationFrame: number;
    let startTime: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      
      let newProgress: number;
      
      if (elapsed < 3000) {
        // Normal speed for first 80%
        newProgress = Math.min((elapsed / 3000) * 80, 80);
      } else {
        // Slow speed for 80% to 100%
        const slowPhaseElapsed = elapsed - 3000;
        const slowPhaseProgress = Math.min((slowPhaseElapsed / 2000) * 20, 20);
        newProgress = 80 + slowPhaseProgress;
      }
      
      setProgress(newProgress);
      
      // Update display progress with flipping animation
      const progressInt = Math.floor(newProgress);
      setDisplayProgress(progressInt.toString().padStart(3, '0'));
      
      if (newProgress >= 100) {
        setPhase('breaking');
        setTimeout(() => {
          setPhase('zooming');
          setTimeout(() => {
            setPhase('complete');
            onComplete();
          }, 800);
        }, 600);
      } else {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [onComplete]);

  if (phase === 'complete') return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden">
      {/* Progress Counter - Bottom Left */}
      <div className="absolute bottom-8 left-8 text-white font-mono text-2xl tracking-wider">
        <div className="flip-container">
          {displayProgress.split('').map((digit, index) => (
            <span key={index} className="flip-digit inline-block transform transition-transform duration-150">
              {digit}
            </span>
          ))}
        </div>
      </div>

      {/* Main Loader Rectangle */}
      <div className="relative">
        {phase === 'loading' && (
          <div 
            className="loader-rectangle"
            style={{
              '--progress': `${progress}%`
            } as React.CSSProperties}
          >
            {/* Background Rectangle */}
            <div className="loader-bg"></div>
            {/* Progress Fill */}
            <div className="loader-fill"></div>
          </div>
        )}
        
        {phase === 'breaking' && (
          <div className="loader-rectangle breaking">
            {/* L-Shape Parts */}
            <div className="l-shape-vertical"></div>
            <div className="l-shape-horizontal"></div>
          </div>
        )}
        
        {phase === 'zooming' && (
          <div className="loader-rectangle zooming">
            <div className="l-shape-vertical"></div>
            <div className="l-shape-horizontal"></div>
          </div>
        )}
      </div>
    </div>
  );
}
