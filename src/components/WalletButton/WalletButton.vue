<template>
  <div v-if="!network">
    <img :src="loadingSVG" :height="42" :width="42" />
  </div>
  <div
    v-else
    @click="handleOpen"
    class="wallet-button h-10 pr-2 relative text-left z-50 leading-10 box-border select-none block cursor-pointer float-left text-sm font-normal w-36"
    :class="{ open: views.isOpenWalletButton, dark: darkTheme }"
  >
    <div
      class="address bg-zinc-50 rounded-full box-border h-10 w-36 flex flex-row items-center justify-center border border-gray-300"
    >
      <div
        class="icon-container w-10 h-10 rounded-full box-border flex flex-row items-center justify-center absolute top-0 left-0"
        v-if="network == parseInt(defaultNetwork)"
        style="border: 4px rgb(31, 199, 212) solid !important"
      >
        <mdicon
          name="wallet"
          class="text-custom-cyan-light"
          :width="18"
          :height="18"
        />
      </div>
      <div
        class="icon-container w-10 h-10 rounded-full box-border flex flex-row items-center justify-center absolute top-0 left-0"
        v-else
        style="border: 4px rgb(237, 75, 158) solid !important"
      >
        <mdicon
          name="alert"
          :width="18"
          :height="18"
          class="text-custom-pink-text"
        />
      </div>
      <div
        class="value font-bold ml-8 mr-1 text-normal"
        v-if="network == parseInt(defaultNetwork)"
      >
        {{ address }}
      </div>
      <div class="value font-bold ml-8 mr-1 text-normal" v-else>Network</div>
      <mdicon
        name="chevron-down"
        class="custom-icon"
        :width="18"
        :height="18"
      />
    </div>
    <ul class="list">
      <li class="option" @click="handleOpenWalletModel(0)">
        {{ $t("message.wallet") }}
        <mdicon
          v-if="network != parseInt(defaultNetwork)"
          name="alert"
          :width="18"
          :height="18"
        />
      </li>
      <li class="option" @click="handleOpenWalletModel(1)">
        {{ $t("message.transactions") }}
      </li>
      <li class="option" @click="handleLogout">
        {{ $t("message.disconnect") }}
        <mdicon name="logout-variant" :width="18" :height="18" />
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
        this.account.slice(0, 2) +
        "..." +
        this.account.slice(this.account.length - 4, this.account.length)
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
    justify-content: space-between;
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
</style>
