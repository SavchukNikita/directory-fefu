import Vue from 'vue';
import Vuetify from 'vuetify';
import initDb from '@/db';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

Vue.config.productionTip = false;

initDb('Departments').then((res) => console.log(res));

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
