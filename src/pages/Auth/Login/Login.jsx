import { Breadcrumb, Button, Input } from "antd";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { pathDefault } from "../../../common/path";
import { authService } from "../../../services/auth.service";
import { useNotificationContext } from "../../../store/Notification.Context";
import {
  handleUpdateToken,
  handleUpdateUser,
} from "../../../store/slice/user.slice";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [msgErr, setMsgErr] = useState("");

  const navigate = useNavigate();

  const { handleNotification } = useNotificationContext();

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      authService
        .login(values)
        .then((res) => {
          console.log(res.data.metaData);
          setMsgErr("");
          dispatch(handleUpdateUser(res.data.metaData.user));
          dispatch(handleUpdateToken(res.data.metaData.access_token));
          handleNotification("success", "Đăng nhập thành công", 3000);
          setTimeout(() => {
            navigate(pathDefault.homePage);
          }, 3000);
        })
        .catch((err) => {
          console.log(err);
          setMsgErr("Thông tin đăng nhập không hợp lệ.");
        });
    },
  });

  return (
    <>
      <div className="bg-gray-200">
        <div className="container py-2">
          <Breadcrumb
            items={[
              { href: pathDefault.homePage, title: "Trang chủ" },
              { href: pathDefault.login, title: "Tài khoản" },
              { title: <h3 className="text-price">Đăng nhập</h3> },
            ]}
          />
        </div>
      </div>

      <div className="container py-10 flex flex-col justify-center items-center">
        <div className="w-1/2 flex flex-col items-center gap-4">
          <h3 className="uppercase text-xl">Đăng nhập tài khoản</h3>
          <h4>
            Bạn chưa có tài khoản?{" "}
            <Link to={pathDefault.register} className="text-price underline">
              Đăng ký tại đây.
            </Link>
          </h4>
          {msgErr ? (
            <h4 className="self-start text-red-500">{msgErr}</h4>
          ) : null}

          <form
            onSubmit={formik.handleSubmit}
            className="w-full flex flex-col gap-4"
          >
            <label>
              Email <span className="text-red-500">*</span>
            </label>
            <Input
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}

            <label>
              Mật khẩu <span className="text-red-500">*</span>
            </label>
            <Input.Password
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            )}

            <Button
              type="default"
              htmlType="submit"
              className="w-full bg-black text-white py-5 hover:!bg-black/90 outline-none hover:!text-white mt-3"
            >
              <span className="text-lg">Đăng nhập</span>
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
