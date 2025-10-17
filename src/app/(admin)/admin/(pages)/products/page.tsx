import React from "react";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { Plus } from "lucide-react";
import Button from "../../components/ui/button/Button";
import Link from "next/link";

const ProductsPage = () => {
  return (
    <div className="col-span-12 xl:col-span-7">
      <PageBreadcrumb pageTitle="Товары" />
      <div className="overflow-hidden p-3 rounded-2xl md:p-6 border-gray-200 bg-white">
        <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Recent Orders
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin/products/create">
              <Button size="xs" variant="primary" startIcon={<Plus />}>
                Создать
              </Button>
            </Link>
            {/* <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
              <SlidersHorizontal />
              Filter
            </button> */}
          </div>
        </div>
        <RecentOrders />
      </div>
    </div>
  );
};

export default ProductsPage;
