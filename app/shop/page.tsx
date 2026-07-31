import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import ProductCard, { Product } from '@/components/ProductCard';
import Pagination from '@/components/Pagination';
import FilterSidebar from '@/components/FilterSidebar';

interface DummyJsonResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}
async function getAllProducts(limit: number, skip: number, sort: string): Promise<DummyJsonResponse> {
    let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
    if (sort === 'price_asc') url += '&sortBy=price&order=asc';
    else if (sort === 'price_desc') url += '&sortBy=price&order=desc';
    else if (sort === 'rating_desc') url += '&sortBy=rating&order=desc';

    const res = await fetch(url, {
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
    const currentSort = resolvedParams.sort || '';
    const limitPerPage = 12;
    const skipCount = (currentPage - 1) * limitPerPage;
    const data = await getAllProducts(limitPerPage, skipCount, currentSort);
    const totalPages = Math.ceil(data.total / limitPerPage);

    return (
        <main className="w-[90%] lg:w-[85%] mx-auto py-8 md:py-12 min-h-screen">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-3xl border border-stroke shadow-sm">
                <div>
                    <h1 className="text-2xl font-black text-text-main">فروشگاه</h1>
                    <p className="text-sm text-text-sec mt-1">نمایش {skipCount + 1} تا {Math.min(skipCount + limitPerPage, data.total)} از {data.total} محصول</p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button className="flex items-center gap-2 bg-bg-sec border border-stroke px-4 py-2.5 rounded-xl text-sm font-bold text-text-main hover:bg-secondary/20 transition-colors md:hidden w-full justify-center">
                        <SlidersHorizontal className="w-4 h-4" />
                        فیلتر و مرتب‌سازی
                    </button>
                    <div className="hidden md:flex items-center gap-2 bg-bg-sec border border-stroke px-4 py-2.5 rounded-xl text-sm font-bold text-text-main cursor-pointer hover:border-primary transition-colors">
                        مرتب‌سازی
                        <ChevronDown className="w-4 h-4 text-text-sec" />
                    </div>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-8">
                <aside className="hidden lg:flex flex-col gap-6 w-1/4 shrink-0">
                    <FilterSidebar />
                </aside>
                <div className="w-full lg:w-3/4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
                        {data.products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    <div className="mt-8">
                        <Pagination pageCount={totalPages} />
                    </div>
                </div>
            </div>
        </main>
    );
}