import { Breadcrumb } from "antd";
import React from "react";
import { pathDefault } from "../common/path";

const BreadcrumbCustom = ({
  items = [
    {
      href: pathDefault.homePage,
      title: "Trang chủ",
    },
    {
      title: <h3 className="text-price"></h3>,
    },
  ],
}) => {
  return (
    <div className="bg-gray-200">
      <div className="container py-2">
        <Breadcrumb items={items} />
      </div>
    </div>
  );
};

export default BreadcrumbCustom;
