"use client";

import { useState, useEffect } from 'react';
import { DollarSign, ShoppingBag, Users, TrendingUp, Package, UserPlus, Loader2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Image from 'next/image';
import Link from 'next/link';
import { useOrderStore } from '@/store/useOrderStore';

interface RecentUser {
    id: number;
    firstName: string;
    lastName: string;
    image: string;
}

interface RecentProduct {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
}

export default function AdminDashboard() {
    const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
    const [recentProducts, setRecentProducts] = useState<RecentProduct[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const orders = useOrderStore((state) => state.orders);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [usersRes, productsRes] = await Promise.all([
                    fetch('https://dummyjson.com/users?limit=5&select=firstName,lastName,image'),
                    fetch('https://dummyjson.com/products?limit=5&select=title,price,thumbnail')
                ]);
                const usersData = await usersRes.json();
                const productsData = await productsRes.json();
                setRecentUsers(usersData.users);
                setRecentProducts(productsData.products);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    const stats = [
        { id: 1, title: 'درآمد کل (تومان)', value: '۳۵,۴۰۰,۰۰۰', icon: DollarSign, color: 'text-green-500', bg: 'bg-green-500/10' },
        { id: 2, title: 'سفارشات موفق', value: '۱۲۸', icon: ShoppingBag, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { id: 3, title: 'کاربران فعال', value: '۱,۰۴۲', icon: Users, color: 'text-orange-500', bg: 'bg-orange-500/10' },
        { id: 4, title: 'رشد ماهانه', value: '+ ۱۸٪', icon: TrendingUp, color: 'text-primary', bg: 'bg-primary/10' },
    ];

    const salesData = [
        { name: 'فروردین', فروش: 4000000 },
        { name: 'اردیبهشت', فروش: 3000000 },
        { name: 'خرداد', فروش: 5000000 },
        { name: 'تیر', فروش: 2780000 },
        { name: 'مرداد', فروش: 8900000 },
        { name: 'شهریور', فروش: 6390000 },
        { name: 'مهر', فروش: 9490000 },
    ];

    return (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-2xl md:text-3xl font-black text-text-main mb-2">خلاصه وضعیت فروشگاه</h1>
                <p className="text-text-sec text-sm">آمار و ارقام کلیدی کسب‌وکار شما در یک نگاه.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.id} className="bg-bg-sec border border-stroke rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group">
                            <div className="flex flex-col gap-2">
                                <span className="text-sm font-bold text-text-sec">{stat.title}</span>
                                <span className="text-2xl font-black text-text-main tracking-tight dir-ltr text-left">
                                    {stat.value}
                                </span>
                            </div>
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                                <Icon className="w-7 h-7" />
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <div className="bg-bg-sec border border-stroke rounded-3xl p-6 md:p-8 shadow-sm flex flex-col h-100">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-black text-lg text-text-main">نمودار فروش ۶ ماه اخیر</h2>
                            <button className="text-sm text-primary font-bold hover:underline">گزارش کامل</button>
                        </div>
                        <div className="flex-1 w-full h-full text-sm font-medium" dir="ltr">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={salesData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#C3936D" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#C3936D" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-stroke)" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} dx={-10} tickFormatter={(value) => `${value / 1000000}M`} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '16px', border: '1px solid var(--color-stroke)', backgroundColor: 'var(--color-bg-sec)', color: 'var(--color-text-main)' }}
                                        formatter={(value) => [`${Number(value || 0).toLocaleString('fa-IR')} تومان`, 'فروش']}
                                    />
                                    <Area type="monotone" dataKey="فروش" stroke="#C3936D" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="bg-bg-sec border border-stroke rounded-3xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <ShoppingBag className="w-5 h-5 text-primary" />
                                <h2 className="font-black text-lg text-text-main">آخرین سفارشات ثبت‌شده</h2>
                            </div>
                            <Link href="/admin/orders" className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
                                مشاهده همه
                            </Link>
                        </div>
                        <div className="overflow-x-auto scrollbar-none">
                            <table className="w-full text-right min-w-150">
                                <thead className="bg-bg-main/50 border-b border-stroke">
                                    <tr>
                                        <th className="p-4 text-sm font-black text-text-sec">کد سفارش</th>
                                        <th className="p-4 text-sm font-black text-text-sec">تاریخ</th>
                                        <th className="p-4 text-sm font-black text-text-sec">مبلغ (تومان)</th>
                                        <th className="p-4 text-sm font-black text-text-sec">وضعیت</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-stroke">
                                    {orders.slice(0, 5).length > 0 ? (
                                        orders.slice(0, 5).map((order) => (
                                            <tr key={order.id} className="hover:bg-bg-main/30 transition-colors">
                                                <td className="p-4 font-black text-text-main tracking-widest dir-ltr text-left w-fit">{order.id}</td>
                                                <td className="p-4 text-sm font-medium text-text-sec">{order.date}</td>
                                                <td className="p-4 font-black text-text-main">{order.totalPrice.toLocaleString('fa-IR')}</td>
                                                <td className="p-4">
                                                    <span className="bg-secondary/30 text-primary text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap">
                                                        {order.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="p-8 text-center text-text-sec font-bold">
                                                هنوز سفارشی ثبت نشده است.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-1 flex flex-col gap-6">
                    <div className="bg-bg-sec border border-stroke rounded-3xl p-6 shadow-sm flex-1">
                        <div className="flex items-center gap-2 mb-6">
                            <Package className="w-5 h-5 text-primary" />
                            <h2 className="font-black text-lg text-text-main">محصولات تازه‌افزوده</h2>
                        </div>
                        {isLoading ? (
                            <div className="flex justify-center py-6"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                {recentProducts.map((prod) => (
                                    <div key={prod.id} className="flex items-center gap-3 border-b border-stroke last:border-0 pb-3 last:pb-0">
                                        <div className="w-10 h-10 bg-bg-main border border-stroke rounded-lg relative overflow-hidden shrink-0">
                                            <Image src={prod.thumbnail} alt={prod.title} fill className="object-contain" sizes="40px" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-text-main line-clamp-1">{prod.title}</span>
                                            <span className="text-xs text-text-sec">${prod.price}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="bg-bg-sec border border-stroke rounded-3xl p-6 shadow-sm flex-1">
                        <div className="flex items-center gap-2 mb-6">
                            <UserPlus className="w-5 h-5 text-primary" />
                            <h2 className="font-black text-lg text-text-main">ثبت‌نام‌های اخیر</h2>
                        </div>
                        {isLoading ? (
                            <div className="flex justify-center py-6"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                {recentUsers.map((user) => (
                                    <div key={user.id} className="flex items-center gap-3 border-b border-stroke last:border-0 pb-3 last:pb-0">
                                        <div className="w-10 h-10 bg-bg-main border border-stroke rounded-full relative overflow-hidden shrink-0">
                                            <Image src={user.image} alt={user.firstName} fill className="object-cover" sizes="40px" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-text-main">{user.firstName} {user.lastName}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}