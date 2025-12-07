"use client";

import { useState, useEffect } from "react";

interface TextTypeProps {
  text: string[];
  typingSpeed?: number;
  pauseDuration?: number;
  showCursor?: boolean;
  cursorCharacter?: string;
  loop?: boolean;
}

export default function TextType({
  text,
  typingSpeed = 75,
  pauseDuration = 1500,
  showCursor = true,
  cursorCharacter = "|",
  loop = false,
}: TextTypeProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (text.length === 0) return;
    if (isComplete && !loop) return; // Stop if complete and loop is disabled

    const currentText = text[currentTextIndex];
    let timeout: NodeJS.Timeout;

    if (isPaused) {
      if (loop) {
        timeout = setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, pauseDuration);
      } else {
        // If not looping, just stop and hide cursor after pause
        timeout = setTimeout(() => {
          setIsComplete(true);
        }, pauseDuration);
      }
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
        if (loop) {
          setIsPaused(true);
        } else {
          setIsComplete(true);
        }
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
    loop,
    isComplete,
  ]);

  return (
    <span>
      {displayedText}
      {showCursor && !isComplete && (
        <span className="animate-pulse" style={{ opacity: 1 }}>
          {cursorCharacter}
        </span>
      )}
    </span>
  );
}
