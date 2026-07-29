import Image from 'next/image';
import Link from 'next/link';

export default function Banner() {
  return (
    <section className="w-full mt-15">
      <Link href="/" className="relative block w-full aspect-video md:aspect-4/1 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <Image
          src="/banner.jpg"
          alt="بنر اصلی فروشگاه"
          fill
          className="object-cover"
          priority
        />
      </Link>
    </section>
  );
}