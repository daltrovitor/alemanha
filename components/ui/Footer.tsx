"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Instagram, Twitter, Facebook, Globe } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const quoteRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(quoteRef.current, {
                y: 100,
                opacity: 0,
                duration: 2,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: quoteRef.current,
                    start: "top 90%",
                }
            });

            gsap.from(".social-icon", {
                y: 50,
                opacity: 0,
                stagger: 0.1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".social-icon",
                    start: "top 95%",
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer ref={containerRef} className="relative min-h-[100vh] flex flex-col justify-end items-center text-center p-12 bg-transparent overflow-hidden select-none">

            {/* Cinematic Backdrop Overlay - REMOVED redundant background */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent z-0" />


            {/* Animated quote section */}
            <div ref={contentRef} className="z-10 max-w-5xl space-y-12 mb-24">
                <div className="mx-auto w-16 h-16 md:w-20 md:h-20 mb-8 opacity-50 hover:opacity-100 transition-opacity">
                    <Image src="/belgica.png" alt="Belgium Logo Small" width={80} height={80} className="object-contain" />
                </div>
                <h4 className="text-belgium-gold font-bold tracking-[0.5em] text-sm uppercase opacity-70">O Apito Final</h4>

                <h2 ref={quoteRef} className="text-6xl md:text-9xl font-black text-white tracking-tighter uppercase leading-none">
                    JUNTOS <br /><span className="text-belgium-red">COMO UM SÓ</span>
                </h2>
                <p className="max-w-xl mx-auto text-gray-400 text-lg md:text-xl font-medium tracking-wide">
                    Junte-se à jornada. Apoie o legado. Red Devils para sempre.
                </p>

                <div className="flex justify-center gap-8 pt-10">
                    {[Instagram, Twitter, Facebook, Globe].map((Icon, i) => (
                        <a key={i} href="#" className="social-icon group relative p-4 bg-white/5 rounded-full border border-white/5 hover:bg-belgium-gold transition-all duration-500 hover:scale-110 shadow-lg">
                            <Icon className="w-6 h-6 text-white group-hover:text-black transition-colors" />
                            <div className="absolute inset-0 bg-white/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                    ))}
                </div>
            </div>

            {/* Footer Meta */}
            <div className="z-10 w-full pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-bold tracking-widest uppercase gap-6">
                <div className="flex gap-12">
                    <a href="#" className="hover:text-belgium-gold transition-colors">Política de Privacidade</a>
                    <a href="#" className="hover:text-belgium-gold transition-colors">Cookies</a>
                </div>
                <p>© 2026 REAL ASSOCIAÇÃO BELGA DE FUTEBOL</p>
                <div className="flex gap-4">
                    <div className="w-8 h-1 bg-belgium-red" />
                    <div className="w-8 h-1 bg-belgium-gold" />
                    <div className="w-8 h-1 bg-black" />
                </div>
            </div>


            {/* Floating Gradient for premium feel */}
            <div className="absolute -bottom-[20%] right-[10%] w-[600px] h-[600px] bg-belgium-red/20 blur-[150px] -z-1" />
        </footer>
    );
}
