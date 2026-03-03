"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".footer-reveal", {
                y: 100,
                opacity: 0,
                filter: "blur(20px)",
                duration: 2,
                stagger: 0.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                },
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <footer ref={containerRef} className="relative min-h-screen flex flex-col justify-center items-center text-center p-12 bg-[#010308] overflow-hidden select-none z-10">

            {/* Epic volumetric lighting feeling */}
            <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-fr-gold to-transparent opacity-30" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[500px] bg-fr-gold/5 blur-[150px] pointer-events-none" />

            <div className="z-10 max-w-6xl w-full flex flex-col items-center gap-16">

                <div className="footer-reveal w-24 h-24 md:w-32 md:h-32 opacity-80 opacity-hover:100 transition-opacity duration-700">
                    <Image src="/franca.png" alt="France Logo" width={128} height={128} className="object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]" />
                </div>

                <div className="footer-reveal space-y-6">
                    <h2 className="text-6xl md:text-[10rem] font-black text-fr-white tracking-tighter uppercase leading-[0.8]">
                        TOUJOURS <br />
                        <span className="text-outline-gold text-outline">INVINCIBLE</span>
                    </h2>
                    <p className="text-fr-silver text-xl md:text-3xl font-light tracking-[0.3em] uppercase max-w-2xl mx-auto">
                        A eternidade veste <span className="text-fr-white font-bold">Bleu</span>
                    </p>
                </div>

                <div className="footer-reveal flex items-center justify-center gap-12 mt-12 w-full max-w-lg border-t border-fr-white/10 pt-12">
                    {/* Tricolore block ending */}
                    <div className="flex w-full h-2 rounded-full overflow-hidden opacity-50 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                        <div className="h-full w-1/3 bg-fr-blue" />
                        <div className="h-full w-1/3 bg-fr-white" />
                        <div className="h-full w-1/3 bg-fr-red" />
                    </div>
                </div>

                <p className="footer-reveal text-fr-silver/40 text-xs font-bold tracking-[0.5em] uppercase mt-24">
                    © 2026 FÉDÉRATION FRANÇAISE DE FOOTBALL
                </p>
            </div>
        </footer>
    );
}
