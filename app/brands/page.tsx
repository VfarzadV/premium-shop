import Link from 'next/link';
import { Award, Smartphone, Monitor, Headphones, Camera, Sparkles, Watch, Laptop } from 'lucide-react';

export default function BrandsPage() {
    const brands = [
        { id: 'apple', name: 'اپل (Apple)', icon: Smartphone, count: 124, gradient: 'from-gray-700 to-black' },
        { id: 'samsung', name: 'سامسونگ (Samsung)', icon: Monitor, count: 98, gradient: 'from-blue-600 to-blue-800' },
        { id: 'xiaomi', name: 'شیائومی (Xiaomi)', icon: Smartphone, count: 156, gradient: 'from-orange-500 to-orange-700' },
        { id: 'sony', name: 'سونی (Sony)', icon: Camera, count: 45, gradient: 'from-indigo-500 to-indigo-700' },
        { id: 'asus', name: 'ایسوس (ASUS)', icon: Laptop, count: 62, gradient: 'from-slate-600 to-slate-800' },
        { id: 'nike', name: 'نایکی (Nike)', icon: Sparkles, count: 210, gradient: 'from-stone-700 to-stone-900' },
        { id: 'jbl', name: 'جی‌بی‌ال (JBL)', icon: Headphones, count: 34, gradient: 'from-red-500 to-red-700' },
        { id: 'casio', name: 'کاسیو (Casio)', icon: Watch, count: 18, gradient: 'from-teal-600 to-teal-800' },
    ];

    return (
        <main className="w-[90%] lg:w-[85%] mx-auto py-10 md:py-16 min-h-screen">
            <div className="flex flex-col items-center justify-center text-center gap-4 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-2 shadow-sm">
                    <Award className="w-8 h-8" />
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-text-main">برندهای معتبر جهانی</h1>
                <p className="text-text-sec md:text-lg font-medium max-w-2xl leading-relaxed mt-2">
                    در پریمیوم‌شاپ، ما تنها با معتبرترین و شناخته‌شده‌ترین برندهای جهان همکاری می‌کنیم تا کیفیت و اصالت را برای شما تضمین کنیم.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {brands.map((brand, index) => {
                    const Icon = brand.icon;
                    return (
                        <Link
                            href={`/shop?brand=${brand.id}`}
                            key={brand.id}
                            className="group relative bg-bg-sec border border-stroke rounded-3xl p-6 overflow-hidden hover:shadow-xl hover:border-primary/50 transition-all duration-500 animate-in fade-in slide-in-from-bottom-8"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br ${brand.gradient} rounded-full blur-[50px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 -translate-y-1/2 translate-x-1/2`}></div>
                            <div className="flex flex-col items-center text-center gap-4 relative z-10">
                                <div className={`w-20 h-20 rounded-2xl bg-linear-to-br ${brand.gradient} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                                    <Icon className="w-10 h-10" />
                                </div>
                                <div className="flex flex-col gap-1 mt-2">
                                    <h2 className="text-lg font-black text-text-main group-hover:text-primary transition-colors">
                                        {brand.name}
                                    </h2>
                                    <span className="text-sm font-bold text-text-sec bg-bg-main border border-stroke px-3 py-1 rounded-lg w-fit mx-auto mt-2">
                                        {brand.count} کالا
                                    </span>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </main>
    );
}