import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useCounterAnimation } from "@/hooks/use-counter-animation";

const stats = [
  { target: 250, label: "Projects Completed", suffix: "" },
  { target: 98, label: "Client Satisfaction", suffix: "%" },
  { target: 50, label: "Team Members", suffix: "" },
  { target: 5, label: "Years Experience", suffix: "" }
];

export function Statistics() {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.5,
    triggerOnce: true
  });

  return (
    <section ref={elementRef} className="py-20 bg-background theme-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatItem 
              key={index} 
              {...stat} 
              isTriggered={isIntersecting}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({ target, label, suffix, isTriggered }: {
  target: number;
  label: string;
  suffix: string;
  isTriggered: boolean;
}) {
  const count = useCounterAnimation(target, 2000, isTriggered);

  return (
    <div className="text-center">
      <div className="text-4xl lg:text-5xl font-bold gradient-text mb-2 animate-counter">
        {count}{suffix}
      </div>
      <div className="text-muted-foreground">{label}</div>
    </div>
  );
}
