"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    ChevronLeft, Star, ShieldCheck, Truck, RotateCcw,
    Headphones, ShoppingBasket, MessageSquare, Heart, Info, User
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const mockColors = [
    { id: 'black', hex: '#000000', name: 'مشکی' },
    { id: 'silver', hex: '#C0C0C0', name: 'نقره‌ای' },
    { id: 'blue', hex: '#000080', name: 'آبی' },
];
interface Review {
    reviewerName: string;
    rating: number;
    comment: string;
}

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand?: string;
    category: string;
    thumbnail: string;
    images: string[];
    weight?: number;
    warrantyInformation?: string;
    shippingInformation?: string;
    reviews?: Review[];
}
export default function ProductClient({ product, similarProducts }: { product: Product, similarProducts: Product[] }) {
    const [activeImage, setActiveImage] = useState(product.images[0] || product.thumbnail);
    const [selectedColor, setSelectedColor] = useState(mockColors[0].id);
    const [activeTab, setActiveTab] = useState('description');
    const fakeExchangeRate = 50000;
    const tomanPrice = product.price * fakeExchangeRate;
    const oldTomanPrice = Math.round(tomanPrice / (1 - product.discountPercentage / 100));

    const specs = [
        { key: 'برند', value: product.brand || 'متفرقه' },
        { key: 'دسته‌بندی', value: product.category.replace('-', ' ') },
        { key: 'وزن', value: product.weight ? `${product.weight} گرم` : 'نامشخص' },
        { key: 'گارانتی', value: product.warrantyInformation || 'ندارد' },
        { key: 'شرایط ارسال', value: product.shippingInformation || 'ارسال استاندارد' },
        { key: 'موجودی انبار', value: product.stock > 0 ? `${product.stock} عدد` : 'ناموجود' },
    ];

    return (
        <main className="w-[90%] lg:w-[85%] mx-auto py-8 min-h-screen">
            <nav className="flex items-center gap-2 text-xs md:text-sm text-text-sec mb-8 font-medium whitespace-nowrap overflow-x-auto scrollbar-none">
                <Link href="/" className="hover:text-primary transition-colors shrink-0">صفحه اصلی</Link>
                <ChevronLeft className="w-4 h-4 shrink-0" />
                <Link href={`/category/${product.category}`} className="hover:text-primary transition-colors shrink-0 capitalize">
                    {product.category.replace('-', ' ')}
                </Link>
                <ChevronLeft className="w-4 h-4 shrink-0" />
                <span className="text-text-main font-bold truncate max-w-37.5 sm:max-w-75">
                    {product.title}
                </span>
            </nav>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
                <div className="lg:col-span-4 flex flex-col gap-4">
                    <div className="relative w-full aspect-square bg-bg-sec rounded-3xl border border-stroke overflow-hidden flex items-center justify-center p-4">
                        <Image src={activeImage} alt={product.title} fill className="object-contain p-4 mix-blend-multiply" />
                        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-text-sec hover:text-red-500 shadow-sm transition-colors">
                                <Heart className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                        {product.images.map((img: string, idx: number) => (
                            <button
                                key={idx}
                                onClick={() => setActiveImage(img)}
                                className={`relative w-20 h-20 shrink-0 rounded-2xl overflow-hidden border-2 transition-all bg-bg-sec ${activeImage === img ? 'border-primary' : 'border-stroke opacity-70 hover:opacity-100'}`}
                            >
                                <Image src={img} alt={`تصویر ${idx}`} fill className="object-contain p-2 mix-blend-multiply" />
                            </button>
                        ))}
                    </div>
                </div>
                <div className="lg:col-span-5 flex flex-col gap-6">
                    <div className="flex flex-col gap-2 border-b border-stroke pb-6">
                        <h1 className="text-2xl md:text-3xl font-black text-text-main leading-tight">
                            {product.title}
                        </h1>
                        <span className="text-text-sec text-sm">{product.brand || 'برند متفرقه'}</span>
                        <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-1 text-yellow-500">
                                <Star className="w-4 h-4 fill-current" />
                                <span className="font-bold text-sm mt-1">{product.rating}</span>
                            </div>
                            <span className="text-stroke">|</span>
                            <span className="text-text-sec text-sm">{product.reviews?.length || 0} دیدگاه</span>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">ویژگی‌های برجسته:</h3>
                        <ul className="flex flex-col gap-3">
                            {specs.slice(0, 4).map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-sm">
                                    <span className="text-text-sec min-w-30">{feature.key}:</span>
                                    <span className="font-bold text-text-main">{feature.value}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="grid grid-cols-4 gap-2 mt-auto pt-6 border-t border-stroke">
                        <div className="flex flex-col items-center text-center gap-2 text-text-sec">
                            <Truck className="w-6 h-6" />
                            <span className="text-xs">ارسال سریع</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-2 text-text-sec">
                            <ShieldCheck className="w-6 h-6" />
                            <span className="text-xs">ضمانت اصالت</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-2 text-text-sec">
                            <RotateCcw className="w-6 h-6" />
                            <span className="text-xs">۷ روز مرجوعی</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-2 text-text-sec">
                            <Headphones className="w-6 h-6" />
                            <span className="text-xs">پشتیبانی</span>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-3">
                    <div className="bg-bg-sec/50 border border-stroke rounded-3xl p-6 flex flex-col gap-6 sticky top-6 shadow-sm">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center justify-between">
                                <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">{Math.round(product.discountPercentage)}٪ تخفیف</span>
                                <span className="text-text-sec line-through text-sm">{oldTomanPrice.toLocaleString('fa-IR')}</span>
                            </div>
                            <div className="flex items-center justify-end gap-1 mt-1">
                                <span className="text-2xl font-black text-text-main">{tomanPrice.toLocaleString('fa-IR')}</span>
                                <span className="text-text-sec text-sm">تومان</span>
                            </div>
                        </div>
                        <hr className="border-stroke" />
                        <div className="flex flex-col gap-3">
                            <span className="text-sm font-bold text-text-main">رنگ (نمایشی):</span>
                            <div className="flex items-center gap-3">
                                {mockColors.map((color) => (
                                    <button
                                        key={color.id}
                                        onClick={() => setSelectedColor(color.id)}
                                        className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${selectedColor === color.id ? 'border-primary scale-110' : 'border-transparent'}`}
                                        style={{ backgroundColor: color.hex }}
                                        title={color.name}
                                    ></button>
                                ))}
                            </div>
                        </div>
                        <div className="bg-orange-50 text-orange-600 border border-orange-200 rounded-xl p-3 flex items-start gap-2 text-xs leading-relaxed">
                            <Info className="w-4 h-4 shrink-0 mt-0.5" />
                            <span>{product.shippingInformation || 'ارسال در سریع‌ترین زمان ممکن'}</span>
                        </div>
                        <button className="w-full bg-primary text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95">
                            <ShoppingBasket className="w-5 h-5" />
                            افزودن به سبد خرید
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-20">
                <div className="flex items-center justify-center gap-6 border-b border-stroke overflow-x-auto scrollbar-none">
                    {['description', 'specs', 'comments'].map((tab) => {
                        const titles = { description: 'توضیحات محصول', specs: 'مشخصات فنی', comments: `نظرات (${product.reviews?.length || 0})` };
                        const isActive = activeTab === tab;
                        return (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-4 font-bold text-sm md:text-base px-2 whitespace-nowrap transition-all ${isActive ? 'text-primary border-b-2 border-primary' : 'text-text-sec hover:text-text-main'
                                    }`}
                            >
                                {titles[tab as keyof typeof titles]}
                            </button>
                        );
                    })}
                </div>
                <div className="py-10">
                    {activeTab === 'description' && (
                        <div className="animate-in fade-in flex flex-col gap-8">
                            <p className="text-text-sec leading-loose text-justify text-lg md:text-xl">
                                {product.description}
                            </p>
                        </div>
                    )}
                    {activeTab === 'specs' && (
                        <div className="animate-in fade-in">
                            <div className="w-full max-w-2xl mx-auto border border-stroke rounded-2xl overflow-hidden">
                                {specs.map((feature, idx) => (
                                    <div key={idx} className={`flex flex-col sm:flex-row sm:items-center p-4 ${idx % 2 === 0 ? 'bg-bg-sec' : 'bg-bg-main'}`}>
                                        <span className="w-full sm:w-1/3 text-text-sec text-sm mb-1 sm:mb-0">{feature.key}</span>
                                        <span className="w-full sm:w-2/3 font-medium text-text-main">{feature.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {activeTab === 'comments' && (
                        <div className="animate-in fade-in grid grid-cols-1 lg:grid-cols-2 gap-10">
                            <div className="bg-bg-sec/50 border border-stroke rounded-3xl p-6 h-fit">
                                <h3 className="font-bold text-lg mb-4 text-text-main">نظر خود را بنویسید!</h3>
                                <form className="flex flex-col gap-4">
                                    <textarea rows={4} className="w-full bg-white border border-stroke rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm" placeholder="دیدگاه شما..."></textarea>
                                    <input type="text" className="w-full bg-white border border-stroke rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm" placeholder="نام شما" />
                                    <div className="flex justify-end">
                                        <button type="button" className="bg-primary text-white font-bold py-3 px-8 rounded-xl hover:bg-primary/90 transition-colors">ارسال دیدگاه</button>
                                    </div>
                                </form>
                            </div>
                            <div className="flex flex-col gap-4">
                                {product.reviews && product.reviews.length > 0 ? (
                                    product.reviews.map((review: Review, idx: number) => (
                                        <div key={idx} className="bg-white border border-stroke rounded-2xl p-5 flex flex-col gap-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-10 h-10 bg-secondary/30 rounded-full flex items-center justify-center text-primary">
                                                        <User className="w-5 h-5" />
                                                    </div>
                                                    <span className="font-bold text-sm text-text-main">{review.reviewerName}</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-yellow-500">
                                                    <Star className="w-4 h-4 fill-current" />
                                                    <span className="font-bold text-sm mt-1">{review.rating}</span>
                                                </div>
                                            </div>
                                            <p className="text-text-sec text-sm leading-relaxed border-t border-stroke pt-3 mt-1 text-left" dir="ltr">
                                                {review.comment}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center text-center gap-4 py-10">
                                        <div className="w-24 h-24 bg-secondary/30 rounded-full flex items-center justify-center">
                                            <MessageSquare className="w-10 h-10 text-primary opacity-50" />
                                        </div>
                                        <p className="font-bold text-text-main">هنوز هیچ نظری ثبت نشده!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-12 border-t border-stroke pt-12">
                <div className="flex items-center gap-2 mb-8">
                    <ShoppingBasket className="w-6 h-6 text-text-sec" />
                    <h2 className="text-xl font-black text-text-main">محصولات پیشنهادی</h2>
                </div>
                <div className="w-full">
                    <Swiper
                        dir="rtl"
                        modules={[Navigation]}
                        spaceBetween={16}
                        slidesPerView="auto"
                        navigation
                        className="w-full pb-4"
                    >
                        {similarProducts.map((prod) => {
                            const fakeExchangeRate = 50000;
                            const tomanPrice = prod.price * fakeExchangeRate;
                            return (
                                <SwiperSlide key={prod.id} className="w-55! md:w-60!">
                                    <div className="w-full bg-bg-main border border-stroke rounded-2xl p-3 flex flex-col group hover:shadow-md hover:border-primary/50 transition-all">
                                        <Link href={`/product/${prod.id}`} className="relative w-full aspect-square rounded-xl overflow-hidden mb-3 bg-bg-sec flex items-center justify-center p-2 ">
                                            <Image src={prod.thumbnail} alt={prod.title} fill className="object-contain group-hover:scale-105 transition-transform duration-300 mix-blend-multiply" />
                                        </Link>
                                        <Link href={`/product/${prod.id}`}>
                                            <h3 className="font-bold text-text-main text-sm text-center line-clamp-1">{prod.title}</h3>
                                        </Link>
                                        <div className="mt-4 flex items-center justify-between">
                                            <button className="bg-primary/10 text-primary p-2 rounded-lg hover:bg-primary hover:text-white transition-colors">
                                                <ShoppingBasket className="w-5 h-5" />
                                            </button>
                                            <span className="font-black text-text-main text-sm">
                                                {tomanPrice.toLocaleString('fa-IR')} <span className="text-xs text-text-sec font-normal">تومان</span>
                                            </span>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            </div>
        </main>
    );
}