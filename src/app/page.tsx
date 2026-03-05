"use client";

import Navbar from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Education } from "@/components/Education";
import { CTFScripts } from "@/components/CTFScripts";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Education />
        <Experience />
        <Projects />
        <CTFScripts />
        <Skills />
        <Footer />
      </main>
    </>
  );
}
