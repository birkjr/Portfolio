"use client";

import React, { useEffect, useRef, useState } from "react";

// Exporting with the same name `HumanAvatar` to keep Navbar import unchanged
export const HumanAvatar: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const leftEyeRef = useRef<HTMLDivElement | null>(null);
  const rightEyeRef = useRef<HTMLDivElement | null>(null);
  const [leftOffset, setLeftOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [rightOffset, setRightOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const computeOffset = (eye: HTMLDivElement | null) => {
        if (!eye) return { x: 0, y: 0 } as const;
        const rect = eye.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const distance = Math.hypot(dx, dy) || 1;
        const maxMove = 4;
        const nx = (dx / distance) * maxMove;
        const ny = (dy / distance) * maxMove;
        return { x: Math.round(nx), y: Math.round(ny) } as const;
      };

      setLeftOffset(computeOffset(leftEyeRef.current));
      setRightOffset(computeOffset(rightEyeRef.current));
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setIsBlinking(true);
      const timeoutId = window.setTimeout(() => setIsBlinking(false), 140);
      // Ensure timeout cleared if component unmounts shortly after scheduling
      return () => window.clearTimeout(timeoutId);
    }, 3000);
    return () => window.clearInterval(intervalId);
  }, []);

  const eyeStyle: React.CSSProperties = {
    width: 10,
    height: 14,
    borderRadius: "100%",
    backgroundColor: "#fff",
    border: "0px solid rgba(207, 207, 207, 0.65)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "inset 0 0 0 0px rgb(255, 255, 255)",
    position: "relative",
    overflow: "hidden",
  };

  const pupilStyle: React.CSSProperties = {
    width: 6,
    height: 6,
    borderRadius: "50%",
    aspectRatio: "1 / 1",
    flex: "0 0 auto",
    display: "block",
    backgroundColor: "rgb(46, 34, 12)",
    transition: "transform 40ms linear",
    zIndex: 1,
  };

  const eyelidCommon: React.CSSProperties = {
    position: "absolute",
    left: 0,
    width: "100%",
    backgroundColor: "#000",
    zIndex: 2,
    transition: "transform 120ms ease-in-out",
  };

  const eyelidTop: React.CSSProperties = {
    ...eyelidCommon,
    top: 0,
    height: "60%",
    transformOrigin: "top",
    transform: isBlinking ? "scaleY(1)" : "scaleY(0)",
  };

  const eyelidBottom: React.CSSProperties = {
    ...eyelidCommon,
    bottom: 0,
    height: "60%",
    transformOrigin: "bottom",
    transform: isBlinking ? "scaleY(1)" : "scaleY(0)",
  };

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        width: 56,
        height: 28,
      }}
      aria-label="eyes-follow-mouse"
    >
      <div ref={leftEyeRef} style={eyeStyle}>
        <div style={eyelidTop} />
        <div style={{ ...pupilStyle, transform: `translate3d(${leftOffset.x}px, ${leftOffset.y}px, 0)` }} />
        <div style={eyelidBottom} />
      </div>
      <div ref={rightEyeRef} style={eyeStyle}>
        <div style={eyelidTop} />
        <div style={{ ...pupilStyle, transform: `translate3d(${rightOffset.x}px, ${rightOffset.y}px, 0)` }} />
        <div style={eyelidBottom} />
      </div>
    </div>
  );
};
