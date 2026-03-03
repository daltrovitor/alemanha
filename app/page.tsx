"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlobalScene from "@/components/3d/HeroScene";
import HeroContent from "@/components/ui/HeroContent";
import SmoothScroll from "@/components/ui/SmoothScroll";
import History from "@/components/ui/History";
import Players from "@/components/ui/Players";
import Statistics from "@/components/ui/Stats";
import FinalFooter from "@/components/ui/Footer";
import CinematicControls from "@/components/ui/CinematicControls";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isReplaying, setIsReplaying] = useState(false);
  const [heroReplayKey, setHeroReplayKey] = useState(0);

  const handleReplay = useCallback(() => {
    setIsReplaying(true);
  }, []);

  const handleReplayFinished = useCallback(() => {
    setIsReplaying(false);
  }, []);

  const handleCinematicStart = useCallback(() => {
    setHeroReplayKey(prev => prev + 1);
  }, []);

  useEffect(() => {
    // Cinematic fade in for all sections
    const sections = gsap.utils.toArray(".cinematic-section");
    sections.forEach((section: any) => {
      gsap.from(section, {
        opacity: 0,
        filter: "blur(10px)",
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        }
      });
    });
  }, []);

  return (
    <main className="relative min-h-screen font-cinematic text-fr-white bg-fr-dark selection:bg-fr-gold selection:text-fr-dark">
      {/* Noise Overlay for cinematic film grain feel */}
      <div className="noise-bg" />

      {/* GLOBAL 3D SCENE - Fixed background */}
      <GlobalScene isReplaying={isReplaying} onReplayFinished={handleReplayFinished} />

      {/* CINEMATIC CONTROLS */}
      <CinematicControls onReplay={handleReplay} onCinematicStart={handleCinematicStart} />

      <SmoothScroll>
        <div className="relative z-10 pointer-events-none">

          {/* HERO SECTION */}
          <section className="relative h-screen overflow-hidden flex items-center justify-center pointer-events-auto">
            <HeroContent replayKey={heroReplayKey} />
          </section>

          {/* HISTORY - Vertical Cinematic Journey */}
          <section className="relative bg-transparent pointer-events-auto cinematic-section mt-32">
            <History />
          </section>

          {/* PLAYERS - Sticky Full Screen Editorial */}
          <section className="relative bg-transparent pointer-events-auto cinematic-section mt-32">
            <Players />
          </section>

          {/* STATISTICS - Massive Typography */}
          <section className="relative bg-transparent pointer-events-auto cinematic-section mt-32">
            <Statistics />
          </section>

          {/* FOOTER */}
          <div className="pointer-events-auto cinematic-section">
            <FinalFooter />
          </div>
        </div>
      </SmoothScroll>
    </main>
  );
}
