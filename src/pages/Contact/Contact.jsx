import React from "react";
import BreadcrumbCustom from "../../components/Breadcrumb";
import { pathDefault } from "../../common/path";
import LineSpace from "../../components/LineSpace";
import { InputCustom } from "../../components/InputCustom";
import TextArea from "antd/es/input/TextArea";
import { Button } from "antd";

const Contact = () => {
  return (
    <div>
      <BreadcrumbCustom
        items={[
          {
            title: `Trang chủ`,
            href: pathDefault.homePage,
          },
          {
            title: `Liên hệ`,
          },
        ]}
      />
      <div className="container grid grid-cols-2 py-10 gap-10">
        <div>
          <h3 className="text-3xl mb-10">MixiShop Liên Hệ</h3>
          <ul className="flex flex-col gap-4 text-sm">
            <li>Địa chỉ: Yên Lãng, Hà Nội</li>
            <li>Số điện thoại: 0822221992</li>
            <li>Email: Mixiishop@gmail.com</li>
          </ul>
          <LineSpace className={"my-2"} />
          <h3 className="text-xl uppercase">Liên hệ với chúng tôi</h3>
          <form className="space-y-6">
            <InputCustom placeholder={"Họ tên *"} />
            <InputCustom placeholder={"Email *"} />
            <InputCustom placeholder={"Số điện thoại *"} />
            <TextArea placeholder="Nhập nội dung" style={{ height: 200 }} />
            <Button
              type="primary"
              className="w-full !bg-black hover:!bg-black/90 hover:!text-white py-6"
            >
              Gửi liên hệ của bạn
            </Button>
          </form>
        </div>
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d800.7773972677197!2d105.81535053791869!3d21.01071608983512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab62a5618c2d%3A0xb861a5fd512bbdb!2zUC5Zw6puIEzDo25nLCDEkOG7kW5nIMSQYSwgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1743589653596!5m2!1svi!2s"
            height={450}
            style={{ border: 0 }}
            className="w-full h-full"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
