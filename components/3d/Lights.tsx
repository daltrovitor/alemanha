"use client";

export function Lights() {
    return (
        <>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#A8D8EA" />
            <spotLight
                position={[20, 20, 5]}
                angle={0.2}
                penumbra={1}
                intensity={2}
                castShadow
                color="#C8102E"
            />
            <directionalLight position={[-10, 5, 5]} intensity={0.6} color="#E8F4F8" />
            <pointLight position={[-15, -10, -10]} intensity={0.5} color="#A8D8EA" />
        </>
    );
}
