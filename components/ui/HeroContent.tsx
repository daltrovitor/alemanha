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
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subRef = useRef<HTMLParagraphElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const crossRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Reset
            gsap.set(logoRef.current, { opacity: 0, y: -100, scale: 0, rotation: -180 });
            gsap.set(titleRef.current, { opacity: 0, x: -200, skewX: 15 });
            gsap.set(subRef.current, { opacity: 0, y: 80 });
            gsap.set(lineRef.current, { scaleX: 0 });
            gsap.set(crossRef.current, { opacity: 0, scale: 3 });

            const tl = gsap.timeline({ delay: 4.5 });

            // Cross fades in huge and scales down
            tl.to(crossRef.current, {
                opacity: 0.06,
                scale: 1,
                duration: 2,
                ease: "expo.out",
            }, 0);

            // Logo snaps in with spin
            tl.to(logoRef.current, {
                y: 0,
                scale: 1,
                opacity: 1,
                rotation: 0,
                duration: 1.2,
                ease: "back.out(1.7)",
            }, 0.3);

            // Title slides from left with skew
            tl.to(titleRef.current, {
                x: 0,
                skewX: 0,
                opacity: 1,
                duration: 1.5,
                ease: "expo.out",
            }, 0.6);

            // Red line slashes across
            tl.to(lineRef.current, {
                scaleX: 1,
                duration: 0.8,
                ease: "power4.out",
            }, 1.0);

            // Subtitle rises
            tl.to(subRef.current, {
                y: 0,
                opacity: 1,
                duration: 1.5,
                ease: "power4.out",
            }, 1.2);

        }, containerRef);

        return () => ctx.revert();
    }, [replayKey]);

    return (
        <section ref={containerRef} className="relative h-screen flex items-center p-6 sm:p-12 lg:p-24 overflow-hidden select-none">

            {/* Scandinavian Cross - Huge Decorative */}
            <div ref={crossRef} className="absolute inset-0 opacity-0 pointer-events-none">
                <div className="absolute top-0 bottom-0 left-[28%] w-[12%] bg-dk-red/10" />
                <div className="absolute left-0 right-0 top-[38%] h-[12%] bg-dk-red/10" />
            </div>

            {/* Diagonal Split Line */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-[55%] h-full bg-gradient-to-l from-dk-red/5 to-transparent"
                    style={{ clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0% 100%)" }}
                />
            </div>

            {/* Logo at Top Center */}
            <div ref={logoRef} className="absolute top-8 left-1/2 -translate-x-1/2 w-14 h-14 md:w-20 md:h-20 z-20 opacity-0">
                <Image
                    src="/dinamarca.png"
                    alt="Denmark Logo"
                    fill
                    className="object-contain drop-shadow-[0_0_25px_rgba(200,16,46,0.5)]"
                />
            </div>

            {/* Content - Left Side */}
            <div className="z-10 max-w-4xl space-y-6">
                {/* Red slash line */}
                <div ref={lineRef} className="w-32 h-1 bg-gradient-to-r from-dk-red to-dk-frost origin-left" />

                <h1
                    ref={titleRef}
                    className="text-7xl md:text-[11rem] font-black tracking-tighter leading-[0.85] text-dk-white opacity-0"
                    style={{
                        textShadow: "0 0 60px rgba(200, 16, 46, 0.3), 0 0 120px rgba(11, 22, 40, 0.8)",
                    }}
                >
                    <span className="block text-dk-red italic">DINA</span>
                    <span className="block text-dk-red italic">MARCA</span>
                    <span className="block text-3xl md:text-5xl tracking-[0.6em] text-dk-frost/80 font-light not-italic mt-4">
                        DANISH DYNAMITE
                    </span>
                </h1>

                <p ref={subRef} className="max-w-lg text-lg md:text-xl text-dk-silver font-medium tracking-[0.3em] uppercase opacity-0">
                    Fogo do Norte. <span className="text-dk-frost">Espírito Viking.</span>
                </p>
            </div>

            {/* Decorative corner marks */}
            <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-dk-red/30 opacity-50" />
            <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-dk-frost/30 opacity-50" />
        </section>
    );
}
