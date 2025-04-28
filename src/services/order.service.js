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

export const orderQueries = {
  createOrder: {
    queryKey: "createOrder",
    queryFunction: ({ data, token }) => {
      return orderService.createOrder(data, token);
    },
  },

  getOrders: {
    queryKey: "getOrders",
    queryFunction: ({ token, page, pageSize, search }) => {
      return orderService.getList(token, page, pageSize, search);
    },
  },

  updateOrder: {
    queryKey: "updateOrder",
    queryFunction: ({ token, id, data }) => {
      return orderService.update(token, id, data);
    },
  },

  deleteOrder: {
    queryKey: "deleteOrder",
    queryFunction: ({ token, id }) => {
      return orderService.delete(token, id);
    },
  },
};
