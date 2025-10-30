import React from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

const UsersPage = () => {
  return (
    <div className="col-span-12 xl:col-span-7">
      <PageBreadcrumb
        items={[{ label: "Home", href: "/admin" }, { label: "Пользователи" }]}
      />
    </div>
  );
};

export default UsersPage;
