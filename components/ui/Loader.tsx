"use client";

import { useProgress } from "@react-three/drei";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export function Loader({ isReplaying, onReplayFinished }: { isReplaying?: boolean; onReplayFinished?: () => void }) {
    const { progress, active } = useProgress();
    const [isFinished, setIsFinished] = useState(false);
    const [displayProgress, setDisplayProgress] = useState(0);
    const [startTime] = useState(Date.now());
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isReplaying) {
            setIsFinished(false);
            setDisplayProgress(0);
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
                }
            }
        }, 50);
        return () => clearInterval(interval);
    }, [progress, active, isReplaying, startTime, onReplayFinished]);

    const finishLoading = () => {
        if (!containerRef.current) return;
        gsap.to(containerRef.current, {
            opacity: 0,
            filter: "blur(20px)",
            duration: 1.5,
            ease: "power2.inOut",
            onComplete: () => setIsFinished(true)
        });
    };

    if (isFinished && !isReplaying) return null;
    if (isFinished && isReplaying) return null;

    return (
        <div ref={containerRef} className="fixed inset-0 z-[100] bg-fr-dark flex flex-col items-center justify-center overflow-hidden">
            {/* Ambient cinematic glow */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
                <div className="w-[80vw] h-[20vh] bg-fr-light-blue blur-[100px] rounded-full mx-auto animate-pulse" style={{ animationDuration: "4s" }} />
            </div>

            <div className="relative z-10 flex flex-col items-center gap-12 w-full max-w-sm px-8">
                <div className="overflow-hidden">
                    <h1 className="text-fr-white text-6xl md:text-8xl font-black tracking-widest uppercase animate-cine-pulse">
                        FFF
                    </h1>
                </div>

                <div className="w-full space-y-4">
                    <div className="flex justify-between text-fr-gold text-xs font-bold tracking-[0.4em] uppercase">
                        <span>{isReplaying ? "Rebobinando" : "Iniciando"}</span>
                        <span>{Math.round(displayProgress)}%</span>
                    </div>

                    <div className="relative h-[2px] w-full bg-fr-white/10 overflow-hidden">
                        <div
                            className="absolute inset-y-0 left-0 bg-fr-gold shadow-[0_0_15px_rgba(212,175,55,1)] transition-all duration-[50ms] ease-linear"
                            style={{ width: `${displayProgress}%` }}
                        />
                    </div>
                </div>

                <p className="text-fr-white/30 text-[10px] uppercase tracking-widest absolute bottom-12">
                    L'Élégance du Football
                </p>
            </div>
        </div>
    );
}
