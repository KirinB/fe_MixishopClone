import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { orderService } from "../../../services/order.service";
import { Button, Modal, Popconfirm, Table } from "antd";
import { InputCustom } from "../../../components/InputCustom";
import { useNotificationContext } from "../../../store/Notification.Context";
import ModalUpdateOrder from "./components/ModalUpdateOrder";

const ManagerOrder = () => {
  const { token } = useSelector((state) => state.userSlice);
  const { handleNotification } = useNotificationContext();

  const [listOrder, setListOrder] = useState([]);
  const [order, setOrder] = useState({});
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [valueInput, setValueInput] = useState("");
  const [search, setSearch] = useState("");

  const fetchOrderData = (page, pageSize, search = "") => {
    setIsLoading(true);
    orderService
      .getList(token, page, pageSize, search)
      .then((res) => {
        const { page, pageSize, totalItem, items } = res.data.metaData;
        console.log({ items });
        setListOrder((prev) => {
          console.log(prev);
          const result = items.map((order) => {
            return { ...order, email: order.user.email };
          });
          return result;
        });
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
    fetchOrderData(pagination.current, pagination.pageSize);
  }, []);

  useEffect(() => {
    if (search !== "") {
      fetchOrderData(1, pagination.pageSize, search);
    }
  }, [search]);

  const handleTableChange = (pagination) => {
    setPagination({
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
    fetchOrderData(pagination.current, pagination.pageSize, search);
  };

  const handleEdit = (order) => {
    console.log("Chỉnh sửa order:", order);
    setOrder(order);
    setIsOpenModalUpdate(true);
  };

  const handleDelete = async (orderId) => {
    console.log({ orderId });
    try {
      await orderService.delete(token, orderId);
      handleNotification("success", `Xóa thành công đơn hàng`);
      fetchOrderData(pagination.current, pagination.pageSize, search);
    } catch (error) {
      handleNotification("error", "Xóa không thành công");
      fetchOrderData(pagination.current, pagination.pageSize, search);
    }
  };

  const columns = [
    {
      title: "Email người đặt",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Order code",
      dataIndex: "order_code",
      key: "order_code",
    },
    {
      title: "Tổng giá trị đơn",
      dataIndex: "total_price",
      key: "total_price",
    },

    {
      title: "Trạng thái đơn hàng",
      dataIndex: "status",
      key: "status",
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

  return (
    <div>
      <form className="flex gap-6 mb-4">
        <InputCustom
          value={valueInput}
          placeholder={valueInput || "Tìm kiếm theo email, order code"}
          onChange={(e) => {
            setValueInput(e.target.value);
          }}
        />
        <Button
          onClick={(e) => {
            e.preventDefault();
            setSearch(valueInput.trim());
          }}
          htmlType="submit"
          type="primary"
        >
          Tìm kiếm
        </Button>
        {search && (
          <Button
            onClick={() => {
              fetchOrderData(1, pagination.pageSize);
            }}
            type="default"
          >
            Xóa tìm kiếm
          </Button>
        )}
      </form>
      <Table
        columns={columns}
        dataSource={listOrder.map((item) => ({
          ...item,
          key: item.id,
        }))}
        loading={isLoading}
        pagination={pagination}
        onChange={handleTableChange}
      />
      <Modal
        title="Cập nhật mã đơn hàng"
        open={isOpenModalUpdate}
        onCancel={() => {
          setIsOpenModalUpdate(false);
        }}
        footer={null}
      >
        <ModalUpdateOrder
          order={order}
          fetchOrderData={fetchOrderData}
          pagination={pagination}
          setIsModalUpdateOrder={setIsOpenModalUpdate}
        />
      </Modal>
    </div>
  );
};

export default ManagerOrder;
