import React from "react";
import { FaInstagram } from "react-icons/fa";

const data = [
  {
    image: `insta_1_img.jpg`,
  },
  {
    image: `insta_2_img.jpg`,
  },
  {
    image: `insta_3_img.jpg`,
  },
  {
    image: `insta_4_img.jpg`,
  },
  {
    image: `insta_5_img.jpg`,
  },
];

const InstagramHomePage = () => {
  return (
    <div className="text-center">
      <h3 className="text-3xl mb-10">@Follow Instagram</h3>
      <div className="grid grid-cols-5 gap-6">
        {data.map((item, index) => {
          return (
            <a
              href="https://www.instagram.com/p/CMM6ikxDM-r/"
              target="_blank"
              key={index}
              className="group relative"
            >
              <img
                src={item.image}
                alt=""
                className="w-full object-cover group-hover:scale-95 transition-all duration-300 rounded-md"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 group-hover:-translate-y-1/2 w-14 h-14 flex justify-center items-center rounded-full bg-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                <FaInstagram size={20} />
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default InstagramHomePage;
