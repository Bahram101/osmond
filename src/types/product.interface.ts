export interface ProductPrices {
  price: number;
  masterPrice: number;
  wholesalePrice: number;
}

export interface ProductResponse extends ProductPrices {
  id: number;
  name: string;
  description?: string;
  quantity: number;
  categoryId?: number;
  published: boolean;
  barcode?: string;
  code: string;
  createdAt: string;

  category?: {
    id: number;
    title: string;
  };
}

export interface ProductCreateDTO extends ProductPrices {
  name: string;
  description?: string;
  quantity?: number;
  categoryId?: number;
  published?: boolean;
  barcode?: string;
  code: string;
}

export type ProductUpdateDTO = Partial<ProductCreateDTO>;

export type PublishedOption = {
  value: boolean;
  label: string;
};

// export type ProductShortDTO = Pick<
//   ProductResponse,
//   "id" | "name" | "price" | "quantity"
// >;

export interface ProductShortDTO  extends ProductPrices {
  id: number
  name: string;
  quantity: number;
}

export type ProductInCategoryDTO = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: {
    id: number;
    title: string;
  };
};
