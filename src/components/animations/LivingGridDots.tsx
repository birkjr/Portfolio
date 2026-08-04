"use client";

import { useEffect, useRef } from "react";
import { colorThemes } from "@/config/color-themes";

const GRID_SIZE = 20;
const MAX_TWINKLES = 8;
const MAX_CURSOR_DOTS = 10;
const RANDOM_TWINKLE_RADIUS = 1.35;
const CURSOR_TWINKLE_RADIUS = 2.35;
const CURSOR_PULSE_DURATION = 320;
const CURSOR_RESTING_ALPHA = 0.36;
const CURSOR_MOVE_THROTTLE_MS = 32;
const MAGNET_RADIUS = 85;
const MAX_PULL = 11;
const MAGNET_LERP = 0.2;
const BASE_DOT_RADIUS = 1;

interface Twinkle {
  col: number;
  row: number;
  startTime: number;
  duration: number;
}

interface DotOffset {
  x: number;
  y: number;
}

function isDarkTheme() {
  const classList = document.documentElement.classList;
  return (
    classList.contains("dark") ||
    colorThemes.some((theme) => theme.isDark && classList.contains(theme.id))
  );
}

function getTwinkleColor(alpha: number, cursor: boolean) {
  const isDark = isDarkTheme();

  if (cursor) {
    return isDark
      ? `rgba(255, 255, 255, ${Math.min(alpha, 0.9)})`
      : `rgba(100, 116, 139, ${Math.min(alpha, 0.7)})`;
  }

  return isDark
    ? `rgba(255, 255, 255, ${alpha})`
    : `rgba(15, 23, 42, ${alpha})`;
}

function getGridDotColor() {
  return (
    getComputedStyle(document.documentElement)
      .getPropertyValue("--page-grid-dot")
      .trim() || "rgba(15, 23, 42, 0.12)"
  );
}

function getGridDotPosition(col: number, row: number) {
  return { x: col * GRID_SIZE + 2, y: row * GRID_SIZE + 2 };
}

function getDotsInMagnetRange(cursorX: number, cursorY: number) {
  const centerCol = Math.floor(cursorX / GRID_SIZE);
  const centerRow = Math.floor(cursorY / GRID_SIZE);
  const cellRadius = Math.ceil(MAGNET_RADIUS / GRID_SIZE) + 1;
  const dots: { col: number; row: number; dist: number }[] = [];

  for (let dc = -cellRadius; dc <= cellRadius; dc += 1) {
    for (let dr = -cellRadius; dr <= cellRadius; dr += 1) {
      const col = centerCol + dc;
      const row = centerRow + dr;
      const { x, y } = getGridDotPosition(col, row);
      const dist = Math.hypot(x - cursorX, y - cursorY);

      if (dist <= MAGNET_RADIUS) {
        dots.push({ col, row, dist });
      }
    }
  }

  dots.sort((a, b) => a.dist - b.dist);
  return dots;
}

function computeMagneticTarget(
  dotX: number,
  dotY: number,
  cursorX: number,
  cursorY: number
) {
  const dx = cursorX - dotX;
  const dy = cursorY - dotY;
  const dist = Math.hypot(dx, dy);

  if (dist >= MAGNET_RADIUS || dist < 0.5) {
    return { x: 0, y: 0, strength: 0 };
  }

  const strength = Math.max(0, Math.min(1, 1 - dist / MAGNET_RADIUS));
  const pull = strength * strength * MAX_PULL;

  return {
    x: (dx / dist) * pull,
    y: (dy / dist) * pull,
    strength,
  };
}

function cursorPulseStrength(progress: number) {
  if (progress <= 0) return 0;
  if (progress < 0.1) {
    return progress / 0.1;
  }

  return Math.max(0, 1 - (progress - 0.1) / 0.9);
}

function drawTwinkleDot(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  alpha: number,
  cursor: boolean,
  radius = cursor ? CURSOR_TWINKLE_RADIUS : RANDOM_TWINKLE_RADIUS
) {
  const safeRadius = Math.max(0.01, radius);
  ctx.beginPath();
  ctx.arc(x, y, safeRadius, 0, Math.PI * 2);
  ctx.fillStyle = getTwinkleColor(alpha, cursor);
  ctx.fill();
}

