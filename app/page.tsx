import Banner from "@/components/Banner";
import Categories from "@/components/Categories";
import SpecialOffers from "@/components/SpecialOffers";
import Features from "@/components/Features";
import InstagramBanner from "@/components/InstagramBanner";
import BlogSection from "@/components/BlogSection"

export default function Home() {
  return (
    <main className="min-h-screen w-[85%]  mx-auto">
      <Banner />
      <Categories />
      <SpecialOffers />
      <Features />
      <InstagramBanner />
      <BlogSection />
    </main>
  );
}