import { IPagination } from "./Ipagination.interface"

export interface ICategoriesResponse {
  results: number
  metadata: IPagination
  data: ICategory[]
}


export interface ICategory {
  _id: string
  name: string
  slug: string
  image: string
  createdAt: string
  updatedAt: string
}
