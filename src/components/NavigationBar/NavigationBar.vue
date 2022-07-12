<template>
  <div
    class="nav-container bg-slate-100 relative z-50"
    :class="{ dark: darkTheme }"
  >
    <div
      class="information-bar w-full hidden md:flex h-8 md:h-10 px-1 sm:px-4 bg-custom-nav box-border flex flex-row items-center justify-between"
    >
      <div class="left flex flex-row items-center">
        <div class="inline-container flex flex-row items-center">
          <mdicon
            name="phone"
            :width="16"
            :height="16"
            class="custom-icon mr-2 text-custom-purple-text-light"
          />
          <p class="detail text-custom-purple-text-light text-sm">
            +84 795 799 457
          </p>
        </div>
        <div class="inline-container flex flex-row items-center ml-4">
          <mdicon
            name="map-marker"
            :width="16"
            :height="16"
            class="custom-icon mr-2 text-custom-purple-text-light"
          />
          <p class="detail text-custom-purple-text-light text-sm mr-2">
            {{ $t("message.addressLogi") }}
          </p>
        </div>
      </div>
      <div class="right flex flex-row items-end justify-end">
        <mdicon
          name="facebook"
          :width="20"
          :height="20"
          class="custom-icon mr-3 cursor-pointer text-custom-purple-text-light"
        />
        <mdicon
          name="instagram"
          :width="20"
          :height="20"
          class="custom-icon mr-3 cursor-pointer text-custom-purple-text-light"
        />
        <mdicon
          name="linkedin"
          :width="20"
          :height="20"
          class="custom-icon cursor-pointer text-custom-purple-text-light"
        />
      </div>
    </div>
    <TheDivider class="hidden md:flex" />
    <div
      class="nav-bar relative w-full h-12 xs:h-14 sm:h-16 md:h-20 px-0 sm:px-2 md:px-4 bg-custom-nav flex flex-row items-center justify-between"
      :class="{
        onScroll: !view.topOfPage,
      }"
    >
      <div class="left flex flex-row items-center justify-start">
        <mdicon
          name="menu"
          :height="32"
          :width="32"
          class="text-slate-500 mr-2 ml-1 cursor-pointer flex sm:hidden"
          @click="isOpenMenuMobile = true"
          v-if="path"
        />
        <router-link
          to="/"
          class="left flex flex-row items-center justify-start"
        >
          <img
            :src="images.logo"
            class="logo-icon"
            style="width: 48px; height: 48px"
          />
          <div class="logo-name hidden md:flex font-bold text-2xl ml-1 md:ml-3">
            PenguinLott
          </div>
        </router-link>
      </div>
      <div
        class="static sm:hidden fixed top-0 left-0 w-2/3 h-screen bg-slate-100 pt-16 text-left"
        :class="{
          hiddenComponent: path,
          onScroll: !view.topOfPage,
          darkPanel: darkTheme,
        }"
        v-if="isOpenMenuMobile"
      >
        <div class="font-semibold text-xl ml-4 mb-2">Tutorial</div>
        <mdicon
          name="close"
          :height="32"
          :width="32"
          class="text-slate-500 absolute top-4 right-4"
          @click="isOpenMenuMobile = false"
        />
        <router-link to="/tutorial">
          <div
            :class="{ isActive: currentPathVue == '/tutorial' }"
            class="option text-slate-700 font-semibold text-base cursor-pointer hover:bg-slate-200 px-4 py-2"
          >
            {{ $t("message.introduction") }}
          </div>
        </router-link>
        <router-link to="/tutorial/get-started">
          <div
            class="option flex flex-row items-center justify-between text-slate-700 font-semibold text-base cursor-pointer hover:bg-slate-200 px-4 py-2"
            :class="{ isActive: currentPathVue == '/tutorial/get-started' }"
          >
            {{ $t("message.get-start") }}
            <div v-if="!isOpenGetStarted">
              <mdicon
                name="chevron-right"
                class="hover:text-custom-cyan-light"
                @click="handleClickIconGetStarted"
              />
            </div>
            <div v-else>
              <mdicon
                name="chevron-down"
                class="hover:text-custom-cyan-light"
                @click="handleClickIconGetStarted"
              />
            </div>
          </div>
        </router-link>

        <div
          class="text-slate-700 font-light text-base"
          v-if="isOpenGetStarted"
        >
          <router-link to="/tutorial/get-started/create-wallet">
            <div
              class="option hover:bg-slate-200 cursor-pointer px-6 py-2"
              :class="{
                isActive:
                  currentPathVue == '/tutorial/get-started/create-wallet',
              }"
            >
              {{ $t("message.create-wallet") }}
            </div>
          </router-link>
          <router-link to="/tutorial/get-started/connect-wallet">
            <div
              class="option hover:bg-slate-200 cursor-pointer px-6 py-2"
              :class="{
                isActive:
                  currentPathVue == '/tutorial/get-started/connect-wallet',
              }"
            >
              {{ $t("message.connect-wallet-to") }}
            </div>
          </router-link>
          <router-link to="/tutorial/get-started/get-token">
            <div
              class="option hover:bg-slate-200 cursor-pointer px-6 py-2"
              :class="{
                isActive: currentPathVue == '/tutorial/get-started/get-token',
              }"
            >
              {{ $t("message.get-token") }}
            </div>
          </router-link>
        </div>

        <router-link to="/tutorial/features">
          <div
            class="option flex flex-row items-center justify-between text-slate-700 font-semibold text-base cursor-pointer hover:bg-slate-200 px-4 py-2"
            :class="{ isActive: currentPathVue == '/tutorial/features' }"
          >
            {{ $t("message.features") }}
            <div v-if="!isOpenFeatures">
              <mdicon
                name="chevron-right"
                class="hover:text-custom-cyan-light"
                @click="handleClickIconFeatures"
              />
            </div>
            <div v-else>
              <mdicon
                name="chevron-down"
                class="hover:text-custom-cyan-light"
                @click="handleClickIconFeatures"
              />
            </div>
          </div>
        </router-link>

        <div class="text-slate-700 font-light text-base" v-if="isOpenFeatures">
          <router-link to="/tutorial/features/buy-ticket">
            <div
              class="option hover:bg-slate-200 cursor-pointer px-6 py-2"
              :class="{
                isActive: currentPathVue == '/tutorial/features/buy-ticket',
              }"
            >
              {{ $t("message.buy-ticket") }}
            </div>
          </router-link>
          <router-link to="/tutorial/features/view-tickets">
            <div
              class="option hover:bg-slate-200 cursor-pointer px-6 py-2"
              :class="{
                isActive: currentPathVue == '/tutorial/features/view-tickets',
              }"
            >
              {{ $t("message.view-ticket") }}
            </div>
          </router-link>
        </div>
      </div>
      <ul
        class="menu-link hidden md:flex flex-row justify-evenly box-border w-1/2"
      >
        <router-link
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="link w-28 p-2 box-border rounded-2xl transition ease-in-out delay-100 text-base font-semibold mx-1 hover:bg-custom-purple-bold hover:text-custom-white-text"
        >
          {{ link.name }}
        </router-link>
      </ul>
      <ul
        class="shadow-3xl menu-link-mobile fixed bottom-0 w-screen bg-custom-nav flex md:hidden flex-row justify-around w-full"
        :class="{ darkMenu: darkTheme }"
      >
        <router-link
          v-for="link in links"
          @click="isOpenMenuMobile = false"
          :key="link.to"
          :to="link.to"
          class="link-mobile m-0 pt-3 pb-2 text-left w-1/4 flex flex-col items-center transition ease-in-out delay-100 text-xs xs:text-sm sm:text-base font-semibold mx-1 hover:bg-custom-purple-bold hover:text-custom-white-text"
        >
          <mdicon v-if="link.to == '/'" name="home" :height="24" :width="24" />
          <mdicon
            v-if="link.to == '/lottery'"
            name="ticket-confirmation"
            :height="24"
            :width="24"
          />
          <mdicon
            v-if="link.to == '/info'"
            name="information"
            :height="24"
            :width="24"
          />
          <mdicon
            v-if="link.to == '/tutorial'"
            name="television-guide"
            :height="24"
            :width="24"
          />
          <div class="text-xs">
            {{ link.name }}
          </div>
        </router-link>
      </ul>
      <div class="right flex flex-row justify-end items-center">
        <div class="flex flex-row items-center" v-if="isConnectWallet">
          <img :src="coinPNG" :width="16" :height="16" />
          <div
            class="balance text-xs xs:text-sm sm:text-base font-semibold ml-px sm:ml-2 mr-1 xs:mr-3 sm:mr-6"
          >
            ${{ USDTAllowanceBalance }}
          </div>
        </div>
        <NotificationButton
          class="mr-1 xs:mr-2 sm:mr-4"
          v-if="isConnectWallet"
        />

        <router-link to="/tutorial" v-if="!isInstallMetaMask">
          <button
            class="btn-install-metamask w-18 xs:w-28 sm:w-36 py-1 xs:py-2 text-xs xs:text-sm sm:test-base shadow-3xl border border-black rounded-2xl hover:opacity-80"
          >
            {{ $t("message.install-metamask") }}
          </button>
        </router-link>
        <button
          v-else-if="isConnectWallet == false || account == null"
          class="btn-connect-wallet w-18 xs:w-28 sm:w-36 py-1 xs:py-2 text-xs xs:text-sm sm:test-base shadow-3xl border border-black rounded-2xl hover:opacity-80"
          @click="handleConnectWallet"
        >
          {{ $t("message.connect-wallet") }}
        </button>
        <WalletButton v-else />
      </div>
    </div>
  </div>
  <WalletModal />
  <BuyTicketModal />
  <SnackBar />
