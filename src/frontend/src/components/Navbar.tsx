import { Button } from "@/components/ui/button";
import { Leaf, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "#home", ocid: "nav.home_link" },
  { label: "Properties", href: "#properties", ocid: "nav.properties_link" },
  { label: "About", href: "#about", ocid: "nav.about_link" },
  { label: "Contact", href: "#contact", ocid: "nav.contact_link" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleBookNowMobile = () => {
    setMenuOpen(false);
    window.location.hash = "#contact";
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cream/95 backdrop-blur-md shadow-eco border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <a
          href="#home"
          className="flex items-center gap-2.5 group"
          data-ocid="nav.home_link"
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary text-primary-foreground group-hover:scale-110 transition-transform duration-300">
            <Leaf className="w-4.5 h-4.5" strokeWidth={2.5} />
          </div>
          <span className="font-display text-xl font-semibold text-foreground tracking-tight">
            Ecostayz
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                data-ocid={link.ocid}
                className="font-body text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Book Now CTA */}
        <div className="hidden md:flex">
          <Button
            asChild
            className="bg-primary hover:bg-forest-800 text-primary-foreground font-body font-medium rounded-full px-6 shadow-eco transition-all duration-300 hover:shadow-eco-lg hover:-translate-y-0.5"
            data-ocid="nav.book_now_button"
          >
            <a href="#contact">Book Now</a>
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="md:hidden p-2 rounded-lg text-foreground hover:bg-muted transition-colors"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-cream/98 backdrop-blur-md border-b border-border overflow-hidden"
          >
            <ul className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    data-ocid={link.ocid}
                    className="font-body text-base font-medium text-foreground"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Button
                  type="button"
                  className="w-full bg-primary text-primary-foreground rounded-full"
                  data-ocid="nav.book_now_button"
                  onClick={handleBookNowMobile}
                >
                  Book Now
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
