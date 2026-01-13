export interface ICategory {
  id?: number;
  title: string;
  parentId?: string;
  createdAt?: string;
  updatedAt?: string;
  parent?: {
    id: number;
    title: string;
  } | null;
}

export type CategoryCreateDTO = Pick<ICategory, "title" | "parentId">;

export type CategoryUpdateDTO = Partial<CategoryCreateDTO>;

export interface IParams {
  params: {
    id: number;
  };
}

export interface CategoryNode {
  id: number;
  title: string;
  parentId: number | null;
  children: CategoryNode[];
}

export interface CategoryBreadcrumbItem {
  id: number;
  title: string;
}

export type CategoryBreadcrumb = CategoryBreadcrumbItem[];