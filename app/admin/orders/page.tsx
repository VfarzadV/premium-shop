"use client";

import { useState } from 'react';
import { ShoppingBag, Search, Trash2, Eye, CheckCircle } from 'lucide-react';
import { useOrderStore } from '@/store/useOrderStore';
import Swal from 'sweetalert2';

export default function AdminOrdersPage() {
    const { orders, removeOrder } = useOrderStore();
    const [searchTerm, setSearchTerm] = useState('');

    const handleDeleteOrder = (id: string) => {
        Swal.fire({
            title: 'حذف سفارش؟',
            text: 'آیا از حذف این سفارش اطمینان دارید؟ این عمل غیرقابل بازگشت است.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#E9E9E8',
            confirmButtonText: 'بله، حذف شود',
            cancelButtonText: 'انصراف',
            customClass: {
                popup: 'rounded-3xl font-sans',
                title: 'font-black text-text-main',
                confirmButton: 'font-bold rounded-xl px-6 py-3',
                cancelButton: 'font-bold rounded-xl px-6 py-3 text-text-main',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                removeOrder(id);
                Swal.fire({
                    title: 'حذف شد!',
                    text: 'سفارش با موفقیت از سیستم پاک شد.',
                    icon: 'success',
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

    const filteredOrders = orders.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-bg-sec border border-stroke rounded-3xl p-6 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                        <ShoppingBag className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-xl font-black text-text-main">مدیریت سفارشات</h1>
                        <p className="text-sm text-text-sec mt-1">لیست تمامی خریدهای ثبت‌شده در فروشگاه</p>
                    </div>
                </div>
                <div className="relative w-full md:w-72">
                    <input
                        type="text"
                        placeholder="جستجوی شماره سفارش..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-bg-main border border-stroke rounded-xl py-3 pr-11 pl-4 focus:outline-none focus:border-primary text-sm font-medium transition-colors text-text-main"
                    />
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-sec" />
                </div>
            </div>
            <div className="bg-bg-sec border border-stroke rounded-3xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto scrollbar-none">
                    <table className="w-full text-right min-w-200">
                        <thead className="bg-bg-main/50 border-b border-stroke">
                            <tr>
                                <th className="p-5 text-sm font-black text-text-sec">شماره سفارش</th>
                                <th className="p-5 text-sm font-black text-text-sec">تاریخ ثبت</th>
                                <th className="p-5 text-sm font-black text-text-sec">تعداد اقلام</th>
                                <th className="p-5 text-sm font-black text-text-sec">مبلغ کل (تومان)</th>
                                <th className="p-5 text-sm font-black text-text-sec">وضعیت</th>
                                <th className="p-5 text-sm font-black text-text-sec text-center">عملیات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stroke">
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-bg-main/30 transition-colors group">
                                        <td className="p-5 font-black text-text-main tracking-widest dir-ltr text-left w-fit">{order.id}</td>
                                        <td className="p-5 text-sm font-medium text-text-sec">{order.date}</td>
                                        <td className="p-5 text-sm font-bold text-text-main">
                                            {order.items.reduce((acc, item) => acc + item.quantity, 0)} کالا
                                        </td>
                                        <td className="p-5 font-black text-primary">
                                            {order.totalPrice.toLocaleString('fa-IR')} تومان
                                        </td>
                                        <td className="p-5">
                                            <span className="bg-secondary/30 text-primary text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap">
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="p-5">
                                            <div className="flex items-center justify-center gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 bg-bg-main border border-stroke rounded-lg text-text-sec hover:text-primary hover:border-primary transition-colors" title="مشاهده جزئیات">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 bg-bg-main border border-stroke rounded-lg text-text-sec hover:text-green-500 hover:border-green-500 transition-colors" title="تایید و ارسال">
                                                    <CheckCircle className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteOrder(order.id)}
                                                    className="p-2 bg-bg-main border border-stroke rounded-lg text-text-sec hover:text-red-500 hover:border-red-500 transition-colors"
                                                    title="حذف سفارش"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="p-10 text-center text-text-sec font-bold">
                                        هیچ سفارشی یافت نشد!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}