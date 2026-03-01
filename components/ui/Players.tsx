"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";
import { cn } from "@/lib/utils";

const players = [
    {
        name: "Kevin De Bruyne",
        position: "Meio-Campo",
        number: "7",
        image: "/kdb.png",
        color: "#D00000",
    },
    {
        name: "Romelu Lukaku",
        position: "Atacante",
        number: "10",
        image: "/lukaku.png",
        color: "#000000",
    },
    {
        name: "Jeremy Doku",
        position: "Ponta",
        number: "11",
        image: "/doku.png",
        color: "#FFD700",
    },
];


function PlayerCard({ player }: { player: typeof players[0] }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const { left, top, width, height } = cardRef.current.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;

        const xPercent = (x / width - 0.5) * 20;
        const yPercent = (y / height - 0.5) * -20;

        gsap.to(cardRef.current, {
            rotateY: xPercent,
            rotateX: yPercent,
            transformPerspective: 1000,
            duration: 0.5,
            ease: "power2.out",
        });

        if (glowRef.current) {
            gsap.to(glowRef.current, {
                opacity: 1,
                x: x - width / 2,
                y: y - height / 2,
                duration: 0.2,
            });
        }
    };

    const handleMouseLeave = () => {
        gsap.to(cardRef.current, {
            rotateY: 0,
            rotateX: 0,
            duration: 1,
            ease: "elastic.out(1, 0.3)",
        });
        if (glowRef.current) {
            gsap.to(glowRef.current, {
                opacity: 0,
                duration: 0.5,
            });
        }
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full aspect-[2/3] max-w-sm rounded-[2rem] bg-zinc-900 overflow-hidden border border-white/10 group cursor-pointer transition-shadow duration-500 hover:shadow-[0_0_50px_rgba(255,215,0,0.2)]"
        >
            {/* Background Glow */}
            <div
                ref={glowRef}
                className="absolute inset-0 pointer-events-none bg-belgium-gold/20 blur-[100px] opacity-0 z-0"
                style={{ width: '100%', height: '100%' }}
            />

            {/* Number Watermark */}
            <div className="absolute top-4 right-4 text-9xl font-black text-white/5 select-none transition-all duration-500 group-hover:text-belgium-gold/10 group-hover:-translate-y-4">
                {player.number}
            </div>

            {/* Player Image */}
            <div className="absolute inset-0 flex items-end justify-center z-10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />

                <div className="relative w-full h-full transform transition-transform duration-700 group-hover:scale-110 group-hover:-translate-y-5">
                    <Image
                        src={player.image}
                        alt={player.name}
                        fill
                        className="object-contain object-bottom select-none"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        priority
                    />
                </div>

                {/* Info */}
                <div className="absolute bottom-10 left-10 z-20 transition-transform duration-500 group-hover:translate-x-2">
                    <p className="text-belgium-gold font-bold tracking-[0.2em] text-sm mb-1 uppercase opacity-70">
                        {player.position}
                    </p>
                    <h3 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">
                        {player.name.split(" ")[0]} <br />
                        <span className="text-belgium-red">{player.name.split(" ")[1]}</span>
                    </h3>
                </div>
            </div>

            {/* Bottom Accent */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-belgium-red group-hover:bg-belgium-gold transition-colors duration-500" />
        </div>
    );
}


export default function Players() {
    return (
        <section className="py-32 px-6 bg-transparent overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="space-y-4">
                        <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none">
                            Guerreiros <br /><span className="text-belgium-gold">de Elite</span>
                        </h2>
                        <p className="text-gray-400 text-xl font-medium max-w-md">
                            A geração de ouro e as estrelas em ascensão que carregam o peso de uma nação.
                        </p>
                    </div>

                    <div className="hidden md:block">
                        <div className="flex gap-4 mb-4">
                            <div className="w-12 h-1 bg-belgium-red" />
                            <div className="w-12 h-1 bg-belgium-gold" />
                            <div className="w-12 h-1 bg-black" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {players.map((p, i) => (
                        <PlayerCard key={i} player={p} />
                    ))}
                </div>
            </div>
        </section>
    );
}
