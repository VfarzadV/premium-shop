import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBasket, Star, SlidersHorizontal, ChevronDown, Smartphone, Laptop, Tablet, Headphones } from 'lucide-react';

interface Product {
    id: number;
    title: string;
    price: number;
    discountPercentage: number;
    rating: number;
    category: string;
    thumbnail: string;
}

async function getDigitalProducts(): Promise<Product[]> {
    const categories = ['smartphones', 'laptops', 'tablets', 'mobile-accessories'];
    const responses = await Promise.all(
        categories.map(category =>
            fetch(`https://dummyjson.com/products/category/${category}`, {
                next: { revalidate: 3600 }
            }).then(res => res.json())
        )
    );
    const allProducts = responses.flatMap(response => response.products);
    return allProducts;
}

export default async function ShopPage() {
    const products = await getDigitalProducts();
    return (
        <main className="w-[90%] lg:w-[85%] mx-auto py-8 md:py-12 min-h-screen">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-3xl border border-stroke shadow-sm">
                <div>
                    <h1 className="text-2xl font-black text-text-main">کالای دیجیتال</h1>
                    <p className="text-sm text-text-sec mt-1">نمایش تمام {products.length} محصول</p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button className="flex items-center gap-2 bg-bg-sec border border-stroke px-4 py-2.5 rounded-xl text-sm font-bold text-text-main hover:bg-secondary/20 transition-colors md:hidden w-full justify-center">
                        <SlidersHorizontal className="w-4 h-4" />
                        فیلترها
                    </button>
                    <div className="hidden md:flex items-center gap-2 bg-bg-sec border border-stroke px-4 py-2.5 rounded-xl text-sm font-bold text-text-main cursor-pointer hover:border-primary transition-colors">
                        مرتب‌سازی: پیش‌فرض
                        <ChevronDown className="w-4 h-4 text-text-sec" />
                    </div>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-8">
                <aside className="hidden lg:flex flex-col gap-6 w-1/4 shrink-0">
                    <div className="bg-white border border-stroke rounded-3xl p-6 sticky top-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-6 border-b border-stroke pb-4">
                            <SlidersHorizontal className="w-5 h-5 text-primary" />
                            <h2 className="text-lg font-black text-text-main">فیلتر محصولات</h2>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h3 className="font-bold text-text-main text-sm">دسته‌بندی‌ها</h3>
                            <div className="flex flex-col gap-4 mt-2">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input type="checkbox" className="w-4 h-4 rounded border-stroke text-primary focus:ring-primary accent-primary" defaultChecked />
                                    <span className="text-sm text-text-sec group-hover:text-primary transition-colors flex items-center gap-2">
                                        <Smartphone className="w-4 h-4" /> گوشی هوشمند
                                    </span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input type="checkbox" className="w-4 h-4 rounded border-stroke text-primary focus:ring-primary accent-primary" defaultChecked />
                                    <span className="text-sm text-text-sec group-hover:text-primary transition-colors flex items-center gap-2">
                                        <Laptop className="w-4 h-4" /> لپ‌تاپ
                                    </span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input type="checkbox" className="w-4 h-4 rounded border-stroke text-primary focus:ring-primary accent-primary" defaultChecked />
                                    <span className="text-sm text-text-sec group-hover:text-primary transition-colors flex items-center gap-2">
                                        <Tablet className="w-4 h-4" /> تبلت
                                    </span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input type="checkbox" className="w-4 h-4 rounded border-stroke text-primary focus:ring-primary accent-primary" defaultChecked />
                                    <span className="text-sm text-text-sec group-hover:text-primary transition-colors flex items-center gap-2">
                                        <Headphones className="w-4 h-4" /> لوازم جانبی
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </aside>
                <div className="w-full lg:w-3/4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
                        {products.map((product) => {
                            const fakeExchangeRate = 50000;
                            const tomanPrice = product.price * fakeExchangeRate;
                            const oldTomanPrice = Math.round(tomanPrice / (1 - product.discountPercentage / 100));
                            const categoryNames: Record<string, string> = {
                                'smartphones': 'گوشی هوشمند',
                                'laptops': 'لپ‌تاپ',
                                'tablets': 'تبلت',
                                'mobile-accessories': 'لوازم جانبی'
                            };
                            return (
                                <div key={product.id} className="bg-white border border-stroke rounded-3xl p-4 flex flex-col group hover:shadow-xl hover:shadow-secondary/20 hover:border-primary/50 transition-all duration-300">
                                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4 bg-bg-sec flex items-center justify-center">
                                        <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-black px-3 py-1.5 rounded-full z-10 shadow-sm">
                                            {Math.round(product.discountPercentage)}٪
                                        </span>
                                        <Link href={`/product/${product.id}`} className="relative w-4/5 h-4/5 block">
                                            <Image
                                                src={product.thumbnail}
                                                alt={product.title}
                                                fill
                                                className="object-contain group-hover:scale-110 transition-transform duration-500"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        </Link>
                                    </div>
                                    <div className="flex flex-col grow gap-2">
                                        <div className="flex items-center justify-between text-xs text-text-sec">
                                            <span>{categoryNames[product.category] || 'کالای دیجیتال'}</span>
                                            <div className="flex items-center gap-1 text-yellow-500">
                                                <Star className="w-3 h-3 fill-current" />
                                                <span className="font-bold pt-0.5">{product.rating}</span>
                                            </div>
                                        </div>
                                        <Link href={`/product/${product.id}`}>
                                            <h3 className="font-bold text-text-main text-sm md:text-base line-clamp-2 leading-relaxed group-hover:text-primary transition-colors">
                                                {product.title}
                                            </h3>
                                        </Link>
                                        <div className="mt-auto pt-4 flex items-end justify-between border-t border-stroke/50">
                                            <button className="bg-bg-sec text-text-sec p-3 rounded-xl hover:bg-primary hover:text-white transition-colors active:scale-95">
                                                <ShoppingBasket className="w-5 h-5" />
                                            </button>
                                            <div className="flex flex-col items-end gap-0.5">
                                                <span className="text-xs text-text-sec line-through decoration-red-500/50">
                                                    {oldTomanPrice.toLocaleString('fa-IR')}
                                                </span>
                                                <div className="flex items-center gap-1">
                                                    <span className="font-black text-text-main text-lg tracking-tight">
                                                        {tomanPrice.toLocaleString('fa-IR')}
                                                    </span>
                                                    <span className="text-xs text-text-sec">تومان</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </main>
    );
}