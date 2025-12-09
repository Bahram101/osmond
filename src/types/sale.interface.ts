export interface ISale{
  id: number
  productId: string
  quantity: number
  price?: number
  createdAt: string
  product:{
    id: string,
    name: string
  }
}