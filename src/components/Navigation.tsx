import { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
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
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/30"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="flex items-center justify-between"
          animate={{ height: isScrolled ? 48 : 64 }}
          transition={{ duration: DURATION.normal, ease: "easeInOut" }}
        >
          <Link
            to="/"
            className="group relative flex items-center gap-3 px-3 py-1.5 -ml-3 rounded-lg transition-all duration-300"
          >
            {/* Hover gradient background */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-[#8800FF] to-[#220033] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <motion.img
              src={avatarClear}
              alt="LaymanLouie"
              className="relative z-10 rounded-lg object-cover"
              animate={{ width: isScrolled ? 32 : 40, height: isScrolled ? 32 : 40 }}
              transition={{ duration: DURATION.normal, ease: "easeInOut" }}
            />
            {!isHomePage && (
              <motion.span
                className="relative z-10 font-semibold text-lg flex pointer-events-none"
                initial={{ opacity: 0, x: -10, width: 0 }}
                animate={{ opacity: 1, x: 0, width: "auto" }}
                transition={{ duration: DURATION.fast, ease: "easeInOut" }}
              >
                <BrandName />
              </motion.span>
            )}
          </Link>

          <nav className="relative flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="group relative px-5 py-2.5 rounded-lg text-sm font-medium z-10"
                >
                  {/* Active state pill - uses layoutId for smooth sliding, layout={false} prevents scroll interference */}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-pill"
                      layout="position"
                      className="absolute inset-0 bg-gradient-to-b from-[#8800FF] to-[#220033] rounded-lg"
                      style={{ willChange: "transform" }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 35,
                        mass: 1,
                      }}
                    />
                  )}
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
