import { Store, Users, Target } from 'lucide-react';
import Link from 'next/link';
import Worthiness from '@/components/Worthiness';

export default function AboutPage() {
    return (
        <main className="w-[90%] lg:w-[85%] mx-auto py-10 md:py-16 min-h-screen flex flex-col gap-16">
            <div className="flex flex-col items-center justify-center text-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-2 shadow-sm">
                    <Store className="w-8 h-8" />
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-text-main">درباره پریمیوم‌شاپ</h1>
                <p className="text-text-sec md:text-lg font-medium max-w-3xl leading-relaxed">
                    داستان ما از یک ایده ساده شروع شد: ایجاد فضایی که در آن هر کسی بتواند بهترین و باکیفیت‌ترین محصولات را با خیال راحت، قیمت منصفانه و در سریع‌ترین زمان ممکن خریداری کند.
                </p>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-16">
                <div className="w-full md:w-1/2 relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden bg-bg-sec border border-stroke animate-in fade-in slide-in-from-right-8 duration-700 delay-150 group">
                    <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-secondary/20 to-bg-main p-8 flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,var(--color-primary)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                        <div className="relative z-10 w-32 h-32 bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center shadow-2xl border border-stroke">
                            <Target className="w-14 h-14 text-primary opacity-90" />
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 flex flex-col gap-6 animate-in fade-in slide-in-from-left-8 duration-700 delay-300">
                    <h2 className="text-2xl md:text-3xl font-black text-text-main">هدف ما، لبخند رضایت شماست</h2>
                    <p className="text-text-sec leading-relaxed text-justify">
                        پریمیوم‌شاپ با هدف ایجاد تغییر مثبت در تجربه خرید اینترنتی تاسیس شد. ما باور داریم که خرید آنلاین نباید با استرس، تاخیر و نگرانی از اصالت کالا همراه باشد. به همین دلیل، تیمی از متخصصان را گرد هم آوردیم تا پلتفرمی امن، سریع و کاربرپسند را برای شما فراهم کنیم.
                    </p>
                    <p className="text-text-sec leading-relaxed text-justify">
                        تلاش ما این است که با ارائه محصولات اورجینال، تنوع بی‌نظیر و پشتیبانی واقعیِ ۲۴ ساعته، به اولین و مطمئن‌ترین انتخاب شما برای خریدهای دیجیتال و روزمره تبدیل شویم.
                    </p>
                    <div className="flex flex-wrap items-center gap-4 mt-2">
                        <div className="flex items-center gap-2 bg-bg-sec border border-stroke px-4 py-2.5 rounded-xl shadow-sm">
                            <Users className="w-5 h-5 text-primary" />
                            <span className="font-bold text-sm text-text-main">+۱۰,۰۰۰ مشتری وفادار</span>
                        </div>
                        <Link href="/shop" className="bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors border border-transparent hover:border-primary px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2">
                            مشاهده فروشگاه
                        </Link>
                    </div>
                </div>
            </div>
            <Worthiness />
        </main>
    );
}