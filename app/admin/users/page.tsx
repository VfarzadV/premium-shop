"use client";

import { useState, useEffect } from 'react';
import { Users, Search, Edit, Trash2, Mail, Phone, ShieldAlert, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

interface AdminUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    image: string;
    role?: string;
}

export default function AdminUsersPage() {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('https://dummyjson.com/users?limit=15');
                const data = await res.json();
                setUsers(data.users);
            } catch (error) {
                console.error("خطا در دریافت کاربران:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, []);
    const filteredUsers = users.filter(user =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-bg-sec border border-stroke rounded-3xl p-6 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                        <Users className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-xl font-black text-text-main">کاربران ثبت‌نامی</h1>
                        <p className="text-sm text-text-sec mt-1">مدیریت حساب‌های کاربری و سطح دسترسی مشتریان</p>
                    </div>
                </div>
                <div className="relative w-full md:w-80">
                    <input
                        type="text"
                        placeholder="جستجوی نام یا ایمیل کاربر..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-bg-main border border-stroke rounded-xl py-3 pr-11 pl-4 focus:outline-none focus:border-primary text-sm font-medium transition-colors text-text-main text-right"
                    />
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-sec" />
                </div>
            </div>
            <div className="bg-bg-sec border border-stroke rounded-3xl shadow-sm flex-1">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <div className="w-10 h-10 border-4 border-stroke border-t-primary rounded-full animate-spin"></div>
                        <p className="text-text-sec font-medium">در حال بارگذاری لیست کاربران...</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto ">
                        <table className="w-full text-right min-w-225">
                            <thead className="bg-bg-main/50 border-b border-stroke">
                                <tr>
                                    <th className="p-5 text-sm font-black text-text-sec w-16">آیدی</th>
                                    <th className="p-5 text-sm font-black text-text-sec">مشخصات کاربر</th>
                                    <th className="p-5 text-sm font-black text-text-sec">راه‌های ارتباطی</th>
                                    <th className="p-5 text-sm font-black text-text-sec">نقش کاربری</th>
                                    <th className="p-5 text-sm font-black text-text-sec">وضعیت حساب</th>
                                    <th className="p-5 text-sm font-black text-text-sec text-center">عملیات</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stroke">
                                {filteredUsers.map((user, index) => (
                                    <tr key={user.id} className="hover:bg-bg-main/30 transition-colors group">
                                        <td className="p-5 text-sm font-black text-text-sec text-center">{user.id}</td>
                                        <td className="p-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 relative bg-bg-main rounded-full border-2 border-stroke overflow-hidden shrink-0">
                                                    <Image
                                                        src={user.image}
                                                        alt={user.firstName}
                                                        fill
                                                        sizes="48px"
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <span className="font-bold text-text-main">
                                                    {user.firstName} {user.lastName}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <div className="flex flex-col gap-1.5 text-sm font-medium text-text-sec">
                                                <div className="flex items-center gap-2">
                                                    <Mail className="w-4 h-4 opacity-70" />
                                                    <span className="dir-ltr">{user.email}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Phone className="w-4 h-4 opacity-70" />
                                                    <span className="dir-ltr">{user.phone}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            {index === 0 ? (
                                                <span className="flex items-center gap-1.5 text-primary font-bold text-sm bg-primary/10 px-3 py-1.5 rounded-lg w-fit">
                                                    <ShieldAlert className="w-4 h-4" />
                                                    مدیر سیستم
                                                </span>
                                            ) : (
                                                <span className="text-text-sec font-bold text-sm px-3 py-1.5">
                                                    مشتری عادی
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-5">
                                            <span className="flex items-center gap-1.5 text-green-500 font-bold text-sm">
                                                <CheckCircle2 className="w-4 h-4" />
                                                فعال
                                            </span>
                                        </td>
                                        <td className="p-5">
                                            <div className="flex items-center justify-center gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 bg-bg-main border border-stroke rounded-lg text-text-sec hover:text-blue-500 hover:border-blue-500 transition-colors" title="ویرایش اطلاعات">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 bg-bg-main border border-stroke rounded-lg text-text-sec hover:text-red-500 hover:border-red-500 transition-colors" title="مسدود کردن کاربر">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredUsers.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="p-10 text-center text-text-sec font-bold">
                                            هیچ کاربری با این مشخصات یافت نشد!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}