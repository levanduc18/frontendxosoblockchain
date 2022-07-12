<template>
  <div v-if="!network">
    <img :src="loadingSVG" :height="42" :width="42" />
  </div>
  <div
    v-else
    @click="handleOpen"
    class="wallet-button h-6 xs:h-8 sm:h-10 pr-2 relative z-50 leading-10 box-border select-none block cursor-pointer float-right text-xs sm:text-sm font-normal w-24 xs:w-28 sm:w-36"
    :class="{ open: views.isOpenWalletButton, dark: darkTheme }"
  >
    <div
      class="address bg-zinc-50 rounded-full box-border h-6 xs:h-8 sm:h-10 w-24 xs:w-28 sm:w-36 flex flex-row items-center justify-center border border-gray-300"
    >
      <div
        class="icon-container w-6 xs:w-8 sm:w-10 h-6 xs:h-8 sm:h-10 rounded-full box-border flex flex-row items-center justify-center absolute top-0 left-0"
        v-if="network == parseInt(defaultNetwork)"
        style="border: 4px rgb(31, 199, 212) solid !important"
      >
        <mdicon
          name="wallet"
          class="text-custom-cyan-light scale-75 xs:scale-100"
          :width="18"
          :height="18"
        />
      </div>
      <div
        class="icon-container w-6 xs:w-8 sm:w-10 h-6 xs:h-8 sm:h-10 rounded-full box-border flex flex-row items-center justify-center absolute top-0 left-0"
        v-else
        style="border: 4px rgb(237, 75, 158) solid !important"
      >
        <mdicon
          name="alert"
          :width="18"
          :height="18"
          class="text-custom-pink-text scale-50 xs:scale-75 sm:scale-100"
        />
      </div>
      <div
        class="value font-bold ml-8 mr-1 text-xs xs:text-sm sm:text-base"
        v-if="network == parseInt(defaultNetwork)"
      >
        {{ address }}
      </div>
      <div class="value font-bold ml-8 mr-1 text-normal" v-else>
        {{ $t("message.nw") }}
      </div>
      <mdicon
        name="chevron-down"
        class="custom-icon -ml-1 sm:ml-0 scale-75 sm:scale-100"
        :width="18"
        :height="18"
      />
    </div>
    <ul class="list text-xs xs:text-sm sm:text-base">
      <li
        class="option flex flex-row items-center justify-between"
        @click="handleOpenWalletModel(0)"
      >
        <div class="flex w-full flex-row items-center">
          <mdicon
            name="wallet-outline"
            class="custom-icon mr-2 scale-75 sm:scale-100"
            :width="18"
            :height="18"
          />
          {{ $t("message.wallet") }}
        </div>
        <mdicon
          v-if="network != parseInt(defaultNetwork)"
          name="alert"
          class="text-custom-pink-text"
          :width="18"
          :height="18"
        />
      </li>
      <li
        class="option flex flex-row items-center justify-between"
        @click="handleOpenWalletModel(1)"
      >
        <div class="flex w-full flex-row items-center">
          <mdicon
            name="clipboard-text-clock"
            class="custom-icon mr-2 scale-75 sm:scale-100"
            :width="18"
            :height="18"
          />
          {{ $t("message.transactions") }}
        </div>
        <mdicon
          v-if="network != parseInt(defaultNetwork)"
          name="alert"
          class="text-custom-pink-text"
          :width="18"
          :height="18"
        />
      </li>
      <li class="option" @click="setIsOpenSettingModal(true)">
        <mdicon
          name="cog-outline"
          class="custom-icon mr-2 scale-75 sm:scale-100"
          :width="18"
          :height="18"
        />
        {{ $t("message.settings") }}
      </li>
      <li class="option" @click="handleLogout">
        <mdicon
          name="logout-variant"
          class="custom-icon mr-2 scale-75 sm:scale-100"
          :width="18"
          :height="18"
        />
        {{ $t("message.disconnect") }}
      </li>
    </ul>
  </div>
