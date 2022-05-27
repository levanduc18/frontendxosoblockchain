<template>
  <div
    class="nav-container bg-black relative z-50"
    :class="{ dark: darkTheme }"
  >
    <div
      class="information-bar w-full h-10 px-8 bg-custom-nav box-border flex flex-row items-center justify-between"
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
            4th floor, 421 Tran Hung Dao Street, Da Nang
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
    <TheDivider />
    <div
      class="nav-bar static w-full h-20 px-8 bg-custom-nav flex flex-row items-center justify-between"
      :class="{
        onScroll: !view.topOfPage,
      }"
    >
      <a href="/" class="left flex flex-row items-center justify-start">
        <img
          :src="images.logo"
          class="logo-icon"
          style="width: 48px; height: 48px"
        />
        <div class="logo-name font-bold text-2xl ml-4">PenguinLott</div>
      </a>
      <ul class="menu-link flex flex-row justify-around box-border w-1/3">
        <router-link
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="link w-28 py-2 box-border rounded-2xl transition ease-in-out delay-100 text-base font-semibold mx-1 hover:bg-custom-purple-bold hover:text-custom-white-text"
        >
          {{ link.name }}
        </router-link>
      </ul>
      <div class="right flex flex-row justify-end items-center w-1/4">
        <NotificationButton />
        <mdicon
          class="custom-icon ml-2"
          name="earth"
          :width="18"
          :height="18"
        />
        <LanguageSwitch />
        <div
          @click="toggleDarkMode"
          class="btn-toggle-theme mr-6 cursor-pointer ml-4 flex flex-row items-center justify-between bg-slate-300 rounded-2xl w-14 h-7"
        >
          <div
            class="toggle rounded-full h-6 w-6 flex flex-row items-center justify-center ml-px transition-all ease-in-out duration-300"
            :class="{ toggleLight: !darkTheme }"
          >
            <mdicon name="white-balance-sunny" :width="16" :height="16" />
          </div>
          <div
            class="toggle rounded-full h-6 w-6 flex flex-row items-center justify-center mr-px transition-all ease-in-out duration-300"
            :class="{ toggleDark: darkTheme }"
          >
            <mdicon
              class="night-icon"
              name="weather-night"
              :width="16"
              :height="16"
            />
          </div>
        </div>
        <a
          v-if="!isInstallMetaMask"
          href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
        >
          <button
            class="btn-install-metamask w-36 py-2 shadow-3xl border border-black rounded-2xl hover:opacity-80"
          >
            {{ $t("message.install-metamask") }}
          </button>
        </a>
        <button
          v-else-if="isConnectWallet == false || account == null"
          class="btn-connect-wallet w-36 py-2 shadow-3xl border border-black rounded-2xl hover:opacity-80"
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
import LanguageSwitch from "@/components/LanguageSwitch/LanguageSwitch.vue";
import WalletButton from "@/components/WalletButton/WalletButton.vue";
import TheDivider from "@/components/TheDivider/TheDivider.vue";
import WalletModal from "@/components/WalletModal/WalletModal.vue";
import BuyTicketModal from "@/components/BuyTicketModal/BuyTicketModal.vue";
import SnackBar from "@/components/SnackBar/SnackBar.vue";
import NotificationButton from "../NotificationButton/NotificationButton.vue";

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
      images: {
        logo: require("@/assets/images/penguin.png"),
        ticket: require("@/assets/images/tag.png"),
      },
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
    ]),
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
          name: "Info",
        },
        {
          to: "/about",
          name: "About",
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
    handleScroll() {
      if (window.pageYOffset > 16) {
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
        await this.getBalance();
        await this.getNetwork();
        this.setIsConnectWallet(true);
      } catch (error) {
        console.log(error);
      }
    },
    toggleDarkMode() {
      const bodyElement = document.getElementsByTagName("body")[0];
      this.setDarkTheme(!this.darkTheme);
      localStorage.setItem("darkTheme", this.darkTheme.toString());
      if (this.darkTheme) bodyElement.classList = "darkScrollbar";
      else bodyElement.classList = "";
    },
    handleOpenMenuMobile() {
      this.view.isOpenMenuMobile = !this.view.isOpenMenuMobile;
    },
    handleOpenTicketModal() {
      this.setIsOpenBuyTicketModal(true);
    },
  },
  components: {
    LanguageSwitch,
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
.router-link-active,
.router-link-exact-active {
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
.toggleLight {
  background: white;
}
.toggleDark {
  background: rgb(39, 38, 44);
  .night-icon {
    color: white;
  }
}
</style>
