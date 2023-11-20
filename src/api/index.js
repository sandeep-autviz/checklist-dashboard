import axios from "axios";

const base_Url =
  "https://ae10-2401-4900-1c2a-8fff-00-2b-cf7e.ngrok-free.app/project/human-contact-point";

const baseInstance = axios.create({
  base_Url,
  headers: {
    "Content-Type": "application/json",
  },
});

baseInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default baseInstance;
