import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [{
  path: '/',
  name: 'Main',
  component: () => import(/* webpackChunkName: "Main" */ '@/views/Main.vue'),
},
{
  path: '/:id',
  name: 'Department',
  component: () => import(/* webpackChunkName: "Department" */ '@/views/Department.vue'),
},
];

const router = new VueRouter({
  scrollBehavior() {
    return {
      x: 0,
      y: 0,
    };
  },
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
