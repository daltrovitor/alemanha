"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, Pause } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface CinematicControlsProps {
    onReplay: () => void;
    onCinematicStart?: () => void;
}

export default function CinematicControls({ onReplay, onCinematicStart }: CinematicControlsProps) {
    const [isAutoScrolling, setIsAutoScrolling] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const autoScrollRef = useRef<{ kill: () => void } | null>(null);
    const btnRef = useRef<HTMLDivElement>(null);
    const pulseRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (btnRef.current) {
            gsap.fromTo(
                btnRef.current,
                { opacity: 0, scale: 0.5, y: -20 },
                { opacity: 1, scale: 1, y: 0, duration: 1, ease: "elastic.out(1, 0.5)", delay: 5.5 }
            );
        }
        if (pulseRef.current) {
            gsap.to(pulseRef.current, {
                scale: 1.4,
                opacity: 0,
                duration: 2,
                repeat: -1,
                ease: "power2.out",
                delay: 6,
            });
        }
    }, []);

    const startCinematicScroll = useCallback(() => {
        setIsAutoScrolling(true);
        const totalScrollHeight = document.body.scrollHeight - window.innerHeight;
        const scrollObj = { y: 0 };

        const tween = gsap.to(scrollObj, {
            y: totalScrollHeight,
            duration: 25,
            ease: "none",
            onUpdate: () => {
                window.scrollTo({ top: scrollObj.y });
            },
            onComplete: () => {
                setIsAutoScrolling(false);
                autoScrollRef.current = null;
                document.body.style.cursor = "auto";
            },
        });

        autoScrollRef.current = { kill: () => tween.kill() };
    }, []);

    const startCinematicMode = useCallback(() => {
        document.body.style.cursor = "none";
        window.scrollTo({ top: 0 });
        onReplay();
        onCinematicStart?.();
        setTimeout(() => {
            startCinematicScroll();
        }, 5500); // Wait for loader again
    }, [onReplay, onCinematicStart, startCinematicScroll]);

    const stopCinematicScroll = useCallback(() => {
        document.body.style.cursor = "auto";
        if (autoScrollRef.current) {
            autoScrollRef.current.kill();
            autoScrollRef.current = null;
        }
        setIsAutoScrolling(false);
    }, []);

    return (
        <div
            ref={btnRef}
            className="fixed top-6 right-6 z-[90] flex items-center gap-4 opacity-0"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            {/* Tooltip */}
            <div
                className={`absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap px-4 py-2 bg-de-white border-4 border-de-black hard-shadow-gold text-de-black text-sm font-black tracking-widest uppercase transition-all duration-300 ${showTooltip ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
                    }`}
            >
                {isAutoScrolling ? "PAUSAR TOUR" : "CINEMÁTICO"}
            </div>

            {/* Button */}
            <button
                onClick={isAutoScrolling ? stopCinematicScroll : startCinematicMode}
                className="group relative w-16 h-16 flex items-center justify-center bg-de-red border-4 border-de-white shadow-[6px_6px_0px_#FFCE00] hover:translate-x-[2px] hover:translate-y-[2px] transition-transform duration-200 hover:shadow-[4px_4px_0px_#FFCE00] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none"
            >
                {/* Pulse outline */}
                <div ref={pulseRef} className="absolute inset-[-4px] border-4 border-de-red pointer-events-none" />

                {/* Icon */}
                <div className="relative z-10 flex items-center justify-center">
                    {isAutoScrolling ? (
                        <Pause className="w-6 h-6 text-de-white md:w-8 md:h-8" strokeWidth={3} />
                    ) : (
                        <Play className="w-6 h-6 text-de-white md:w-8 md:h-8 ml-1" strokeWidth={3} />
                    )}
                </div>
            </button>
        </div>
    );
}
