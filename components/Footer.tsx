import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Globe, Send, PhoneCall } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="w-full bg-bg-sec border-t border-stroke mt-20 pt-12">
            <div className="w-[85%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10">
                <div className="flex items-center justify-center lg:justify-start">
                    <div className="bg-bg-main p-6 rounded-2xl border border-stroke shadow-sm flex items-center justify-center gap-6 w-full max-w-xs">
                        <div className="relative w-20 h-24">
                            <Image src="/enamad.png" alt="اینماد" fill className="object-contain" />
                        </div>
                        <div className="h-16 w-px bg-stroke"></div>
                        <div className="relative w-20 h-24">
                            <Image src="/zarinpal.png" alt="زرین پال" fill className="object-contain" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4 text-right">
                    <h3 className="text-lg font-bold text-text-main border-r-4 border-primary pr-3">
                        تماس با ما
                    </h3>
                    <div className="flex items-start gap-2 text-text-sec text-sm leading-relaxed mt-2">
                        <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span>آدرس: تهران، خیابان آزادی، پلاک ۱۲۳</span>
                    </div>
                    <div className="flex items-center gap-2 text-text-sec text-sm">
                        <Phone className="w-4 h-4 text-primary shrink-0" />
                        <span>تلفن تماس: ۰۲۱-۱۲۳۴۵۶۷۸</span>
                    </div>
                    <h4 className="text-base font-bold text-text-main border-r-4 border-primary pr-3 mt-4">
                        سوشیال مدیا
                    </h4>
                    <div className="flex items-center gap-3 mt-1">
                        <Link href="https://instagram.com" target="_blank" className="w-10 h-10 rounded-full bg-bg-main border border-stroke flex items-center justify-center text-text-sec hover:text-primary hover:border-primary transition-colors">
                            <Globe className="w-5 h-5" />
                        </Link>
                        <Link href="https://telegram.org" target="_blank" className="w-10 h-10 rounded-full bg-bg-main border border-stroke flex items-center justify-center text-text-sec hover:text-primary hover:border-primary transition-colors">
                            <Send className="w-5 h-5" />
                        </Link>
                        <Link href="https://rubika.ir" target="_blank" className="w-10 h-10 rounded-full bg-bg-main border border-stroke flex items-center justify-center text-text-sec hover:text-primary hover:border-primary transition-colors">
                            <PhoneCall className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col gap-3 text-right">
                    <h3 className="text-lg font-bold text-text-main border-r-4 border-primary pr-3 mb-2">
                        لینک‌های مفید
                    </h3>
                    <Link href="/contact" className="text-sm text-text-sec hover:text-primary transition-colors">ارتباط با ما</Link>
                    <Link href="/tracking" className="text-sm text-text-sec hover:text-primary transition-colors">پیگیری سفارش</Link>
                    <Link href="/rules" className="text-sm text-text-sec hover:text-primary transition-colors">قوانین وبسایت</Link>
                    <Link href="/shop" className="text-sm text-text-sec hover:text-primary transition-colors">فروشگاه</Link>
                    <Link href="/blog" className="text-sm text-text-sec hover:text-primary transition-colors">وبلاگ</Link>
                </div>
                <div className="flex flex-col gap-3 text-right">
                    <h3 className="text-lg font-bold text-text-main border-r-4 border-primary pr-3 mb-2">
                        درباره فروشگاه ما
                    </h3>
                    <p className="text-sm text-text-sec leading-loose text-justify">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز است.
                    </p>
                </div>
            </div>
            <div className="bg-primary text-white text-xs md:text-sm py-4">
                <div className="w-[85%] mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center">
                    <span>© تمامی حقوق این وبسایت متعلق به این فروشگاه می‌باشد.</span>
                    <span className="opacity-80">طراحی و پیاده‌سازی توسط فرزاد</span>
                </div>
            </div>
        </footer>
    );
}