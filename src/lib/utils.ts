import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** IntersectionObserver options for grid reveal animations (Skills). */
export function getGridRevealObserverOptions(): IntersectionObserverInit {
  if (typeof window === "undefined") {
    return { rootMargin: "-40% 0px -40% 0px", threshold: 0 };
  }

  const isMobile = window.matchMedia("(max-width: 767px)").matches;

  return {
    // Mobile: trigger as the grid enters the viewport.
    // Desktop: trigger when the grid reaches the vertical center band.
    rootMargin: isMobile ? "0px 0px -6% 0px" : "-40% 0px -40% 0px",
    threshold: 0,
  };
}

export function isMobileViewport(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 767px)").matches;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
