"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

interface HeroContentProps {
    replayKey?: number;
}

export default function HeroContent({ replayKey = 0 }: HeroContentProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const subRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Reset elements to hidden state first
            gsap.set(logoRef.current, { opacity: 0, y: -150, scale: 0 });
            gsap.set(textRef.current, { opacity: 0, scale: 3, filter: "blur(50px)" });
            gsap.set(subRef.current, { opacity: 0, y: 100 });

            // Logo snap - Delayed for loader
            gsap.to(logoRef.current, {
                y: 0,
                scale: 1,
                opacity: 1,
                duration: 1,
                ease: "expo.out",
                delay: 4.5, // 4s loader + bit of buffer
            });

            // Ultra Explosive Heading
            const tl = gsap.timeline({ delay: 5 }); // Começa logo após o loader

            tl.to(textRef.current, {
                scale: 1,
                filter: "blur(0px)",
                opacity: 1,
                duration: 1,
                ease: "expo.out",
            });

            // Shaking effect on explosion
            tl.to(textRef.current, {
                x: "random(-5, 5)",
                y: "random(-5, 5)",
                duration: 0.05,
                repeat: 10,
                yoyo: true,
                ease: "none"
            }, 0.2);

            gsap.to(subRef.current, {
                y: 0,
                opacity: 1,
                duration: 1.5,
                ease: "power4.out",
                delay: 6, // Delayed for loader and main explosion
            });

        }, containerRef);

        return () => ctx.revert();
    }, [replayKey]); // Re-run when replayKey changes


    return (
        <section ref={containerRef} className="relative h-screen flex flex-col items-center justify-center text-center p-6 sm:p-12 overflow-hidden select-none">

            {/* Logo at Top */}
            <div ref={logoRef} className="absolute top-12 left-1/2 -translate-x-1/2 w-16 h-16 md:w-24 md:h-24 z-20 opacity-0">
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
                    className="text-8xl md:text-[14rem] font-black tracking-tighter leading-none m-0 p-0 text-white flex flex-col gap-4 select-none opacity-0"
                    style={{
                        textShadow: "0 0 40px rgba(208, 0, 0, 0.5), 0 0 10px rgba(255, 215, 0, 0.3)",
                        filter: "drop-shadow(0 0 20px rgba(0,0,0,0.8))"
                    }}
                >
                    <span className="block text-belgium-red uppercase italic">BÉLGICA</span>
                    <span className="text-4xl md:text-6xl tracking-[0.5em] block text-white opacity-90 uppercase font-light">SELEÇÃO NACIONAL</span>
                </h1>

                <p ref={subRef} className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 font-medium tracking-[0.4em] uppercase opacity-0 mt-12">
                    Unidos pela paixão. <span className="text-belgium-gold">Red Devils</span>.
                </p>
            </div>

        </section>
    );
}
