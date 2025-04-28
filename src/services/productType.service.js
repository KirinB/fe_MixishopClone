import { http } from "./config";

export const productTypeService = {
  getList: (token, page = "1", pageSize = "10", search = "") => {
    return http.get(
      `/product-type/?page=${page}&pageSize=${pageSize}&search${search}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
  getById: (id) => {
    return http.get(`/product-type/${id}`);
  },
  add: (token, data) => {
    return http.post(`/product-type`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  delete: (token, id) => {
    return http.delete(`/product-type/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  update: (token, id, data) => {
    return http.patch(`/product-type/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export const productTypeQueries = {
  getProductTypes: {
    queryKey: "getProductTypes",
    queryFunction: ({ token, page, pageSize, search }) => {
      return productTypeService.getList(token, page, pageSize, search);
    },
  },

  createProductType: {
    queryKey: "createProductType",
    queryFunction: ({ token, data }) => {
      return productTypeService.add(token, data);
    },
  },

  updateProductType: {
    queryKey: "updateProductType",
    queryFunction: ({ token, id, data }) => {
      return productTypeService.update(token, id, data);
    },
  },

  deleteProductType: {
    queryKey: "deleteProductType",
    queryFunction: ({ token, id }) => {
      return productTypeService.delete(token, id);
    },
  },
};
