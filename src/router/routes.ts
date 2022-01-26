import { RouteRecordRaw } from 'vue-router';
import AuthModule from "../modules/Auth/auth.router";
import FoodModule from "../modules/Food/food.router";

const routes: RouteRecordRaw[] = [
  AuthModule,
  FoodModule,
  {
    path: '/:catchAll(.*)*',
    component: () => import('../modules/Shared/components/Error404.vue'),
  },
];

export default routes;
