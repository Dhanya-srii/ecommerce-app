import Vue from 'vue';
import VueRouter from 'vue-router';
import { ROUTE_NAMES } from '@/constants/Routes';
import LoginPage from '@/components/LoginPage.vue';
import ProductsList from '@/components/product/ProductsList.vue';
import FavouriteProducts from '@/components/product/FavouriteProducts.vue';
import ProductDetails from '@/components/product/ProductDetails.vue';
import ProductCart from '@/components/cart/CartItemList.vue';

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
    path: '/favourites',
    component: FavouriteProducts,
    name: ROUTE_NAMES.FAVOURITE_PRODUCTS,
  },
  {
    path: '/product',
    component: ProductDetails,
    name: ROUTE_NAMES.PRODUCT_DETAIL,
  },
  {
    path: '/addcart',
    component: ProductCart,
    name: ROUTE_NAMES.PRODUCT_CART,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
