import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { productService } from "../../services/product.service";
import BreadcrumbCustom from "../../components/Breadcrumb";
import { pathDefault } from "../../common/path";
import ItemProductNew from "../Home/components/ProductNew/components/Item.ProductNew";
import { Pagination } from "antd";

const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const [listProduct, setListProduct] = useState([]);
  const [countProduct, setCountProduct] = useState(0);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    productService
      .getListProduct(page, pageSize, searchParams.get("q"))
      .then((res) => {
        console.log(res.data.metaData);
        setListProduct(res.data.metaData.items);
        setCountProduct(res.data.metaData.totalItem);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchParams, page]);

  useEffect(() => {
    setPage(1);
  }, [searchParams]);

  return (
    <>
      <BreadcrumbCustom
        items={[
          {
            title: "Trang chủ",
            href: pathDefault.homePage,
          },
          {
            title: "Tìm kiếm",
          },
        ]}
      />
      <div className="container py-10">
        {listProduct.length > 0 && (
          <h3 className="mb-10 text-xl uppercase">
            Có {countProduct} kết quả tìm kiếm phù hợp
          </h3>
        )}
        <div className="grid grid-cols-5 gap-10">
          {listProduct.length > 0 ? (
            listProduct.map((item, index) => (
              <ItemProductNew key={index} {...item} />
            ))
          ) : (
            <div className="col-span-5 flex flex-col items-center justify-center py-10">
              <img
                src="/search_not_found.jpg"
                alt="Không tìm thấy sản phẩm"
                className="w-90 h-90 object-contain mb-4"
              />
              <p className="text-gray-500 text-lg">
                Không tìm thấy sản phẩm phù hợp
              </p>
            </div>
          )}
        </div>
        {listProduct.length > 0 && (
          <div className="flex justify-center mt-10">
            <Pagination
              current={page}
              pageSize={pageSize}
              total={countProduct}
              onChange={(page) => setPage(page)}
              showSizeChanger={false} // Ẩn chọn pageSize
            />
          </div>
        )}
      </div>
    </>
  );
};

export default SearchPage;
