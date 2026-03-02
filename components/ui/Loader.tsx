"use client";

import { useProgress, Html } from "@react-three/drei";
import { useEffect, useState, useCallback } from "react";
import gsap from "gsap";

interface LoaderProps {
    isReplaying?: boolean;
    onReplayFinished?: () => void;
}

export function Loader({ isReplaying, onReplayFinished }: LoaderProps) {
    const { progress, active } = useProgress();
    const [isFinished, setIsFinished] = useState(false);
    const [displayProgress, setDisplayProgress] = useState(0);
    const [startTime, setStartTime] = useState(Date.now());

    // Reset when replaying
    useEffect(() => {
        if (isReplaying) {
            setIsFinished(false);
            setDisplayProgress(0);
            setStartTime(Date.now());
        }
    }, [isReplaying]);

    useEffect(() => {
        const minDisplayTime = 4000; // 4 seconds

        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const timeProgress = (elapsed / minDisplayTime) * 100;

            if (isReplaying) {
                // During replay, progress is purely time-based
                const nextProgress = Math.min(timeProgress, 100);
                setDisplayProgress(nextProgress);

                if (elapsed >= minDisplayTime) {
                    setIsFinished(true);
                    clearInterval(interval);
                    onReplayFinished?.();
                }
            } else {
                // Normal loading - combine real progress with time
                const nextProgress = Math.min(timeProgress, progress > 0 ? progress : timeProgress);
                setDisplayProgress(nextProgress);

                if (elapsed >= minDisplayTime && progress === 100 && !active) {
                    setIsFinished(true);
                    clearInterval(interval);
                }
            }
        }, 50);

        return () => clearInterval(interval);
    }, [progress, active, isReplaying, startTime, onReplayFinished]);


    if (isFinished && !isReplaying) return null;
    if (isFinished && isReplaying) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center">
            {/* Animated Background Glow */}
            <div className="absolute w-[500px] h-[500px] bg-belgium-red/20 blur-[120px] rounded-full animate-pulse" />

            {/* Secondary glow */}
            <div className="absolute w-[300px] h-[300px] bg-belgium-gold/10 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: "1s" }} />

            <div className="relative z-10 flex flex-col items-center gap-8">
                {/* Spinning Ring */}
                <div className="relative w-24 h-24">
                    <div className="absolute inset-0 border-t-4 border-belgium-gold border-solid rounded-full animate-spin shadow-[0_0_20px_rgba(255,215,0,0.5)]" />
                    <div className="absolute inset-2 border-t-2 border-belgium-red border-solid rounded-full animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
                </div>

                <div className="flex flex-col items-center">
                    <h2 className="text-white text-4xl font-black tracking-[0.3em] uppercase mb-2 italic">
                        BÉLGICA
                    </h2>
                    <p className="text-belgium-gold font-bold tracking-[0.5em] text-xs uppercase opacity-70">
                        {isReplaying ? "Preparando Tour" : "Carregando Experiência"}
                    </p>
                </div>

                {/* Progress Bar Container */}
                <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden mt-4">
                    <div
                        className="h-full bg-gradient-to-r from-belgium-red to-belgium-gold transition-all duration-300 ease-out shadow-[0_0_10px_#D00000]"
                        style={{ width: `${displayProgress}%` }}
                    />
                </div>

                <span className="text-white/40 font-mono text-sm tracking-widest">
                    {Math.round(displayProgress)}%
                </span>

            </div>
        </div>
    );
}

// For use inside Canvas
export function CanvasLoader() {
    return (
        <Html center>
            <div className="text-belgium-gold text-xl font-bold tracking-widest uppercase animate-pulse">
                Iniciando...
            </div>
        </Html>
    );
}
