import { Button, InputNumber } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productService } from "../../services/product.service";
import { formatCurrencyVND } from "../../utils/utils";
import { Link } from "react-router-dom";
import { removeFromCart, updateQuantity } from "../../store/slice/cart.slice";
import { IoClose } from "react-icons/io5";
import LineSpace from "../../components/LineSpace";

const InfoProductCart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cartSlice);
  const [totalPrice, setTotalPrice] = useState(0);
  const [listProduct, setListProduct] = useState([]);

  useEffect(() => {
    const ids = cart.map((item) => item.productId);
    const data = { ids };
    productService
      .getProductByIds(data)
      .then((res) => {
        const products = res.data.metaData.items;
        // Gắn quantity từ cart vào product
        const updatedList = products.map((product) => {
          const cartItem = cart.find((item) => item.productId === product.id);
          return { ...product, quantity: cartItem?.quantity || 1 };
        });
        setListProduct(updatedList);
        setTotalPrice(res.data.metaData.totalPrice);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [cart]);

  const handleQuantityChange = (productId, value) => {
    dispatch(updateQuantity({ productId, quantity: value }));
  };

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <div className="py-10 container">
      <h2 className="text-2xl font-semibold">Giỏ hàng</h2>
      <div className="grid grid-cols-[3fr_1fr] gap-10 items-start">
        {/* Danh sách giỏ hàng */}
        <div className="flex flex-col gap-4">
          {listProduct.map((product, index) => (
            <>
              <div
                key={product.id}
                className="grid grid-cols-12 items-center gap-4"
              >
                {/* Nút xóa */}
                <div
                  className="flex items-center justify-center cursor-pointer"
                  onClick={() => handleRemove(product.id)}
                >
                  <IoClose size={20} />
                </div>

                {/* Ảnh sản phẩm */}
                <div className="col-span-2">
                  <img
                    src={product.main_image}
                    alt={product.name}
                    className="h-[100px] w-[75px] object-cover"
                  />
                </div>

                {/* Thông tin */}
                <div className="col-span-9 flex justify-between items-center">
                  <div className="flex-1 flex flex-col gap-2 group cursor-pointer">
                    <Link
                      to={`/product/${product.id}`}
                      className="text-sm group-hover:text-price transition-all duration-300"
                    >
                      {product.name}
                    </Link>
                    <p className="text-xs text-gray-500">{product.sku}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <InputNumber
                      min={1}
                      value={product.quantity}
                      onChange={(value) =>
                        handleQuantityChange(product.id, value)
                      }
                    />
                    <p className="text-price">
                      {formatCurrencyVND(product.price)}
                    </p>
                  </div>
                </div>
              </div>
              {index !== listProduct.length - 1 && <LineSpace />}
            </>
          ))}
        </div>

        {/* Form thanh toán */}
        <div className="p-6 rounded-lg bg-gray-100 w-full">
          <form action="" className="space-y-6">
            <h3 className="uppercase text-lg">thanh toán</h3>
            <div className="flex justify-between items-center">
              <div className="uppercase">Tổng cộng:</div>
              <div className="text-price text-lg">
                {formatCurrencyVND(totalPrice)}
              </div>
            </div>
            <Button
              type="primary"
              className="bg-black hover:!bg-black/80 !text-white w-full"
              size="large"
            >
              Thanh Toán
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InfoProductCart;
