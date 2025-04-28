import { http } from "./config";

export const orderService = {
  createOrder: (data, token) => {
    return http.post(`/order`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  checkOrderStatus: (orderCode) => {
    return http.post(`/order/check-status?orderCode=${orderCode}`);
  },

  getOrderByUserId: (token, page, pageSize) => {
    return http.get(`/order/user?page=${page}&pageSize=${pageSize}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getList: (token, page, pageSize, search) => {
    return http.get(
      `/order/?page=${page}&pageSize=${pageSize}&search=${search}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },

  delete: (token, orderId) => {
    return http.delete(`/order/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  update: (token, orderId, data) => {
    return http.patch(`/order/${orderId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
