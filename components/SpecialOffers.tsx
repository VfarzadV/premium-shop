import Link from 'next/link';
import { BadgePercent } from 'lucide-react';
import SpecialOffersSlider from './SpecialOffersSlider';
async function getDiscountedProducts() {
    try {
        const res = await fetch('https://dummyjson.com/products?sortBy=discountPercentage&order=desc&limit=10', {
            next: { revalidate: 3600 }
        });
        if (!res.ok) return [];
        const data = await res.json();
        return data.products;
    } catch (error) {
        console.error("Error fetching special offers:", error);
        return [];
    }
}

export default async function SpecialOffers() {
    const discountedProducts = await getDiscountedProducts();
    if (!discountedProducts || discountedProducts.length === 0) return null;
    return (
        <section className="w-full mt-12 bg-primary rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-center gap-6 shadow-lg overflow-hidden">
            <div className="flex flex-col items-center justify-center text-white min-w-45 shrink-0 text-center">
                <BadgePercent className="w-16 h-16 md:w-20 md:h-20 mb-2 opacity-90" />
                <h2 className="text-xl md:text-2xl font-medium">تخفیف‌های</h2>
                <h3 className="text-3xl md:text-5xl font-black mt-1">ویــژه!</h3>
                <Link href="/shop" className="mt-6 text-sm border border-white/50 px-4 py-2 rounded-full hover:bg-white hover:text-primary transition-colors">
                    مشاهده همه
                </Link>
            </div>
            <div className="w-full min-w-0">
                <SpecialOffersSlider products={discountedProducts} />
            </div>
        </section>
    );
}