"use client";

import { MapPin, Phone, Mail, Send, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import Swal from 'sweetalert2';

export default function ContactPage() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.currentTarget.reset();
        Swal.fire({
            title: 'پیام شما ارسال شد!',
            text: 'همکاران ما در اسرع وقت با شما تماس خواهند گرفت.',
            icon: 'success',
            confirmButtonText: 'متوجه شدم',
            confirmButtonColor: '#6E543D',
            customClass: {
                popup: 'rounded-3xl font-sans bg-bg-main border border-stroke',
                title: 'font-black text-text-main',
                htmlContainer: 'text-text-sec text-sm mt-2',
                confirmButton: 'font-bold rounded-xl px-8 py-3',
            }
        });
    };

    return (
        <main className="w-[90%] lg:w-[85%] mx-auto py-10 md:py-16 min-h-screen">
            <div className="flex flex-col items-center justify-center text-center mb-16 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-2">
                    <MessageSquare className="w-8 h-8" />
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-text-main">تماس با ما</h1>
                <p className="text-text-sec md:text-lg font-medium max-w-2xl leading-relaxed">
                    ما همیشه مشتاق شنیدن صدای شما هستیم. اگر سوال، پیشنهاد یا انتقادی دارید، از طریق راه‌های زیر با تیم پشتیبانی پریمیوم‌شاپ در ارتباط باشید.
                </p>
            </div>
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                <div className="w-full lg:w-1/3 flex flex-col gap-4 animate-in fade-in slide-in-from-right-8 duration-700 delay-150">
                    <div className="bg-bg-sec border border-stroke rounded-3xl p-6 flex items-start gap-4 hover:border-primary/50 hover:shadow-md transition-all group">
                        <div className="w-12 h-12 bg-white dark:bg-zinc-800 rounded-xl flex items-center justify-center text-primary shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <h3 className="font-black text-text-main text-lg">آدرس دفتر مرکزی</h3>
                            <p className="text-sm text-text-sec leading-relaxed">
                                تهران، خیابان ولیعصر، بالاتر از میدان ونک، کوچه فرضی، پلاک ۱۲، واحد ۳
                            </p>
                        </div>
                    </div>
                    <div className="bg-bg-sec border border-stroke rounded-3xl p-6 flex items-start gap-4 hover:border-primary/50 hover:shadow-md transition-all group">
                        <div className="w-12 h-12 bg-white dark:bg-zinc-800 rounded-xl flex items-center justify-center text-primary shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                            <Phone className="w-6 h-6" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <h3 className="font-black text-text-main text-lg">تلفن تماس</h3>
                            <p className="text-sm text-text-sec leading-relaxed" dir="ltr">
                                ۰۲۱ - ۸۸۷۷ ۶۶۵۵
                            </p>
                            <p className="text-sm text-text-sec leading-relaxed" dir="ltr">
                                ۰۹۱۲ ۳۴۵ ۶۷۸۹
                            </p>
                        </div>
                    </div>
                    <div className="bg-bg-sec border border-stroke rounded-3xl p-6 flex items-start gap-4 hover:border-primary/50 hover:shadow-md transition-all group">
                        <div className="w-12 h-12 bg-white dark:bg-zinc-800 rounded-xl flex items-center justify-center text-primary shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                            <Mail className="w-6 h-6" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <h3 className="font-black text-text-main text-lg">ایمیل پشتیبانی</h3>
                            <Link href="mailto:info@premiumshop.com" className="text-sm text-text-sec leading-relaxed hover:text-primary transition-colors" dir="ltr">
                                info@premiumshop.com
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-2/3 bg-bg-sec border border-stroke rounded-3xl p-8 md:p-10 shadow-sm ">
                    <h2 className="text-2xl font-black text-text-main mb-6">ارسال پیام مستقیم</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-text-sec">نام و نام خانوادگی <span className="text-red-500">*</span></label>
                                <input required type="text" className="w-full bg-bg-main border border-stroke rounded-2xl py-3.5 px-5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-text-main" placeholder="مثلاً: فرزاد وطندوست" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-text-sec">شماره موبایل <span className="text-red-500">*</span></label>
                                <input required type="tel" dir="ltr" className="w-full bg-bg-main border border-stroke rounded-2xl py-3.5 px-5 text-left focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-text-main" placeholder="0912 345 6789" />
                            </div>
                            <div className="flex flex-col gap-2 md:col-span-2">
                                <label className="text-sm font-bold text-text-sec">موضوع پیام</label>
                                <input type="text" className="w-full bg-bg-main border border-stroke rounded-2xl py-3.5 px-5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-text-main" placeholder="پیام شما در چه موردی است؟" />
                            </div>
                            <div className="flex flex-col gap-2 md:col-span-2">
                                <label className="text-sm font-bold text-text-sec">متن پیام <span className="text-red-500">*</span></label>
                                <textarea required rows={5} className="w-full bg-bg-main border border-stroke rounded-2xl py-3.5 px-5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-text-main resize-none" placeholder="متن پیام خود را اینجا بنویسید..."></textarea>
                            </div>
                        </div>
                        <div className="flex justify-end pt-2 border-t border-stroke mt-2">
                            <button type="submit" className="w-full md:w-auto flex items-center justify-center gap-2 bg-primary text-white font-black py-4 px-10 rounded-2xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95">
                                <Send className="w-5 h-5" />
                                ارسال پیام
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}