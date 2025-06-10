import api from "./api";

export const registerUser = async (user) => {
  const response = await api.post(`/user/register`, user);
  return response;
};

export const getUser = async (id) => {
  const response = await api.get(`/user/${id}`);
  return response;
};

export const getAllUsers = async () => {
  const response = await api.get(`/user`);
  return response;
};

export const updateUser = (user) => {
  const response = api.put(`/user/update`, user);
  return response;
};

export const deleteUser = (user) => {
  const response = api.delete(`/user/delete/${user.userId}`);
  return response;
};
