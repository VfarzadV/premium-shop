"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    ChevronLeft, Star, ShieldCheck, Truck, RotateCcw,
    Headphones, ShoppingBasket, MessageSquare, Heart, Info, User, ArrowRightLeft
} from 'lucide-react';
import ProductZoom from '@/components/ProductZoom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useCartStore } from '@/store/useCartStore';
import { useRecentStore } from '@/store/useRecentStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useCompareStore } from '@/store/useCompareStore';
import { useCommentStore } from '@/store/useCommentStore';
import Swal from 'sweetalert2';
import { EXCHANGE_RATE } from '@/utils/constants';

const mockColors = [
    { id: 'black', hex: '#000000', name: 'مشکی' },
    { id: 'silver', hex: '#C0C0C0', name: 'نقره‌ای' },
    { id: 'blue', hex: '#000080', name: 'آبی' },
];

export interface Review {
    reviewerName: string;
    rating: number;
    comment: string;
}

export interface Product {
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
    const [isMounted, setIsMounted] = useState(false);
    const [activeImage, setActiveImage] = useState(product.images[0] || product.thumbnail);
    const [selectedColor, setSelectedColor] = useState(mockColors[0].id);
    const [activeTab, setActiveTab] = useState('description');
    const [commentName, setCommentName] = useState('');
    const [commentText, setCommentText] = useState('');
    const [commentRating, setCommentRating] = useState(5);
    const tomanPrice = product.price * EXCHANGE_RATE;
    const oldTomanPrice = Math.round(tomanPrice / (1 - product.discountPercentage / 100));
    const addToCart = useCartStore((state) => state.addToCart);
    const addRecent = useRecentStore((state) => state.addRecent);
    const { items: wishlistItems, toggleWishlist } = useWishlistStore();
    const { compareItems, addToCompare, removeFromCompare } = useCompareStore();
    const { localComments, addComment } = useCommentStore();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsMounted(true);
        }, 0);

        if (product) {
            addRecent(product);
        }

        return () => clearTimeout(timer);
    }, [product, addRecent]);

    const isWished = isMounted ? wishlistItems.some(item => item.id === product.id) : false;
    const isCompared = isMounted ? compareItems.some(item => item.id === product.id) : false;
    const productLocalComments = isMounted ? (localComments[product.id] || []) : [];
    const allReviews = [...productLocalComments, ...(product.reviews || [])];

    const handleAddToCart = (e: React.MouseEvent, item: Product) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(item);
        Swal.fire({
            title: 'به سبد خرید اضافه شد!',
            text: `محصول ${item.title} با موفقیت به سبد خرید شما افزوده شد.`,
            icon: 'success',
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            customClass: { popup: 'font-sans rounded-xl bg-bg-main border border-stroke', title: 'text-sm font-bold text-text-main', htmlContainer: 'text-text-sec' }
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
            Swal.fire({ title: 'حذف شد!', text: 'محصول از لیست مقایسه حذف شد.', icon: 'info', toast: true, position: 'bottom-end', showConfirmButton: false, timer: 2000, customClass: { popup: 'font-sans rounded-xl bg-bg-main border border-stroke', title: 'text-sm font-bold text-text-main', htmlContainer: 'text-text-sec' } });
        } else {
            const result = addToCompare(product);
            if (result.success) {
                Swal.fire({ title: 'اضافه شد!', text: result.message, icon: 'success', toast: true, position: 'bottom-end', showConfirmButton: false, timer: 2000, customClass: { popup: 'font-sans rounded-xl bg-bg-main border border-stroke', title: 'text-sm font-bold text-text-main', htmlContainer: 'text-text-sec' } });
            } else {
                Swal.fire({ title: 'اخطار!', text: result.message, icon: 'error', toast: true, position: 'bottom-end', showConfirmButton: false, timer: 3000, customClass: { popup: 'font-sans rounded-xl bg-bg-main border border-stroke', title: 'text-sm font-bold text-text-main', htmlContainer: 'text-text-sec' } });
            }
        }
    };

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!commentName.trim() || !commentText.trim()) {
            Swal.fire({ title: 'خطا', text: 'لطفاً نام و متن نظر خود را وارد کنید.', icon: 'error', toast: true, position: 'bottom-end', showConfirmButton: false, timer: 3000, customClass: { popup: 'font-sans rounded-xl bg-bg-main border border-stroke', title: 'text-sm font-bold text-text-main' } });
            return;
        }

        const newReview = {
            reviewerName: commentName,
            rating: commentRating,
            comment: commentText,
            date: new Date().toLocaleDateString('fa-IR')
        };

        addComment(product.id, newReview);
        setCommentName('');
        setCommentText('');
        setCommentRating(5);

        Swal.fire({ title: 'ثبت شد!', text: 'نظر شما با موفقیت ثبت شد و هم‌اکنون قابل مشاهده است.', icon: 'success', toast: true, position: 'bottom-end', showConfirmButton: false, timer: 3000, customClass: { popup: 'font-sans rounded-xl bg-bg-main border border-stroke', title: 'text-sm font-bold text-text-main', htmlContainer: 'text-text-sec' } });
    };

    const specs = [
        { key: 'برند', value: product.brand || 'متفرقه' },
        { key: 'دسته‌بندی', value: product.category.replace('-', ' ') },
        { key: 'وزن', value: product.weight ? `${product.weight} گرم` : 'نامشخص' },
        { key: 'گارانتی', value: product.warrantyInformation || 'بدون گارانتی' },
        { key: 'ارسال', value: product.shippingInformation || 'عادی' },
        { key: 'موجودی انبار', value: product.stock > 0 ? `${product.stock} عدد` : 'ناموجود' },
    ];

    return (
        <main className="w-[90%] lg:w-[85%] mx-auto py-8 min-h-screen">
            <nav className="flex items-center gap-2 text-xs md:text-sm text-text-sec mb-8 font-medium whitespace-nowrap overflow-x-auto scrollbar-none">
                <Link href="/" className="hover:text-primary transition-colors shrink-0">خانه</Link>
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
                    <div className="relative w-full aspect-square rounded-3xl overflow-hidden">
                        <ProductZoom src={activeImage} alt={product.title} />
                        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                            <button onClick={handleWishlist} className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-colors ${isWished ? 'bg-red-50 text-red-500 border border-red-200' : 'bg-white text-text-sec hover:text-red-500 border border-stroke'}`}>
                                <Heart className={`w-5 h-5 ${isWished ? 'fill-current' : ''}`} />
                            </button>
                            <button onClick={handleCompare} className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-colors ${isCompared ? 'bg-primary/10 text-primary border border-primary/30' : 'bg-white text-text-sec hover:text-primary border border-stroke'}`}>
                                <ArrowRightLeft className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                        {product.images.map((img: string, idx: number) => (
                            <button key={idx} onClick={() => setActiveImage(img)} className={`relative w-20 h-20 shrink-0 rounded-2xl overflow-hidden border-2 transition-all bg-bg-sec ${activeImage === img ? 'border-primary' : 'border-stroke opacity-70 hover:opacity-100'}`}>
                                <Image src={img} alt={`تصویر ${idx}`} fill className="object-contain p-2 mix-blend-multiply" />
                            </button>
                        ))}
                    </div>
                </div>
                <div className="lg:col-span-5 flex flex-col gap-6">
                    <div className="flex flex-col gap-2 border-b border-stroke pb-6">
                        <h1 className="text-2xl md:text-3xl font-black text-text-main leading-tight">{product.title}</h1>
                        <span className="text-text-sec text-sm">{product.brand || 'متفرقه'}</span>
                        <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-1 text-yellow-500">
                                <Star className="w-4 h-4 fill-current" />
                                <span className="font-bold text-sm mt-1">{product.rating}</span>
                            </div>
                            <span className="text-stroke">|</span>
                            <span className="text-text-sec text-sm">{allReviews.length} دیدگاه</span>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">ویژگی‌های کلیدی:</h3>
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
                        <div className="flex flex-col items-center text-center gap-2 text-text-sec"><Truck className="w-6 h-6" /><span className="text-xs">ارسال سریع</span></div>
                        <div className="flex flex-col items-center text-center gap-2 text-text-sec"><ShieldCheck className="w-6 h-6" /><span className="text-xs">ضمانت اصالت</span></div>
                        <div className="flex flex-col items-center text-center gap-2 text-text-sec"><RotateCcw className="w-6 h-6" /><span className="text-xs">۷ روز مرجوعی</span></div>
                        <div className="flex flex-col items-center text-center gap-2 text-text-sec"><Headphones className="w-6 h-6" /><span className="text-xs">پشتیبانی ۲۴/۷</span></div>
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
                            <span className="text-sm font-bold text-text-main">رنگ (انتخابی):</span>
                            <div className="flex items-center gap-3">
                                {mockColors.map((color) => (
                                    <button key={color.id} onClick={() => setSelectedColor(color.id)} className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${selectedColor === color.id ? 'border-primary scale-110' : 'border-transparent'}`} style={{ backgroundColor: color.hex }} title={color.name}></button>
                                ))}
                            </div>
                        </div>
                        <div className="bg-orange-50 text-orange-600 border border-orange-200 rounded-xl p-3 flex items-start gap-2 text-xs leading-relaxed">
                            <Info className="w-4 h-4 shrink-0 mt-0.5" />
                            <span>{product.shippingInformation || 'ارسال در سریع‌ترین زمان ممکن'}</span>
                        </div>
                        <button onClick={(e) => handleAddToCart(e, product)} className="w-full bg-primary text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95">
                            <ShoppingBasket className="w-5 h-5" />
                            افزودن به سبد خرید
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-20">
                <div className="flex items-center justify-center gap-6 border-b border-stroke overflow-x-auto scrollbar-none">
                    {['description', 'specs', 'comments'].map((tab) => {
                        const titles = { description: 'معرفی محصول', specs: 'مشخصات فنی', comments: `نظرات (${allReviews.length})` };
                        const isActive = activeTab === tab;
                        return (
                            <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-4 font-bold text-sm md:text-base px-2 whitespace-nowrap transition-all ${isActive ? 'text-primary border-b-2 border-primary' : 'text-text-sec hover:text-text-main'}`}>
                                {titles[tab as keyof typeof titles]}
                            </button>
                        );
                    })}
                </div>
                <div className="py-10">
                    {activeTab === 'description' && (
                        <div className="animate-in fade-in flex flex-col gap-8">
                            <p className="text-text-sec leading-loose text-justify text-lg md:text-xl">{product.description}</p>
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
                            <div className="bg-bg-sec/50 border border-stroke rounded-3xl p-6 h-fit sticky top-28">
                                <h3 className="font-bold text-lg mb-4 text-text-main">دیدگاه خود را بنویسید!</h3>
                                <form onSubmit={handleCommentSubmit} className="flex flex-col gap-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-sm font-bold text-text-sec">امتیاز شما:</span>
                                        <div className="flex items-center gap-1 flex-row-reverse justify-end">
                                            {[5, 4, 3, 2, 1].map((star) => (
                                                <button
                                                    type="button"
                                                    key={star}
                                                    onClick={() => setCommentRating(star)}
                                                    className={`w-6 h-6 focus:outline-none transition-colors ${commentRating >= star ? 'text-yellow-500' : 'text-stroke hover:text-yellow-300'}`}
                                                >
                                                    <Star className={`w-full h-full ${commentRating >= star ? 'fill-current' : ''}`} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        value={commentName}
                                        onChange={(e) => setCommentName(e.target.value)}
                                        className="w-full bg-white border border-stroke rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm font-medium"
                                        placeholder="نام و نام خانوادگی"
                                    />
                                    <textarea
                                        rows={4}
                                        value={commentText}
                                        onChange={(e) => setCommentText(e.target.value)}
                                        className="w-full bg-white border border-stroke rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm font-medium resize-none"
                                        placeholder="متن دیدگاه خود را اینجا بنویسید..."
                                    ></textarea>
                                    <div className="flex justify-end">
                                        <button type="submit" className="bg-primary text-white font-bold py-3 px-8 rounded-xl hover:bg-primary/90 transition-all active:scale-95 shadow-md shadow-primary/20">
                                            ثبت دیدگاه
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="flex flex-col gap-4">
                                {allReviews.length > 0 ? (
                                    allReviews.map((review: Review, idx: number) => (
                                        <div key={idx} className="bg-white border border-stroke rounded-2xl p-5 flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-10 h-10 bg-secondary/30 rounded-full flex items-center justify-center text-primary">
                                                        <User className="w-5 h-5" />
                                                    </div>
                                                    <span className="font-bold text-sm text-text-main">{review.reviewerName}</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-yellow-500">
                                                    {Array.from({ length: 5 }).map((_, i) => (
                                                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-stroke'}`} />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-text-sec text-sm leading-relaxed border-t border-stroke pt-3 mt-1 text-justify">
                                                {review.comment}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center text-center gap-4 py-10 h-full">
                                        <div className="w-24 h-24 bg-secondary/30 rounded-full flex items-center justify-center">
                                            <MessageSquare className="w-10 h-10 text-primary opacity-50" />
                                        </div>
                                        <p className="font-bold text-text-main">اولین نفری باشید که نظر می‌دهد!</p>
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
                    <h2 className="text-xl font-black text-text-main">محصولات مشابه</h2>
                </div>
                <div className="w-full">
                    <Swiper dir="rtl" modules={[Navigation]} spaceBetween={16} slidesPerView="auto" navigation className="w-full pb-4">
                        {similarProducts.map((prod) => {
                            const tomanPrice = prod.price * EXCHANGE_RATE;
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
                                            <button onClick={(e) => handleAddToCart(e, prod)} className="bg-primary/10 text-primary p-2 rounded-lg hover:bg-primary hover:text-white transition-colors z-10 relative">
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