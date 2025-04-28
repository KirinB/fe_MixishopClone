import { Button, Modal, Popconfirm, Table } from "antd";
import React, { useEffect, useState } from "react";
import { productService } from "../../../services/product.service";
import { formatCurrencyVND } from "../../../utils/utils";
import { useSelector } from "react-redux";
import { useNotificationContext } from "../../../store/Notification.Context";
import EditProductModal from "./EditProductModal/EditProductModal";
import { useNavigate } from "react-router-dom";
import { pathDefault } from "../../../common/path";

const ManagerProduct = () => {
  const { token } = useSelector((state) => state.userSlice);

  const { handleNotification } = useNotificationContext();

  const navigate = useNavigate();

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });
  const [loading, setLoading] = useState(false);
  const [listProduct, setListProduct] = useState([]);
  const [product, setProduct] = useState({});

  const [isModalEditOpen, setIsModalEditOpen] = useState(false);

  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (linkImage) => {
        return (
          <img src={linkImage} className="w-20 h-30 object-cover rounded-lg" />
        );
      },
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => {
        return formatCurrencyVND(price);
      },
    },
    {
      title: "Loại sản phẩm",
      dataIndex: "product_type",
      key: "product_type",
    },
    {
      title: "Tồn kho",
      dataIndex: "stockQuantity",
      key: "stockQuantity",
      render: (text) => {
        return <span>{text} sản phẩm</span>;
      },
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

  const fetchData = (page = 1, pageSize = 5) => {
    setLoading(true);
    productService
      .getListProduct(page, pageSize)
      .then((res) => {
        console.log(res.data.metaData);
        const { page, items, pageSize, totalItem } = res.data.metaData;
        const data = items.map((item) => {
          return {
            key: item.id,
            image: item.main_image,
            name: item.name,
            price: item.price,
            product_type: item.product_type.name,
            stockQuantity: item.stock_quantity,
            ...item,
          };
        });
        setListProduct(data);
        setPagination({
          current: page,
          pageSize,
          total: totalItem,
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  const handleTableChange = (pagination) => {
    console.log("Refetch with:", pagination.current, pagination.pageSize);
    setPagination({
      current: pagination.current,
      pageSize: pagination.pageSize,
      total: pagination.total, // giữ lại nếu muốn
    });
    fetchData(pagination.current, pagination.pageSize);
  };

  const handleDelete = (productId) => {
    productService
      .delete(productId, token)
      .then((res) => {
        console.log(res);
        handleNotification("success", "Xóa sản phẩm thành công");
        fetchData(pagination.current, pagination.pageSize);
      })
      .catch((err) => {
        handleNotification("error", "Xóa sản phẩm thất bại");
        fetchData(pagination.current, pagination.pageSize);
        console.log(err);
      });
  };

  const handleEdit = (product) => {
    console.log("edit", product);
    setProduct(product);
    setIsModalEditOpen(true);
  };

  const handleCancel = () => {
    console.log("???");
    setIsModalEditOpen(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-end">
        <Button
          className="mb-6"
          type="primary"
          onClick={() => {
            navigate(`${pathDefault.managerProduct}/post`);
          }}
        >
          Thêm sản phẩm
        </Button>
      </div>
      <Table
        dataSource={listProduct}
        columns={columns}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      />
      <Modal
        title="Cập nhật sản phẩm"
        open={isModalEditOpen}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <EditProductModal
          product={product}
          onCloseModal={handleCancel}
          fetchData={fetchData}
          pagination={pagination}
        />
      </Modal>
    </div>
  );
};

export default ManagerProduct;
