import { memo, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS, DURATION, EASING } from "@/lib/constants";
import { useIsScrolled } from "@/contexts/LayoutContext";
import { BrandName } from "@/components/ui/GradientText";
import avatarClear from "@/assets/avatar-clear.png";

const Navigation = memo(function Navigation() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isScrolled = useIsScrolled();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [showText, setShowText] = useState(!isHomePage);
  const [bgVisible, setBgVisible] = useState(isHomePage);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isHomePage) {
      setBgVisible(true);
      const timer = setTimeout(() => {
        setShowText(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setBgVisible(false);
      const timer = setTimeout(() => {
        setShowText(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isHomePage]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen ? "bg-background/80 backdrop-blur-md border-b border-border/30" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? "h-12" : "h-16"}`}
        >
          <Link
            to="/"
            className={`group relative flex items-center justify-center rounded-xl overflow-hidden transition-all duration-500 ease-out -ml-3 ${
              !isHomePage ? "hover:bg-gradient-to-b hover:from-[#8800FF]/50 hover:to-[#220033]/50" : ""
            }`}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-b from-[#8800FF] to-[#220033] transition-opacity duration-300 ${
                bgVisible ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden="true"
            />

            <div className="relative flex items-center justify-center px-2 py-1.5">
              <img
                src={avatarClear}
                alt="LaymanLouie"
                className={`relative z-10 rounded-lg object-cover transition-all duration-300 ${
                  isScrolled ? "w-8 h-8" : "w-10 h-10"
                }`}
              />

              <div
                className={`grid transition-all duration-500 ease-out ${
                  showText ? "grid-cols-[1fr]" : "grid-cols-[0fr]"
                }`}
              >
                <div
                  className={`overflow-hidden flex items-center transition-opacity duration-500 ease-out ${
                    showText ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <span className="font-semibold text-lg whitespace-nowrap ml-3 mr-1">
                    <BrandName />
                  </span>
                </div>
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex relative items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="group relative px-4 py-2.5 rounded-lg text-base font-medium transition-colors duration-200 overflow-hidden"
                >
                  <span
                    className={`absolute inset-0 bg-gradient-to-b from-[#8800FF] to-[#220033] rounded-lg transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                    aria-hidden="true"
                  />
                  <span
                    className={`absolute inset-0 bg-white/10 rounded-lg transition-opacity duration-200 ${
                      isActive ? "opacity-0" : "opacity-0 group-hover:opacity-100"
                    }`}
                    aria-hidden="true"
                  />
                  <span
                    className={`relative z-10 transition-colors duration-200 ${
                      isActive ? "text-white" : "text-muted-foreground group-hover:text-white"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden relative p-2 rounded-lg text-muted-foreground hover:text-white hover:bg-white/10 transition-all duration-200"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: DURATION.normal, ease: EASING.snappy }}
            className="lg:hidden overflow-hidden bg-background/95 backdrop-blur-md border-b border-border/30"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col items-end gap-1">
              {NAV_ITEMS.map((item, index) => {
                const isActive = location.pathname === item.path;
                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-to-r from-[#8800FF] to-[#220033] text-white"
                          : "text-muted-foreground hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
});

export default Navigation;
