import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

// Pre-generate stable particle data
const particleData = [...Array(75)].map((_, i) => {
  const angle = (i / 75) * Math.PI * 2 + Math.random() * 0.5;
  const distance = 0.6 + Math.random() * 0.5; // Distance from center (0.6-1.1)
  return {
    angle,
    distance,
    size: Math.random() * 8 + 6,
    scale: Math.random() * 0.5 + 0.5,
    speed: Math.random() * 0.3 + 0.2, // Individual speed variation
  };
});

const NotFound = () => {
  const location = useLocation();
  const [pullStrength, setPullStrength] = useState(0); // 0 = outer, 1 = center

  useEffect(() => {
    console.error("404 Error:", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate how close mouse is to center (0 = edge, 1 = center)
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      const distFromCenter = Math.sqrt(
        Math.pow(mouseX - 0.5, 2) + Math.pow(mouseY - 0.5, 2)
      );
      // Invert: closer to center = higher pull strength
      const strength = Math.max(0, 1 - distFromCenter * 2);
      setPullStrength(strength);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 500;
  const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 400;

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {particleData.map((particle, i) => {
          // Calculate outer position (far from center)
          const outerX = centerX + Math.cos(particle.angle) * centerX * particle.distance;
          const outerY = centerY + Math.sin(particle.angle) * centerY * particle.distance;
          
          // Interpolate between outer and center based on pull strength
          const currentX = outerX + (centerX - outerX) * pullStrength;
          const currentY = outerY + (centerY - outerY) * pullStrength;
          
          // Opacity: more transparent when closer to center
          const opacity = 0.5 - pullStrength * 0.4;
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary"
              style={{
                width: particle.size,
                height: particle.size,
              }}
              animate={{
                x: currentX,
                y: currentY,
                opacity: opacity,
                scale: particle.scale,
              }}
              transition={{
                duration: 0.4 + particle.speed,
                ease: "easeOut",
              }}
            />
          );
        })}
      </div>

      <motion.div
        className="absolute w-96 h-96 rounded-full bg-primary/10 blur-3xl"
        animate={{
          scale: 1 + pullStrength * 0.5,
          opacity: 0.1 + pullStrength * 0.2,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
      />
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-accent/20 blur-3xl"
        animate={{
          scale: 1 + pullStrength * 0.3,
          opacity: 0.2 + pullStrength * 0.15,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
      />

      <div className="relative z-10 text-center px-6">
        <motion.div
          className="relative mb-8"
          style={{ perspective: 1000 }}
        >
          <motion.h1
            className="text-[12rem] md:text-[16rem] font-black leading-none gradient-text select-none"
            initial={{ opacity: 0, scale: 0.5, rotateX: -30 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              textShadow: "0 0 100px hsl(var(--primary) / 0.3)",
            }}
          >
            404
          </motion.h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Lost in the void
          </h2>
          <p className="text-muted-foreground text-lg mb-2">
            The page you're looking for has wandered off into the digital abyss.
          </p>
          <p className="text-muted-foreground/60 text-sm mb-8 font-mono">
            Attempted path: <span className="text-primary">{location.pathname}</span>
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Button
            asChild
            size="lg"
            className="group relative overflow-hidden"
          >
            <Link to="/">
              <span className="relative z-10 flex items-center gap-2">
                <Home className="w-4 h-4" />
                Return Home
              </span>
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
            className="group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
