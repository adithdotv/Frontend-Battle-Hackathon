import { useEffect, useState } from "react";

interface LoaderProps {
  onComplete: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = Math.random() * 15;
        const newProgress = Math.min(prev + increment, 100);
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 300);
          }, 500);
        }
        
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background theme-transition">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="loader-shape"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-violet-500 rounded-full opacity-80 animate-pulse"></div>
          </div>
        </div>
        <div className="text-2xl font-semibold gradient-text mb-4">NextGen Services</div>
        <div className="text-muted-foreground mb-4">Loading your experience...</div>
        <div className="w-48 h-2 bg-muted rounded-full mx-auto overflow-hidden">
          <div 
            className="h-full loader-progress rounded-full transition-all duration-300 ease-out" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-sm text-muted-foreground mt-2">{Math.round(progress)}%</div>
      </div>
    </div>
  );
}
