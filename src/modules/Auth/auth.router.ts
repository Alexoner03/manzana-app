import {RouteRecordRaw} from "vue-router";

const routes: RouteRecordRaw = {
  path: '',
  name: "Auth",
  component: () => import("./layout/Layout.vue"),
  children: [
    {
      path: '',
      name: "Login",
      component: () => import("./pages/Login.vue"),
    },
    {
      path: '/register',
      name: "Register",
      component: () => import("./pages/Register.vue"),
    },
  ]
}

export default routes;
