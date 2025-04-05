import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Pagination } from "antd"; // Import Pagination từ Ant Design
import { productService } from "../../services/product.service";
import BreadcrumbCustom from "../../components/Breadcrumb";
import { pathDefault } from "../../common/path";
import ItemProductNew from "../Home/components/ProductNew/components/Item.ProductNew";
import LineSpace from "../../components/LineSpace";

const Categories = () => {
  const { id } = useParams();
  const [listProduct, setListProduct] = useState([]);
  const [errorPage, setErrorPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [pageSize] = useState(8); // Số sản phẩm trên mỗi trang
  const [totalProducts, setTotalProducts] = useState(0); // Tổng số sản phẩm

  useEffect(() => {
    if (Number(+id) || id === "all") {
      productService
        .getListProduct(
          currentPage,
          pageSize,
          "",
          id === "all" ? undefined : id
        )
        .then((res) => {
          console.log(res.data.metaData);
          setListProduct(res.data.metaData.items);
          setTotalProducts(res.data.metaData.totalItem); // Lấy tổng số sản phẩm từ API
        })
        .catch(() => {
          setErrorPage(true);
        });
    } else {
      setErrorPage(true);
    }
  }, [id, currentPage]); // Gọi lại API khi id hoặc currentPage thay đổi

  if (errorPage) return <div className="text-center">Not Found</div>;

  return (
    <div>
      <BreadcrumbCustom
        items={[
          { title: "Trang chủ", href: pathDefault.homePage },
          { title: "Danh mục", href: "/categories/all" },
          {
            title:
              id === "all"
                ? "Tất cả danh mục"
                : listProduct[0]?.product_type?.name || "Danh mục",
          },
        ]}
      />
      <div className="container">
        {id === "all" && (
          <div className="py-6 hover:scale-90 transition-all duration-300 cursor-pointer">
            <img src="/collection_main_banner.jpg" alt="banner" />
          </div>
        )}
        <div className="grid grid-cols-5 py-10 gap-10">
          {/* Sidebar */}
          <div className="flex flex-col">
            <div className="mb-10">
              {id === "all" ? (
                <h3 className="text-2xl">Tất cả sản phẩm</h3>
              ) : !isNaN(+id) ? (
                <h3 className="text-2xl">
                  {listProduct[0]?.product_type?.name}
                </h3>
              ) : null}
            </div>
            <div className="space-y-4">
              <LineSpace />
              <div>
                <h3 className="uppercase">Mức giá</h3>
              </div>
            </div>
          </div>
          {/* List Items */}
          <div className="col-span-4 grid grid-cols-4 gap-6">
            {listProduct.map((item, index) => (
              <ItemProductNew key={index} {...item} />
            ))}
          </div>
        </div>
        {/* Pagination */}
        <div className="flex justify-center py-10">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalProducts}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false} // Không cho thay đổi số sản phẩm mỗi trang
          />
        </div>
      </div>
    </div>
  );
};

export default Categories;
