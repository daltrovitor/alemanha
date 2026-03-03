"use client";

export function Lights() {
    return (
        <>
            {/* Very dark cinematic ambient */}
            <ambientLight intensity={0.15} color="#0A1930" />

            {/* High contrast key light acting as stadium spotlight */}
            <spotLight
                position={[15, 30, 20]}
                angle={0.15}
                penumbra={0.8}
                intensity={8}
                castShadow
                color="#FFFFFF"
                shadow-bias={-0.0001}
            />

            {/* Red rim light for dramatic edge */}
            <spotLight
                position={[25, 5, -15]}
                angle={0.4}
                penumbra={1}
                intensity={25}
                color="#ED2939"
            />

            {/* Blue fill light for shadow colors */}
            <directionalLight position={[-20, 10, 10]} intensity={1.5} color="#4A90D9" />

            {/* Golden bottom glow reflecting legacy */}
            <pointLight position={[0, -10, 5]} intensity={3} color="#D4AF37" />
        </>
    );
}
