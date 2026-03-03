"use client";

import { useProgress, Html } from "@react-three/drei";
import { useEffect, useState } from "react";

interface LoaderProps {
    isReplaying?: boolean;
    onReplayFinished?: () => void;
}

export function Loader({ isReplaying, onReplayFinished }: LoaderProps) {
    const { progress, active } = useProgress();
    const [isFinished, setIsFinished] = useState(false);
    const [displayProgress, setDisplayProgress] = useState(0);
    const [startTime, setStartTime] = useState(Date.now());

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
                    setIsFinished(true);
                    clearInterval(interval);
                    onReplayFinished?.();
                }
            } else {
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
        <div className="fixed inset-0 z-[100] bg-dk-navy flex flex-col items-center justify-center">
            {/* Animated Background Glows - Nordic */}
            <div className="absolute w-[500px] h-[500px] bg-dk-red/15 blur-[150px] rounded-full animate-pulse" />
            <div className="absolute w-[300px] h-[300px] bg-dk-frost/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: "1s" }} />

            {/* Scandinavian Cross subtle */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div className="absolute top-0 bottom-0 left-[28%] w-[12%] bg-dk-red" />
                <div className="absolute left-0 right-0 top-[38%] h-[12%] bg-dk-red" />
            </div>

            <div className="relative z-10 flex flex-col items-center gap-8">
                {/* Spinning Rings - Frost style */}
                <div className="relative w-24 h-24">
                    <div className="absolute inset-0 border-t-4 border-dk-frost border-solid rounded-full animate-spin shadow-[0_0_20px_rgba(168,216,234,0.5)]" />
                    <div className="absolute inset-2 border-t-2 border-dk-red border-solid rounded-full animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
                    <div className="absolute inset-4 border-t-1 border-dk-silver/30 border-solid rounded-full animate-spin" style={{ animationDuration: "3s" }} />
                </div>

                <div className="flex flex-col items-center">
                    <h2 className="text-dk-white text-4xl font-black tracking-[0.3em] uppercase mb-2 italic">
                        DINAMARCA
                    </h2>
                    <p className="text-dk-frost font-bold tracking-[0.5em] text-xs uppercase opacity-70">
                        {isReplaying ? "Preparando Tour" : "Carregando Experiência"}
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="w-64 h-[2px] bg-dk-frost/10 rounded-full overflow-hidden mt-4">
                    <div
                        className="h-full bg-gradient-to-r from-dk-red to-dk-frost transition-all duration-300 ease-out shadow-[0_0_10px_rgba(200,16,46,0.5)]"
                        style={{ width: `${displayProgress}%` }}
                    />
                </div>

                <span className="text-dk-frost/40 font-mono text-sm tracking-widest">
                    {Math.round(displayProgress)}%
                </span>
            </div>
        </div>
    );
}

export function CanvasLoader() {
    return (
        <Html center>
            <div className="text-dk-frost text-xl font-bold tracking-widest uppercase animate-pulse">
                Iniciando...
            </div>
        </Html>
    );
}
