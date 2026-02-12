"use client";

import Barcode from "react-barcode";

type Props = {
  name: string;
  barcode: string;
  copies?: number;
};

const BarcodePrintSheet = ({ name, barcode, copies = 12 }: Props) => {
  return (
    <div className="print-area">
      <div className="print-grid">
        {Array.from({ length: copies }).map((_, i) => (
          <div key={i} className="barcode-item">
            <div className="product-name">{name}</div>
            <Barcode value={barcode} format="EAN13" width={2} height={60} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarcodePrintSheet;
