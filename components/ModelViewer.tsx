"use client";

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float, useGLTF, Center, Html, useProgress } from '@react-three/drei';

function Model({ path, scale, position, rotation }: { path: string, scale: number, position: [number, number, number], rotation: [number, number, number] }) {
    const { scene } = useGLTF(path);
    return <primitive object={scene} scale={scale} position={position} rotation={rotation} />;
}
function CanvasLoader() {
    const { progress } = useProgress();
    return (
        <Html center>
            <div className="flex flex-col items-center gap-2 w-32">
                <div className="w-8 h-8 border-4 border-stroke border-t-primary rounded-full animate-spin"></div>
                <span className="text-primary font-black text-sm dir-ltr">{Math.max(0, Math.round(progress))} %</span>
            </div>
        </Html>
    );
}

export default function ModelViewer({ path, scale = 1, position = [0, 0, 0], rotation = [0, 0, 0] }: { path: string, scale?: number, position?: [number, number, number], rotation?: [number, number, number] }) {
    return (
        <div className="w-full h-full cursor-grab active:cursor-grabbing">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <Suspense fallback={<CanvasLoader />}>
                    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                        <Center position={position}>
                            <Model path={path} scale={scale} rotation={rotation} position={[0, 0, 0]} />
                        </Center>
                    </Float>
                    <Environment preset="city" />
                </Suspense>
                <OrbitControls
                    enableZoom={false}
                    autoRotate
                    autoRotateSpeed={1.5}
                    target={position}
                />
            </Canvas>
        </div>
    );
}
useGLTF.preload('/models/ps5.glb');
useGLTF.preload('/models/shoes.glb');
useGLTF.preload('/models/phone.glb');