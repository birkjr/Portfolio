/** Smooth 0→1 step (same easing as Timeline cards). */
export function smoothstep(value: number): number {
  return value * value * (3 - 2 * value);
}

export function computeViewportPresence(
  rect: DOMRect,
  viewportHeight: number,
  falloff = viewportHeight * 0.52
): number {
  const viewportCenter = viewportHeight / 2;
  const itemCenter = rect.top + rect.height / 2;
  const distanceFromCenter = Math.abs(itemCenter - viewportCenter);

  let presence = 1 - Math.min(distanceFromCenter / falloff, 1);
  presence = smoothstep(presence);

  if (rect.bottom < 0) {
    const offScreen = Math.min(
      Math.abs(rect.bottom) / (viewportHeight * 0.4),
      1
    );
    presence *= 1 - offScreen * 0.8;
  } else if (rect.top > viewportHeight) {
    const offScreen = Math.min(
      (rect.top - viewportHeight) / (viewportHeight * 0.4),
      1
    );
    presence *= 1 - offScreen * 0.8;
  }

  return presence;
}

export function getNavbarBottom(): number {
  const nav = document.querySelector("nav");
  if (nav instanceof HTMLElement) {
    return nav.getBoundingClientRect().bottom;
  }
  return 96;
}

/** Journal cards: enter from left below center, exit right near navbar / above center. */
export function computeJournalCardMotion(
  rect: DOMRect,
  viewportHeight: number
): { translateX: number; opacity: number } {
  const viewportCenter = viewportHeight / 2;
  const itemCenter = rect.top + rect.height / 2;
  const delta = itemCenter - viewportCenter;
  const absDelta = Math.abs(delta);

  const cardStride = rect.height + 12;
  const settledHalfBand = cardStride * 0.56;
  const enterFalloff = viewportHeight * 0.3;
  const exitFalloff = viewportHeight * 0.62;

  let presence: number;
  if (absDelta <= settledHalfBand) {
    presence = 1;
  } else if (delta > 0) {
    const t = Math.min((absDelta - settledHalfBand) / enterFalloff, 1);
    presence = 1 - Math.pow(smoothstep(t), 0.65);
  } else {
    const t = Math.min((absDelta - settledHalfBand) / exitFalloff, 1);
    presence = 1 - Math.pow(smoothstep(t), 1.35);
  }

  const offset = (1 - presence) * 88;
  const belowCenter = delta >= 0;
  let translateX = belowCenter ? -offset : offset;

  const navBottom = getNavbarBottom();
  const navBuffer = 56;
  if (rect.top < navBottom + navBuffer) {
    const navExit = 1 - Math.max(0, rect.top - navBottom) / (navBuffer + 64);
    translateX = Math.max(translateX, smoothstep(Math.min(navExit, 1)) * 96);
  }

  const opacity = 0.22 + presence * 0.78;

  return { translateX, opacity };
}
