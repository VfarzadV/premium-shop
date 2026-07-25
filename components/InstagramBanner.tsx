import { Globe } from 'lucide-react';
import Link from 'next/link';

export default function InstagramBanner() {
  return (
    <section className="w-full mt-12 bg-secondary/40 rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border border-secondary/50">
      <div className="flex flex-col gap-2 text-center md:text-right">
        <h2 className="text-2xl md:text-3xl font-black text-text-main">
          پیج اینستاگرام ما را دنبال کنید!
        </h2>
        <p className="text-text-sec mt-1">
          برای دسترسی به محتواهای بیشتر و تخفیف‌های روزانه، پیج ما را دنبال کنید
        </p>
      </div>
      
      <Link 
        href="https://instagram.com" 
        target="_blank" 
        className="flex items-center gap-2 bg-white border border-stroke px-6 py-3 rounded-xl font-bold text-text-main shadow-sm hover:shadow-md hover:text-primary transition-all shrink-0"
      >
        <Globe className="w-6 h-6" />
        لینک اینستاگرام
      </Link>
    </section>
  );
}