import { Button, Modal, Popconfirm, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { productTypeService } from "../../../services/productType.service";
import { useNotificationContext } from "../../../store/Notification.Context";
import ModalAddProductType from "./components/ModalAddProductType";
import ModalUpdateProductType from "./components/ModalUpdateProductType";

const ManagerProductType = () => {
  const { token } = useSelector((state) => state.userSlice);
  const { handleNotification } = useNotificationContext();

  const [productTypeData, setProductTypeData] = useState([]);
  const [productType, setProductType] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const [isModalAddProductType, setIsModalAddProductType] = useState(false);
  const [isModalUpdateProductType, setIsModalUpdateProductType] =
    useState(false);

  const fetchProductType = (page, pageSize) => {
    // console.log({ page, pageSize });
    setIsLoading(true);
    productTypeService
      .getList(token, page, pageSize)
      .then((res) => {
        // console.log(res.data.metaData);
        const { page, pageSize, totalItem, items } = res.data.metaData;
        setProductTypeData(items);
        setPagination({
          pageSize,
          current: page,
          total: totalItem,
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    // console.log({ pagination });
    fetchProductType(pagination.current, pagination.pageSize);
  }, []);

  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (imageUrl) => {
        return <img src={imageUrl} className="w-10 h-10 rounded-full" />;
      },
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },

    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          {/* Nút Sửa */}
          <Button type="primary" onClick={() => handleEdit(record)}>
            Sửa
          </Button>

          {/* Nút Xóa có xác nhận */}
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa?"
            onConfirm={() => handleDelete(record.key)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button danger>Xóa</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleTableChange = (pagination) => {
    setPagination({
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
    fetchProductType(pagination.current, pagination.pageSize);
  };

  //  Hàm Sửa
  const handleEdit = (productType) => {
    console.log("Chỉnh sửa productType:", productType);
    setProductType(productType);
    setIsModalUpdateProductType(true);
  };

  //  Hàm Xóa
  const handleDelete = (productTypeId) => {
    console.log(productTypeId);
    productTypeService
      .delete(token, productTypeId)
      .then((res) => {
        console.log(res);
        handleNotification("success", "Xóa kiểu sản phẩm thành công");
        fetchProductType(pagination.current, pagination.pageSize);
      })
      .catch((err) => {
        console.log(err);
        handleNotification("error", "Có lỗi gì đó xảy ra");
        fetchProductType(pagination.current, pagination.pageSize);
      });
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button
          type="primary"
          onClick={() => {
            setIsModalAddProductType(true);
          }}
        >
          Thêm kiểu sản phẩm
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={productTypeData.map((item) => ({
          ...item,
          key: item.id,
        }))}
        loading={isLoading}
        pagination={pagination}
        onChange={handleTableChange}
      />
      <Modal
        title="Thêm kiểu sản phẩm"
        open={isModalAddProductType}
        onCancel={() => {
          setIsModalAddProductType(false);
        }}
        footer={null}
      >
        <ModalAddProductType
          setIsModalAddProductType={setIsModalAddProductType}
          fetchProductType={fetchProductType}
          pagination={pagination}
        />
      </Modal>
      <Modal
        title="Cập nhật kiểu sản phẩm"
        open={isModalUpdateProductType}
        onCancel={() => {
          setIsModalUpdateProductType(false);
        }}
        footer={null}
      >
        <ModalUpdateProductType
          productType={productType}
          fetchProductType={fetchProductType}
          pagination={pagination}
          setIsModalUpdateProductType={setIsModalUpdateProductType}
        />
      </Modal>
    </>
  );
};

export default ManagerProductType;
