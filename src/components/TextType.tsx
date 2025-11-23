"use client";

import { useState, useEffect } from "react";

interface TextTypeProps {
  text: string[];
  typingSpeed?: number;
  pauseDuration?: number;
  showCursor?: boolean;
  cursorCharacter?: string;
}

export default function TextType({
  text,
  typingSpeed = 75,
  pauseDuration = 1500,
  showCursor = true,
  cursorCharacter = "|",
}: TextTypeProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (text.length === 0) return;

    const currentText = text[currentTextIndex];
    let timeout: NodeJS.Timeout;

    if (isPaused) {
      timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
    } else if (isDeleting) {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText((prev) => prev.slice(0, -1));
        }, typingSpeed / 2);
      } else {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % text.length);
      }
    } else {
      if (displayedText.length < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayedText((prev) => currentText.slice(0, prev.length + 1));
        }, typingSpeed);
      } else {
        setIsPaused(true);
      }
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [
    displayedText,
    isDeleting,
    isPaused,
    currentTextIndex,
    text,
    typingSpeed,
    pauseDuration,
  ]);

  return (
    <span>
      {displayedText}
      {showCursor && (
        <span className="animate-pulse" style={{ opacity: 1 }}>
          {cursorCharacter}
        </span>
      )}
    </span>
  );
}
