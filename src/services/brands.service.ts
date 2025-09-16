"use server";
import { IBrand } from "@/interfaces/brand.interface";
import next from "next";

export default async function getBrands() {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/brands",
      {
next: { revalidate: 120, tags: ["brands"] },}
    );

    if (!response.ok) {
      throw new Error(response.statusText || "Failed to fetch Brands");
    }

    const { data }: { data: IBrand[] } = await response.json();
    return data;
  } catch (error) {
    throw new Error((error as Error).message || "Failed to fetch Brands"); //
  }
}

export async function getBrandDetails(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}products?brand=${id}`,
      {  next: { revalidate: 120, tags: ["products"] } }
    );

    if (!response.ok) {
      throw new Error(response.statusText || "Failed to fetch Brand details");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(
      (error as Error).message || "Failed to fetch Brand details"
    );
  }
}
