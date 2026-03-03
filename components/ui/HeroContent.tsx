"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function HeroContent({ replayKey = 0 }: { replayKey?: number }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef1 = useRef<HTMLHeadingElement>(null);
    const textRef2 = useRef<HTMLHeadingElement>(null);
    const introRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set([textRef1.current, textRef2.current], { yPercent: 120, opacity: 0, rotateX: 45 });
            gsap.set(introRef.current, { opacity: 0, y: 20 });
            gsap.set(logoRef.current, { opacity: 0, scale: 0.8, filter: "blur(10px)" });
            gsap.set(badgeRef.current, { opacity: 0, scale: 0.8 });

            const tl = gsap.timeline({ delay: 4.5 });

            // Logo & Badge cinematic reveal
            tl.to([logoRef.current, badgeRef.current], {
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                duration: 2,
                ease: "expo.out",
                stagger: 0.2
            });

            // Intro text fade in
            tl.to(introRef.current, {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: "power3.out",
            }, "-=1.5");

            // Hero texts massive reveal with 3D rotation
            tl.to([textRef1.current, textRef2.current], {
                yPercent: 0,
                opacity: 1,
                rotateX: 0,
                duration: 1.5,
                ease: "back.out(1.2)",
                stagger: 0.2
            }, "-=1");

        }, containerRef);

        return () => ctx.revert();
    }, [replayKey]);

    return (
        <section ref={containerRef} className="relative w-full h-screen flex flex-col justify-between p-8 md:p-16 select-none perspective-[1000px]">

            {/* TOP BAR */}
            <div className="flex justify-between items-start w-full z-20">
                <div ref={logoRef} className="relative w-16 h-16 md:w-24 md:h-24">
                    <Image src="/franca.png" alt="FFF" fill className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
                </div>
                <div ref={badgeRef} className="flex flex-col items-end">
                    <span className="text-fr-gold font-bold tracking-[0.3em] text-xs uppercase border border-fr-gold/30 px-4 py-2 rounded-full backdrop-blur-sm">
                        Équipe de France
                    </span>
                    <div className="flex gap-1 mt-4">
                        <StarIcon /><StarIcon />
                    </div>
                </div>
            </div>

            {/* CENTER CONTENT - Cinematic Typography centered around the 3D ball */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 w-full">

                <div ref={introRef} className="mb-8 flex items-center gap-6">
                    <div className="w-16 h-[1px] bg-fr-gold" />
                    <p className="text-fr-white/60 font-semibold tracking-[0.5em] text-sm md:text-base uppercase">
                        A Grandeza do Futebol
                    </p>
                    <div className="w-16 h-[1px] bg-fr-gold" />
                </div>

                {/* Massive 3D Texts */}
                <div className="overflow-hidden w-full text-center">
                    <h1 ref={textRef1} className="text-[12vw] leading-[0.85] font-black tracking-tighter text-fr-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                        ALLEZ
                    </h1>
                </div>

                <div className="overflow-hidden w-full text-center">
                    <h1 ref={textRef2} className="text-[14vw] leading-[0.85] font-black tracking-tighter text-outline-gold mb-8 italic pr-4">
                        LES BLEUS
                    </h1>
                </div>
            </div>

            {/* BOTTOM DECORATION */}
            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end z-20">
                <div className="flex flex-col gap-2">
                    <div className="w-1 h-12 bg-fr-blue" />
                    <div className="w-1 h-12 bg-fr-white" />
                    <div className="w-1 h-12 bg-fr-red" />
                </div>

                <div className="text-right">
                    <p className="text-fr-silver text-xs font-bold tracking-[0.4em] uppercase mb-2">Role para a Glória</p>
                    <div className="w-[1px] h-24 bg-gradient-to-b from-fr-gold to-transparent mx-auto relative origin-top animate-pulse" />
                </div>
            </div>

        </section>
    );
}

function StarIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-fr-gold drop-shadow-[0_0_5px_rgba(212,175,55,1)]">
            <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
        </svg>
    )
}
