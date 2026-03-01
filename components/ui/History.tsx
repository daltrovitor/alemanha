"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Trophy, History as HistoryIcon, Flag, Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const events = [
    {
        year: "1895",
        title: "A Fundação",
        description: "A Real Associação Belga de Futebol foi fundada, marcando o início de um legado.",
        icon: Flag,
    },
    {
        year: "1920",
        title: "Ouro Olímpico",
        description: "A Bélgica conquistou a medalha de ouro nos Jogos Olímpicos de Verão em Antuérpia, um triunfo histórico.",
        icon: Trophy,
    },
    {
        year: "1986",
        title: "Glória Mundial",
        description: "A Geração de Ouro da Bélgica surpreendeu o mundo chegando às semifinais da Copa pela primeira vez.",
        icon: Star,
    },
    {
        year: "2018",
        title: "Pódio Histórico",
        description: "Uma campanha lendária dos Red Devils, garantindo o 3º lugar no mundo e consolidando respeito global.",
        icon: Trophy,
    },
    {
        year: "2024",
        title: "Nova Era",
        description: "Construindo o futuro com jovens talentos e ambição renovada para a dominância global.",
        icon: HistoryIcon,
    },
];

export default function History() {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Line animation
            gsap.fromTo(
                lineRef.current,
                { scaleY: 0 },
                {
                    scaleY: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top center",
                        end: "bottom center",
                        scrub: true,
                    },
                }
            );

            // Items animation
            const items = gsap.utils.toArray(".timeline-item");
            items.forEach((item: any, i: number) => {
                gsap.from(item, {
                    x: i % 2 === 0 ? -100 : 100,
                    opacity: 0,
                    duration: 1.5,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                        end: "top 50%",
                        scrub: 1,
                    },
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative py-32 px-6 md:px-24 bg-transparent overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-24">
                    <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-4 uppercase">
                        LEGADO DE <span className="text-belgium-red">FOGO</span>
                    </h2>

                    <div className="h-1 w-24 bg-belgium-gold mx-auto" />
                </div>

                <div className="relative">
                    {/* Central Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2 hidden md:block" />
                    <div
                        ref={lineRef}
                        className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-belgium-red -translate-x-1/2 origin-top hidden md:block"
                    />

                    <div className="space-y-24 md:space-y-0">
                        {events.map((event, i) => (
                            <div
                                key={i}
                                className={`timeline-item relative flex flex-col md:flex-row items-center justify-center md:justify-between w-full ${i % 2 === 0 ? "md:flex-row-reverse" : ""
                                    }`}
                            >
                                {/* Content */}
                                <div className={`w-full md:w-[45%] ${i % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                                    <div className={`p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-belgium-gold/50 transition-colors duration-500 group shadow-[0_0_20px_rgba(0,0,0,0.5)]`}>
                                        <span className="text-belgium-gold font-bold text-xl tracking-widest">{event.year}</span>
                                        <h3 className="text-3xl font-black mt-2 mb-4 group-hover:text-belgium-red transition-colors">{event.title}</h3>
                                        <p className="text-gray-400 text-lg leading-relaxed">{event.description}</p>
                                    </div>
                                </div>

                                {/* Dot */}
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center">
                                    <div className="w-12 h-12 rounded-full bg-belgium-black border-2 border-belgium-red flex items-center justify-center z-20 shadow-[0_0_20px_rgba(208,0,0,0.5)]">
                                        <event.icon className="w-6 h-6 text-belgium-gold" />
                                    </div>
                                </div>

                                {/* Spacer for other side */}
                                <div className="hidden md:block w-[45%]" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
