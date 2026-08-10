import { SlidersHorizontal, ChevronDown, Frown } from 'lucide-react';
import { notFound } from 'next/navigation';
import ProductCard, { Product } from '@/components/ProductCard';
import Pagination from '@/components/Pagination';

const categoryMapping: Record<string, { title: string, apiCategories: string[] }> = {
    'digital': {
        title: 'کالای دیجیتال',
        apiCategories: ['smartphones', 'laptops', 'tablets', 'mobile-accessories']
    },
    'fashion': {
        title: 'مد و پوشاک',
        apiCategories: ['mens-shirts', 'womens-dresses', 'mens-shoes', 'womens-shoes', 'womens-bags']
    },
    'home': {
        title: 'خانه و آشپزخانه',
        apiCategories: ['furniture', 'home-decoration', 'kitchen-accessories']
    },
    'beauty': {
        title: 'زیبایی و سلامت',
        apiCategories: ['beauty', 'fragrances', 'skin-care']
    },
    'sports': {
        title: 'ورزش و سفر',
        apiCategories: ['sports-accessories']
    },
    'supermarket': {
        title: 'سوپرمارکت',
        apiCategories: ['groceries']
    },
    'kids': {
        title: 'کودک و نوزاد',
        apiCategories: ['womens-jewellery']
    },
};

async function getCategoryProducts(apiCategories: string[]): Promise<Product[]> {
    const responses = await Promise.all(
        apiCategories.map(category =>
            fetch(`https://dummyjson.com/products/category/${category}`, {
                next: { revalidate: 3600 }
            }).then(res => res.json())
        )
    );
    return responses.flatMap(response => response.products || []);
}

export default async function CategoryPage(props: {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    const resolvedParams = await props.params;
    const resolvedSearchParams = await props.searchParams;
    const currentCategory = categoryMapping[resolvedParams.slug];
    if (!currentCategory) {
        notFound();
    }
    const allProducts = await getCategoryProducts(currentCategory.apiCategories);
    const currentPage = Number(resolvedSearchParams.page) || 1;
    const limitPerPage = 12;
    const totalPages = Math.ceil(allProducts.length / limitPerPage);
    const skipCount = (currentPage - 1) * limitPerPage;
    const paginatedProducts = allProducts.slice(skipCount, skipCount + limitPerPage);

    return (
        <main className="w-[90%] lg:w-[85%] mx-auto py-8 md:py-12 min-h-screen">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 bg-secondary p-6 rounded-3xl border border-stroke shadow-sm">
                <div>
                    <h1 className="text-2xl font-black text-text-main">{currentCategory.title}</h1>
                    <p className="text-sm text-text-sec mt-1">نمایش محصولات {skipCount + 1} تا {Math.min(skipCount + limitPerPage, allProducts.length)} از {allProducts.length}</p>
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
                    <div className="bg-secondary border border-stroke rounded-3xl p-6 sticky top-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-6 border-b border-stroke pb-4">
                            <SlidersHorizontal className="w-5 h-5 text-primary" />
                            <h2 className="text-lg font-black text-text-main">فیلتر محصولات</h2>
                        </div>
                        <p className="text-sm text-text-sec leading-relaxed">
                            شما در حال مشاهده محصولات بخش <span className="font-bold text-primary">{currentCategory.title}</span> هستید.
                        </p>
                    </div>
                </aside>
                <div className="w-full lg:w-3/4">
                    {paginatedProducts.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6 mb-8">
                                {paginatedProducts.map((product) => (
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
                            <h2 className="text-xl font-black text-text-main mb-2">محصولی یافت نشد!</h2>
                            <p className="text-text-sec">در حال حاضر محصولی در این دسته‌بندی وجود ندارد.</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}