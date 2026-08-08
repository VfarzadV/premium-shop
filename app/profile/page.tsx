"use client";

import { useState } from 'react';
import { User, ShoppingBag, Heart, MapPin, LogOut, Shield, KeyRound, Trash2, Award, Ticket } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/useUserStore';
import Swal from 'sweetalert2';
import { useOrderStore } from '@/store/useOrderStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { usePointsStore } from '@/store/usePointsStore';
import ProductCard from '@/components/ProductCard';

const tabs = [
    { id: 'account', title: 'اطلاعات حساب', icon: User },
    { id: 'orders', title: 'سفارش‌ها', icon: ShoppingBag },
    { id: 'wishlist', title: 'علاقه‌مندی‌ها', icon: Heart },
    { id: 'addresses', title: 'آدرس‌ها', icon: MapPin },
    { id: 'club', title: 'باشگاه مشتریان', icon: Award },
];

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('account');
    const router = useRouter();
    const { phone, firstName, lastName, displayName, email, updateProfile, logout } = useUserStore();
    const { orders, removeOrder } = useOrderStore();
    const { items: wishlistItems } = useWishlistStore();
    const { points, redeemPoints } = usePointsStore();


    const [formData, setFormData] = useState({
        firstName: firstName || '',
        lastName: lastName || '',
        displayName: displayName || '',
        email: email || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSaveProfile = (e: React.FormEvent) => {
        e.preventDefault();
        updateProfile(formData);
        Swal.fire({
            title: 'ثبت موفق!',
            text: 'اطلاعات حساب کاربری شما با موفقیت به‌روزرسانی شد.',
            icon: 'success',
            confirmButtonText: 'تایید و بازگشت به صفحه اصلی',
            confirmButtonColor: '#6E543D',
            iconColor: '#6E543D',
            customClass: {
                popup: 'rounded-3xl font-sans',
                title: 'font-black text-text-main',
                htmlContainer: 'text-text-sec text-sm mt-2',
                confirmButton: 'font-bold rounded-xl px-8 py-3 w-full sm:w-auto',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                router.push('/');
            }
        });
    };

    const handleDeleteOrder = (id: string) => {
        Swal.fire({
            title: 'حذف از تاریخچه',
            text: 'آیا از حذف این سفارش از تاریخچه خود مطمئن هستید؟',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#E9E9E8',
            confirmButtonText: 'بله، حذف کن',
            cancelButtonText: 'انصراف',
            customClass: {
                popup: 'rounded-3xl font-sans',
                title: 'font-black text-text-main',
                htmlContainer: 'text-text-sec text-sm mt-2',
                confirmButton: 'font-bold rounded-xl px-6 py-3',
                cancelButton: 'font-bold rounded-xl px-6 py-3 text-text-main hover:bg-stroke/50 transition-colors',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                removeOrder(id);
                Swal.fire({
                    title: 'حذف شد!',
                    text: 'سفارش با موفقیت از تاریخچه شما پاک شد.',
                    icon: 'success',
                    confirmButtonText: 'باشه',
                    confirmButtonColor: '#6E543D',
                    customClass: {
                        popup: 'rounded-3xl font-sans',
                        title: 'font-black text-text-main',
                        confirmButton: 'font-bold rounded-xl px-8 py-3',
                    }
                });
            }
        });
    };

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    const handleRedeem = (cost: number) => {
        const result = redeemPoints(cost);
        if (result.success) {
            Swal.fire({
                title: 'کد تخفیف شما!',
                html: `<p class="text-text-sec">${result.message}</p><div class="bg-bg-sec border border-stroke p-4 rounded-xl mt-4 text-2xl font-black tracking-widest text-primary dir-ltr">${result.discountCode}</div><p class="text-xs text-text-sec mt-2">کد را کپی کرده و در سبد خرید استفاده کنید.</p>`,
                icon: 'success',
                confirmButtonText: 'متوجه شدم',
                confirmButtonColor: '#6E543D',
                background: 'var(--color-bg-main)',
                color: 'var(--color-text-main)', 
                customClass: { 
                    popup: 'rounded-3xl font-sans border border-stroke', 
                    title: 'font-black', 
                    confirmButton: 'font-bold rounded-xl px-8 py-3' 
                }
            });
        } else {
            Swal.fire({
                title: 'امتیاز ناکافی!',
                text: result.message,
                icon: 'error',
                confirmButtonText: 'باشه',
                confirmButtonColor: '#ef4444',
                background: 'var(--color-bg-main)', 
                color: 'var(--color-text-main)',
                customClass: { 
                    popup: 'rounded-3xl font-sans border border-stroke', 
                    title: 'font-black', 
                    confirmButton: 'font-bold rounded-xl px-8 py-3' 
                }
            });
        }
    };

    return (
        <main className="w-[90%] lg:w-[85%] mx-auto py-8 md:py-12 min-h-screen flex flex-col gap-8">
            <div className="bg-bg-sec rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between border border-stroke shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/30 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2 transition-transform group-hover:scale-150 duration-700"></div>
                <div className="flex items-center gap-4 text-text-main z-10">
                    <div className="w-16 h-16 bg-secondary/30 text-primary rounded-2xl flex items-center justify-center border border-secondary/50 shadow-inner">
                        <User className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-xl md:text-2xl font-black mb-1">حساب کاربری</h1>
                        {phone ? (
                            <p className="text-text-sec text-sm md:text-base dir-ltr text-right font-medium tracking-wider">{phone}</p>
                        ) : (
                            <p className="text-text-sec text-sm">کاربر میهمان</p>
                        )}
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="mt-6 sm:mt-0 flex items-center gap-2 bg-bg-sec border border-stroke px-6 py-3 rounded-xl text-text-sec hover:text-white hover:bg-red-500 hover:border-red-500 hover:shadow-lg hover:shadow-red-500/20 active:scale-95 transition-all z-10"
                >
                    <span className="font-bold text-sm">خروج از حساب</span>
                    <LogOut className="w-5 h-5" />
                </button>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center justify-center gap-3 p-4 md:p-5 rounded-2xl border transition-all duration-300 active:scale-95 ${isActive
                                ? 'bg-primary border-primary shadow-md shadow-primary/20 text-white transform -translate-y-1'
                                : 'bg-bg-sec border-stroke text-text-sec hover:border-primary/40 hover:bg-secondary/10 hover:text-primary'
                                }`}
                        >
                            <Icon className={`w-5 h-5 md:w-6 md:h-6 ${isActive ? 'text-white' : ''}`} />
                            <span className="font-bold text-sm md:text-base whitespace-nowrap">
                                {tab.title}
                            </span>
                        </button>
                    );
                })}
            </div>
            <div className="bg-bg-sec border border-stroke rounded-3xl p-6 md:p-10 shadow-sm min-h-100">
                {activeTab === 'account' && (
                    <form className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col gap-10" onSubmit={handleSaveProfile}>
                        <div>
                            <div className="flex items-center gap-2 mb-6 border-b border-stroke pb-4">
                                <User className="w-5 h-5 text-primary" />
                                <h2 className="text-lg font-black text-text-main">اطلاعات هویتی</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-text-sec text-right">نام <span className="text-red-500">*</span></label>
                                    <input name="firstName" value={formData.firstName} onChange={handleChange} type="text" className="w-full bg-secondary border border-stroke rounded-2xl py-3.5 px-5 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-text-main font-medium" placeholder="نام خود را وارد کنید" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-text-sec text-right">نام خانوادگی <span className="text-red-500">*</span></label>
                                    <input name="lastName" value={formData.lastName} onChange={handleChange} type="text" className="w-full bg-secondary border border-stroke rounded-2xl py-3.5 px-5 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-text-main font-medium" placeholder="نام خانوادگی خود را وارد کنید" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-text-sec text-right">نام نمایشی <span className="text-red-500">*</span></label>
                                    <input name="displayName" value={formData.displayName} onChange={handleChange} type="text" className="w-full bg-secondary border border-stroke rounded-2xl py-3.5 px-5 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-text-main font-medium" placeholder="مثلاً: فرزاد وطن‌دوست" />
                                    <span className="text-xs text-text-sec/70 mt-1 pr-2">به این صورت اسم شما در بخش نظرات دیده خواهد شد.</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-text-sec text-right">آدرس ایمیل</label>
                                    <input name="email" value={formData.email} onChange={handleChange} type="email" dir="ltr" className="w-full bg-secondary border border-stroke rounded-2xl py-3.5 px-5 text-left focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-text-main font-medium" placeholder="example@email.com" />
                                </div>
                            </div>
                        </div>
                        <div className="bg-bg-sec/50 border border-stroke rounded-3xl p-6 md:p-8">
                            <div className="flex items-center gap-2 mb-6 border-b border-stroke pb-4">
                                <Shield className="w-5 h-5 text-primary" />
                                <h3 className="text-lg font-black text-text-main">تنظیمات رمز عبور</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-text-sec text-right">رمز عبور قبلی</label>
                                    <div className="relative">
                                        <input type="password" dir="ltr" className="w-full bg-secondary border border-stroke rounded-2xl py-3.5 pl-4 pr-11 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-text-main" placeholder="••••••••" />
                                        <KeyRound className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-sec/50" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-text-sec text-right">رمز عبور جدید</label>
                                    <div className="relative">
                                        <input type="password" dir="ltr" className="w-full bg-secondary border border-stroke rounded-2xl py-3.5 pl-4 pr-11 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-text-main" placeholder="••••••••" />
                                        <KeyRound className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-sec/50" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-text-sec text-right">تکرار رمز جدید</label>
                                    <div className="relative">
                                        <input type="password" dir="ltr" className="w-full bg-secondary border border-stroke rounded-2xl py-3.5 pl-4 pr-11 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-text-main" placeholder="••••••••" />
                                        <KeyRound className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-sec/50" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end pt-2">
                            <button type="submit" className="w-full md:w-auto bg-primary text-white font-black py-4 px-12 rounded-2xl hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/20 active:scale-95 transition-all duration-300">
                                ذخیره اطلاعات حساب
                            </button>
                        </div>
                    </form>
                )}
                {activeTab === 'orders' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col gap-6">
                        <div className="flex items-center gap-2 mb-2 border-b border-stroke pb-4">
                            <ShoppingBag className="w-5 h-5 text-primary" />
                            <h2 className="text-lg font-black text-text-main">تاریخچه سفارشات</h2>
                        </div>
                        {orders.length > 0 ? (
                            <div className="flex flex-col gap-4">
                                {orders.map((order) => (
                                    <div key={order.id} className="bg-bg-sec/50 border border-stroke rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-5 hover:border-primary/40 transition-colors">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-3">
                                                <span className="font-black text-text-main tracking-wider dir-ltr text-left">{order.id}</span>
                                                <span className="bg-secondary/30 text-primary text-xs font-bold px-2.5 py-1 rounded-lg">
                                                    {order.status}
                                                </span>
                                            </div>
                                            <span className="text-sm text-text-sec font-medium">
                                                ثبت شده در {order.date} • {order.items.reduce((acc, item) => acc + item.quantity, 0)} کالا
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between md:flex-col md:items-end gap-2 border-t border-stroke pt-4 md:border-none md:pt-0">
                                            <div className="flex items-center gap-1">
                                                <span className="font-black text-text-main text-lg">{order.totalPrice.toLocaleString('fa-IR')}</span>
                                                <span className="text-xs text-text-sec">تومان</span>
                                            </div>
                                            <button
                                                onClick={() => handleDeleteOrder(order.id)}
                                                className="flex items-center gap-1.5 text-sm text-red-500 font-bold hover:bg-red-50 px-3 py-2 rounded-xl transition-colors active:scale-95"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                حذف تاریخچه
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="h-full min-h-[40vh] flex flex-col items-center justify-center text-center gap-4">
                                <div className="w-24 h-24 bg-secondary/30 rounded-full flex items-center justify-center mb-2">
                                    <ShoppingBag className="w-10 h-10 text-primary opacity-50" />
                                </div>
                                <h3 className="text-xl font-black text-text-main">سفارشی ثبت نشده است!</h3>
                                <p className="text-text-sec">شما هنوز هیچ خریدی از فروشگاه نداشته‌اید.</p>
                            </div>
                        )}
                    </div>
                )}
                {activeTab === 'wishlist' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col gap-6">
                        <div className="flex items-center gap-2 mb-2 border-b border-stroke pb-4">
                            <Heart className="w-5 h-5 text-primary" />
                            <h2 className="text-lg font-black text-text-main">لیست علاقه‌مندی‌ها</h2>
                        </div>
                        {wishlistItems.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
                                {wishlistItems.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="h-full min-h-[40vh] flex flex-col items-center justify-center text-center gap-4">
                                <div className="w-24 h-24 bg-secondary/30 rounded-full flex items-center justify-center mb-2">
                                    <Heart className="w-10 h-10 text-primary opacity-50" />
                                </div>
                                <h3 className="text-xl font-black text-text-main">لیست علاقه‌مندی‌های شما خالی است!</h3>
                                <p className="text-text-sec">محصولاتی که دوست دارید را با کلیک روی آیکون قلب به این لیست اضافه کنید.</p>
                            </div>
                        )}
                    </div>
                )}
                {activeTab === 'addresses' && (
                    <div className="animate-in zoom-in-95 duration-500 h-full min-h-75 flex flex-col items-center justify-center text-center gap-4">
                        <div className="w-24 h-24 bg-secondary/30 rounded-full flex items-center justify-center mb-2">
                            <MapPin className="w-10 h-10 text-primary opacity-50" />
                        </div>
                        <h3 className="text-xl font-black text-text-main">آدرسی ثبت نشده است!</h3>
                        <p className="text-text-sec">برای ارسال سریع‌تر سفارشات، آدرس خود را ثبت کنید.</p>
                    </div>
                )}
                {activeTab === 'club' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col gap-6">
                        <div className="flex items-center gap-2 mb-2 border-b border-stroke pb-4">
                            <Award className="w-5 h-5 text-primary" />
                            <h2 className="text-lg font-black text-text-main">باشگاه مشتریان پریمیوم</h2>
                        </div>
                        <div className="bg-linear-to-br from-primary to-yellow-600 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-primary/20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                            <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-right gap-2">
                                <span className="text-white/80 font-medium">موجودی امتیازات شما</span>
                                <div className="flex items-end gap-2">
                                    <span className="text-5xl font-black">{points}</span>
                                    <span className="text-lg mb-1">امتیاز</span>
                                </div>
                            </div>
                            <div className="relative z-10 w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 shadow-inner">
                                <Award className="w-12 h-12 text-white" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="font-bold text-text-main mb-4">تبدیل امتیاز به جایزه</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-bg-sec border border-stroke rounded-2xl p-6 flex flex-col gap-4 hover:border-primary/50 transition-colors group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Ticket className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-text-main">تخفیف ۵۰ هزار تومانی</h4>
                                            <span className="text-sm text-text-sec">هزینه: ۲۰ امتیاز</span>
                                        </div>
                                    </div>
                                    <button onClick={() => handleRedeem(20)} className="w-full bg-primary/10 text-primary font-bold py-3 rounded-xl hover:bg-primary hover:text-white transition-colors mt-2">
                                        دریافت کد تخفیف
                                    </button>
                                </div>
                                <div className="bg-bg-sec border border-stroke rounded-2xl p-6 flex flex-col gap-4 hover:border-primary/50 transition-colors group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Ticket className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-text-main">تخفیف ۱۵۰ هزار تومانی</h4>
                                            <span className="text-sm text-text-sec">هزینه: ۵۰ امتیاز</span>
                                        </div>
                                    </div>
                                    <button onClick={() => handleRedeem(50)} className="w-full bg-primary/10 text-primary font-bold py-3 rounded-xl hover:bg-primary hover:text-white transition-colors mt-2">
                                        دریافت کد تخفیف
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}