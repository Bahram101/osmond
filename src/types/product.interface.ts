export interface ProductResponse {
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
  ProductResponse,
  "name" | "description" | "price" | "categoryId" | "published" | "quantity"
>;

export type ProductUpdateDTO = Partial<ProductCreateDTO>;

export type PublishedOption = {
  value: boolean;
  label: string;
};

export type ProductShortDTO = Pick<
  ProductResponse,
  "id" | "name" | "price" | "quantity"
>;

export type ProductInCategoryDTO = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category:{
    id: number;
    name: string;
  }
}