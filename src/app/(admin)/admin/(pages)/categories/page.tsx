"use client";
import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import Table from "rc-table";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Button from "../../components/ui/button/Button";
import { useGetCategories } from "@/hooks/category/useCategories";
import {
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Categories = () => {
  const { categories, isFetchingCategories } = useGetCategories();
  const [cats, setCats] = useState([]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 100,
    },
    {
      title: "Parent",
      dataIndex: "parentId",
      key: "parentId",
      width: 100,
    },

    {
      title: "Operations",
      dataIndex: "",
      key: "operations",
      render: () => <a href="#">Delete</a>,
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

        <Table
          columns={columns}
          data={categories}
          rowKey={(record) => record.id}
        />
      </div>
    </div>
  );
};

export default Categories;
