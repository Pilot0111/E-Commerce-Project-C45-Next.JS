"use server";
import { IProducts } from "@/interfaces/products.interfaces";

export default async function getProducts(limit: 40 | 8) {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/products?limit=" + limit,
      {
        // cache: "no-store", //to always fetch the latest data
        next: { revalidate: 120, tags: ["products"] },
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText || "Failed to fetch products");
    }

    const { data }: { data: IProducts[] } = await response.json();
    return data;
  } catch (error) {
    throw new Error((error as Error).message || "Failed to fetch products");}
}

export async function getProductDetails(id: string) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`,
      {
        next: { revalidate: 120, tags: ["products"] },
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText || "Failed to fetch product details");
    }

    const data = await response.json(); 
    return data;
  } catch (error) {
    throw new Error((error as Error).message || "Failed to fetch product details"); 
  }
}
