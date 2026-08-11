import Link from 'next/link';
import { LayoutDashboard, ShoppingBag, Package, Users, ArrowRight, LogOut } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const adminNavItems = [
        { href: '/admin', label: 'داشبورد آماری', icon: LayoutDashboard },
        { href: '/admin/orders', label: 'مدیریت سفارشات', icon: ShoppingBag },
        { href: '/admin/products', label: 'موجودی کالاها', icon: Package },
        { href: '/admin/users', label: 'کاربران ثبت‌نامی', icon: Users },
    ];

    return (
        <div className="min-h-screen bg-bg-main flex flex-col md:flex-row text-text-main">
            <aside className="w-full md:w-72 bg-bg-sec border-l border-stroke p-6 flex flex-col justify-between shrink-0 shadow-sm">
                <div className="flex flex-col gap-8">
                    <div className="flex items-center justify-between border-b border-stroke pb-6">
                        <div className="flex flex-col">
                            <span className="font-black text-xl text-primary">پنل مدیریت</span>
                            <span className="text-xs text-text-sec mt-1">نسخه‌ پیشرفته پریمیوم‌شاپ</span>
                        </div>
                        <Link
                            href="/"
                            className="w-10 h-10 bg-bg-main border border-stroke rounded-xl flex items-center justify-center text-text-sec hover:text-primary hover:border-primary transition-all"
                            title="بازگشت به سایت"
                        >
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                    <nav className="flex flex-col gap-2">
                        {adminNavItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm text-text-sec hover:bg-primary/10 hover:text-primary transition-all group"
                                >
                                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>
                <div className="pt-6 border-t border-stroke mt-6">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm text-red-500 hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>خروج از پنل</span>
                    </Link>
                </div>
            </aside>
            <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-bg-main">
                {children}
            </main>
        </div>
    );
}