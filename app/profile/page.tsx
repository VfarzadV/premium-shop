"use client";

import { useState } from 'react';
import { User, ShoppingBag, Heart, MapPin, LogOut, Shield, KeyRound, SearchX } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/useUserStore';
import Swal from 'sweetalert2';

const tabs = [
    { id: 'account', title: 'اطلاعات حساب', icon: User },
    { id: 'orders', title: 'سفارش ها', icon: ShoppingBag },
    { id: 'wishlist', title: 'لیست علاقه مندی ها', icon: Heart },
    { id: 'addresses', title: 'آدرس ها', icon: MapPin },
];

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('account');
    const router = useRouter();
    const { phone, firstName, lastName, displayName, email, updateProfile, logout } = useUserStore();

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

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    return (
        <main className="w-[90%] lg:w-[85%] mx-auto py-8 md:py-12 min-h-screen flex flex-col gap-8">

            {/* ================= هدر پنل کاربری ================= */}
            <div className="bg-white rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between border border-stroke shadow-sm relative overflow-hidden group">
                {/* افکت پس‌زمینه تزئینی */}
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

            {/* ================= منوی تب‌ها ================= */}
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
                                : 'bg-white border-stroke text-text-sec hover:border-primary/40 hover:bg-secondary/10 hover:text-primary'
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

            {/* ================= محتوای تب‌ها ================= */}
            <div className="bg-white border border-stroke rounded-3xl p-6 md:p-10 shadow-sm min-h-[400px]">

                {/* ---------- تب اطلاعات حساب ---------- */}
                {activeTab === 'account' && (
                    <form className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col gap-10" onSubmit={handleSaveProfile}>

                        {/* اطلاعات فردی */}
                        <div>
                            <div className="flex items-center gap-2 mb-6 border-b border-stroke pb-4">
                                <User className="w-5 h-5 text-primary" />
                                <h2 className="text-lg font-black text-text-main">اطلاعات هویتی</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-text-sec text-right">نام <span className="text-red-500">*</span></label>
                                    <input name="firstName" value={formData.firstName} onChange={handleChange} type="text" className="w-full bg-bg-sec border border-stroke rounded-2xl py-3.5 px-5 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-text-main font-medium" placeholder="نام خود را وارد کنید" />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-text-sec text-right">نام خانوادگی <span className="text-red-500">*</span></label>
                                    <input name="lastName" value={formData.lastName} onChange={handleChange} type="text" className="w-full bg-bg-sec border border-stroke rounded-2xl py-3.5 px-5 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-text-main font-medium" placeholder="نام خانوادگی خود را وارد کنید" />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-text-sec text-right">نام نمایشی <span className="text-red-500">*</span></label>
                                    <input name="displayName" value={formData.displayName} onChange={handleChange} type="text" className="w-full bg-bg-sec border border-stroke rounded-2xl py-3.5 px-5 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-text-main font-medium" placeholder="مثلاً: فرهاد وطن‌دوست" />
                                    <span className="text-xs text-text-sec/70 mt-1 pr-2">به این صورت اسم شما در بخش نظرات دیده خواهد شد.</span>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-text-sec text-right">آدرس ایمیل</label>
                                    <input name="email" value={formData.email} onChange={handleChange} type="email" dir="ltr" className="w-full bg-bg-sec border border-stroke rounded-2xl py-3.5 px-5 text-left focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-text-main font-medium" placeholder="example@email.com" />
                                </div>
                            </div>
                        </div>

                        {/* تنظیمات رمز عبور */}
                        <div className="bg-bg-sec/50 border border-stroke rounded-3xl p-6 md:p-8">
                            <div className="flex items-center gap-2 mb-6 border-b border-stroke pb-4">
                                <Shield className="w-5 h-5 text-primary" />
                                <h3 className="text-lg font-black text-text-main">تنظیمات رمز عبور</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-text-sec text-right">رمز عبور قبلی</label>
                                    <div className="relative">
                                        <input type="password" dir="ltr" className="w-full bg-white border border-stroke rounded-2xl py-3.5 pl-4 pr-11 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-text-main" placeholder="••••••••" />
                                        <KeyRound className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-sec/50" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-text-sec text-right">رمز عبور جدید</label>
                                    <div className="relative">
                                        <input type="password" dir="ltr" className="w-full bg-white border border-stroke rounded-2xl py-3.5 pl-4 pr-11 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-text-main" placeholder="••••••••" />
                                        <KeyRound className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-sec/50" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-text-sec text-right">تکرار رمز جدید</label>
                                    <div className="relative">
                                        <input type="password" dir="ltr" className="w-full bg-white border border-stroke rounded-2xl py-3.5 pl-4 pr-11 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-text-main" placeholder="••••••••" />
                                        <KeyRound className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-sec/50" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* دکمه ذخیره */}
                        <div className="flex justify-end pt-2">
                            <button type="submit" className="w-full md:w-auto bg-primary text-white font-black py-4 px-12 rounded-2xl hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/20 active:scale-95 transition-all duration-300">
                                ذخیره اطلاعات حساب
                            </button>
                        </div>
                    </form>
                )}

                {/* ---------- وضعیت‌های خالی (Empty States) برای سایر تب‌ها ---------- */}
                {activeTab === 'orders' && (
                    <div className="animate-in zoom-in-95 duration-500 h-full min-h-[300px] flex flex-col items-center justify-center text-center gap-4">
                        <div className="w-24 h-24 bg-secondary/30 rounded-full flex items-center justify-center mb-2">
                            <ShoppingBag className="w-10 h-10 text-primary opacity-50" />
                        </div>
                        <h3 className="text-xl font-black text-text-main">سفارشی یافت نشد!</h3>
                        <p className="text-text-sec">شما هنوز هیچ سفارشی در فروشگاه ثبت نکرده‌اید.</p>
                    </div>
                )}

                {activeTab === 'wishlist' && (
                    <div className="animate-in zoom-in-95 duration-500 h-full min-h-[300px] flex flex-col items-center justify-center text-center gap-4">
                        <div className="w-24 h-24 bg-secondary/30 rounded-full flex items-center justify-center mb-2">
                            <Heart className="w-10 h-10 text-primary opacity-50" />
                        </div>
                        <h3 className="text-xl font-black text-text-main">لیست علاقه‌مندی‌ها خالی است!</h3>
                        <p className="text-text-sec">محصولاتی که دوست دارید را به این لیست اضافه کنید.</p>
                    </div>
                )}

                {activeTab === 'addresses' && (
                    <div className="animate-in zoom-in-95 duration-500 h-full min-h-[300px] flex flex-col items-center justify-center text-center gap-4">
                        <div className="w-24 h-24 bg-secondary/30 rounded-full flex items-center justify-center mb-2">
                            <MapPin className="w-10 h-10 text-primary opacity-50" />
                        </div>
                        <h3 className="text-xl font-black text-text-main">آدرسی ثبت نشده است!</h3>
                        <p className="text-text-sec">برای ارسال سریع‌تر سفارشات، آدرس خود را ثبت کنید.</p>
                    </div>
                )}

            </div>
        </main>
    );
}