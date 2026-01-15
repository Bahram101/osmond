"use client";
import React, { useEffect, useMemo, useState } from "react";
import { SortableTree, TreeItem } from "@nosferatu500/react-sortable-tree";
import {
  useDeleteCategory,
  useCreateCategory,
  useGetCategoriesTree,
  useUpdateCategory,
} from "@/hooks/category/useCategories";
import Loader from "@/components/shared/Loader";
import BreadCrumb from "../../components/common/BreadCrumb";
import Button from "../../components/ui/button/Button";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../../components/ui/modal";
import CategoryForm from "./components/CategoryForm";
import { useForm } from "react-hook-form";
import { CategoryCreateDTO, CategoryNode } from "@/types/category.interface";

type CategoryTreeNode = CategoryNode & {
  expanded?: boolean;
};

type ModalMode = "create-root" | "create-child" | "edit";

function buildExpandedTree(nodes: CategoryNode[]): CategoryTreeNode[] {
  return nodes.map((node) => ({
    ...node,
    expanded: !!node.children?.length,
    children: node.children ? buildExpandedTree(node.children) : [],
  }));
}

const Categories = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const { control, handleSubmit, reset, watch } = useForm<CategoryCreateDTO>();
  const values = watch();

  const { categoriesTree, isFetchingCategoriesTree } = useGetCategoriesTree();
  const { createCategory, isCreatingCategory } = useCreateCategory();
  const { updateCategory, isUpdatingCategory } = useUpdateCategory();
  const { deleteCategory, isDeleting } = useDeleteCategory();

  const [treeData, setTreeData] = useState<CategoryTreeNode[]>([]);
  const [modalMode, setModalMode] = useState<ModalMode>("create-root");
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(
    null
  );

  const modalTitle =
    modalMode === "edit"
      ? "Редактировать категорию"
      : modalMode === "create-child"
      ? "Создать подкатегорию"
      : "Создать категорию";

  useEffect(() => {
    if (!categoriesTree) return;
    setTreeData(buildExpandedTree(categoriesTree));
  }, [categoriesTree]);

  if (isFetchingCategoriesTree) {
    return <Loader />;
  }

  const openCreateRoot = () => {
    setModalMode("create-root");
    setEditingCategoryId(null);
    reset({ title: "", parentId: null });
    openModal();
  };

  const openCreateChild = (parentId: number) => {
    setModalMode("create-child");
    setEditingCategoryId(null);
    reset({ title: "", parentId });
    openModal();
  };

  const openEdit = (node: CategoryTreeNode) => {
    setModalMode("edit");
    setEditingCategoryId(node.id);
    reset({ title: node.title, parentId: node.parentId });
    openModal();
  };

  const handleSubmitCategory = (data: CategoryCreateDTO) => {
    if (modalMode === "edit" && editingCategoryId) {
      updateCategory({ id: editingCategoryId, data });
    } else {
      createCategory(data);
    }
    closeModal();
  };

  const handleDelete = async (id: number) => {
    if (confirm("Точно удалить категорию?")) {
      deleteCategory(id);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-146 p-4 lg:p-6"
        title={modalTitle}
      >
        <CategoryForm
          closeModal={closeModal}
          control={control}
          handleSubmit={handleSubmit}
          handleSaveCategory={handleSubmitCategory}
        />
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
              onClick={openCreateRoot}
            >
              Создать
            </Button>
          </div>

          <div className=" h-[68vh] ">
            <SortableTree
              treeData={treeData}
              onChange={(nextTree) => setTreeData([...nextTree])}
              generateNodeProps={({ node }: { node: CategoryTreeNode }) => ({
                buttons: [
                  <Plus
                    key="add"
                    className="treeButton"
                    onClick={() => openCreateChild(node.id)}
                  />,
                  <Pencil
                    key="edit"
                    className="treeButton"
                    onClick={() => openEdit(node)}
                  />,
                  <Trash2
                    key="delete"
                    color="red"
                    className="treeButton"
                    onClick={() => handleDelete(node.id)}
                  />,
                ],
              })}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
