"use client";
import React, { useTransition, useState, useEffect } from "react";
import { Heart, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useWish } from "@/context/WishContext";
import { addToWish } from "@/services/wish.services";
import { cn } from "@/lib/utils";

type Variant = "icon" | "full" | "ghost";

export default function AddToWishListBtn({
  productId,
  className,
  variant = "icon",
   
}: {
  productId: string;
  className?: string;
  variant?: Variant;
  children?: React.ReactNode;
}) {
  const [isPending, startTransition] = useTransition();
  const { getWishDetails, wishDetails } = useWish();
  const [isInWish, setIsInWish] = useState(false);

  useEffect(() => {
    if (wishDetails?.data?.some((item) => item._id === productId)) {
      setIsInWish(true);
    } else {
      setIsInWish(false);
    }
  }, [wishDetails, productId]);

  function handleClick() {
    startTransition(async () => {
      try {
        const res = await addToWish(productId);

        if (res?.success) {
          setIsInWish(true);
          toast.success("Product added to wishlist!", { position: "top-center" });
          getWishDetails();
        } else {
          toast.error(res?.message || "Failed to add product", { position: "top-center" });
        }
      } catch (error) {
        toast.error((error as string) || "Something went wrong", {
          position: "top-center",
        });
      }
    });
  }

  if (variant === "icon") {
    return (
      <button
        onClick={handleClick}
        disabled={isPending}
        className={cn(
          "flex items-center justify-center p-2 rounded-full bg-white shadow-md hover:bg-red-50 transition disabled:opacity-60",
          className
        )}
      >
        {isPending ? (
          <Loader2 className="animate-spin h-5 w-5 text-red-500" />
        ) : (
          <Heart
            className={cn(
              "h-5 w-5 transition-transform",
              isInWish ? "text-red-600 fill-red-600" : "text-gray-600 hover:scale-110"
            )}
          />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={cn(
        "w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition disabled:opacity-60",
        isInWish
          ? "bg-red-100 border-red-500 text-red-600"
          : "bg-white border-gray-300 hover:bg-gray-50 text-gray-700",
        className
      )}
    >
      {isPending ? (
        <Loader2 className="animate-spin h-5 w-5" />
      ) : (
        <Heart
          className={cn(
            "h-5 w-5",
            isInWish ? "text-red-600 fill-red-600" : "text-gray-600"
          )}
        />
      )}
      {isInWish ? "In Wishlist" : "Add to Wishlist"}
    </button>
  );
}
