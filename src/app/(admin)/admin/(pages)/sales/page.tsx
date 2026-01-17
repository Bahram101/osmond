"use client";

import BreadCrumb from "../../components/common/BreadCrumb";

const SalesPage = () => {
  return (
    <div className="col-span-12 xl:col-span-7">
      <BreadCrumb
        items={[{ label: "Home", href: "/admin" }, { label: "Продажи" }]}
      /> 
    </div>
  );
};

export default SalesPage;
