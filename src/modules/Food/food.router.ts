import {RouteRecordRaw} from "vue-router";

const routes: RouteRecordRaw = {
  path: '/foods',
  name: "Food",
  component: () => import("../Shared/layouts/Layout.vue"),
  children: [
    {
      path: '',
      name: "list",
      component: () => import("./pages/List.vue"),
    },
  ]
}

export default routes;
