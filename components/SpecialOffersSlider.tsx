"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBasket } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Product } from './ProductCard';
import { useCartStore } from '@/store/useCartStore';
import Swal from 'sweetalert2';

export default function SpecialOffersSlider({ products }: { products: Product[] }) {
    const addToCart = useCartStore((state) => state.addToCart);

    const handleAddToCart = (e: React.MouseEvent, product: Product) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        Swal.fire({
            title: 'اضافه شد!',
            text: `«${product.title}» به سبد خرید شما اضافه شد.`,
            icon: 'success',
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            customClass: {
                popup: 'font-sans rounded-xl border border-stroke',
                title: 'text-sm font-bold text-text-main',
            }
        });
    };

    return (
        <Swiper
            dir="rtl"
            modules={[Navigation, Autoplay]}
            spaceBetween={16}
            slidesPerView="auto"
            navigation
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            className="w-full pb-8 pt-4 px-2"
        >
            {products.map((product) => {
                const fakeExchangeRate = 200000;
                const tomanPrice = product.price * fakeExchangeRate;
                const oldTomanPrice = Math.round(tomanPrice / (1 - product.discountPercentage / 100));

                return (
                    <SwiperSlide key={product.id} className="w-60! md:w-70!">
                        <div className="w-full bg-white border border-stroke rounded-3xl p-4 flex flex-col relative group hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/40 transition-all duration-500 hover:-translate-y-1.5 h-full">
                            <span className="absolute top-3 right-3 bg-linear-to-r from-red-500 to-rose-500 text-white text-xs font-black px-3 py-1.5 rounded-full z-10 shadow-lg shadow-red-500/30">
                                {Math.round(product.discountPercentage)}٪
                            </span>
                            <Link href={`/product/${product.id}`} className="relative w-full aspect-square rounded-2xl overflow-hidden mb-5 bg-bg-sec/50 flex items-center justify-center p-4 border border-stroke/50 group-hover:bg-bg-sec transition-colors duration-300">
                                <Image
                                    src={product.thumbnail}
                                    alt={product.title}
                                    fill
                                    className="object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                                    sizes="(max-width: 768px) 100vw, 280px"
                                />
                            </Link>
                            <div className="flex flex-col grow">
                                <Link href={`/product/${product.id}`}>
                                    <h3 className="font-bold text-text-main text-sm md:text-base leading-relaxed line-clamp-2 group-hover:text-primary transition-colors duration-300">
                                        {product.title}
                                    </h3>
                                </Link>
                                <span className="text-xs text-text-sec mt-1.5 block capitalize font-medium">
                                    {product.category.replace('-', ' ')}
                                </span>
                                <div className="mt-auto pt-5 flex items-end justify-between border-t border-stroke/50">
                                    <button
                                        onClick={(e) => handleAddToCart(e, product)}
                                        className="w-11 h-11 bg-bg-sec text-text-sec flex items-center justify-center rounded-xl hover:bg-primary hover:text-white transition-all duration-300 active:scale-95 shadow-sm hover:shadow-md z-10 relative group/btn border border-stroke hover:border-primary"
                                        aria-label="افزودن به سبد خرید"
                                    >
                                        <ShoppingBasket className="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-300" />
                                    </button>
                                    <div className="flex flex-col items-end gap-0.5">
                                        <span className="text-xs text-text-sec line-through decoration-red-500/50 font-medium">
                                            {oldTomanPrice.toLocaleString('fa-IR')}
                                        </span>
                                        <div className="flex items-center gap-1">
                                            <span className="font-black text-text-main text-lg tracking-tight">
                                                {tomanPrice.toLocaleString('fa-IR')}
                                            </span>
                                            <span className="text-[10px] text-text-sec font-bold">تومان</span>
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