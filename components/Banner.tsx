import Link from 'next/link';
import { Sparkles, ArrowLeft, Gem, ShieldCheck } from 'lucide-react';

export default function Banner() {
  return (
    <section className="w-full mt-8 md:mt-12">
      <div className="relative w-full overflow-hidden rounded-3xl bg-primary text-white shadow-xl shadow-primary/20 flex flex-col md:flex-row items-center justify-between p-8 md:p-12 lg:p-16">
        <div className="absolute top-0 right-0 w-100 h-100 bg-white/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-75 h-75 bg-secondary/20 rounded-full blur-[60px] translate-y-1/3 -translate-x-1/3"></div>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-size-[24px_24px]"></div>
        <div className="relative z-10 flex flex-col gap-5 text-center md:text-right md:w-1/2">
          <div className="flex items-center justify-center md:justify-start gap-2 text-secondary font-bold text-sm mb-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Sparkles className="w-5 h-5" />
            <span className="tracking-wide">کالکشن جدید پریمیوم‌شاپ</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-white animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
            جشنواره فروش ویژه <br />
            <span className="text-transparent bg-clip-text bg-linear-to-l from-secondary to-yellow-500">
              تا ۵۰٪ تخفیف
            </span>
          </h1>
          <p className="text-white/80 text-sm md:text-base leading-relaxed mt-2 max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            بهترین و باکیفیت‌ترین محصولات را با تخفیف‌های استثنایی و ارسال رایگان تهیه کنید. تجربه یک خرید بی‌نقص و مطمئن در انتظار شماست!
          </p>
          <div className="mt-4 flex justify-center md:justify-start animate-in fade-in slide-in-from-bottom-10 duration-700 delay-500">
            <Link
              href="/shop"
              className="group flex items-center gap-2 bg-secondary text-primary font-black px-8 py-4 rounded-2xl hover:bg-bg-sec hover:shadow-lg hover:shadow-white/20 transition-all duration-300 active:scale-95"
            >
              مشاهده محصولات
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1.5 transition-transform" />
            </Link>
          </div>
        </div>
        <div className="relative z-10 hidden md:flex items-center justify-center w-1/2 h-full mt-10 md:mt-0">
          <div className="relative w-64 h-64 lg:w-72 lg:h-72 border-4 border-dashed border-secondary/30 rounded-full flex items-center justify-center animate-[spin_20s_linear_infinite]">
            <div className="w-48 h-48 lg:w-56 lg:h-56 bg-linear-to-tr from-secondary/40 to-white/10 rounded-full backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl animate-[spin_15s_linear_infinite_reverse]">
              <Gem className="w-20 h-20 text-secondary opacity-80" strokeWidth={1} />
            </div>
          </div>
          <div className="absolute top-4 right-10 lg:right-16 bg-white text-primary font-black px-5 py-2.5 rounded-2xl shadow-xl rotate-12 hover:rotate-0 transition-transform duration-300 cursor-default">
            تضمین کیفیت
          </div>
          <div className="absolute bottom-10 left-4 lg:left-10 bg-secondary text-primary font-black px-5 py-2.5 rounded-2xl shadow-xl -rotate-12 hover:rotate-0 transition-transform duration-300 flex items-center gap-1.5 cursor-default">
            <ShieldCheck className="w-5 h-5" />
            خرید امن
          </div>
        </div>
      </div>
    </section>
  );
}