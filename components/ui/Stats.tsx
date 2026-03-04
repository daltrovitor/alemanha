"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Data = [
    { val: "4", label: "Copas do Mundo" },
    { val: "3", label: "Eurocopas" },
    { val: "8", label: "Finais de Copa" },
    { val: "135", label: "Gols em Mundiais" },
];

export default function Statistics() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const nums = gsap.utils.toArray(".stat-num");
            nums.forEach((num: any) => {
                gsap.fromTo(
                    num,
                    { textContent: "0" },
                    {
                        textContent: num.getAttribute("data-target"),
                        duration: 2,
                        ease: "circ.out",
                        snap: { textContent: 1 },
                        scrollTrigger: {
                            trigger: num,
                            start: "top 80%",
                        },
                    }
                );
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="w-full bg-de-red py-32 pointer-events-auto border-y-[12px] border-de-white relative overflow-hidden z-20">

            {/* Background oversized text */}
            <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black text-de-black opacity-10 uppercase whitespace-nowrap select-none pointer-events-none tracking-tighter mix-blend-multiply">
                STATISTIK
            </h2>

            <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8">
                {Data.map((stat, i) => (
                    <div key={i} className="flex flex-col items-center justify-center p-8 border-[6px] border-de-black bg-de-white shadow-[10px_10px_0px_0px_#050505] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all duration-300">
                        <span
                            className="stat-num text-8xl md:text-9xl font-black text-de-black tracking-tighter"
                            data-target={stat.val}
                        >
                            0
                        </span>
                        <span className="text-de-black font-bold uppercase tracking-widest text-center mt-4 border-t-4 border-de-red w-full pt-4">
                            {stat.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
