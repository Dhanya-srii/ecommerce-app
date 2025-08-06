import Vue from 'vue';
import Vuex from 'vuex';
import { users } from '@/store/modules/user';
import { product } from '@/store/modules/product';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    users,
    product,
  },
});
