import React from "react";

const FooterHomeTemplate = () => {
  return (
    <footer className="bg-[#14B8B9] text-white text-[15px]  py-20">
      <div className="container grid lg:grid-cols-4 grid-cols-1 md:grid-cols-2 mb-10 font-semibold">
        <ul className="flex flex-col gap-4">
          <li>Địa chỉ: Yên Lãng, Hà Nội</li>
          <li>Số điện thoại: 0822221992</li>
          <li>Email: Mixiishop@gmail.com</li>
        </ul>
        <ul className="flex flex-col gap-4">
          <li className="text-lg uppercase mb-2">Chính sách</li>
          <li>Trang chủ</li>
          <li>Giới thiệu</li>
          <li>Sản phẩm</li>
          <li>Blog</li>
          <li>Liên hệ</li>
          <li>Kiểm tra đơn hàng</li>
        </ul>
        <ul className="flex flex-col gap-4">
          <li className="text-lg uppercase mb-2">Hỗ trợ khách hàng</li>
          <li>Tìm kiếm</li>
          <li>Chính sách bảo mật</li>
          <li>Điều khoản dịch vụ</li>
          <li>Hướng dẫn kiểm tra đơn hàng</li>
        </ul>
        <div>
          <p className="text-lg uppercase">Đăng ký nhận tin</p>
        </div>
      </div>
      <div className="flex justify-center items-center gap-10">
        <img src="/logo_bct.png" alt="" />
        <img src="/footer_trustbadge.png" alt="" />
      </div>
    </footer>
  );
};

export default FooterHomeTemplate;
