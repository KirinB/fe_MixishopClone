import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BreadcrumbProduct from "./components/Breadcrumb.Product";
import DetailProduct from "./components/Detail.Product";
import { productService } from "../../services/product.service";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    productService
      .getProductById(id)
      .then((res) => {
        console.log(res.data.metaData);
        setProduct(res.data.metaData);
      })
      .catch();
  }, [id]);
  return (
    <div>
      <BreadcrumbProduct name={product.name} />
      <div className="container space-y-10 my-10">
        <DetailProduct product={product} />
      </div>
    </div>
  );
};

export default Product;
