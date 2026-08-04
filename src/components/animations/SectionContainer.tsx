"use client";

import { ReactNode, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { isMobileViewport, prefersReducedMotion } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  id?: string;
  variant?: "default" | "hero" | "featured";
  /** Skip built-in scroll reveal (e.g. driven by ScrollIntoMachine). */
  motion?: "depth" | "none";
}

export function SectionContainer({
  children,
  className,
  id,
  variant = "default",
  motion = "depth",
}: SectionContainerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (variant === "hero" || motion === "none") return;

    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    if (prefersReducedMotion()) {
      gsap.set(content, { clearProps: "all", opacity: 1 });
      return;
    }

    const mobile = isMobileViewport();

    const ctx = gsap.context(() => {
      gsap.set(content, {
        transformPerspective: mobile ? 800 : 1200,
        transformOrigin: "50% 50%",
      });

      // Depth entrance from center — no downward slide bias
      gsap.fromTo(
        content,
        {
          opacity: 0,
          scale: mobile ? 0.94 : 0.86,
          filter: mobile ? "none" : "blur(5px)",
        },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: mobile ? 0.55 : 1,
          ease: mobile ? "power2.out" : "power3.out",
          scrollTrigger: {
            trigger: section,
            start: mobile ? "top 92%" : "top 82%",
            end: mobile ? "top 70%" : "top 45%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [variant, motion]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn(
        "section-container",
        variant === "hero" && "section-container--hero",
        variant === "featured" && "section-container--featured",
        className
      )}
      style={
        variant !== "hero" && motion !== "none"
          ? { perspective: "1200px", perspectiveOrigin: "50% 50%" }
          : undefined
      }
    >
      {variant !== "hero" && <div className="section-container-overlay" />}

      <div className="section-container-inner">
        <div
          ref={contentRef}
          className="section-container-content"
          style={
            motion === "none" ? undefined : { transformStyle: "preserve-3d" }
          }
        >
          {children}
        </div>
      </div>
    </section>
  );
}
