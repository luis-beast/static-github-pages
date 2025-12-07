import { NavLink } from "@/components/NavLink";
import avatar from "@/assets/avatar.jpeg";

const Navigation = () => {
  return (
    <nav className="glass-card sticky top-0 z-50 border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <img 
              src={avatar} 
              alt="Streamer avatar" 
              className="w-10 h-10 rounded-lg object-cover"
            />
            <span className="font-semibold text-lg gradient-text">StreamerHub</span>
          </div>
          
          <div className="flex items-center gap-1">
            <NavLink 
              to="/" 
              className="px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all duration-200"
              activeClassName="text-foreground bg-secondary"
            >
              Quotes
            </NavLink>
            <NavLink 
              to="/commands" 
              className="px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all duration-200"
              activeClassName="text-foreground bg-secondary"
            >
              Commands
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