</template>

<script>
import { mapActions, mapState } from "vuex";
import { switchNetwork, connectMetaMask } from "@/utils/getWeb3";
import WalletButton from "@/components/WalletButton/WalletButton.vue";
import TheDivider from "@/components/TheDivider/TheDivider.vue";
import WalletModal from "@/components/WalletModal/WalletModal.vue";
import BuyTicketModal from "@/components/BuyTicketModal/BuyTicketModal.vue";
import SnackBar from "@/components/SnackBar/SnackBar.vue";
import NotificationButton from "../NotificationButton/NotificationButton.vue";
import coinPNG from "@/assets/images/coin.png";
import { useRoute } from "vue-router";
import { computed } from "vue";
export default {
  name: "NavBar",
  data() {
    return {
      view: {
        topOfPage: true,
        isOpenLanguageMenu: false,
        info: null,
        isOpenMenuMobile: false,
      },
      isOpenGetStarted: false,
      isOpenFeatures: false,
      images: {
        logo: require("@/assets/images/penguin.png"),
        ticket: require("@/assets/images/tag.png"),
      },
      coinPNG,
      isOpenMenuMobile: false,
    };
  },
  computed: {
    ...mapState([
      "isInstallMetaMask",
      "balance",
      "account",
      "network",
      "isConnectWallet",
      "darkTheme",
      "currentLottery",
      "USDTAllowanceBalance",
    ]),
    path() {
      const route = useRoute();
      const currentPath = computed(() => route.path);
      return currentPath.value.startsWith("/tutorial");
    },
    activeTitle() {
      const route = useRoute();
      const currentPath = computed(() => route.path);
      if (currentPath.value == "/tutorial/get-started") return "getStarted";
      return "introduction";
    },
    currentPathVue() {
      const route = useRoute();
      const crPath = computed(() => route.path);
      return crPath.value;
    },
    links() {
      return [
        {
          to: "/",
          name: this.$t("message.home"),
        },
        {
          to: "/lottery",
          name: this.$t("message.lottery"),
        },
        {
          to: "/info",
          name: this.$t("message.info"),
        },
        {
          to: "/tutorial",
          name: this.$t("message.tutorial"),
        },
      ];
    },
  },
  beforeMount() {
    const bodyElement = document.getElementsByTagName("body")[0];
    window.addEventListener("scroll", this.handleScroll);
    const theme = localStorage.getItem("darkTheme");
    if (theme) {
      if (theme === "true") {
        this.setDarkTheme(true);
        bodyElement.classList = "darkScrollbar";
      } else {
        this.setDarkTheme(false);
        bodyElement.classList = "";
      }
    } else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      this.setDarkTheme(false);
      localStorage.setItem("darkTheme", this.darkTheme.toString());
    }
  },
  methods: {
    ...mapActions({
      setWeb3: "setWeb3",
      getBalance: "getBalance",
      getNetwork: "getNetwork",
      checkInstallMetaMask: "checkInstallMetaMask",
      setIsConnectWallet: "setIsConnectWallet",
      setDarkTheme: "setDarkTheme",
      setIsOpenBuyTicketModal: "setIsOpenBuyTicketModal",
      setCurrentLottery: "setCurrentLottery",
      getUSDTBalance: "getUSDTBalance",
    }),
    handleClickIconGetStarted() {
      this.isOpenGetStarted = !this.isOpenGetStarted;
    },

    handleClickIconFeatures() {
      this.isOpenFeatures = !this.isOpenFeatures;
    },
    handleScroll() {
      if (window.pageYOffset > 40) {
        if (this.view.topOfPage) this.view.topOfPage = false;
      } else {
        if (!this.view.topOfPage) this.view.topOfPage = true;
      }
    },
    handleClickLanguage() {
      this.view.isOpenLanguageMenu = !this.view.isOpenLanguageMenu;
    },
    async handleConnectWallet() {
      try {
        await connectMetaMask();
        await switchNetwork();
        await this.setWeb3();
        localStorage.setItem("isConnectWallet", true);
        this.setIsConnectWallet(true);
      } catch (error) {
        console.log(error);
      }
    },
    handleOpenMenuMobile() {
      this.view.isOpenMenuMobile = !this.view.isOpenMenuMobile;
    },
    handleOpenTicketModal() {
      this.setIsOpenBuyTicketModal(true);
    },
  },
  components: {
    WalletButton,
    TheDivider,
    WalletModal,
    BuyTicketModal,
    SnackBar,
    NotificationButton,
  },
};
</script>

