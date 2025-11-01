export interface ICategory {
  id?: string;
  name: string;
  parentId?: string;
  createdAt?: string;
  updatedAt?: string;
  parent?: {
    id: string;
    name: string;
  } | null;
}

export type CategoryCreateDTO = Pick<ICategory, "name" | "parentId">;

export type CategoryUpdateDTO = Partial<CategoryCreateDTO>;

export interface IParams {
  params: {
    id: string;
  };
}
