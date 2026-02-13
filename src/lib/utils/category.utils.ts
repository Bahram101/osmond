// import { ControlledSelectOption } from "@/components/ControlledSelect";
import { ControlledSelectOption } from "@/components/shared/select/Select"; 
import { CategoryNode } from "@/types/category.interface";

export function flattenCategories(
  nodes: CategoryNode[],
  level = 0
): ControlledSelectOption<number>[] {
  return nodes.flatMap((node) => [
    {
      value: node.id,
      label: `${"— ".repeat(level)}${node.title}`,
    },
    ...flattenCategories(node.children ?? [], level + 1),
  ]);
}