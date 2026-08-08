import Link from 'next/link';
import { Smartphone, Monitor, Camera, Laptop, Award } from 'lucide-react';

const popularBrands = [
    { id: 'apple', name: 'اپل (Apple)', icon: Smartphone, gradient: 'from-gray-700 to-black' },
    { id: 'samsung', name: 'سامسونگ (Samsung)', icon: Monitor, gradient: 'from-blue-600 to-blue-800' },
    { id: 'xiaomi', name: 'شیائومی (Xiaomi)', icon: Smartphone, gradient: 'from-orange-500 to-orange-700' },
    { id: 'sony', name: 'سونی (Sony)', icon: Camera, gradient: 'from-indigo-500 to-indigo-700' },
    { id: 'asus', name: 'ایسوس (ASUS)', icon: Laptop, gradient: 'from-slate-600 to-slate-800' },
];

export default function PopularBrands() {
    return (
        <section className="w-full mt-12 md:mt-16">
            <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-2 text-text-main">
                    <Award className="w-6 h-6 text-text-sec" />
                    <h2 className="text-lg md:text-xl font-black whitespace-nowrap">محبوب‌ترین برندها</h2>
                </div>
                <div className="h-px w-full bg-stroke rounded-full"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
                {popularBrands.map((brand, index) => {
                    const Icon = brand.icon;
                    return (
                        <Link
                            key={brand.id}
                            href={`/shop?brand=${brand.id}`}
                            className="group relative bg-linear-to-br from-primary via-primary to-primary/80 border border-stroke rounded-3xl p-6 overflow-hidden hover:shadow-xl hover:shadow-primary/5 hover:border-primary/40 transition-all duration-500 flex flex-col items-center text-center gap-4 animate-in fade-in slide-in-from-bottom-8"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className={`absolute top-0 right-0 w-24 h-24 bg-linear-to-br ${brand.gradient} rounded-full blur-2xl opacity-0 group-hover:opacity-15 transition-opacity duration-500 -translate-y-1/2 translate-x-1/2`}></div>
                            <div className={`w-16 h-16 rounded-2xl bg-linear-to-br ${brand.gradient} text-white flex items-center justify-center shadow-md group-hover:scale-110 group-hover:shadow-lg transition-transform duration-500 relative z-10`}>
                                <Icon className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold text-text-main text-sm md:text-base group-hover:text-primary transition-colors relative z-10">
                                {brand.name}
                            </h3>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}