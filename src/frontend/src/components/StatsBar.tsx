import { Home, Users, Wind, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const stats = [
  {
    icon: Zap,
    label: "Renewable Energy",
    value: "100%",
    sub: "Solar & wind powered",
  },
  {
    icon: Wind,
    label: "Carbon Neutral",
    value: "0 kg",
    sub: "Net zero emissions",
  },
  {
    icon: Home,
    label: "Eco Properties",
    value: "50+",
    sub: "Across Australia",
  },
  { icon: Users, label: "Happy Guests", value: "10k+", sub: "And counting" },
];

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="stats" className="bg-primary" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center transition-all duration-700 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/15 mb-4">
                <stat.icon className="w-5 h-5 text-white" strokeWidth={1.8} />
              </div>
              <div className="font-display text-4xl font-semibold text-white mb-1">
                {stat.value}
              </div>
              <div className="font-body text-sm font-semibold text-earth-200 uppercase tracking-widest mb-1">
                {stat.label}
              </div>
              <div className="font-body text-xs text-white/60">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
