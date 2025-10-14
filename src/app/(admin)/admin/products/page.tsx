import React from "react";
import RecentOrders from "../components/ecommerce/RecentOrders";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import ComponentCard from "../components/common/ComponentCard";

const ProductsPage = () => {
  return (
    <div className="col-span-12 xl:col-span-7">
      <PageBreadcrumb pageTitle="Товары" />

      <RecentOrders />
    </div>
  );
};

export default ProductsPage;
