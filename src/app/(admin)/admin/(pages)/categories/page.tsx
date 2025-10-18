import React from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Link from "next/link";
import Button from "../../components/ui/button/Button";
import { Plus } from "lucide-react";

const Categories = () => {
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
      </div>
    </div>
  );
};

export default Categories;
