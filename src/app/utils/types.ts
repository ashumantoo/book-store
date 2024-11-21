export interface IBook {
  _id: string
  title: string
  price: string
  discountedPrice: string
  author: string
  totalPages: number
  publisher: string
  language: string
  publishedDate: string
  image: string
}

export interface IApiResponse<T> {
  success: boolean;
  status: number;
  message?: string;
  data?: T
}