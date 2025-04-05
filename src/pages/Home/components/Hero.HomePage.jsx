import React from "react";
import { Link } from "react-router-dom";
import { pathDefault } from "../../../common/path";

const policies = [
  {
    image: "/policies_icon_1.png",
    title: "Vận chuyển toàn quốc",
    subTitle: "Vận chuyển nhanh chóng",
  },
  {
    image: "/policies_icon_2.png",
    title: "Ưu đãi hấp dẫn",
    subTitle: "Nhiều ưu đãi khuyến mãi hot",
  },
  {
    image: "/policies_icon_3.png",
    title: "Bảo đảm chất lượng",
    subTitle: "Sản phẩm đã được kiểm định",
  },
  {
    image: "/policies_icon_4.png",
    title: "Hotline: 0822221992",
    subTitle: "Vui lòng gọi hotline để hỗ trợ",
  },
];

const HeroHomePage = () => {
  return (
    <div className="space-y-10">
      <Link to={pathDefault.homePage}>
        <img src="/slider_1.png" className="w-full" alt="" />
      </Link>
      <div className="grid grid-cols-4">
        {policies.map((item, index) => {
          return (
            <div className="flex items-center gap-4" key={index}>
              <div>
                <img src={item.image} className="w-10 h-10" alt="" />
              </div>
              <div className="flex-1 flex flex-col">
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-gray-500">{item.subTitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HeroHomePage;
