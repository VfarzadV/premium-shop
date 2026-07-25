"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBasket, BadgePercent } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const offers = [
    { id: 1, title: 'کاپشن چرم گاوی', category: 'مد و پوشاک', price: '۱,۲۴۰,۰۰۰', oldPrice: '۱,۸۷۰,۰۰۰', discount: '۲۵٪', image: '/img.png' },
    { id: 2, title: 'ساعت هوشمند', category: 'کالای دیجیتال', price: '۲,۱۰۰,۰۰۰', oldPrice: '۲,۸۰۰,۰۰۰', discount: '۲۰٪', image: '/img.png' },
    { id: 3, title: 'کفش اسپرت روزمره', category: 'ورزش و سفر', price: '۸۵۰,۰۰۰', oldPrice: '۱,۱۰۰,۰۰۰', discount: '۱۰٪', image: '/img.png' },
    { id: 4, title: 'عینک آفتابی کلاسیک', category: 'زیبایی و سلامت', price: '۶۲۰,۰۰۰', oldPrice: '۸۵۰,۰۰۰', discount: '۱۵٪', image: '/img.png' },
    { id: 5, title: 'کیف دوشی زنانه', category: 'مد و پوشاک', price: '۹۵۰,۰۰۰', oldPrice: '۱,۲۰۰,۰۰۰', discount: '۳۰٪', image: '/img.png' },
];

export default function SpecialOffers() {
    return (
        <section className="w-full mt-12 bg-primary rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-center gap-6 shadow-lg overflow-hidden">


            <div className="flex flex-col items-center justify-center text-white min-w-45 shrink-0 text-center">
                <BadgePercent className="w-16 h-16 md:w-20 md:h-20 mb-2 opacity-90" />
                <h2 className="text-xl md:text-2xl font-medium">تخفیف‌های</h2>
                <h3 className="text-3xl md:text-5xl font-black mt-1">ویــژه!</h3>
                <Link href="/offers" className="mt-6 text-sm border border-white/50 px-4 py-2 rounded-full hover:bg-white hover:text-primary transition-colors">
                    مشاهده همه
                </Link>
            </div>

            
            <div className="w-full min-w-0">
                <Swiper
                    dir="rtl" 
                    modules={[Navigation, Autoplay]}
                    spaceBetween={16} 
                    slidesPerView="auto" 
                    navigation 
                    autoplay={{ delay: 3500, disableOnInteraction: false }}
                    className="w-full pb-2 pt-2"
                >
                    {offers.map((product) => (
                        
                        <SwiperSlide key={product.id} className="w-60!">
                            <div className="w-full h-full bg-bg-main rounded-xl p-3 flex flex-col relative group shadow-sm hover:shadow-md transition-shadow">
                                <span className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-full z-10">
                                    {product.discount}
                                </span>
                                <Link href={`/product/${product.id}`} className="relative w-full aspect-square rounded-lg overflow-hidden mb-3 bg-bg-sec block">
                                    <Image
                                        src={product.image}
                                        alt={product.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </Link>
                                <div className="flex flex-col grow">
                                    <Link href={`/product/${product.id}`}>
                                        <h3 className="font-bold text-text-main text-sm truncate">{product.title}</h3>
                                        <span className="text-xs text-text-sec mt-1 block">{product.category}</span>
                                    </Link>
                                    <div className="mt-auto pt-4 flex items-end justify-between">
                                        <button className="bg-primary/10 text-primary p-2 rounded-lg hover:bg-primary hover:text-white transition-colors">
                                            <ShoppingBasket className="w-5 h-5" />
                                        </button>
                                        <div className="flex flex-col items-end">
                                            <span className="text-xs text-text-sec line-through decoration-primary/50">{product.oldPrice}</span>
                                            <div className="flex items-center gap-1">
                                                <span className="font-bold text-text-main">{product.price}</span>
                                                <span className="text-xs text-text-sec">تومان</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

        </section>
    );
}