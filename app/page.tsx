import { Suspense } from "react";
import Banner from "@/components/Banner";
import Categories from "@/components/Categories";
import Features from "@/components/Features";
import PopularBrands from "@/components/PopularBrands";
import InstagramBanner from "@/components/InstagramBanner";
import Worthiness from "@/components/Worthiness";
import TrustMetrics from "@/components/TrustMetrics";
import StoreGallery from "@/components/StoreGallery";
import SpecialOffers from "@/components/SpecialOffers";
import TopProducts from "@/components/TopProducts";
import BlogSection from "@/components/BlogSection";
import LatestReviews from "@/components/LatestReviews";
import RecentlyViewed from "@/components/RecentlyViewed";
import SmartRecommendations from "@/components/SmartRecommendations";

function SectionSkeleton() {
  return (
    <div className="w-full mt-12 h-75 bg-bg-sec border border-stroke rounded-3xl animate-pulse flex items-center justify-center shadow-sm">
      <div className="w-10 h-10 border-4 border-stroke border-t-primary rounded-full animate-spin"></div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen w-[90%] lg:w-[85%] mx-auto pb-12">
      <Banner />
      <Categories />
      <Suspense fallback={<SectionSkeleton />}>
        <SpecialOffers />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <TopProducts />
      </Suspense>
      <PopularBrands />
      <InstagramBanner />
      <SmartRecommendations />
      <Features />
      <Suspense fallback={<SectionSkeleton />}>
        <BlogSection />
      </Suspense>
      <Worthiness />
      <StoreGallery />
      <Suspense fallback={<SectionSkeleton />}>
        <LatestReviews />
      </Suspense>
      <RecentlyViewed />
      <TrustMetrics />
    </main>
  );
}