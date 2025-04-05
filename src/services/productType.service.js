import { http } from "./config";

export const productTypeService = {
  getList: (token) => {
    return http.get("/product-type", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getById: (id) => {
    return http.get(`/product-type/${id}`);
  },
};
