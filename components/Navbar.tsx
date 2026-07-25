"use client"

import Link from 'next/link';
import { Search, ShoppingBasket, User, Globe, LayoutGrid, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {
    const [query, setQuery] = useState('');

    return (
        <header className="bg-bg-sec  py-5  border-b border-stroke">
            <div className="w-[85%] mx-auto flex flex-col gap-5">

                <div className="flex justify-between items-center">
                    <Link href="/" className=" flex items-center justify-center rounded-lg hover:border-primary transition-colors">
                        <Image
                            src="/Logo.png"
                            alt="لوگوی فروشگاه"
                            width={200}
                            height={35}
                            className="object-contain "
                        />
                    </Link>
                    <div className="relative w-full max-w-lg hidden md:block">
                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="relative"
                            aria-label="جستجو در محصولات"
                        >
                            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-text-sec w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                type="text"
                                placeholder="محصول، برند یا دسته‌بندی را جستجو کنید"
                                className="w-full bg-bg-main border border-stroke rounded-lg py-2.5 pr-12 pl-12 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow shadow-sm hover:shadow-md"
                            />
                            {query && (
                                <button
                                    type="button"
                                    onClick={() => setQuery('')}
                                    aria-label="پاک کردن جستجو"
                                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-transparent w-8 h-8 flex items-center justify-center rounded-md text-text-sec hover:bg-secondary hover:text-primary transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </form>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center justify-center w-11 h-11 hover:bg-secondary transition-colors">
                            <ShoppingBasket className="w-7 h-7" />
                        </button>
                        <button className="flex items-center  border border-stroke shadow-lg gap-2 px-4 h-11 font-semibold rounded-lg bg-secondary text-text-main  hover:opacity-90 transition-opacity">
                            <User className="w-5 h-5" />
                            <span className="">حساب کاربری</span>
                        </button>
                    </div>
                </div>
                <div className="flex justify-between items-center bg-secondary px-4 py-2.5 rounded-xl">
                    <nav className="flex items-center gap-6  text-text-sec">
                        <button className="flex items-center gap-2 text-primary font-bold hover:opacity-80 hover:text-text-main transition-opacity">
                            <LayoutGrid className="w-5 h-5" />
                            لیست محصولات
                        </button>
                        <Link href="/" className="font-bold text-text-main">صفحه اصلی</Link>
                        <Link href="/shop" className="hover:text-text-main transition-colors ">فروشگاه</Link>
                        <Link href="/blog" className="hover:text-text-main transition-colors">وبلاگ</Link>
                        <Link href="/about" className="hover:text-text-main transition-colors">درباره ما</Link>
                        <Link href="/contact" className="hover:text-text-main transition-colors">تماس باما</Link>
                    </nav>

                    <Link
                        href="https://instagram.com"
                        target="_blank"
                        className="flex items-center gap-2 bg-bg-main border border-stroke px-4 py-2 rounded-lg shadow-lg text-sm text-text-sec hover:shadow-xl hover:text-primary  hover:border-primary transition-colors"
                    >
                        instagram.ir
                        <Globe className="w-4 h-4 text-primary" />
                    </Link>

                </div>
            </div>
        </header>
    );
}