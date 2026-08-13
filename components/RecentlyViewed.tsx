"use client";

import { useState, useEffect } from 'react';
import { useRecentStore } from '@/store/useRecentStore';
import ProductCard from './ProductCard';
import { Clock } from 'lucide-react';

export default function RecentlyViewed() {
    const [isMounted, setIsMounted] = useState(false);
    const recentItems = useRecentStore((state) => state.recentItems);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsMounted(true);
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    if (!isMounted || recentItems.length === 0) return null;
    const displayItems = recentItems.slice(0, 5);

    return (
        <section className="w-full mt-12 mb-20">
            <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2 text-text-main">
                    <Clock className="w-6 h-6 text-text-sec" />
                    <h2 className="text-lg md:text-xl font-bold whitespace-nowrap">بازدیدهای اخیر شما</h2>
                </div>
                <div className="h-px w-full bg-stroke rounded-full"></div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
                {displayItems.map((product, index) => (
                    <div
                        key={product.id}
                        className={`w-full 
                            ${index === 4 ? 'hidden xl:block' : ''} 
                            ${index === 3 ? 'hidden lg:block' : ''} 
                            ${index === 2 ? 'hidden sm:block' : ''}
                        `}
                    >
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </section>
    );
}