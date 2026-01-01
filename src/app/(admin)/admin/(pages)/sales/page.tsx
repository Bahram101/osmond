"use client";
import { useSale } from "@/hooks/sale/useSale";
import { ISale } from "@/types/sale.interface";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import React from "react";
import BreadCrumb from "../../components/common/BreadCrumb";
import Loader from "@/components/shared/Loader";
import { DataTable } from "@/components/common/DataTable";

const SalesPage = () => {
  

  return (
    <div className="col-span-12 xl:col-span-7">
      Продажи
    </div>
  );
};

export default SalesPage;
