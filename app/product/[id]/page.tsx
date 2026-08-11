import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductClient from './ProductClient';
import { Product } from '@/components/ProductCard';
import { EXCHANGE_RATE } from '@/utils/constants';

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
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const product = await getProduct(resolvedParams.id);

    if (!product) {
        return {
            title: 'محصول یافت نشد | پریمیوم‌شاپ',
            description: 'متاسفانه محصول مورد نظر شما در فروشگاه پیدا نشد.'
        };
    }

    return {
        title: `${product.title} | پریمیوم‌شاپ`,
        description: product.description,
        openGraph: {
            title: product.title,
            description: product.description,
            url: `/product/${product.id}`,
            siteName: 'پریمیوم‌شاپ',
            images: [
                {
                    url: product.thumbnail,
                    width: 800,
                    height: 600,
                    alt: product.title,
                }
            ],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: product.title,
            description: product.description,
            images: [product.thumbnail],
        }
    };
}
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const product = await getProduct(resolvedParams.id);
    if (!product) {
        notFound();
    }
    const similarProducts = await getSimilarProducts(product.category, product.id);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.title,
        image: product.thumbnail,
        description: product.description,
        offers: {
            '@type': 'Offer',
            price: product.price * EXCHANGE_RATE,
            priceCurrency: 'IRR',
            availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: product.rating,
        }
    };
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ProductClient product={product} similarProducts={similarProducts} />
        </>
    );
}