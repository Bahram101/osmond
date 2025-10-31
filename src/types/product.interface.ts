export interface IProduct {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  views: number;
  userId: number;
  categoryId: string;
  published?: boolean;
  createdAt: string;
  category:{
    id: string,
    name: string
  }
}

export type ProductCreateDTO = Pick<
  IProduct,
  "name" | "description" | "price" | "categoryId" | "published"
>;

export type PublishedOption = {
  value: boolean;
  label: string;
};
