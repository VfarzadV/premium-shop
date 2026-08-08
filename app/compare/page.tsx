"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Scale, Trash2, ShoppingBasket, ArrowRight, Star, X } from 'lucide-react';
import { useCompareStore } from '@/store/useCompareStore';
import { useCartStore } from '@/store/useCartStore';
import Swal from 'sweetalert2';
import { Product } from '@/components/ProductCard';
export default function ComparePage() {
    const [isMounted, setIsMounted] = useState(false);
    const { compareItems, removeFromCompare, clearCompare } = useCompareStore();
    const addToCart = useCartStore(state => state.addToCart);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsMounted(true);
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    if (!isMounted) return null;
    if (compareItems.length === 0) {
        return (
            <main className="w-[90%] lg:w-[85%] mx-auto py-10 md:py-16 min-h-[70vh] flex flex-col items-center justify-center animate-in zoom-in-95 duration-500">
                <div className="bg-bg-sec border border-stroke rounded-3xl p-12 text-center flex flex-col items-center gap-6 w-full max-w-2xl shadow-sm">
                    <div className="w-24 h-24 bg-secondary/30 rounded-full flex items-center justify-center">
                        <Scale className="w-12 h-12 text-primary opacity-50" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-text-main mb-2">لیست مقایسه خالی است!</h2>
                        <p className="text-text-sec font-medium leading-relaxed">شما هنوز هیچ محصولی را برای مقایسه انتخاب نکرده‌اید.</p>
                    </div>
                    <Link href="/shop" className="mt-4 bg-primary text-white font-bold px-8 py-3.5 rounded-xl hover:bg-primary/90 transition-all flex items-center gap-2 active:scale-95 shadow-lg shadow-primary/20">
                        رفتن به فروشگاه
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </main>
        );
    }

    const handleAddToCart = (product: Product) => {
        addToCart(product);
        Swal.fire({
            title: 'به سبد خرید اضافه شد!',
            icon: 'success',
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000,
            customClass: { popup: 'font-sans rounded-xl bg-bg-main border border-stroke', title: 'text-sm font-bold text-text-main' }
        });
    };
    return (
        <main className="w-[90%] lg:w-[85%] mx-auto py-10 md:py-16 min-h-screen">
            <div className="flex items-center justify-between mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shadow-sm">
                        <Scale className="w-6 h-6" />
                    </div>
                    <h1 className="text-2xl md:text-3xl font-black text-text-main">مقایسه محصولات</h1>
                </div>
                <button
                    onClick={clearCompare}
                    className="flex items-center gap-2 text-sm font-bold text-red-500 hover:text-white hover:bg-red-500 border border-red-200 px-4 py-2.5 rounded-xl transition-colors active:scale-95 shadow-sm"
                >
                    <Trash2 className="w-4 h-4" />
                    <span className="hidden sm:inline">حذف همه</span>
                </button>
            </div>
            <div className="bg-bg-sec border border-stroke rounded-3xl shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
                <div className="overflow-x-auto scrollbar-none">
                    <table className="w-full text-right min-w-200 border-collapse">
                        <tbody>
                            <tr>
                                <th className="p-6 border-b border-l border-stroke bg-bg-main/50 w-48 align-top text-text-sec font-black">
                                    مشخصات محصول
                                </th>
                                {compareItems.map(product => (
                                    <td key={product.id} className="p-6 border-b border-l border-stroke last:border-l-0 w-72 bg-white dark:bg-bg-sec relative group">
                                        <button
                                            onClick={() => removeFromCompare(product.id)}
                                            className="absolute top-4 left-4 w-8 h-8 bg-bg-sec border border-stroke text-text-sec rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors z-10 shadow-sm"
                                            title="حذف از مقایسه"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                        <div className="flex flex-col items-center text-center gap-4">
                                            <div className="relative w-32 h-32 bg-bg-sec dark:bg-zinc-300 rounded-2xl p-2 border border-stroke group-hover:border-primary/50 transition-colors">
                                                <Image src={product.thumbnail} alt={product.title} fill className="object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300" />
                                            </div>
                                            <Link href={`/product/${product.id}`} className="font-bold text-text-main hover:text-primary transition-colors line-clamp-2 h-10 leading-relaxed text-sm md:text-base">
                                                {product.title}
                                            </Link>
                                        </div>
                                    </td>
                                ))}
                                {Array.from({ length: 3 - compareItems.length }).map((_, i) => (
                                    <td key={`empty-${i}`} className="p-6 border-b border-l border-stroke last:border-l-0 w-72 bg-bg-main/20">
                                        <div className="flex flex-col items-center justify-center h-full gap-3 opacity-40">
                                            <div className="w-32 h-32 border-2 border-dashed border-stroke rounded-2xl flex items-center justify-center">
                                                <Scale className="w-8 h-8 text-text-sec" />
                                            </div>
                                            <span className="text-sm font-bold text-text-sec">جایگاه مقایسه خالی</span>
                                        </div>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <th className="p-6 border-b border-l border-stroke bg-bg-main/50 text-text-sec font-black">قیمت کالا</th>
                                {compareItems.map(product => (
                                    <td key={`price-${product.id}`} className="p-6 border-b border-l border-stroke last:border-l-0 bg-white dark:bg-bg-sec text-center">
                                        <div className="flex items-center justify-center gap-1">
                                            <span className="font-black text-lg text-primary tracking-tight">
                                                {(product.price * 200000).toLocaleString('fa-IR')}
                                            </span>
                                            <span className="text-xs text-text-sec">تومان</span>
                                        </div>
                                    </td>
                                ))}
                                {Array.from({ length: 3 - compareItems.length }).map((_, i) => <td key={`ep-${i}`} className="p-6 border-b border-l border-stroke last:border-l-0 bg-bg-main/20"></td>)}
                            </tr>
                            <tr>
                                <th className="p-6 border-b border-l border-stroke bg-bg-main/50 text-text-sec font-black">برند</th>
                                {compareItems.map(product => (
                                    <td key={`brand-${product.id}`} className="p-6 border-b border-l border-stroke last:border-l-0 bg-white dark:bg-bg-sec text-center font-bold text-text-main">
                                        {product.brand || 'متفرقه'}
                                    </td>
                                ))}
                                {Array.from({ length: 3 - compareItems.length }).map((_, i) => <td key={`eb-${i}`} className="p-6 border-b border-l border-stroke last:border-l-0 bg-bg-main/20"></td>)}
                            </tr>
                            <tr>
                                <th className="p-6 border-b border-l border-stroke bg-bg-main/50 text-text-sec font-black">دسته‌بندی</th>
                                {compareItems.map(product => (
                                    <td key={`cat-${product.id}`} className="p-6 border-b border-l border-stroke last:border-l-0 bg-white dark:bg-bg-sec text-center font-bold text-text-main capitalize">
                                        {product.category.replace('-', ' ')}
                                    </td>
                                ))}
                                {Array.from({ length: 3 - compareItems.length }).map((_, i) => <td key={`ec-${i}`} className="p-6 border-b border-l border-stroke last:border-l-0 bg-bg-main/20"></td>)}
                            </tr>
                            <tr>
                                <th className="p-6 border-b border-l border-stroke bg-bg-main/50 text-text-sec font-black">امتیاز خریداران</th>
                                {compareItems.map(product => (
                                    <td key={`rate-${product.id}`} className="p-6 border-b border-l border-stroke last:border-l-0 bg-white dark:bg-bg-sec text-center">
                                        <div className="flex items-center justify-center gap-1 text-yellow-500">
                                            <Star className="w-5 h-5 fill-current" />
                                            <span className="font-bold text-text-main mt-1">{product.rating}</span>
                                        </div>
                                    </td>
                                ))}
                                {Array.from({ length: 3 - compareItems.length }).map((_, i) => <td key={`er-${i}`} className="p-6 border-b border-l border-stroke last:border-l-0 bg-bg-main/20"></td>)}
                            </tr>
                            <tr>
                                <th className="p-6 border-l border-stroke bg-bg-main/50 text-text-sec font-black rounded-br-3xl">عملیات خرید</th>
                                {compareItems.map(product => (
                                    <td key={`action-${product.id}`} className="p-6 border-l border-stroke last:border-l-0 bg-white dark:bg-bg-sec text-center">
                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            className="w-full flex items-center justify-center gap-2 bg-primary/10 text-primary font-black py-3.5 rounded-xl hover:bg-primary hover:text-white transition-all active:scale-95 shadow-sm"
                                        >
                                            <ShoppingBasket className="w-5 h-5" />
                                            افزودن به سبد
                                        </button>
                                    </td>
                                ))}
                                {Array.from({ length: 3 - compareItems.length }).map((_, i) => <td key={`ea-${i}`} className="p-6 border-l border-stroke last:border-l-0 bg-bg-main/20"></td>)}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}