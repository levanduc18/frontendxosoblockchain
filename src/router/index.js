import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LotteryView from "@/views/LotteryView.vue";
import InfoView from "@/views/InfoView.vue";
import AboutView from "@/views/AboutView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/lottery",
    name: "lottery",
    component: LotteryView,
  },
  {
    path: "/info",
    name: "info",
    component: InfoView,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
