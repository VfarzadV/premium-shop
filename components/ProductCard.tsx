"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBasket, Star } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import Swal from 'sweetalert2';

export interface Product {
    id: number;
    title: string;
    price: number;
    discountPercentage: number;
    rating: number;
    category: string;
    thumbnail: string;
}

export default function ProductCard({ product }: { product: Product }) {
    const addToCart = useCartStore((state) => state.addToCart);
    const handleAddToCart = (e: React.MouseEvent) => {
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
                popup: 'font-sans rounded-xl',
                title: 'text-sm font-bold',
            }
        });
    };

    const fakeExchangeRate = 50000;
    const tomanPrice = product.price * fakeExchangeRate;
    const oldTomanPrice = Math.round(tomanPrice / (1 - product.discountPercentage / 100));
    const categoryNames: Record<string, string> = {
        'smartphones': 'گوشی هوشمند',
        'laptops': 'لپ‌تاپ',
        'tablets': 'تبلت',
        'mobile-accessories': 'لوازم جانبی',
        'mens-shirts': 'پیراهن مردانه',
        'womens-dresses': 'لباس زنانه',
        'mens-shoes': 'کفش مردانه',
        'womens-shoes': 'کفش زنانه',
        'womens-bags': 'کیف زنانه',
        'furniture': 'مبلمان',
        'home-decoration': 'دکوراسیون خانه',
        'kitchen-accessories': 'لوازم آشپزخانه',
        'beauty': 'زیبایی',
        'fragrances': 'عطر و ادکلن',
        'skin-care': 'مراقبت پوست',
        'sports-accessories': 'لوازم ورزشی',
        'groceries': 'خواربار'
    };

    return (
        <div className="bg-white border border-stroke rounded-3xl p-4 flex flex-col group hover:shadow-xl hover:shadow-secondary/20 hover:border-primary/50 transition-all duration-300">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4 bg-bg-sec flex items-center justify-center">
                <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-black px-3 py-1.5 rounded-full z-10 shadow-sm">
                    {Math.round(product.discountPercentage)}٪
                </span>
                <Link href={`/product/${product.id}`} className="relative w-4/5 h-4/5 block">
                    <Image
                        src={product.thumbnail}
                        alt={product.title}
                        fill
                        className="object-contain group-hover:scale-110 transition-transform duration-500"
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