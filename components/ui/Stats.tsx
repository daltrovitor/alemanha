"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { value: 2, label: "Copas do Mundo", highlight: true },
    { value: 2, label: "Eurocopas", highlight: true },
    { value: 2, label: "Nations League", highlight: false },
    { value: 750, label: "Vitórias", highlight: false, plus: true },
    { value: 2100, label: "Gols Históricos", highlight: false, plus: true },
    { value: 5, label: "Finais de Copa", highlight: true },
];

export default function Statistics() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const numbers = gsap.utils.toArray(".stat-number");

            numbers.forEach((num: any) => {
                const targetVal = parseFloat(num.getAttribute("data-val"));

                gsap.fromTo(num,
                    { innerText: 0 },
                    {
                        innerText: targetVal,
                        duration: 3,
                        ease: "power2.out",
                        snap: { innerText: 1 },
                        scrollTrigger: {
                            trigger: num,
                            start: "top 80%"
                        }
                    }
                );
            });

            gsap.from(".stat-box", {
                y: 50,
                opacity: 0,
                filter: "blur(10px)",
                duration: 1,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%"
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative py-40 px-6 max-w-7xl mx-auto z-20">
            <div className="text-center mb-24">
                <h2 className="text-sm md:text-base text-fr-gold font-bold tracking-[0.5em] uppercase border-y border-fr-gold/30 inline-block py-4 px-12 mb-8 bg-fr-dark/50 backdrop-blur-md">
                    La Puissance
                </h2>
                <p className="text-fr-white text-5xl md:text-7xl font-black uppercase tracking-tighter">
                    Supremacia Mundial
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {stats.map((s, i) => (
                    <div key={i} className={`stat-box relative overflow-hidden p-12 rounded-none border ${s.highlight ? 'border-fr-gold/40 bg-fr-gold/5' : 'border-fr-white/10 bg-fr-white/5'} backdrop-blur-sm flex flex-col items-center justify-center group hover:bg-fr-white/10 transition-colors duration-700`}>

                        {/* Dramatic corner frames */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-fr-white/30" />
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-fr-white/30" />

                        {s.highlight && <div className="absolute top-0 right-0 w-32 h-32 bg-fr-gold/20 blur-[50px] pointer-events-none" />}

                        <div className="flex items-start text-fr-white mb-4">
                            <span
                                className={`stat-number text-7xl md:text-8xl font-black tracking-tighter leading-none ${s.highlight ? 'text-fr-gold text-outline-hover' : ''}`}
                                data-val={s.value}
                            >
                                0
                            </span>
                            {s.plus && <span className="text-4xl md:text-5xl font-bold text-fr-gold ml-1">+</span>}
                        </div>

                        <p className="text-fr-silver text-sm md:text-base font-bold tracking-[0.3em] uppercase text-center mt-2 group-hover:text-fr-white transition-colors">
                            {s.label}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
