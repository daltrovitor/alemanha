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

    // Entrance animation
    useEffect(() => {
        if (btnRef.current) {
            gsap.fromTo(btnRef.current,
                { opacity: 0, scale: 0.5, y: -20 },
                { opacity: 1, scale: 1, y: 0, duration: 1, ease: "elastic.out(1, 0.5)", delay: 5.5 }
            );
        }
        // Pulse ring animation
        if (pulseRef.current) {
            gsap.to(pulseRef.current, {
                scale: 1.8,
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
            duration: 30, // 30 seconds for the full cinematic journey
            ease: "power1.inOut",
            onUpdate: () => {
                window.scrollTo({ top: scrollObj.y });
            },
            onComplete: () => {
                setIsAutoScrolling(false);
                autoScrollRef.current = null;
            }
        });

        autoScrollRef.current = {
            kill: () => {
                tween.kill();
            }
        };
    }, []);

    const startCinematicMode = useCallback(() => {
        // 1. Scroll to top instantly
        window.scrollTo({ top: 0 });

        // 2. Tell parent to hide hero content
        onCinematicStart?.();

        // 3. Show loading screen again
        onReplay();

        // 4. After loading finishes (4s loader + buffer for hero animations), start cinematic scroll
        setTimeout(() => {
            startCinematicScroll();
        }, 7000); // 4s loader + 3s for hero entrance animations

    }, [onReplay, onCinematicStart, startCinematicScroll]);

    const stopCinematicScroll = useCallback(() => {
        if (autoScrollRef.current) {
            autoScrollRef.current.kill();
            autoScrollRef.current = null;
        }
        setIsAutoScrolling(false);
    }, []);

    return (
        <div
            ref={btnRef}
            className="fixed top-6 right-6 z-[90] flex items-center gap-3 opacity-0"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            {/* Tooltip */}
            <div
                className={`absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap px-4 py-2 rounded-xl bg-black/80 border border-white/10 backdrop-blur-md text-white text-sm font-bold tracking-wider uppercase transition-all duration-500 ${showTooltip ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"}`}
            >
                {isAutoScrolling ? "Pausar Tour" : "Modo Cinematográfico"}
            </div>

            {/* Main Cinematic Play Button */}
            <button
                onClick={isAutoScrolling ? stopCinematicScroll : startCinematicMode}
                className="group relative w-14 h-14 rounded-full flex items-center justify-center overflow-hidden"
            >
                {/* Pulse Ring */}
                <div
                    ref={pulseRef}
                    className="absolute inset-0 rounded-full border-2 border-belgium-gold/60"
                />

                {/* Background Gradient */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-belgium-red via-belgium-red/80 to-belgium-gold/30 opacity-90 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Glassmorphism Overlay */}
                <div className="absolute inset-[1px] rounded-full bg-black/30 backdrop-blur-sm border border-white/20 group-hover:border-belgium-gold/50 transition-all duration-500" />

                {/* Shine Effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Icon */}
                <div className="relative z-10 flex items-center justify-center">
                    {isAutoScrolling ? (
                        <Pause className="w-5 h-5 text-white drop-shadow-lg group-hover:scale-110 transition-transform" />
                    ) : (
                        <Play className="w-5 h-5 text-white drop-shadow-lg ml-0.5 group-hover:scale-110 transition-transform" />
                    )}
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-full shadow-[0_0_25px_rgba(208,0,0,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
        </div>
    );
}
