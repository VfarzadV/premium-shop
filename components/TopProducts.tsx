"use client";

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Star, Loader2 } from 'lucide-react';
import ProductCard, { Product } from './ProductCard';

import 'swiper/css';
import 'swiper/css/navigation';

export default function TopProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTopProducts = async () => {
            try {
                const res = await fetch('https://dummyjson.com/products?sortBy=rating&order=desc&limit=10');
                const data = await res.json();
                setProducts(data.products || []);
            } catch (error) {
                console.error("خطا در دریافت برترین محصولات:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTopProducts();
    }, []);
    if (isLoading) {
        return (
            <section className="w-full mt-12 md:mt-16 flex flex-col items-center justify-center min-h-[30vh]">
                <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
                <span className="text-text-sec font-bold text-sm">در حال بارگذاری برترین محصولات...</span>
            </section>
        );
    }

    if (products.length === 0) return null;

    return (
        <section className="w-full mt-12 md:mt-16">
            <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-2 text-text-main">
                    <Star className="w-6 h-6 text-yellow-500 fill-current" />
                    <h2 className="text-lg md:text-xl font-black whitespace-nowrap">برترین محصولات فروشگاه</h2>
                </div>
                <div className="h-px w-full bg-stroke rounded-full"></div>
            </div>
            <Swiper
                dir="rtl"
                modules={[Navigation, Autoplay]}
                spaceBetween={16}
                slidesPerView="auto"
                navigation
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                className="w-full pb-4 pt-2 px-2"
                breakpoints={{
                    320: { slidesPerView: 1.5, spaceBetween: 16 },
                    640: { slidesPerView: 2.5, spaceBetween: 20 },
                    768: { slidesPerView: 3.5, spaceBetween: 20 },
                    1024: { slidesPerView: 4.5, spaceBetween: 24 },
                    1280: { slidesPerView: 5.5, spaceBetween: 24 },
                }}
            >
                {products.map((product) => (
                    <SwiperSlide key={product.id} className="h-auto">
                        <ProductCard product={product} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}