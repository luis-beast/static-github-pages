import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import avatarClear from "@/assets/avatar-clear.png";
const NAV_ITEMS = [
  { path: "/quotes", label: "Quotes" },
  { path: "/commands", label: "Commands" },
] as const;

const Navigation = () => {
  const location = useLocation();

  return (
    <motion.nav
      className="glass-card sticky top-0 z-50 border-b border-border/50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="group flex items-center gap-3 px-3 py-1.5 -ml-3 rounded-lg transition-all duration-300 hover:bg-gradient-to-br hover:from-[hsl(270,80%,40%)] hover:to-[hsl(280,90%,25%)]"
          >
            <img
              src={avatarClear}
              alt="LaymanLouie"
              className="w-10 h-10 rounded-lg object-cover"
            />
            <span
              className="font-semibold text-lg"
              style={{
                background: "linear-gradient(to bottom, #bb66ff, #8800FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              LaymanLouie
            </span>
          </Link>

          <div className="relative flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 z-10 ${
                    !isActive ? "hover:bg-white/10" : ""
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.div
                        layoutId="navbar-pill"
                        className="absolute inset-0 bg-gradient-to-br from-[hsl(270,80%,40%)] to-[hsl(280,90%,25%)] rounded-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                          opacity: { duration: 0.2 },
                        }}
                      />
                    )}
                  </AnimatePresence>
                  <span
                    className={`relative z-10 transition-colors duration-200 ${
                      isActive
                        ? "text-white"
                        : "text-muted-foreground hover:text-white"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
