import { createStore } from "vuex";
import mutations from "./mutations";
import actions from "./actions";

export default createStore({
  state: {
    isInstallMetaMask: null,
    account: null,
    balance: null,
    network: null,
    USDTBalance: null,
    isConnectWallet: null,
    isOpenWalletModal: false,
    isOpenBuyTicketModal: false,
    darkTheme: null,
    currentLottery: null,
    isOpenSnackBar: false,
    typeSnackBar: "",
    messageSnackBar: "",
    tickets: null,
    isOpenTicketsModal: false,
    temperatureLottery: null,
    notifications: null,
    loading: "",
    isOpenCongratulationModal: false,
    activeSwitchWallet: null,
  },
  mutations: mutations,
  actions: actions,
});
