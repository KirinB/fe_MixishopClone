import { http } from "./config";

export const productService = {
  getListProduct: (
    page = "1",
    pageSize = "10",
    search = "",
    typeId = "",
    minPrice = "",
    maxPrice = "",
    sortBy = ""
  ) => {
    return http.get(
      `/product?page=${page}&pageSize=${pageSize}&search=${search}&typeId=${typeId}&minPrice=${minPrice}&maxPrice=${maxPrice}&sortBy=${sortBy}`
    );
  },
  getProductById: (id) => {
    return http.get(`/product/${id}`);
  },

  getProductByIds: (data) => {
    return http.post(`/product/by-ids`, data);
  },

  create: (data, token) => {
    return http.post("/product", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  delete: (id, token) => {
    return http.delete(`/product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  updateById: (id, data, token) => {
    return http.patch(`/product/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export const productQueries = {
  getProducts: {
    queryKey: "getProducts",
    queryFunction: ({
      page,
      pageSize,
      search,
      typeId,
      minPrice,
      maxPrice,
      sortBy,
    }) => {
      return productService.getListProduct(
        page,
        pageSize,
        search,
        typeId,
        minPrice,
        maxPrice,
        sortBy
      );
    },
  },
  createProduct: {
    queryKey: "createProduct",
    queryFunction: ({ data, token }) => {
      return productService.create(data, token);
    },
  },
  updateProduct: {
    queryKey: "updateProduct",
    queryFunction: ({ id, data, token }) => {
      return productService.updateById(id, data, token);
    },
  },
  deleteProduct: {
    queryKey: "deleteProduct",
    queryFunction: ({ id, token }) => {
      return productService.delete(id, token);
    },
  },
};
