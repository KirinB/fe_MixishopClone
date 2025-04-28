import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { InputCustom } from "../../../../components/InputCustom";
import { Button, Select } from "antd";
import { orderService } from "../../../../services/order.service";
import { useNotificationContext } from "../../../../store/Notification.Context";

const { Option } = Select;

const ModalUpdateOrder = ({
  order,
  fetchOrderData,
  pagination,
  setIsModalUpdateOrder,
}) => {
  const { token } = useSelector((state) => state.userSlice);
  const { handleNotification } = useNotificationContext();

  const validationSchema = yup.object({
    email: yup.string().email("Email không hợp lệ").required("Bắt buộc"),
    total_price: yup
      .number()
      .min(0, "Phải lớn hơn hoặc bằng 0")
      .required("Bắt buộc"),
    status: yup
      .string()
      .oneOf(
        ["Pending", "Processing", "Completed", "Cancelled"],
        "Trạng thái không hợp lệ"
      )
      .required("Bắt buộc"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: order.user?.email || "",
      total_price: order.total_price || 0,
      status: order.status || "Pending",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const res = await orderService.update(token, order.id, {
          email: values.email,
          total_price: +values.total_price,
          status: values.status,
        });
        fetchOrderData(pagination.current, pagination.pageSize);
        handleNotification("success", "Cập nhật đơn hàng thành công");
        setIsModalUpdateOrder(false);
      } catch (error) {
        console.log(error);
        handleNotification("error", error.response.data.message);
      }
    },
  });

  return (
    <form className="flex flex-col gap-6 mt-10" onSubmit={formik.handleSubmit}>
      <div>
        <InputCustom
          label="Email người đặt"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.email}
          touched={formik.touched.email}
        />
      </div>
      <div>
        <InputCustom
          label="Tổng giá trị đơn"
          name="total_price"
          type="number"
          value={formik.values.total_price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.total_price}
          touched={formik.touched.total_price}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Trạng thái</label>
        <Select
          value={formik.values.status}
          onChange={(value) => formik.setFieldValue("status", value)}
          onBlur={formik.handleBlur}
          style={{ width: "100%" }}
        >
          <Option value="Pending">Pending</Option>
          <Option value="Processing">Processing</Option>
          <Option value="Completed">Completed</Option>
          <Option value="Cancelled">Cancelled</Option>
        </Select>
        {formik.touched.status && formik.errors.status && (
          <div className="text-red-500 text-sm mt-1">
            {formik.errors.status}
          </div>
        )}
      </div>

      <Button type="primary" htmlType="submit">
        Cập nhật đơn hàng
      </Button>
    </form>
  );
};

export default ModalUpdateOrder;
