"use client";

import BreadCrumb from "../../components/common/BreadCrumb";

const CustomerPage = () => {
  return (
    <div className="col-span-12 xl:col-span-7">
      <BreadCrumb
        items={[{ label: "Home", href: "/admin" }, { label: "Клиенты" }]}
      /> 
    </div>
  );
};

export default CustomerPage;
