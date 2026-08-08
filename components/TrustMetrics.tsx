"use client";

import { useEffect, useState } from 'react';
import { BarChart3, Users, ShieldCheck, Truck } from 'lucide-react';

const metrics = [
    { id: 1, title: 'رضایت مشتریان', percentage: 98, icon: Users, color: 'text-green-400', stroke: 'stroke-green-400' },
    { id: 2, title: 'ارسال به‌موقع', percentage: 95, icon: Truck, color: 'text-blue-400', stroke: 'stroke-blue-400' },
    { id: 3, title: 'کیفیت و اصالت', percentage: 99, icon: ShieldCheck, color: 'text-yellow-400', stroke: 'stroke-yellow-400' },
];

export default function TrustMetrics() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsMounted(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="w-full my-12 md:my-16">
            <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-2 text-text-main">
                    <BarChart3 className="w-6 h-6 text-text-sec" />
                    <h2 className="text-lg md:text-xl font-black whitespace-nowrap">عملکرد پریمیوم‌شاپ در یک نگاه</h2>
                </div>
                <div className="h-px w-full bg-stroke rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {metrics.map((item, index) => {
                    const Icon = item.icon;
                    const radius = 46;
                    const circumference = 2 * Math.PI * radius;
                    const strokeDashoffset = isMounted ? circumference - (item.percentage / 100) * circumference : circumference;
                    return (
                        <div
                            key={item.id}
                            className="bg-linear-to-br from-primary via-primary to-primary/80 border border-white/20 rounded-3xl p-6 md:p-8 flex flex-col items-center justify-center gap-6 shadow-lg text-white hover:shadow-xl hover:border-white/40 transition-all duration-500 group animate-in fade-in slide-in-from-bottom-8"
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            <div className="relative flex items-center justify-center">
                                <svg className="w-32 h-32 transform -rotate-90">
                                    <circle
                                        cx="64"
                                        cy="64"
                                        r={radius}
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        fill="transparent"
                                        className="text-white/20"
                                    />
                                    <circle
                                        cx="64"
                                        cy="64"
                                        r={radius}
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        fill="transparent"
                                        strokeDasharray={circumference}
                                        strokeDashoffset={strokeDashoffset}
                                        strokeLinecap="round"
                                        className={`${item.stroke} transition-all duration-1500 ease-out`}
                                    />
                                </svg>
                                <div className="absolute flex flex-col items-center justify-center">
                                    <span className={`text-2xl font-black ${item.color}`}>
                                        {isMounted ? item.percentage : 0}٪
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2">
                                <div className={`w-10 h-10 rounded-xl bg-white/10 border border-white/25 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform ${item.color}`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-white text-lg mt-1">{item.title}</h3>
                                <p className="text-xs text-white/70">بر اساس داده‌های ثبت‌شده سیستم</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}