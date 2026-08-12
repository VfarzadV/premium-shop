import Link from 'next/link';
import { Eye, ThumbsUp, ArrowLeft, BookOpen } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'مجله آموزشی',
    description: 'جدیدترین مقالات، نقد و بررسی‌ها و اخبار دنیای تکنولوژی و مد را در مجله پریمیوم‌شاپ بخوانید.',
};

interface Post {
    id: number;
    title: string;
    body: string;
    tags: string[];
    reactions: {
        likes: number;
        dislikes: number;
    };
    views: number;
    userId: number;
}

async function getPosts() {
    const res = await fetch('https://dummyjson.com/posts?limit=12', { next: { revalidate: 3600 } });
    if (!res.ok) return { posts: [] };
    return res.json();
}

export default async function BlogPage() {
    const data = await getPosts();
    const posts: Post[] = data.posts;

    return (
        <main className="w-[90%] lg:w-[85%] mx-auto py-10 md:py-16">
            <div className="flex flex-col items-center justify-center text-center mb-16 gap-4">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-2">
                    <BookOpen className="w-8 h-8" />
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-text-main">مجله پریمیوم‌شاپ</h1>
                <p className="text-text-sec md:text-lg font-medium max-w-2xl">
                    جدیدترین مقالات، اخبار تکنولوژی و راهنمای خرید محصولات را در اینجا بخوانید.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {posts.map((post: Post) => (
                    <div key={post.id} className="bg-bg-sec border border-stroke rounded-3xl p-5 flex flex-col group hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 transition-all duration-300">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 2).map((tag: string) => (
                                <span key={tag} className="bg-bg-sec text-text-sec text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <Link href={`/blog/${post.id}`}>
                            <h2 className="text-lg font-black text-text-main line-clamp-2 mb-3 group-hover:text-primary transition-colors leading-relaxed">
                                {post.title}
                            </h2>
                        </Link>
                        <p className="text-sm text-text-sec line-clamp-3 mb-6 leading-loose flex-1">
                            {post.body}
                        </p>
                        <div className="mt-auto pt-5 border-t border-stroke/50 flex items-center justify-between">
                            <div className="flex items-center gap-4 text-text-sec">
                                <div className="flex items-center gap-1.5">
                                    <ThumbsUp className="w-4 h-4" />
                                    <span className="text-xs font-bold">{post.reactions?.likes || 0}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Eye className="w-4 h-4" />
                                    <span className="text-xs font-bold">{post.views}</span>
                                </div>
                            </div>
                            <Link
                                href={`/blog/${post.id}`}
                                className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}