</template>

<script>
import { NETWORK_ID } from "@/constants";
import { mapActions, mapState } from "vuex";
import loadingSVG from "@/assets/images/loading.svg";
export default {
  name: "WalletButton",
  data() {
    return {
      views: {
        isOpenWalletButton: false,
      },
      defaultNetwork: NETWORK_ID,
      loadingSVG,
    };
  },
  computed: {
    ...mapState([
      "isInstallMetaMask",
      "balance",
      "account",
      "network",
      "darkTheme",
    ]),
    address: function () {
      return (
        this?.account.slice(0, 2) +
        "..." +
        this?.account.slice(this?.account.length - 4, this?.account.length)
      );
    },
  },
  created() {
    if (localStorage.getItem("isConnectWallet") == "true")
      this.setIsConnectWallet(true);
    else this.setIsConnectWallet(false);
  },
  methods: {
    ...mapActions({
      logout: "logout",
      setIsConnectWallet: "setIsConnectWallet",
      setIsOpenWalletModal: "setIsOpenWalletModal",
      setActiveSwitchWallet: "setActiveSwitchWallet",
      setIsOpenSettingModal: "setIsOpenSettingModal",
    }),
    handleOpen() {
      this.views.isOpenWalletButton = !this.views.isOpenWalletButton;
    },
    handleClose(e) {
      if (!this.$el.contains(e.target)) {
        this.views.isOpenWalletButton = false;
      }
    },
    handleLogout() {
      localStorage.setItem("isConnectWallet", false);
      this.setIsConnectWallet(false);
    },
    handleOpenWalletModel(switchValue) {
      this.setIsOpenWalletModal(true);
      this.setActiveSwitchWallet(switchValue);
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClose);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClose);
  },
  components: {},
};
</script>

<style lang="scss">
@use "@/assets/css/variables";
.wallet-button {
  .option {
    cursor: pointer;
    font-weight: 400;
    line-height: 50px;
    list-style: none;
    min-height: 40px;
    outline: none;
    padding-left: 20px;
    padding-right: 29px;
    text-align: left;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    font-size: 16px;
    font-weight: 400;
    transition: padding 0.3s ease-in-out;
  }
  .list {
    visibility: hidden;
    background: variables.$light-background-nav;
    box-shadow: 0px 3px 7px 0px rgb(0 0 0 / 35%);
    width: 260px;
    border-radius: 16px;
    box-sizing: border-box;
    margin-top: 8px;
    overflow: hidden;
    position: absolute;
    top: 100%;
    right: 0;
    transform-origin: 50% 0;
    transition: all 0.15s cubic-bezier(0.5, 0, 0, 1.25);
    transform: scale(0.75) translateY(-21px);
    z-index: 9999;
  }
}
.wallet-button.open {
  .list {
    visibility: visible;
    opacity: 1;
    pointer-events: auto;
    transform: scale(1) translateY(0);
  }
  .option:hover {
    background: variables.$primary-color;
    color: #fff;
    padding-left: 24px;
    font-weight: 500;
  }
}
.dark {
  .address {
    background: variables.$dark-background-nav;
    .icon-container {
      background: variables.$custom-icon-container-background;
    }
    .value {
      color: variables.$custom-white-text;
    }
    .custom-icon {
      color: variables.$custom-white-text;
    }
  }
  .list {
    background: variables.$dark-background-nav;
  }
  .option {
    color: variables.$custom-white-text;
  }
}

@media only screen and (max-width: 319px) {
  .option {
    font-size: 12px !important;
  }
  .list {
    width: 220px !important;
  }
}
@media only screen and (min-width: 320px) and (max-width: 479px) {
  .option {
    font-size: 13px !important;
  }
  .list {
    width: 240px !important;
  }
}

@media only screen and (min-width: 480px) and (max-width: 767px) {
  .option {
    font-size: 14px !important;
  }
  .list {
    width: 260px !important;
  }
}
</style>
