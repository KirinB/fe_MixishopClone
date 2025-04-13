import React, { useEffect, useState } from "react";
import { productService } from "../../../services/product.service";
import ItemProductNew from "./ProductNew/components/Item.ProductNew";

const ProductNewListProductHomePage = ({ typeId = 0 }) => {
  const [listProduct, setListProduct] = useState([]);
  useEffect(() => {
    productService
      .getListProduct(1, 10, "", typeId)
      .then((res) => {
        setListProduct(res.data.metaData.items);
      })
      .catch();
  }, []);
  return (
    <div className="mt-6 text-base">
      <div className="grid grid-cols-5 gap-4">
        {listProduct.map((item, index) => {
          return <ItemProductNew key={index} {...item} />;
        })}
      </div>
    </div>
  );
};

export default ProductNewListProductHomePage;
