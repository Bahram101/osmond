export interface ICategory {
  id: string;
  name: string;
  parentId?: string;
  createdAt?: string;
  updatedAt?: string;
  parent?: {
    id: string;
    name: string;
  } | null;
}
