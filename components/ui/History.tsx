"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Trophy, History as HistoryIcon, Flag, Star, Shield } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const events = [
    {
        year: "1889",
        title: "A Fundação",
        description: "A Federação Dinamarquesa de Futebol (DBU) foi fundada, dando início à tradição futebolística do país.",
        icon: Flag,
        accent: "from-dk-red/20 to-transparent",
    },
    {
        year: "1992",
        title: "Milagre Europeu",
        description: "A Dinamarca chocou o mundo ao vencer a Euro 1992, entrando como substituta e saindo campeã — o maior feito do futebol dinamarquês.",
        icon: Trophy,
        accent: "from-dk-frost/20 to-transparent",
    },
    {
        year: "1998",
        title: "Quartas na Copa",
        description: "Uma campanha memorável na França, com vitória épica de 4-1 sobre a Nigéria, chegando às quartas de final.",
        icon: Star,
        accent: "from-dk-red/20 to-transparent",
    },
    {
        year: "2021",
        title: "Coração de Leão",
        description: "Após o susto com Eriksen, a Dinamarca mostrou resiliência sobre-humana e alcançou as semifinais da Euro 2020.",
        icon: Shield,
        accent: "from-dk-frost/20 to-transparent",
    },
    {
        year: "2026",
        title: "Nova Era Viking",
        description: "Uma nova geração de talentos carrega o legado dinamarquês com ambição renovada rumo à glória mundial.",
        icon: HistoryIcon,
        accent: "from-dk-red/20 to-transparent",
    },
];

export default function History() {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title animation
            gsap.from(".history-title", {
                y: 80,
                opacity: 0,
                duration: 1.5,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            });

            // Cards stagger in
            const cards = gsap.utils.toArray(".history-card");
            cards.forEach((card: any, i: number) => {
                gsap.from(card, {
                    y: 100,
                    opacity: 0,
                    scale: 0.9,
                    duration: 1.2,
                    ease: "expo.out",
                    delay: i * 0.15,
                    scrollTrigger: {
                        trigger: card,
                        start: "top 90%",
                    },
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative py-32 px-6 md:px-16 bg-transparent overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Title */}
                <div className="history-title mb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
                    <div>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-[2px] bg-dk-red" />
                            <span className="text-dk-frost font-bold tracking-[0.4em] text-xs uppercase">Linha do Tempo</span>
                        </div>
                        <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-dk-white uppercase leading-none">
                            LEGADO <br /><span className="text-dk-red">VIKING</span>
                        </h2>
                    </div>
                    <p className="text-dk-silver text-lg max-w-md font-medium">
                        Mais de um século de garra, paixão e momentos que definiram uma nação.
                    </p>
                </div>

                {/* Horizontal Scrollable Cards */}
                <div
                    ref={scrollRef}
                    className="flex gap-8 overflow-x-auto scroll-snap-x pb-8 -mx-6 px-6"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {events.map((event, i) => (
                        <div
                            key={i}
                            className="history-card flex-shrink-0 w-[340px] md:w-[400px] group"
                        >
                            <div className={`relative p-8 rounded-3xl bg-gradient-to-b ${event.accent} border border-dk-frost/10 backdrop-blur-sm hover:border-dk-red/50 transition-all duration-700 h-full overflow-hidden`}>
                                {/* Large year watermark */}
                                <div className="absolute -top-4 -right-4 text-[8rem] font-black text-dk-white/[0.03] select-none leading-none transition-colors duration-500 group-hover:text-dk-red/10">
                                    {event.year}
                                </div>

                                {/* Icon */}
                                <div className="w-14 h-14 rounded-2xl bg-dk-red/10 border border-dk-red/20 flex items-center justify-center mb-6 group-hover:bg-dk-red/20 transition-all duration-500">
                                    <event.icon className="w-7 h-7 text-dk-frost" />
                                </div>

                                {/* Year badge */}
                                <span className="text-dk-red font-black text-2xl tracking-wider">
                                    {event.year}
                                </span>

                                <h3 className="text-2xl font-black text-dk-white mt-2 mb-4 group-hover:text-dk-frost transition-colors duration-500">
                                    {event.title}
                                </h3>

                                <p className="text-dk-silver text-base leading-relaxed">
                                    {event.description}
                                </p>

                                {/* Bottom accent */}
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-dk-red via-dk-frost to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Scroll hint */}
                <div className="flex items-center gap-3 mt-6 justify-center md:justify-start">
                    <div className="w-8 h-[1px] bg-dk-frost/30" />
                    <span className="text-dk-frost/40 text-xs tracking-[0.3em] uppercase font-bold">Arraste para explorar</span>
                    <div className="w-8 h-[1px] bg-dk-frost/30" />
                </div>
            </div>
        </section>
    );
}
