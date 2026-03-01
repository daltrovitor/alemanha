"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { MoveRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HeroContent() {
    const containerRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const subRef = useRef<HTMLParagraphElement>(null);
    // const btnRef = useRef<HTMLDivElement>(null); // Removed

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Logo snap - Delayed for loader
            gsap.from(logoRef.current, {
                y: -150,
                scale: 0,
                opacity: 0,
                duration: 1,
                ease: "expo.out",
                delay: 8.5, // 8s loader + bit of buffer
            });

            // Ultra Explosive Heading
            const tl = gsap.timeline({ delay: 9 }); // Começa logo após o loader


            tl.fromTo(textRef.current,
                { scale: 3, filter: "blur(50px)", opacity: 0 },
                {
                    scale: 1,
                    filter: "blur(0px)",
                    opacity: 1,
                    duration: 1,
                    ease: "expo.out",
                }
            );

            // Shaking effect on explosion
            tl.to(textRef.current, {
                x: "random(-5, 5)",
                y: "random(-5, 5)",
                duration: 0.05,
                repeat: 10,
                yoyo: true,
                ease: "none"
            }, 0.2);

            gsap.from(subRef.current, {
                y: 100,
                opacity: 0,
                duration: 1.5,
                ease: "power4.out",
                delay: 10, // Delayed for loader and main explosion
            });



        }, containerRef);

        return () => ctx.revert();
    }, []);


    return (
        <section ref={containerRef} className="relative h-screen flex flex-col items-center justify-center text-center p-6 sm:p-12 overflow-hidden select-none">

            {/* Logo at Top */}
            <div ref={logoRef} className="absolute top-12 left-1/2 -translate-x-1/2 w-16 h-16 md:w-24 md:h-24 z-20">
                <Image
                    src="/belgica.png"
                    alt="Belgium Logo"
                    fill
                    className="object-contain drop-shadow-[0_0_20px_rgba(255,215,0,0.6)]"
                />
            </div>

            <div className="z-10 space-y-6">
                <h1
                    ref={textRef}
                    className="text-8xl md:text-[14rem] font-black tracking-tighter leading-none m-0 p-0 text-white flex flex-col gap-4 select-none"
                    style={{
                        textShadow: "0 0 40px rgba(208, 0, 0, 0.5), 0 0 10px rgba(255, 215, 0, 0.3)",
                        filter: "drop-shadow(0 0 20px rgba(0,0,0,0.8))"
                    }}
                >
                    <span className="block text-belgium-red uppercase italic">BÉLGICA</span>
                    <span className="text-4xl md:text-6xl tracking-[0.5em] block text-white opacity-90 uppercase font-light">SELEÇÃO NACIONAL</span>
                </h1>

                <p ref={subRef} className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 font-medium tracking-[0.4em] uppercase opacity-70 mt-12">
                    Unidos pela paixão. <span className="text-belgium-gold">Red Devils</span>.
                </p>

                {/* Removed Explorer button */}
                {/* <div className="pt-8 opacity-0 scale-90" ref={btnRef}>
                    <button
                        className={cn(
                            "group relative px-8 py-4 bg-transparent border border-belgium-gold/40 text-belgium-gold hover:bg-belgium-gold hover:text-black transition-all duration-500 rounded-full text-lg font-bold tracking-widest uppercase flex items-center gap-3 overflow-hidden shadow-[0_0_15px_rgba(255,215,0,0.3)]",
                            "hover:shadow-[0_0_30px_rgba(255,215,0,0.6)]"
                        )}
                    >
                        <span className="relative z-10">Explorar História</span>
                        <MoveRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />

                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] skew-x-[45deg] group-hover:translate-x-[150%] transition-transform duration-1000" />
                    </button>
                </div> */}
            </div>

        </section>
    );
}
