"use client";

/**
 * FloatingOrbs — ambient background orbs.
 * Single neutral tone for subtle depth without rainbow colors.
 */
export function FloatingOrbs() {
  const orbStyle = {
    borderRadius: "50%",
    filter: "blur(60px)",
    willChange: "transform" as const,
    background:
      "radial-gradient(circle at 40% 40%, rgba(100,116,139,0.12), rgba(100,116,139,0.02) 60%, transparent 80%)",
  };

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div
        className="orb orb-1"
        style={{
          position: "absolute",
          top: "-15%",
          left: "-10%",
          width: 600,
          height: 600,
          animation: "orbDrift1 22s ease-in-out infinite",
          ...orbStyle,
        }}
      />
      <div
        className="orb orb-2"
        style={{
          position: "absolute",
          bottom: "-20%",
          right: "-15%",
          width: 700,
          height: 700,
          animation: "orbDrift2 28s ease-in-out infinite",
          ...orbStyle,
        }}
      />
      <div
        className="orb orb-3"
        style={{
          position: "absolute",
          top: "35%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 500,
          height: 500,
          animation: "orbDrift3 34s ease-in-out infinite",
          ...orbStyle,
        }}
      />
    </div>
  );
}
