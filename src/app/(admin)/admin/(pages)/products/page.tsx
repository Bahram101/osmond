import React from "react";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { Plus } from "lucide-react";
import Button from "../../components/ui/button/Button";
import Link from "next/link";

const ProductsPage = () => {
  return (
    <div className="col-span-12 xl:col-span-7">
      <PageBreadcrumb
        items={[
          { label: "Home", href: "/admin" },
          { label: "Товары" },
        ]}
      />
      <div className="p-3 rounded-2xl md:p-6 border-gray-200 bg-white">
        <div className="flex justify-between items-center pb-5">
          <h3 className="text-lg">Recent Orders</h3>

          <Link href="/admin/products/create">
            <Button size="xs" variant="primary" startIcon={<Plus />}>
              Создать
            </Button>
          </Link>
        </div>

        <RecentOrders />
      </div>
    </div>
  );
};

export default ProductsPage;
