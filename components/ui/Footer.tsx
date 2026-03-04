"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FinalFooter() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                textRef.current,
                { scale: 0.8, opacity: 0, y: 50 },
                {
                    scale: 1,
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 75%",
                    },
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <footer ref={containerRef} className="w-full relative py-32 mt-32 bg-de-black overflow-hidden pointer-events-auto border-t-[16px] border-de-white">

            {/* Background Flag */}
            <div className="absolute inset-0 z-0 flex flex-col opacity-20 pointer-events-none">
                <div className="flex-1 bg-de-black" />
                <div className="flex-1 bg-de-red" />
                <div className="flex-1 bg-de-gold" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-12 flex flex-col items-center justify-center text-center">

                <div ref={textRef} className="bg-de-white border-[8px] border-de-black p-8 md:p-16 hard-shadow-gold">
                    <h2 className="text-6xl md:text-[8rem] font-black uppercase text-de-black leading-none mb-6">
                        DIE<br />MANNSCHAFT
                    </h2>
                    <div className="h-[4px] bg-de-red w-full my-8" />
                    <p className="text-2xl md:text-4xl font-black text-de-black uppercase tracking-widest">
                        A FORÇA NUNCA MORRE
                    </p>
                </div>

                <div className="mt-20 w-fit">
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="bg-de-red px-12 py-6 text-de-white font-black text-2xl uppercase border-4 border-de-black hard-shadow hover:-translate-y-2 transition-transform duration-300"
                    >
                        VOLTAR AO INÍCIO
                    </button>
                </div>

            </div>

            {/* Footer bar */}
            <div className="absolute bottom-0 w-full bg-de-black border-t-4 border-de-white p-4 flex justify-between items-center z-10">
                <span className="text-de-white font-bold tracking-widest uppercase">© {new Date().getFullYear()} DFB</span>
                <div className="flex gap-2">
                    <div className="w-4 h-4 bg-de-black border-2 border-de-white" />
                    <div className="w-4 h-4 bg-de-red" />
                    <div className="w-4 h-4 bg-de-gold" />
                </div>
                <span className="text-de-white font-bold tracking-widest uppercase">PRECISÃO</span>
            </div>
        </footer>
    );
}
