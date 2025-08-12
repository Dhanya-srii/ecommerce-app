import Vue from 'vue';
import App from '@/App.vue';
import router from '@/route';
import store from '@/store';
import { lazy } from '@/directives/lazy';
import { Option, Select, Rate } from 'element-ui';
import { Button } from 'element-ui';
import { Checkbox } from 'element-ui';
import { CheckboxGroup } from 'element-ui';
import AppLoading from '@/components/utility/AppLoading.vue';

Vue.config.productionTip = false;

// Directives
Vue.directive('lazy', lazy);

// Element UI components
Vue.use(Rate);
Vue.use(Button);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Select);
Vue.use(Option);

// Vue Component
Vue.component('app-loading', AppLoading);

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app');
