"use client";

import { useEffect, useRef, useState } from "react";

/**
 * CursorEffect – custom cursor dot for desktop only.
 * The native cursor is hidden via a CSS class injected on <body>.
 */
export function CursorEffect() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [isMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(pointer: coarse)").matches;
  });

  useEffect(() => {
    if (isMobile) return;

    document.body.classList.add("cursor-none");

    const onMove = (e: MouseEvent) => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      document.body.classList.remove("cursor-none");
      window.removeEventListener("mousemove", onMove);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      ref={dotRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 rounded-full bg-foreground mix-blend-difference"
      style={{
        willChange: "transform",
        transition: "opacity 0.2s",
      }}
      aria-hidden
    />
  );
}
