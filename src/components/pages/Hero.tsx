"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import TextType from "@/components/ui/TextType";
import { SectionContainer } from "@/components/animations/SectionContainer";
import { hero } from "@/content/hero";

function PortraitImage() {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <div className="hero-portrait-fallback">BJR</div>;
  }

  return (
    <>
      <Image
        src="/paint_portrait_1.png"
        alt="Birk Ramstad"
        fill
        priority
        unoptimized
        sizes="(max-width: 1024px) 416px, 448px"
        className="hero-portrait-image"
        onError={() => setHasError(true)}
      />
      <div className="hero-portrait-image-overlay" aria-hidden />
    </>
  );
}

function PortraitImageFrame() {
  return (
    <div className="hero-portrait-frame">
      <PortraitImage />
    </div>
  );
}

export function Hero() {
  const { language } = useLanguage();
  const t = hero[language];

  const [tilt, setTilt] = useState({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  });

  const [isVisible, setIsVisible] = useState(false);
  const desktopCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const percentX = e.clientX / window.innerWidth - 0.5;
      const percentY = e.clientY / window.innerHeight - 0.5;

      setTilt({
        rotateX: percentY * -13,
        rotateY: percentX * 13,
        scale: 1.03,
      });
    };

    const handleMouseLeave = () => {
      setTilt({ rotateX: 0, rotateY: 0, scale: 1 });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const node = desktopCardRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      const navElement = document.querySelector("nav");
      const navOffset =
        navElement instanceof HTMLElement ? navElement.offsetHeight : 0;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = Math.max(elementPosition - navOffset, 0);
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const tiltStyle = {
    transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
    transformStyle: "preserve-3d" as const,
  };

  return (
    <SectionContainer variant="hero" id="home">
      <div className="hero-layout">
        <div data-hero-side="left" className="hero-column-left">
          <div className="hero-column-left-inner">
            <div className="section-badge">
              <div className="section-badge-dot" />
              <span className="section-badge-label">{t.info}</span>
            </div>

            <h1 className="hero-headline">
              <span className="hero-headline-line">{t.greeting}</span>
              <span className="hero-headline-typed">
                <TextType
                  text={[t.name]}
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={true}
                  cursorCharacter="|"
                />
              </span>
            </h1>

            <div className="hero-mobile-portrait-wrap">
              <div className="hero-portrait-stack">
                <div className="hero-portrait-orb" />
                <div className="hero-portrait-tilt-wrap hero-portrait-tilt-wrap--enter">
                  <div
                    className="hero-portrait-card hero-portrait-card--mobile"
                    style={tiltStyle}
                  >
                    <div className="hero-portrait-image-section hero-portrait-image-section--mobile">
                      <PortraitImageFrame />
                    </div>
                    <div className="hero-portrait-footer">
                      <div className="hero-portrait-name-row">
                        <p className="hero-portrait-name">{t.name}</p>
                        <div className="hero-portrait-logo-badge">BJR</div>
                      </div>
                      <div className="hero-portrait-tags">
                        {t.tags.map((tag) => (
                          <span key={tag} className="tag-pill">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-cta-row">
            <Button
              onClick={() => scrollToSection("#journal")}
              className="group hero-cta-primary"
            >
              {t.cta}
              <ArrowRight className="hero-cta-primary-icon" />
            </Button>
            <Button
              variant="outline"
              onClick={() => scrollToSection("#contact")}
              className="group hero-cta-secondary"
            >
              <div className="card-shine" aria-hidden />
              <span className="hero-cta-secondary-label">{t.ctaSecondary}</span>
            </Button>
          </div>
        </div>

        <div data-hero-side="right" className="hero-column-right">
          <div className="hero-desktop-portrait-anchor" ref={desktopCardRef}>
            <div className="hero-portrait-orb" />
            <div
              className={`hero-portrait-tilt-wrap hero-portrait-tilt-wrap--desktop ${
                isVisible
                  ? "hero-portrait-tilt-wrap--enter"
                  : "hero-portrait-tilt-wrap--hidden"
              }`}
            >
              <div
                className="hero-portrait-card hero-portrait-card--desktop"
                style={tiltStyle}
              >
                <div className="hero-portrait-image-section hero-portrait-image-section--desktop">
                  <PortraitImageFrame />
                </div>
                <div className="hero-portrait-footer">
                  <div className="hero-meta-row">
                    <div className="hero-meta-chip">
                      <span className="hero-meta-chip-label">{t.role}</span>
                    </div>
                    <div className="hero-meta-chip">
                      <span className="hero-meta-chip-label">{t.born}</span>
                    </div>
                    <div className="hero-meta-chip">
                      <span className="hero-meta-chip-label">{t.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-social-row">
            <a
              href="https://github.com/birkjr"
              target="_blank"
              rel="noopener noreferrer"
              className="group hero-social-link"
            >
              <div className="card-shine" aria-hidden />
              <Github className="hero-social-icon" />
              <span className="hero-social-label">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/birkjramstad/"
              target="_blank"
              rel="noopener noreferrer"
              className="group hero-social-link"
            >
              <div className="card-shine" aria-hidden />
              <Linkedin className="hero-social-icon" />
              <span className="hero-social-label">LinkedIn</span>
            </a>
            <a
              href="mailto:birkrams@gmail.com"
              className="group hero-social-link"
            >
              <div className="card-shine" aria-hidden />
              <Mail className="hero-social-icon" />
              <span className="hero-social-label">Email</span>
            </a>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
