"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBasket, Star, Heart, ArrowRightLeft } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useCompareStore } from '@/store/useCompareStore';
import Swal from 'sweetalert2';
import { EXCHANGE_RATE } from '@/utils/constants';

export interface Product {
    id: number;
    title: string;
    price: number;
    discountPercentage: number;
    rating: number;
    category: string;
    thumbnail: string;
    brand?: string;
}

export default function ProductCard({ product }: { product: Product }) {
    const [isMounted, setIsMounted] = useState(false);

    const addToCart = useCartStore((state) => state.addToCart);
    const { items: wishlistItems, toggleWishlist } = useWishlistStore();
    const { compareItems, addToCompare, removeFromCompare } = useCompareStore();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsMounted(true);
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    const isWished = isMounted ? wishlistItems.some(item => item.id === product.id) : false;
    const isCompared = isMounted ? compareItems.some(item => item.id === product.id) : false;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);

        Swal.fire({
            title: 'به سبد خرید اضافه شد!',
            text: `محصول ${product.title} با موفقیت به سبد خرید شما افزوده شد.`,
            icon: 'success',
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            customClass: {
                popup: 'font-sans rounded-xl bg-bg-main border border-stroke',
                title: 'text-sm font-bold text-text-main',
                htmlContainer: 'text-text-sec'
            }
        });
    };
    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product);
    };
    const handleCompare = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isCompared) {
            removeFromCompare(product.id);
            Swal.fire({
                title: 'حذف شد!',
                text: 'محصول از لیست مقایسه حذف شد.',
                icon: 'info',
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 2000,
                customClass: { popup: 'font-sans rounded-xl bg-bg-main border border-stroke', title: 'text-sm font-bold text-text-main', htmlContainer: 'text-text-sec' }
            });
        } else {
            const result = addToCompare(product);
            if (result.success) {
                Swal.fire({
                    title: 'اضافه شد!',
                    text: result.message,
                    icon: 'success',
                    toast: true,
                    position: 'bottom-end',
                    showConfirmButton: false,
                    timer: 2000,
                    customClass: { popup: 'font-sans rounded-xl bg-bg-main border border-stroke', title: 'text-sm font-bold text-text-main', htmlContainer: 'text-text-sec' }
                });
            } else {
                Swal.fire({
                    title: 'اخطار!',
                    text: result.message,
                    icon: 'error',
                    toast: true,
                    position: 'bottom-end',
                    showConfirmButton: false,
                    timer: 3000,
                    customClass: { popup: 'font-sans rounded-xl bg-bg-main border border-stroke', title: 'text-sm font-bold text-text-main', htmlContainer: 'text-text-sec' }
                });
            }
        }
    };

    const tomanPrice = product.price * EXCHANGE_RATE;
    const oldTomanPrice = Math.round(tomanPrice / (1 - product.discountPercentage / 100));

    const categoryNames: Record<string, string> = {
        'smartphones': 'گوشی موبایل',
        'laptops': 'لپ‌تاپ',
        'tablets': 'تبلت',
        'mobile-accessories': 'لوازم جانبی',
        'mens-shirts': 'پیراهن مردانه',
        'womens-dresses': 'لباس زنانه',
        'mens-shoes': 'کفش مردانه',
        'womens-shoes': 'کفش زنانه',
        'womens-bags': 'کیف زنانه',
        'furniture': 'مبلمان',
        'home-decoration': 'دکوراسیون',
        'kitchen-accessories': 'لوازم آشپزخانه',
        'beauty': 'زیبایی و سلامت',
        'fragrances': 'عطر و ادکلن',
        'skin-care': 'مراقبت پوست',
        'sports-accessories': 'لوازم ورزشی',
        'groceries': 'سوپرمارکت'
    };

    return (
        <div className="bg-bg-sec border border-stroke rounded-3xl p-4 flex flex-col group shadow-sm hover:shadow-xl hover:shadow-secondary/20 hover:border-primary/50 transition-all duration-300">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4 bg-bg-sec dark:bg-zinc-300 flex items-center justify-center p-2">
                <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-black px-3 py-1.5 rounded-full z-10 shadow-sm">
                    {Math.round(product.discountPercentage)}٪
                </span>
                <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                    <button
                        onClick={handleWishlist}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm active:scale-95 ${isWished
                            ? 'bg-red-50 text-red-500 border border-red-200'
                            : 'bg-bg-main text-text-sec border border-stroke hover:text-red-500'
                            }`}
                        title="افزودن به علاقه‌مندی‌ها"
                    >
                        <Heart className={`w-4 h-4 ${isWished ? 'fill-current' : ''}`} />
                    </button>
                    <button
                        onClick={handleCompare}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm active:scale-95 ${isCompared
                            ? 'bg-primary/10 text-primary border border-primary/30'
                            : 'bg-bg-main text-text-sec border border-stroke hover:text-primary'
                            }`}
                        title="مقایسه محصول"
                    >
                        <ArrowRightLeft className="w-4 h-4" />
                    </button>
                </div>
                <Link href={`/product/${product.id}`} className="relative w-4/5 h-4/5 block">
                    <Image
                        src={product.thumbnail}
                        alt={product.title}
                        fill
                        className="object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </Link>
            </div>
            <div className="flex flex-col grow gap-2">
                <div className="flex items-center justify-between text-xs text-text-sec">
                    <span className="capitalize">{categoryNames[product.category] || product.category.replace('-', ' ')}</span>
                    <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="font-bold pt-0.5">{product.rating}</span>
                    </div>
                </div>
                <Link href={`/product/${product.id}`}>
                    <h3 className="font-bold text-text-main text-sm md:text-base line-clamp-2 leading-relaxed group-hover:text-primary transition-colors">
                        {product.title}
                    </h3>
                </Link>
                <div className="mt-auto pt-4 flex items-end justify-between border-t border-stroke/50">
                    <button
                        onClick={handleAddToCart}
                        className="bg-bg-sec text-text-sec p-3 rounded-xl hover:bg-primary hover:text-white transition-colors active:scale-95 z-10 relative"
                    >
                        <ShoppingBasket className="w-5 h-5" />
                    </button>
                    <div className="flex flex-col items-end gap-0.5">
                        <span className="text-xs text-text-sec line-through decoration-red-500/50">
                            {oldTomanPrice.toLocaleString('fa-IR')}
                        </span>
                        <div className="flex items-center gap-1">
                            <span className="font-black text-text-main text-lg tracking-tight">
                                {tomanPrice.toLocaleString('fa-IR')}
                            </span>
                            <span className="text-xs text-text-sec">تومان</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}