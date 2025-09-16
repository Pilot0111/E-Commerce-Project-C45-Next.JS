import CategoriesSectionSwiper from "@/components/home/CategoriesSectionSwiper";
import MainSlider from "@/components/home/MainSlider";
import ProductsSection from "@/components/home/ProductsSection";
import { SkeletonCard } from "@/components/shared/SkeletonCard";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <MainSlider />;{/* <CategoriesSection/> */}
      <Suspense fallback={<SkeletonCard />}>
        <CategoriesSectionSwiper />
      </Suspense>
      <Suspense fallback={<SkeletonCard />}>
        <ProductsSection />
      </Suspense>
    </>
  );
}
