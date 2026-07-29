"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBasket } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Product } from './ProductCard';

export default function SpecialOffersSlider({ products }: { products: Product[] }) {
    return (
        <Swiper
            dir="rtl"
            modules={[Navigation, Autoplay]}
            spaceBetween={16}
            slidesPerView="auto"
            navigation
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            className="w-full pb-2 pt-2"
        >
            {products.map((product) => {
                const fakeExchangeRate = 50000;
                const tomanPrice = product.price * fakeExchangeRate;
                const oldTomanPrice = Math.round(tomanPrice / (1 - product.discountPercentage / 100));
                return (
                    <SwiperSlide key={product.id} className="w-55! md:w-60!">
                        <div className="w-full h-full bg-bg-main rounded-xl p-3 flex flex-col relative group shadow-sm hover:shadow-md transition-shadow border border-stroke hover:border-primary/50">
                            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full z-10 shadow-sm">
                                {Math.round(product.discountPercentage)}٪
                            </span>
                            <Link href={`/product/${product.id}`} className="relative w-full aspect-square rounded-lg overflow-hidden mb-3 bg-bg-sec flex items-center justify-center p-2 ">
                                <Image
                                    src={product.thumbnail}
                                    alt={product.title}
                                    fill
                                    className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                                    sizes="(max-width: 768px) 100vw, 240px"
                                />
                            </Link>
                            <div className="flex flex-col grow">
                                <Link href={`/product/${product.id}`}>
                                    <h3 className="font-bold text-text-main text-sm truncate">{product.title}</h3>
                                    <span className="text-xs text-text-sec mt-1 block capitalize">{product.category.replace('-', ' ')}</span>
                                </Link>
                                <div className="mt-auto pt-4 flex items-end justify-between">
                                    <button className="bg-primary/10 text-primary p-2 rounded-lg hover:bg-primary hover:text-white transition-colors">
                                        <ShoppingBasket className="w-5 h-5" />
                                    </button>
                                    <div className="flex flex-col items-end gap-0.5">
                                        <span className="text-xs text-text-sec line-through decoration-red-500/50">{oldTomanPrice.toLocaleString('fa-IR')}</span>
                                        <div className="flex items-center gap-1">
                                            <span className="font-bold text-text-main">{tomanPrice.toLocaleString('fa-IR')}</span>
                                            <span className="text-xs text-text-sec">تومان</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
}