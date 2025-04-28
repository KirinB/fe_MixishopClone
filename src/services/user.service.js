import { http } from "./config";

export const userService = {
  getListUser: (token, page, pageSize) => {
    return http.get(`/user?page=${page}&pageSize=${pageSize}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  updateUserById: (id, data, token) => {
    return http.patch(`/user/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  deleteUserById: (id, token) => {
    return http.delete(`/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  addNewUser: (data, token) => {
    return http.post("/user", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export const userQueries = {
  getUsers: {
    queryKey: "getUsers",
    queryFunction: ({ token, page, pageSize }) => {
      return userService.getListUser(token, page, pageSize);
    },
  },
  createUser: {
    queryKey: "createUser",
    queryFunction: ({ data, token }) => {
      return userService.addNewUser(data, token);
    },
  },
  updateUser: {
    queryKey: "updateUser",
    queryFunction: ({ id, data, token }) => {
      return userService.updateUserById(id, data, token);
    },
  },
  deleteUser: {
    queryKey: "deleteUser",
    queryFunction: ({ id, token }) => {
      return userService.deleteUserById(id, token);
    },
  },
};
