"use server";

import { getUserToken } from "@/lib/serverUtility";
import {
  AddressFormSchema,
  AddressStateType,
} from "@/schema/address.schema";

export async function handelPayment(
  formState: AddressStateType,
  formData: FormData,
): Promise<AddressStateType> {

  const shippingAddress = {
    details: formData.get("details"),
    city: formData.get("city"),
    phone: formData.get("phone"),
  };
  const cartId = formData.get("cartId");
  const paymentMethod = formData.get("paymentMethod");

  const parsedData = AddressFormSchema.safeParse({
    ...shippingAddress,
    cartId,
    paymentMethod,
  });


  if (!parsedData.success) {
    return {
      errors: parsedData.error.flatten().fieldErrors,
      success: false,
      message: null,
      callbackURL: "/cart",
      paymentMethod: "cash",
    };
  }

  try {
    const token = await getUserToken();

    const endpoint =
      paymentMethod === "cash"
        ? cartId
        : `checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}orders/${endpoint}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
        body: JSON.stringify({ shippingAddress }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        errors: {},
        success: false,
        message: data.message || "Order failed",
        callbackURL: "/cart",
        paymentMethod: paymentMethod as string,
      };
    }

    const callbackURL =
      paymentMethod === "cash"
        ? "/orders"
        : (data.session?.url as string | null) || "/cart";

    return {
      errors: {},
      success: true,
      message: data.message || "Order successfully",
      callbackURL,
      paymentMethod: paymentMethod as string,
    };
  } catch (error) {
    return {
      errors: {},
      success: false,
      message: (error as Error)?.message || "Order failed",
      callbackURL: "/cart",
      paymentMethod: paymentMethod as string,
    };
  }
}
