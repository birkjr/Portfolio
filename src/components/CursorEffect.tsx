"use client";

import { useEffect, useRef, useState } from "react";

/**
 * CursorEffect – custom magnetic cursor for desktop only.
 *
 * Two layers:
 *  1. A small filled dot (8 px) that snaps exactly to the pointer.
 *  2. A larger ring (36 px) that spring-lags behind the dot.
 *
 * When the pointer is over an interactive element (a, button, [role=button],
 * .hover-glow, .card-shine parent) the ring expands to 56 px and glows.
 *
 * The native cursor is hidden via a CSS class injected on <body>.
 */
export function CursorEffect() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Whether the ring is in "hover" (expanded/glow) state
  const [hovered, setHovered] = useState(false);

  // Raw mouse position
  const mouse = useRef({ x: -200, y: -200 });
  // Spring-lagged ring position
  const ring = useRef({ x: -200, y: -200 });
  const raf = useRef<number>(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Only run on non-touch devices
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(pointer: coarse)");
    if (mq.matches) {
      setIsMobile(true);
      return;
    }

    // Hide native cursor
    document.body.classList.add("cursor-none");

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      // Snap dot immediately
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };

    // Detect hover on interactive targets
    const SELECTOR =
      'a, button, [role="button"], input, textarea, select, label, .hover-glow, .card-project';

    const onEnter = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest(SELECTOR)) setHovered(true);
    };
    const onLeave = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target.closest(SELECTOR)) setHovered(false);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onEnter, { passive: true });
    document.addEventListener("mouseout", onLeave, { passive: true });

    // Spring animation loop for ring
    const SPRING = 0.12;
    const loop = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * SPRING;
      ring.current.y += (mouse.current.y - ring.current.y) * SPRING;

      if (ringRef.current) {
        const size = hovered ? 56 : 36;
        ringRef.current.style.transform = `translate(${ring.current.x - size / 2}px, ${ring.current.y - size / 2}px)`;
      }

      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    return () => {
      document.body.classList.remove("cursor-none");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, [hovered]);

  if (isMobile) return null;

  return (
    <>
      {/* Primary dot — snaps to cursor */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-2 h-2 rounded-full bg-blue-500 mix-blend-difference"
        style={{
          willChange: "transform",
          transition: "opacity 0.2s",
        }}
        aria-hidden
      />

      {/* Ring — springs after cursor */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full border border-blue-400/60"
        style={{
          width: hovered ? 56 : 36,
          height: hovered ? 56 : 36,
          willChange: "transform, width, height",
          transition:
            "width 0.25s cubic-bezier(0.34,1.56,0.64,1), height 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease, background 0.25s ease",
          background: hovered ? "rgba(59,130,246,0.10)" : "transparent",
          boxShadow: hovered
            ? "0 0 18px 4px rgba(59,130,246,0.25), 0 0 6px 1px rgba(6,182,212,0.15)"
            : "none",
        }}
        aria-hidden
      />
    </>
  );
}
