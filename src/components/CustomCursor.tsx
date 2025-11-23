"use client";

import { useEffect } from "react";

export default function CustomCursor() {
  useEffect(() => {
    // Create large blue circle with magnification effect (like in the image)
    const cursorBg = document.createElement("div");
    cursorBg.style.cssText = `
      position: fixed;
      width: 1000px;
      height: 1000px;
      background: radial-gradient(circle, rgba(59, 193, 246, 0.8) 0%, rgba(0, 98, 255, 0.4) 30%, rgba(0, 98, 255, 0.1) 60%, transparent 80%);
      border-radius: 100%;
      pointer-events: none;
      z-index: 9998;
      transform: translate(-50%, -50%);
      transition: transform 0.3s ease-out;
      backdrop-filter: blur(500px) brightness(1.5);
      -webkit-backdrop-filter: blur(20px) brightness(1.5);
      box-shadow: 0 0 200px rgba(59, 193, 246, 0.6), inset 0 0 100px rgba(0, 98, 255, 0.3);
    `;
    document.body.appendChild(cursorBg);

    // Create main cursor dot (bright blue circle)
    const cursor = document.createElement("div");
    cursor.style.cssText = `
      position: fixed;
      width: 30px;
      height: 30px;
      background: rgba(59, 193, 246, 1);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      transition: transform 0.15s ease-out;
      box-shadow: 0 0 50px rgba(59, 193, 246, 1), 0 0 100px rgba(0, 98, 255, 0.8), 0 0 150px rgba(59, 193, 246, 0.5);
    `;
    document.body.appendChild(cursor);

    const updateCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      cursorBg.style.left = `${e.clientX}px`;
      cursorBg.style.top = `${e.clientY}px`;
    };

    document.addEventListener("mousemove", updateCursor);

    return () => {
      document.removeEventListener("mousemove", updateCursor);
      document.body.removeChild(cursor);
      document.body.removeChild(cursorBg);
    };
  }, []);

  return null;
}
