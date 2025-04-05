import { Avatar, Popover } from "antd";
import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineShoppingBag } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { pathDefault } from "../../common/path";
import { handleDeleteUser } from "../../store/slice/user.slice";

const HeaderHomeTemplte = () => {
  const { user } = useSelector((state) => state.userSlice);
  const { data } = useSelector((state) => state.categoriesSlice);
  // console.log(data);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const dropdownItems = data.map((item) => {
    return {
      title: item.name,
      link: `/categories/${item.id}`,
    };
  });

  // console.log(dropdownItems);
  const headerList = [
    {
      title: "Trang chủ",
      link: pathDefault.homePage,
    },
    {
      title: "Giới thiệu",
      link: pathDefault.aboutUs,
    },
    {
      title: "Sản phẩm",
      img: "/menu_icon_3.png",
      link: "/categories/all",
      hasDropdown: true, // Đánh dấu mục có dropdown
      dropdownItems: dropdownItems,
    },
    {
      title: "Liên hệ",
      link: pathDefault.contact,
    },
  ];

  // console.log(user);
  return (
    <header className="sticky top-0 w-full bg-white border-b z-50">
      <div className="container flex justify-between items-center py-4">
        <Link to={pathDefault.homePage} className="max-w-[134px]">
          <img src="/logo.png" className="w-full h-auto object-cover" alt="" />
        </Link>
        <ul className="flex gap-4 items-center justify-center flex-1">
          {headerList.map((item, index) => {
            return (
              <li
                key={index}
                onMouseEnter={() => item.hasDropdown && setIsOpen(true)}
                onMouseLeave={() => item.hasDropdown && setIsOpen(false)}
                className="before:h-[2px] before:bg-black before:block before:-bottom-2 before:absolute relative before:w-0 hover:before:w-full before:transition-all  before:duration-500"
              >
                <Link
                  to={item.link}
                  className="flex items-center justify-center gap-2"
                >
                  {item.img ? <img src={item.img} className="w-4" /> : null}
                  <p className="">{item.title}</p>
                </Link>
                {item.hasDropdown && isOpen && (
                  <ul className="absolute left-0 top-full mt-2 bg-white shadow-lg border rounded-md w-48">
                    {item.dropdownItems.map((dropdownItem, idx) => (
                      <li key={idx} className="hover:bg-gray-100">
                        <Link
                          to={dropdownItem.link}
                          className="block px-4 py-2 text-black"
                        >
                          {dropdownItem.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
        {user ? (
          <Popover
            content={
              <div
                className="flex flex-col gap-4 p-2
              "
              >
                <div
                  className="cursor-pointer hover:text-price"
                  onClick={() => {
                    dispatch(handleDeleteUser());
                  }}
                >
                  Đăng xuất
                </div>
                {user.role === "Admin" ? (
                  <Link
                    to={pathDefault.admin}
                    className="cursor-pointer hover:text-price"
                  >
                    Admin DashBoard
                  </Link>
                ) : null}
              </div>
            }
            trigger={"click"}
            className="cursor-pointer"
          >
            <Avatar
              style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
              className="!border border-gray-300"
            >
              {user.name.split(" ").pop().charAt(0)}
            </Avatar>
          </Popover>
        ) : (
          <div className="flex gap-4">
            <IoSearchOutline size={20} />
            <Popover
              className="cursor-pointer"
              trigger={"click"}
              content={
                <ul className="flex flex-col gap-4 p-2">
                  <li>
                    <Link to={pathDefault.login}>Đăng nhập</Link>
                  </li>
                  <li>
                    <Link to={pathDefault.register}>Đăng ký</Link>
                  </li>
                </ul>
              }
            >
              <FaRegUser size={20} />
            </Popover>
            <IoMdHeartEmpty size={20} />
            <MdOutlineShoppingBag size={20} />
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderHomeTemplte;
