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
    return http.get(`product/${id}`);
  },

  create: (data, token) => {
    return http.post("/product", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
