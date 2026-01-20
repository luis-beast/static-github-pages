import { useLocation, Link } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageWrapper from "@/components/PageWrapper";
import usePageTitle from "@/hooks/usePageTitle";

const PARTICLE_COUNT = 75;

interface ParticleState {
  x: number;
  y: number;
  opacity: number;
  scale: number;
}

interface ParticleConfig {
  angle: number;
  distance: number;
  size: number;
  baseScale: number;
  duration: number;
  phaseOffset: number;
}

const NotFound = () => {
  usePageTitle("Page Not Found");
  const location = useLocation();
  const mouseStateRef = useRef<"idle" | "active" | "returning">("idle");
  const [, forceRender] = useState(0);

  const configsRef = useRef<ParticleConfig[]>(
    [...Array(PARTICLE_COUNT)].map((_, i) => ({
      angle: (i / PARTICLE_COUNT) * Math.PI * 2 + Math.random() * 0.5,
      distance: 0.6 + Math.random() * 0.5,
      size: Math.random() * 8 + 6,
      baseScale: Math.random() * 0.5 + 0.5,
      duration: Math.random() * 6 + 8,
      phaseOffset: Math.random(),
    })),
  );

  const particlesRef = useRef<ParticleState[]>([]);
  const timeOffsetsRef = useRef<number[]>(configsRef.current.map(() => 0));
  const capturedRef = useRef<ParticleState[]>([]);
  const capturedProgressRef = useRef<number[]>([]);
  const rafRef = useRef<number>();
  const transitionStartRef = useRef(0);
  const transitionFromRef = useRef<ParticleState[]>([]);
  const activeTimeoutRef = useRef<NodeJS.Timeout>();
  const returnTimeoutRef = useRef<NodeJS.Timeout>();

  const centerX = typeof window !== "undefined" ? window.innerWidth / 2 : 500;
  const centerY = typeof window !== "undefined" ? window.innerHeight / 2 : 400;

  const getPosition = useCallback(
    (configIndex: number, progress: number): ParticleState => {
      const config = configsRef.current[configIndex];
      const outerX = centerX + Math.cos(config.angle) * centerX * config.distance;
      const outerY = centerY + Math.sin(config.angle) * centerY * config.distance;
      const innerX = centerX + Math.cos(config.angle) * centerX * 0.2;
      const innerY = centerY + Math.sin(config.angle) * centerY * 0.2;

      const t = (Math.sin(progress * Math.PI * 2 - Math.PI / 2) + 1) / 2;

      return {
        x: outerX + (innerX - outerX) * t,
        y: outerY + (innerY - outerY) * t,
        opacity: 0.5 - t * 0.35,
        scale: config.baseScale * (1 - t * 0.3),
      };
    },
    [centerX, centerY],
  );

  const getProgress = useCallback((configIndex: number): number => {
    const config = configsRef.current[configIndex];
    const offset = timeOffsetsRef.current[configIndex] || 0;
    const elapsed = Date.now() / 1000;
    return (elapsed / config.duration + config.phaseOffset + offset) % 1;
  }, []);

  const easeInOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  const lerp = (from: ParticleState, to: ParticleState, t: number): ParticleState => ({
    x: from.x + (to.x - from.x) * t,
    y: from.y + (to.y - from.y) * t,
    opacity: from.opacity + (to.opacity - from.opacity) * t,
    scale: from.scale + (to.scale - from.scale) * t,
  });

  useEffect(() => {
    console.error("404 Error:", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    particlesRef.current = configsRef.current.map((_, i) => getPosition(i, configsRef.current[i].phaseOffset));
    forceRender((n) => n + 1);
  }, [getPosition]);

  useEffect(() => {
    const animate = () => {
      const configs = configsRef.current;
      const mouseState = mouseStateRef.current;

      if (mouseState === "idle") {
        particlesRef.current = configs.map((_, i) => getPosition(i, getProgress(i)));
      } else if (mouseState === "active") {
        const elapsed = Date.now() - transitionStartRef.current;
        particlesRef.current = configs.map((config, i) => {
          const duration = 3000 + config.phaseOffset * 2000;
          const t = Math.min(elapsed / duration, 1);
          const eased = easeInOutQuad(t);
          const from = transitionFromRef.current[i] || getPosition(i, config.phaseOffset);
          const target: ParticleState = {
            x: centerX,
            y: centerY,
            opacity: 0,
            scale: config.baseScale * 0.3,
          };
          return lerp(from, target, eased);
        });
      } else if (mouseState === "returning") {
        const elapsed = Date.now() - transitionStartRef.current;
        particlesRef.current = configs.map((config, i) => {
          const duration = 800 + config.phaseOffset * 400;
          const t = Math.min(elapsed / duration, 1);
          const eased = easeOutCubic(t);
          const from = transitionFromRef.current[i] || {
            x: centerX,
            y: centerY,
            opacity: 0,
            scale: config.baseScale * 0.3,
          };
          const target = capturedRef.current[i] || getPosition(i, config.phaseOffset);
          return lerp(from, target, eased);
        });
      }

      forceRender((n) => n + 1);
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [centerX, centerY, getPosition, getProgress]);

  useEffect(() => {
    const handleMouseMove = () => {
      if (activeTimeoutRef.current) clearTimeout(activeTimeoutRef.current);
      if (returnTimeoutRef.current) clearTimeout(returnTimeoutRef.current);

      if (mouseStateRef.current === "idle") {
        capturedRef.current = configsRef.current.map((_, i) => getPosition(i, getProgress(i)));
        capturedProgressRef.current = configsRef.current.map((_, i) => getProgress(i));
        transitionFromRef.current = [...capturedRef.current];
        transitionStartRef.current = Date.now();
        mouseStateRef.current = "active";
      }

      activeTimeoutRef.current = setTimeout(() => {
        transitionFromRef.current = [...particlesRef.current];
        transitionStartRef.current = Date.now();
        mouseStateRef.current = "returning";

        returnTimeoutRef.current = setTimeout(() => {
          const now = Date.now() / 1000;
          configsRef.current.forEach((config, i) => {
            const capturedProgress = capturedProgressRef.current[i] ?? config.phaseOffset;
            const currentBase = now / config.duration + config.phaseOffset;
            timeOffsetsRef.current[i] = capturedProgress - currentBase;
          });
          mouseStateRef.current = "idle";
        }, 1000);
      }, 200);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (activeTimeoutRef.current) clearTimeout(activeTimeoutRef.current);
      if (returnTimeoutRef.current) clearTimeout(returnTimeoutRef.current);
    };
  }, [getPosition, getProgress]);

  return (
    <PageWrapper>
      <div className="relative flex-1 flex items-center justify-center overflow-hidden min-h-[calc(100vh-200px)]">
        <div className="absolute inset-0 overflow-hidden">
          {configsRef.current.map((config, i) => {
            const pos = particlesRef.current[i] || getPosition(i, config.phaseOffset);
            return (
              <div
                key={i}
                className="absolute rounded-full bg-primary will-change-transform"
                style={{
                  width: config.size,
                  height: config.size,
                  transform: `translate(${pos.x - config.size / 2}px, ${pos.y - config.size / 2}px) scale(${pos.scale})`,
                  opacity: pos.opacity,
                }}
              />
            );
          })}
        </div>

        <motion.div
          className="absolute w-96 h-96 rounded-full bg-primary/10 blur-3xl"
          animate={{
            scale: mouseStateRef.current === "active" ? 1.5 : 1,
            opacity: mouseStateRef.current === "active" ? 0.3 : 0.1,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 30 }}
        />
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-accent/20 blur-3xl"
          animate={{
            scale: mouseStateRef.current === "active" ? 1.3 : 1,
            opacity: mouseStateRef.current === "active" ? 0.35 : 0.2,
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
    </PageWrapper>
  );
};

export default NotFound;
