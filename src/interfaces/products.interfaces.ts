import { IBrand } from "./brand.interface"
import { ICategory } from "./categories.interfaces"
import { IPagination } from "./Ipagination.interface"
import { ISubcategory } from "./subcategory.interface"

export interface IproductsResponse {
  results: number
  metadata: IPagination
  data: IProducts[]
}


export interface IProducts {
  sold: number
  images: string[]
  subcategory: ISubcategory[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  imageCover: string
  category: ICategory
  brand: IBrand
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  id: string
  priceAfterDiscount?: number
  availableColors?: string[]
}

