import Vue from 'vue';
import Vuex from 'vuex';
import { users } from './modules/user';
import { products } from './modules/product';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    users,
    products
  },
});
