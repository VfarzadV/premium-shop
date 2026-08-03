import { ShieldCheck, Zap, Heart } from 'lucide-react';

const worthiness = [
    { id: 1, title: 'تضمین اصالت کالا', desc: 'تمامی محصولات موجود در پریمیوم‌شاپ از تامین‌کنندگان معتبر تهیه شده و با ضمانت اصالت فیزیکی به دست شما می‌رسند.', icon: ShieldCheck },
    { id: 2, title: 'پردازش و ارسال سریع', desc: 'ما ارزش زمان شما را می‌دانیم؛ سفارشات با استفاده از بهترین شبکه‌های پستی در کوتاه‌ترین زمان ممکن پردازش و ارسال می‌شوند.', icon: Zap },
    { id: 3, title: 'مشتری مداری واقعی', desc: 'کار ما با فروش تمام نمی‌شود. پشتیبانی دلسوزانه ما قبل، حین و بعد از خرید در کنار شماست تا خیالتان کاملاً راحت باشد.', icon: Heart },
];

export default function Worthiness() {
    return (
        <section className="w-full mt-12 mb-12 md:mt-16">
            <div className="flex flex-col gap-10 bg-bg-sec border border-stroke rounded-[2.5rem] p-8 md:p-12 mt-4">
                <div className="text-center">
                    <h2 className="text-2xl md:text-3xl font-black text-text-main mb-3">ارزش‌های اصلی ما</h2>
                    <p className="text-text-sec">اصولی که هر روز ما را در مسیر پیشرفت هدایت می‌کنند.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">

                    {worthiness.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div key={item.id} className="bg-bg-main border border-stroke rounded-3xl p-8 flex flex-col items-center text-center gap-4 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group">
                                <div className="w-16 h-16 bg-bg-sec border border-stroke rounded-2xl flex items-center justify-center text-primary shadow-sm group-hover:-translate-y-2 transition-transform duration-300">
                                    <Icon className="w-8 h-8" />
                                </div>
                                <h3 className="font-black text-lg text-text-main">{item.title}</h3>
                                <p className="text-sm text-text-sec leading-relaxed">{item.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}