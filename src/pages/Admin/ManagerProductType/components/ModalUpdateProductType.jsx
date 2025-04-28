import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { useNotificationContext } from "../../../../store/Notification.Context";
import { useFormik } from "formik";
import { InputCustom } from "../../../../components/InputCustom";
import { Button, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { productTypeService } from "../../../../services/productType.service";

const ModalUpdateProductType = ({
  productType,
  fetchProductType,
  pagination,
  setIsModalUpdateProductType,
}) => {
  const { token } = useSelector((state) => state.userSlice);
  const { handleNotification } = useNotificationContext();

  const [fileList, setFileList] = useState(
    productType.image
      ? [
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: productType.image,
          },
        ]
      : []
  );

  useEffect(() => {
    setFileList(
      productType.image
        ? [
            {
              uid: "-1",
              name: "image.png",
              status: "done",
              url: productType.image,
            },
          ]
        : []
    );
  }, [productType]);

  const validationSchema = yup.object({
    name: yup.string().required("Vui lòng không bỏ trống"),
    image: yup
      .mixed()
      .test("image-validation", "Vui lòng chọn 1 hình ảnh", function (value) {
        const hasOldImage = !!productType.image;

        // Nếu đã có ảnh cũ thì không bắt buộc chọn lại
        if (hasOldImage) return true;

        // Nếu chưa có ảnh cũ thì phải chọn đúng 1 ảnh
        return value && value.length === 1;
      }),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: productType.name || "",
      image: [],
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);

      // Chỉ gửi hình nếu là File mới upload
      if (values.image && values.image[0] instanceof File) {
        formData.append("image", values.image[0]);
      }

      console.log(formData);

      productTypeService
        .update(token, productType.id, formData)
        .then((res) => {
          console.log(res);
          fetchProductType(pagination.current, pagination.pageSize);
          handleNotification("success", "Cập nhật thành công");
          setIsModalUpdateProductType(false);
        })
        .catch((err) => {
          console.log(err);
          handleNotification("error", "Có gì đó không đúng");
        });
    },
  });

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    formik.setFieldValue(
      "image",
      newFileList.map((f) => f.originFileObj || null).filter(Boolean)
    );
  };

  return (
    <div className="mt-10">
      <form
        className="flex flex-col gap-6"
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
      >
        <div>
          <InputCustom
            error={formik.errors.name}
            name="name"
            label="Tên kiểu sản phẩm"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            touched={formik.touched.name}
            value={formik.values.name}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Hình ảnh</label>
          <Upload
            listType="picture-card"
            fileList={fileList}
            beforeUpload={() => false} // Ngăn không upload tự động
            onChange={handleUploadChange}
            maxCount={1}
          >
            {fileList.length >= 1 ? null : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Tải lên</div>
              </div>
            )}
          </Upload>
          {formik.touched.image && formik.errors.image && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.image}
            </div>
          )}
        </div>

        <Button type="primary" htmlType="submit">
          Cập nhật kiểu sản phẩm
        </Button>
      </form>
    </div>
  );
};

export default ModalUpdateProductType;
