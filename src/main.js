// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import axios from 'axios';
import store from './store';
import VueLazyload from 'vue-lazyload'

axios.defaults.withCredentials = true; //设置axios请求带cookie

Vue.use(VueLazyload, {
  error: '../static/img/error.jpg',
  loading: '../static/img/loding.gif',
  try: 3 // default 1
});
Vue.use(MuseUI);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App},
  store
});
