import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm, message, Modal } from "antd";
import { userService } from "../../../services/user.service";
import { useSelector } from "react-redux";
import ModalFixUser from "./components/ModalFixUser";
import { useNotificationContext } from "../../../store/Notification.Context";
import ModalAddUser from "./components/ModalAddUser";

const ManagerUser = () => {
  const { handleNotification } = useNotificationContext();
  const { token } = useSelector((state) => state.userSlice);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });
  const [isModalFixUser, setIsModalFixUser] = useState(false);
  const [isModalAddUser, setIsModalAddUser] = useState(false);
  const [infoUser, setInfoUser] = useState([]);

  const [reRender, setReRender] = useState(false);

  // Render lại table
  useEffect(() => {
    if (reRender) {
      fetchUsers(pagination.current, pagination.pageSize);
      setReRender(false);
    }
  }, [reRender]);

  const fetchUsers = (page, pageSize) => {
    setLoading(true);
    userService
      .getListUser(token, page, pageSize)
      .then((res) => {
        const { items, totalItem } = res.data.metaData;

        const formattedData = items.map((user) => ({
          key: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone || "N/A",
          gender: user.gender || "N/A",
          role: user.role,
        }));

        setUserData(formattedData);
        setPagination((prev) => ({
          ...prev,
          total: totalItem,
        }));
      })
      .catch((err) => {
        console.error("Lỗi khi lấy danh sách user:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers(pagination.current, pagination.pageSize);
  }, [token]);

  const handleTableChange = (pagination) => {
    setPagination(pagination);
    fetchUsers(pagination.current, pagination.pageSize);
  };

  //  Hàm Sửa user
  const handleEdit = (user) => {
    console.log("Chỉnh sửa user:", user);
    setInfoUser(user);
    setIsModalFixUser(true);
    // TODO: Hiển thị modal sửa user
  };

  //  Hàm Xóa user
  const handleDelete = (userId) => {
    userService
      .deleteUserById(userId, token)
      .then(() => {
        handleNotification("success", "Xóa người dùng thành công");
        setReRender(true);
      })
      .catch((err) => {
        handleNotification("error", "Xóa người dùng thất bại");
        setReRender(true);
      });
  };

  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      filters: [
        { text: "Nam", value: "Male" },
        { text: "Nữ", value: "Female" },
      ],
      onFilter: (value, record) => record.gender === value,
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
    <>
      <div className="flex justify-end mb-4">
        <Button
          type="primary"
          size="large"
          onClick={() => {
            setIsModalAddUser(true);
          }}
        >
          Thêm người dùng
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={userData}
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
      />
      <Modal
        title="Sửa thông tin người dùng"
        open={isModalFixUser}
        footer={null}
        Close
        onCancel={() => {
          setIsModalFixUser(false);
        }}
      >
        <ModalFixUser
          user={infoUser}
          setReRender={setReRender}
          setIsModalFixUser={setIsModalFixUser}
        />
      </Modal>

      <Modal
        title="Thêm người dùng"
        open={isModalAddUser}
        footer={null}
        Close
        onCancel={() => {
          setIsModalAddUser(false);
        }}
      >
        <ModalAddUser
          setReRender={setReRender}
          setIsModalAddUser={setIsModalAddUser}
        />
      </Modal>
    </>
  );
};

export default ManagerUser;
