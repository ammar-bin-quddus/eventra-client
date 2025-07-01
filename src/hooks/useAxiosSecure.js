import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://eventra-server-omega.vercel.app/api",
});

axiosSecure.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const useAxiosSecure = () => axiosSecure;

export default useAxiosSecure;
