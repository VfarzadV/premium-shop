import Link from 'next/link';
import { SearchX, ArrowRight } from 'lucide-react';

export default function NotFound() {
    return (
        <main className="w-full min-h-[70vh] flex flex-col items-center justify-center p-4 animate-in fade-in duration-500">
            <div className="bg-secondary border border-stroke rounded-3xl p-8 md:p-12 text-center flex flex-col items-center gap-6 w-full max-w-lg shadow-sm">
                <div className="w-24 h-24 bg-primary/30 rounded-full flex items-center justify-center">
                    <SearchX className="w-12 h-12 text-primary opacity-80" />
                </div>
                <div>
                    <h1 className="text-5xl font-black text-text-main mb-4">۴۰۴</h1>
                    <h2 className="text-xl font-bold text-text-main mb-2">صفحه مورد نظر پیدا نشد!</h2>
                    <p className="text-text-sec text-sm leading-relaxed">
                        آدرسی که به دنبال آن هستید وجود ندارد، حذف شده یا نام آن تغییر کرده است.
                    </p>
                </div>
                <Link
                    href="/"
                    className="mt-4 bg-primary text-white font-bold px-8 py-3.5 rounded-xl hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2 active:scale-95"
                >
                    بازگشت به صفحه اصلی
                    <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        </main>
    );
}