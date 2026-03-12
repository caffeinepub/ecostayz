import { Button } from "@/components/ui/button";
import { Award, Globe, Heart } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const values = [
  {
    icon: Heart,
    label: "Passion for Nature",
    desc: "Every decision is filtered through one question: is this good for the earth?",
  },
  {
    icon: Globe,
    label: "Global Impact",
    desc: "We partner with reforestation projects that plant one tree for every night booked.",
  },
  {
    icon: Award,
    label: "Certified Green",
    desc: "EarthCheck Gold certified — the highest standard for sustainable tourism.",
  },
];

export default function About() {
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
      { threshold: 0.15 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-20 lg:py-28 bg-secondary/40" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div
            className={`transition-all duration-700 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3 block">
              Our Mission
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-foreground mb-6 leading-tight">
              Travel that <em className="not-italic text-primary">protects</em>{" "}
              what you came to see
            </h2>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-6">
              Ecostayz was founded on a simple belief: the places we love most
              are worth protecting. We connect conscious travellers with
              handpicked sustainable accommodation that celebrates — rather than
              exploits — the natural environment.
            </p>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-8">
              From solar-powered treehouses to off-grid cabins, every Ecostayz
              property has been rigorously vetted for its ecological integrity,
              community contribution, and genuine commitment to low-impact
              living.
            </p>

            <div className="flex flex-col gap-5 mb-8">
              {values.map((v, i) => (
                <div
                  key={v.label}
                  className={`flex items-start gap-4 transition-all duration-500 ${
                    visible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-4"
                  }`}
                  style={{ transitionDelay: `${200 + i * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <v.icon
                      className="w-5 h-5 text-primary"
                      strokeWidth={1.8}
                    />
                  </div>
                  <div>
                    <div className="font-body font-semibold text-foreground text-sm mb-0.5">
                      {v.label}
                    </div>
                    <div className="font-body text-sm text-muted-foreground">
                      {v.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button
              asChild
              className="bg-primary hover:bg-forest-800 text-primary-foreground font-body font-medium rounded-full px-8"
            >
              <a href="#contact">Join Our Mission</a>
            </Button>
          </div>

          {/* Right: image collage */}
          <div
            className={`relative transition-all duration-700 delay-200 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="relative">
              <img
                src="/assets/generated/property-1.dim_600x400.jpg"
                alt="Eco treehouse"
                className="rounded-3xl w-full object-cover aspect-[4/3] shadow-eco-lg"
              />
              <div className="absolute -bottom-6 -left-6 w-48 h-36 rounded-2xl overflow-hidden border-4 border-background shadow-eco-lg hidden sm:block">
                <img
                  src="/assets/generated/property-2.dim_600x400.jpg"
                  alt="Lakeside cabin"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating badge */}
              <motion.div
                className="absolute -top-4 -right-4 bg-accent text-accent-foreground rounded-2xl px-4 py-3 shadow-eco-lg"
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <div className="font-display text-2xl font-semibold">🌿</div>
                <div className="font-body text-xs font-semibold mt-0.5">
                  EarthCheck Gold
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
