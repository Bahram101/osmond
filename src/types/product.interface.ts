export interface ProductResponse {
  id: number;
  name: string;
  description?: string;
  price: number;
  quantity?: number;
  categoryId?: string;
  published: boolean;
  barcode?: string;
  code: string;
  createdAt: string;
  category: {
    id: number;
    title: string;
  };
}

export type ProductCreateDTO = Pick<
  ProductResponse,
  "name" | "description" | "price" | "categoryId" | "published" | "quantity" | "barcode" | "code"
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
    title: string;
  }
}