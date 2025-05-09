import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BreadcrumbProduct from "./components/Breadcrumb.Product";
import DetailProduct from "./components/Detail.Product";
import { productService } from "../../services/product.service";
import ItemProductNew from "../Home/components/ProductNew/components/Item.ProductNew";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);

  const percent = 0.2; // 20%
  const minPrice = product.price * (1 - percent);
  const maxPrice = product.price * (1 + percent);

  useEffect(() => {
    productService
      .getProductById(id)
      .then((res) => {
        // console.log(res.data.metaData);
        setProduct(res.data.metaData);
      })
      .catch();
  }, [id]);

  useEffect(() => {
    productService
      .getListProduct(1, 5, "", product.product_type_id)
      .then((res) => {
        const data = res.data.metaData.items;

        const newData = data.filter((item) => +item.id !== +id);
        setRelatedProducts(newData);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(`minPrice: ${minPrice} , max :  ${maxPrice}`);
    productService
      .getListProduct(1, 5, "", "", minPrice, maxPrice)
      .then((res) => {
        const data = res.data.metaData.items;
        const newData = data.filter((item) => +item.id !== +id);
        setSimilarProducts(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [product]);
  return (
    <div>
      <BreadcrumbProduct name={product.name} />
      <div className="container space-y-10 my-10">
        <DetailProduct product={product} />
        {similarProducts.length > 0 && (
          <div>
            <h3 className="text-2xl mb-10">Sản phẩm cùng phân khúc</h3>
            <div className="grid grid-cols-5 gap-10">
              {similarProducts.map((item) => {
                return (
                  <ItemProductNew
                    key={item.id}
                    brand={item.brand}
                    id={item.id}
                    main_image={item.main_image}
                    name={item.name}
                    price={item.price}
                  />
                );
              })}
            </div>
          </div>
        )}
        {relatedProducts.length > 0 && (
          <div>
            <h3 className="text-2xl mb-10">Sản phẩm liên quan</h3>
            <div className="grid grid-cols-5 gap-10">
              {relatedProducts.map((item) => {
                return (
                  <ItemProductNew
                    key={item.id}
                    brand={item.brand}
                    id={item.id}
                    main_image={item.main_image}
                    name={item.name}
                    price={item.price}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
