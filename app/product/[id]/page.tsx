"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    ChevronLeft,
    Star,
    ShieldCheck,
    Truck,
    RotateCcw,
    Headphones,
    ShoppingBasket,
    MessageSquare,
    Heart,
    Info
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
const productData = {
    id: 1,
    title: 'کاپشن چرم گاوی مردانه',
    brand: 'برند متفرقه - دسته بندی مد و پوشاک',
    price: '۱,۲۴۰,۰۰۰',
    oldPrice: '۱,۸۷۰,۰۰۰',
    discount: '۲۵٪',
    images: ['/img.png', '/img.png', '/img.png', '/img.png'],
    features: [
        { key: 'جنس محصول', value: 'چرم گاو' },
        { key: 'مدل یقه', value: 'ایستاده' },
        { key: 'طرح لباس', value: 'ساده' },
        { key: 'نوع بسته‌بندی', value: 'زیپ' },
        { key: 'مورد استفاده', value: 'روزمره' },
    ],
    colors: [
        { id: 'black', hex: '#000000', name: 'مشکی' },
        { id: 'brown', hex: '#8B4513', name: 'قهوه‌ای' },
        { id: 'camel', hex: '#D2B48C', name: 'شتری' },
        { id: 'red', hex: '#800000', name: 'زرشکي' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    category: 'مد و پوشاک',
    categorySlug: 'fashion',
    subCategory: 'کاپشن چرم مردانه',
    subCategorySlug: 'mens-leather-jackets',
};

const similarProducts = [
    { id: 2, title: 'کاپشن چرم مردانه', price: '۱,۲۴۰,۰۰۰', image: '/img.png' },
    { id: 3, title: 'کاپشن چرم مردانه', price: '۱,۲۴۰,۰۰۰', image: '/img.png' },
    { id: 4, title: 'کاپشن چرم گاوی', price: '۱,۲۴۰,۰۰۰', image: '/img.png' },
    { id: 5, title: 'کاپشن چرم گاوی', price: '۱,۲۴۰,۰۰۰', image: '/img.png' },
    { id: 6, title: 'کاپشن چرم مردانه', price: '۱,۲۴۰,۰۰۰', image: '/img.png' },
];

export default function ProductDetail({ params }: { params: { id: string } }) {
    const [activeImage, setActiveImage] = useState(productData.images[0]);
    const [selectedColor, setSelectedColor] = useState(productData.colors[0].id);
    const [selectedSize, setSelectedSize] = useState(productData.sizes[2]);
    const [activeTab, setActiveTab] = useState('description');

    return (
        <main className="w-[90%] lg:w-[85%] mx-auto py-8 min-h-screen">
            <nav className="flex items-center gap-2 text-xs md:text-sm text-text-sec mb-8 font-medium whitespace-nowrap overflow-x-auto [scrollbar-width:none]">
                <Link href="/" className="hover:text-primary transition-colors shrink-0">صفحه اصلی</Link>
                <ChevronLeft className="w-4 h-4 shrink-0" />
                <Link href={`/category/${productData.categorySlug}`} className="hover:text-primary transition-colors shrink-0">
                    {productData.category}
                </Link>
                <ChevronLeft className="w-4 h-4 shrink-0" />
                <Link href={`/category/${productData.categorySlug}/${productData.subCategorySlug}`} className="hover:text-primary transition-colors shrink-0">
                    {productData.subCategory}
                </Link>
                <ChevronLeft className="w-4 h-4 shrink-0" />
                <span className="text-text-main font-bold truncate max-w-[150px] sm:max-w-[300px]">
                    {productData.title}
                </span>
            </nav>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
                <div className="lg:col-span-4 flex flex-col gap-4">
                    <div className="relative w-full aspect-square bg-bg-sec rounded-3xl border border-stroke overflow-hidden">
                        <Image src={activeImage} alt={productData.title} fill className="object-cover" />
                        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-text-sec hover:text-red-500 shadow-sm transition-colors">
                                <Heart className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 overflow-x-auto pb-2 [scrollbar-width:none]">
                        {productData.images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveImage(img)}
                                className={`relative w-20 h-20 shrink-0 rounded-2xl overflow-hidden border-2 transition-all ${activeImage === img ? 'border-primary' : 'border-stroke opacity-70 hover:opacity-100'}`}
                            >
                                <Image src={img} alt={`تصویر ${idx}`} fill className="object-cover" />
                            </button>
                        ))}
                    </div>
                </div>
                <div className="lg:col-span-5 flex flex-col gap-6">
                    <div className="flex flex-col gap-2 border-b border-stroke pb-6">
                        <h1 className="text-2xl md:text-3xl font-black text-text-main leading-tight">
                            {productData.title}
                        </h1>
                        <span className="text-text-sec text-sm">{productData.brand}</span>
                        <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-1 text-yellow-500">
                                <Star className="w-4 h-4 fill-current" />
                                <span className="font-bold text-sm mt-1">۴.۲</span>
                            </div>
                            <span className="text-stroke">|</span>
                            <span className="text-text-sec text-sm">۴۰ دیدگاه</span>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">ویژگی‌های محصول:</h3>
                        <ul className="flex flex-col gap-3">
                            {productData.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-sm">
                                    <span className="text-text-sec min-w-[120px]">{feature.key}:</span>
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
                    <div className="bg-bg-sec/50 border border-stroke rounded-3xl p-6 flex flex-col gap-6 top-6 shadow-sm">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center justify-between">
                                <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">تخفیف ویژه</span>
                                <span className="text-text-sec line-through text-sm">{productData.oldPrice}</span>
                            </div>
                            <div className="flex items-center justify-end gap-1 mt-1">
                                <span className="text-2xl font-black text-text-main">{productData.price}</span>
                                <span className="text-text-sec text-sm">تومان</span>
                            </div>
                        </div>
                        <hr className="border-stroke" />
                        <div className="flex flex-col gap-3">
                            <span className="text-sm font-bold text-text-main">رنگ:</span>
                            <div className="flex items-center gap-3">
                                {productData.colors.map((color) => (
                                    <button
                                        key={color.id}
                                        onClick={() => setSelectedColor(color.id)}
                                        className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${selectedColor === color.id ? 'border-primary scale-110' : 'border-transparent'}`}
                                        style={{ backgroundColor: color.hex }}
                                        title={color.name}
                                    >
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <span className="text-sm font-bold text-text-main">سایز:</span>
                            <div className="flex items-center flex-wrap gap-2">
                                {productData.sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`w-10 h-10 rounded-xl border text-sm font-bold transition-all ${selectedSize === size
                                            ? 'bg-primary border-primary text-white'
                                            : 'bg-white border-stroke text-text-sec hover:border-primary/50'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="bg-orange-50 text-orange-600 border border-orange-200 rounded-xl p-3 flex items-start gap-2 text-xs leading-relaxed">
                            <Info className="w-4 h-4 shrink-0 mt-0.5" />
                            <span>شرایط ارسال: بین ۱ تا ۳ روز کاری. امکان پرداخت در محل.</span>
                        </div>
                        <button className="w-full bg-primary text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95">
                            <ShoppingBasket className="w-5 h-5" />
                            افزودن به سبد خرید
                        </button>
                    </div>
                    <div className="mt-4 bg-secondary/30 border border-secondary/50 rounded-2xl p-4 flex items-center justify-between">
                        <div>
                            <p className="font-bold text-sm text-text-main">نیاز به پشتیبانی دارید؟</p>
                            <p className="text-xs text-text-sec mt-1">تماس بگیرید: ۰۲۱۲۳۴۵۶۷۸</p>
                        </div>
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-sm">
                            <Headphones className="w-5 h-5" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-20">
                <div className="flex items-center justify-center gap-6 border-b border-stroke overflow-x-auto [scrollbar-width:none]">
                    {['description', 'specs', 'comments'].map((tab) => {
                        const titles = { description: 'توضیحات محصول', specs: 'مشخصات محصول', comments: 'نظرات کاربران' };
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
                            <p className="text-text-sec leading-loose text-justify">
                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="w-full aspect-video bg-secondary/30 rounded-3xl flex items-center justify-center font-bold text-text-sec">عکس برای توضیحات</div>
                                <div className="w-full aspect-video bg-secondary/30 rounded-3xl flex items-center justify-center font-bold text-text-sec">عکس برای توضیحات</div>
                            </div>
                        </div>
                    )}
                    {activeTab === 'specs' && (
                        <div className="animate-in fade-in">
                            <div className="w-full max-w-2xl mx-auto border border-stroke rounded-2xl overflow-hidden">
                                {productData.features.map((feature, idx) => (
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
                            <div className="bg-bg-sec/50 border border-stroke rounded-3xl p-6">
                                <h3 className="font-bold text-lg mb-4 text-text-main">نظر خود را در مورد این کالا بنویسید!</h3>
                                <form className="flex flex-col gap-4">
                                    <textarea rows={4} className="w-full bg-white border border-stroke rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm" placeholder="دیدگاه شما..."></textarea>
                                    <input type="text" className="w-full bg-white border border-stroke rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm" placeholder="نام و نام خانوادگی" />
                                    <div className="flex justify-end">
                                        <button type="button" className="bg-primary text-white font-bold py-3 px-8 rounded-xl hover:bg-primary/90 transition-colors">ارسال دیدگاه</button>
                                    </div>
                                </form>
                            </div>
                            <div className="flex flex-col items-center justify-center text-center gap-4 py-10">
                                <div className="w-24 h-24 bg-secondary/30 rounded-full flex items-center justify-center">
                                    <MessageSquare className="w-10 h-10 text-primary opacity-50" />
                                </div>
                                <p className="font-bold text-text-main">هنوز هیچ نظری ثبت نشده!</p>
                                <p className="text-sm text-text-sec">شما اولین نفری باشید که نظر می‌دهد.</p>
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
                    <Swiper
                        dir="rtl"
                        modules={[Navigation]}
                        spaceBetween={16}
                        slidesPerView="auto"
                        navigation
                        className="w-full pb-4"
                    >
                        {similarProducts.map((prod) => (
                            <SwiperSlide key={prod.id} className="!w-[220px] md:!w-[240px]">
                                <div className="w-full bg-bg-main border border-stroke rounded-2xl p-3 flex flex-col group hover:shadow-md hover:border-primary/50 transition-all">
                                    <Link href={`/product/${prod.id}`} className="relative w-full aspect-square rounded-xl overflow-hidden mb-3 bg-bg-sec block">
                                        <Image src={prod.image} alt={prod.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                                    </Link>
                                    <Link href={`/product/${prod.id}`}>
                                        <h3 className="font-bold text-text-main text-sm text-center line-clamp-1">{prod.title}</h3>
                                    </Link>
                                    <div className="mt-4 flex items-center justify-between">
                                        <button className="bg-primary/10 text-primary p-2 rounded-lg hover:bg-primary hover:text-white transition-colors">
                                            <ShoppingBasket className="w-5 h-5" />
                                        </button>
                                        <span className="font-black text-text-main text-sm">{prod.price} <span className="text-xs text-text-sec font-normal">تومان</span></span>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </main>
    );
}