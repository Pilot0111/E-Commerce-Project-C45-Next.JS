"use server";
import { ICategory } from "@/interfaces/categories.interfaces";
import { IProducts } from "@/interfaces/products.interfaces";

export default async function getCategories() {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/categories",
      {
        next: { revalidate: 120, tags: ["categories"] },
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText || "Failed to fetch categories");
    }

    const { data }: { data: ICategory[] } = await response.json();
    return data;
  } catch (error) {
    throw new Error((error as Error).message || "Failed to fetch categories");
  }
}

export async function getCategoriesDetails(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}products?category=${id}`,
      { next: { revalidate: 120, tags: ["products"] } }
    );

    if (!response.ok) {
      throw new Error(response.statusText || "Failed to fetch categories");
    }

    const { data }: { data: IProducts[] } = await response.json();
    return data;
  } catch (error) {
    throw new Error((error as Error).message || "Failed to fetch categories");
  }
}
