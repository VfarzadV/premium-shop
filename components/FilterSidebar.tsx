"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { SlidersHorizontal, ArrowDownUp, Check } from 'lucide-react';

export default function FilterSidebar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentSort = searchParams.get('sort') || '';

    const handleSortChange = (sortValue: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (sortValue) {
            params.set('sort', sortValue);
        } else {
            params.delete('sort');
        }
        params.delete('page');
        router.push(`/shop?${params.toString()}`);
    };
    const sortOptions = [
        { id: '', label: 'جدیدترین (پیش‌فرض)' },
        { id: 'price_asc', label: 'ارزان‌ترین' },
        { id: 'price_desc', label: 'گران‌ترین' },
        { id: 'rating_desc', label: 'بیشترین امتیاز' },
    ];

    return (
        <div className="bg-white border border-stroke rounded-3xl p-6 sticky top-28 shadow-sm">
            <div className="flex items-center gap-2 mb-6 border-b border-stroke pb-4">
                <SlidersHorizontal className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-black text-text-main">فیلتر و مرتب‌سازی</h2>
            </div>
            <div className="flex flex-col gap-4">
                <h3 className="font-bold text-sm text-text-main flex items-center gap-2">
                    <ArrowDownUp className="w-4 h-4 text-text-sec" />
                    مرتب‌سازی بر اساس:
                </h3>
                <div className="flex flex-col gap-2">
                    {sortOptions.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => handleSortChange(option.id)}
                            className={`flex items-center justify-between p-3.5 rounded-xl border transition-all text-sm font-medium outline-none active:scale-95 ${currentSort === option.id
                                    ? 'bg-primary/10 border-primary text-primary shadow-sm'
                                    : 'bg-bg-sec border-transparent text-text-sec hover:border-stroke hover:bg-white'
                                }`}
                        >
                            {option.label}
                            {currentSort === option.id && <Check className="w-4 h-4" />}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}