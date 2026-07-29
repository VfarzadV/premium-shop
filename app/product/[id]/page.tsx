import { notFound } from 'next/navigation';
import ProductClient from './ProductClient';
import { Product } from '@/components/ProductCard';

async function getProduct(id: string) {
    try {
        const res = await fetch(`https://dummyjson.com/products/${id}`, {
            next: { revalidate: 3600 }
        });
        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        console.error("Error fetching product:", error);
        return null;
    }
}
async function getSimilarProducts(category: string, currentProductId: number) {
    try {
        const res = await fetch(`https://dummyjson.com/products/category/${category}?limit=10`, {
            next: { revalidate: 3600 }
        });
        if (!res.ok) return [];
        const data = await res.json();
        return data.products.filter((p: Product) => p.id !== currentProductId);
    } catch (error) {
        console.error("Error fetching similar products:", error);
        return [];
    }
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const product = await getProduct(resolvedParams.id);
    if (!product) {
        notFound();
    }
    const similarProducts = await getSimilarProducts(product.category, product.id);
    return <ProductClient product={product} similarProducts={similarProducts} />;
}