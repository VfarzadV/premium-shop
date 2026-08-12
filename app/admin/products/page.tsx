"use client";

import { useState, useEffect } from 'react';
import { Package, Search, Edit, Trash2, Plus, AlertCircle } from 'lucide-react';
import Image from 'next/image';

interface AdminProduct {
    id: number;
    title: string;
    price: number;
    stock: number;
    category: string;
    thumbnail: string;
}

export default function AdminProductsPage() {
    const [products, setProducts] = useState<AdminProduct[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('https://dummyjson.com/products?limit=100');
                const data = await res.json();
                setProducts(data.products);
            } catch (error) {
                console.error("خطا در دریافت محصولات:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-bg-sec border border-stroke rounded-3xl p-6 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                        <Package className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-xl font-black text-text-main">موجودی کالاها</h1>
                        <p className="text-sm text-text-sec mt-1">مدیریت محصولات، قیمت‌ها و موجودی انبار</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative w-full md:w-72">
                        <input
                            type="text"
                            placeholder="جستجوی نام کالا..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-bg-main border border-stroke rounded-xl py-3 pr-11 pl-4 focus:outline-none focus:border-primary text-sm font-medium transition-colors text-text-main"
                        />
                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-sec" />
                    </div>
                    <button className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-3 rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors shrink-0">
                        <Plus className="w-5 h-5" />
                        <span className="hidden sm:inline">افزودن کالا</span>
                    </button>
                </div>
            </div>
            <div className="bg-bg-sec border border-stroke rounded-3xl overflow-hidden shadow-sm flex-1">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <div className="w-10 h-10 border-4 border-stroke border-t-primary rounded-full animate-spin"></div>
                        <p className="text-text-sec font-medium">در حال دریافت لیست کالاها از دیتابیس...</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto scrollbar-none">
                        <table className="w-full text-right min-w-200">
                            <thead className="bg-bg-main/50 border-b border-stroke">
                                <tr>
                                    <th className="p-5 text-sm font-black text-text-sec w-16">آیدی</th>
                                    <th className="p-5 text-sm font-black text-text-sec">تصویر و نام کالا</th>
                                    <th className="p-5 text-sm font-black text-text-sec">دسته‌بندی</th>
                                    <th className="p-5 text-sm font-black text-text-sec">قیمت پایه</th>
                                    <th className="p-5 text-sm font-black text-text-sec">موجودی انبار</th>
                                    <th className="p-5 text-sm font-black text-text-sec text-center">عملیات</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stroke">
                                {filteredProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-bg-main/30 transition-colors group">
                                        <td className="p-5 text-sm font-black text-text-sec text-center">{product.id}</td>
                                        <td className="p-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 relative bg-bg-main rounded-xl border border-stroke overflow-hidden shrink-0 p-1">
                                                    <Image
                                                        src={product.thumbnail}
                                                        alt={product.title}
                                                        fill
                                                        sizes="48px"
                                                        className="object-contain"
                                                    />
                                                </div>
                                                <span className="font-bold text-text-main line-clamp-1">{product.title}</span>
                                            </div>
                                        </td>
                                        <td className="p-5 text-sm font-medium text-text-sec capitalize">{product.category}</td>
                                        <td className="p-5 font-black text-text-main dir-ltr text-left w-fit">
                                            ${product.price}
                                        </td>
                                        <td className="p-5">
                                            {product.stock > 10 ? (
                                                <span className="flex items-center gap-1.5 text-green-500 font-bold text-sm">
                                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                                    {product.stock} عدد
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1.5 text-orange-500 font-bold text-sm bg-orange-500/10 px-2 py-1 rounded-lg w-fit">
                                                    <AlertCircle className="w-4 h-4" />
                                                    فقط {product.stock} عدد مانده
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-5">
                                            <div className="flex items-center justify-center gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 bg-bg-main border border-stroke rounded-lg text-text-sec hover:text-blue-500 hover:border-blue-500 transition-colors" title="ویرایش کالا">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 bg-bg-main border border-stroke rounded-lg text-text-sec hover:text-red-500 hover:border-red-500 transition-colors" title="حذف کالا">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredProducts.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="p-10 text-center text-text-sec font-bold">
                                            هیچ کالایی با این نام یافت نشد!
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