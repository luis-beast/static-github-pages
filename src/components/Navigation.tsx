import { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { NAV_ITEMS } from "@/lib/constants";
import { useScrollState } from "@/hooks/useScrollState";
import { BrandName } from "@/components/ui/GradientText";
import avatarClear from "@/assets/avatar-clear.png";

const Navigation = memo(function Navigation() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isScrolled = useScrollState();

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
            className="group relative flex items-center gap-3 px-3 py-1.5 -ml-3 rounded-lg transition-all duration-300"
          >
            <div className={`absolute inset-0 rounded-lg bg-gradient-to-b from-[#8800FF] to-[#220033] transition-opacity duration-300 ${
              isHomePage ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`} />
            <img
              src={avatarClear}
              alt="LaymanLouie"
              className={`relative z-10 rounded-lg object-cover transition-all duration-300 ${
                isScrolled ? "w-8 h-8" : "w-10 h-10"
              }`}
            />
            {!isHomePage && (
              <span className="relative z-10 font-semibold text-lg flex pointer-events-none">
                <BrandName />
              </span>
            )}
          </Link>

          <nav className="relative flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-b from-[#8800FF] to-[#220033] text-white"
                      : "text-muted-foreground hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
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
