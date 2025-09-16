import getCategories from "@/services/categroies.service";
import React from "react";
import CategorySwiper from "./CategorySwiper";
import SectionTitle from "../shared/SectionTitle";
import { Separator } from "../ui/separator";


export default async function CategoriesSectionSwiper() {
 
  const data = await getCategories();

  if (!data) {
    return (
      <section className="py-12 text-center">
        <p className="text-red-500">⚠️ Failed to load categories. Please try again later.</p>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="container mx-auto">

     <SectionTitle title={"Categories"} subtitle={"Browse by Category"}/>
      <CategorySwiper data={data}   />
      <Separator/>
      </div>
    
    </section>
  );
}
