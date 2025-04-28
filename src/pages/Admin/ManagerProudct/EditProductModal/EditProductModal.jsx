import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNotificationContext } from "../../../../store/Notification.Context";
import { useFormik } from "formik";
import { InputCustom } from "../../../../components/InputCustom";
import TextArea from "antd/es/input/TextArea";
import { Button, Select, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import * as yup from "yup";
import { productTypeService } from "../../../../services/productType.service";
import {
  productQueries,
  productService,
} from "../../../../services/product.service";
import useMutate from "../../../../hooks/api/useMutate";
import queryClient from "../../../../hooks/api/queryConfig";

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

const EditProductModal = ({ product, onCloseModal }) => {
  // console.log({ pagination });
  const { token } = useSelector((state) => state.userSlice);

  const { handleNotification } = useNotificationContext();

  const [categories, setCategories] = useState([]);

  const [fileList, setFileList] = useState(
    product.image
      ? [
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: product.main_image,
          },
        ]
      : []
  );

  useEffect(() => {
    productTypeService
      .getList(token)
      .then((res) => {
        console.log(res.data.metaData.items);
        setCategories(res.data.metaData.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setFileList(
      product.image
        ? [
            {
              uid: "-1",
              name: "image.png",
              status: "done",
              url: product.main_image,
            },
          ]
        : []
    );
  }, [product]);

  const { mutate: updateProduct } = useMutate({
    mutationFunction: productQueries.updateProduct.queryFunction,
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: product.name,
      price: product.price,
      description: product.description,
      stock_quantity: product.stock_quantity,
      sku: product.sku,
      product_type_id: product.product_type_id,
      image: product.image,
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("description", values.description);
      formData.append("stock_quantity", values.stock_quantity);
      formData.append("sku", values.sku);
      formData.append("product_type_id", values.product_type_id);

      if (values.image instanceof File) {
        formData.append("image", values.image);
      }

      updateProduct(
        { id: product.id, data: formData, token },
        {
          onSuccess: () => {
            handleNotification("success", "Cập nhật đơn hàng thành công");
            queryClient.invalidateQueries([`getProducts`]);
            onCloseModal();
          },
          onError: () => {
            handleNotification("error", "Cập nhật đơn hàng thất bại");
          },
        }
      );

      //   try {
      //     const formData = new FormData();
      //     formData.append("name", values.name);
      //     formData.append("price", values.price);
      //     formData.append("description", values.description);
      //     formData.append("stock_quantity", values.stock_quantity);
      //     formData.append("sku", values.sku);
      //     formData.append("product_type_id", values.product_type_id);

      //     if (values.image instanceof File) {
      //       formData.append("image", values.image);
      //     }

      //     const res = await productService.updateById(
      //       product.id,
      //       formData,
      //       token
      //     );

      //     handleNotification("success", "Cập nhật sản phẩm thành công");
      //     fetchData(pagination.current, pagination.pageSize);
      //     onCloseModal();
      //   } catch (error) {
      //     console.log("Lỗi cập nhật sản phẩm:", error);
      //     handleNotification("error", "Cập nhật sản phẩm thất bại");
      //   }
    },
  });

  return (
    <div>
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

        <div className="grid grid-cols-2 gap-10">
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
            listType="picture-card"
            fileList={fileList}
            maxCount={1}
            accept="image/*"
            beforeUpload={() => false} // Ngăn mặc định upload
            onChange={({ file, fileList: newFileList }) => {
              setFileList(newFileList);

              if (newFileList.length > 0) {
                const currentFile = newFileList[0];
                // Nếu là file mới upload
                if (currentFile.originFileObj) {
                  formik.setFieldValue("image", currentFile.originFileObj);
                }
              } else {
                // Nếu xóa hết ảnh
                formik.setFieldValue("image", null);
              }
            }}
            onPreview={(file) => {
              window.open(file.url || URL.createObjectURL(file.originFileObj));
            }}
          >
            {fileList.length >= 1 ? null : (
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
          Cập nhật
        </Button>
      </form>
    </div>
  );
};

export default EditProductModal;
