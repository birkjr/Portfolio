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
import { ScrollIntoMachine } from "@/components/ScrollIntoMachine";

export default function Home() {
  return (
    <>
      <CursorEffect />
      <LivingGridDots />
      <FloatingOrbs />

      <Navbar />
      <main className="relative z-10 overflow-x-clip">
        <ScrollIntoMachine hero={<Hero />} about={<About motion="none" />} />
        <Timeline />
        <Journal />
        <Skills />
        <Footer />
      </main>
    </>
  );
}
