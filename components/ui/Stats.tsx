"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { label: "Ranking FIFA (Atual)", end: "6", suffix: "" },
    { label: "Total de Pontos", end: "1790", suffix: "" },
    { label: "Vitórias Históricas", end: "354", suffix: "+" },
    { label: "Gols Marcados", end: "1284", suffix: "+" },
];

function Counter({ end, label, suffix }: { end: string, label: string, suffix: string }) {
    const countRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const val = parseInt(end);
        let obj = { n: 0 };

        gsap.to(obj, {
            n: val,
            duration: 2.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: countRef.current,
                start: "top 90%",
            },
            onUpdate: () => {
                if (countRef.current) {
                    countRef.current.innerText = Math.floor(obj.n).toString();
                }
            }
        });
    }, [end]);

    return (
        <div className="flex flex-col items-center justify-center space-y-2 p-10 bg-white/5 rounded-3xl backdrop-blur-md border border-white/5 group hover:bg-belgium-red/10 transition-all duration-500">
            <h3 className="text-6xl md:text-8xl font-black text-white tracking-tighter flex items-center">
                <span ref={countRef}>0</span>{suffix}
            </h3>
            <p className="text-belgium-gold font-bold tracking-[0.2em] uppercase text-sm mt-4 text-center">
                {label}
            </p>
        </div>
    );
}

const perfStats = [
    { label: "Poder de Ataque", val: 92, color: "bg-belgium-red" },
    { label: "Solidez Defensiva", val: 85, color: "bg-white" },
    { label: "Sinergia de Equipe", val: 88, color: "bg-belgium-gold" },
];

export default function Statistics() {
    const barsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const bars = gsap.utils.toArray(".stat-bar");
        bars.forEach((bar: any) => {
            const val = bar.getAttribute("data-value");
            gsap.fromTo(bar,
                { width: "0%" },
                {
                    width: val + "%",
                    duration: 1.5,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: bar,
                        start: "top 90%",
                    }
                }
            );
        });
    }, []);

    return (
        <section className="py-32 px-6 bg-transparent relative overflow-hidden">
            {/* Background Decorative */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-belgium-red/10 blur-[150px] -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-belgium-gold/10 blur-[150px] -z-10" />

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
                <div className="space-y-12">
                    <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none">
                        PODER EM <br /><span className="text-belgium-red">NÚMEROS</span>
                    </h2>
                    <div className="space-y-8" ref={barsRef}>
                        {perfStats.map((stat, i) => (
                            <div key={i} className="space-y-3 group">
                                <div className="flex justify-between text-lg font-bold">
                                    <span className="text-gray-300 uppercase tracking-widest">{stat.label}</span>
                                    <span className="text-belgium-gold">{stat.val}%</span>
                                </div>
                                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className={cn("stat-bar h-full rounded-full transition-shadow duration-500", stat.color)}
                                        data-value={stat.val}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-gray-400 text-lg md:text-xl font-medium max-w-lg italic">
                        A eficiência dos Red Devils em grandes competições. Excelência consistente, ambição inigualável.
                    </p>
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {stats.map((s, i) => (
                        <Counter key={i} {...s} />
                    ))}
                </div>
            </div>
        </section>
    );
}
