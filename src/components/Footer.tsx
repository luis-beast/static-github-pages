import { memo } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { FOOTER_NAV_LINKS, FOOTER_LEGAL_LINKS } from "@/lib/constants";
import { BrandName } from "@/components/ui/GradientText";

const Footer = memo(function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-6 mt-auto">
      <div className="container mx-auto">
        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-border/20">
          {/* Main Nav Links */}
          <nav className="flex flex-wrap items-center gap-1">
            {FOOTER_NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="px-4 py-2 rounded-lg text-base font-medium text-muted-foreground hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Legal Links */}
          <nav className="flex flex-wrap items-center gap-1">
            {FOOTER_LEGAL_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="px-4 py-2 rounded-lg text-base font-medium text-muted-foreground hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pt-6">
          <p className="text-sm text-muted-foreground/60">
            Copyright © {currentYear} <BrandName />. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground/60 flex items-center gap-1">
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
