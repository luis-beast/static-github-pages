import { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Scale, CreditCard } from "lucide-react";

const legalPages = [
  {
    path: "/privacy-policy",
    label: "Privacy Policy",
    icon: FileText,
  },
  {
    path: "/terms-of-use",
    label: "Terms of Use",
    icon: Scale,
  },
  {
    path: "/sales-and-refunds",
    label: "Sales & Refunds",
    icon: CreditCard,
  },
];

const LegalNavigation = memo(function LegalNavigation() {
  const location = useLocation();
  const currentPath = location.pathname;

  // Filter out the current page
  const otherPages = legalPages.filter((page) => page.path !== currentPath);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mt-16 pt-8 border-t border-border/50"
    >
      <p className="text-muted-foreground text-base mb-6">
        Related Legal Documents
      </p>
      <div className="flex flex-wrap gap-4">
        {otherPages.map((page) => {
          const Icon = page.icon;
          return (
            <Link
              key={page.path}
              to={page.path}
              className="group flex items-center gap-3 px-5 py-3 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/50 hover:bg-muted/50 transition-all duration-300"
            >
              <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                {page.label}
              </span>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
});

export default LegalNavigation;
