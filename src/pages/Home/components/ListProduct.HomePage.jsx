import React from "react";
import LineSpace from "../../../components/LineSpace";
import { Tabs } from "antd";
import ProductNewListProductHomePage from "./ProductNew.ListProduct.HomePage";

const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: "1",
    label: <h3 className="text-xl px-6">Hàng mới về</h3>,
    children: <ProductNewListProductHomePage />,
  },
  {
    key: "2",
    label: <h3 className="text-xl px-6">Năng động mùa hè</h3>,
    children: <ProductNewListProductHomePage />,
  },
];

const ListProductHomePage = () => {
  return (
    <div>
      <div className="flex gap-4 items-center mb-6">
        <h3 className="font-semibold uppercase text-4xl">Hàng hot</h3>
        <img src="/flashsale-hot.png" className="w-12 h-12" alt="" />
      </div>
      <LineSpace />
      <div>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
    </div>
  );
};

export default ListProductHomePage;
