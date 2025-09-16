import React from "react";
import { Separator } from "@/components/ui/separator";
import getCategories from "@/services/categroies.service";
import Image from "next/image";
import Link from "next/link";

export default async function CategoriesPage() {
 
  const data = await getCategories();

  if (!data) {
    return (
      <section className="py-12 text-center">
        <p className="text-red-500">
          ⚠️ Failed to load Categories. Please try again later.
        </p>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-15 mb-8">
         {data.map((category) => (
                   <Link
                     href={`/categories/${category._id}`}
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
                   </Link>
                 ))}
        </div>

        <Separator />
      </div>
    </section>
  );
}
