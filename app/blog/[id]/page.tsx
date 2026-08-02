import Link from 'next/link';
import { ArrowRight, Eye, ThumbsUp, Tag, User } from 'lucide-react';
import { notFound } from 'next/navigation';

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

async function getPost(id: string): Promise<Post | null> {
    const res = await fetch(`https://dummyjson.com/posts/${id}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return res.json();
}

export default async function SingleBlogPost({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const post = await getPost(resolvedParams.id);
    
    if (!post) {
        notFound();
    }

    return (
        <main className="w-[90%] lg:w-[85%] mx-auto py-10 md:py-16">
            <Link 
                href="/blog"
                className="inline-flex items-center gap-2  text-text-sec hover:text-primary font-bold mb-8 transition-colors bg-secondary border border-stroke px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md"
            >
                <ArrowRight className="w-5 h-5" />
                بازگشت به مجله
            </Link>
            <article className="max-w-4xl mx-auto bg-secondary border border-stroke rounded-[2.5rem] p-8 md:p-14 shadow-sm">
                <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag: string) => (
                        <span key={tag} className="flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-black px-4 py-2 rounded-xl uppercase tracking-wider">
                            <Tag className="w-3.5 h-3.5" />
                            {tag}
                        </span>
                    ))}
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-text-main leading-tight md:leading-normal mb-8">
                    {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-6 pb-8 mb-10 border-b border-stroke/70">
                    <div className="flex items-center gap-2 text-text-sec">
                        <User className="w-5 h-5" />
                        <span className="font-bold text-sm">نویسنده: کاربر {post.userId}</span>
                    </div>
                    <div className="flex items-center gap-2 text-text-sec">
                        <Eye className="w-5 h-5" />
                        <span className="font-bold text-sm">{post.views} بازدید</span>
                    </div>
                    <div className="flex items-center gap-2 text-text-sec">
                        <ThumbsUp className="w-5 h-5" />
                        <span className="font-bold text-sm">{post.reactions?.likes || 0} لایک</span>
                    </div>
                </div>
                <div className="prose prose-lg prose-headings:font-black prose-p:text-text-sec max-w-none text-text-main font-medium text-lg leading-[2.2]">
                    <p>{post.body}</p>
                </div>
            </article>
        </main>
    );
}