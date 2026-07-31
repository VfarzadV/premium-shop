import Link from 'next/link';
import { Globe, ArrowLeft, Sparkles } from 'lucide-react';

export default function InstagramBanner() {
  return (
    <section className="w-full mt-12 md:mt-16">
      <div className="relative overflow-hidden bg-bg-sec border border-stroke rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/4 group-hover:scale-110 transition-transform duration-700"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full blur-[50px] translate-y-1/2 -translate-x-1/4 group-hover:scale-110 transition-transform duration-700"></div>
        <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-right gap-4">
          <div className="flex items-center gap-2 bg-secondary/30 text-primary font-bold px-4 py-1.5 rounded-full text-xs md:text-sm border border-secondary/50 shadow-sm">
            <Sparkles className="w-4 h-4" />
            خانواده پریمیوم‌شاپ
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-text-main leading-tight tracking-tight">
            ما را در <span className="text-transparent bg-clip-text bg-linear-to-r from-pink-500 via-red-500 to-yellow-500">اینستاگرام</span> دنبال کنید!
          </h2>
          <p className="text-text-sec text-sm md:text-base leading-relaxed max-w-lg mt-1">
            برای اطلاع از جدیدترین محصولات، تخفیف‌های شگفت‌انگیز و کدهای تخفیف اختصاصی، به پیج اینستاگرام ما سر بزنید و همراه ما باشید.
          </p>
        </div>
        <div className="relative z-10 shrink-0 mt-4 md:mt-0">
          <Link
            href="https://instagram.com"
            target="_blank"
            className="flex items-center gap-3 bg-bg-sec border-2 border-stroke px-6 md:px-8 py-4 rounded-2xl font-black text-text-main hover:border-primary hover:bg-primary hover:text-white shadow-sm hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 active:scale-95"
          >
            <Globe className="w-6 h-6" />
            <span>مشاهده پیج ما</span>
            <ArrowLeft className="w-5 h-5 mr-2 opacity-70" />
          </Link>
        </div>
      </div>
    </section>
  );
}