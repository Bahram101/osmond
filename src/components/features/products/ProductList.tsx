import { SiteProductDTO } from "@/types/site/product.interface";

type Props = {
  products: SiteProductDTO[];
};

const ProductList = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
      {products.map((product) => (
        <div
          key={product.id}
          className="border rounded-xl p-3 pl-4 shadow-sm hover:shadow-md transition bg-white"
        >
          <div className="text-lg font-semibold">{product.name}</div>

          <p className="text-gray-700">
            Цена: <span className="font-medium">{product.price} тг</span>
          </p>

          <p
            className={`text-sm font-medium ${
              product.quantity > 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {product.quantity > 0 ? "В наличии" : "Нет в наличии"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
