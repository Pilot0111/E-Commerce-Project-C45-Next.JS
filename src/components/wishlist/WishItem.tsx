import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import {  Star, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { Iwish } from "@/interfaces/wish.interface";

export default function WishItem({ product, handleRemoveWishItems }: { product: Iwish, handleRemoveWishItems: (productID: string) => void  }) {   // this should be modified*******
  return (
    <div
      key={product._id}
      className=" p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
    >
      <picture className="relative group">
        <Link href={`/products/${product._id}`}>
          <Image
            src={product.imageCover}
            alt={product.title}
            className="w-full h-[15.625rem] object-contain mb-4 border-1 rounded-2xl border-sky-900"
            width={120}
            height={120}
          />
        </Link>
        <Button className="invisible opacity-0 translate-y-full group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 absolute bottom-0 w-full transition-all duration-600">
          Add to Cart
        </Button>

        <Trash2Icon  className="text-red-500 absolute top-2 right-2 cursor-pointer" onClick={()=>handleRemoveWishItems(product._id)}>
        </Trash2Icon>
      </picture>
      <h3 className="mb-2 font-medium line-clamp-1">
        <Link href={`/products/${product._id}`}>{product.title}</Link>
      </h3>
      <div className="flex items-center justify-between  ">
        <span className="font-medium text-red-500 ">{product.price}EGP</span>
        <div className="flex items-center ">
          <Star className="text-yellow-500 fill-yellow-500" />
          <span className="text-sm font-semibold text-gray-500">
            {product.ratingsAverage}
          </span>
        </div>
      </div>
    </div>
  );
}
