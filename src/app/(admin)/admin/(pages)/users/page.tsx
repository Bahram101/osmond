import React from "react";
import BreadCrumb from "../../components/common/BreadCrumb";

const UsersPage = () => {
  return (
    <div className="col-span-12 xl:col-span-7">
      <BreadCrumb
        items={[{ label: "Home", href: "/admin" }, { label: "Пользователи" }]}
      />
    </div>
  );
};

export default UsersPage;
