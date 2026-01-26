"use client";

import { Plus } from "lucide-react";
import BreadCrumb from "../../components/common/BreadCrumb";
import Button from "../../components/ui/button/Button";
import Loader from "@/components/shared/Loader";
import { DataTable } from "@/components/common/DataTable";
import Link from "next/link";

const CustomerPage = () => {
  
  return (
    <div className="col-span-12 xl:col-span-7">
      <BreadCrumb
        items={[{ label: "Home", href: "/admin" }, { label: "Продажи" }]}
      />
      <div className="p-3 rounded-2xl md:p-6 border-gray-200 bg-white">
        <div className="flex justify-between items-center pb-5">
          <h3 className="text-lg">Список продажи</h3>

          <Link href='/admin/sales/create'>
            <Button
              size="xs"
              variant="success"
              startIcon={<Plus size="18" />}
              // onClick={() => handleOpenModal(null)}
            >
              Новая продажа
            </Button>
          </Link>
        </div>

        {false ? <Loader /> : <DataTable columns={[]} data={[]} />}
      </div>
    </div>
  );
};

export default CustomerPage;
