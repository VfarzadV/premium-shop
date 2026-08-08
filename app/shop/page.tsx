"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductCard, { Product } from '@/components/ProductCard';
import { SlidersHorizontal, X, ArrowDownWideNarrow, Loader2, Check } from 'lucide-react';
import Pagination from '@/components/Pagination';

function ShopContent() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<{ slug: string, name: string }[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('all');
    const [sortBy, setSortBy] = useState('default');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const searchParams = useSearchParams();
    const router = useRouter();
    const brandFilter = searchParams.get('brand');
    const currentPage = Number(searchParams.get('page')) || 1;
    const itemsPerPage = 12;

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [productsRes, categoriesRes] = await Promise.all([
                    fetch('https://dummyjson.com/products?limit=100'),
                    fetch('https://dummyjson.com/products/categories')
                ]);
                const productsData = await productsRes.json();
                const categoriesData = await categoriesRes.json();
                setProducts(productsData.products);
                setCategories(categoriesData);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (isFilterOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [isFilterOpen]);

    const filteredProducts = products
        .filter(p => activeCategory === 'all' || p.category === activeCategory)
        .filter(p => {
            if (!brandFilter) return true;
            return p.brand?.toLowerCase() === brandFilter.toLowerCase();
        })
        .sort((a, b) => {
            if (sortBy === 'price-asc') return a.price - b.price;
            if (sortBy === 'price-desc') return b.price - a.price;
            if (sortBy === 'rating') return b.rating - a.rating;
            return 0;
        });

    const sortOptions = [
        { id: 'default', label: 'مرتب‌سازی پیش‌فرض' },
        { id: 'price-asc', label: 'ارزان‌ترین' },
        { id: 'price-desc', label: 'گران‌ترین' },
        { id: 'rating', label: 'بیشترین امتیاز' }
    ];

    const handleCategoryChange = (slug: string) => {
        setActiveCategory(slug);
        const params = new URLSearchParams(searchParams.toString());
        params.delete('page');
        router.push(`/shop?${params.toString()}`);
    };

    const handleSortChange = (sortId: string) => {
        setSortBy(sortId);
        const params = new URLSearchParams(searchParams.toString());
        params.delete('page');
        router.push(`/shop?${params.toString()}`);
    };

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const skipCount = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = filteredProducts.slice(skipCount, skipCount + itemsPerPage);

    return (
        <main className="w-[90%] lg:w-[85%] mx-auto py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-black text-text-main">فروشگاه</h1>
                <button
                    onClick={() => setIsFilterOpen(true)}
                    className="md:hidden flex items-center gap-2 bg-bg-sec border border-stroke px-4 py-2.5 rounded-xl hover:bg-bg-sec active:scale-95 transition-all text-sm font-bold text-text-main"
                >
                    <SlidersHorizontal className="w-4 h-4 text-primary" />
                    فیلترها
                </button>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
                <aside className="hidden md:flex flex-col w-72 shrink-0 gap-6 sticky top-28 h-fit">
                    <div className="bg-bg-sec border border-stroke rounded-3xl p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <ArrowDownWideNarrow className="w-5 h-5 text-primary" />
                            <h3 className="font-black text-text-main">مرتب‌سازی</h3>
                        </div>
                        <div className="flex flex-col gap-2">
                            {sortOptions.map(option => (
                                <button
                                    key={option.id}
                                    onClick={() => handleSortChange(option.id)}
                                    className={`flex items-center justify-between p-3 rounded-xl text-sm font-bold transition-colors ${sortBy === option.id ? 'bg-primary/10 text-primary' : 'hover:bg-bg-sec text-text-sec'}`}
                                >
                                    {option.label}
                                    {sortBy === option.id && <Check className="w-4 h-4" />}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="bg-bg-sec border border-stroke rounded-3xl p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <SlidersHorizontal className="w-5 h-5 text-primary" />
                            <h3 className="font-black text-text-main">دسته‌بندی‌ها</h3>
                        </div>
                        <div className="flex flex-col gap-2 max-h-[40vh] overflow-y-auto scrollbar-none pr-2">
                            <button
                                onClick={() => handleCategoryChange('all')}
                                className={`text-right p-3 rounded-xl text-sm font-bold transition-colors ${activeCategory === 'all' ? 'bg-primary/10 text-primary' : 'hover:bg-bg-sec text-text-sec'}`}
                            >
                                همه محصولات
                            </button>
                            {categories.map(category => (
                                <button
                                    key={category.slug}
                                    onClick={() => handleCategoryChange(category.slug)}
                                    className={`text-right p-3 rounded-xl text-sm font-bold transition-colors capitalize ${activeCategory === category.slug ? 'bg-primary/10 text-primary' : 'hover:bg-bg-sec text-text-sec'}`}
                                >
                                    {category.name.replace('-', ' ')}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>
                <div className="flex-1 min-w-0">
                    {isLoading ? (
                        <div className="w-full h-[50vh] flex flex-col items-center justify-center gap-4 text-primary">
                            <Loader2 className="w-10 h-10 animate-spin" />
                            <span className="font-bold text-text-main">در حال بارگذاری...</span>
                        </div>
                    ) : (
                        <>
                            {brandFilter && (
                                <div className="flex items-center gap-3 mb-6 bg-primary/10 border border-primary/20 px-4 py-3 rounded-2xl w-fit animate-in fade-in slide-in-from-right-4">
                                    <span className="text-sm font-bold text-text-sec">نتایج برای برند:</span>
                                    <span className="text-base font-black text-primary capitalize">{brandFilter}</span>
                                    <button
                                        onClick={() => router.push('/shop')}
                                        className="mr-2 p-1.5 bg-white border border-stroke rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm group"
                                    >
                                        <X className="w-4 h-4 text-text-sec group-hover:text-white" />
                                    </button>
                                </div>
                            )}
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                                {paginatedProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                            {totalPages > 1 && (
                                <Pagination pageCount={totalPages} />
                            )}
                            {filteredProducts.length === 0 && (
                                <div className="w-full bg-white border border-stroke rounded-3xl p-12 text-center flex flex-col items-center gap-4">
                                    <div className="w-20 h-20 bg-bg-sec rounded-full flex items-center justify-center">
                                        <X className="w-10 h-10 text-text-sec" />
                                    </div>
                                    <h3 className="text-xl font-black text-text-main">محصولی یافت نشد!</h3>
                                    <p className="text-text-sec font-medium">هیچ محصولی با این مشخصات در فروشگاه موجود نیست.</p>
                                    <button
                                        onClick={() => { handleCategoryChange('all'); handleSortChange('default'); router.push('/shop'); }}
                                        className="mt-4 bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors shadow-sm"
                                    >
                                        حذف فیلترها و مشاهده همه
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
            {isFilterOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-50 md:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsFilterOpen(false)}
                ></div>
            )}
            <div className={`fixed bottom-0 left-0 right-0 z-50 bg-bg-sec rounded-t-3xl transform transition-transform duration-300 ease-in-out flex flex-col max-h-[85vh] md:hidden shadow-[0_-10px_40px_rgba(0,0,0,0.1)] ${isFilterOpen ? 'translate-y-0' : 'translate-y-full'}`}>
                <div className="flex items-center justify-between p-6 border-b border-stroke">
                    <span className="font-black text-lg text-text-main">فیلتر محصولات</span>
                    <button
                        onClick={() => setIsFilterOpen(false)}
                        className="p-2 bg-bg-main text-text-main hover:bg-red-50 hover:text-red-500 rounded-xl transition-colors border border-stroke"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8 scrollbar-none">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <ArrowDownWideNarrow className="w-5 h-5 text-primary" />
                            <h3 className="font-black text-text-main">مرتب‌سازی بر اساس</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {sortOptions.map(option => (
                                <button
                                    key={option.id}
                                    onClick={() => handleSortChange(option.id)}
                                    className={`flex items-center justify-center p-3 rounded-xl text-xs font-bold transition-all border ${sortBy === option.id ? 'bg-primary border-primary text-white shadow-md' : 'bg-bg-main border-stroke text-text-sec hover:border-primary/50'}`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <SlidersHorizontal className="w-5 h-5 text-primary" />
                            <h3 className="font-black text-text-main">دسته‌بندی</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => handleCategoryChange('all')}
                                className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all border ${activeCategory === 'all' ? 'bg-primary text-white border-primary shadow-md' : 'bg-bg-main border-stroke text-text-sec hover:bg-bg-sec'}`}
                            >
                                همه
                            </button>
                            {categories.map(category => (
                                <button
                                    key={category.slug}
                                    onClick={() => handleCategoryChange(category.slug)}
                                    className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all border capitalize ${activeCategory === category.slug ? 'bg-primary text-white border-primary shadow-md' : 'bg-bg-main border-stroke text-text-sec hover:bg-bg-sec'}`}
                                >
                                    {category.name.replace('-', ' ')}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="p-6 border-t border-stroke bg-bg-sec shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
                    <button
                        onClick={() => setIsFilterOpen(false)}
                        className="w-full bg-primary text-white font-black py-4 rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95 flex items-center justify-center gap-2"
                    >
                        مشاهده محصولات
                        <span className="bg-bg-sec/20 px-2 py-0.5 rounded-md text-sm">{filteredProducts.length}</span>
                    </button>
                </div>
            </div>
        </main>
    );
}

export default function ShopPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
        }>
            <ShopContent />
        </Suspense>
    );
}