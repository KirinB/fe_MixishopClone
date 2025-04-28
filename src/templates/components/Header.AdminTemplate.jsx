import { Avatar, Popover } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { pathDefault } from "../../common/path";
import { handleDeleteUser } from "../../store/slice/user.slice";

const HeaderAdminTemplate = () => {
  const { user } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="bg-[#001529] text-white px-6 py-2 sticky top-0 z-50 flex justify-between items-center">
      <Link to={pathDefault.homePage}>
        {" "}
        <img src="/logo.png" className="w-20" />
      </Link>
      {user ? (
        <Popover
          content={
            <div
              className="flex flex-col gap-4 p-2
                "
            >
              <Link to={pathDefault.account}>Tài khoản</Link>
              <div
                className="cursor-pointer hover:text-price"
                onClick={() => {
                  localStorage.removeItem("userInfo");
                  localStorage.removeItem("token");
                  dispatch(handleDeleteUser());
                  navigate(pathDefault.homePage);
                }}
              >
                Đăng xuất
              </div>
            </div>
          }
          trigger={"click"}
          className="cursor-pointer"
        >
          <Avatar
            style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
            className="!border border-gray-300 uppercase"
          >
            {user.name.split(" ").pop().charAt(0)}
          </Avatar>
        </Popover>
      ) : (
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
      )}
    </div>
  );
};

export default HeaderAdminTemplate;
