"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroContent({
    replayKey,
    isLoaded,
    isReplaying
}: {
    replayKey: number;
    isLoaded: boolean;
    isReplaying: boolean;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const title1Ref = useRef<HTMLHeadingElement>(null);
    const title2Ref = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const block1Ref = useRef<HTMLDivElement>(null);
    const block2Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isLoaded || isReplaying) return;

        let ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.5 });

            tl.fromTo(
                title1Ref.current,
                { y: "100%", clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
                { y: "0%", clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 1.2, ease: "power4.out" }
            )
                .fromTo(
                    title2Ref.current,
                    { x: "-100%", opacity: 0 },
                    { x: "0%", opacity: 1, duration: 1, ease: "back.out(1.5)" },
                    "-=0.8"
                )
                .fromTo(
                    [block1Ref.current, block2Ref.current],
                    { scaleY: 0, transformOrigin: "bottom" },
                    { scaleY: 1, duration: 0.8, stagger: 0.2, ease: "expo.out" },
                    "-=0.6"
                )
                .fromTo(
                    subtitleRef.current,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.5 },
                    "-=0.2"
                );
        }, containerRef);
        return () => ctx.revert();
    }, [replayKey, isLoaded, isReplaying]);

    return (
        <div ref={containerRef} className="w-full h-full flex flex-col justify-center px-4 md:px-20 z-10 pointers-events-none mt-20">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 flex-wrap">
                <div className="flex flex-col z-20">
                    <div className="overflow-hidden mb-2 pointer-events-auto w-fit bg-de-black border-4 border-de-white p-4 brutalist-block-red hard-shadow">
                        <h1 ref={title1Ref} className="text-6xl md:text-9xl font-black uppercase leading-none tracking-tight">
                            A MÁQUINA
                        </h1>
                    </div>
                    <h2 ref={title2Ref} className="text-5xl md:text-8xl font-black text-de-gold uppercase text-outline-thick brutalist-block-gold w-fit px-4 border-4 border-de-black hard-shadow-gold">
                        ALEMÃ
                    </h2>
                </div>

                <div className="w-full md:w-[400px] mt-10 md:mt-0 text-right">
                    <p ref={subtitleRef} className="text-xl md:text-2xl font-bold uppercase bg-de-white text-de-black p-4 border-l-8 border-de-red">
                        "Futebol é um jogo simples. 22 homens correm atrás de uma bola por 90 minutos e, no final, os alemães sempre vencem." <br />
                        <span className="text-de-red">- Gary Lineker</span>
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 w-fit pointer-events-auto z-20">
                <div ref={block1Ref} className="bg-de-red border-4 border-de-white p-6 col-span-2 hard-shadow hover:-translate-y-2 transition-transform duration-300">
                    <span className="text-4xl font-black uppercase text-de-white">4x</span>
                    <br />
                    <span className="text-lg font-bold text-de-black uppercase tracking-widest bg-de-gold px-1">Títulos Mundiais</span>
                </div>
                <div ref={block2Ref} className="bg-de-black border-4 border-de-white p-6 col-span-2 hard-shadow-gold hover:-translate-y-2 transition-transform duration-300 striped-bg flex flex-col justify-center">
                    <span className="text-de-white font-black text-3xl uppercase">FORÇA &amp; TÁTICA</span>
                    <div className="h-2 bg-de-red w-full mt-2" />
                </div>
            </div>
        </div>
    );
}
