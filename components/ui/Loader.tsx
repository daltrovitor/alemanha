"use client";

import { useProgress, Html } from "@react-three/drei";
import { useEffect, useState } from "react";
import gsap from "gsap";

export function Loader() {
    const { progress, active } = useProgress();
    const [isFinished, setIsFinished] = useState(false);

    const [displayProgress, setDisplayProgress] = useState(0);

    useEffect(() => {
        const startTime = Date.now();
        const minDisplayTime = 8000; // 8 segundos

        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const timeProgress = (elapsed / minDisplayTime) * 100;

            // O progresso visual é o menor entre o tempo decorrido e o carregamento real (com um pequeno boost)
            // Mas garantimos que ele chegue a 100% apenas perto dos 8 segundos
            const nextProgress = Math.min(timeProgress, progress > 0 ? progress : timeProgress);
            setDisplayProgress(nextProgress);

            if (elapsed >= minDisplayTime && progress === 100 && !active) {
                setIsFinished(true);
                clearInterval(interval);
            }
        }, 50);

        return () => clearInterval(interval);
    }, [progress, active]);


    if (isFinished) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center">
            {/* Animated Background Glow */}
            <div className="absolute w-[500px] h-[500px] bg-belgium-red/20 blur-[120px] rounded-full animate-pulse" />

            <div className="relative z-10 flex flex-col items-center gap-8">
                {/* Logo or Iconic Element */}
                <div className="w-24 h-24 border-t-4 border-belgium-gold border-solid rounded-full animate-spin shadow-[0_0_20px_rgba(255,215,0,0.5)]" />

                <div className="flex flex-col items-center">
                    <h2 className="text-white text-4xl font-black tracking-[0.3em] uppercase mb-2 italic">
                        BÉLGICA
                    </h2>
                    <p className="text-belgium-gold font-bold tracking-[0.5em] text-xs uppercase opacity-70">
                        Carregando Experiência
                    </p>
                </div>

                {/* Progress Bar Container */}
                <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden mt-4">
                    <div
                        className="h-full bg-belgium-red transition-all duration-300 ease-out shadow-[0_0_10px_#D00000]"
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
