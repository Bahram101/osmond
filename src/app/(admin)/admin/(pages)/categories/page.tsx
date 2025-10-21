"use client";
import React from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import Table from "rc-table";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Button from "../../components/ui/button/Button";
import { useGetCategories } from "@/hooks/category/useCategories";
import Loader from "@/components/shared/Loader";

const Categories = () => {
  const { categories, isFetchingCategories } = useGetCategories();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 100,
    },
    {
      title: "Parent",
      dataIndex: "parent.name",
      key: "parent.name",
      width: 100,
      render: (_: any, record: any) => record.parent?.name || "—",
    },

    {
      title: "Operations",
      dataIndex: "",
      key: "operations",
      render: () => (
        <Button variant="danger" size="xs">
          Удалить
        </Button>
      ),
    },
  ];

  return (
    <div className="col-span-12 xl:col-span-7">
      <PageBreadcrumb pageTitle="Категория" />

      <div className="p-3 rounded-2xl md:p-6 border-gray-200 bg-white">
        <div className="flex justify-between items-center pb-5">
          <h3 className="text-lg">Список категории</h3>
          <Link href="/admin/categories/create">
            <Button size="xs" variant="primary" startIcon={<Plus />}>
              Создать
            </Button>
          </Link>
        </div>
        {isFetchingCategories ? (
          <Loader />
        ) : (
          <div className="overflow-x-auto">
            <Table
              columns={columns}
              data={categories}
              tableLayout="fixed"
              rowKey={(record) => record.id}
              style={{ width: "100%", minWidth: "1000px" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
