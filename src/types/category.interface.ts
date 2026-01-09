export interface ICategory {
  id?: number;
  name: string;
  parentId?: string;
  createdAt?: string;
  updatedAt?: string;
  parent?: {
    id: number;
    name: string;
  } | null;
}

export type CategoryCreateDTO = Pick<ICategory, "name" | "parentId">;

export type CategoryUpdateDTO = Partial<CategoryCreateDTO>;

export interface IParams {
  params: {
    id: number;
  };
}

export interface CategoryNode {
  id: number;
  name: string;
  parentId: number | null;
  children: CategoryNode[];
}
