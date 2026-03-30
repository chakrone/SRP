import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Float, Center } from '@react-three/drei';

export default function SneakerModel(props) {
    const group = useRef();

    const modelPath = `${import.meta.env.BASE_URL}sneaker.glb`;
    const { scene } = useGLTF(modelPath, 'https://www.gstatic.com/draco/versioned/decoders/1.5.6/');

    const { viewport } = useThree();
    const isMobile = viewport.width < 7;
    const scale = isMobile ? 0.42 : 1.45;

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (group.current) {
            group.current.scale.setScalar(scale + Math.sin(t * 0.8) * 0.01);
        }
    });

    return (
        <Float
            speed={1.0}
            rotationIntensity={0.2}
            floatIntensity={0.5}
            floatingRange={[-0.06, 0.06]}
        >
            <group ref={group} {...props} dispose={null}>
                <Center>
                    <primitive object={scene} scale={2} />
                </Center>
            </group>
        </Float>
    );
}

useGLTF.preload(`${import.meta.env.BASE_URL}sneaker.glb`, 'https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
