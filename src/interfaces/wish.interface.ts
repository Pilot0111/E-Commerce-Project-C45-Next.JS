// interfaces/wish.interface.ts
import { IBrand } from "./brand.interface";
import { ICategory } from "./categories.interfaces";
import { ISubcategory } from "./subcategory.interface";

export interface IwishResponse {
  status: string;
  count: number;
  totalItems: number; 
  data: Iwish[];
}

export interface Iwish {
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  images: string[];
  category: ICategory;
  subcategory: ISubcategory;
  brand: IBrand;
  ratingsAverage: number;
  ratingsQuantity: number;
  sold: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}
