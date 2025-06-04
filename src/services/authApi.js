import axios from "axios";

const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const loginUser = async (email, password) => {
  const response = await authApi.post(`/Authentication/login`, {
    email,
    password,
  });
  return response;
};

export const refreshToken = async (token) => {
  const response = await authApi.post(`/Authentication/refresh-token`);
  return response;
};
