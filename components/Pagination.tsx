"use client";

import ReactPaginate from 'react-paginate';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function Pagination({ pageCount }: { pageCount: number }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;
    const handlePageClick = (event: { selected: number }) => {
        const newPage = event.selected + 1; 
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', newPage.toString());
        router.push(`${pathname}?${params.toString()}`);
    };

    if (pageCount <= 1) return null;

    return (
        <ReactPaginate
            breakLabel="..."
            nextLabel={<ChevronLeft className="w-5 h-5" />} 
            previousLabel={<ChevronRight className="w-5 h-5" />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1} 
            pageCount={pageCount}
            forcePage={currentPage - 1} 
            containerClassName="flex items-center justify-center gap-2 mt-12"
            pageClassName="flex"
            pageLinkClassName="w-10 h-10 flex items-center justify-center rounded-xl border border-stroke text-text-sec hover:bg-primary hover:text-white hover:border-primary transition-all font-bold"
            activeLinkClassName="!bg-primary text-white !border-primary shadow-md"
            previousClassName="flex"
            previousLinkClassName="w-10 h-10 flex items-center justify-center rounded-xl border border-stroke text-text-sec hover:bg-primary hover:text-white transition-all"
            nextClassName="flex"
            nextLinkClassName="w-10 h-10 flex items-center justify-center rounded-xl border border-stroke text-text-sec hover:bg-primary hover:text-white transition-all"
            disabledClassName="opacity-50 cursor-not-allowed pointer-events-none"
            breakClassName="flex items-center justify-center text-text-sec px-2"
        />
    );
}