import React from "react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import getBrands from "@/services/brands.service";
import Link from "next/link";

export default async function BrandsPage() {
 
  const data = await getBrands();

  if (!data) {
    return (
      <section className="py-12 text-center">
        <p className="text-red-500">
          ⚠️ Failed to load Brands. Please try again later.
        </p>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-15 mb-8">
         {data.map((brand) => (
                   <Link
                     href={`/brands/${brand._id}`}
                     key={brand._id}
                     className="flex flex-col items-center p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
                   >
                     <Image
                       src={brand.image}
                       alt={brand.name}
                       className="w-24 h-24 object-contain mb-4"
                       width={120}
                       height={120}
                     />
                     <p className="text-lg font-medium">{brand.name}</p>
                   </Link>
                 ))}
        </div>

        <Separator />
      </div>
    </section>
  );
}
