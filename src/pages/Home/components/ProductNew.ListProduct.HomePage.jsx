import React, { useEffect, useState } from "react";
import ItemProductNew from "./ProductNew/components/Item.ProductNew";
import axios from "axios";
import { productService } from "../../../services/product.service";

const product = [
  {
    id: 2,
    name: "Cốc Mixi 1200ml",
    price: "250000",
    description: null,
    product_type_id: 1,
    stock_quantity: 200,
    brand: "MixiShop",
    sku: "Mixi#2",
    image:
      "https://product.hstatic.net/200000881795/product/dsc07377_7caf7aecd70f4ea4b6f49358ca81014f_large.jpg",
    created_at: "2025-03-30T06:37:20.000Z",
    updated_at: "2025-03-30T06:37:20.000Z",
  },
  {
    id: 1,
    name: "Cốc vịt",
    price: "250000",
    description: null,
    product_type_id: 1,
    stock_quantity: 200,
    brand: "MixiShop",
    sku: "Mixi#1",
    image:
      "https://product.hstatic.net/200000881795/product/1_8f8cbe9be9e749ab9844309b1b753eac_large.png",
    created_at: "2025-03-30T06:35:29.000Z",
    updated_at: "2025-03-30T06:35:29.000Z",
  },
];

const ProductNewListProductHomePage = () => {
  const [listProduct, setListProduct] = useState([]);
  useEffect(() => {
    productService
      .getListProduct()
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
