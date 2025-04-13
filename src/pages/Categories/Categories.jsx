import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Input, Pagination, Select, Tag } from "antd"; // Import Pagination từ Ant Design
import { productService } from "../../services/product.service";
import BreadcrumbCustom from "../../components/Breadcrumb";
import { pathDefault } from "../../common/path";
import ItemProductNew from "../Home/components/ProductNew/components/Item.ProductNew";
import LineSpace from "../../components/LineSpace";
import { SORT_OPTIONS } from "../../common/constant";

const Categories = () => {
  const { id } = useParams();
  const [listProduct, setListProduct] = useState([]);
  const [errorPage, setErrorPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const [totalProducts, setTotalProducts] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [submittedPrice, setSubmittedPrice] = useState({
    min: 0,
    max: 0,
  });
  const [tags, setTags] = useState([]);
  const [selectedSort, setSelectedSort] = useState("newest");

  useEffect(() => {
    if (Number(+id) || id === "all") {
      productService
        .getListProduct(
          currentPage,
          pageSize,
          "",
          id === "all" ? undefined : id,
          submittedPrice.min,
          submittedPrice.max,
          selectedSort
        )
        .then((res) => {
          console.log(res.data.metaData);
          setListProduct(res.data.metaData.items);
          setTotalProducts(res.data.metaData.totalItem);
        })
        .catch(() => {
          setErrorPage(true);
        });
    } else {
      setErrorPage(true);
    }
  }, [id, currentPage, submittedPrice, selectedSort]);

  //Handle State cho tags
  useEffect(() => {
    const newTags = [];
    if (submittedPrice.min) newTags.push(`Từ ${submittedPrice.min}`);
    if (submittedPrice.max) newTags.push(`Đến ${submittedPrice.max}`);
    setTags(newTags);
  }, [submittedPrice]);

  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);

    let newSubmittedPrice = { ...submittedPrice };

    if (removedTag.startsWith("Từ")) {
      newSubmittedPrice.min = 0;
      setMinPrice(0);
    }
    if (removedTag.startsWith("Đến")) {
      newSubmittedPrice.max = 0;
      setMaxPrice(0);
    }

    setSubmittedPrice(newSubmittedPrice);
    setCurrentPage(1);
  };

  const handleChangeFilter = (value) => {
    setSelectedSort(value);
    setCurrentPage(1);
  };

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
                <h3 className="uppercase mb-6">Mức giá</h3>
                <div className="flex gap-3 items-center">
                  <Input
                    type="number"
                    placeholder="Từ"
                    prefix=""
                    suffix="đ"
                    value={minPrice === 0 ? undefined : minPrice}
                    onChange={(e) => {
                      setMinPrice(e.target.value);
                    }}
                  />
                  <span>-</span>
                  <Input
                    type="number"
                    placeholder="Đến"
                    prefix=""
                    suffix="đ"
                    value={maxPrice === 0 ? undefined : maxPrice}
                    onChange={(e) => {
                      setMaxPrice(e.target.value);
                    }}
                  />
                </div>
                <div className="mt-4 flex justify-center w-full">
                  <Button
                    type="primary"
                    className="bg-black hover:!bg-black/80 w-full"
                    onClick={() => {
                      setSubmittedPrice({
                        min: Number(minPrice),
                        max: Number(maxPrice),
                      });
                      setCurrentPage(1);
                    }}
                  >
                    Áp dụng
                  </Button>
                </div>
              </div>
              <LineSpace />
              <div>
                <Button
                  className="mt-2 w-full"
                  onClick={() => {
                    setMinPrice(0);
                    setMaxPrice(0);
                    setSubmittedPrice({ min: 0, max: 0 });

                    setCurrentPage(1);
                  }}
                >
                  Xóa lọc
                </Button>
              </div>
            </div>
          </div>

          {/* List Items */}
          <div className="col-span-4 grid grid-cols-4 gap-6">
            <div className="col-span-4 flex items-center justify-between">
              <div>
                {tags.map((tag, index) => {
                  return (
                    <Tag
                      closable
                      onClose={(e) => {
                        e.preventDefault();
                        handleClose(tag);
                      }}
                      color="volcano"
                    >
                      {tag}
                    </Tag>
                  );
                })}
              </div>
              <div className="flex items-center gap-2">
                <span>Sắp xếp:</span>
                <Select
                  value={selectedSort}
                  style={{ width: 120 }}
                  onChange={handleChangeFilter}
                  options={SORT_OPTIONS}
                />
              </div>
            </div>
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
            showSizeChanger={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Categories;
