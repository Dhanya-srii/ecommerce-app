import Vue from 'vue';
import App from './App.vue';
import router from './route';
import store from './store';
import { lazy } from './directives/lazy';

Vue.config.productionTip = false;
Vue.directive('lazy', lazy);

import { Rate } from 'element-ui';
import { Button } from 'element-ui';
import { Checkbox } from 'element-ui';
Vue.use(Rate);
Vue.use(Button);
Vue.use(Checkbox);

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app');
