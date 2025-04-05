import { Breadcrumb, Button, Input } from "antd";
import { useFormik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { pathDefault } from "../../../common/path";
import { authService } from "../../../services/auth.service";
import { useNotificationContext } from "../../../store/Notification.Context";

const Register = () => {
  const navigate = useNavigate();

  const { handleNotification } = useNotificationContext();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Vui lòng nhập đúng định dạng email")
        .required("Vui lòng không bỏ trống email"),
      password: Yup.string()
        .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
        .required("Vui lòng không bỏ trống mật khẩu"),
      name: Yup.string()
        .min(2, "Tên phải có ít nhất 2 ký tự")
        .required("Vui lòng không bỏ trống tên"),
    }),
    onSubmit: async (values) => {
      //   console.log(values);
      authService
        .register(values)
        .then((res) => {
          console.log(res);
          handleNotification("success", "Đăng ký thành công");
          navigate(pathDefault.login);
        })
        .catch((err) => {
          console.log(err);
          handleNotification("error", err.response.data.message);
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
              { title: <h3 className="text-price">Đăng ký</h3> },
            ]}
          />
        </div>
      </div>

      <div className="container py-10 flex flex-col justify-center items-center">
        <div className="w-1/2 flex flex-col items-center gap-4">
          <h3 className="uppercase text-xl">Đăng ký tài khoản</h3>
          <h4>
            Bạn đã có tài khoản?{" "}
            <Link to={pathDefault.login} className="text-price underline">
              Đăng nhập tại đây.
            </Link>
          </h4>

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
              Tên <span className="text-red-500">*</span>
            </label>
            <Input
              name="name"
              type="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm">{formik.errors.name}</p>
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
              <span className="text-lg">Đăng ký</span>
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
