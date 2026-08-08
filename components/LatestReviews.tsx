"use client";

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Star, MessageSquareQuote, User, Loader2, ShoppingBag } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';

interface ReviewData {
    id: string;
    name: string;
    rating: number;
    text: string;
    date: string;
    productName: string;
}

interface ApiReview {
    reviewerName: string;
    rating: number;
    comment: string;
    date: string;
}

interface ApiProduct {
    id: number;
    title: string;
    reviews?: ApiReview[];
}

export default function LatestReviews() {
    const [reviews, setReviews] = useState<ReviewData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const randomSkip = Math.floor(Math.random() * 50);
                const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${randomSkip}`);
                const data = await res.json();
                const extractedReviews: ReviewData[] = [];
                data.products.forEach((product: ApiProduct) => {
                    if (product.reviews && product.reviews.length > 0) {
                        const review = product.reviews[0];
                        extractedReviews.push({
                            id: `${product.id}-${review.reviewerName}`,
                            name: review.reviewerName,
                            rating: review.rating,
                            text: review.comment,
                            date: new Date(review.date).toLocaleDateString('fa-IR'),
                            productName: product.title
                        });
                    }
                });
                setReviews(extractedReviews.slice(0, 6));
            } catch (error) {
                console.error("خطا در دریافت نظرات:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchReviews();
    }, []);

    if (isLoading) {
        return (
            <section className="w-full mt-12 md:mt-16 flex flex-col items-center justify-center min-h-[30vh]">
                <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
                <span className="text-text-sec font-bold text-sm">در حال دریافت نظرات واقعی کاربران...</span>
            </section>
        );
    }

    if (reviews.length === 0) return null;

    return (
        <section className="w-full mt-12 md:mt-16">
            <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-2 text-text-main">
                    <MessageSquareQuote className="w-6 h-6 text-text-sec" />
                    <h2 className="text-lg md:text-xl font-black whitespace-nowrap">آخرین نظرات مشتریان</h2>
                </div>
                <div className="h-px w-full bg-stroke rounded-full"></div>
            </div>
            <Swiper
                dir="rtl"
                modules={[Autoplay, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 4 },
                }}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                pagination={{ clickable: true, dynamicBullets: true }}
                className="w-full pb-14"
            >
                {reviews.map((review) => (
                    <SwiperSlide key={review.id} className="h-auto">
                        <div className="bg-linear-to-br from-primary via-primary to-primary/80 border border-white/20 rounded-3xl p-6 h-full flex flex-col gap-4 shadow-lg text-white">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white shrink-0 backdrop-blur-sm border border-white/20">
                                        <User className="w-6 h-6" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-white text-sm">{review.name}</span>
                                        <span className="text-xs text-white/70 mt-1">{review.date}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-0.5 text-yellow-400 shrink-0">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-white/30'}`} />
                                    ))}
                                </div>
                            </div>
                            <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-2.5 flex items-center gap-2 mt-1">
                                <ShoppingBag className="w-4 h-4 text-secondary shrink-0" />
                                <span className="text-xs font-bold text-white/80 truncate">
                                    ثبت‌شده برای: <span className="text-secondary">{review.productName}</span>
                                </span>
                            </div>
                            <p className="text-white font-medium text-sm leading-loose text-justify flex-1 italic opacity-95">
                                &quot;{review.text}&quot;
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}