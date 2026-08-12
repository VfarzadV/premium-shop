"use client";

import { DollarSign, ShoppingBag, Users, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
    const stats = [
        { id: 1, title: 'درآمد کل (تومان)', value: '۱۲۰,۵۰۰,۰۰۰', icon: DollarSign, color: 'text-green-500', bg: 'bg-green-500/10' },
        { id: 2, title: 'سفارشات موفق', value: '۸۴', icon: ShoppingBag, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { id: 3, title: 'کاربران ثبت‌نامی', value: '۱,۲۵۰', icon: Users, color: 'text-orange-500', bg: 'bg-orange-500/10' },
        { id: 4, title: 'رشد فروش ماهانه', value: '+۲۵٪', icon: TrendingUp, color: 'text-primary', bg: 'bg-primary/10' },
    ];

    const salesData = [
        { name: 'شنبه', فروش: 4000000 },
        { name: 'یکشنبه', فروش: 3000000 },
        { name: 'دوشنبه', فروش: 5000000 },
        { name: 'سه‌شنبه', فروش: 2780000 },
        { name: 'چهارشنبه', فروش: 8900000 },
        { name: 'پنج‌شنبه', فروش: 6390000 },
        { name: 'جمعه', فروش: 9490000 },
    ];

    return (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-2xl md:text-3xl font-black text-text-main mb-2">خلاصه وضعیت سیستم</h1>
                <p className="text-text-sec text-sm">آمار و ارقام کلی فروشگاه شما در یک نگاه.</p>
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
                <div className="lg:col-span-2 bg-bg-sec border border-stroke rounded-3xl p-6 md:p-8 shadow-sm flex flex-col h-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-black text-lg text-text-main">نمودار فروش ۷ روز اخیر</h2>
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
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} dx={-10} tickFormatter={(value) => `${value / 1000000}M`} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    formatter={
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        (value: any) => [`${Number(value).toLocaleString()} تومان`, 'فروش']
                                    }
                                />
                                <Area type="monotone" dataKey="فروش" stroke="#C3936D" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="lg:col-span-1 bg-bg-sec border border-stroke rounded-3xl p-6 md:p-8 shadow-sm">
                    <h2 className="font-black text-lg text-text-main mb-6">فعالیت‌های اخیر</h2>
                    <div className="flex flex-col gap-6">
                        {[
                            { text: 'سفارش جدید PSH-1029 ثبت شد', time: '۱۰ دقیقه پیش', color: 'bg-blue-500' },
                            { text: 'موجودی کالای لپ‌تاپ ایسوس به‌روز شد', time: '۲ ساعت پیش', color: 'bg-green-500' },
                            { text: 'کاربر جدید "علی رضایی" ثبت‌نام کرد', time: '۵ ساعت پیش', color: 'bg-orange-500' },
                            { text: 'سفارش PSH-1028 ارسال شد', time: 'دیروز', color: 'bg-primary' },
                        ].map((activity, idx) => (
                            <div key={idx} className="flex items-start gap-4">
                                <div className={`w-3 h-3 rounded-full mt-1.5 shrink-0 shadow-sm ${activity.color}`}></div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-bold text-text-main">{activity.text}</span>
                                    <span className="text-xs text-text-sec">{activity.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}