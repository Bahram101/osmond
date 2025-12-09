export interface IProduct {
  id: number;
  name: string;
  description?: string;
  price: number;
  quantity?: number;
  categoryId?: string;
  published: boolean;
  barcode?: string;
  createdAt: string;
  category: {
    id: number;
    name: string;
  };
}

export type ProductCreateDTO = Pick<
  IProduct,
  "name" | "description" | "price" | "categoryId" | "published" | "quantity"
>;

export type ProductUpdateDTO = Partial<ProductCreateDTO>;

export type PublishedOption = {
  value: boolean;
  label: string;
};
