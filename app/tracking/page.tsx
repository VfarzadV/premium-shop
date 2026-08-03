"use client";

import { useState } from 'react';
import { PackageSearch, Search, Loader2, Package, Truck, CheckCircle2, MapPin } from 'lucide-react';

export default function TrackingPage() {
    const [trackingCode, setTrackingCode] = useState('');
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'found' | 'error'>('idle');

    const handleTrack = (e: React.FormEvent) => {
        e.preventDefault();
        if (!trackingCode || !phone) return;
        setStatus('loading');
        setTimeout(() => {
            if (trackingCode.startsWith('PSH-')) {
                setStatus('found');
            } else {
                setStatus('error');
            }
        }, 1500);
    };
    const steps = [
        { id: 1, title: 'ثبت سفارش', desc: 'سفارش با موفقیت ثبت شد', icon: Package, isCompleted: true },
        { id: 2, title: 'پردازش انبار', desc: 'در حال بسته‌بندی کالا', icon: PackageSearch, isCompleted: true },
        { id: 3, title: 'تحویل به پست', desc: 'ارسال به مرکز مبادلات', icon: Truck, isCompleted: false },
        { id: 4, title: 'تحویل به مشتری', desc: 'دریافت توسط شما', icon: CheckCircle2, isCompleted: false },
    ];

    return (
        <main className="w-[90%] lg:w-[60%] mx-auto py-10 md:py-16 min-h-[80vh] flex flex-col items-center">
            <div className="flex flex-col items-center justify-center text-center gap-4 mb-10 w-full">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-2 shadow-sm">
                    <MapPin className="w-8 h-8" />
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-text-main">پیگیری سفارشات</h1>
                <p className="text-text-sec font-medium max-w-lg leading-relaxed mt-2">
                    برای اطلاع از آخرین وضعیت مرسوله خود، کد پیگیری سفارش و شماره موبایل ثبت شده را وارد کنید.
                </p>
            </div>
            <div className="w-full bg-bg-sec border border-stroke rounded-3xl p-6 md:p-8 shadow-sm ">
                <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 flex flex-col gap-2">
                        <label className="text-sm font-bold text-text-sec">کد سفارش</label>
                        <input
                            type="text"
                            dir="ltr"
                            value={trackingCode}
                            onChange={(e) => setTrackingCode(e.target.value)}
                            className="w-full bg-bg-main border border-stroke rounded-2xl py-3.5 px-5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-text-main text-left font-medium"
                            placeholder="مثال: PSH-123456"
                            required
                        />
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                        <label className="text-sm font-bold text-text-sec">شماره موبایل</label>
                        <input
                            type="tel"
                            dir="ltr"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full bg-bg-main border border-stroke rounded-2xl py-3.5 px-5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-text-main text-left font-medium"
                            placeholder="09123456789"
                            required
                        />
                    </div>
                    <div className="flex flex-col justify-end">
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full md:w-32 flex items-center justify-center gap-2 bg-primary text-white font-black h-[52px] rounded-2xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95 disabled:opacity-70"
                        >
                            {status === 'loading' ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                <>
                                    <Search className="w-5 h-5" />
                                    پیگیری
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
            {status === 'error' && (
                <div className="w-full mt-6 bg-red-50 text-red-600 border border-red-100 rounded-2xl p-5 text-center font-bold animate-in fade-in zoom-in-95 duration-300">
                    سفارشی با این مشخصات یافت نشد. لطفاً اطلاعات را بررسی کنید.
                </div>
            )}
            {status === 'found' && (
                <div className="w-full mt-8 bg-bg-sec border border-stroke rounded-3xl p-6 md:p-10 shadow-sm ">
                    <div className="flex items-center justify-between mb-8 border-b border-stroke pb-6">
                        <div className="flex flex-col gap-1">
                            <span className="text-sm text-text-sec font-bold">شماره سفارش:</span>
                            <span className="font-black text-xl text-primary tracking-widest dir-ltr">{trackingCode}</span>
                        </div>
                        <div className="bg-secondary/20 text-primary px-4 py-2 rounded-xl font-bold text-sm border border-secondary/50">
                            در حال پردازش
                        </div>
                    </div>
                    <div className="relative flex flex-col md:flex-row justify-between gap-8 md:gap-0 mt-4">
                        <div className="hidden md:block absolute top-6 left-10 right-10 h-1 bg-stroke -z-10">
                            <div className="h-full bg-primary transition-all duration-1000 w-1/2"></div>
                        </div>
                        <div className="md:hidden absolute top-0 bottom-0 right-6 w-1 bg-stroke -z-10">
                            <div className="w-full bg-primary transition-all duration-1000 h-1/2"></div>
                        </div>
                        {steps.map((step) => {
                            const Icon = step.icon;
                            return (
                                <div key={step.id} className="flex md:flex-col items-center gap-4 md:gap-3 relative z-10 w-full md:w-1/4">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${step.isCompleted
                                            ? 'bg-primary border-primary/20 text-white shadow-lg shadow-primary/30'
                                            : 'bg-bg-main border-stroke text-stroke'
                                        }`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex flex-col md:items-center md:text-center mt-1">
                                        <span className={`font-black text-sm md:text-base ${step.isCompleted ? 'text-text-main' : 'text-text-sec'}`}>
                                            {step.title}
                                        </span>
                                        <span className="text-xs text-text-sec mt-1">{step.desc}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </main>
    );
}