"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useEffect } from "react";
import { SoccerBall } from "./Ball";
import { Lights } from "./Lights";
import { EnergyParticles } from "./Particles";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Loader } from "../ui/Loader";

gsap.registerPlugin(ScrollTrigger);

function SceneContent() {
    const groupRef = useRef<THREE.Group>(null!);

    useFrame((state) => {
        // MOVIMENTAÇÃO CINEMATOGRÁFICA (Baseada no tempo + Scroll)
        const t = state.clock.getElapsedTime();
        const scroll = window.scrollY / (document.body.scrollHeight - window.innerHeight);

        // Câmera orbita levemente e respira, mas reage ao scroll no eixo Z
        state.camera.position.x = Math.sin(t * 0.3) * (5 + scroll * 10);
        state.camera.position.y = Math.cos(t * 0.5) * 2;
        state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 22 - scroll * 15, 0.01);

        state.camera.lookAt(0, 0, 0);
    });

    return (
        <group ref={groupRef}>
            <Lights />
            <SoccerBall />
            <EnergyParticles count={1500} />
            <Environment preset="night" />
        </group>
    );
}

interface GlobalSceneProps {
    isReplaying?: boolean;
    onReplayFinished?: () => void;
}

export default function GlobalScene({ isReplaying, onReplayFinished }: GlobalSceneProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Global fade-in
        gsap.to(containerRef.current, {
            opacity: 1,
            duration: 2,
            ease: "power2.inOut",
        });

        // Transição do fundo: Some no meio e volta no final
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: true
            }
        });

        tl.to(".bg-image-layer", { opacity: 0.05 })
            .to(".bg-image-layer", { opacity: 0.05 }) // Mantém escuro no meio
            .to(".bg-image-layer", { opacity: 0.6 }); // Volta no final (Footer)

        // Parallax do fundo (enquanto visível)
        gsap.to(".bg-parallax", {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: true
            }
        });
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 w-full h-screen bg-black opacity-0 z-0 pointer-events-none overflow-hidden">
            {/* Loading Overlay */}
            <Loader isReplaying={isReplaying} onReplayFinished={onReplayFinished} />

            {/* STADIUM BACKGROUND IMAGE LAYER */}
            <div className="bg-image-layer absolute inset-0 z-0 pointer-events-none transition-opacity duration-500">
                <div
                    className="bg-parallax absolute inset-0 bg-cover bg-center opacity-70"

                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
            </div>

            {/* 3D CONTENT LAYER - Superposto ao fundo mas atrás do texto */}
            <div className="absolute inset-0 z-20">

                <Canvas
                    shadows
                    dpr={[1, 2]}
                    camera={{ position: [0, 0, 18], fov: 35 }}
                    gl={{ alpha: true, antialias: true }}
                >
                    <Suspense fallback={null}>
                        <SceneContent />
                    </Suspense>
                </Canvas>
            </div>
        </div>
    );
}
