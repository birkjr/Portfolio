"use client";

import { useEffect, useRef } from "react";

const GRID_SIZE = 20;
const MAX_TWINKLES = 8;
const MAX_CURSOR_DOTS = 8;
const RANDOM_TWINKLE_RADIUS = 1.35;
const CURSOR_TWINKLE_RADIUS = 2.35;
const CURSOR_PULSE_DURATION = 320;
const CURSOR_RESTING_ALPHA = 0.36;
const CURSOR_CELL_RADIUS = 2;
const CURSOR_MOVE_THROTTLE_MS = 32;

interface Twinkle {
  col: number;
  row: number;
  startTime: number;
  duration: number;
}

function getTwinkleColor(alpha: number, cursor: boolean) {
  const isDark = document.documentElement.classList.contains("dark");

  if (cursor) {
    return isDark
      ? `rgba(255, 255, 255, ${Math.min(alpha, 0.9)})`
      : `rgba(100, 116, 139, ${Math.min(alpha, 0.7)})`;
  }

  return isDark
    ? `rgba(255, 255, 255, ${alpha})`
    : `rgba(15, 23, 42, ${alpha})`;
}

function getNearbyGridDots(cursorX: number, cursorY: number) {
  const centerCol = Math.floor(cursorX / GRID_SIZE);
  const centerRow = Math.floor(cursorY / GRID_SIZE);
  const dots: { col: number; row: number; dist: number }[] = [];

  for (let dc = -CURSOR_CELL_RADIUS; dc <= CURSOR_CELL_RADIUS; dc += 1) {
    for (let dr = -CURSOR_CELL_RADIUS; dr <= CURSOR_CELL_RADIUS; dr += 1) {
      const col = centerCol + dc;
      const row = centerRow + dr;
      const x = col * GRID_SIZE + 2;
      const y = row * GRID_SIZE + 2;
      dots.push({ col, row, dist: Math.hypot(x - cursorX, y - cursorY) });
    }
  }

  dots.sort((a, b) => a.dist - b.dist);
  return dots;
}

function cursorPulseStrength(progress: number) {
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
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = getTwinkleColor(alpha, cursor);
  ctx.fill();
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
      const nearby = getNearbyGridDots(cursor.x, cursor.y).slice(
        0,
        MAX_CURSOR_DOTS
      );

      for (const dot of nearby) {
        cursorPulses.set(`${dot.col},${dot.row}`, now);
      }
    };

    const drawCursorHalo = (time: number) => {
      if (!cursor.active) return;

      const nearby = getNearbyGridDots(cursor.x, cursor.y).slice(
        0,
        MAX_CURSOR_DOTS
      );
      const activeKeys = new Set<string>();

      for (const dot of nearby) {
        const key = `${dot.col},${dot.row}`;
        activeKeys.add(key);

        const x = dot.col * GRID_SIZE + 2;
        const y = dot.row * GRID_SIZE + 2;

        let alpha = CURSOR_RESTING_ALPHA;
        let radius = CURSOR_TWINKLE_RADIUS * 0.96;

        const pulseStart = cursorPulses.get(key);
        if (pulseStart !== undefined) {
          const elapsed = time - pulseStart;
          if (elapsed < CURSOR_PULSE_DURATION) {
            const strength = cursorPulseStrength(
              elapsed / CURSOR_PULSE_DURATION
            );
            alpha = CURSOR_RESTING_ALPHA + strength * 0.42;
            radius = CURSOR_TWINKLE_RADIUS * (0.96 + strength * 0.24);
          }
        }

        drawTwinkleDot(ctx, x, y, alpha, true, radius);
      }

      for (const key of cursorPulses.keys()) {
        if (!activeKeys.has(key)) {
          cursorPulses.delete(key);
        }
      }
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

      const now = performance.now();
      if (now - lastCursorPulse < CURSOR_MOVE_THROTTLE_MS) return;

      triggerCursorPulse(now);
      lastCursorPulse = now;
    };

    const onLeave = () => {
      cursor.active = false;
      cursorPulses.clear();
    };

    const draw = (time: number) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      ctx.clearRect(0, 0, width, height);

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

        const x = twinkle.col * GRID_SIZE + 2;
        const y = twinkle.row * GRID_SIZE + 2;

        drawTwinkleDot(ctx, x, y, alpha, false);
      }

      drawCursorHalo(time);

      animationId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    if (!isCoarsePointer) {
      window.addEventListener("mousemove", onMove, { passive: true });
      document.addEventListener("mouseleave", onLeave);
    }
    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
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
