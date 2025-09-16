"use server";

import { getUserToken } from "@/lib/serverUtility";

export async function getUserID() {
  try {
  const token = await getUserToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}auth/verifyToken`, {
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
        message: data.message || "feching user details failed"
      }
    }
    return {
      data: data,
      success: true,
      message: data.message || "feching user details successfully"

    };
  } catch (error) {
    return {
      data: null,
      success: false,
      message: (error as string) || "feching user details failed"
    }
  }
}

