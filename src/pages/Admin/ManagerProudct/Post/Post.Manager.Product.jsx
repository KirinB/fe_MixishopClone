import React, { useEffect, useState } from "react";
import { InputCustom } from "../../../../components/InputCustom";
import TextArea from "antd/es/input/TextArea";
import { Button, Select, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { productTypeService } from "../../../../services/productType.service";
import { useSelector } from "react-redux";
import { useNotificationContext } from "../../../../store/Notification.Context";
import { productService } from "../../../../services/product.service";

const validationSchema = yup.object().shape({
  name: yup.string().required("Tên sản phẩm không được để trống"),
  price: yup
    .number()
    .typeError("Giá phải là số")
    .required("Giá sản phẩm không được để trống"),
  stock_quantity: yup.number().required("Số lượng không được để trống"),
  sku: yup.string().required("SKU không được để trống"),
  product_type_id: yup
    .number()
    .typeError("Danh mục phải là số")
    .required("Danh mục không được để trống"),
});

const PostManagerProduct = () => {
  const { handleNotification } = useNotificationContext();
  const { token } = useSelector((state) => state.userSlice);
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    productTypeService
      .getList(token)
      .then((res) => {
        // console.log(res.data.metaData.items);
        setCategories(res.data.metaData.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Xử lý upload file
  const handleCustomUpload = async ({ file, onSuccess }) => {
    ///
  };
  // Formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      price: "",
      description: "",
      stock_quantity: "",
      sku: "",
      product_type_id: null,
      image: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (!values.image) {
        handleNotification("error", "Vui lòng chọn hình ảnh");
        return;
      }
      console.log(values);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("description", values.description);
      formData.append("stock_quantity", values.stock_quantity);
      formData.append("sku", values.sku);
      formData.append("product_type_id", values.product_type_id);
      formData.append("image", values.image);

      productService
        .create(formData, token)
        .then((res) => {
          console.log(res);
          handleNotification("success", "Thêm mới sản phẩm thành công");
          resetForm();
          setFile(null); // Xóa ảnh khỏi state
          formik.setFieldValue("image", null); // Xóa file trong Formik
        })
        .catch((err) => {
          handleNotification("error", err.response.data.message);
          console.log(err);
        });
    },
  });

  return (
    <div>
      <h2 className="text-xl">Thêm mới sản phẩm</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <InputCustom
          label="Tên sản phẩm:"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.errors.name}
          onBlur={formik.handleBlur}
          touched={formik.touched.name}
        />

        <div>
          <label className="block">Giới thiệu sản phẩm</label>
          <TextArea
            style={{ height: 100, resize: "none" }}
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
          />
        </div>

        <div className="grid grid-cols-4 gap-10">
          <div>
            <InputCustom
              type="number"
              label="Giá sản phẩm:"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              error={formik.errors.price}
              onBlur={formik.handleBlur}
              touched={formik.touched.price}
            />
          </div>
          <div>
            <InputCustom
              label="Sku:"
              name="sku"
              value={formik.values.sku}
              onChange={formik.handleChange}
              error={formik.errors.sku}
              touched={formik.touched.sku}
              onBlur={formik.handleBlur}
            />
          </div>

          <div>
            <InputCustom
              label="Số lượng sản phẩm:"
              name="stock_quantity"
              value={formik.values.stock_quantity}
              onChange={formik.handleChange}
              error={formik.errors.stock_quantity}
              onBlur={formik.handleBlur}
              touched={formik.touched.stock_quantity}
            />
          </div>

          <div>
            <label htmlFor="">Danh mục:</label>
            <Select
              value={formik.values.product_type_id}
              style={{ width: 200 }}
              onChange={(val) => formik.setFieldValue("product_type_id", val)}
              options={categories.map((category) => ({
                value: category.id,
                label: category.name,
              }))}
              className="!w-full"
            />
            {formik.touched.product_type_id &&
              formik.errors.product_type_id && (
                <p className="text-red-500 text-sm">
                  {formik.errors.product_type_id}
                </p>
              )}
          </div>
        </div>

        <div className="w-full">
          <label className="block">Hình ảnh</label>
          <Upload
            customRequest={handleCustomUpload}
            listType="picture-card"
            maxCount={1}
            accept="image/*"
            beforeUpload={() => false} // Ngừng upload mặc định
            onChange={(info) => {
              console.log("File Info:", info);
              if (info.fileList.length > 0) {
                // Nếu có file, gọi setFieldValue
                formik.setFieldValue("image", info.fileList[0].originFileObj);
              }
            }} // Kiểm tra info của file
          >
            {file ? null : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
          {formik.touched.image && formik.errors.image && (
            <p className="text-red-500 text-sm">{formik.errors.image}</p>
          )}
        </div>

        <Button type="primary" htmlType="submit">
          Tạo sản phẩm
        </Button>
      </form>
    </div>
  );
};

export default PostManagerProduct;
