export interface IProduct {
  id: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  categoryId?: string;
  published: boolean;
  barcode?: string;
  barcode2?: string;
  createdAt: string;
  category: {
    id: string;
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
