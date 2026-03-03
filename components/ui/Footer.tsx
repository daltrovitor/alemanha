"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Instagram, Twitter, Facebook, Globe } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const containerRef = useRef<HTMLDivElement>(null);
    const quoteRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(quoteRef.current, {
                y: 120,
                opacity: 0,
                scale: 0.9,
                duration: 2,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: quoteRef.current,
                    start: "top 90%",
                },
            });

            gsap.from(".social-icon-dk", {
                y: 50,
                opacity: 0,
                stagger: 0.1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".social-icon-dk",
                    start: "top 95%",
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer ref={containerRef} className="relative min-h-[100vh] flex flex-col justify-end items-center text-center p-12 bg-transparent overflow-hidden select-none">

            {/* Aurora Borealis Background */}
            <div className="aurora-bg absolute inset-0 z-0" />

            {/* Dark overlay at bottom */}
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#030810] via-[#030810]/80 to-transparent z-0" />

            {/* Frost particles decoration */}
            <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-dk-frost/30 animate-pulse" />
            <div className="absolute top-1/3 right-1/3 w-1 h-1 rounded-full bg-dk-frost/20 animate-pulse" style={{ animationDelay: "1s" }} />
            <div className="absolute top-1/2 left-2/3 w-3 h-3 rounded-full bg-dk-frost/10 animate-pulse" style={{ animationDelay: "2s" }} />

            {/* Content */}
            <div className="z-10 max-w-5xl space-y-10 mb-24">
                {/* Logo */}
                <div className="mx-auto w-16 h-16 md:w-20 md:h-20 mb-6 opacity-50 hover:opacity-100 transition-opacity duration-500">
                    <Image src="/dinamarca.png" alt="Denmark Logo" width={80} height={80} className="object-contain" />
                </div>

                <div className="flex items-center justify-center gap-4">
                    <div className="w-12 h-[1px] bg-dk-frost/30" />
                    <h4 className="text-dk-frost font-bold tracking-[0.5em] text-sm uppercase opacity-70">O Apito Final</h4>
                    <div className="w-12 h-[1px] bg-dk-frost/30" />
                </div>

                <h2 ref={quoteRef} className="text-6xl md:text-9xl font-black text-dk-white tracking-tighter uppercase leading-none">
                    UNIDOS <br />
                    <span className="text-dk-red">COMO UM SÓ</span>
                </h2>

                <p className="max-w-xl mx-auto text-dk-silver text-lg md:text-xl font-medium tracking-wide">
                    Junte-se à jornada. Apoie o legado. <span className="text-dk-frost">Danish Dynamite</span> para sempre.
                </p>

                {/* Social Icons */}
                <div className="flex justify-center gap-6 pt-8">
                    {[Instagram, Twitter, Facebook, Globe].map((Icon, i) => (
                        <a
                            key={i}
                            href="#"
                            className="social-icon-dk group relative p-4 rounded-2xl bg-dk-frost/5 border border-dk-frost/10 hover:bg-dk-red hover:border-dk-red transition-all duration-500 hover:scale-110"
                        >
                            <Icon className="w-6 h-6 text-dk-frost group-hover:text-white transition-colors duration-300" />
                            <div className="absolute inset-0 rounded-2xl bg-dk-frost/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </a>
                    ))}
                </div>
            </div>

            {/* Footer Meta */}
            <div className="z-10 w-full pt-16 border-t border-dk-frost/10 flex flex-col md:flex-row justify-between items-center text-xs text-dk-silver/50 font-bold tracking-widest uppercase gap-6">
                <div className="flex gap-12">
                    <a href="#" className="hover:text-dk-frost transition-colors">Política de Privacidade</a>
                    <a href="#" className="hover:text-dk-frost transition-colors">Cookies</a>
                </div>
                <p>© 2026 FEDERAÇÃO DINAMARQUESA DE FUTEBOL (DBU)</p>
                <div className="flex gap-3">
                    <div className="w-10 h-1 bg-dk-red rounded-full" />
                    <div className="w-6 h-1 bg-dk-frost rounded-full" />
                    <div className="w-3 h-1 bg-dk-silver/30 rounded-full" />
                </div>
            </div>

            {/* Large glow spots */}
            <div className="absolute -bottom-[15%] left-[20%] w-[500px] h-[500px] bg-dk-frost/10 blur-[200px] -z-1" />
            <div className="absolute -bottom-[10%] right-[10%] w-[400px] h-[400px] bg-dk-red/15 blur-[180px] -z-1" />
        </footer>
    );
}
