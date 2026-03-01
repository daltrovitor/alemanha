"use client";

export function Lights() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#FFD700" />
            <spotLight
                position={[20, 20, 5]}
                angle={0.2}
                penumbra={1}
                intensity={2}
                castShadow
                color="#D00000"
            />
            <directionalLight position={[-10, 5, 5]} intensity={0.8} color="#ffffff" />
        </>
    );
}
