<template>
  <Navbar />
  <router-view />
  <TheFooter />
  <CongratulationModal />
  <LoaderVue />
  <SettingModal />
  <DrawerVue />
</template>

<script>
import Navbar from "@/components/NavigationBar/NavigationBar.vue";
import TheFooter from "./components/TheFooter/TheFooter.vue";
import { getUserTickets } from "@/utils/getTicketContract";
import { mapActions, mapState } from "vuex";
import { switchNetwork } from "./utils/getWeb3";
import CongratulationModal from "./components/CongratulationModal/CongratulationModal.vue";
import LoaderVue from "./components/LoaderVue/LoaderVue.vue";
import SettingModal from "./components/SettingModal/SettingModal.vue";
import DrawerVue from "./components/DrawerVue/DrawerVue.vue";

export default {
  name: "App",
  components: {
    Navbar,
    TheFooter,
    CongratulationModal,
    LoaderVue,
    SettingModal,
    DrawerVue,
  },
  head: {
    link: [
      {
        rel: "icon",
        href: require("./assets/images/penguin.png"),
      },
    ],
  },
  data() {
    return {};
  },
  beforeMount() {
    const speed = localStorage.getItem("speed");
    if (speed) {
      this.setSpeed(speed);
    } else {
      localStorage.setItem("speed", "medium");
    }
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
      "speed",
    ]),
  },
  sockets: {
    connection: function () {
      console.log("socket to notification channel connected");
    },
    notifications: function (data) {
      console.log(data);
      this.setNotifications(data);
    },
    addNotification: async function (data) {
      if (data.address == this?.account)
        await this.getNotifications(this?.account);
    },
  },
  async created() {
    try {
      await this.checkInstallMetaMask();
      const isUnlocked = await window?.ethereum?._metamask.isUnlocked();
      this.setIsConnectWallet(isUnlocked);

      if (localStorage.getItem("isConnectWallet") && isUnlocked) {
        await this.setWeb3();
        await this.getUSDTBalance();
        await this.setUSDTAllowanceBalance();
        await this.getNetwork();
      }
    } catch (err) {
      console.log(err);
    }
  },
  watch: {
    async isConnectWallet() {
      if (this.isConnectWallet) {
        await this.setWeb3();
        await this.getUSDTBalance();
        await this.setUSDTAllowanceBalance();
        await this.getNetwork();
        await this.setCurrentLottery();

        if (this.currentLottery?.lotteryStatus == "2")
          await this.setTemperatureLottery(
            String(Number(this.currentLottery?.lotteryID))
          );
        else
          await this.setTemperatureLottery(
            String(Number(this.currentLottery?.lotteryID) - 1)
          );
        await getUserTickets(this.currentLottery?.lotteryID, this?.account);
        await this.join(this?.account);
        await this.getNotifications(this?.account);
        await this.setTicketsByUserAllRound(this?.account);
      }
    },
    currentLottery(newVal, oldVal) {
      if (oldVal?.lotteryStatus == "1" && newVal?.lotteryStatus == "2")
        this.setIsOpenCongratulationModal(true);
    },
    async account() {
      try {
        await this.setWeb3();
        await this.getBalance();
        await this.getUSDTBalance();
        await this.setUSDTAllowanceBalance();
        await this.getNetwork();
        await this.setCurrentLottery();
        await switchNetwork();
        this.$socket.emit("join", this?.account);
        if (this.currentLottery?.lotteryStatus == "2")
          await this.setTemperatureLottery(
            String(Number(this.currentLottery?.lotteryID))
          );
        else
          await this.setTemperatureLottery(
            String(Number(this.currentLottery?.lotteryID) - 1)
          );
        await getUserTickets(this.currentLottery?.lotteryID, this?.account);
        await this.getNotifications(this?.account);
        await this.setTicketsByUserAllRound(this?.account);
      } catch (err) {
        console.log(err);
      }
    },
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
      setTemperatureLottery: "setTemperatureLottery",
      setNotifications: "setNotifications",
      setTicketsByUserAllRound: "setTicketsByUserAllRound",
      setIsOpenCongratulationModal: "setIsOpenCongratulationModal",
      setUSDTAllowanceBalance: "setUSDTAllowanceBalance",
      setSpeed: "setSpeed",
    }),
    join(data) {
      this.$socket.emit("join", data);
    },

    addNotification(data) {
      this.$socket.emit("addNotification", data);
    },
    getNotifications(data) {
      this.$socket.emit("getNotifications", data);
    },
  },
};
</script>
