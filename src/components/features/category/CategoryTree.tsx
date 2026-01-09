import { CategoryNode } from "@/types/category.interface"; 
import { CategoryTreeItem } from "./CategoryTreeItem";

type Props = {
  categoriesTree: CategoryNode[];
};

const CategoryTree = ({ categoriesTree }: Props) => {
  return (
    <div>
      {categoriesTree.map((category) => (
        <CategoryTreeItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default CategoryTree;
