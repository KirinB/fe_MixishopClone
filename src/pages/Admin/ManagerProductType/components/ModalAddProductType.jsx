import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { useNotificationContext } from "../../../../store/Notification.Context";
import { useFormik } from "formik";
import { InputCustom } from "../../../../components/InputCustom";
import { Button, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { productTypeService } from "../../../../services/productType.service";

const ModalAddProductType = () => {
  const { token } = useSelector((state) => state.userSlice);
  const { handleNotification } = useNotificationContext();

  const [fileList, setFileList] = useState([]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      image: null, // thêm trường hình ảnh
    },
    validationSchema: yup.object({
      name: yup.string().required("Vui lòng không bỏ trống"),
      image: yup
        .mixed()
        .required("Vui lòng chọn 1 hình ảnh")
        .test(
          "fileCount",
          "Chỉ được chọn 1 hình",
          (value) => value && value.length === 1
        ),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("image", values.image[0]);

      console.log("formData submit:", values);

      productTypeService
        .add(token, formData)
        .then((res) => {
          console.log(res);
          handleNotification("success", "Tạo mới kiểu sản phẩm thành công");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    formik.setFieldValue(
      "image",
      newFileList.map((f) => f.originFileObj)
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
          Thêm kiểu sản phẩm
        </Button>
      </form>
    </div>
  );
};

export default ModalAddProductType;
