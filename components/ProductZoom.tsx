"use client";

import { useState, useRef } from 'react';
import Image from 'next/image';

export default function ProductZoom({ src, alt }: { src: string; alt: string }) {
    const [isZoomed, setIsZoomed] = useState(false);
    const [position, setPosition] = useState({ x: 50, y: 50 });
    const imageRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!imageRef.current) return;
        const { left, top, width, height } = imageRef.current.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setPosition({ x, y });
    };

    return (
        <div
            ref={imageRef}
            className="relative w-full aspect-square md:aspect-4/5 rounded-3xl overflow-hidden cursor-crosshair bg-bg-sec border border-stroke"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
        >
            <Image
                src={src}
                alt={alt}
                fill
                className={`object-cover transition-opacity duration-300 ${isZoomed ? 'opacity-0' : 'opacity-100'}`}
                priority
            />
            {isZoomed && (
                <div
                    className="absolute inset-0 z-10 w-full h-full"
                    style={{
                        backgroundImage: `url(${src})`,
                        backgroundPosition: `${position.x}% ${position.y}%`,
                        backgroundSize: '200%',
                        backgroundRepeat: 'no-repeat',
                    }}
                />
            )}
        </div>
    );
}