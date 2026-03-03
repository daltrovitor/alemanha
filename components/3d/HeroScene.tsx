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
        // Dramatic Cinematic Camera Movement
        const t = state.clock.getElapsedTime();
        const scroll = window.scrollY / (document.body.scrollHeight - window.innerHeight);

        // Huge sweeping movements using Sine and scroll
        state.camera.position.x = Math.sin(t * 0.2) * 8 + (scroll * 15);
        state.camera.position.y = Math.cos(t * 0.3) * 4 - (scroll * 10);
        // Brings camera extremely close during scroll for immersive depth
        state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 28 - (scroll * 20), 0.02);

        // Always smoothly look slightly off-center to give dynamic framing
        state.camera.lookAt(new THREE.Vector3(scroll * 5, -scroll * 5, 0));
    });

    return (
        <group ref={groupRef}>
            <Lights />
            <SoccerBall />
            <EnergyParticles count={3000} /> {/* Increased particles for cinematic density */}
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
        gsap.to(containerRef.current, {
            opacity: 1,
            duration: 3,
            ease: "power2.inOut",
        });

        // Background darkens entirely on scroll to focus on 3D and floating UI
        gsap.to(".bg-image-layer", {
            opacity: 0.0,
            ease: "none",
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "50% center",
                scrub: true
            }
        });
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 w-full h-screen bg-fr-dark opacity-0 z-0 pointer-events-none overflow-hidden">
            <Loader isReplaying={isReplaying} onReplayFinished={onReplayFinished} />

            {/* Cinematic Vignette */}
            <div className="cinematic-vignette" />

            {/* Subtle background context */}
            <div className="bg-image-layer absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000">
                <div className="absolute inset-0 bg-fr-blue opacity-20 mix-blend-color" />
                <div className="absolute inset-0 bg-gradient-to-b from-fr-dark/50 via-transparent to-fr-dark" />
            </div>

            <div className="absolute inset-0 z-20">
                <Canvas
                    shadows
                    dpr={[1, 2.5]} // Higher resolution for cinematic feel
                    camera={{ position: [0, 0, 30], fov: 40 }} // Tighter FOV for cinematic lens compression
                    gl={{ alpha: true, antialias: true, toneMappingExposure: 1.2 }}
                >
                    <Suspense fallback={null}>
                        <SceneContent />
                    </Suspense>
                </Canvas>
            </div>
        </div>
    );
}
