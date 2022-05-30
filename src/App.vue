<template>
  <Navbar />
  <router-view />
  <TheFooter />
  <CongratulationModal />
</template>

<script>
import Navbar from "@/components/NavigationBar/NavigationBar.vue";
import TheFooter from "./components/TheFooter/TheFooter.vue";
import { getUserTickets } from "@/utils/getTicketContract";
import { mapActions, mapState } from "vuex";
import { connectMetaMask, switchNetwork } from "./utils/getWeb3";
import CongratulationModal from "./components/CongratulationModal/CongratulationModal.vue";

export default {
  name: "App",
  components: { Navbar, TheFooter, CongratulationModal },
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
  },
  sockets: {
    connect: function () {
      console.log("socket to notification channel connected");
    },
    getNotifications: function (data) {
      this.setNotifications(data);
    },
    addNotification: async function (data) {
      if (data.address == this.account)
        await this.getNotifications(this?.account);
    },
  },
  async created() {
    await this.checkInstallMetaMask();
    await connectMetaMask();
    await switchNetwork();
    await this.setWeb3();
    await this.getBalance();
    await this.getUSDTBalance();
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
    await this.addUser(this?.account);
    await this.getNotifications(this?.account);
    await this.setTicketsByUserAllRound(this?.account);
  },
  watch: {
    currentLottery(newVal, oldVal) {
      if (oldVal?.lotteryStatus == "1" && newVal?.lotteryStatus == "2")
        this.setIsOpenCongratulationModal(true);
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
    }),
    addUser(data) {
      this.$socket.emit("addUser", data);
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
