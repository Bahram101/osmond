"use client";
import Barcode from "react-barcode";

interface Props {
  value: string;
}

export default function BarcodePreview({ value }: Props) {
  if (!value) return null;
  return (
    <Barcode value={value} format="EAN13" width={1.8} height={20} displayValue margin={0} fontSize={14} />
  );
}
