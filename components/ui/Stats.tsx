"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { label: "Ranking FIFA", end: "21", suffix: "º" },
    { label: "Participações em Mundiais", end: "6", suffix: "" },
    { label: "Vitórias Históricas", end: "480", suffix: "+" },
    { label: "Gols Marcados", end: "1150", suffix: "+" },
    { label: "Euro 1992", end: "1", suffix: "x Campeã" },
    { label: "Confederações 1995", end: "1", suffix: "x Campeã" },
];

function HexCounter({ end, label, suffix, index }: { end: string; label: string; suffix: string; index: number }) {
    const countRef = useRef<HTMLSpanElement>(null);
    const hexRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const val = parseInt(end);
        const obj = { n: 0 };

        gsap.to(obj, {
            n: val,
            duration: 2.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: hexRef.current,
                start: "top 90%",
            },
            onUpdate: () => {
                if (countRef.current) {
                    countRef.current.innerText = Math.floor(obj.n).toString();
                }
            },
        });

        // Frost appear animation
        gsap.from(hexRef.current, {
            scale: 0,
            opacity: 0,
            duration: 1,
            ease: "back.out(1.7)",
            delay: index * 0.12,
            scrollTrigger: {
                trigger: hexRef.current,
                start: "top 90%",
            },
        });
    }, [end, index]);

    return (
        <div ref={hexRef} className="group flex flex-col items-center">
            {/* Hexagon Container */}
            <div className="relative w-40 h-44 md:w-48 md:h-52 flex items-center justify-center">
                {/* Hexagon background */}
                <div className="hexagon absolute inset-0 bg-gradient-to-b from-dk-frost/10 to-dk-red/5 transition-all duration-700 group-hover:from-dk-red/20 group-hover:to-dk-frost/10" />
                <div className="hexagon absolute inset-[2px] bg-dk-navy/90 backdrop-blur-sm" />

                {/* Hexagon border glow on hover */}
                <div className="hexagon absolute inset-0 bg-transparent border-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ boxShadow: "inset 0 0 30px rgba(168, 216, 234, 0.2)" }}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center space-y-1 text-center px-4">
                    <h3 className="text-4xl md:text-5xl font-black text-dk-white tracking-tighter flex items-baseline">
                        <span ref={countRef}>0</span>
                        <span className="text-lg md:text-xl text-dk-frost ml-1">{suffix}</span>
                    </h3>
                    <p className="text-dk-frost/80 font-bold tracking-[0.15em] uppercase text-[10px] md:text-xs mt-2 leading-tight">
                        {label}
                    </p>
                </div>
            </div>
        </div>
    );
}

const perfStats = [
    { label: "Poder de Ataque", val: 84, color: "bg-dk-red" },
    { label: "Solidez Defensiva", val: 88, color: "bg-dk-frost" },
    { label: "Espírito Coletivo", val: 95, color: "bg-gradient-to-r from-dk-red to-dk-frost" },
];

export default function Statistics() {
    const barsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const bars = gsap.utils.toArray(".stat-bar-dk");
        bars.forEach((bar: any) => {
            const val = bar.getAttribute("data-value");
            gsap.fromTo(
                bar,
                { width: "0%" },
                {
                    width: val + "%",
                    duration: 1.8,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: bar,
                        start: "top 90%",
                    },
                }
            );
        });
    }, []);

    return (
        <section className="py-32 px-6 bg-transparent relative overflow-hidden">
            {/* Background frost blurs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-dk-frost/5 blur-[180px] -z-10" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-dk-red/8 blur-[150px] -z-10" />

            <div className="max-w-7xl mx-auto">
                {/* Title */}
                <div className="text-center mb-20 space-y-4">
                    <div className="flex items-center justify-center gap-4">
                        <div className="w-12 h-[2px] bg-dk-red" />
                        <span className="text-dk-frost font-bold tracking-[0.4em] text-xs uppercase">Dados</span>
                        <div className="w-12 h-[2px] bg-dk-red" />
                    </div>
                    <h2 className="text-5xl md:text-8xl font-black text-dk-white tracking-tighter uppercase leading-none">
                        PODER EM <br /><span className="text-dk-red">NÚMEROS</span>
                    </h2>
                </div>

                {/* Hexagonal Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 justify-items-center mb-24">
                    {stats.map((s, i) => (
                        <HexCounter key={i} index={i} {...s} />
                    ))}
                </div>

                {/* Performance Bars */}
                <div className="max-w-3xl mx-auto space-y-10" ref={barsRef}>
                    <h3 className="text-3xl font-black text-dk-white tracking-tighter uppercase text-center mb-12">
                        Performance <span className="text-dk-frost">Tática</span>
                    </h3>
                    {perfStats.map((stat, i) => (
                        <div key={i} className="space-y-3 group">
                            <div className="flex justify-between text-base font-bold">
                                <span className="text-dk-silver uppercase tracking-[0.2em]">{stat.label}</span>
                                <span className="text-dk-frost">{stat.val}%</span>
                            </div>
                            <div className="h-2 w-full bg-dk-frost/10 rounded-full overflow-hidden">
                                <div
                                    className={`stat-bar-dk h-full rounded-full ${stat.color} shadow-[0_0_15px_rgba(168,216,234,0.3)]`}
                                    data-value={stat.val}
                                />
                            </div>
                        </div>
                    ))}
                    <p className="text-dk-silver text-lg font-medium italic text-center mt-8 max-w-lg mx-auto">
                        O espírito viking aplicado ao futebol moderno — disciplina tática e fogo interior.
                    </p>
                </div>
            </div>
        </section>
    );
}
