import { memo, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { NAV_ITEMS } from "@/lib/constants";
import { useScrollState } from "@/hooks/useScrollState";
import { BrandName } from "@/components/ui/GradientText";
import avatarClear from "@/assets/avatar-clear.png";

const Navigation = memo(function Navigation() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isScrolled = useScrollState();
  
  // Track animation sequence: background fades first, then text appears
  const [showText, setShowText] = useState(!isHomePage);
  const [bgVisible, setBgVisible] = useState(isHomePage);

  useEffect(() => {
    if (isHomePage) {
      // Going to home: show background first, then hide text after background appears
      setBgVisible(true);
      const timer = setTimeout(() => {
        setShowText(false);
      }, 300); // Wait for background fade to complete (matches duration-300)
      return () => clearTimeout(timer);
    } else {
      // Leaving home: show text first, then fade out background after text appears
      setShowText(true);
      const timer = setTimeout(() => {
        setBgVisible(false);
      }, 500); // Wait for text fade transition (matches duration-500)
      return () => clearTimeout(timer);
    }
  }, [isHomePage]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/30"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            isScrolled ? "h-12" : "h-16"
          }`}
        >
          <Link
            to="/"
            className={`group relative flex items-center justify-center rounded-xl overflow-hidden transition-all duration-500 ease-out -ml-3 ${
              !isHomePage ? "hover:bg-gradient-to-b hover:from-[#8800FF]/50 hover:to-[#220033]/50" : ""
            }`}
          >
            {/* Background glow - visible on home page at full brightness */}
            <div 
              className={`absolute inset-0 bg-gradient-to-b from-[#8800FF] to-[#220033] transition-opacity duration-300 ${
                bgVisible ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden="true"
            />
            
            {/* Content container */}
            <div className="relative flex items-center justify-center px-2 py-1.5">
              <img
                src={avatarClear}
                alt="LaymanLouie"
                className={`relative z-10 rounded-lg object-cover transition-all duration-300 ${
                  isScrolled ? "w-8 h-8" : "w-10 h-10"
                }`}
              />
              
              {/* Text - grid for smooth width animation */}
              <div className={`grid transition-all duration-500 ease-out ${
                showText ? "grid-cols-[1fr]" : "grid-cols-[0fr]"
              }`}>
                <div className={`overflow-hidden flex items-center transition-opacity duration-500 ease-out ${
                  showText ? "opacity-100" : "opacity-0"
                }`}>
                  <span className="font-semibold text-lg whitespace-nowrap ml-3 mr-1">
                    <BrandName />
                  </span>
                </div>
              </div>
            </div>
          </Link>

          <nav className="relative flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              return (
              <Link
                  key={item.path}
                  to={item.path}
                  className="group relative px-5 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 overflow-hidden"
                >
                  {/* Background layer with smooth opacity transition */}
                  <span 
                    className={`absolute inset-0 bg-gradient-to-b from-[#8800FF] to-[#220033] rounded-lg transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                    aria-hidden="true"
                  />
                  {/* Hover background for non-active state */}
                  <span 
                    className={`absolute inset-0 bg-white/10 rounded-lg transition-opacity duration-200 ${
                      isActive ? "opacity-0" : "opacity-0 group-hover:opacity-100"
                    }`}
                    aria-hidden="true"
                  />
                  {/* Text layer */}
                  <span className={`relative z-10 transition-colors duration-200 ${
                    isActive ? "text-white" : "text-muted-foreground group-hover:text-white"
                  }`}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </nav>
  );
});

export default Navigation;
