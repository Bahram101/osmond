"use client";
import React, { useEffect, useMemo, useState } from "react";
import { SortableTree, TreeItem } from "@nosferatu500/react-sortable-tree";
import {
  useDeleteCategory,
  useGetCategories,
  useGetCategoriesTree,
} from "@/hooks/category/useCategories";
import Loader from "@/components/shared/Loader";
import BreadCrumb from "../../components/common/BreadCrumb";
import Button from "../../components/ui/button/Button";
import { Plus } from "lucide-react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../../components/ui/modal";
import CategoryForm from "./components/CategoryForm";

type CategoryNode = {
  title: string;
  expanded?: boolean;
  children?: CategoryNode[];
};

const Categories = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const { categoriesTree, isFetchingCategoriesTree } = useGetCategoriesTree();

  const [treeData, setTreeData] = useState<CategoryNode[]>(() => {
    if (!categoriesTree) return [];

    function withExpanded(nodes: CategoryNode[]): CategoryNode[] {
      return nodes.map((node) => ({
        ...node,
        expanded: !!node.children?.length,
        children: withExpanded(node.children || []),
      }));
    }

    return withExpanded(categoriesTree);
  });

  const handleOpenModal = (currentProduct: any) => {
    // setArrivalProduct(currentProduct.original);
    openModal();
  };

  if (isFetchingCategoriesTree) {
    return <Loader />;
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-146 p-4 lg:p-6"
        title="Создать категорию"
      >
        {/* <CategoryForm /> */}
        ыва
      </Modal>
      <div className="col-span-12 xl:col-span-7">
        <BreadCrumb
          items={[{ label: "Home", href: "/admin" }, { label: "Категории" }]}
        />

        <div className="p-3 rounded-2xl md:p-6 border-gray-200 bg-white">
          <div className="flex justify-between items-center pb-5">
            <h3 className="text-lg">Список категории</h3>

            <Button
              size="xs"
              variant="primary"
              startIcon={<Plus />}
              onClick={() => handleOpenModal(null)}
            >
              Создать
            </Button>
          </div>
          <div style={{ height: 500 }}>
            <SortableTree
              treeData={treeData}
              onChange={setTreeData}
            // onMoveNode={({ node, nextParentNode }) => {}}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
