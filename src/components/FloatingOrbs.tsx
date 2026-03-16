"use client";

/**
 * FloatingOrbs — ambient aurora background orbs.
 *
 * Three large blurred orbs that slowly drift to give the page
 * a sense of depth and atmosphere. They respect the existing
 * blue/cyan/violet color palette and are extremely subtle
 * (low opacity + huge blur) so they never clash with content.
 *
 * Purely CSS-driven via keyframe animations — zero JS overhead.
 */
export function FloatingOrbs() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {/* Orb 1 — blue, top-left */}
      <div
        className="orb orb-1"
        style={{
          position: "absolute",
          top: "-15%",
          left: "-10%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 40% 40%, rgba(59,130,246,0.18), rgba(59,130,246,0.04) 60%, transparent 80%)",
          filter: "blur(60px)",
          animation: "orbDrift1 22s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* Orb 2 — cyan, bottom-right */}
      <div
        className="orb orb-2"
        style={{
          position: "absolute",
          bottom: "-20%",
          right: "-15%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 60% 60%, rgba(6,182,212,0.14), rgba(6,182,212,0.03) 60%, transparent 80%)",
          filter: "blur(70px)",
          animation: "orbDrift2 28s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* Orb 3 — violet, center */}
      <div
        className="orb orb-3"
        style={{
          position: "absolute",
          top: "35%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 50% 50%, rgba(139,92,246,0.10), rgba(139,92,246,0.02) 60%, transparent 80%)",
          filter: "blur(80px)",
          animation: "orbDrift3 34s ease-in-out infinite",
          willChange: "transform",
        }}
      />
    </div>
  );
}
