"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const events = [
    { year: "1904", title: "A Origem", subtitle: "Fundação da FFF, plantando a semente da excelência." },
    { year: "1998", title: "Primeira Estrela", subtitle: "Zidane e a glória absoluta no Stade de France." },
    { year: "2000", title: "Os Reis da Europa", subtitle: "O épico Golden Goal de Trezeguet na Eurocopa." },
    { year: "2018", title: "O Retorno ao Topo", subtitle: "Uma campanha irretocável na Rússia consagra a segunda estrela." },
    { year: "2026", title: "O Futuro", subtitle: "A busca implacável pela imortalidade no cenário mundial." }
];

export default function History() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate the central glowing line
            gsap.fromTo(lineRef.current,
                { scaleY: 0 },
                {
                    scaleY: 1, ease: "none", scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 20%",
                        end: "bottom 80%",
                        scrub: true
                    }
                }
            );

            // Animate each event dynamically
            const items = gsap.utils.toArray(".timeline-item");
            items.forEach((item: any, i) => {
                const isLeft = i % 2 === 0;
                gsap.from(item, {
                    x: isLeft ? -100 : 100,
                    opacity: 0,
                    filter: "blur(10px)",
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%"
                    }
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative py-40 px-6 max-w-6xl mx-auto" id="legacy">
            {/* Background Glows */}
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-fr-light-blue/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-fr-red/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="text-center mb-32">
                <h2 className="text-6xl md:text-9xl font-black text-outline-gold mb-6 uppercase tracking-tighter">
                    Le Légendaire
                </h2>
                <p className="text-fr-silver text-xl md:text-2xl font-light tracking-[0.2em] uppercase max-w-2xl mx-auto">
                    A arte e a glória tecidas ao longo do tempo.
                </p>
            </div>

            <div className="relative">
                {/* Central Line */}
                <div className="absolute top-0 bottom-0 left-8 md:left-1/2 w-[2px] -translate-x-1/2 flex flex-col items-center">
                    <div ref={lineRef} className="w-full h-full origin-top bg-gradient-to-b from-fr-gold via-fr-white to-transparent shadow-[0_0_15px_rgba(212,175,55,0.8)]" />
                </div>

                {/* Timeline Items */}
                <div className="space-y-24 md:space-y-40">
                    {events.map((ev, i) => {
                        const isLeft = i % 2 === 0;
                        return (
                            <div key={i} className={`timeline-item relative flex flex-col md:flex-row items-start md:items-center ${isLeft ? "md:flex-row-reverse" : ""} pl-20 md:pl-0`}>

                                {/* Center Dot */}
                                <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-fr-dark border-2 border-fr-gold shadow-[0_0_20px_rgba(212,175,55,1)] -translate-x-1/2 mt-4 md:mt-0 z-10" />

                                <div className={`w-full md:w-1/2 ${isLeft ? "md:pr-24 md:text-right" : "md:pl-24"}`}>
                                    <h3 className="text-7xl md:text-8xl font-black text-fr-white/10 tracking-tighter leading-none mb-[-2rem] select-none">
                                        {ev.year}
                                    </h3>
                                    <div className="relative z-10 backdrop-blur-md bg-fr-white/5 border border-fr-white/10 p-8 md:p-12 rounded-[2rem] hover:bg-fr-white/10 hover:border-fr-gold/50 transition-all duration-500">
                                        <h4 className="text-3xl md:text-5xl font-bold text-fr-white mb-4 uppercase tracking-tight">
                                            {ev.title}
                                        </h4>
                                        <p className="text-fr-silver text-lg font-light leading-relaxed">
                                            {ev.subtitle}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}
