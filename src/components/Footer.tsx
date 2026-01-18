import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: "Home", path: "/" },
    { label: "Quotes", path: "/quotes" },
    { label: "Commands", path: "/commands" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", path: "#" },
    { label: "Terms of Use", path: "#" },
    { label: "Community Guidelines", path: "#" },
  ];

  return (
    <footer className="py-8 px-6 mt-auto">
      <div className="container mx-auto">
        {/* Top section with links */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-border/20">
          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center gap-4 md:gap-6 text-sm">
            {footerLinks.map((link, index) => (
              <span key={link.path} className="flex items-center gap-4 md:gap-6">
                <Link
                  to={link.path}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {link.label}
                </Link>
                {index < footerLinks.length - 1 && (
                  <span className="hidden md:inline text-border">|</span>
                )}
              </span>
            ))}
          </nav>

          {/* Legal Links */}
          <nav className="flex flex-wrap items-center gap-4 md:gap-6 text-xs">
            {legalLinks.map((link, index) => (
              <span key={link.label} className="flex items-center gap-4 md:gap-6">
                <a
                  href={link.path}
                  className="text-muted-foreground/70 hover:text-muted-foreground transition-colors duration-200"
                >
                  {link.label}
                </a>
                {index < legalLinks.length - 1 && (
                  <span className="hidden md:inline text-border/50">|</span>
                )}
              </span>
            ))}
          </nav>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pt-6">
          <p className="text-xs text-muted-foreground/60">
            Copyright © {currentYear} LaymanLouie. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/60 flex items-center">
            Made with
            <Heart className="w-3 h-3 inline text-primary mx-1" />
            by The Layman Legion
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
