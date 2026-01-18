import { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS, DURATION } from "@/lib/constants";
import { useScrollState } from "@/hooks/useScrollState";
import { BrandName } from "@/components/ui/GradientText";
import avatarClear from "@/assets/avatar-clear.png";

const Navigation = memo(function Navigation() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isScrolled = useScrollState();

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/30"
          : "bg-transparent"
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.normal }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="flex items-center justify-between"
          animate={{ height: isScrolled ? 48 : 64 }}
          transition={{ duration: DURATION.normal, ease: "easeInOut" }}
        >
          <Link
            to="/"
            className="group flex items-center gap-3 px-3 py-1.5 -ml-3 rounded-lg transition-all duration-300 hover:bg-gradient-to-b hover:from-[#8800FF] hover:to-[#220033]"
          >
            <motion.img
              src={avatarClear}
              alt="LaymanLouie"
              className="rounded-lg object-cover"
              animate={{ width: isScrolled ? 32 : 40, height: isScrolled ? 32 : 40 }}
              transition={{ duration: DURATION.normal, ease: "easeInOut" }}
            />
            <AnimatePresence mode="wait">
              {!isHomePage && (
                <motion.span
                  className="font-semibold text-lg flex"
                  initial={{ opacity: 0, x: -10, width: 0 }}
                  animate={{ opacity: 1, x: 0, width: "auto" }}
                  exit={{ opacity: 0, x: -10, width: 0 }}
                  transition={{ duration: DURATION.fast, ease: "easeInOut" }}
                >
                  <BrandName />
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <nav className="relative flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="group relative px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 z-10"
                >
                  {/* Active state pill */}
                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.div
                        layoutId="navbar-pill"
                        className="absolute inset-0 bg-gradient-to-b from-[#8800FF] to-[#220033] rounded-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                          opacity: { duration: DURATION.fast },
                        }}
                      />
                    )}
                  </AnimatePresence>
                  {/* Hover state background */}
                  {!isActive && (
                    <div className="absolute inset-0 rounded-lg bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                  <span
                    className={`relative z-10 pointer-events-none transition-colors duration-200 ${
                      isActive ? "text-white" : "text-muted-foreground group-hover:text-white"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </motion.div>
      </div>
    </motion.nav>
  );
});

export default Navigation;
