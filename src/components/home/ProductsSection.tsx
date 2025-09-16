import React from "react";
import SectionTitle from "../shared/SectionTitle";
import { Separator } from "../ui/separator";
import getProducts from "@/services/products.service";
import { Button } from "../ui/button";
import Link from "next/link";
import ProductItem from "../products/ProductItem";

export default async function ProductsSection() {
  const data = await getProducts(8);

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
        <SectionTitle
          title={"Our Products"}
          subtitle={"Explore our products"}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-15 mb-8">
          {data.map((product) => (
          <ProductItem key={product._id} product={product} />
          ))}
        </div>

        <Button asChild variant={"destructive"} className="w-40 mx-auto flex">
          <Link href="/products">View All Products</Link>
        </Button>
        <Separator />
      </div>
    </section>
  );
}
