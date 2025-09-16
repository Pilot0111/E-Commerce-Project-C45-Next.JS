import { IProducts } from "@/interfaces/products.interfaces";
import Image from "next/image";
import React from "react";
import { Star } from "lucide-react";
import Link from "next/link";
import AddToCartBtn from "./AddToCartBtn";
import AddToWishListBtn from "./AddToWishListBtn";

export default function ProductItem({ product }: { product: IProducts }) {
  return (
    <div
      key={product._id}
      className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
    >
      <picture className="relative group block">
        <Link href={`/products/${product._id}`}>
          <Image
            src={product.imageCover}
            alt={product.title}
            className="w-full h-[15.625rem] object-contain mb-4 border rounded-2xl border-gray-200"
            width={120}
            height={120}
          />
        </Link>

        <AddToWishListBtn
          productId={product._id}
          variant="icon"
          className="absolute top-3 left-3"
        />

        <AddToCartBtn
          productId={product._id}
          className="invisible opacity-0 translate-y-full group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 absolute bottom-0 w-full transition-all duration-500"
        />
      </picture>

      <h3 className="mb-2 font-medium line-clamp-1">
        <Link href={`/products/${product._id}`}>{product.title}</Link>
      </h3>
      <div className="flex items-center justify-between">
        <span className="font-medium text-red-500">{product.price} EGP</span>
        <div className="flex items-center">
          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          <span className="ml-1 text-sm font-semibold text-gray-500">
            {product.ratingsAverage}
          </span>
        </div>
      </div>
    </div>
  );
}
