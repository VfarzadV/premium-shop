"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    ShoppingBag, Trash2, Plus, Minus, ArrowRight, Receipt, ArrowLeft
} from 'lucide-react';
import { useCartStore, CartItem } from '@/store/useCartStore';

export default function CartPage() {
    const [isMounted, setIsMounted] = useState(false);
    const {
        items,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        getTotalPrice
    } = useCartStore();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsMounted(true);
        }, 0);
        return () => clearTimeout(timer);
    }, []);
    if (!isMounted) {
        return (
            <main className="w-[90%] lg:w-[85%] mx-auto py-8 md:py-12 min-h-[60vh] flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-stroke rounded-full"></div>
                    <div className="w-32 h-4 bg-stroke rounded-full"></div>
                </div>
            </main>
        );
    }
    if (items.length === 0) {
        return (
            <main className="w-[90%] lg:w-[85%] mx-auto py-8 md:py-12 min-h-[70vh] flex flex-col items-center justify-center">
                <div className="bg-white border border-stroke rounded-3xl p-12 text-center flex flex-col items-center gap-6 w-full max-w-2xl shadow-sm">
                    <div className="w-24 h-24 bg-secondary/30 rounded-full flex items-center justify-center">
                        <ShoppingBag className="w-12 h-12 text-primary opacity-50" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-text-main mb-2">سبد خرید شما خالی است!</h2>
                        <p className="text-text-sec">می‌توانید برای مشاهده محصولات به فروشگاه سر بزنید.</p>
                    </div>
                    <Link href="/shop" className="mt-4 bg-primary text-white font-bold px-8 py-3.5 rounded-xl hover:bg-primary/90 hover:shadow-lg transition-all flex items-center gap-2">
                        بازگشت به فروشگاه
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </main>
        );
    }
    const fakeExchangeRate = 200000;

    return (
        <main className="w-[90%] lg:w-[85%] mx-auto py-8 md:py-12 min-h-screen">
            <div className="flex items-center gap-3 mb-8">
                <ShoppingBag className="w-7 h-7 text-primary" />
                <h1 className="text-2xl md:text-3xl font-black text-text-main">سبد خرید</h1>
            </div>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-2/3 flex flex-col gap-4">
                    <div className="flex items-center justify-between bg-white border border-stroke p-4 rounded-2xl shadow-sm">
                        <span className="font-bold text-text-main text-sm">شما {items.length} کالا در سبد خرید دارید</span>
                        <button
                            onClick={clearCart}
                            className="text-sm text-red-500 hover:text-white hover:bg-red-500 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 font-bold"
                        >
                            <Trash2 className="w-4 h-4" />
                            خالی کردن سبد
                        </button>
                    </div>
                    <div className="flex flex-col gap-4">
                        {items.map((item: CartItem) => {
                            const tomanPrice = item.price * fakeExchangeRate;
                            const totalPriceForItem = tomanPrice * item.quantity;
                            return (
                                <div key={item.id} className="bg-white border border-stroke rounded-3xl p-4 md:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 shadow-sm hover:shadow-md transition-shadow">
                                    <Link href={`/product/${item.id}`} className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-bg-sec overflow-hidden shrink-0 border border-stroke">
                                        <Image src={item.thumbnail} alt={item.title} fill className="object-contain p-2 mix-blend-multiply hover:scale-105 transition-transform" />
                                    </Link>
                                    <div className="flex flex-col grow gap-2 w-full">
                                        <Link href={`/product/${item.id}`}>
                                            <h3 className="font-bold text-text-main text-base md:text-lg line-clamp-2 hover:text-primary transition-colors">
                                                {item.title}
                                            </h3>
                                        </Link>
                                        <span className="text-sm text-text-sec capitalize">{item.category.replace('-', ' ')}</span>
                                        <div className="flex flex-col sm:flex-row sm:items-end justify-between mt-4 gap-4">
                                            <div className="flex items-center border border-stroke rounded-xl overflow-hidden bg-bg-sec w-fit">
                                                <button
                                                    onClick={() => increaseQuantity(item.id)}
                                                    className="w-10 h-10 flex items-center justify-center text-text-main hover:bg-primary hover:text-white transition-colors"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                                <span className="w-10 h-10 flex items-center justify-center font-bold text-text-main bg-white">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => decreaseQuantity(item.id)}
                                                    className="w-10 h-10 flex items-center justify-center text-text-main hover:bg-red-500 hover:text-white transition-colors"
                                                >
                                                    {item.quantity === 1 ? <Trash2 className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
                                                </button>
                                            </div>
                                            <div className="flex flex-col items-start sm:items-end">
                                                <span className="text-xs text-text-sec mb-1">قیمت واحد: {tomanPrice.toLocaleString('fa-IR')}</span>
                                                <div className="flex items-center gap-1">
                                                    <span className="font-black text-text-main text-lg">{totalPriceForItem.toLocaleString('fa-IR')}</span>
                                                    <span className="text-xs text-text-sec">تومان</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="w-full lg:w-1/3">
                    <div className="bg-bg-sec/50 border border-stroke rounded-3xl p-6 flex flex-col gap-6 sticky top-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-2 border-b border-stroke pb-4">
                            <Receipt className="w-6 h-6 text-primary" />
                            <h3 className="text-lg font-black text-text-main">خلاصه سفارش</h3>
                        </div>
                        <div className="flex flex-col gap-4 text-sm font-medium">
                            <div className="flex items-center justify-between text-text-sec">
                                <span>تعداد کالاها</span>
                                <span>{items.reduce((total: number, item: CartItem) => total + item.quantity, 0)} عدد</span>
                            </div>
                            <div className="flex items-center justify-between text-text-sec">
                                <span>هزینه ارسال</span>
                                <span>رایگان (ویژه!)</span>
                            </div>
                        </div>
                        <hr className="border-stroke" />
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-text-main">مبلغ قابل پرداخت</span>
                            <div className="flex items-center gap-1">
                                <span className="font-black text-primary text-2xl">{getTotalPrice().toLocaleString('fa-IR')}</span>
                                <span className="text-xs text-text-sec font-bold">تومان</span>
                            </div>
                        </div>
                        <Link href="/checkout" className="w-full bg-primary text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95 mt-2">
                            تکمیل خرید و تسویه‌حساب
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <p className="text-xs text-text-sec text-center leading-relaxed">
                            با ثبت سفارش، قوانین و مقررات فروشگاه را می‌پذیرید.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}