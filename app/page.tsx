"use client";

import { useEffect, useState, useCallback } from "react";
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
  const [isLoaded, setIsLoaded] = useState(false);

  const handleReplay = useCallback(() => {
    setIsReplaying(true);
  }, []);

  const handleReplayFinished = useCallback(() => {
    setIsReplaying(false);
    setHeroReplayKey(prev => prev + 1);
  }, []);

  const handleCinematicStart = useCallback(() => {
    setHeroReplayKey(prev => prev + 1);
  }, []);

  const handleLoadComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    const sections = gsap.utils.toArray(".cinematic-section");
    sections.forEach((section: any) => {
      gsap.from(section, {
        opacity: 0,
        filter: "blur(12px)",
        y: 30,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        }
      });
    });
  }, [isLoaded]);

  return (
    <main className={`relative min-h-screen font-sans text-de-white bg-de-black selection:bg-de-gold selection:text-de-black ${!isLoaded ? "overflow-hidden h-screen" : ""}`}>
      {/* Film grain overlay */}
      <div className="noise-bg" />
      {/* Subtle scanline overlay */}
      <div className="scanline-overlay" />

      {/* GLOBAL 3D SCENE */}
      <GlobalScene isReplaying={isReplaying} onReplayFinished={handleReplayFinished} onLoadComplete={handleLoadComplete} />

      {/* CINEMATIC CONTROLS */}
      {isLoaded && <CinematicControls onReplay={handleReplay} onCinematicStart={handleCinematicStart} />}

      <SmoothScroll>
        <div className={`relative z-10 transition-opacity duration-1000 ${isLoaded && !isReplaying ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>

          {/* HERO */}
          <section className="relative h-screen overflow-hidden flex items-center justify-center">
            <HeroContent replayKey={heroReplayKey} isLoaded={isLoaded} isReplaying={isReplaying} />
          </section>

          {/* HISTORY */}
          <section className="relative bg-transparent cinematic-section mt-32">
            <History />
          </section>

          {/* PLAYERS */}
          <section className="relative bg-transparent cinematic-section mt-32">
            <Players />
          </section>

          {/* STATISTICS */}
          <section className="relative bg-transparent cinematic-section mt-32">
            <Statistics />
          </section>

          {/* FOOTER */}
          <div className="cinematic-section">
            <FinalFooter />
          </div>
        </div>
      </SmoothScroll>
    </main>
  );
}
