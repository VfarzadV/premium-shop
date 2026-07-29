import { Search, Frown } from 'lucide-react';
import ProductCard, { Product } from '@/components/ProductCard';
import Pagination from '@/components/Pagination';

interface SearchResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

async function searchProducts(query: string, limit: number, skip: number): Promise<SearchResponse> {
    try {
        const res = await fetch(`https://dummyjson.com/products/search?q=${query}&limit=${limit}&skip=${skip}`, {
            next: { revalidate: 60 }
        });
        if (!res.ok) throw new Error('خطا در دریافت اطلاعات');
        return await res.json();
    } catch {
        return { products: [], total: 0, skip: 0, limit: 0 };
    }
}

export default async function SearchPage({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {
    const resolvedParams = await searchParams;
    const searchQuery = resolvedParams.q || '';
    const currentPage = Number(resolvedParams.page) || 1;
    const limitPerPage = 12;
    const skipCount = (currentPage - 1) * limitPerPage;
    const data = await searchProducts(searchQuery, limitPerPage, skipCount);
    const totalPages = Math.ceil(data.total / limitPerPage);

    return (
        <main className="w-[90%] lg:w-[85%] mx-auto py-8 md:py-12 min-h-screen flex flex-col gap-8">
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-stroke shadow-sm flex flex-col md:flex-row items-center gap-4 justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-secondary/30 rounded-full flex items-center justify-center text-primary">
                        <Search className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-xl md:text-2xl font-black text-text-main">
                            نتایج جستجو برای: «<span className="text-primary">{searchQuery}</span>»
                        </h1>
                        <p className="text-sm text-text-sec mt-1">
                            {data.total > 0 ? `${data.total} محصول پیدا شد` : 'هیچ محصولی پیدا نشد'}
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-full">
                {data.products.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6 mb-8">
                            {data.products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                        <Pagination pageCount={totalPages} />
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center bg-white border border-stroke rounded-3xl p-12 text-center h-full min-h-100">
                        <div className="w-24 h-24 bg-secondary/30 rounded-full flex items-center justify-center mb-4">
                            <Frown className="w-12 h-12 text-primary opacity-50" />
                        </div>
                        <h2 className="text-xl font-black text-text-main mb-2">محصولی پیدا نشد!</h2>
                        <p className="text-text-sec">
                            متاسفانه برای «{searchQuery}» نتیجه‌ای یافت نشد. لطفاً کلمات دیگری را امتحان کنید.
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}