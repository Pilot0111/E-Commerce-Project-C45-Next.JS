"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { useWish } from "@/context/WishContext";
import { removeUserWish } from "@/services/wish.services";
import { Separator } from "@/components/ui/separator";
import WishItem from "@/components/wishlist/WishItem";

export default function WishlistPage() {
  const { wishDetails,  getWishDetails } = useWish();
  async function handleRemoveWishItems(productID: string) {
    const res = await removeUserWish(productID);
    if (res.success) {
      toast.success("Wish Item Removed Successfully", {
        position: "top-center",
        duration: 4000,
      });
      
      getWishDetails();
    } else {
      toast.error(res?.message || "Something went wrong", {
        position: "top-center",
        duration: 4000,
      });
    }
  }

  return (
    <section className="py-0">
      <div className="container mx-auto ">
        {wishDetails ? (
          <>
            <section className="py-12">
              <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-15 mb-8">
                  {wishDetails.data.map((product) => (
                    <WishItem
                      key={product._id}
                      product={product}
                      handleRemoveWishItems={handleRemoveWishItems}
                    />
                  ))}
                </div>

                <Separator />
              </div>
            </section>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center mt-20 gap-10">
            <div className=" text-2xl font-semibold">WishList is Empty!</div>
            <Button asChild variant={"destructive"}>
              <Link href="/products" className="px-12">
                Return to Shop
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
