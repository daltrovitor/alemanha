"use client";

import { useProgress } from "@react-three/drei";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export function Loader({
    isReplaying,
    onReplayFinished,
    onLoadComplete
}: {
    isReplaying?: boolean;
    onReplayFinished?: () => void;
    onLoadComplete?: () => void;
}) {
    const { progress, active } = useProgress();
    const [isFinished, setIsFinished] = useState(false);
    const [displayProgress, setDisplayProgress] = useState(0);
    const [startTime, setStartTime] = useState(Date.now());
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isReplaying) {
            setIsFinished(false);
            setDisplayProgress(0);
            setStartTime(Date.now());
        }
    }, [isReplaying]);

    useEffect(() => {
        const minDisplayTime = 4000;
        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const timeProgress = (elapsed / minDisplayTime) * 100;

            if (isReplaying) {
                const nextProgress = Math.min(timeProgress, 100);
                setDisplayProgress(nextProgress);
                if (elapsed >= minDisplayTime) {
                    finishLoading();
                    clearInterval(interval);
                    onReplayFinished?.();
                }
            } else {
                const P = progress > 0 ? progress : timeProgress;
                const nextProgress = Math.min(timeProgress, P);
                setDisplayProgress(nextProgress);
                if (elapsed >= minDisplayTime && progress === 100 && !active) {
                    finishLoading();
                    clearInterval(interval);
                    onLoadComplete?.();
                }
            }
        }, 50);
        return () => clearInterval(interval);
    }, [progress, active, isReplaying, startTime, onReplayFinished, onLoadComplete]);

    const finishLoading = () => {
        if (!containerRef.current) return;
        gsap.to(containerRef.current, {
            y: "-100%",
            duration: 1.2,
            ease: "expo.inOut",
            onComplete: () => setIsFinished(true)
        });
    };

    if (isFinished && !isReplaying) return null;
    if (isFinished && isReplaying) return null;

    return (
        <div ref={containerRef} className="fixed inset-0 z-[100] bg-de-black flex flex-col justify-between overflow-hidden brutalist-border">
            {/* Top Bar */}
            <div className="w-full flex h-8">
                <div className="h-full w-1/3 bg-de-black" />
                <div className="h-full w-1/3 bg-de-red" />
                <div className="h-full w-1/3 bg-de-gold" />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-8">
                <div className="border-[12px] border-de-white p-12 bg-de-red hard-shadow-gold rotate-2 hover:rotate-0 transition-transform duration-500">
                    <h1 className="text-de-white text-6xl md:text-9xl font-black tracking-tighter uppercase leading-none">
                        DFB
                    </h1>
                </div>

                <div className="mt-20 w-full max-w-2xl border-4 border-de-white p-4 bg-de-dark flex flex-col gap-4">
                    <div className="flex justify-between text-de-white text-xl md:text-2xl font-black uppercase">
                        <span>{isReplaying ? "INITIALISIERUNG..." : "SYSTEM START..."}</span>
                        <span>{Math.round(displayProgress)}%</span>
                    </div>

                    <div className="h-8 w-full border-2 border-de-white bg-de-black p-1">
                        <div
                            className="h-full bg-de-gold transition-all duration-[50ms] ease-linear"
                            style={{ width: `${displayProgress}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="w-full border-t-8 border-de-white flex flex-col md:flex-row justify-between items-center bg-de-black p-6 py-4 px-12">
                <p className="text-de-white text-xl font-bold uppercase tracking-widest">
                    DIE MANNSCHAFT
                </p>
                <div className="flex gap-4">
                    <div className="w-8 h-8 bg-de-red border-2 border-de-white" />
                    <div className="w-8 h-8 bg-de-gold border-2 border-de-white animate-pulse" />
                </div>
            </div>
        </div>
    );
}
