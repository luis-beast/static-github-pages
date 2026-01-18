import { useLocation, Link } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Track mouse position as motion values for particle opacity
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  useEffect(() => {
    console.error("404 Error:", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const normalizedX = e.clientX / window.innerWidth;
      const normalizedY = e.clientY / window.innerHeight;
      
      setMousePosition({
        x: (normalizedX - 0.5) * 20,
        y: (normalizedY - 0.5) * 20,
      });
      
      mouseX.set(normalizedX);
      mouseY.set(normalizedY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Generate stable particle configs with position for distance calculation
  const particles = useMemo(() => 
    [...Array(100)].map(() => ({
      size: Math.random() * 14 + 6, // 6-20px range
      initialX: Math.random() * window.innerWidth,
      initialY: Math.random() * window.innerHeight,
      targetX: Math.random() * window.innerWidth,
      targetY: Math.random() * window.innerHeight,
      duration: Math.random() * 3 + 2,
    })), []
  );

  // Calculate distance from center (0-1, where 0 = center, 1 = edge)
  const getDistanceFromCenter = (x: number, y: number) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
    const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
    return Math.min(distance / maxDistance, 1);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle, i) => {
          // Calculate opacity based on distance from center
          const avgX = (particle.initialX + particle.targetX) / 2;
          const avgY = (particle.initialY + particle.targetY) / 2;
          const distanceOpacity = 0.15 + getDistanceFromCenter(avgX, avgY) * 0.55; // 0.15 at center, 0.7 at edges
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary/30"
              style={{
                width: particle.size,
                height: particle.size,
              }}
              initial={{
                x: particle.initialX,
                y: particle.initialY,
                opacity: 0,
              }}
              animate={{
                x: [null, particle.targetX],
                y: [null, particle.targetY],
                opacity: [distanceOpacity * 0.5, distanceOpacity, distanceOpacity * 0.5],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          );
        })}
      </div>

      <motion.div
        className="absolute w-96 h-96 rounded-full bg-primary/10 blur-3xl"
        animate={{
          x: mousePosition.x * 2,
          y: mousePosition.y * 2,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
      />
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-accent/20 blur-3xl"
        animate={{
          x: -mousePosition.x * 1.5,
          y: -mousePosition.y * 1.5,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
      />

      <div className="relative z-10 text-center px-6">
        <div className="relative mb-8">
          <motion.h1
            className="text-[12rem] md:text-[16rem] font-black leading-none gradient-text select-none"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              textShadow: "0 0 100px hsl(var(--primary) / 0.3)",
            }}
          >
            404
          </motion.h1>
        </div>

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
