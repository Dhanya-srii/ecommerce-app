import Vue from 'vue';
import Vuex from 'vuex';
import { users } from './modules/user';
import { product } from './modules/product';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    users,
    product,
  },
});
