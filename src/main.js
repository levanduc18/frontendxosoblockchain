import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "@/assets/css/main.scss";
import mdiVue from "mdi-vue/v3";
import * as mdijs from "@mdi/js";
import i18n from "./lang/i18n";
import PerfectScrollbar from "vue3-perfect-scrollbar";
import "vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css";
import VueSocketIO from "vue-3-socket.io";
import { NOTIFICATION_SERVER } from "./constants";
import SocketIO from "socket.io-client";

createApp(App)
  .use(mdiVue, { icons: mdijs })
  .use(PerfectScrollbar)
  .use(
    new VueSocketIO({
      debug: true,
      connection: SocketIO(NOTIFICATION_SERVER),
      vuex: {
        store,
        actionPrefix: "SOCKET_",
        mutationPrefix: "SOCKET_",
      },
    })
  )
  .use(store)
  .use(router)
  .use(i18n)
  .mount("#app");
