"use client";

export function Lights() {
    return (
        <>
            {/* Dark industrial ambient */}
            <ambientLight intensity={0.1} color="#1A1A1A" />

            {/* High contrast key light — stadium floodlight feel */}
            <spotLight
                position={[15, 30, 20]}
                angle={0.15}
                penumbra={0.8}
                intensity={10}
                castShadow
                color="#FFFFFF"
                shadow-bias={-0.0001}
            />

            {/* Red dramatic rim light */}
            <spotLight
                position={[25, 5, -15]}
                angle={0.4}
                penumbra={1}
                intensity={30}
                color="#DD0000"
            />

            {/* Golden warm fill from below */}
            <pointLight position={[0, -12, 5]} intensity={4} color="#FFCC00" />

            {/* Cold steel blue backlight */}
            <directionalLight position={[-20, 10, 10]} intensity={1.2} color="#4488AA" />

            {/* Subtle top golden highlight */}
            <pointLight position={[0, 20, -10]} intensity={2} color="#FFCC00" />
        </>
    );
}
