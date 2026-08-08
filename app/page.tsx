import Banner from "@/components/Banner";
import Categories from "@/components/Categories";
import SpecialOffers from "@/components/SpecialOffers";
import Features from "@/components/Features";
import InstagramBanner from "@/components/InstagramBanner";
import BlogSection from "@/components/BlogSection"
import Worthiness from "@/components/Worthiness";
import RecentlyViewed from "@/components/RecentlyViewed";
import PopularBrands from "@/components/PopularBrands";
import LatestReviews from "@/components/LatestReviews";
import TopProducts from "@/components/TopProducts";
import TrustMetrics from "@/components/TrustMetrics";

export default function Home() {
  return (
    <main className="min-h-screen w-[85%]  mx-auto">
      <Banner />
      <Categories />
      <SpecialOffers />
      <Features />
      <TopProducts />
      <InstagramBanner />
      <PopularBrands />
      <BlogSection />
      <Worthiness />
      <LatestReviews />
      <RecentlyViewed />
      <TrustMetrics />
    </main>
  );
}