import Vue from 'vue';
import App from './App.vue';
import router from './route';
import store from './store';
import { lazy } from './directives/lazy';

Vue.config.productionTip = false;
Vue.directive('lazy', lazy);

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app');
