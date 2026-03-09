"use client";
import Barcode from "react-barcode";

interface Props {
  value: string;
}

export default function BarcodePreview({ value }: Props) {
  if (!value) return null;
  return (
    <Barcode
      value={value}
      format="EAN13"
      width={1.4}
      height={18}
      displayValue
      marginTop={0}
      marginBottom={0}
      fontSize={12}
    />
  );
}
