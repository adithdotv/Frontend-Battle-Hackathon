import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { useScrollToTop } from "@/hooks/use-scroll-to-section";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const scrollToTop = useScrollToTop();

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <button
      className={`scroll-to-top ${isVisible ? '' : 'hidden'}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <ChevronUp size={20} />
    </button>
  );
}