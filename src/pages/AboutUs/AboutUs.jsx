import { Breadcrumb } from "antd";
import React from "react";
import BreadcrumbCustom from "../../components/Breadcrumb";
import { pathDefault } from "../../common/path";

const AboutUs = () => {
  return (
    <>
      <BreadcrumbCustom
        items={[
          {
            href: pathDefault.homePage,
            title: "Trang chủ",
          },
          {
            title: <h3 className="text-price">Giới thiệu</h3>,
          },
        ]}
      />
      <div className="container py-10 space-y-6">
        <h2 className="mb-10 text-3xl">Giới thiệu</h2>
        <p>
          Website chính thức và duy nhất của MixiShop. Hiện tại chúng mình chỉ
          nhận đơn hàng trên website chứ không nhận bất kỳ nơi nào khác nhé!
        </p>
        <p>
          Nếu có ưu đãi cũng sẽ được thông báo công khai trên các kênh CHÍNH
          THỨC VÀ DUY NHẤT sau đây:
        </p>
        <p>
          Website :{" "}
          <span className="text-price hover:underline">
            https://shop.mixigaming.com/
          </span>
        </p>
        <p>
          Fanpage :{" "}
          <span className="text-price hover:underline">
            https://www.facebook.com/MixiShop-182674912385853/
          </span>
        </p>
        <p>
          Instagram :{" "}
          <span className="text-price hover:underline">
            https://www.instagram.com/mixi.shop/
          </span>
        </p>
        <p>Email : Mixiishop@gmail.com</p>
        <p>MixiShop xin vui lòng được phục vụ quý khách!</p>
      </div>
    </>
  );
};

export default AboutUs;
