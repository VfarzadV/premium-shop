"use client";

import { useEffect } from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Application Error Captured:", error);
    }, [error]);

    return (
        <main className="w-full min-h-[70vh] flex flex-col items-center justify-center p-4 animate-in zoom-in-95 duration-500">
            <div className="bg-secondary border border-red-100 rounded-3xl p-8 md:p-12 text-center flex flex-col items-center gap-6 w-full max-w-lg shadow-sm">
                <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center border border-red-100">
                    <AlertTriangle className="w-12 h-12 text-red-500 opacity-80" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-text-main mb-2">متاسفانه خطایی رخ داده است!</h2>
                    <p className="text-text-sec text-sm leading-relaxed">
                        مشکلی در پردازش اطلاعات یا برقراری ارتباط با سرور پیش آمده است.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full mt-2">
                    <button
                        onClick={() => reset()}
                        className="w-full sm:w-1/2 bg-bg-sec border border-stroke text-text-main font-bold px-6 py-3.5 rounded-xl hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all flex items-center justify-center gap-2 active:scale-95"
                    >
                        <RotateCcw className="w-5 h-5" />
                        تلاش مجدد
                    </button>
                    <Link 
                        href="/"
                        className="w-full sm:w-1/2 bg-primary text-white font-bold px-6 py-3.5 rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 active:scale-95"
                    >
                        <Home className="w-5 h-5" />
                        صفحه اصلی
                    </Link>
                </div>
            </div>
        </main>
    );
}