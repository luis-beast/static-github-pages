import { useLocation, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const particleData = [...Array(75)].map((_, i) => {
  const angle = (i / 75) * Math.PI * 2 + Math.random() * 0.5;
  const distance = 0.6 + Math.random() * 0.5;
  const phase = Math.random();
  return {
    angle,
    distance,
    size: Math.random() * 8 + 6,
    scale: Math.random() * 0.5 + 0.5,
    duration: Math.random() * 6 + 8,
    phase,
  };
});

interface CapturedPosition {
  x: number;
  y: number;
  opacity: number;
  scale: number;
  phaseProgress: number;
}

const NotFound = () => {
  const location = useLocation();
  const [mouseState, setMouseState] = useState<"idle" | "active" | "returning">("idle");
  const capturedPositions = useRef<CapturedPosition[]>([]);
  const animationStartTime = useRef<number>(Date.now());

  useEffect(() => {
    console.error("404 Error:", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    let activeTimeout: NodeJS.Timeout;
    let returnTimeout: NodeJS.Timeout;

    const handleMouseMove = () => {
      if (mouseState === "idle") {
        // Capture current positions when transitioning from idle to active
        const currentTime = (Date.now() - animationStartTime.current) / 1000;
        capturedPositions.current = particleData.map((particle) => {
          const centerX = window.innerWidth / 2;
          const centerY = window.innerHeight / 2;
          const outerX = centerX + Math.cos(particle.angle) * centerX * particle.distance;
          const outerY = centerY + Math.sin(particle.angle) * centerY * particle.distance;
          const innerX = centerX + Math.cos(particle.angle) * centerX * 0.2;
          const innerY = centerY + Math.sin(particle.angle) * centerY * 0.2;

          // Calculate where in the animation cycle this particle is
          const cycleProgress = ((currentTime / particle.duration) + particle.phase) % 1;
          
          // Interpolate position based on cycle progress
          let x: number, y: number, opacity: number, scale: number;
          if (cycleProgress < 0.5) {
            const t = cycleProgress / 0.5;
            x = outerX + (innerX - outerX) * t;
            y = outerY + (innerY - outerY) * t;
            opacity = 0.5 + (0.15 - 0.5) * t;
            scale = particle.scale + (particle.scale * 0.7 - particle.scale) * t;
          } else {
            const t = (cycleProgress - 0.5) / 0.5;
            x = innerX + (outerX - innerX) * t;
            y = innerY + (outerY - innerY) * t;
            opacity = 0.15 + (0.5 - 0.15) * t;
            scale = particle.scale * 0.7 + (particle.scale - particle.scale * 0.7) * t;
          }

          return { x, y, opacity, scale, phaseProgress: cycleProgress };
        });
      }

      setMouseState("active");
      clearTimeout(activeTimeout);
      clearTimeout(returnTimeout);

      activeTimeout = setTimeout(() => {
        setMouseState("returning");
        returnTimeout = setTimeout(() => {
          // Update animation start time so phase continues from captured position
          animationStartTime.current = Date.now();
          setMouseState("idle");
        }, 1200);
      }, 200);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(activeTimeout);
      clearTimeout(returnTimeout);
    };
  }, [mouseState]);

  const centerX = typeof window !== "undefined" ? window.innerWidth / 2 : 500;
  const centerY = typeof window !== "undefined" ? window.innerHeight / 2 : 400;

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {particleData.map((particle, i) => {
          const outerX = centerX + Math.cos(particle.angle) * centerX * particle.distance;
          const outerY = centerY + Math.sin(particle.angle) * centerY * particle.distance;
          const innerX = centerX + Math.cos(particle.angle) * centerX * 0.2;
          const innerY = centerY + Math.sin(particle.angle) * centerY * 0.2;

          const captured = capturedPositions.current[i];

          const getAnimation = () => {
            if (mouseState === "active") {
              return {
                x: centerX,
                y: centerY,
                opacity: 0,
                scale: particle.scale * 0.3,
              };
            } else if (mouseState === "returning" && captured) {
              return {
                x: captured.x,
                y: captured.y,
                opacity: captured.opacity,
                scale: captured.scale,
              };
            } else {
              // Idle animation - start from captured position and continue the cycle
              if (captured) {
                if (captured.phaseProgress < 0.5) {
                  // Was moving inward: captured -> inner -> outer -> inner...
                  return {
                    x: [captured.x, innerX, outerX, innerX],
                    y: [captured.y, innerY, outerY, innerY],
                    opacity: [captured.opacity, 0.15, 0.5, 0.15],
                    scale: [captured.scale, particle.scale * 0.7, particle.scale, particle.scale * 0.7],
                  };
                } else {
                  // Was moving outward: captured -> outer -> inner -> outer...
                  return {
                    x: [captured.x, outerX, innerX, outerX],
                    y: [captured.y, outerY, innerY, outerY],
                    opacity: [captured.opacity, 0.5, 0.15, 0.5],
                    scale: [captured.scale, particle.scale, particle.scale * 0.7, particle.scale],
                  };
                }
              } else {
                // Initial animation based on starting phase
                const p = particle.phase;
                if (p < 0.5) {
                  return {
                    x: [outerX, innerX, outerX],
                    y: [outerY, innerY, outerY],
                    opacity: [0.5, 0.15, 0.5],
                    scale: [particle.scale, particle.scale * 0.7, particle.scale],
                  };
                } else {
                  return {
                    x: [innerX, outerX, innerX],
                    y: [innerY, outerY, innerY],
                    opacity: [0.15, 0.5, 0.15],
                    scale: [particle.scale * 0.7, particle.scale, particle.scale * 0.7],
                  };
                }
              }
            }
          };

          const getTransition = () => {
            if (mouseState === "active") {
              return {
                duration: 4 + Math.random() * 2,
                ease: "easeInOut" as const,
              };
            } else if (mouseState === "returning") {
              return {
                duration: 1 + Math.random() * 0.3,
                ease: "easeOut" as const,
              };
            } else {
              const captured = capturedPositions.current[i];
              const startPhase = captured?.phaseProgress ?? particle.phase;
              // Adjust duration based on where we are in the cycle
              const remainingPhase = startPhase < 0.5 ? (0.5 - startPhase) / 0.5 : (1 - startPhase) / 0.5;
              
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
              initial={{
                x: outerX + (innerX - outerX) * particle.phase,
                y: outerY + (innerY - outerY) * particle.phase,
                opacity: 0.5 + (0.15 - 0.5) * particle.phase,
                scale: particle.scale + (particle.scale * 0.7 - particle.scale) * particle.phase,
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
          scale: mouseState === "active" ? 1.5 : 1,
          opacity: mouseState === "active" ? 0.3 : 0.1,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
      />
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-accent/20 blur-3xl"
        animate={{
          scale: mouseState === "active" ? 1.3 : 1,
          opacity: mouseState === "active" ? 0.35 : 0.2,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
      />

      <div className="relative z-10 text-center px-6">
        <motion.div className="relative mb-8" style={{ perspective: 1000 }}>
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
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Lost in Layman's Mind</h2>
          <p className="text-muted-foreground text-lg mb-2">This is not the page you're looking for.</p>
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
          <Button asChild size="lg" className="group relative overflow-hidden">
            <Link to="/">
              <span className="relative z-10 flex items-center gap-2">
                <Home className="w-4 h-4" />
                Go Home
              </span>
            </Link>
          </Button>

          <Button variant="outline" size="lg" onClick={() => window.history.back()} className="group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
