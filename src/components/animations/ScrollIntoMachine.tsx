"use client";

import { ReactNode, useEffect, useRef, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isMobileViewport, prefersReducedMotion } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Share of scroll used for hero → About transition (rest = hold before page continues). */
const TRANSITION_SHARE = 0.52;
const HOLD_SHARE = 0.48;

/**
 * Sticky journey: hero peels left/right, About settles in the real viewport center.
 * Transparent stage so page dots/gradient stay continuous (no solid "extra layer").
 */
export function ScrollIntoMachine({
  hero,
  about,
  aboutMobile,
}: {
  hero: ReactNode;
  about: ReactNode;
  /** Normal stacked About on mobile — defaults to `about`. */
  aboutMobile?: ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  const useSimpleLayout = useSyncExternalStore(
    () => () => {},
    () => prefersReducedMotion() || isMobileViewport(),
    () => true
  );

  useEffect(() => {
    if (useSimpleLayout) return;

    const track = trackRef.current;
    const heroEl = heroRef.current;
    const aboutEl = aboutRef.current;
    if (!track || !heroEl || !aboutEl) return;

    const left = heroEl.querySelector<HTMLElement>('[data-hero-side="left"]');
    const right = heroEl.querySelector<HTMLElement>('[data-hero-side="right"]');

    const ctx = gsap.context(() => {
      gsap.set(heroEl, { opacity: 1, pointerEvents: "auto" });
      gsap.set([left, right].filter(Boolean), {
        x: 0,
        xPercent: 0,
        y: 0,
        yPercent: 0,
        scale: 1,
        opacity: 1,
        force3D: true,
      });
      // Start About at true center (not above), hidden until sides open
      gsap.set(aboutEl, {
        transformOrigin: "50% 50%",
        force3D: true,
        autoAlpha: 0,
        scale: 0.92,
        yPercent: 0,
        y: 0,
        pointerEvents: "none",
      });

      const p = TRANSITION_SHARE;

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: track,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
          invalidateOnRefresh: true,
        },
      });

      // Open the center — sides only, no upward motion
      if (left) {
        tl.to(
          left,
          { xPercent: -70, x: -40, opacity: 0, duration: p * 0.88 },
          0
        );
      }
      if (right) {
        tl.to(
          right,
          { xPercent: 70, x: 40, opacity: 0, duration: p * 0.88 },
          0
        );
      }

      tl.to(
        aboutEl,
        {
          autoAlpha: 1,
          scale: 1,
          duration: p * 0.32,
        },
        p * 0.28
      )
        .set(aboutEl, { pointerEvents: "auto" }, p * 0.52)
        .to(heroEl, { autoAlpha: 0, duration: p * 0.1 }, p * 0.68)
        .set(heroEl, { pointerEvents: "none", visibility: "hidden" }, p * 0.78);

      // Scroll buffer: About stays settled while user scrolls further before release
      tl.to({}, { duration: HOLD_SHARE });

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        if (window.scrollY < 8) tl.progress(0);
      });
    }, trackRef);

    return () => ctx.revert();
  }, [useSimpleLayout]);

  if (useSimpleLayout) {
    return (
      <>
        {hero}
        {aboutMobile ?? about}
      </>
    );
  }

  return (
    <div ref={trackRef} className="relative h-[195vh]">
      {/* Transparent sticky stage — same dots/gradient as the rest of the page */}
      <div className="sticky top-0 h-dvh w-full overflow-hidden bg-transparent">
        <div ref={heroRef} className="absolute inset-0 flex items-center">
          <div className="w-full">{hero}</div>
        </div>

        {/*
          Optical center below the fixed navbar.
          items-center + pt for nav so About doesn't sit too high.
        */}
        <div
          ref={aboutRef}
          className="absolute inset-0 z-[2] flex items-center justify-center bg-transparent px-4 pt-24 sm:px-6 sm:pt-28"
        >
          <div className="w-full max-w-3xl">{about}</div>
        </div>
      </div>
    </div>
  );
}
