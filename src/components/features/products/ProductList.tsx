import { SiteProductDTO } from "@/types/site/product.interface";

type Props = {
  products: SiteProductDTO[]; 
};

const ProductList = ({ products }: Props) => {
  return (
    <div className="">
      {products.map((product) => (
        <div key={product.id}>
          <div className="font-bold">{product.name}</div>
          <p>Цена: {product.price}тг</p>
          <p>В наличии: {product.quantity > 0 ? "Да" : "Нет"}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
