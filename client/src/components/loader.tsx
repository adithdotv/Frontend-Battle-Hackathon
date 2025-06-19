import { useEffect, useState } from "react";

interface LoaderProps {
  onComplete: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Auto-complete after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 300);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden loader-container">
      {/* Animated Bars Loader */}
      <div className="bars-loader">
        <div className="bar bar-1"></div>
        <div className="bar bar-2"></div>
        <div className="bar bar-3"></div>
        <div className="bar bar-4"></div>
      </div>
    </div>
  );
}
