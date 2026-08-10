"use client";

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Sparkles } from 'lucide-react';
import ProductCard, { Product } from './ProductCard';
import { useRecentStore } from '@/store/useRecentStore';

import 'swiper/css';
import 'swiper/css/navigation';

export default function SmartRecommendations() {
    const [recommendations, setRecommendations] = useState<Product[]>([]);
    const recentItems = useRecentStore((state) => state.recentItems);

    useEffect(() => {
        const fetchRecommendations = async () => {
            if (!recentItems || recentItems.length === 0) return;

            try {
                const categoryCounts: Record<string, number> = {};
                recentItems.forEach(item => {
                    categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1;
                });
                const favoriteCategory = Object.keys(categoryCounts).reduce((a, b) =>
                    categoryCounts[a] > categoryCounts[b] ? a : b
                );
                const res = await fetch(`https://dummyjson.com/products/category/${favoriteCategory}?limit=12`);
                const data = await res.json();
                const recentIds = recentItems.map(item => item.id);
                const newSuggestions = data.products.filter((p: Product) => !recentIds.includes(p.id));
                setRecommendations(newSuggestions);
            } catch (error) {
                console.error("خطا در پردازش موتور پیشنهاددهنده:", error);
            }
        };
        fetchRecommendations();
    }, [recentItems]);
    if (recommendations.length === 0) return null;
    return (
        <section className="w-full mt-12 mb-20">
            <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-2 text-text-main">
                    <Sparkles className="w-6 h-6 text-primary" />
                    <h2 className="text-lg md:text-xl font-black whitespace-nowrap">پیشنهاد ویژه بر اساس سلیقه شما</h2>
                </div>
                <div className="h-px w-full bg-stroke rounded-full"></div>
            </div>
            <Swiper
                dir="rtl"
                modules={[Navigation, Autoplay]}
                spaceBetween={16}
                slidesPerView="auto"
                navigation
                autoplay={{ delay: 4500, disableOnInteraction: false }}
                className="w-full pb-4 pt-2 px-2"
                breakpoints={{
                    320: { slidesPerView: 1.5, spaceBetween: 16 },
                    640: { slidesPerView: 2.5, spaceBetween: 20 },
                    768: { slidesPerView: 3.5, spaceBetween: 20 },
                    1024: { slidesPerView: 4.5, spaceBetween: 24 },
                    1280: { slidesPerView: 5.5, spaceBetween: 24 },
                }}
            >
                {recommendations.map((product) => (
                    <SwiperSlide key={product.id} className="h-auto">
                        <ProductCard product={product} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}