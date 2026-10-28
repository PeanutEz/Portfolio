"use client";

import { useEffect, useSyncExternalStore, type ReactNode } from "react";
import { MotionConfig, motion, useScroll, useSpring } from "framer-motion";
import Lenis from "lenis";

function subscribeToMotionPreference(onChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function readMotionPreference() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function readServerMotionPreference() {
  return false;
}

export function useMotionPreference() {
  return useSyncExternalStore(
    subscribeToMotionPreference,
    readMotionPreference,
    readServerMotionPreference,
  );
}

export default function MotionProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useMotionPreference();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 30 });

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | undefined;
    let frame = 0;

    function configure() {
      cancelAnimationFrame(frame);
      lenis?.destroy();
      lenis = undefined;
      if (media.matches) return;

      lenis = new Lenis({ duration: 1, smoothWheel: true, anchors: true });
      function tick(time: number) {
        lenis?.raf(time);
        frame = requestAnimationFrame(tick);
      }
      frame = requestAnimationFrame(tick);
    }

    configure();
    media.addEventListener("change", configure);
    return () => {
      cancelAnimationFrame(frame);
      lenis?.destroy();
      media.removeEventListener("change", configure);
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: "0 0 auto",
          height: 2,
          background: "var(--accent)",
          transformOrigin: "left",
          scaleX: reducedMotion ? scrollYProgress : progress,
          zIndex: 60,
          pointerEvents: "none",
        }}
      />
      {children}
    </MotionConfig>
  );
}
