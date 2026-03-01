"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlobalScene from "@/components/3d/HeroScene";
import HeroContent from "@/components/ui/HeroContent";
import SmoothScroll from "@/components/ui/SmoothScroll";
import History from "@/components/ui/History";
import Players from "@/components/ui/Players";
import Statistics from "@/components/ui/Stats";
import FinalFooter from "@/components/ui/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    // Reveal sections on scroll
    const sections = gsap.utils.toArray("section");
    sections.forEach((section: any) => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none reverse",
        }
      });
    });
  }, []);

  return (
    <main className="relative min-h-screen font-belgium text-white selection:bg-belgium-gold selection:text-black">
      {/* GLOBAL 3D SCENE - Fixed background */}
      <GlobalScene />

      <SmoothScroll>
        <div className="relative z-10 pointer-events-none">
          {/* HERO SECTION */}
          <section className="relative h-screen overflow-hidden flex items-center justify-center pointer-events-auto">
            <HeroContent />
          </section>

          {/* HISTORY TIMELINE */}
          <section className="relative border-y border-white/5 bg-transparent pointer-events-auto">
            <History />
          </section>

          {/* PLAYERS CARDS */}
          <section className="relative bg-transparent pointer-events-auto">
            <Players />
          </section>

          {/* STATISTICS SECTION */}
          <section className="relative bg-transparent pointer-events-auto">
            <Statistics />
          </section>

          {/* FINAL CINEMATIC FOOTER */}
          <div className="pointer-events-auto">
            <FinalFooter />
          </div>
        </div>
      </SmoothScroll>

    </main>
  );
}


