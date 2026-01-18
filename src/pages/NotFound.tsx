import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

// Pre-generate stable particle data
const particleData = [...Array(75)].map((_, i) => {
  const angle = (i / 75) * Math.PI * 2 + Math.random() * 0.5;
  const distance = 0.6 + Math.random() * 0.5;
  const phase = Math.random(); // 0-1 representing where in the animation cycle to start
  return {
    angle,
    distance,
    size: Math.random() * 8 + 6,
    scale: Math.random() * 0.5 + 0.5,
    duration: Math.random() * 6 + 8,
    phase, // Starting phase of animation
  };
});

const NotFound = () => {
  const location = useLocation();
  const [mouseState, setMouseState] = useState<'idle' | 'active' | 'returning'>('idle');

  useEffect(() => {
    console.error("404 Error:", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    let activeTimeout: NodeJS.Timeout;
    let returnTimeout: NodeJS.Timeout;
    
    const handleMouseMove = () => {
      setMouseState('active');
      clearTimeout(activeTimeout);
      clearTimeout(returnTimeout);
      
      activeTimeout = setTimeout(() => {
        setMouseState('returning');
        returnTimeout = setTimeout(() => {
          setMouseState('idle');
        }, 1200); // Time to animate back out
      }, 200);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(activeTimeout);
      clearTimeout(returnTimeout);
    };
  }, []);

  const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 500;
  const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 400;

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {particleData.map((particle, i) => {
          const outerX = centerX + Math.cos(particle.angle) * centerX * particle.distance;
          const outerY = centerY + Math.sin(particle.angle) * centerY * particle.distance;
          const innerX = centerX + Math.cos(particle.angle) * centerX * 0.2;
          const innerY = centerY + Math.sin(particle.angle) * centerY * 0.2;
          
          const getAnimation = () => {
            if (mouseState === 'active') {
              return {
                x: centerX,
                y: centerY,
                opacity: 0,
                scale: particle.scale * 0.3,
              };
            } else if (mouseState === 'returning') {
              return {
                x: outerX,
                y: outerY,
                opacity: 0.5,
                scale: particle.scale,
              };
            } else {
              // Use phase to create different starting points in the animation
              // Reorder the keyframes based on phase
              const p = particle.phase;
              if (p < 0.33) {
                // Start from outer, go in, come back
                return {
                  x: [outerX, innerX, outerX],
                  y: [outerY, innerY, outerY],
                  opacity: [0.5, 0.15, 0.5],
                  scale: [particle.scale, particle.scale * 0.7, particle.scale],
                };
              } else if (p < 0.66) {
                // Start from inner, go out, come back
                return {
                  x: [innerX, outerX, innerX],
                  y: [innerY, outerY, innerY],
                  opacity: [0.15, 0.5, 0.15],
                  scale: [particle.scale * 0.7, particle.scale, particle.scale * 0.7],
                };
              } else {
                // Start from middle-ish point
                const midX = (outerX + innerX) / 2;
                const midY = (outerY + innerY) / 2;
                return {
                  x: [midX, outerX, innerX, midX],
                  y: [midY, outerY, innerY, midY],
                  opacity: [0.3, 0.5, 0.15, 0.3],
                  scale: [particle.scale * 0.85, particle.scale, particle.scale * 0.7, particle.scale * 0.85],
                };
              }
            }
          };
          
          const getTransition = () => {
            if (mouseState === 'active') {
              return {
                duration: 4 + Math.random() * 2,
                ease: "easeInOut" as const,
              };
            } else if (mouseState === 'returning') {
              return {
                duration: 1 + Math.random() * 0.3,
                ease: "easeOut" as const,
              };
            } else {
              return {
                duration: particle.duration,
                ease: "easeInOut" as const,
                repeat: Infinity,
                delay: 0,
              };
            }
          };
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary"
              style={{
                width: particle.size,
                height: particle.size,
              }}
              animate={getAnimation()}
              transition={getTransition()}
            />
          );
        })}
      </div>

      <motion.div
        className="absolute w-96 h-96 rounded-full bg-primary/10 blur-3xl"
        animate={{
          scale: mouseState === 'active' ? 1.5 : 1,
          opacity: mouseState === 'active' ? 0.3 : 0.1,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
      />
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-accent/20 blur-3xl"
        animate={{
          scale: mouseState === 'active' ? 1.3 : 1,
          opacity: mouseState === 'active' ? 0.35 : 0.2,
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
