"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { ShoppingBasket, Search, Menu, X, User, LogIn, Gem, Trash2, Plus, Minus, ArrowLeft, Loader2 } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useUserStore } from '@/store/useUserStore';
import ThemeToggle from './ThemeToggle';

interface SearchProduct {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
}

export default function Navbar() {
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [searchResults, setSearchResults] = useState<SearchProduct[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const [isMounted, setIsMounted] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const router = useRouter();
    const pathname = usePathname();

    const searchRef = useRef<HTMLFormElement>(null);
    const mobileSearchRef = useRef<HTMLFormElement>(null);

    const { items, increaseQuantity, decreaseQuantity, getTotalPrice } = useCartStore();
    const { phone, firstName, displayName } = useUserStore();
    const nameToShow = displayName || firstName || '';

    useEffect(() => {
        const timer = setTimeout(() => setIsMounted(true), 0);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsMenuOpen(false);
            setIsCartOpen(false);
            setShowResults(false);
        }, 0);
        return () => clearTimeout(timer);
    }, [pathname]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                searchRef.current && !searchRef.current.contains(event.target as Node) &&
                mobileSearchRef.current && !mobileSearchRef.current.contains(event.target as Node)
            ) {
                setShowResults(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);
        return () => clearTimeout(timer);
    }, [query]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (debouncedQuery.trim().length >= 2) {
                setIsSearching(true);
                setShowResults(true);
                fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(debouncedQuery.trim())}&limit=4`)
                    .then(res => res.json())
                    .then(data => {
                        setSearchResults(data.products || []);
                        setIsSearching(false);
                    })
                    .catch(() => setIsSearching(false));
            } else {
                setSearchResults([]);
                setShowResults(false);
            }
        }, 0);

        return () => clearTimeout(timer);
    }, [debouncedQuery]);

    const handleSearchSubmit = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
            setShowResults(false);
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        if (isMenuOpen || isCartOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMenuOpen, isCartOpen]);

    useEffect(() => {
        const handleResize = () => { if (window.innerWidth >= 768) setIsMenuOpen(false); };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const renderSearchResults = () => {
        if (!showResults || query.trim().length < 2) return null;

        return (
            <div className="absolute top-full left-0 right-0 mt-2 bg-bg-main border border-stroke rounded-2xl shadow-xl overflow-hidden z-50 flex flex-col">
                {isSearching ? (
                    <div className="p-6 flex flex-col items-center justify-center gap-2 text-primary">
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span className="text-xs font-bold">در حال جستجو...</span>
                    </div>
                ) : searchResults.length > 0 ? (
                    <>
                        {searchResults.map(product => {
                            const fakeExchangeRate = 200000;
                            const tomanPrice = product.price * fakeExchangeRate;
                            return (
                                <Link
                                    href={`/product/${product.id}`}
                                    key={product.id}
                                    className="flex items-center gap-3 p-3 hover:bg-bg-sec transition-colors border-b border-stroke/50 last:border-0"
                                >
                                    <div className="relative w-12 h-12 bg-bg-main dark:bg-zinc-300 border border-stroke rounded-lg overflow-hidden shrink-0">
                                        <Image src={product.thumbnail} alt={product.title} fill className="object-contain mix-blend-multiply p-1" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-text-main line-clamp-1">{product.title}</span>
                                        <span className="text-xs text-text-sec mt-1">{tomanPrice.toLocaleString('fa-IR')} تومان</span>
                                    </div>
                                </Link>
                            );
                        })}
                        <button
                            type="button"
                            onClick={() => handleSearchSubmit()}
                            className="p-3 w-full text-center text-xs font-bold text-primary hover:bg-primary/10 transition-colors bg-bg-sec/30"
                        >
                            مشاهده همه نتایج ({query})
                        </button>
                    </>
                ) : (
                    <div className="p-6 text-center text-sm font-bold text-text-sec flex flex-col items-center gap-2">
                        <Search className="w-8 h-8 opacity-20" />
                        محصولی یافت نشد!
                    </div>
                )}
            </div>
        );
    };

    return (
        <header className="w-full bg-bg-main border-b border-stroke sticky top-0 z-40 shadow-sm transition-colors duration-300">
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
                        <Link href="/" className="font-bold text-text-main hover:text-primary transition-colors">خانه</Link>
                        <Link href="/shop" className="font-bold text-text-main hover:text-primary transition-colors">فروشگاه</Link>
                        <Link href="/blog" className="font-bold text-text-main hover:text-primary transition-colors">مجله</Link>
                    </nav>
                </div>
                <form ref={searchRef} onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md relative mx-4">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => { if (query.trim().length >= 2) setShowResults(true); }}
                        placeholder="جستجو در محصولات..."
                        className="w-full bg-bg-sec border border-stroke rounded-xl h-11 px-4 pr-11 text-sm font-medium text-text-main focus:outline-none focus:border-primary focus:bg-bg-main transition-colors"
                    />
                    <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-text-sec hover:text-primary transition-colors">
                        <Search className="w-5 h-5" />
                    </button>
                    {renderSearchResults()}
                </form>
                <div className="flex items-center gap-2 md:gap-3">
                    <ThemeToggle />
                    <div className="hidden sm:block">
                        {isMounted ? (
                            phone ? (
                                <Link href="/profile" className="flex items-center gap-2 bg-secondary/30 px-3 py-2 rounded-xl hover:bg-secondary transition-colors border border-stroke">
                                    <User className="w-5 h-5 text-primary" />
                                    <span className="text-sm font-bold text-text-main">
                                        {nameToShow || 'کاربر مهمان'}
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
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="relative flex items-center justify-center w-11 h-11 hover:bg-secondary rounded-lg transition-colors shrink-0 cursor-pointer"
                    >
                        <ShoppingBasket className="w-7 h-7 text-text-main" />
                        {isMounted && items.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm animate-in zoom-in">
                                {items.reduce((total, item) => total + item.quantity, 0)}
                            </span>
                        )}
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-50 md:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsMenuOpen(false)}
                ></div>
            )}
            <div className={`fixed top-0 right-0 h-full w-70 sm:w-[320px] bg-bg-main z-50 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col shadow-2xl ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex items-center justify-between p-6 border-b border-stroke">
                    <span className="font-black text-xl text-primary">منوی سایت</span>
                    <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-bg-sec text-text-main hover:bg-red-50 hover:text-red-500 rounded-xl transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-4 border-b border-stroke bg-bg-sec/30 relative">
                    <form ref={mobileSearchRef} onSubmit={handleSearchSubmit} className="relative w-full">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onFocus={() => { if (query.trim().length >= 2) setShowResults(true); }}
                            placeholder="جستجو..."
                            className="w-full bg-bg-main border border-stroke rounded-xl h-12 px-4 pr-11 text-sm font-medium text-text-main focus:outline-none focus:border-primary transition-colors shadow-sm"
                        />
                        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-text-sec hover:text-primary transition-colors">
                            <Search className="w-5 h-5" />
                        </button>
                        {renderSearchResults()}
                    </form>
                </div>
                <nav className="flex flex-col p-4 gap-2 overflow-y-auto">
                    <Link href="/" onClick={() => setIsMenuOpen(false)} className="font-bold text-text-main hover:bg-primary/10 hover:text-primary p-3 rounded-xl transition-colors">خانه</Link>
                    <Link href="/shop" onClick={() => setIsMenuOpen(false)} className="font-bold text-text-main hover:bg-primary/10 hover:text-primary p-3 rounded-xl transition-colors">فروشگاه</Link>
                    <Link href="/blog" onClick={() => setIsMenuOpen(false)} className="font-bold text-text-main hover:bg-primary/10 hover:text-primary p-3 rounded-xl transition-colors">مجله</Link>
                </nav>
                <div className="mt-auto p-6 border-t border-stroke bg-bg-sec/30">
                    {isMounted ? (
                        phone ? (
                            <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 font-bold text-text-main hover:text-primary transition-colors">
                                <div className="w-10 h-10 bg-bg-main border border-stroke rounded-full flex items-center justify-center shadow-sm shrink-0">
                                    <User className="w-5 h-5 text-primary" />
                                </div>
                                <div className="flex flex-col">
                                    {nameToShow && <span className="text-xs text-text-sec font-normal">پروفایل کاربری</span>}
                                    <span>{nameToShow || 'پروفایل من'}</span>
                                </div>
                            </Link>
                        ) : (
                            <Link href="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center gap-2 bg-primary text-white font-bold w-full py-3.5 rounded-xl hover:bg-primary/90 transition-all shadow-md active:scale-95">
                                <LogIn className="w-5 h-5" />
                                ورود به حساب
                            </Link>
                        )
                    ) : (
                        <div className="w-full h-12 bg-stroke rounded-xl animate-pulse"></div>
                    )}
                </div>
            </div>
            {isCartOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm transition-opacity"
                    onClick={() => setIsCartOpen(false)}
                ></div>
            )}
            <div className={`fixed top-0 left-0 h-full w-[85%] sm:w-95 bg-bg-main z-50 transform transition-transform duration-300 ease-in-out flex flex-col shadow-2xl ${isCartOpen ? 'translate-x-0' : '-translate-x-full'}`}>

                <div className="flex items-center justify-between p-6 border-b border-stroke bg-bg-sec/50">
                    <div className="flex items-center gap-2">
                        <ShoppingBasket className="w-6 h-6 text-primary" />
                        <span className="font-black text-lg text-text-main">سبد خرید من</span>
                        <span className="bg-primary/10 text-primary text-xs font-bold px-2.5 py-1 rounded-lg">
                            {items.reduce((total, item) => total + item.quantity, 0)} کالا
                        </span>
                    </div>
                    <button onClick={() => setIsCartOpen(false)} className="p-2 bg-bg-main text-text-main hover:bg-red-50 hover:text-red-500 rounded-xl border border-stroke transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-bg-main scrollbar-none">
                    {items.length > 0 ? (
                        items.map((item) => {
                            const fakeExchangeRate = 200000;
                            const tomanPrice = item.price * fakeExchangeRate;
                            return (
                                <div key={item.id} className="flex gap-4 bg-bg-main border border-stroke p-3 rounded-2xl hover:border-primary/30 transition-colors">
                                    <Link href={`/product/${item.id}`} onClick={() => setIsCartOpen(false)} className="relative w-20 h-20 bg-bg-sec dark:bg-zinc-300 rounded-xl shrink-0 p-1">
                                        <Image src={item.thumbnail} alt={item.title} fill className="object-contain mix-blend-multiply" />
                                    </Link>
                                    <div className="flex flex-col flex-1 justify-between py-1">
                                        <Link href={`/product/${item.id}`} onClick={() => setIsCartOpen(false)} className="font-bold text-text-main text-sm line-clamp-2 hover:text-primary transition-colors leading-relaxed">
                                            {item.title}
                                        </Link>
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center border border-stroke rounded-lg overflow-hidden bg-bg-sec h-8">
                                                <button onClick={() => increaseQuantity(item.id)} className="w-8 h-full flex items-center justify-center text-text-main hover:bg-primary hover:text-white transition-colors">
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                                <span className="w-8 h-full flex items-center justify-center font-bold text-sm bg-bg-main">
                                                    {item.quantity}
                                                </span>
                                                <button onClick={() => decreaseQuantity(item.id)} className="w-8 h-full flex items-center justify-center text-text-main hover:bg-red-500 hover:text-white transition-colors">
                                                    {item.quantity === 1 ? <Trash2 className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                                                </button>
                                            </div>
                                            <span className="font-black text-sm text-text-main">
                                                {(tomanPrice * item.quantity).toLocaleString('fa-IR')} <span className="text-[10px] text-text-sec font-normal">تومان</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full gap-4 text-text-sec opacity-70">
                            <div className="w-20 h-20 bg-secondary/30 rounded-full flex items-center justify-center mb-2">
                                <ShoppingBasket className="w-10 h-10 text-primary opacity-50" />
                            </div>
                            <p className="font-bold text-sm text-text-main">سبد خرید شما خالی است</p>
                            <p className="text-xs">محصولات خود را اضافه کنید تا در اینجا نمایش داده شوند.</p>
                        </div>
                    )}
                </div>
                {items.length > 0 && (
                    <div className="p-6 border-t border-stroke bg-bg-sec/50 shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
                        <div className="flex items-center justify-between mb-4">
                            <span className="font-bold text-text-main">جمع کل:</span>
                            <span className="font-black text-primary text-xl tracking-tight">
                                {getTotalPrice().toLocaleString('fa-IR')} <span className="text-xs text-text-sec font-normal">تومان</span>
                            </span>
                        </div>
                        <Link
                            href="/checkout"
                            onClick={() => setIsCartOpen(false)}
                            className="w-full flex items-center justify-center gap-2 bg-primary text-white font-black py-4 rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95"
                        >
                            تکمیل خرید و تسویه‌حساب
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <Link
                            href="/cart"
                            onClick={() => setIsCartOpen(false)}
                            className="w-full flex items-center justify-center gap-2 text-text-sec font-bold py-3 mt-2 rounded-xl hover:bg-stroke/50 transition-colors text-sm"
                        >
                            مشاهده صفحه سبد خرید
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}