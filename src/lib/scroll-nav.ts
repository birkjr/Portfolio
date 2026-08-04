import { isMobileViewport, prefersReducedMotion } from "@/lib/utils";

/** Matches ScrollIntoMachine — share of scrub timeline for hero → About transition. */
export const SCROLL_JOURNEY_TRANSITION_SHARE = 0.52;

function getNavOffset(): number {
  const nav = document.querySelector("nav");
  return nav instanceof HTMLElement ? nav.offsetHeight : 0;
}

function isScrollJourneyActive(): boolean {
  if (typeof window === "undefined") return false;
  if (isMobileViewport() || prefersReducedMotion()) return false;
  return document.querySelector("[data-scroll-machine]") !== null;
}

function getScrollJourneyTarget(progress: number): number {
  const track = document.querySelector(
    "[data-scroll-machine]"
  ) as HTMLElement | null;
  if (!track) return 0;

  const scrollRange = Math.max(track.offsetHeight - window.innerHeight, 0);
  return track.offsetTop + progress * scrollRange;
}

/**
 * Scroll to a nav target. On desktop scroll-journey, #home and #about map to
 * scrub progress (not DOM rects — sticky overlay breaks getBoundingClientRect).
 */
export function scrollToSection(href: string) {
  const id = href.startsWith("#") ? href.slice(1) : href;
  const navOffset = getNavOffset();

  if (isScrollJourneyActive()) {
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (id === "about") {
      const top = getScrollJourneyTarget(SCROLL_JOURNEY_TRANSITION_SHARE);
      window.scrollTo({
        top: Math.max(top - navOffset * 0.25, 0),
        behavior: "smooth",
      });
      return;
    }
  }

  const element = document.getElementById(id);
  if (!element) return;

  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
  const offsetPosition = Math.max(elementPosition - navOffset, 0);

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
}
