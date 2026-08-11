import { DollarSign, ShoppingBag, Users, TrendingUp, Activity } from 'lucide-react';

export default function AdminDashboard() {
    const stats = [
        { id: 1, title: 'درآمد کل (تومان)', value: '۱۲۰,۵۰۰,۰۰۰', icon: DollarSign, color: 'text-green-500', bg: 'bg-green-500/10' },
        { id: 2, title: 'سفارشات موفق', value: '۸۴', icon: ShoppingBag, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { id: 3, title: 'کاربران ثبت‌نامی', value: '۱,۲۵۰', icon: Users, color: 'text-orange-500', bg: 'bg-orange-500/10' },
        { id: 4, title: 'رشد فروش ماهانه', value: '+۲۵٪', icon: TrendingUp, color: 'text-primary', bg: 'bg-primary/10' },
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
                <div className="lg:col-span-2 bg-bg-sec border border-stroke rounded-3xl p-6 md:p-8 shadow-sm flex flex-col h-80">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-black text-lg text-text-main">نمودار فروش ۷ روز اخیر</h2>
                        <button className="text-sm text-primary font-bold hover:underline">گزارش کامل</button>
                    </div>
                    <div className="flex-1 border-2 border-dashed border-stroke rounded-2xl flex flex-col items-center justify-center text-text-sec gap-3 bg-bg-main/50">
                        <Activity className="w-10 h-10 opacity-20" />
                        <span className="text-sm font-medium opacity-50">جایگاه نمودار (در مراحل بعدی اضافه می‌شود)</span>
                    </div>
                </div>
                <div className="lg:col-span-1 bg-bg-sec border border-stroke rounded-3xl p-6 md:p-8 shadow-sm">
                    <h2 className="font-black text-lg text-text-main mb-6">فعالیت‌های اخیر</h2>
                    <div className="flex flex-col gap-6">
                        {[
                            { text: 'سفارش جدید PSH-1029 ثبت شد', time: '۱۰ دقیقه پیش', color: 'bg-blue-500' },
                            { text: 'موجودی کالای لپ‌تاپ ایسوس به‌روز شد', time: '۲ ساعت پیش', color: 'bg-green-500' },
                            { text: 'کاربر جدید "علی رضایی" ثبت‌نام کرد', time: '۵ ساعت پیش', color: 'bg-orange-500' },
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
