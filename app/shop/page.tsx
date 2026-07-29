import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import ProductCard, { Product } from '@/components/ProductCard';
import Pagination from '@/components/Pagination';

interface DummyJsonResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

async function getAllProducts(limit: number, skip: number): Promise<DummyJsonResponse> {
    const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`, {
        next: { revalidate: 3600 }
    });
    return res.json();
}

export default async function ShopPage({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {

    const resolvedParams = await searchParams;
    const currentPage = Number(resolvedParams.page) || 1;
    const limitPerPage = 12;
    const skipCount = (currentPage - 1) * limitPerPage;

    const data = await getAllProducts(limitPerPage, skipCount);
    const totalPages = Math.ceil(data.total / limitPerPage);

    return (
        <main className="w-[90%] lg:w-[85%] mx-auto py-8 md:py-12 min-h-screen">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-3xl border border-stroke shadow-sm">
                <div>
                    <h1 className="text-2xl font-black text-text-main">همه محصولات فروشگاه</h1>
                    <p className="text-sm text-text-sec mt-1">نمایش محصولات {skipCount + 1} تا {Math.min(skipCount + limitPerPage, data.total)} از {data.total}</p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button className="flex items-center gap-2 bg-bg-sec border border-stroke px-4 py-2.5 rounded-xl text-sm font-bold text-text-main hover:bg-secondary/20 transition-colors md:hidden w-full justify-center">
                        <SlidersHorizontal className="w-4 h-4" /> فیلترها
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
                        <p className="text-sm text-text-sec leading-relaxed">
                            از اینجا می‌توانید محصولات را بر اساس دسته‌بندی فیلتر کنید.
                        </p>
                    </div>
                </aside>
                <div className="w-full lg:w-3/4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
                        {data.products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    <Pagination pageCount={totalPages} />
                </div>
            </div>
        </main>
    );
}