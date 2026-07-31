import { Truck, ShieldCheck, Box, Headphones, Award } from 'lucide-react';

const features = [
    { id: 1, title: 'ارسال سریع و مطمئن', desc: 'تحویل سفارشات در کمترین زمان به سراسر کشور', icon: Truck },
    { id: 2, title: 'تضمین اصالت کالا', desc: 'تمامی محصولات با گارانتی معتبر ارائه می‌شوند', icon: ShieldCheck },
    { id: 3, title: 'بسته‌بندی پریمیوم', desc: 'ارسال ایمن با جعبه‌های مقاوم و اختصاصی', icon: Box },
    { id: 4, title: 'پشتیبانی ۲۴ ساعته', desc: 'پاسخگویی به شما در تمامی روزهای هفته', icon: Headphones },
];

export default function Features() {
    return (
        <section className="w-full mt-12 md:mt-16">
            <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-2 text-text-main">
                    <Award className="w-6 h-6 text-text-sec" />
                    <h2 className="text-lg md:text-xl font-black whitespace-nowrap">چرا پریمیوم‌شاپ؟</h2>
                </div>
                <div className="h-px w-full bg-stroke rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {features.map((item) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={item.id}
                            className="group relative bg-bg-sec border border-stroke shadow p-6 lg:p-8 rounded-3xl hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col items-center text-center overflow-hidden cursor-default"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-secondary/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 z-0"></div>
                            <div className="relative z-10 w-16 h-16 bg-bg-sec border border-stroke rounded-2xl flex items-center justify-center mb-5 group-hover:-translate-y-2 group-hover:bg-primary group-hover:border-primary group-hover:text-white text-primary transition-all duration-300 shadow-sm">
                                <Icon className="w-8 h-8" strokeWidth={1.5} />
                            </div>
                            <div className="relative z-10">
                                <h3 className="font-black text-text-main text-base md:text-lg mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                                <p className="text-xs md:text-sm text-text-sec leading-relaxed opacity-90">{item.desc}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}