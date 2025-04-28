import React, { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { formatCurrencyVND } from "../../../utils/utils";
import { Button, InputNumber } from "antd";
import { useDispatch } from "react-redux";
import { handleUpdateCart } from "../../../store/slice/cart.slice";
import { useNotificationContext } from "../../../store/Notification.Context";

const mockup = [
  {
    image:
      "https://product.hstatic.net/200000881795/product/thiet_ke_chua_co_ten__12__907efb3b884c4ab9889c8459ea874439_1024x1024.png",
  },
  {
    image:
      "https://product.hstatic.net/200000881795/product/thiet_ke_chua_co_ten__12__907efb3b884c4ab9889c8459ea874439_1024x1024.png",
  },
  {
    image:
      "https://product.hstatic.net/200000881795/product/thiet_ke_chua_co_ten__12__907efb3b884c4ab9889c8459ea874439_1024x1024.png",
  },
  {
    image:
      "https://product.hstatic.net/200000881795/product/thiet_ke_chua_co_ten__12__907efb3b884c4ab9889c8459ea874439_1024x1024.png",
  },
];

const DetailProduct = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const { handleNotification } = useNotificationContext();

  const dispatch = useDispatch();

  const onChange = (value) => {
    setQuantity(value);
  };

  const handleAddToCart = () => {
    const newCartItem = {
      quantity,
      productId: product.id,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const index = existingCart.findIndex(
      (item) => item.productId === newCartItem.productId
    );

    if (index !== -1) {
      existingCart[index].quantity += newCartItem.quantity;
    } else {
      // Nếu chưa có → thêm mới
      existingCart.push(newCartItem);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));

    dispatch(handleUpdateCart(existingCart));

    handleNotification(`success`, `Đặt vào giỏ hàng thành công`);

    console.log("Cart updated:", existingCart);
  };
  return (
    <div className="grid grid-cols-2 gap-10">
      <div className="flex gap-10">
        <div className="w-1/6 flex flex-col gap-2">
          {mockup.map((item, index) => {
            return (
              <div key={index} className="border rounded-md p-1">
                <img src={item.image} alt="" />
              </div>
            );
          })}
        </div>
        <div className="w-5/6">
          <img
            src={product.main_image}
            className="w-full object-contain"
            alt={product.name}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-semibold">{product.name}</div>
          <div>
            <CiHeart size={20} />
          </div>
        </div>
        <div className="flex gap-4">
          <p className="text-sm">
            Thương hiệu: <span className="text-price">{product.brand}</span>
          </p>
          <p className="text-sm">
            Mã sản phẩm: <span className="text-price">{product.sku}</span>
          </p>
        </div>

        <h3 className="text-price text-2xl font-semibold">
          {formatCurrencyVND(product.price)}
        </h3>
        <div>
          <img
            src="https://theme.hstatic.net/200000881795/1001243022/14/promo_tag_3.png?v=152"
            alt=""
          />
        </div>
        <div className="border border-dashed border-price px-6 relative mt-10">
          <ul className="list-disc p-4 mt-6 text-sm space-y-2">
            <li>Chuyển khoản với đơn hàng từ 500k trở lên (Bắt buộc)</li>
            <li>Đồng giá ship toàn quốc 30k</li>
            <li>Hỗ trợ trả lời thắc mắc qua fanpage chính thức</li>
            <li>Khuyến mãi trực tiếp trên giá sản phẩm</li>
            <li>Đổi trả nếu sản phẩm lỗi bất kì</li>
          </ul>
          <div className="absolute -top-[10px] bg-white flex gap-4 px-2">
            <img
              src="https://theme.hstatic.net/200000881795/1001243022/14/icon-product-promotion.png?v=152"
              alt=""
            />
            <h3 className="uppercase text-price text-sm">
              KHUYẾN MÃI - ƯU ĐÃi
            </h3>
          </div>
        </div>
        <div>
          <span className="font-semibold">Màu sắc:</span>
          <span className="text-gray-500"> Đen</span>
        </div>
        <div className="flex gap-10 h-[40px]">
          {product?.stock_quantity > 0 ? (
            <>
              <InputNumber
                min={1}
                max={3}
                value={quantity}
                onChange={onChange}
                className="w-[200px] h-full text-lg"
              />
              <Button
                type="default"
                className="w-full h-full"
                onClick={handleAddToCart}
              >
                Đặt vào giỏ hàng
              </Button>
            </>
          ) : (
            <Button type="default" disabled className="h-full">
              Hết Hàng
            </Button>
          )}
        </div>
        <div className="flex justify-center items-center gap-2">
          <p>Hotline:</p>
          <span className="font-semibold hover:text-price cursor-pointer transition-all duration-200">
            0822221992
          </span>
          <p>(7:30 - 22:00)</p>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
