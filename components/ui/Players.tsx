"use client";

import { useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

const players = [
    {
        name: "Christian Eriksen",
        position: "Meio-Campo",
        number: "10",
        image: "/eriksen.png",
        quote: "O coração criativo que rege o meio-campo dinamarquês.",
    },
    {
        name: "Rasmus Højlund",
        position: "Atacante",
        number: "9",
        image: "/hojlund.png",
        quote: "A nova geração do poder ofensivo viking.",
    },
    {
        name: "Kasper Schmeichel",
        position: "Goleiro",
        number: "1",
        image: "/schmeichel.png",
        quote: "Guardião do legado, muralha da Dinamarca.",
    },
];

function PlayerCard({ player, index }: { player: typeof players[0]; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLDivElement>(null);

    const isReversed = index % 2 !== 0;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const { left, top, width, height } = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;

        gsap.to(cardRef.current, {
            rotateY: x * 8,
            rotateX: y * -8,
            transformPerspective: 1200,
            duration: 0.5,
            ease: "power2.out",
        });

        if (imgRef.current) {
            gsap.to(imgRef.current, {
                x: x * 15,
                y: y * 15,
                duration: 0.5,
                ease: "power2.out",
            });
        }
    };

    const handleMouseLeave = () => {
        gsap.to(cardRef.current, {
            rotateY: 0,
            rotateX: 0,
            duration: 1.2,
            ease: "elastic.out(1, 0.3)",
        });
        if (imgRef.current) {
            gsap.to(imgRef.current, {
                x: 0,
                y: 0,
                duration: 1,
                ease: "elastic.out(1, 0.5)",
            });
        }
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative flex flex-col ${isReversed ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-8 md:gap-16 group cursor-pointer`}
        >
            {/* Player Image - Magazine style */}
            <div className="relative w-full md:w-1/2 aspect-[3/4] max-w-lg rounded-3xl overflow-hidden bg-gradient-to-b from-dk-navy to-dk-red/10 border border-dk-frost/10">
                {/* Giant Number behind */}
                <div className="absolute inset-0 flex items-center justify-center text-[20rem] font-black text-dk-white/[0.03] select-none leading-none z-0 transition-all duration-700 group-hover:text-dk-red/10 group-hover:scale-110">
                    {player.number}
                </div>

                {/* Image */}
                <div ref={imgRef} className="relative w-full h-full z-10 transform transition-transform duration-700 group-hover:scale-105">
                    <Image
                        src={player.image}
                        alt={player.name}
                        fill
                        className="object-contain object-bottom select-none"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                    />
                </div>

                {/* Bottom gradient overlay */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-dk-navy to-transparent z-20" />

                {/* Position badge */}
                <div className="absolute top-6 left-6 z-30">
                    <span className="px-4 py-2 rounded-full bg-dk-red/20 border border-dk-red/30 text-dk-frost text-xs font-bold tracking-[0.3em] uppercase backdrop-blur-sm">
                        {player.position}
                    </span>
                </div>

                {/* Corner accent */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-dk-red to-dk-frost opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30" />
            </div>

            {/* Text Content - Editorial */}
            <div className={`w-full md:w-1/2 space-y-6 ${isReversed ? "md:text-right" : "md:text-left"}`}>
                <div className={`flex items-center gap-4 ${isReversed ? "md:flex-row-reverse" : ""}`}>
                    <div className="w-12 h-[2px] bg-dk-red" />
                    <span className="text-dk-frost font-bold tracking-[0.4em] text-xs uppercase">#{player.number}</span>
                </div>

                <h3 className="text-5xl md:text-7xl font-black text-dk-white tracking-tighter uppercase leading-none">
                    {player.name.split(" ")[0]} <br />
                    <span className="text-dk-red">{player.name.split(" ").slice(1).join(" ")}</span>
                </h3>

                <p className="text-dk-silver text-lg md:text-xl font-medium italic max-w-md leading-relaxed">
                    "{player.quote}"
                </p>

                <div className={`flex gap-3 ${isReversed ? "md:justify-end" : ""}`}>
                    <div className="w-8 h-1 bg-dk-red rounded-full" />
                    <div className="w-8 h-1 bg-dk-frost rounded-full" />
                    <div className="w-4 h-1 bg-dk-silver/30 rounded-full" />
                </div>
            </div>
        </div>
    );
}

export default function Players() {
    return (
        <section className="py-32 px-6 md:px-16 bg-transparent overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="mb-24 space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-[2px] bg-dk-frost" />
                        <span className="text-dk-frost font-bold tracking-[0.4em] text-xs uppercase">Elenco</span>
                    </div>
                    <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-dk-white uppercase leading-none">
                        Guerreiros <br /><span className="text-dk-frost">do Norte</span>
                    </h2>
                    <p className="text-dk-silver text-xl font-medium max-w-lg">
                        Os Vikings modernos que carregam a bandeira dinamarquesa com honra e paixão.
                    </p>
                </div>

                {/* Players - Magazine Layout */}
                <div className="space-y-32">
                    {players.map((p, i) => (
                        <PlayerCard key={i} player={p} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
