import axios from "axios";



const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.defaults.headers.common["ngrok-skip-browser-warning"] = "69420"

api.interceptors.request.use(
  (config) => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      config.headers["Authorization"] = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalConfig = error.config;
    if (error.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;
      const { data } = await authService.refresh(
        localStorage.getItem("refresh_token")
      );
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      return api.request(originalConfig);
    }
    return Promise.reject(error);
  }
);


export { axios, api };
