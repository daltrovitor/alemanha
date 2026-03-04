"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const timelineEvents = [
    {
        year: "1954",
        title: "O MILAGRE DE BERNA",
        desc: "A Alemanha Ocidental derrota a invencível Hungria por 3-2 em uma das maiores zebras da história das Copas.",
        color: "bg-de-white",
        textCol: "text-de-black",
    },
    {
        year: "1974",
        title: "O FUTEBOL TOTAL VENCIDO",
        desc: "Em casa, a equipe liderada por Beckenbauer para o Carrossel Holandês de Cruyff.",
        color: "bg-de-red",
        textCol: "text-de-white",
    },
    {
        year: "1990",
        title: "A REVANCHE DE ITÁLIA 90",
        desc: "Sob o comando de Beckenbauer como técnico, a Alemanha unificada vinga a final de 86 contra a Argentina.",
        color: "bg-de-gold",
        textCol: "text-de-black",
    },
    {
        year: "2014",
        title: "MINEIRAZO & O TETRA",
        desc: "O lendário 7-1 no Brasil, culminando no gol de Götze no Maracanã para selar a 4ª estrela.",
        color: "bg-de-black",
        textCol: "text-de-white",
        border: "border-4 border-de-white",
    },
];

export default function History() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray(".history-card");
            cards.forEach((card: any, i) => {
                gsap.fromTo(
                    card,
                    { opacity: 0, scale: 0.9, y: 50 },
                    {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "expo.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="w-full max-w-7xl mx-auto px-4 md:px-12 py-32 z-20 pointer-events-auto">
            <div className="mb-20">
                <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-de-white inline-block bg-de-red p-4 border-4 border-de-white hard-shadow transform -rotate-2">
                    A HISTÓRIA
                </h2>
                <div className="w-full h-4 bg-de-gold mt-6 border-y-4 border-de-black" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {timelineEvents.map((ev, i) => (
                    <div
                        key={ev.year}
                        className={`history-card p-8 flex flex-col justify-between h-[400px] hover:-translate-y-4 transition-transform duration-300 shadow-2xl ${ev.color} ${ev.textCol} ${ev.border || "border-4 border-transparent"}`}
                        style={{
                            boxShadow: i % 2 === 0 ? "10px 10px 0px #FFCE00" : "10px 10px 0px #E2001A"
                        }}
                    >
                        <div>
                            <span className="text-7xl font-black opacity-80 uppercase leading-none block border-b-4 border-current pb-4 mb-4">
                                {ev.year}
                            </span>
                            <h3 className="text-2xl font-bold uppercase mb-4 leading-tight">
                                {ev.title}
                            </h3>
                        </div>
                        <p className="font-medium text-lg border-l-4 pl-4 border-current">
                            {ev.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
