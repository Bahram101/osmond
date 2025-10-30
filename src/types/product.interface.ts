export interface IProduct {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  views: number;
  userId: number;
  categoryId: string;
  availability?: boolean;
  createdAt: string;
}

export type IProductCreateDto = Pick<
  IProduct,
  "name" | "description" | "price" | "categoryId" | "availability"
>;

export type availableOptionsType = {
  value: boolean;
  label: string;
};
