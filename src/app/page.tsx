"use client";

import Navbar from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Education } from "@/components/Education";
import { Projects } from "@/components/Projects";
import { SystemsBuilt } from "@/components/SystemsBuilt";
// import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Footer } from "@/components/Footer";
import { CursorEffect } from "@/components/CursorEffect";
import { FloatingOrbs } from "@/components/FloatingOrbs";

export default function Home() {
  return (
    <>
      {/* Custom cursor (desktop only — no-ops on touch devices) */}
      <CursorEffect />

      {/* Ambient background orbs */}
      <FloatingOrbs />

      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Projects />
        <SystemsBuilt />
        <Education />
        {/* <Experience /> */}
        <Skills />
        <Footer />
      </main>
    </>
  );
}
