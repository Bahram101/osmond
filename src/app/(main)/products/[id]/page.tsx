"use client";
import { useParams } from "next/navigation";
import React from "react";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);

  return <div>ProductPage {productId}</div>;
};

export default ProductPage;
