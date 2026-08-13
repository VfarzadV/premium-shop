"use client";

import { Sparkles } from 'lucide-react';
import dynamic from 'next/dynamic';
const ModelViewer = dynamic(() => import('./ModelViewer'), { ssr: false });

export default function StoreGallery() {
    return (
        <section className="w-full mt-12 md:mt-16">
            <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-2 text-text-main">
                    <Sparkles className="w-6 h-6 text-yellow-500" />
                    <h2 className="text-lg md:text-xl font-black whitespace-nowrap">گالری محصولات ویژه</h2>
                </div>
                <div className="h-px w-full bg-stroke rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-125">
                <div className="lg:col-span-2 bg-linear-to-br from-bg-sec to-stroke/30 border border-stroke rounded-3xl p-8 relative overflow-hidden group flex flex-col justify-between h-100 lg:h-full">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--color-primary)_1px,transparent_1px)] bg-size-[24px_24px] opacity-10"></div>
                    <div className="relative z-10 pointer-events-none">
                        <span className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-full shadow-md">نسل نهم</span>
                        <h3 className="text-3xl md:text-4xl font-black text-text-main mt-4">پلی‌استیشن ۵</h3>
                        <p className="text-text-sec mt-2 font-medium">تجربه بازی با بالاترین گرافیک ممکن</p>
                    </div>
                    <div className="absolute inset-0 w-full h-full z-0 translate-y-10 lg:translate-y-0 lg:-translate-x-20">
                        <ModelViewer path="/models/ps5.glb" scale={0.009} position={[0, 0, 0]} />
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row lg:flex-col gap-6 lg:col-span-1 h-full">
                    <div className="flex-1 w-full bg-linear-to-bl from-bg-sec to-stroke/30 border border-stroke rounded-3xl p-6 relative overflow-hidden group h-72 lg:h-auto">
                        <div className="relative z-10 pointer-events-none">
                            <h3 className="text-xl font-black text-text-main">کفش ورزشی</h3>
                            <p className="text-text-sec text-sm mt-1">مدل‌های جدید و جذاب</p>
                        </div>
                        <div className="absolute inset-0 w-full h-full z-0 translate-y-6">
                            <ModelViewer path="/models/shoes.glb" scale={12} position={[0, 0, 0]} />
                        </div>
                    </div>
                    <div className="flex-1 w-full bg-linear-to-tr from-bg-sec to-stroke/30 border border-stroke rounded-3xl p-6 relative overflow-hidden group h-72 lg:h-auto">
                        <div className="relative z-10 pointer-events-none">
                            <h3 className="text-xl font-black text-text-main">گوشی هوشمند</h3>
                            <p className="text-text-sec text-sm mt-1">تجربه تکنولوژی برتر</p>
                        </div>
                        <div className="absolute inset-0 w-full h-full z-0 translate-y-6">
                            <ModelViewer path="/models/phone.glb" scale={16} position={[0, 0, 0]} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}