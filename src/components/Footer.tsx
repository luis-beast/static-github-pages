import { memo } from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { FOOTER_NAV_LINKS, FOOTER_LEGAL_LINKS } from "@/lib/constants";
import { BrandName } from "@/components/ui/GradientText";

const Footer = memo(function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-6 mt-auto">
      <div className="container mx-auto">
        {/* Top section with links */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-border/20">
          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center gap-4 md:gap-6 text-sm">
            {FOOTER_NAV_LINKS.map((link, index) => (
              <span key={link.path} className="flex items-center gap-4 md:gap-6">
                <Link
                  to={link.path}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {link.label}
                </Link>
                {index < FOOTER_NAV_LINKS.length - 1 && (
                  <span className="hidden md:inline text-border">|</span>
                )}
              </span>
            ))}
          </nav>

          {/* Legal Links */}
          <nav className="flex flex-wrap items-center gap-4 md:gap-6 text-xs">
            {FOOTER_LEGAL_LINKS.map((link, index) => (
              <span key={link.label} className="flex items-center gap-4 md:gap-6">
                <a
                  href={link.path}
                  className="text-muted-foreground/70 hover:text-muted-foreground transition-colors duration-200"
                >
                  {link.label}
                </a>
                {index < FOOTER_LEGAL_LINKS.length - 1 && (
                  <span className="hidden md:inline text-border/50">|</span>
                )}
              </span>
            ))}
          </nav>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pt-6">
          <p className="text-xs text-muted-foreground/60">
            Copyright © {currentYear} <BrandName />. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/60 flex items-center gap-1">
            Made with
            <Heart className="w-3 h-3 text-primary" aria-hidden="true" />
            by The Layman Legion
          </p>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
