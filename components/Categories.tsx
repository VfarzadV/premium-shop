import Link from 'next/link';
// ایمپورت آیکون‌های متنوع برای فروشگاه جامع
import {
    LayoutGrid,
    Smartphone,
    Shirt,
    Tv,
    Sparkles,
    Tent,
    ShoppingBasket,
    Gamepad2
} from 'lucide-react';

// آرایه دسته‌بندی‌های یک فروشگاه همه‌چیزفروش
const categories = [
    { id: 1, title: 'کالای دیجیتال', icon: Smartphone, link: '/category/digital' },
    { id: 2, title: 'مد و پوشاک', icon: Shirt, link: '/category/fashion' },
    { id: 3, title: 'خانه و آشپزخانه', icon: Tv, link: '/category/home' },
    { id: 4, title: 'زیبایی و سلامت', icon: Sparkles, link: '/category/beauty' },
    { id: 5, title: 'ورزش و سفر', icon: Tent, link: '/category/sports' },
    { id: 6, title: 'سوپرمارکت', icon: ShoppingBasket, link: '/category/supermarket' },
    { id: 7, title: 'کودک و نوزاد', icon: Gamepad2, link: '/category/kids' },
];

export default function Categories() {
    return (
        <section className="w-full mt-12">

            {/* هدر بخش دسته‌بندی */}
            <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-2">
                    <LayoutGrid className="w-6 h-6 text-text-sec" />
                    <h2 className="text-lg md:text-xl font-bold text-text-main whitespace-nowrap">
                        دسته بندی محصولات
                    </h2>
                </div>
                <div className="h-px w-full bg-stroke rounded-full"></div>
            </div>

            {/* شبکه (Grid) کارت‌ها */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6">
                {categories.map((cat) => {
                    // نکته مهم ری‌اکت: برای استفاده داینامیک از کامپوننت، باید آن را در متغیری با حرف بزرگ بریزیم
                    const Icon = cat.icon;

                    return (
                        <Link
                            key={cat.id}
                            href={cat.link}
                            className="flex flex-col items-center justify-center gap-4 p-4 md:p-6 bg-bg-sec border border-stroke rounded-2xl hover:border-primary hover:shadow-md transition-all group"
                        >
                            {/* جایگاه آیکون با یک پس‌زمینه گرد برای ظاهر مدرن‌تر */}
                            <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-bg-sec rounded-full group-hover:bg-secondary transition-colors duration-300">
                                <Icon className="w-8 h-8 md:w-10 md:h-10 text-text-sec group-hover:text-primary transition-colors" />
                            </div>

                            {/* عنوان دسته‌بندی */}
                            <span className="text-sm md:text-base font-medium text-text-sec group-hover:text-primary transition-colors">
                                {cat.title}
                            </span>
                        </Link>
                    );
                })}
            </div>

        </section>
    );
}