import { Quote, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    quote:
      "Waking up to birdsong in that treehouse was the single most memorable morning of my life. You can feel how every detail was designed with love for the environment.",
    author: "Priya Sharma",
    location: "Sydney, Australia",
    stars: 5,
    initials: "PS",
  },
  {
    quote:
      "The lakeside cabin was perfect — totally off-grid, yet utterly luxurious. We left feeling reconnected with nature and with each other. Already planning our return.",
    author: "James & Kate Holloway",
    location: "Melbourne, Australia",
    stars: 5,
    initials: "JH",
  },
  {
    quote:
      "Ecostayz genuinely walks the talk. The composting system, the rainwater, the wildlife garden — it's all real. And the bungalow itself was stunning.",
    author: "Amara Osei",
    location: "Brisbane, Australia",
    stars: 5,
    initials: "AO",
  },
];

const STAR_KEYS = ["star-1", "star-2", "star-3", "star-4", "star-5"];

export default function Testimonials() {
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
    <section className="py-20 lg:py-28 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3 block">
            Guest Stories
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-foreground mb-4">
            Loved by Nature Lovers
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto">
            Don't take our word for it — here's what guests are saying after
            their stay.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={t.author}
              className={`relative p-8 bg-card rounded-3xl border border-border shadow-eco hover:shadow-eco-lg transition-all duration-500 hover:-translate-y-1 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <Quote className="w-8 h-8 text-primary/20 mb-4" />
              <div className="flex gap-0.5 mb-4">
                {STAR_KEYS.slice(0, t.stars).map((key) => (
                  <Star
                    key={key}
                    className="w-4 h-4 text-earth-500 fill-earth-500"
                  />
                ))}
              </div>
              <p className="font-body text-sm text-foreground leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="font-body text-xs font-bold text-primary-foreground">
                    {t.initials}
                  </span>
                </div>
                <div>
                  <div className="font-body font-semibold text-sm text-foreground">
                    {t.author}
                  </div>
                  <div className="font-body text-xs text-muted-foreground">
                    {t.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
