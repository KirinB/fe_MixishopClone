import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { orderService } from "../../services/order.service";
import { pathDefault } from "../../common/path";
import { Button, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import BreadcrumbCustom from "../../components/Breadcrumb";
const PaymentResult = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [orderStatus, setOrderStatus] = useState(null);

  useEffect(() => {
    const orderCode = searchParams.get("orderCode");
    if (!orderCode) {
      navigate(pathDefault.homePage);
      return;
    }
    orderService
      .checkOrderStatus(orderCode)
      .then((res) => {
        console.log(res.data.metaData);
      })
      .catch((err) => {
        console.log(err);
        navigate(pathDefault.homePage);
      })
      .finally(() => setLoading(false));
  }, [searchParams, navigate]);

  if (loading)
    return (
      <div className="container">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );
  return (
    <>
      <BreadcrumbCustom
        items={[
          { title: "Trang chủ", href: pathDefault.homePage },
          { title: "Thanh toán" },
        ]}
      />
      <div className="container flex justify-center py-10">
        <div className="flex flex-col justify-center items-center w-1/2 text-center gap-4">
          <img src="/check_done.png" className="" alt="" />
          <h2 className="text-green-500 font-semibold text-2xl">
            Thanh toán thành công
          </h2>
          <p>
            Đơn hàng của quý khách đã thanh toán thành công. MixiShop sẽ sớm
            liện hệ với quý khách sớm để bàn giao sản phẩm.
          </p>
          <Button
            type="primary"
            size="large"
            className="bg-black hover:!bg-black/80"
            onClick={() => {
              navigate(pathDefault.homePage);
            }}
          >
            Trở về trang chủ
          </Button>
        </div>
      </div>
    </>
  );
};

export default PaymentResult;
