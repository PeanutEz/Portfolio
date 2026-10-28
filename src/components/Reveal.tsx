"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useAnimationControls, useInView } from "framer-motion";
import { useMotionPreference } from "./MotionProvider";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function Reveal({
  children,
  className,
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const armed = useRef(false);
  const entered = useRef(false);
  const controls = useAnimationControls();
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const reducedMotion = useMotionPreference();

  useEffect(() => {
    if (
      reducedMotion ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      controls.stop();
      controls.set({ opacity: 1, y: 0 });
      entered.current = true;
      return;
    }
    if (!armed.current) {
      armed.current = true;
      // Preserve content already painted by SSR, including restored scroll positions.
      if (
        ref.current &&
        ref.current.getBoundingClientRect().top < window.innerHeight
      ) {
        entered.current = true;
        return;
      }
      controls.set({ opacity: 0, y: 22 });
    }
    if (inView && !entered.current) {
      entered.current = true;
      void controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
      });
    }
  }, [controls, delay, inView, reducedMotion]);

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
}
