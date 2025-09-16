"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useActionState } from "react";

import {
  AddressFormSchema,
  AddressFormSchemaType,
  addressState,
  
} from "@/schema/address.schema";
import { handelPayment } from "@/services/order.services";
import { useCart } from "@/context/CartContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function CheckOutPage() {
  const form = useForm<AddressFormSchemaType>({
    resolver: zodResolver(AddressFormSchema),
    defaultValues: {
      cartId: "",
      details: "",
      city: "",
      phone: "",
      paymentMethod: "cash",
    },
  });

  const [action, formAction] = useActionState(
    handelPayment,
    addressState
  );

  const { cartDetails, setCartDetails } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (cartDetails) {
      form.setValue("cartId", cartDetails?.cartId);
    }
  }, [cartDetails, form]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (action) {
      if (action.success && action.message) {
        if (action.paymentMethod === "cash") {
          toast.success(action.message, {
            position: "top-center",
            duration: 4000,
          });
          setCartDetails(null);

          timeout = setTimeout(() => {
            router.push(action.callbackURL ?? "/");
          }, 2000);
        } else if (action.paymentMethod === "card") {
          if (action.callbackURL) {
            window.location.href = action.callbackURL;
          } else {
            toast.error("Payment URL not available", {
              position: "top-center",
            });
          }
        }
      } else if (!action.success && action.message) {
        toast.error(action.message, {
          position: "top-center",
          duration: 4000,
        });
      }
    }

    return () => clearTimeout(timeout);
  }, [action, router, setCartDetails]);


  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-50 p-4">
      <div className="bg-white shadow-xl rounded-2xl max-w-md w-full p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Address Details
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Please fill in your address details in the form below.
        </p>

        <Form {...form}>
          <form action={formAction} className="space-y-6">
            <FormField
              control={form.control}
              name="cartId"
              render={({ field }) => (
                <FormItem hidden>
                  <FormControl>
                    <Input type="hidden" {...field} value={field.value || ""} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your Address Details"
                      {...field}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500">
                    {action.errors?.details?.[0]}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your City"
                      {...field}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500">
                    {action.errors?.city?.[0]}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="01xxxxxxxxx"
                      {...field}
                      type="tel"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500">
                    {action.errors?.phone?.[0]}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Payment Method</FormLabel>
                  <FormControl>
                    <RadioGroup
                      name={field.name}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col"
                    >
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="cash" />
                        </FormControl>
                        <FormLabel className="font-normal">Cash</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="card" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Credit Card
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
            >
              Save Address and Continue
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
