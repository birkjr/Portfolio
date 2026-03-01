"use client";

import { useState, useEffect, useRef } from "react";

const SECTION_IDS = [
  "education",
  "experience",
  "projects",
  "ctf-scripts",
  "skills",
];
const HEADING_BOX_HEIGHT = 140;

function getPathData(
  centerX: number,
  heroBottom: number,
  boxes: { top: number; bottom: number; left: number; right: number }[],
  docHeight: number
): string {
  const parts: string[] = [];
  parts.push(`M ${centerX} ${heroBottom}`);
  for (let i = 0; i < boxes.length; i++) {
    const b = boxes[i];
    parts.push(`L ${centerX} ${b.top}`);
    parts.push(`L ${b.left} ${b.top}`);
    parts.push(`L ${b.left} ${b.bottom}`);
    parts.push(`L ${b.right} ${b.bottom}`);
    parts.push(`L ${b.right} ${b.top}`);
    parts.push(`L ${b.left} ${b.top}`);
    if (i < boxes.length - 1) {
      parts.push(`L ${centerX} ${b.top}`);
      parts.push(`L ${centerX} ${boxes[i + 1].top}`);
    }
  }
  const last = boxes[boxes.length - 1];
  if (last) parts.push(`L ${centerX} ${last.top}`);
  parts.push(`L ${centerX} ${docHeight}`);
  return parts.join(" ");
}

export function ScrollProgressLine() {
  const [heroBottom, setHeroBottom] = useState(0);
  const [pathD, setPathD] = useState("");
  const [pathLength, setPathLength] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [docHeight, setDocHeight] = useState(0);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const measure = () => {
      const sy = window.scrollY;
      const vh = window.innerHeight;
      const dh = document.documentElement.scrollHeight;
      const centerX = window.innerWidth / 2;

      const home = document.getElementById("home");
      const heroBot = home ? home.getBoundingClientRect().bottom + sy : vh;

      const boxes: {
        top: number;
        bottom: number;
        left: number;
        right: number;
      }[] = [];
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const top = r.top + sy;
        boxes.push({
          top,
          bottom: top + HEADING_BOX_HEIGHT,
          left: r.left + window.scrollX,
          right: r.right + window.scrollX,
        });
      }

      setScrollY(sy);
      setViewportHeight(vh);
      setViewportWidth(window.innerWidth);
      setDocHeight(dh);
      setHeroBottom(heroBot);
      setPathD(getPathData(centerX, heroBot, boxes, dh));
    };

    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);

    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    if (!pathRef.current || !pathD) return;
    setPathLength(pathRef.current.getTotalLength());
  }, [pathD]);

  const denom = docHeight - viewportHeight - heroBottom;
  const progress =
    heroBottom > 0 && denom > 0
      ? Math.max(0, Math.min(1, (scrollY - heroBottom) / denom))
      : 0;
  const visibleLength = progress * pathLength;
  const dashOffset = pathLength - visibleLength;

  const showDot = heroBottom > 0 && scrollY >= heroBottom;
  const dotTop = heroBottom - scrollY;

  if (!pathD) return null;

  return (
    <>
      {/* Dot under hero – only visible when past hero */}
      {showDot && (
        <div
          className="fixed left-1/2 z-0 pointer-events-none w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-blue-400 bg-slate-900/90 shadow-lg shadow-blue-500/30"
          style={{ top: `${dotTop}px` }}
          aria-hidden
        />
      )}

      {/* SVG path: fixed, viewBox follows scroll so path is in document space */}
      <div
        className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden"
        aria-hidden
      >
        <svg
          width="100%"
          height="100%"
          viewBox={`0 ${scrollY} ${viewportWidth || 1024} ${viewportHeight || 768}`}
          preserveAspectRatio="none"
          className="absolute left-0 top-0"
        >
          <defs>
            <linearGradient
              id="scroll-line-gradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="rgb(59, 130, 246)" />
              <stop offset="50%" stopColor="rgb(139, 92, 246)" />
              <stop offset="100%" stopColor="rgb(6, 182, 212)" />
            </linearGradient>
          </defs>
          <path
            ref={pathRef}
            d={pathD}
            fill="none"
            stroke="url(#scroll-line-gradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={pathLength}
            strokeDashoffset={dashOffset}
            style={{ transition: "stroke-dashoffset 0.1s ease-out" }}
          />
        </svg>
      </div>
    </>
  );
}
