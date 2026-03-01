"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGLTF, Float, ContactShadows } from "@react-three/drei";
import gsap from "gsap";

export function SoccerBall() {
    const groupRef = useRef<THREE.Group>(null!);
    const { scene } = useGLTF("/bola_belgica.glb");

    useEffect(() => {
        // ENTRADA REVERSA DINÂMICA: Começa no TRANSBORDO (lado da logo) e depois centraliza
        groupRef.current.scale.set(50, 50, 50);
        groupRef.current.position.set(12, 12, 20); // Topo direita (perto da Logo), na frente do texto

        const tl = gsap.timeline({ delay: 8.2 }); // Espera o Loader de 8s

        tl.to(groupRef.current.scale, {
            x: 25.5,
            y: 25.5,
            z: 25.5,
            duration: 5,
            ease: "expo.inOut",
        });

        tl.to(groupRef.current.position, {
            x: 0,
            y: 0,
            z: -15,
            duration: 5.5,
            ease: "expo.inOut",
        }, 0);

        // Rotação inicial épica
        tl.from(groupRef.current.rotation, {
            y: Math.PI * 6,
            duration: 7,
            ease: "power3.out",
        }, 0);
    }, []);






    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        const scroll = typeof window !== 'undefined' ? window.scrollY / (document.body.scrollHeight - window.innerHeight) : 0;

        if (groupRef.current) {
            // ROTAÇÃO CINEMATOGRÁFICA AUTÔNOMA
            groupRef.current.rotation.y += 0.012 + scroll * 0.04;
            groupRef.current.rotation.x = Math.sin(t * 0.4) * 0.15;
            groupRef.current.rotation.z = Math.cos(t * 0.2) * 0.1;

            // Transição de escala: Mantém a bola 3x maior (base 25.5)
            const targetScale = 25.5 - (Math.sin(scroll * Math.PI) * 5);
            const s = THREE.MathUtils.lerp(groupRef.current.scale.x, Math.max(targetScale, 15.0), 0.05);
            groupRef.current.scale.set(s, s, s);

            // Posicionamento: Mantém mais centralizado com escala maior
            groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, Math.sin(scroll * Math.PI) * 2, 0.05);
            groupRef.current.position.y = Math.sin(t * 0.6) * 0.5 - (scroll * 2);
            groupRef.current.position.z = -15 + Math.cos(t * 0.4) * 0.3 + (scroll * 5); // Base -15
        }
    });



    return (
        <group ref={groupRef}>
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                <primitive
                    object={scene}
                    scale={1} // Base scale is handled by parent group
                    rotation={[0, 0, 0]}
                />
            </Float>

            <ContactShadows
                position={[0, -2.5, 0]}
                opacity={0.4}
                scale={15}
                blur={3}
                far={10}
            />
        </group>
    );
}

useGLTF.preload("/bola_belgica.glb");


