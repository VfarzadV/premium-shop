import { Truck, ShieldCheck, Box, Headphones, Award } from 'lucide-react';

const features = [
    { id: 1, title: 'ارسال سریع!', icon: Truck },
    { id: 2, title: 'ضمانت اصالت!', icon: ShieldCheck },
    { id: 3, title: 'امکان مرجوع!', icon: Box },
    { id: 4, title: 'پشتیبانی دائم!', icon: Headphones },
];

export default function Features() {
    return (
        <section className="w-full mt-12">
            <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2 text-text-main">
                    <Award className="w-6 h-6 text-text-sec" />
                    <h2 className="text-lg md:text-xl font-bold whitespace-nowrap">ویژگی‌های فروشگاه ما</h2>
                </div>
                <div className="h-px w-full bg-stroke rounded-full"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {features.map((item) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={item.id}
                            className="flex items-center justify-center gap-3 bg-secondary/30 p-4 rounded-xl border border-secondary/50 hover:shadow-sm transition-shadow"
                        >
                            <Icon className="w-7 h-7 md:w-8 md:h-8 text-primary" strokeWidth={1.5} />
                            <span className="font-bold text-text-main text-sm md:text-base">{item.title}</span>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}