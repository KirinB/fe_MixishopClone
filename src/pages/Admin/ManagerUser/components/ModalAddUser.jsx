import { Button, Select } from "antd";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {
  InputCustom,
  InputPasswordCustom,
} from "../../../../components/InputCustom";
import * as yup from "yup";
import { userQueries, userService } from "../../../../services/user.service";
import { useSelector } from "react-redux";
import { useNotificationContext } from "../../../../store/Notification.Context";
import useMutate from "../../../../hooks/api/useMutate";
import queryClient from "../../../../hooks/api/queryConfig";
const ModalAddUser = ({ setIsModalAddUser }) => {
  const { handleNotification } = useNotificationContext();
  const { token } = useSelector((state) => state.userSlice);

  const { mutate: createUser } = useMutate({
    mutationFunction: userQueries.createUser.queryFunction,
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      password: "",
      email: "",
      phone: "",
      gender: "",
      role: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Vui lòng không bỏ trống"),
      email: yup
        .string()
        .required("Vui lòng không bỏ trống")
        .email("Vui lòng nhập đúng định dạng email"),
      phone: yup
        .string()
        .required("Vui lòng không bỏ trống")
        .matches(
          /^(?:\+84|0)(3[2-9]|5[2689]|7[0-9]|8[1-9]|9[0-9])\d{7}$/,
          "Số điện thoại không đúng định dạng Việt Nam"
        ),
      gender: yup.string().required("Vui lòng chọn giới tính"),
      role: yup.string().required("Vui lòng chọn vai trò"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      createUser(
        { data: values, token },
        {
          onSuccess: () => {
            handleNotification("success", "Tạo mới người dùng thành công");
            queryClient.invalidateQueries(["getUsers"]);
            setIsModalAddUser(false);
          },
          onError: () => {
            handleNotification("error", "Tạo mới người dùng thất bại");
            setIsModalAddUser(false);
          },
        }
      );
      // userService
      //   .addNewUser(values, token)
      //   .then((res) => {
      //     console.log(res);
      //     handleNotification("success", "Tạo mới người dùng thành công");
      //     setReRender(true);
      //     setIsModalAddUser(false);
      //   })
      //   .catch((err) => {
      //     handleNotification("error", err.response.data.message);
      //     setIsModalAddUser(false);
      //   });
    },
  });
  return (
    <div className="mt-10">
      <form
        action=""
        className="flex-col flex gap-6"
        onSubmit={formik.handleSubmit}
      >
        <div>
          <InputCustom
            error={formik.errors.email}
            name={"email"}
            label={"Email:"}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            touched={formik.touched.email}
            value={formik.values.email}
          />
        </div>
        <div>
          <InputPasswordCustom
            error={formik.errors.password}
            name={"password"}
            label={"Mật khẩu:"}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            touched={formik.touched.password}
            value={formik.values.password}
          />
        </div>
        <div>
          <InputCustom
            error={formik.errors.name}
            name={"name"}
            label={"Name:"}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            touched={formik.touched.name}
            value={formik.values.name}
          />
        </div>
        <div>
          <InputCustom
            error={formik.errors.phone}
            name={"phone"}
            label={"phone:"}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            touched={formik.touched.phone}
            value={formik.values.phone}
          />
        </div>
        <div className="flex items-center gap-6">
          <div className="flex flex-col w-1/2">
            <label htmlFor="">Gender:</label>

            <Select
              value={formik.values.gender}
              style={{ width: 120 }}
              onChange={(val) => formik.setFieldValue("gender", val)}
              options={[
                { value: "Nam", label: "Nam" },
                { value: "Nữ", label: "Nữ" },
              ]}
              className="!w-full"
            />
            {formik.touched.gender && formik.errors.gender && (
              <p className="text-red-500 text-sm">{formik.errors.gender}</p>
            )}
          </div>

          <div className="flex flex-col w-1/2">
            <label htmlFor="">Role:</label>
            <Select
              value={formik.values.role}
              style={{ width: 120 }}
              onChange={(val) => formik.setFieldValue("role", val)}
              options={[
                { value: "Admin", label: "Admin" },
                { value: "Guest", label: "Guest" },
              ]}
              className="!w-full"
            />
            {formik.touched.role && formik.errors.role && (
              <p className="text-red-500 text-sm">{formik.errors.role}</p>
            )}
          </div>
        </div>
        <Button type="primary" htmlType="submit">
          Thêm
        </Button>
      </form>
    </div>
  );
};

export default ModalAddUser;
