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
        <section className="w-full mt-12 relative bg-linear-to-br from-primary via-primary to-primary/80 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-center gap-6 shadow-xl shadow-primary/20 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/15 rounded-full blur-[70px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/20 rounded-full blur-[50px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>
            <div className="flex flex-col items-center justify-center text-white min-w-45 shrink-0 text-center relative z-10">
                <BadgePercent className="w-16 h-16 md:w-20 md:h-20 mb-2 opacity-90 drop-shadow-md" />
                <h2 className="text-xl md:text-2xl font-medium drop-shadow-sm">پیشنهاد</h2>
                <h3 className="text-3xl md:text-5xl font-black mt-1 drop-shadow-md">شگفت‌انگیز!</h3>
                <Link href="/shop" className="mt-6 text-sm font-bold border-2 border-white/30 px-5 py-2.5 rounded-full hover:bg-white hover:text-primary transition-all duration-300 shadow-sm hover:shadow-md active:scale-95">
                    مشاهده همه
                </Link>
            </div>

            <div className="w-full min-w-0 relative z-10">
                <SpecialOffersSlider products={discountedProducts} />
            </div>

        </section>
    );
}