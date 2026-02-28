"use client";
import Barcode from "react-barcode";

interface Props {
  value: string;
}

export default function BarcodePreview({ value }: Props) {
  if (!value) return null;
  return (
    <Barcode value={value} format="EAN13" width={2} height={60} displayValue margin={0} />
  );
}
