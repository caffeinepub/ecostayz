import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/assets/generated/hero-home.dim_1400x800.jpg"
          alt="Eco treehouse in rainforest"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-forest-900/70 via-forest-900/50 to-forest-900/75" />
        {/* Subtle texture */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_oklch(0.17_0.055_145/0.4)_100%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto pt-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="inline-flex items-center gap-2 bg-accent/20 text-earth-100 border border-accent/30 rounded-full px-4 py-1.5 text-sm font-body font-medium mb-6 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            100% Sustainable Accommodation
          </span>
        </motion.div>

        <motion.h1
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-white leading-[1.05] tracking-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Stay Green, <span className="italic text-earth-300">Live Clean</span>
        </motion.h1>

        <motion.p
          className="font-body text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          Discover extraordinary eco-friendly holiday homes that let you immerse
          yourself in nature — without leaving a trace. Every stay plants a
          tree.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-forest-800 text-primary-foreground font-body font-semibold rounded-full px-8 py-6 text-base shadow-eco-lg hover:-translate-y-0.5 transition-all duration-300"
            data-ocid="hero.primary_button"
          >
            <a href="#properties">Explore Properties</a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="bg-white/10 hover:bg-white/20 text-white border-white/40 hover:border-white/60 font-body font-semibold rounded-full px-8 py-6 text-base backdrop-blur-sm hover:-translate-y-0.5 transition-all duration-300"
            data-ocid="hero.secondary_button"
          >
            <a href="#about">Learn Our Mission</a>
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#stats"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors"
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <ChevronDown className="w-6 h-6" />
      </motion.a>
    </section>
  );
}
