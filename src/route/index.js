import Vue from 'vue';
import VueRouter from 'vue-router';
import { ROUTE_NAMES } from '@/constants/Routes';
import LoginPage from '@/components/LoginPage.vue';
import LogoutPage from '@/components/LogoutPage.vue';
Vue.use(VueRouter);
const routes = [
  {
    path: '/',
    redirect: { name: ROUTE_NAMES.LOGIN_PAGE },
  },
  {
    path: '/login',
    component: LoginPage,
    name: ROUTE_NAMES.LOGIN_PAGE,
  },
  {
    path: '/logout',
    component: LogoutPage,
    name: ROUTE_NAMES.LOGOUT_PAGE,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