<style lang="scss" scoped>
@use "@/assets/css/variables";
.router-link-active.link-mobile,
.router-link-exact-active.link-mobile {
  color: variables.$primary-color;
  border-bottom: 4px variables.$primary-color solid;
  font-weight: 600;
  background-color: transparent;
}
.router-link-active.link,
.router-link-exact-active.link {
  background: variables.$background-purple-bold;
  color: variables.$custom-white-text !important;
  font-weight: 600;
}

.nav-bar.onScroll {
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 10%);
  position: fixed;
  top: 0;
}

.dark {
  .balance {
    color: variables.$custom-white-text;
  }
  .information-bar {
    background: variables.$dark-background-nav;
    .left {
      .customer-support-title {
        color: variables.$custom-white-text;
      }
      .custom-icon {
        color: variables.$custom-white-text !important;
      }
      .detail {
        color: variables.$custom-white-text !important;
      }
    }
    .right {
      .custom-icon {
        color: variables.$custom-white-text !important;
      }
    }
  }
  .nav-bar {
    background: variables.$dark-background-nav;
    .left {
      .logo-name {
        color: variables.$custom-white-text;
      }
    }
    .menu-link {
      .link {
        color: variables.$custom-white-text;
      }
    }
    .right {
      .btn-connect-wallet {
        border-color: variables.$custom-white-text;
        color: variables.$custom-white-text;
      }
      .custom-icon {
        color: variables.$custom-white-text !important;
      }
    }
  }
}
.isActive {
  background-color: variables.$primary-color !important;
  color: variables.$custom-white-text;
}
.darkPanel {
  background: linear-gradient(
    139.73deg,
    rgb(49, 61, 92) 0%,
    rgb(61, 42, 84) 100%
  );
  color: variables.$custom-white-text !important;
  .option:hover {
    color: black;
  }
}
.darkMenu {
  background-color: variables.$dark-background-nav;
}
@media only screen and (max-width: 319px) {
  .logo-icon {
    width: 32px !important;
    height: 32px !important;
    margin-left: 2px;
  }
}
@media only screen and (min-width: 320px) and (max-width: 479px) {
  .logo-icon {
    width: 40px !important;
    height: 40px !important;
    margin-left: 4px;
  }
}

@media only screen and (min-width: 480px) and (max-width: 767px) {
  .logo-icon {
    width: 48px !important;
    height: 48px !important;
    margin-left: 8px;
  }
}
</style>
