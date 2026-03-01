"use client";

import Navbar from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Education } from "@/components/Education";
import { CTFScripts } from "@/components/CTFScripts";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Footer } from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="relative z-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <section id="home" className="section-container">
            <Hero />
          </section>
          <section id="education" className="section-container">
            <AnimatedSection delay={0.1}>
              <Education />
            </AnimatedSection>
          </section>
          <section id="experience" className="section-container">
            <AnimatedSection delay={0.1}>
              <Experience />
            </AnimatedSection>
          </section>
          <section id="projects" className="section-container">
            <AnimatedSection delay={0.1}>
              <Projects />
            </AnimatedSection>
          </section>
          <section id="ctf-scripts" className="section-container">
            <AnimatedSection delay={0.1}>
              <CTFScripts />
            </AnimatedSection>
          </section>
          <section id="skills" className="section-container">
            <AnimatedSection delay={0.1}>
              <Skills />
            </AnimatedSection>
          </section>
          <section className="contact-with-footer">
            <AnimatedSection delay={0.1}>
              <Footer />
            </AnimatedSection>
          </section>
        </div>
      </div>
    </>
  );
}
