import { Button } from "antd";
import React, { memo } from "react";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="py-10 container flex flex-col gap-4 justify-center items-center">
      <img src="/cart_empty.png" alt="" />
      <h2 className="font-semibold text-2xl">“Hổng” có gì trong giỏ hết</h2>
      <p className="text-gray-500">
        Về trang cửa hàng để chọn mua sản phẩm bạn nhé!!
      </p>
      <Link to="/categories/all">
        <Button size="large">Mua sắm ngay</Button>
      </Link>
    </div>
  );
};

export default memo(EmptyCart);
