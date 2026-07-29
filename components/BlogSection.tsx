import Image from 'next/image';
import Link from 'next/link';
import { FileText, Eye, ThumbsUp } from 'lucide-react';

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
    return (
        <section className="w-full mt-12 mb-20">
            <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2 text-text-main">
                    <FileText className="w-6 h-6 text-text-sec" />
                    <h2 className="text-lg md:text-xl font-bold whitespace-nowrap">وبلاگ و نوشته‌ها</h2>
                </div>
                <div className="h-px w-full bg-stroke rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {posts.map((post) => (
                    <div key={post.id} className="bg-bg-main border border-stroke rounded-2xl overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
                        <Link href={`/blog/${post.id}`} className="relative block w-full aspect-4/3 overflow-hidden bg-bg-sec shrink-0">
                            <Image
                                src="/blog.png"
                                alt={post.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
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