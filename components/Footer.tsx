import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Send, PhoneCall, Mail, ChevronLeft, Gem, Heart, Globe } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="w-full bg-bg-sec border-t border-stroke pt-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-125 h-125 bg-secondary/10 rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/3"></div>
            <div className="w-[90%] lg:w-[85%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12">
                <div className="lg:col-span-4 flex flex-col gap-6">
                    <Link href="/" className="flex items-center gap-2 group w-fit">
                        <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary group-hover:text-white text-primary transition-all duration-300">
                            <Gem className="w-6 h-6" />
                        </div>
                        <span className="font-black text-2xl tracking-tighter bg-linear-to-l from-primary to-yellow-600 bg-clip-text text-transparent">
                            پریمیوم‌شاپ
                        </span>
                    </Link>
                    <p className="text-sm text-text-sec leading-relaxed text-justify pl-4 md:pl-8">
                        پریمیوم‌شاپ، انتخابی برای کسانی که به کیفیت و اصالت اهمیت می‌دهند. ما با ارائه بهترین محصولات و پشتیبانی ۲۴ ساعته، تجربه یک خرید اینترنتی لذت‌بخش و مطمئن را برای شما رقم می‌زنیم.
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                        <Link href="https://instagram.com" target="_blank" className="w-11 h-11 rounded-2xl bg-bg-sec border border-stroke flex items-center justify-center text-text-sec hover:bg-linear-to-tr hover:from-yellow-500 hover:via-red-500 hover:to-pink-500 hover:text-white hover:border-transparent hover:-translate-y-1 transition-all duration-300 shadow-sm">
                            <Globe className="w-5 h-5" />
                        </Link>
                        <Link href="https://telegram.org" target="_blank" className="w-11 h-11 rounded-2xl bg-bg-sec border border-stroke flex items-center justify-center text-text-sec hover:bg-blue-500 hover:text-white hover:border-blue-500 hover:-translate-y-1 transition-all duration-300 shadow-sm">
                            <Send className="w-5 h-5 ml-1" />
                        </Link>
                        <Link href="https://rubika.ir" target="_blank" className="w-11 h-11 rounded-2xl bg-bg-sec border border-stroke flex items-center justify-center text-text-sec hover:bg-orange-500 hover:text-white hover:border-orange-500 hover:-translate-y-1 transition-all duration-300 shadow-sm">
                            <PhoneCall className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
                <div className="lg:col-span-2 flex flex-col gap-5">
                    <h3 className="text-lg font-black text-text-main flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        دسترسی سریع
                    </h3>
                    <div className="flex flex-col gap-3 mt-1">
                        {[
                            { name: 'فروشگاه', link: '/shop' },
                            { name: 'وبلاگ', link: '/blog' },
                            { name: 'پیگیری سفارش', link: '/tracking' },
                            { name: 'تماس با ما', link: '/contact' },
                            { name: 'قوانین و مقررات', link: '/rules' },
                        ].map((item, index) => (
                            <Link key={index} href={item.link} className="text-sm text-text-sec hover:text-primary hover:-translate-x-1 transition-all flex items-center gap-1.5 w-fit">
                                <ChevronLeft className="w-4 h-4 opacity-50" />
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="lg:col-span-3 flex flex-col gap-5">
                    <h3 className="text-lg font-black text-text-main flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        ارتباط با ما
                    </h3>
                    <div className="flex flex-col gap-4 mt-1">
                        <div className="flex items-start gap-3 text-text-sec text-sm leading-relaxed">
                            <div className="w-8 h-8 rounded-full bg-secondary/30 flex items-center justify-center shrink-0 text-primary">
                                <MapPin className="w-4 h-4" />
                            </div>
                            <span className="mt-1">تهران، خیابان ولیعصر، تقاطع میرداماد، مجتمع تجاری پریمیوم، طبقه ۵، واحد ۴۲</span>
                        </div>
                        <div className="flex items-center gap-3 text-text-sec text-sm">
                            <div className="w-8 h-8 rounded-full bg-secondary/30 flex items-center justify-center shrink-0 text-primary">
                                <Phone className="w-4 h-4" />
                            </div>
                            <span className="font-medium mt-1" dir="ltr">021 - 8877 6655</span>
                        </div>
                        <div className="flex items-center gap-3 text-text-sec text-sm">
                            <div className="w-8 h-8 rounded-full bg-secondary/30 flex items-center justify-center shrink-0 text-primary">
                                <Mail className="w-4 h-4" />
                            </div>
                            <span className="font-medium mt-1" dir="ltr">info@premiumshop.com</span>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-3 flex flex-col gap-5">
                    <h3 className="text-lg font-black text-text-main flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        نمادهای اعتماد
                    </h3>
                    <div className="grid grid-cols-2 gap-3 mt-1">
                        <div className="bg-bg-sec border border-stroke rounded-2xl p-4 flex items-center justify-center hover:border-primary/40 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                            <div className="relative w-16 h-16 grayscale hover:grayscale-0 transition-all duration-300">
                                <Image src="/enamad.png" alt="اینماد" fill className="object-contain" />
                            </div>
                        </div>
                        <div className="bg-bg-sec border border-stroke rounded-2xl p-4 flex items-center justify-center hover:border-primary/40 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                            <div className="relative w-16 h-16 grayscale hover:grayscale-0 transition-all duration-300">
                                <Image src="/zarinpal.png" alt="زرین پال" fill className="object-contain" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-primary text-white py-5 relative z-10">
                <div className="w-[90%] lg:w-[85%] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center">
                    <p className="text-xs md:text-sm font-medium opacity-90">
                        کلیه حقوق این سایت متعلق به <span className="font-black">پریمیوم‌شاپ</span> می‌باشد.
                    </p>
                    <div className="flex items-center gap-1.5 text-xs md:text-sm opacity-80" dir="ltr">
                        <span>Designed with</span>
                        <Heart className="w-4 h-4 text-red-400 fill-current animate-pulse" />
                        <span>by Farzad</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}