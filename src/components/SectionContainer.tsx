"use client";

import { ReactNode, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
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
}

export function SectionContainer({
  children,
  className,
  id,
  variant = "default",
}: SectionContainerProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (variant === "hero") return; // Skip animation for hero

    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "top 50%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [variant]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn(
        "relative py-8 sm:py-12 md:py-16 lg:py-20",
        variant === "hero" &&
          "min-h-[70vh] sm:min-h-[80vh] md:min-h-[85vh] flex items-center pt-32 sm:pt-28 md:pt-28 scroll-mt-32 sm:scroll-mt-24 md:scroll-mt-28",
        variant === "featured" && "py-12 sm:py-16 md:py-20",
        className
      )}
    >
      {/* Subtle background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/5 to-transparent dark:via-blue-950/10 pointer-events-none" />

      {/* Content wrapper */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
