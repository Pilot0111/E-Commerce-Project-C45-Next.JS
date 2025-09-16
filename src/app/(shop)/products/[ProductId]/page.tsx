import AddToCartBtn from "@/components/products/AddToCartBtn";
import AddToWishListBtn from "@/components/products/AddToWishListBtn";
import ProductSwiper from "@/components/products/ProductSwiper";
import { IProducts } from "@/interfaces/products.interfaces";
import { getProductDetails } from "@/services/products.service";
import { Badge } from "@/components/ui/badge";
import { Star, Heart } from "lucide-react";
import React from "react";

export default async function ProductDetails({
  params: { ProductId },
}: {
  params: { ProductId: string };
}) {
  const { data }: { data: IProducts } = await getProductDetails(ProductId);

  return (
    <section className="py-5">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="relative col-span-2">
          <ProductSwiper images={data.images} />

          <div className="absolute top-4 right-4 z-10">
            <AddToWishListBtn
              productId={data._id}
              className="p-2 rounded-full bg-white/80 hover:bg-red-100 transition"
              variant="ghost"
            >
              <Heart className="w-6 h-6 text-red-500" />
            </AddToWishListBtn>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            {data.category && (
              <Badge variant="secondary" className="text-xs">
                {data.category.name}
              </Badge>
            )}
            {data.brand && (
              <Badge variant="outline" className="text-xs">
                {data.brand.name}
              </Badge>
            )}
          </div>

          <h1 className="text-3xl font-bold mb-3">{data.title}</h1>

          <div className="flex items-center gap-2 mb-4">
            <Star className="text-yellow-500 fill-yellow-500 w-5 h-5" />
            <span className="text-sm font-semibold text-gray-600">
              {data.ratingsAverage} / 5
            </span>
          </div>

          <p className="text-3xl font-bold text-red-600 mb-6">
            {data.price} EGP
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            {data.description}
          </p>

          <div className="flex flex-col gap-3">
            <AddToCartBtn
              productId={data._id}
              className="w-full py-6 text-lg font-semibold"
              variant="destructive"
            >
              Add to Cart
            </AddToCartBtn>

            <AddToWishListBtn
              productId={data._id}
              className="w-full py-6 text-lg font-semibold"
              variant="full"
            >
              Add to Wishlist
            </AddToWishListBtn>
          </div>
        </div>
      </div>
    </section>
  );
}
