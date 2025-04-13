import React from "react";
import { useSelector } from "react-redux";
import { pathDefault } from "../../common/path";
import BreadcrumbCustom from "../../components/Breadcrumb";
import EmptyCart from "./Empty.Cart";
import InfoProductCart from "./InfoProduct.Cart";

const Cart = () => {
  const { cart } = useSelector((state) => state.cartSlice);
  return (
    <div>
      <BreadcrumbCustom
        items={[
          { title: "Trang chủ", href: pathDefault.homePage },
          { title: `Giỏ hàng (${cart ? cart.length : 0})` },
        ]}
      />

      <div className="container">
        {cart ? (
          <>
            <InfoProductCart />
          </>
        ) : (
          <>
            {/* Không có hàng  */}
            <EmptyCart />
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
