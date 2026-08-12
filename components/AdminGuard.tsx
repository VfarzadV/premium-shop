"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/useUserStore';
import { Loader2 } from 'lucide-react';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
    const [isMounted, setIsMounted] = useState(false);
    const isAdmin = useUserStore((state) => state.isAdmin);
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsMounted(true);
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isMounted && !isAdmin) {
            router.replace('/'); 
        }
    }, [isMounted, isAdmin, router]);
    if (!isMounted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-bg-main">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
        );
    }
    if (!isAdmin) {
        return null;
    }
    return <>{children}</>;
}