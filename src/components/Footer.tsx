import { memo, useRef } from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { FOOTER_NAV_LINKS, FOOTER_LEGAL_LINKS, DURATION, EASING } from "@/lib/constants";
import { BrandName } from "@/components/ui/GradientText";

const Footer = memo(function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: false, margin: "-50px" });

  return (
    <motion.footer
      ref={footerRef}
      className="py-8 px-6 mt-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: DURATION.reveal, ease: EASING.smooth }}
    >
      <div className="container mx-auto">
        <motion.div
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-border/20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: DURATION.reveal, delay: 0.1, ease: EASING.smooth }}
        >
          <nav className="flex flex-wrap items-center gap-1">
            {FOOTER_NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <nav className="flex flex-wrap items-center gap-1">
            {FOOTER_LEGAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.path}
                className="px-3 py-1.5 rounded-lg text-xs text-muted-foreground/70 hover:text-muted-foreground hover:bg-white/10 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </motion.div>

        <motion.div
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pt-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: DURATION.reveal, delay: 0.2, ease: EASING.smooth }}
        >
          <p className="text-xs text-muted-foreground/60">
            Copyright © {currentYear} <BrandName />. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/60 flex items-center gap-1">
            Made with
            <Heart className="w-3 h-3 text-primary" aria-hidden="true" />
            by The Layman Legion
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
});

export default Footer;
