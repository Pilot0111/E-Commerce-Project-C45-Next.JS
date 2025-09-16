"use server";

import { getUserToken } from "@/lib/serverUtility";

export async function getWishCart() {
  try {
    const token = await getUserToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}wishlist`, {
      method: "GET",
      headers: {
        token: token as string,
      },
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error)
   {
    throw new Error((error as Error).message);
  }
}

export async function removeUserWish(productID: string) {
  try {
    const token = await getUserToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}wishlist/${productID}`,
      {
        method: "DELETE",
        headers: {
          token: token as string,
        },
      }
    );
    const data = await res.json();
    if (!res.ok) {
      return {
        data: null,
        success: false,
        message: data.message || "Add to wishlist failed",
      };
    }
    return {
      data: data,
      success: true,
      message: data.message || "Item removed from wishlist successfully",
    };
  } catch (error) {
    return {
        data: null,
        success: false,
        message: (error as string) || "Add to wishlist failed",
      };
  }
}

export async function addToWish(productId: string) {
  try {
    const token = await getUserToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      },
      body: JSON.stringify({ productId }),
    });
    const data = await res.json();
    if (!res.ok) {
      return {
        data: null,
        success: false,
        message: data.message || "Add to wishlist failed",
      };
    }
    return {
      data: data,
      success: true,
      message: data.message || "Item added to wishlist successfully",
    };
  } catch (error) {
    return {
      data: null,
      success: false,
      message: (error as string) || "Add to wishlist failed",
    };
  }
}
