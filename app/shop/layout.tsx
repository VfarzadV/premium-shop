import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'فروشگاه',
    description: 'مشاهده و خرید جدیدترین محصولات دیجیتال، پوشاک، لوازم خانگی و آرایشی با بهترین قیمت و ضمانت اصالت کالا.',
};

export default function ShopLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}