"use client";
import React, { useTransition } from "react";
import { Button } from "../ui/button";
import { addToCart } from "@/services/cart.services";
import { Loader2 } from "lucide-react"; // spinner icon
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";

export default function AddToCartBtn({
  productId,
  ...props
}: {
  productId: string;
  [key: string]: string;
}) {
  const [isPending, startTransition] = useTransition();
  const { getCartDetails } = useCart();

  function handleClick() {
    startTransition(async () => {
      try {
        const res = await addToCart(productId);

        if (res?.success) {
          toast.success("Product added to cart!", {
            position: "top-center",
          });
          getCartDetails();
        } else {
          toast.error(res?.message || "Failed to add product", {
            position: "top-center",
          });
        }
      } catch (error) {
        toast.error( error as string || "Something went wrong", { position: "top-center" });
      }
    });
  }

  return (
    <Button
      {...props}
      onClick={handleClick}
      disabled={isPending} 
    >
      {isPending ? (
        <Loader2 className="animate-spin h-5 w-5 mr-2" />
      ) : null}
      {isPending ? "Adding..." : "Add to Cart"}
    </Button>
  );
}
