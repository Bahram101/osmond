"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useGetProduct } from "@/hooks/product/useProducts";
import Barcode from "react-barcode";
import BreadCrumb from "@/components/layout/BreadCrumb";

export default function PrintBarcodePage() {
  const { id } = useParams<{ id: string }>();
  const { product } = useGetProduct(Number(id));

  useEffect(() => {
    if (product) {
      setTimeout(() => window.print(), 800);
    }
  }, [product]);

  if (!product || !product.barcode) return null;
  const barcode = product.barcode;
  return (
    <>
      <BreadCrumb
        items={[ 
          { label: "Товары", href: "/admin/products" },
          { label: "Редактирование товара" },
        ]}
      />
      <div className="print-area">
        <div className="print-grid">
          {Array.from({ length: 21 }).map((_, i) => (
            <div key={i} className="barcode-item">
              <div className="product-name">{product.name}</div>
              <Barcode value={barcode} format="EAN13" width={2} height={60} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
