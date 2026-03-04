"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGLTF, Float, ContactShadows } from "@react-three/drei";
import gsap from "gsap";

export function SoccerBall() {
    const groupRef = useRef<THREE.Group>(null!);
    const { scene } = useGLTF("/bola_franca.glb");

    useEffect(() => {
        // Start massive and far away — dramatic entry
        groupRef.current.scale.set(100, 100, 100);
        groupRef.current.position.set(30, -20, 50);

        const tl = gsap.timeline({ delay: 6.0 });

        // Cinematic crash into position
        tl.to(groupRef.current.position, {
            x: 5,
            y: 0,
            z: -10,
            duration: 4,
            ease: "power4.out",
        });

        tl.to(groupRef.current.scale, {
            x: 35,
            y: 35,
            z: 35,
            duration: 4,
            ease: "power3.out",
        }, 0);

        tl.from(groupRef.current.rotation, {
            x: Math.PI * 4,
            y: -Math.PI * 4,
            duration: 6,
            ease: "expo.out",
        }, 0);
    }, []);

    useFrame(() => {
        const scroll = typeof window !== 'undefined' ? window.scrollY / (document.body.scrollHeight - window.innerHeight) : 0;

        if (groupRef.current) {
            groupRef.current.rotation.y += 0.005;
            groupRef.current.rotation.x += 0.002;

            groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, scroll * 15, 0.05);
            groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, scroll * Math.PI, 0.05);
        }
    });

    return (
        <group ref={groupRef}>
            <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
                <primitive
                    object={scene}
                    scale={1}
                    rotation={[0, 0, 0]}
                />
            </Float>

            {/* Deep shadow */}
            <ContactShadows
                position={[0, -5, 0]}
                opacity={0.9}
                scale={40}
                blur={4}
                far={15}
                color="#050505"
            />
        </group>
    );
}

useGLTF.preload("/bola_franca.glb");
