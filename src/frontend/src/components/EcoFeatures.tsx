import { Bird, Droplets, Recycle, Sprout, Sun, TreePine } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const features = [
  {
    icon: Sun,
    title: "Solar Power",
    description:
      "Every property runs on clean solar energy with battery backup, completely off-grid capable.",
  },
  {
    icon: Droplets,
    title: "Rainwater Harvesting",
    description:
      "Natural rainfall is collected, filtered, and recycled for all water needs on the property.",
  },
  {
    icon: Recycle,
    title: "Composting Systems",
    description:
      "Food scraps become garden nutrients through on-site vermiculture and hot composting.",
  },
  {
    icon: Sprout,
    title: "Organic Gardens",
    description:
      "Guests are invited to harvest fresh vegetables and herbs from lush chemical-free gardens.",
  },
  {
    icon: TreePine,
    title: "Low-Impact Materials",
    description:
      "Locally sourced timber, recycled steel, and natural finishes keep our footprint minimal.",
  },
  {
    icon: Bird,
    title: "Wildlife Friendly",
    description:
      "Each property maintains wildlife corridors, nesting boxes, and pesticide-free zones.",
  },
];

export default function EcoFeatures() {
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
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="py-20 lg:py-28 bg-forest-900 relative overflow-hidden"
      ref={ref}
    >
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-earth-500 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-earth-300 mb-3 block">
            How We Do It
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-white mb-4">
            Built for the Planet
          </h2>
          <p className="font-body text-lg text-white/60 max-w-xl mx-auto">
            Our properties are engineered to leave the earth better than we
            found it — every feature is a commitment to tomorrow.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <div
              key={feat.title}
              className={`group p-7 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${i * 80}ms`,
                transition:
                  "opacity 0.6s ease, transform 0.6s ease, background 0.3s ease",
              }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/20 mb-5 group-hover:bg-accent/30 transition-colors">
                <feat.icon
                  className="w-6 h-6 text-earth-300"
                  strokeWidth={1.8}
                />
              </div>
              <h3 className="font-display text-lg font-semibold text-white mb-2">
                {feat.title}
              </h3>
              <p className="font-body text-sm text-white/60 leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