function setCursorCssVars(x: number, y: number, active: boolean) {
  const root = document.documentElement;
  root.style.setProperty("--cursor-x", `${x}px`);
  root.style.setProperty("--cursor-y", `${y}px`);
  root.style.setProperty(
    "--magnet-radius",
    active ? `${MAGNET_RADIUS}px` : "0px"
  );
}

export function LivingGridDots() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (reducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const twinkles: Twinkle[] = [];
    const cursorPulses = new Map<string, number>();
    const dotOffsets = new Map<string, DotOffset>();
    const cursor = { x: -9999, y: -9999, active: false };
    let animationId = 0;
    let lastSpawn = 0;
    let lastCursorPulse = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const trimTwinkles = () => {
      if (twinkles.length <= MAX_TWINKLES) return;
      twinkles.splice(0, twinkles.length - MAX_TWINKLES);
    };

    const pushRandomTwinkle = (col: number, row: number) => {
      if (
        twinkles.some((twinkle) => twinkle.col === col && twinkle.row === row)
      ) {
        return;
      }

      twinkles.push({
        col,
        row,
        startTime: performance.now(),
        duration: 1400 + Math.random() * 2000,
      });

      trimTwinkles();
    };

    const triggerCursorPulse = (now: number) => {
      const nearby = getDotsInMagnetRange(cursor.x, cursor.y).slice(
        0,
        MAX_CURSOR_DOTS
      );

      for (const dot of nearby) {
        cursorPulses.set(`${dot.col},${dot.row}`, now);
      }
    };

    const getDotOffset = (key: string) => {
      const existing = dotOffsets.get(key);
      if (existing) return existing;

      const offset = { x: 0, y: 0 };
      dotOffsets.set(key, offset);
      return offset;
    };

    const updateDotOffsets = () => {
      const activeKeys = new Set<string>();

      if (cursor.active) {
        for (const dot of getDotsInMagnetRange(cursor.x, cursor.y)) {
          const key = `${dot.col},${dot.row}`;
          activeKeys.add(key);

          const { x, y } = getGridDotPosition(dot.col, dot.row);
          const target = computeMagneticTarget(x, y, cursor.x, cursor.y);
          const offset = getDotOffset(key);

          offset.x += (target.x - offset.x) * MAGNET_LERP;
          offset.y += (target.y - offset.y) * MAGNET_LERP;
        }
      }

      for (const [key, offset] of dotOffsets) {
        if (activeKeys.has(key)) continue;

        offset.x += (0 - offset.x) * MAGNET_LERP;
        offset.y += (0 - offset.y) * MAGNET_LERP;

        if (Math.abs(offset.x) < 0.05 && Math.abs(offset.y) < 0.05) {
          dotOffsets.delete(key);
        }
      }
    };

    const drawMagneticField = (time: number) => {
      const gridDotColor = getGridDotColor();
      const nearby = cursor.active
        ? getDotsInMagnetRange(cursor.x, cursor.y)
        : [];
      const activeKeys = new Set<string>();
      const nearestKeys = new Set(
        nearby.slice(0, MAX_CURSOR_DOTS).map((dot) => `${dot.col},${dot.row}`)
      );

      for (const dot of nearby) {
        const key = `${dot.col},${dot.row}`;
        activeKeys.add(key);

        const { x, y } = getGridDotPosition(dot.col, dot.row);
        const offset = dotOffsets.get(key) ?? { x: 0, y: 0 };
        const drawX = x + offset.x;
        const drawY = y + offset.y;
        const strength = computeMagneticTarget(
          x,
          y,
          cursor.x,
          cursor.y
        ).strength;
        const isNearest = nearestKeys.has(key);

        let alpha = 0.12 + strength * 0.55;
        let radius = BASE_DOT_RADIUS + strength * 1.1;

        const pulseStart = cursorPulses.get(key);
        if (pulseStart !== undefined) {
          const elapsed = time - pulseStart;
          if (elapsed < CURSOR_PULSE_DURATION) {
            const pulse = cursorPulseStrength(elapsed / CURSOR_PULSE_DURATION);
            alpha += pulse * 0.28;
            radius += pulse * 0.9;
          }
        }

        radius = Math.max(BASE_DOT_RADIUS, radius);

        if (isNearest) {
          alpha = Math.max(alpha, CURSOR_RESTING_ALPHA + strength * 0.35);
          radius = Math.max(
            radius,
            CURSOR_TWINKLE_RADIUS * (0.9 + strength * 0.3)
          );
          drawTwinkleDot(ctx, drawX, drawY, alpha, true, radius);
        } else {
          ctx.beginPath();
          ctx.arc(drawX, drawY, radius, 0, Math.PI * 2);
          ctx.fillStyle = gridDotColor;
          ctx.globalAlpha = 0.55 + strength * 0.45;
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }

      for (const key of cursorPulses.keys()) {
        if (!activeKeys.has(key)) {
          cursorPulses.delete(key);
        }
      }

      for (const [key, offset] of dotOffsets) {
        if (activeKeys.has(key)) continue;

        const [col, row] = key.split(",").map(Number);
        const { x, y } = getGridDotPosition(col, row);

        ctx.beginPath();
        ctx.arc(x + offset.x, y + offset.y, BASE_DOT_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = gridDotColor;
        ctx.fill();
      }
    };

    const getTwinkleDrawPosition = (col: number, row: number) => {
      const { x, y } = getGridDotPosition(col, row);
      const offset = dotOffsets.get(`${col},${row}`);

      if (!offset) {
        return { x, y };
      }

      return { x: x + offset.x, y: y + offset.y };
    };

    const spawnRandomTwinkle = () => {
      const cols = Math.ceil(window.innerWidth / GRID_SIZE);
      const rows = Math.ceil(window.innerHeight / GRID_SIZE);

      pushRandomTwinkle(
        Math.floor(Math.random() * cols),
        Math.floor(Math.random() * rows)
      );
    };

    const onMove = (event: MouseEvent) => {
      cursor.x = event.clientX;
      cursor.y = event.clientY;
      cursor.active = true;
      setCursorCssVars(cursor.x, cursor.y, true);

      const now = performance.now();
      if (now - lastCursorPulse < CURSOR_MOVE_THROTTLE_MS) return;

      triggerCursorPulse(now);
      lastCursorPulse = now;
    };

    const onLeave = () => {
      cursor.active = false;
      cursorPulses.clear();
      setCursorCssVars(cursor.x, cursor.y, false);
    };

    const draw = (time: number) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      ctx.clearRect(0, 0, width, height);

      updateDotOffsets();

      if (time - lastSpawn > 650 + Math.random() * 500) {
        spawnRandomTwinkle();
        lastSpawn = time;
      }

      for (let i = twinkles.length - 1; i >= 0; i -= 1) {
        const twinkle = twinkles[i];
        const elapsed = time - twinkle.startTime;

        if (elapsed > twinkle.duration) {
          twinkles.splice(i, 1);
          continue;
        }

        const progress = elapsed / twinkle.duration;
        const pulse = Math.sin(progress * Math.PI);
        const alpha = pulse * 0.38;

        if (alpha < 0.03) continue;

        const { x, y } = getTwinkleDrawPosition(twinkle.col, twinkle.row);
        drawTwinkleDot(ctx, x, y, alpha, false);
      }

      drawMagneticField(time);

      animationId = requestAnimationFrame(draw);
    };

    resize();
    setCursorCssVars(cursor.x, cursor.y, false);
    window.addEventListener("resize", resize);
    if (!isCoarsePointer) {
      window.addEventListener("mousemove", onMove, { passive: true });
      document.addEventListener("mouseleave", onLeave);
    }
    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      setCursorCssVars(cursor.x, cursor.y, false);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden
    />
  );
}
