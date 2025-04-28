import React from "react";
import { FaStar } from "react-icons/fa";
import LineSpace from "../../../components/LineSpace";
import { Link } from "react-router-dom";

const data = [
  {
    nameAuthor: "Trần Linh",
    star: 5,
    text: "Sản phẩm chất lượng, chất vải mềm mát mặc vào rất thoải mái và dễ hoạt động, giá cả hợp lý, giao hàng nhanh",
    avatar: "/cus_review_avatar_1_compact.jpg",
    product: {
      link: `/product/18`,
      name: "Áo phông Mixi – Trắng",
      image: `https://res.cloudinary.com/dfq7olhxn/image/upload/v1743581688/images/y9gnx3wmdppqklkt8pk2.jpg`,
    },
  },
  {
    nameAuthor: "Trần Linh",
    star: 5,
    text: "Sản phẩm đẹp, chất liệu tốt, mặc đúng size chuẩn, nhân viên phục vụ rất tận tình và chu đáo. 10 điểm!",
    avatar: "/cus_review_avatar_2_compact.jpg",
    product: {
      link: `/product/12`,
      name: "Bộ Ghép Hình Mixi – Mixi Block SS9",
      image: `https://res.cloudinary.com/dfq7olhxn/image/upload/v1743581253/images/zfzvy8n8qx99eslyhj9k.webp`,
    },
  },
  {
    nameAuthor: "Trần Linh",
    star: 5,
    text: "Giao hàng nhanh, anh shipper thân thiện. Sản phẩm đẹp, đã mua nhiều lần và sẽ tiếp tục ủng hộ shop",
    avatar: "/cus_review_avatar_3_compact.jpg",
    product: {
      link: `/product/17`,
      name: "Áo khoác nỉ",
      image: `https://res.cloudinary.com/dfq7olhxn/image/upload/v1743581622/images/lw5tyzcyyvzqsunyrzpl.webp`,
    },
  },
];

const CustomerTestimonialsHomePage = () => {
  return (
    <div className="my-10 bg-gray-100 py-20">
      <div className="container flex flex-col items-center">
        <h2 className="text-3xl mb-10">Khách hàng đã nói gì</h2>
        <div className="grid grid-cols-3 gap-10">
          {data.map((item, index) => {
            return (
              <div
                key={index}
                className="p-6 bg-white rounded-lg flex flex-col justify-between"
              >
                <div className="flex gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg">{item.nameAuthor}</h3>
                    <div className="flex gap-1">
                      {Array(item.star)
                        .fill(0)
                        .map((_, index) => (
                          <p key={index} className="text-yellow-500">
                            <FaStar />
                          </p>
                        ))}
                    </div>
                    <p>{item.text}</p>
                  </div>
                  <div className="w-[100px] h-[100px]">
                    <img
                      src={item.avatar}
                      className="w-full h-full rounded-md object-cover"
                      alt=""
                    />
                  </div>
                </div>
                <LineSpace className={"my-4"} />
                <Link
                  to={item.product.link}
                  className="flex gap-6 items-center group"
                >
                  <div>
                    <img
                      src={item.product.image}
                      className="w-[50px] h-[75px] rounded-md"
                      alt=""
                    />
                  </div>
                  <div className="flex-1">
                    <p className="group-hover:text-price transition-all duration-300">
                      {item.product.name}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CustomerTestimonialsHomePage;
