import React from "react";
import { Separator } from "@/components/ui/separator";
import getProducts from "@/services/products.service";
import ProductItem from "@/components/products/ProductItem";

export default async function ProductsPage() {
 
  const data = await getProducts(40);

  if (!data) {
    return (
      <section className="py-12 text-center">
        <p className="text-red-500">
          ⚠️ Failed to load Products. Please try again later.
        </p>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-15 mb-8">
          {data.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </div>

        <Separator />
      </div>
    </section>
  );
}
