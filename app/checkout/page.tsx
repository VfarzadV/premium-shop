"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Truck, CreditCard, CheckCircle2, ChevronRight, ShoppingBag, Loader2 } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useUserStore } from '@/store/useUserStore';
import { useOrderStore } from '@/store/useOrderStore';

export default function CheckoutPage() {
    const [isMounted, setIsMounted] = useState(false);
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderId, setOrderId] = useState('');
    const router = useRouter();
    const { items, getTotalPrice, clearCart } = useCartStore();
    const { phone, firstName, lastName } = useUserStore();
    const { addOrder } = useOrderStore();
    const [formData, setFormData] = useState({
        fullName: firstName || lastName ? `${firstName} ${lastName}`.trim() : '',
        phone: phone || '',
        province: '',
        city: '',
        address: '',
        postalCode: ''
    });
    const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsMounted(true);
        }, 0);
        if (items.length === 0 && step !== 3) {
            router.push('/cart');
        }
        return () => clearTimeout(timer);
    }, [items.length, step, router]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNextStep = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(2);
    };

    const handlePayment = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            const newOrderId = `PSH-${Math.floor(100000 + Math.random() * 900000)}`;
            setOrderId(newOrderId)
            addOrder({
                id: newOrderId,
                date: new Date().toLocaleDateString('fa-IR'),
                items: [...items],
                totalPrice: finalTotal,
                status: 'در حال پردازش'
            });
            setStep(3);
            clearCart();
        }, 2000);
    };

    if (!isMounted) return null;
    const cartTotal = getTotalPrice();
    const shippingCost = shippingMethod === 'express' ? 50000 : 35000;
    const finalTotal = cartTotal + shippingCost;

    return (
        <main className="w-[90%] lg:w-[70%] mx-auto py-8 md:py-12 min-h-screen">
            {step !== 3 && (
                <Link href="/cart" className="flex items-center gap-1 text-sm font-bold text-text-sec hover:text-primary transition-colors w-fit mb-8">
                    <ChevronRight className="w-4 h-4" />
                    بازگشت به سبد خرید
                </Link>
            )}
            <div className="flex items-center justify-between mb-12 relative px-4 md:px-12">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-stroke -translate-y-1/2 -z-10 px-12">
                    <div
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
                    ></div>
                </div>
                {[
                    { num: 1, label: 'اطلاعات ارسال', icon: MapPin },
                    { num: 2, label: 'پرداخت', icon: CreditCard },
                    { num: 3, label: 'تکمیل خرید', icon: CheckCircle2 }
                ].map((s) => {
                    const Icon = s.icon;
                    const isActive = step >= s.num;
                    const isCurrent = step === s.num;
                    return (
                        <div key={s.num} className="flex flex-col items-center gap-2 bg-bg-main">
                            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-4 transition-colors duration-300 ${isActive ? 'bg-primary border-primary/20 text-white' : 'bg-white border-stroke text-stroke'
                                } ${isCurrent ? 'scale-110 shadow-lg shadow-primary/30' : ''}`}>
                                <Icon className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <span className={`text-xs md:text-sm font-bold absolute -bottom-6 ${isActive ? 'text-primary' : 'text-text-sec/50'}`}>
                                {s.label}
                            </span>
                        </div>
                    );
                })}
            </div>
            <div className="bg-white border border-stroke rounded-3xl p-6 md:p-10 shadow-sm mt-8">
                {step === 1 && (
                    <form onSubmit={handleNextStep} className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col gap-8">
                        <div className="flex items-center gap-2 border-b border-stroke pb-4">
                            <MapPin className="w-6 h-6 text-primary" />
                            <h2 className="text-xl font-black text-text-main">آدرس تحویل‌گیرنده</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-text-sec">نام و نام خانوادگی <span className="text-red-500">*</span></label>
                                <input required name="fullName" value={formData.fullName} onChange={handleInputChange} type="text" className="w-full bg-bg-sec border border-stroke rounded-xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-text-main" placeholder="مثال: فرزاد وطندوست" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-text-sec">شماره موبایل <span className="text-red-500">*</span></label>
                                <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" dir="ltr" className="w-full bg-bg-sec border border-stroke rounded-xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-text-main text-left" placeholder="0912 345 6789" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-text-sec">استان <span className="text-red-500">*</span></label>
                                <input required name="province" value={formData.province} onChange={handleInputChange} type="text" className="w-full bg-bg-sec border border-stroke rounded-xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-text-main" placeholder="مثال: تهران" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-text-sec">شهر <span className="text-red-500">*</span></label>
                                <input required name="city" value={formData.city} onChange={handleInputChange} type="text" className="w-full bg-bg-sec border border-stroke rounded-xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-text-main" placeholder="مثال: تهران" />
                            </div>
                            <div className="flex flex-col gap-2 md:col-span-2">
                                <label className="text-sm font-bold text-text-sec">آدرس دقیق <span className="text-red-500">*</span></label>
                                <textarea required name="address" value={formData.address} onChange={handleInputChange} rows={3} className="w-full bg-bg-sec border border-stroke rounded-xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-text-main resize-none" placeholder="نام خیابان، کوچه، پلاک، واحد..."></textarea>
                            </div>
                            <div className="flex flex-col gap-2 md:col-span-2">
                                <label className="text-sm font-bold text-text-sec">کد پستی (اختیاری)</label>
                                <input name="postalCode" value={formData.postalCode} onChange={handleInputChange} type="text" dir="ltr" className="w-full bg-bg-sec border border-stroke rounded-xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-text-main text-left" placeholder="1234567890" />
                            </div>
                        </div>
                        <div className="flex justify-end border-t border-stroke pt-6">
                            <button type="submit" className="w-full md:w-auto bg-primary text-white font-black py-4 px-12 rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95">
                                ثبت و ادامه
                            </button>
                        </div>
                    </form>
                )}
                {step === 2 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col gap-8">
                        <div className="flex items-center gap-2 border-b border-stroke pb-4">
                            <Truck className="w-6 h-6 text-primary" />
                            <h2 className="text-xl font-black text-text-main">انتخاب روش ارسال</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <label className={`relative flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all ${shippingMethod === 'standard' ? 'border-primary bg-primary/5' : 'border-stroke bg-bg-sec hover:border-primary/50'}`}>
                                <div className="flex items-center gap-3">
                                    <input type="radio" name="shipping" value="standard" checked={shippingMethod === 'standard'} onChange={() => setShippingMethod('standard')} className="w-5 h-5 accent-primary" />
                                    <div className="flex flex-col">
                                        <span className="font-bold text-text-main">ارسال استاندارد (پست پیشتاز)</span>
                                        <span className="text-xs text-text-sec mt-1">زمان تحویل: ۳ تا ۵ روز کاری</span>
                                    </div>
                                </div>
                                <span className="font-bold text-text-main">۳۵,۰۰۰ <span className="text-[10px] text-text-sec">تومان</span></span>
                            </label>
                            <label className={`relative flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all ${shippingMethod === 'express' ? 'border-primary bg-primary/5' : 'border-stroke bg-bg-sec hover:border-primary/50'}`}>
                                <div className="flex items-center gap-3">
                                    <input type="radio" name="shipping" value="express" checked={shippingMethod === 'express'} onChange={() => setShippingMethod('express')} className="w-5 h-5 accent-primary" />
                                    <div className="flex flex-col">
                                        <span className="font-bold text-text-main">ارسال سریع (تیپاکس / پیک)</span>
                                        <span className="text-xs text-text-sec mt-1">زمان تحویل: ۱ تا ۲ روز کاری</span>
                                    </div>
                                </div>
                                <span className="font-bold text-text-main">۵۰,۰۰۰ <span className="text-[10px] text-text-sec">تومان</span></span>
                            </label>
                        </div>
                        <div className="bg-bg-sec/50 border border-stroke rounded-2xl p-6 mt-4">
                            <h3 className="font-bold text-text-main mb-4 flex items-center gap-2">
                                <ShoppingBag className="w-5 h-5 text-primary" />
                                خلاصه سفارش
                            </h3>
                            <div className="flex flex-col gap-3 text-sm">
                                <div className="flex justify-between text-text-sec">
                                    <span>مبلغ کالاها ({items.length} کالا)</span>
                                    <span>{cartTotal.toLocaleString('fa-IR')} تومان</span>
                                </div>
                                <div className="flex justify-between text-text-sec">
                                    <span>هزینه ارسال</span>
                                    <span>{shippingCost.toLocaleString('fa-IR')} تومان</span>
                                </div>
                                <hr className="border-stroke my-2" />
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-text-main text-base">مبلغ قابل پرداخت</span>
                                    <span className="font-black text-primary text-xl">{finalTotal.toLocaleString('fa-IR')} <span className="text-xs text-text-sec font-normal">تومان</span></span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col-reverse md:flex-row gap-4 justify-between border-t border-stroke pt-6">
                            <button onClick={() => setStep(1)} className=" shadow px-8 py-4 rounded-xl bg-bg-sec font-bold text-text-sec hover:bg-stroke border border-transparent hover:border-stroke transition-all">
                                مرحله قبل
                            </button>
                            <button
                                onClick={handlePayment}
                                disabled={isProcessing}
                                className="w-full md:w-auto flex items-center justify-center gap-2 bg-green-600 text-white font-black py-4 px-12 rounded-xl hover:bg-green-700 transition-all shadow-lg shadow-green-600/20 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        در حال انتقال به درگاه...
                                    </>
                                ) : (
                                    <>
                                        پرداخت امن زرین‌پال
                                        <CreditCard className="w-5 h-5 mr-1" />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                )}
                {step === 3 && (
                    <div className="animate-in zoom-in-95 duration-500 flex flex-col items-center justify-center text-center py-10 gap-6">
                        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center border-4 border-green-50 mb-2">
                            <CheckCircle2 className="w-12 h-12" />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-black text-text-main mb-3">پرداخت با موفقیت انجام شد!</h1>
                            <p className="text-text-sec leading-relaxed max-w-md mx-auto">
                                سفارش شما با موفقیت ثبت شد و در صف پردازش قرار گرفت. از اینکه پریمیوم‌شاپ را انتخاب کردید سپاسگزاریم.
                            </p>
                        </div>
                        <div className="bg-bg-sec border border-stroke rounded-2xl p-6 w-full max-w-sm mt-2">
                            <p className="text-sm text-text-sec mb-2">کد پیگیری سفارش شما:</p>
                            <span className="text-2xl font-black tracking-widest text-primary dir-ltr block">{orderId}</span>
                        </div>
                        <div className="flex items-center gap-4 mt-6 w-full max-w-sm">
                            <Link href="/profile" className="flex-1 bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary/90 transition-all shadow-md active:scale-95">
                                پیگیری سفارش
                            </Link>
                            <Link href="/" className="flex-1 bg-white border border-stroke text-text-main font-bold py-3.5 rounded-xl hover:bg-bg-sec transition-all active:scale-95">
                                بازگشت به خانه
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}