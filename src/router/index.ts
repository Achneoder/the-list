import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import ListPage from '../views/ListPage.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: ListPage
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
