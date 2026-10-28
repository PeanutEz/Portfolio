"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMotionPreference } from "./MotionProvider";

const SESSION_KEY = "luke-portfolio-intro";

export default function Loader() {
  const reducedMotion = useMotionPreference();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
    } catch {
      // Storage can be unavailable in private browsers; the intro still finishes.
    }

    const started = performance.now();
    const show = window.setTimeout(() => {
      setVisible(true);
      try {
        sessionStorage.setItem(SESSION_KEY, "seen");
      } catch {
        // The one-second intro does not depend on storage access.
      }
    }, 0);
    const tick = window.setInterval(() => {
      setProgress(
        Math.min(100, Math.round(((performance.now() - started) / 800) * 100)),
      );
    }, 32);
    const finish = window.setTimeout(() => {
      clearInterval(tick);
      setProgress(100);
      setVisible(false);
    }, 850);

    return () => {
      clearTimeout(show);
      clearTimeout(finish);
      clearInterval(tick);
    };
  }, []);

  if (reducedMotion) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          initial={false}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "grid",
            placeContent: "center",
            background: "var(--background)",
            color: "var(--text)",
            pointerEvents: "none",
          }}
        >
          <div style={{ width: 248 }}>
            <p
              style={{
                fontSize: 48,
                fontWeight: 650,
                letterSpacing: "-0.06em",
                margin: "0 0 38px",
              }}
            >
              LUKE<span style={{ color: "var(--accent)" }}>.</span>
            </p>
            <div
              style={{
                height: 2,
                background: "var(--line)",
                overflow: "hidden",
              }}
            >
              <motion.div
                style={{
                  height: "100%",
                  background: "var(--accent)",
                  transformOrigin: "left",
                  scaleX: progress / 100,
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                marginTop: 16,
                color: "var(--muted)",
                fontFamily: "monospace",
                fontSize: 10,
                letterSpacing: ".08em",
              }}
            >
              <span>INITIALIZING PORTFOLIO</span>
              <span>{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
