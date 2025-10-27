"use client";

import Navbar from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Education } from "@/components/Education";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="scroll-container">
        <section id="home" className="section-container">
          <Hero />
        </section>
        <section id="education" className="section-container">
          <Education />
        </section>
        <section id="projects" className="section-container">
          <Projects />
        </section>
        <section id="experience" className="section-container">
          <Experience />
        </section>
        <section id="skills" className="section-container">
          <Skills />
        </section>
        <section id="contact" className="contact-with-footer">
          <Contact />
          <Footer />
        </section>
      </div>
    </>
  );
}
