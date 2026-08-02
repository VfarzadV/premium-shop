import Link from 'next/link';
import { FileText, Eye, ThumbsUp, BookOpen } from 'lucide-react';

interface Post {
    id: number;
    title: string;
    body: string;
    views: number;
    reactions: {
        likes: number;
        dislikes: number;
    };
}

async function getLatestPosts(): Promise<Post[]> {
    try {
        const res = await fetch('https://dummyjson.com/posts?limit=5', {
            next: { revalidate: 3600 }
        });
        if (!res.ok) return [];
        const data = await res.json();
        return data.posts;
    } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
}

export default async function BlogSection() {
    const posts = await getLatestPosts();
    if (!posts || posts.length === 0) return null;
    const gradients = [
        'from-violet-500 via-fuchsia-500 to-pink-500',
        'from-cyan-500 via-blue-500 to-indigo-600',
        'from-emerald-400 via-teal-500 to-cyan-600',
        'from-amber-400 via-orange-500 to-rose-500',
        'from-pink-400 via-rose-500 to-red-600'
    ];

    return (
        <section className="w-full mt-12 mb-20">
            <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2 text-text-main">
                    <FileText className="w-6 h-6 text-text-sec" />
                    <h2 className="text-lg md:text-xl font-bold whitespace-nowrap">آخرین مقالات مجله</h2>
                </div>
                <div className="h-px w-full bg-stroke rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {posts.map((post, index) => (
                    <div key={post.id} className="bg-bg-main border border-stroke rounded-2xl overflow-hidden hover:shadow-md hover:border-primary/50 transition-all group flex flex-col">
                        <Link href={`/blog/${post.id}`} className="relative block w-full aspect-4/3 overflow-hidden shrink-0">
                            <div className={`w-full h-full bg-linear-to-br ${gradients[index % gradients.length]} p-6 flex flex-col items-center justify-center relative group-hover:scale-105 transition-transform duration-500`}>
                                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-size-[16px_16px]"></div>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/15 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/15 rounded-full blur-xl translate-y-1/2 -translate-x-1/2"></div>
                                <div className="relative z-10 w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 flex items-center justify-center text-white shadow-xl group-hover:-translate-y-1.5 transition-transform duration-300">
                                    <BookOpen className="w-7 h-7 opacity-90" />
                                </div>
                            </div>
                        </Link>
                        <div className="p-4 flex flex-col grow gap-3">
                            <Link href={`/blog/${post.id}`}>
                                <h3 className="font-bold text-text-main text-sm md:text-base leading-relaxed line-clamp-2 hover:text-primary transition-colors">
                                    {post.title}
                                </h3>
                            </Link>
                            <p className="text-xs text-text-sec line-clamp-2 leading-relaxed">
                                {post.body}
                            </p>
                            <div className="flex items-center justify-between text-xs text-text-sec mt-auto pt-4 border-t border-stroke/50">
                                <div className="flex items-center gap-1.5">
                                    <Eye className="w-4 h-4" />
                                    <span>{post.views} بازدید</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-primary font-medium">
                                    <ThumbsUp className="w-4 h-4" />
                                    <span>{post.reactions?.likes || 0} لایک</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}