import Vue from 'vue';
import App from './App.vue';
import router from './route';
import store from './store';
import { lazy } from './directives/lazy';
import { Option, Select, Rate } from 'element-ui';

Vue.config.productionTip = false;
Vue.directive('lazy', lazy);
Vue.use(Select);
Vue.use(Option);
Vue.use(Rate);
new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app');
