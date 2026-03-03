"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const players = [
    {
        name: "KYLIAN",
        surname: "MBAPPÉ",
        number: "10",
        role: "ATACANTE",
        img: "/mbappe.png",
        color: "rgba(237, 41, 57, 0.15)" // Red glow
    },
    {
        name: "ANTOINE",
        surname: "GRIEZMANN",
        number: "7",
        role: "MEIO-CAMPO",
        img: "/griezmann.png",
        color: "rgba(212, 175, 55, 0.15)" // Gold glow
    },
    {
        name: "N'GOLO",
        surname: "KANTÉ",
        number: "13",
        role: "VOLANTE",
        img: "/kante.png",
        color: "rgba(74, 144, 217, 0.15)" // Blue glow
    }
];

export default function Players() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const panels = gsap.utils.toArray(".player-panel");

            panels.forEach((panel: any, i) => {
                const img = panel.querySelector(".player-img");
                const text = panel.querySelector(".player-text");
                const num = panel.querySelector(".player-num");

                // Scroll parallax for the image and text to give a sticky/floating cinematic editorial feel
                gsap.fromTo(img,
                    { scale: 1.1, yPercent: 10 },
                    {
                        scale: 1, yPercent: -10, ease: "none", scrollTrigger: {
                            trigger: panel,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true
                        }
                    }
                );

                gsap.fromTo(text,
                    { x: i % 2 === 0 ? 100 : -100, opacity: 0 },
                    {
                        x: 0, opacity: 1, duration: 1.5, ease: "power3.out", scrollTrigger: {
                            trigger: panel,
                            start: "top 60%",
                        }
                    }
                );

                gsap.fromTo(num,
                    { opacity: 0, scale: 0.5 },
                    {
                        opacity: 1, scale: 1, duration: 2, ease: "expo.out", scrollTrigger: {
                            trigger: panel,
                            start: "top 50%",
                        }
                    }
                );
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full bg-[#010308] py-20">
            {/* Header */}
            <div className="text-center mb-20 px-6">
                <h2 className="text-4xl md:text-6xl font-black text-fr-white tracking-[0.3em] uppercase mb-4">
                    Les Étoiles
                </h2>
                <div className="w-24 h-[2px] bg-fr-gold mx-auto" />
            </div>

            {players.map((p, i) => {
                const isReversed = i % 2 !== 0;
                return (
                    <div key={i} className="player-panel relative h-[90vh] min-h-[700px] w-full flex items-center overflow-hidden border-b border-fr-white/5">
                        {/* Background Giant Number */}
                        <div className="player-num absolute inset-0 flex items-center justify-center font-black text-[30vw] text-fr-white opacity-[0.02] select-none pointer-events-none z-0 leading-none">
                            {p.number}
                        </div>

                        {/* Background Glow based on player */}
                        <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: `radial-gradient(circle at ${isReversed ? '20%' : '80%'} 50%, ${p.color}, transparent 60%)` }} />

                        <div className={`relative z-10 w-full max-w-screen-2xl mx-auto flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center justify-between px-8 md:px-20 h-full gap-12`}>

                            {/* Image Container */}
                            <div className="player-img relative w-full md:w-1/2 h-1/2 md:h-full flex items-end justify-center">
                                <Image
                                    src={p.img}
                                    alt={p.name}
                                    fill
                                    className="object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                                    priority={i === 0}
                                />
                                {/* Bottom fade */}
                                <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-[#010308] to-transparent z-10" />
                            </div>

                            {/* Text Container */}
                            <div className={`player-text w-full md:w-1/2 flex flex-col justify-center ${isReversed ? 'md:items-start md:text-left' : 'md:items-end md:text-right'}`}>
                                <h4 className="text-fr-gold font-bold tracking-[0.5em] text-sm md:text-base uppercase mb-4 py-2 px-6 border border-fr-gold/20 rounded-full backdrop-blur-md inline-block">
                                    {p.role}
                                </h4>
                                <h3 className="text-6xl md:text-[8rem] font-black text-outline-hover text-outline leading-[0.8] uppercase tracking-tighter transition-all duration-300">
                                    {p.name}
                                </h3>
                                <h3 className="text-6xl md:text-[8rem] font-black text-fr-white uppercase leading-[0.8] tracking-tighter drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                                    {p.surname}
                                </h3>
                                <div className={`flex gap-3 mt-12 items-center ${isReversed ? '' : 'justify-end'}`}>
                                    <span className="text-fr-silver font-bold tracking-widest text-lg font-mono">N° {p.number}</span>
                                    <div className="w-16 h-[2px] bg-fr-gold" />
                                </div>
                            </div>

                        </div>
                    </div>
                );
            })}
        </section>
    );
}
