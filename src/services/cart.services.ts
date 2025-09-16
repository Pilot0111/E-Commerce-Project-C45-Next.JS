"use server";

import { getUserToken } from "@/lib/serverUtility";

export async function getUserCart() {
  try {
  const token = await getUserToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}cart`, {
      method: "GET",
      headers: {
        token: token as string,
      },
    });
    const data = await res.json();
    if (!res.ok) {
      return {
        data: null,
        success: false,
        message: data.message || "feching cart failed"
      }
    }
    return {
      data: data,
      success: true,
      message: data.message || "feching cart successfully"

    };
  } catch (error) {
    return {
      data: null,
      success: false,
      message: (error as string) || "feching cart failed"
    }
  }
}



export async function removeUserCart() {
  try {
  const token = await getUserToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}cart`, {
      method: "DELETE",
      headers: {
        token: token as string,
      },
    });
    const data = await res.json();
    if (!res.ok) {
       return {
      data: null,
      success: false,
      message: data.message || "Deleting cart failed"
    }
    }
    return {
      data: data,
      success: true,
      message: data.message || "Deleting cart successfully"
    };
  } catch (error) {
      return {
      data: null,
      success: false,
      message: (error as string) || "Deleting cart failed"
    }
  }
}



export async function addToCart(productId: string) {
  try {
  const token = await getUserToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}cart`, {
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
      message: data.message || "Add to cart failed"
    }
    }
    return {
      data: data,
      success: true,
      message: data.message || "Item added to cart successfully"
    };
  } catch (error) {
      return {
      data: null,
      success: false,
      message: (error as string) || "Add to cart failed"
    }
  }
}





export async function removeFromCart(productId: string) {
  try {
  const token = await getUserToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}cart/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      },
    });
    const data = await res.json();
    if (!res.ok) {
       return {
      data: null,
      success: false,
      message: data.message || "Remove from cart failed"
    }
    }
    return {
      data: data,
      success: true,
      message: data.message || "Item removed successfully"
    };
  } catch (error) {
      return {
      data: null,
      success: false,
      message: (error as string) || "Remove from cart failed"
    }
  }
}




export async function updateQTYCartItem(productId: string, count: number) {
  try {
  const token = await getUserToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}cart/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      },
      body: JSON.stringify({ count }),
    });
    const data = await res.json();
    if (!res.ok) {
       return {
      data: null,
      success: false,
      message: data.message || "Update Quantity of the cart failed" 
    }
    }
    return {
      data: data,
      success: true,
      message: data.message || "Update Quantity of the cart successfully"
    };
  } catch (error) {
      return {
      data: null,
      success: false,
      message: (error as string) || "Update Quantity of the cart failed"
    }
  }
}

