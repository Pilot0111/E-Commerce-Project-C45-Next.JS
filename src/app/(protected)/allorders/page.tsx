"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";

interface OrderItem {
  count: number;
  _id: string;
  product: {
    _id: string;
    title: string;
    imageCover: string;
    price: number;
  };
  price: number;
}

interface Order {
  _id: string;
  cartItems: OrderItem[];
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
}

export default function OrdersPage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!session?.user?.id) {
        toast.error("You are not logged in", {
          position: "top-center",
          duration: 4000,
        });

        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://ecommerce.routemisr.com/api/v1/orders/user/${session?.user?.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          toast.error("Failed to fetch orders", {
            position: "top-center",
            duration: 4000,
          });
        }
      } catch (error) {
        toast.error((error as string) || "Something went wrong", {
          position: "top-center",
          duration: 4000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [session]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <section className="py-20">
        <div className="container mx-auto">
          <div className="text-center">Loading orders...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>

        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">
                      Order #{order._id.slice(-8)}
                    </h3>
                    <p className="text-gray-500">
                      Placed on {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">
                      ${order.totalOrderPrice}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant={order.isPaid ? "default" : "destructive"}>
                        {order.isPaid ? "Paid" : "Unpaid"}
                      </Badge>
                      <Badge
                        variant={order.isDelivered ? "default" : "secondary"}
                      >
                        {order.isDelivered ? "Delivered" : "Processing"}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    Payment Method: {order.paymentMethodType}
                  </p>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead className="text-right">Subtotal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order.cartItems.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <Image
                              src={item.product.imageCover}
                              alt={item.product.title}
                              width={48}
                              height={48}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <span className="truncate max-w-xs">
                              {item.product.title}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>${item.price}</TableCell>
                        <TableCell>{item.count}</TableCell>
                        <TableCell className="text-right">
                          ${item.count * item.price}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-20 gap-10">
            <div className="text-2xl font-semibold">No orders found!</div>
            <Button asChild variant="destructive">
              <Link href="/products" className="px-12">
                Start Shopping
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
