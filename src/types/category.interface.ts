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

export type CategoryCreateDTO = {
  title: string;
  parentId?: number | null;
};

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
  [key: string]: any;
}

// export interface CategoryTreeNode extends CategoryNode {
//   expanded?: boolean;
// }

export interface CategoryBreadcrumbItem {
  id: number;
  title: string;
}

export type CategoryBreadcrumb = CategoryBreadcrumbItem[];

export interface IArrivalForm {
  title: string;
  parentId?: string;
}
