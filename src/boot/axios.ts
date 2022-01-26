import { boot } from "quasar/wrappers";
import axios, { AxiosInstance } from "axios";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

const api = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? "https://manzana-api.herokuapp.com/api/v1" : "http://localhost:8000/api/v1",
  headers: {
    Accept : "application/json"
  },
});

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { api };
