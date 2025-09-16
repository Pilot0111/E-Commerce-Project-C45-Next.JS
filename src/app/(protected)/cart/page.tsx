"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import {
  removeFromCart,
  removeUserCart,
  updateQTYCartItem,
} from "@/services/cart.services";
import { toast } from "sonner";
import { Badge, X } from "lucide-react";

export default function CartPage() {
  const { cartDetails, setCartDetails } = useCart();
  async function removeCartItems() {
    const res = await removeUserCart();
    if (res?.message === "success") {
      toast.success("Cart Items Removed Successfully", {
        position: "top-center",
        duration: 4000,
      });
      setCartDetails(null);
    } else {
      toast.error(res?.message || "Something went wrong", {
        position: "top-center",
        duration: 4000,
      });
    }
  }

  const removeItemFromCart = async (productID: string) => {
    const res = await removeFromCart(productID);
    if (res.success) {
      toast.success("Cart Item Removed Successfully", {
        position: "top-center",
        duration: 4000,
      });
      setCartDetails(res.data);
    } else {
      toast.error(res?.message || "Something went wrong", {
        position: "top-center",
        duration: 4000,
      });
    }
  };

  const updateCartItemQuantity = async (productID: string, count: number) => {
    const res = await updateQTYCartItem(productID, count);
    if (res.success) {
      toast.success("Cart Item Updated Successfully", {
        position: "top-center",
        duration: 4000,
      });
      setCartDetails(res.data);
    } else {
      toast.error(res?.message || "Something went wrong", {
        position: "top-center",
        duration: 4000,
      });
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto ">
        {cartDetails && cartDetails.numOfCartItems !== 0 ? (
          <>
            <section className="mb-20">
              <Table className="mb-6">
                <TableHeader>
                  <TableRow>
                    <TableHead className="">Product</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="text-right">SubTotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cartDetails.data.products.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-5 relative">
                          <Badge
                            className="absolute -top-0.5 -start-2 h-4 w-4 bg-gray-200 text-red-600  rounded-full cursor-pointer"
                            onClick={() =>
                              removeItemFromCart(product.product._id)
                            }
                          >
                            <X />
                          </Badge>
                          <Image
                            src={product.product.imageCover}
                            alt={product.product.title}
                            width={54}
                            height={54}
                          />
                          <h2>{(product.product.title).slice(0, 120)}</h2>
                        </div>
                      </TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>
                        {
                          <div className="flex items-center gap-2">
                            <Button
                              className="bg-green-500 text-white w-7 h-7"
                              onClick={() =>
                                updateCartItemQuantity(
                                  product.product._id,
                                  product.count + 1
                                )
                              }
                            >
                              +
                            </Button>
                            <span>{product.count}</span>
                            <Button
                              className="bg-red-500 text-white w-7 h-7"
                              onClick={() =>
                                updateCartItemQuantity(
                                  product.product._id,
                                  product.count - 1
                                )
                              }
                            >
                              -
                            </Button>
                          </div>
                        }
                      </TableCell>
                      <TableCell className="text-right">
                        ${product.count * product.price}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex justify-between mt-5">
                <Button asChild variant={"outline"}>
                  <Link href="/products" className="">
                    Return to Shop
                  </Link>
                </Button>
                <Button variant={"destructive"} onClick={removeCartItems}>
                  Remove All Items
                </Button>
              </div>
            </section>
            <section className="py-10 flex items-center justify-between">
              <div className="flex items-center w-5/12 gap-4">
                <Input placeholder="Coupon Code" className="w-1/2" />
                <Button variant={"destructive"}>Apply Coupon</Button>
              </div>

              <div className=" w-5/12 py-8 px-6 border border-gray-950">
                <h3 className="text-xl font-bold mb-6">Cart Total</h3>
                <ul className="divide-y divide-gray-950">
                  <li className="py-6 flex justify-between">
                    <span>Subtotal: </span>
                    <span className="font-semibold">
                      ${cartDetails.data.totalCartPrice}
                    </span>
                  </li>
                  <li className="py-6 flex justify-between">
                    <span>Shipping:</span>
                    <span className="font-semibold">Free</span>
                  </li>
                  <li className="py-6 flex justify-between">
                    <span>Total:</span>
                    <span className="font-semibold">
                      ${cartDetails.data.totalCartPrice}
                    </span>
                  </li>
                </ul>
                <Button className="flex mx-auto" variant={"destructive"}>
                  <Link href="/checkout">Proceed to CheckOut</Link>
                </Button>
              </div>
            </section>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center mt-20 gap-10">
            <div className=" text-2xl font-semibold">Cart is Empty!</div>
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
