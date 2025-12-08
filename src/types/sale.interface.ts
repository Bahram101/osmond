export interface ISale{
  id: string
  productId: string
  quantity: number
  price?: number
  createdAt: string
  product:{
    id: string,
    name: string
  }
}