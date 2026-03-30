import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import SneakerModel from './SneakerModel';
import Loader from './Loader';

const isMobileScreen = () => typeof window !== 'undefined' && window.innerWidth < 768;

export default function Scene() {
    const mobileFov = isMobileScreen();
    return (
        <div className="w-full h-full relative">
            <Canvas camera={{ position: [0, 0.2, mobileFov ? 4.5 : 3.2], fov: mobileFov ? 55 : 42 }} gl={{ alpha: true, antialias: true }}>
                {/* Bright studio-style lighting for light mode */}
                <ambientLight intensity={1.4} color="#ffffff" />
                <spotLight
                    position={[6, 8, 6]}
                    angle={0.25}
                    penumbra={0.6}
                    intensity={4}
                    castShadow
                    color="#ffffff"
                />
                <spotLight
                    position={[-5, 3, -3]}
                    angle={0.3}
                    penumbra={1}
                    intensity={2}
                    color="#bae6fd"
                />
                <pointLight position={[0, -4, 0]} intensity={0.6} color="#e0f2fe" />
                <pointLight position={[3, 0, -2]} intensity={1.0} color="#f0f9ff" />

                <Suspense fallback={<Loader />}>
                    <SneakerModel position={[0, 0, 0]} />
                    <Environment preset="studio" />
                    <ContactShadows
                        position={[0, -1.4, 0]}
                        opacity={0.18}
                        scale={8}
                        blur={2.5}
                        color="#94a3b8"
                    />
                </Suspense>

                <OrbitControls
                    enablePan={false}
                    enableZoom={false}
                    minPolarAngle={Math.PI / 2.8}
                    maxPolarAngle={Math.PI / 1.8}
                    enableDamping={true}
                    dampingFactor={0.04}
                    rotateSpeed={0.4}
                    autoRotate={true}
                    autoRotateSpeed={3}
                />
            </Canvas>
        </div>
    );
}
