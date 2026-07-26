import Image from 'next/image';
import Link from 'next/link';
import { FileText, User, Calendar } from 'lucide-react';

const posts = [
    { id: 1, title: 'راهنمای خرید بهترین گوشی‌های هوشمند در سال جاری', author: 'فرزاد', date: '۲۲ خرداد ۱۴۰۳', image: '/blog.png' },
    { id: 2, title: 'چگونه استایل شخصی خود را با لباس‌های کلاسیک بسازیم؟', author: 'فرهاد', date: '۲۰ خرداد ۱۴۰۳', image: '/blog.png' },
    { id: 3, title: 'معرفی ۵ گجت کاربردی که هر خانه‌ای به آن‌ها نیاز دارد', author: 'فرزاد', date: '۱۸ خرداد ۱۴۰۳', image: '/blog.png' },
];

export default function BlogSection() {
    return (
        <section className="w-full mt-12 mb-20">
            <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2 text-text-main">
                    <FileText className="w-6 h-6 text-text-sec" />
                    <h2 className="text-lg md:text-xl font-bold whitespace-nowrap">وبلاگ و نوشته‌ها</h2>
                </div>
                <div className="h-px w-full bg-stroke rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <div key={post.id} className="bg-bg-main border border-stroke rounded-2xl overflow-hidden hover:shadow-md transition-shadow group">
                        <Link href={`/blog/${post.id}`} className="relative block w-full aspect-4/3 overflow-hidden bg-bg-sec">
                            <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </Link>
                        <div className="p-4 flex flex-col gap-4">
                            <Link href={`/blog/${post.id}`}>
                                <h3 className="font-bold text-text-main text-sm md:text-base leading-relaxed line-clamp-2 hover:text-primary transition-colors">
                                    {post.title}
                                </h3>
                            </Link>
                            <div className="flex items-center justify-between text-xs text-text-sec mt-2 pt-4 border-t border-stroke/50">
                                <div className="flex items-center gap-1">
                                    <User className="w-4 h-4" />
                                    <span>{post.author}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>{post.date}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}