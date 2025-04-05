import { Breadcrumb } from "antd";
import React from "react";
import { pathDefault } from "../../../common/path";

const BreadcrumbProduct = ({ name }) => {
  return (
    <div className="bg-gray-200">
      <div className="container py-2">
        <Breadcrumb
          items={[
            {
              href: pathDefault.homePage,
              title: "Trang chủ",
            },
            {
              title: <h3 className="text-price">{name}</h3>,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default BreadcrumbProduct;
