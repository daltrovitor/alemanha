"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Roster = [
    { pId: "1", name: "Kroos", num: "8", role: "Maestro Midfield" },
    { pId: "2", name: "Müller", num: "13", role: "Raumdeuter" },
    { pId: "3", name: "Neuer", num: "1", role: "Sweeper Keeper" },
    { pId: "4", name: "Musiala", num: "10", role: "Creative Dribbler" },
];

export default function Players() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const pCards = gsap.utils.toArray(".player-block");
            gsap.fromTo(pCards, {
                opacity: 0,
                x: (index) => index % 2 === 0 ? -100 : 100,
                rotationY: -45,
            }, {
                opacity: 1,
                x: 0,
                rotationY: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".players-grid",
                    start: "top 80%",
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="w-full max-w-7xl mx-auto px-4 md:px-12 py-32 pointer-events-auto">
            <div className="flex flex-col md:flex-row items-end justify-between mb-16 border-b-8 border-de-red pb-8">
                <h2 className="text-7xl md:text-9xl font-black uppercase text-de-white tracking-tighter">
                    LENDAS
                </h2>
                <span className="bg-de-gold text-de-black font-black text-2xl uppercase px-4 py-2 mt-4 md:mt-0">
                    OS DEUSES DA MÁQUINA
                </span>
            </div>

            <div className="players-grid grid grid-cols-1 md:grid-cols-2 gap-12">
                {Roster.map((player) => (
                    <div key={player.pId} className="player-block relative bg-de-black border-[6px] border-de-white p-8 group overflow-hidden hard-shadow hover:translate-x-2 transition-transform duration-300">
                        {/* Background number cutout */}
                        <span className="absolute -bottom-10 -right-10 text-[250px] font-black text-de-white opacity-5 pointer-events-none z-0 transform group-hover:scale-110 transition-transform duration-700">
                            {player.num}
                        </span>

                        <div className="relative z-10 flex flex-col justify-between h-full min-h-[250px]">
                            <div className="flex justify-between items-start">
                                <span className="text-8xl font-black text-outline uppercase group-hover:text-de-red transition-colors duration-300">
                                    {player.num}
                                </span>
                                <div className="w-3/4 h-[4px] bg-de-white group-hover:bg-de-gold transition-colors duration-300 mt-10" />
                            </div>

                            <div className="mt-8">
                                <h3 className="text-5xl md:text-7xl font-black text-de-white uppercase tracking-tighter">
                                    {player.name}
                                </h3>
                                <p className="inline-block bg-de-red text-de-white px-2 mt-2 font-bold uppercase tracking-widest text-lg">
                                    {player.role}
                                </p>
                            </div>
                        </div>
                        {/* Top right corner cut effect using borders */}
                        <div className="absolute top-0 right-0 w-16 h-16 bg-de-white transform rotate-45 translate-x-8 -translate-y-8 pointer-events-none group-hover:bg-de-gold transition-colors" />
                    </div>
                ))}
            </div>
        </div>
    );
}
