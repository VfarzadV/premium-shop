"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBasket, Search, Menu, X, User, LogIn, Gem } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useUserStore } from '@/store/useUserStore';

export default function Navbar() {
    const [query, setQuery] = useState('');
    const [isMounted, setIsMounted] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();
    const { items } = useCartStore();
    const { phone, firstName, displayName } = useUserStore();
    const nameToShow = displayName || firstName || '';

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsMounted(true);
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMenuOpen]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setIsMenuOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <header className="w-full bg-white border-b border-stroke sticky top-0 z-40 shadow-sm">
            <div className="w-[90%] lg:w-[85%] mx-auto h-20 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className="md:hidden p-2 text-text-main hover:bg-bg-sec rounded-xl transition-colors"
                    >
                        <Menu className="w-7 h-7" />
                    </button>
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary group-hover:text-white text-primary transition-all duration-300">
                            <Gem className="w-6 h-6" />
                        </div>
                        <span className="font-black text-2xl tracking-tighter bg-linear-to-l from-primary to-yellow-600 bg-clip-text text-transparent">
                            پریمیوم‌شاپ
                        </span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-6 mr-8">
                        <Link href="/" className="font-bold text-text-main hover:text-primary transition-colors">صفحه اصلی</Link>
                        <Link href="/shop" className="font-bold text-text-main hover:text-primary transition-colors">فروشگاه</Link>
                        <Link href="/blog" className="font-bold text-text-main hover:text-primary transition-colors">وبلاگ</Link>
                    </nav>
                </div>
                <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md relative mx-4">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="جستجوی محصولات..."
                        className="w-full bg-bg-sec border border-stroke rounded-xl h-11 px-4 pr-11 text-sm font-medium text-text-main focus:outline-none focus:border-primary transition-colors"
                    />
                    <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-text-sec hover:text-primary transition-colors">
                        <Search className="w-5 h-5" />
                    </button>
                </form>
                <div className="flex items-center gap-2 md:gap-3">
                    <div className="hidden sm:block">
                        {isMounted ? (
                            phone ? (
                                <Link href="/profile" className="flex items-center gap-2 bg-secondary/30 px-3 py-2 rounded-xl hover:bg-secondary transition-colors border border-stroke">
                                    <User className="w-5 h-5 text-primary" />
                                    <span className="text-sm font-bold text-text-main">
                                        {nameToShow || 'حساب کاربری'}
                                    </span>
                                </Link>
                            ) : (
                                <Link href="/login" className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-xl hover:bg-primary hover:text-white text-primary transition-colors">
                                    <LogIn className="w-5 h-5" />
                                    <span className="text-sm font-bold">ورود</span>
                                </Link>
                            )
                        ) : (
                            <div className="w-24 h-10 bg-stroke rounded-xl animate-pulse"></div>
                        )}
                    </div>
                    <Link href="/cart" className="relative flex items-center justify-center w-11 h-11 hover:bg-secondary rounded-lg transition-colors shrink-0">
                        <ShoppingBasket className="w-7 h-7 text-text-main" />
                        {isMounted && items.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm animate-in zoom-in">
                                {items.reduce((total, item) => total + item.quantity, 0)}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-50 md:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsMenuOpen(false)}
                ></div>
            )}
            <div className={`fixed top-0 right-0 h-full w-70 sm:w-[320px] bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col shadow-2xl ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>
                <div className="flex items-center justify-between p-6 border-b border-stroke">
                    <span className="font-black text-xl text-primary">پریمیوم‌شاپ</span>
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="p-2 bg-bg-sec text-text-main hover:bg-red-50 hover:text-red-500 rounded-xl transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-4 border-b border-stroke bg-bg-sec/30">
                    <form onSubmit={handleSearch} className="relative w-full">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="جستجوی محصولات..."
                            className="w-full bg-white border border-stroke rounded-xl h-12 px-4 pr-11 text-sm font-medium text-text-main focus:outline-none focus:border-primary transition-colors shadow-sm"
                        />
                        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-text-sec hover:text-primary transition-colors">
                            <Search className="w-5 h-5" />
                        </button>
                    </form>
                </div>
                <nav className="flex flex-col p-4 gap-2 overflow-y-auto">
                    <Link href="/" onClick={() => setIsMenuOpen(false)} className="font-bold text-text-main hover:bg-primary/10 hover:text-primary p-3 rounded-xl transition-colors">صفحه اصلی</Link>
                    <Link href="/shop" onClick={() => setIsMenuOpen(false)} className="font-bold text-text-main hover:bg-primary/10 hover:text-primary p-3 rounded-xl transition-colors">فروشگاه</Link>
                    <Link href="/blog" onClick={() => setIsMenuOpen(false)} className="font-bold text-text-main hover:bg-primary/10 hover:text-primary p-3 rounded-xl transition-colors">وبلاگ</Link>
                </nav>
                <div className="mt-auto p-6 border-t border-stroke bg-bg-sec/30">
                    {isMounted ? (
                        phone ? (
                            <Link
                                href="/profile"
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center gap-3 font-bold text-text-main hover:text-primary transition-colors"
                            >
                                <div className="w-10 h-10 bg-white border border-stroke rounded-full flex items-center justify-center shadow-sm shrink-0">
                                    <User className="w-5 h-5 text-primary" />
                                </div>
                                <div className="flex flex-col">
                                    {nameToShow && <span className="text-xs text-text-sec font-normal">خوش برگشتی،</span>}
                                    <span>{nameToShow || 'حساب کاربری'}</span>
                                </div>
                            </Link>
                        ) : (
                            <Link
                                href="/login"
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center justify-center gap-2 bg-primary text-white font-bold w-full py-3.5 rounded-xl hover:bg-primary/90 transition-all shadow-md active:scale-95"
                            >
                                <LogIn className="w-5 h-5" />
                                ورود یا ثبت‌نام
                            </Link>
                        )
                    ) : (
                        <div className="w-full h-12 bg-stroke rounded-xl animate-pulse"></div>
                    )}
                </div>
            </div>
        </header>
    );
}