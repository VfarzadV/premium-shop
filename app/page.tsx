import dynamic from 'next/dynamic';
import Banner from "@/components/Banner";
import Categories from "@/components/Categories";
import Features from "@/components/Features";
import InstagramBanner from "@/components/InstagramBanner";
import PopularBrands from "@/components/PopularBrands";
import Worthiness from "@/components/Worthiness";
import TrustMetrics from "@/components/TrustMetrics";
import SmartRecommendations from "@/components/SmartRecommendations";
const SpecialOffers = dynamic(() => import("@/components/SpecialOffers"));
const TopProducts = dynamic(() => import("@/components/TopProducts"));
const StoreGallery = dynamic(() => import("@/components/StoreGallery"));
const LatestReviews = dynamic(() => import("@/components/LatestReviews"));
const BlogSection = dynamic(() => import("@/components/BlogSection"));
const RecentlyViewed = dynamic(() => import("@/components/RecentlyViewed"));

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
      <SmartRecommendations />
      <BlogSection />
      <Worthiness />
      <StoreGallery />
      <LatestReviews />
      <RecentlyViewed />
      <TrustMetrics />
    </main>
  );
}