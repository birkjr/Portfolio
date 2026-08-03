"use client";

import Navbar from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Timeline } from "@/components/Timeline";
import { Journal } from "@/components/Journal";
import { Skills } from "@/components/Skills";
import { Footer } from "@/components/Footer";
import { CursorEffect } from "@/components/CursorEffect";
import { FloatingOrbs } from "@/components/FloatingOrbs";
import { LivingGridDots } from "@/components/LivingGridDots";

export default function Home() {
  return (
    <>
      <CursorEffect />
      <LivingGridDots />
      <FloatingOrbs />

      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Timeline />
        <Journal />
        <Skills />
        <Footer />
      </main>
    </>
  );
}
