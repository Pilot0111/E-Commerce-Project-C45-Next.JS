// app/components/CategoriesSection.tsx
import getCategories from "@/services/categroies.service";
import Image from "next/image";
import React from "react";

export default async function CategoriesSection() {
 
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

      <h2 className="text-3xl font-bold text-center mb-10">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((category) => (
          <div
            key={category._id}
            className="flex flex-col items-center p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
          >
            <Image
              src={category.image}
              alt={category.name}
              className="w-24 h-24 object-contain mb-4"
              width={120}
              height={120}
            />
            <p className="text-lg font-medium">{category.name}</p>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
