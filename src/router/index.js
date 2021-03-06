import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: '/elementDate',
    name: 'elementDate',
    component: () => import('../views/elementDate.vue')
  }
];

const router = new VueRouter({
  // mode: "history",
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});

export default router;
