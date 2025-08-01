import Vue from 'vue';
import VueRouter from 'vue-router';
import { ROUTE_NAMES } from '@/constants/Routes';
import LoginPage from '@/components/LoginPage.vue';
import ProductsList from '@/components/ProductsList.vue';
import ProductDetails from '@/components/ProductDetails.vue';

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
    path: '/products',
    component: ProductsList,
    name: ROUTE_NAMES.PRODUCTS,
  },
  {
    path: '/product',
    component: ProductDetails,
    name: ROUTE_NAMES.PRODUCT_DETAIL,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
