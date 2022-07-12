import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LotteryView from "@/views/LotteryView.vue";
import InfoView from "@/views/InfoView.vue";
import MintView from "@/views/MintView.vue";
import TutorialView from "@/views/TutorialView.vue";
import GetStartedView from "@/views/GetStartedView.vue";
import CreateWalletViewVue from "@/views/CreateWalletView.vue";
import GetTokenVue from "@/views/GetToken.vue";
import ConnectWalletViewVue from "@/views/ConnectWalletView.vue";
import BuyTicketViewVue from "@/views/BuyTicketView.vue";
import FeatureViewVue from "@/views/FeatureView.vue";
import ViewTicketViewVue from "@/views/ViewTicketView.vue";
import NotFoundViewVue from "@/views/NotFoundView.vue";

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
    path: "/tutorial",
    name: "tutorial",
    component: TutorialView,
    children: [
      {
        path: "get-started",
        name: "get-started",
        component: GetStartedView,
        children: [
          {
            path: "create-wallet",
            component: CreateWalletViewVue,
          },
          { path: "get-token", component: GetTokenVue },
          { path: "connect-wallet", component: ConnectWalletViewVue },
        ],
      },
      {
        path: "features",
        name: "features",
        component: FeatureViewVue,
        children: [
          {
            path: "buy-ticket",
            component: BuyTicketViewVue,
          },
          { path: "view-tickets", component: ViewTicketViewVue },
        ],
      },
    ],
  },

  {
    path: "/mint",
    name: "mint",
    component: MintView,
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFoundViewVue,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
