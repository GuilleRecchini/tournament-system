import api from "./api";

export const registerUser = async (user) => {
  const response = await api.post(`/user/register`, user);
  return response;
};

export const getUser = async (id) => {
  const response = await api.get(`/user/${id}`);
  return response;
};
