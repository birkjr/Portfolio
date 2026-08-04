"use client";

import Navbar from "@/components/pages/Navbar";
import { Hero } from "@/components/pages/Hero";
import { About } from "@/components/pages/About";
import { Timeline } from "@/components/pages/Timeline";
import { Journal } from "@/components/pages/Journal";
import { Skills } from "@/components/pages/Skills";
import { Footer } from "@/components/pages/Footer";
import { CursorEffect } from "@/components/animations/CursorEffect";
import { FloatingOrbs } from "@/components/animations/FloatingOrbs";
import { LivingGridDots } from "@/components/animations/LivingGridDots";
import { ScrollIntoMachine } from "@/components/animations/ScrollIntoMachine";

export default function Home() {
  return (
    <>
      <CursorEffect />
      <LivingGridDots />
      <FloatingOrbs />

      <Navbar />
      <main className="relative z-10 overflow-x-clip">
        <ScrollIntoMachine
          hero={<Hero />}
          about={<About motion="none" />}
          aboutMobile={<About />}
        />
        <Timeline />
        <Journal />
        <Skills />
        <Footer />
      </main>
    </>
  );
}
