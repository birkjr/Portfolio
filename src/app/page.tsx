"use client";

import Navbar from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Articles } from "@/components/Articles";
import { Timeline } from "@/components/Timeline";
import { Skills } from "@/components/Skills";
import { Footer } from "@/components/Footer";
import { CursorEffect } from "@/components/CursorEffect";
import { FloatingOrbs } from "@/components/FloatingOrbs";

export default function Home() {
  return (
    <>
      <CursorEffect />
      <FloatingOrbs />

      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Articles />
        <Timeline />
        <Skills />
        <Footer />
      </main>
    </>
  );
}
