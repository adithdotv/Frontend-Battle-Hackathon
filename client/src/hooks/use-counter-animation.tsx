import { useEffect, useState } from "react";

export function useCounterAnimation(
  target: number,
  duration: number = 2000,
  isTriggered: boolean = false
) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isTriggered) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(startValue + (target - startValue) * easeOut);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration, isTriggered]);

  return count;
}
