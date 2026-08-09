"use client";

import { useState, useRef } from 'react';
import Image from 'next/image';

interface ImageZoomProps {
    src: string;
    alt: string;
}

export default function ImageZoom({ src, alt }: ImageZoomProps) {
    const [showZoom, setShowZoom] = useState(false);
    const [backgroundPosition, setBackgroundPosition] = useState('0% 0%');
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const imageContainerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!imageContainerRef.current) return;
        const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setBackgroundPosition(`${x}% ${y}%`);
        const lensX = e.clientX - left;
        const lensY = e.clientY - top;
        setCursorPosition({ x: lensX, y: lensY });
    };

    return (
        <div className="relative flex items-start">
            <div
                ref={imageContainerRef}
                className="relative w-full h-100 md:h-125 rounded-3xl overflow-hidden border border-stroke bg-bg-sec cursor-crosshair shadow-lg"
                onMouseEnter={() => setShowZoom(true)}
                onMouseLeave={() => setShowZoom(false)}
                onMouseMove={handleMouseMove}
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover select-none"
                    priority
                />
                {showZoom && (
                    <div
                        className="absolute w-32 h-32 border-2 border-primary bg-primary/10 pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-xl shadow-md transition-all duration-75"
                        style={{
                            left: `${cursorPosition.x}px`,
                            top: `${cursorPosition.y}px`,
                        }}
                    />
                )}
            </div>
            {showZoom && (
                <div className="hidden lg:block absolute -right-117.5 top-0 w-112.5 h-125 rounded-3xl border border-stroke bg-bg-sec overflow-hidden shadow-2xl z-50">
                    <div
                        className="w-full h-full bg-no-repeat"
                        style={{
                            backgroundImage: `url(${src})`,
                            backgroundSize: '250%',
                            backgroundPosition: backgroundPosition,
                        }}
                    />
                </div>
            )}
        </div>
    );
}