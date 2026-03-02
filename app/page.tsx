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

  const handleReplay = useCallback(() => {
    setIsReplaying(true);
  }, []);

  const handleReplayFinished = useCallback(() => {
    setIsReplaying(false);
  }, []);

  const handleCinematicStart = useCallback(() => {
    // Increment the replay key so HeroContent re-runs its animations
    setHeroReplayKey(prev => prev + 1);
  }, []);

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
      <GlobalScene isReplaying={isReplaying} onReplayFinished={handleReplayFinished} />

      {/* CINEMATIC CONTROLS - Play button top-right */}
      <CinematicControls onReplay={handleReplay} onCinematicStart={handleCinematicStart} />

      <SmoothScroll>
        <div className="relative z-10 pointer-events-none">
          {/* HERO SECTION */}
          <section className="relative h-screen overflow-hidden flex items-center justify-center pointer-events-auto">
            <HeroContent replayKey={heroReplayKey} />
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
