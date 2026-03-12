import { Leaf } from "lucide-react";
import { SiFacebook, SiInstagram, SiX } from "react-icons/si";

const footerLinks = [
  { label: "Home", href: "#home" },
  { label: "Properties", href: "#properties" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  );

  return (
    <footer className="bg-forest-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-white/10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary">
                <Leaf className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-display text-xl font-semibold">
                Ecostayz
              </span>
            </div>
            <p className="font-body text-sm text-white/60 leading-relaxed max-w-xs">
              Connecting conscious travellers with sustainable holiday homes
              that celebrate our natural world.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white/40 hover:text-white transition-colors"
              >
                <SiInstagram className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-white/40 hover:text-white transition-colors"
              >
                <SiFacebook className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="text-white/40 hover:text-white transition-colors"
              >
                <SiX className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-body text-xs font-semibold uppercase tracking-[0.15em] text-white/40 mb-5">
              Explore
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body text-xs font-semibold uppercase tracking-[0.15em] text-white/40 mb-5">
              Contact
            </h4>
            <ul className="space-y-2 font-body text-sm text-white/70">
              <li>hello@ecostayz.com</li>
              <li>+61 2 9000 0000</li>
              <li className="mt-4 text-white/40 text-xs leading-relaxed">
                Mon–Fri 9am–5pm AEST
                <br />
                Weekend enquiries welcome
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-body text-white/40">
          <p>© {year} Ecostayz. All rights reserved.</p>
          <p>
            Built with ♥ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/70 transition-colors underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
