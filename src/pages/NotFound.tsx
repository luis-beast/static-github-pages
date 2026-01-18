import { useLocation, Link } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const PARTICLE_COUNT = 75;

interface ParticleConfig {
  angle: number;
  distance: number;
  size: number;
  baseScale: number;
  duration: number;
  phaseOffset: number;
}

const particleConfigs: ParticleConfig[] = [...Array(PARTICLE_COUNT)].map((_, i) => ({
  angle: (i / PARTICLE_COUNT) * Math.PI * 2 + Math.random() * 0.5,
  distance: 0.6 + Math.random() * 0.5,
  size: Math.random() * 8 + 6,
  baseScale: Math.random() * 0.5 + 0.5,
  duration: Math.random() * 6 + 8,
  phaseOffset: Math.random(), // 0-1, where in the cycle this particle starts
}));

// Calculate particle position based on normalized progress (0-1)
const getPositionAtProgress = (
  progress: number,
  config: ParticleConfig,
  centerX: number,
  centerY: number
) => {
  const outerX = centerX + Math.cos(config.angle) * centerX * config.distance;
  const outerY = centerY + Math.sin(config.angle) * centerY * config.distance;
  const innerX = centerX + Math.cos(config.angle) * centerX * 0.2;
  const innerY = centerY + Math.sin(config.angle) * centerY * 0.2;

  // Smooth sine wave for position (0 = outer, 0.5 = inner, 1 = outer)
  const t = Math.sin(progress * Math.PI * 2) * 0.5 + 0.5; // 0 to 1 to 0

  return {
    x: outerX + (innerX - outerX) * t,
    y: outerY + (innerY - outerY) * t,
    opacity: 0.5 - t * 0.35, // 0.5 at outer, 0.15 at inner
    scale: config.baseScale * (1 - t * 0.3), // full at outer, 0.7x at inner
  };
};

const Particle = ({
  config,
  mouseState,
  centerX,
  centerY,
}: {
  config: ParticleConfig;
  index: number;
  mouseState: "idle" | "active" | "returning";
  captureTime: number;
  centerX: number;
  centerY: number;
}) => {
  const startTimeRef = useRef(Date.now());
  const capturedProgressRef = useRef(0);
  const rafRef = useRef<number>();
  const [position, setPosition] = useState(() => {
    return getPositionAtProgress(config.phaseOffset, config, centerX, centerY);
  });

  // Calculate current progress in the animation cycle
  const getCurrentProgress = useCallback(() => {
    const elapsed = (Date.now() - startTimeRef.current) / 1000;
    return (elapsed / config.duration + config.phaseOffset) % 1;
  }, [config.duration, config.phaseOffset]);

  // Idle animation loop using RAF
  useEffect(() => {
    if (mouseState !== "idle") {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    const animate = () => {
      const progress = getCurrentProgress();
      const pos = getPositionAtProgress(progress, config, centerX, centerY);
      setPosition(pos);
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [mouseState, config, centerX, centerY, getCurrentProgress]);

  // Handle mouse state transitions
  useEffect(() => {
    if (mouseState === "active") {
      // Capture current progress when becoming active
      capturedProgressRef.current = getCurrentProgress();
      
      // Animate to center
      const duration = 3000 + Math.random() * 2000;
      const startPos = { ...position };
      const targetPos = { x: centerX, y: centerY, opacity: 0, scale: config.baseScale * 0.3 };
      const startTime = Date.now();

      const animateToCenter = () => {
        const elapsed = Date.now() - startTime;
        const t = Math.min(elapsed / duration, 1);
        const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; // easeInOutQuad

        setPosition({
          x: startPos.x + (targetPos.x - startPos.x) * eased,
          y: startPos.y + (targetPos.y - startPos.y) * eased,
          opacity: startPos.opacity + (targetPos.opacity - startPos.opacity) * eased,
          scale: startPos.scale + (targetPos.scale - startPos.scale) * eased,
        });

        if (t < 1 && mouseState === "active") {
          rafRef.current = requestAnimationFrame(animateToCenter);
        }
      };

      rafRef.current = requestAnimationFrame(animateToCenter);
    } else if (mouseState === "returning") {
      // Return to captured position
      const capturedPos = getPositionAtProgress(capturedProgressRef.current, config, centerX, centerY);
      const duration = 800 + Math.random() * 400;
      const startPos = { ...position };
      const startTime = Date.now();

      const animateBack = () => {
        const elapsed = Date.now() - startTime;
        const t = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic

        setPosition({
          x: startPos.x + (capturedPos.x - startPos.x) * eased,
          y: startPos.y + (capturedPos.y - startPos.y) * eased,
          opacity: startPos.opacity + (capturedPos.opacity - startPos.opacity) * eased,
          scale: startPos.scale + (capturedPos.scale - startPos.scale) * eased,
        });

        if (t < 1 && mouseState === "returning") {
          rafRef.current = requestAnimationFrame(animateBack);
        }
      };

      // Update start time so idle animation continues from captured progress
      startTimeRef.current = Date.now() - capturedProgressRef.current * config.duration * 1000;
      
      rafRef.current = requestAnimationFrame(animateBack);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [mouseState]);

  return (
    <div
      className="absolute rounded-full bg-primary"
      style={{
        width: config.size,
        height: config.size,
        transform: `translate(${position.x - config.size / 2}px, ${position.y - config.size / 2}px) scale(${position.scale})`,
        opacity: position.opacity,
      }}
    />
  );
};

const NotFound = () => {
  const location = useLocation();
  const [mouseState, setMouseState] = useState<"idle" | "active" | "returning">("idle");
  const [captureTime, setCaptureTime] = useState(0);

  useEffect(() => {
    console.error("404 Error:", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    let activeTimeout: NodeJS.Timeout;
    let returnTimeout: NodeJS.Timeout;

    const handleMouseMove = () => {
      if (mouseState === "idle") {
        setCaptureTime(Date.now());
      }

      setMouseState("active");
      clearTimeout(activeTimeout);
      clearTimeout(returnTimeout);

      activeTimeout = setTimeout(() => {
        setMouseState("returning");
        returnTimeout = setTimeout(() => {
          setMouseState("idle");
        }, 1000);
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
        {particleConfigs.map((config, i) => (
          <Particle
            key={i}
            config={config}
            index={i}
            mouseState={mouseState}
            captureTime={captureTime}
            centerX={centerX}
            centerY={centerY}
          />
        ))}
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
