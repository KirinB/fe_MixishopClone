import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { pathDefault } from "../../common/path";
import BreadcrumbCustom from "../../components/Breadcrumb";
import { orderService } from "../../services/order.service";
import { formatCurrencyVND } from "../../utils/utils";

const columns = [
  {
    title: "Mã đơn hàng",
    dataIndex: "orderCode",
    key: "orderCode",
  },
  {
    title: "Ngày đặt",
    dataIndex: "date",
    key: "date",
    render: (text) => {
      const date = new Date(text);
      return date.toLocaleDateString("vi-VN");
    },
  },
  {
    title: "Thành tiền",
    dataIndex: "price",
    key: "price",
    render: (text) => {
      return formatCurrencyVND(+text);
    },
  },
  {
    title: "Trạng thái thanh toán",
    dataIndex: "status",
    key: "status",
    render: (text) => {
      const statusMap = {
        Completed: "Hoàn tất",
        Pending: "Đang chờ xử lý",
        Cancelled: "Đã hủy",
      };
      return statusMap[text] || text;
    },
  },
];

const AccountPage = () => {
  const { user, token } = useSelector((state) => state.userSlice);
  const [order, setOrder] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });
  const [loading, setLoading] = useState(false);

  const fetchData = async (page = 1, pageSize = 5) => {
    setLoading(true);
    orderService
      .getOrderByUserId(token, page, pageSize)
      .then((res) => {
        const { currentPage, items, pageSize, totalItem } = res.data.metaData;
        console.log(res);
        const data = items.map((item) => {
          return {
            key: item.id,
            orderCode: item.order_code,
            date: item.created_at,
            price: item.total_price,
            status: item.status,
          };
        });
        setOrder(data);
        setPagination({
          current: currentPage,
          pageSize,
          total: totalItem,
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTableChange = (pagination) => {
    fetchData(pagination.current, pagination.pageSize);
  };

  return (
    <>
      <BreadcrumbCustom
        items={[
          {
            title: "Trang chủ",
            href: pathDefault.homePage,
          },
          {
            title: "Tài khoản",
          },
        ]}
      />
      <div className="container py-10 grid grid-cols-4">
        <aside className="space-y-4">
          <h2 className="uppercase text-lg">trang tài khoản</h2>
          <p>
            Xin chào,{" "}
            <span className="uppercase font-semibold">{user?.name} !</span>
          </p>
          <p>
            <Link to={"#"}>Thông tin tài khoản</Link>
          </p>
          <p className="">Sổ địa chỉ (0)</p>
          <p
            className="cursor-pointer text-lg text-price hover:text-black transition-all duration-300"
            onClick={() => {
              localStorage.removeItem("userInfo");
              localStorage.removeItem("token");
              dispatch(handleDeleteUser());
            }}
          >
            Đăng xuất
          </p>
        </aside>
        <div className="col-span-3 border-l pl-4 space-y-6">
          <div className="space-y-4">
            <h2 className="uppercase text-lg">tài khoản</h2>
            <p>
              Tên tài khoản:{" "}
              <span className="uppercase font-semibold">{user?.name}</span>
            </p>
            <p>Địa chỉ: Việt nam</p>
            <p>Điện thoại: {user?.phone}</p>
          </div>
          <div>
            <h2 className="uppercase text-lg mb-4">đơn hàng của bạn</h2>
            <Table
              columns={columns}
              dataSource={order}
              pagination={pagination}
              loading={loading}
              onChange={handleTableChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountPage;
