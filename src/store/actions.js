import { checkInstallMetaMask, getBalance, getNetwork } from "@/utils/getWeb3";
import {
  getBasicLottoInfo,
  getCurrentLottoInfo,
} from "@/utils/getLotteryContract";
import { getUSDTBalance } from "@/utils/getUSDTContract";
import "@/utils/getTicketContract";
import { getUserTicketsAllRound } from "@/utils/getTicketContract";

export default {
  checkInstallMetaMask({ commit }) {
    commit("setIsInstallMetaMask", Boolean(checkInstallMetaMask));
  },

  async setWeb3({ commit }) {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    if (accounts.length > 0) {
      window.ethereum.on("accountsChanged", function (accounts) {
        commit("setAccount", accounts[0]);
        if (accounts.length == 0) {
          commit("setConnectWallet", false);
          localStorage.setItem("isConnectWallet", false);
        }
      });
      window.ethereum.on("chainChanged", function (networkId) {
        commit("setNetwork", networkId);
      });
      commit("setAccount", accounts[0]);
    } else {
      commit("setConnectWallet", false);
      localStorage.setItem("isConnectWallet", false);
    }
  },

  async getBalance({ commit, state }) {
    const { account } = state;
    const balance = await getBalance(account);
    commit("setBalance", balance);
  },

  async getUSDTBalance({ commit, state }) {
    const { account } = state;
    const USDTBalance = await getUSDTBalance(account);
    commit("setUSDTBalance", USDTBalance);
  },

  async getNetwork({ commit }) {
    const networkId = await getNetwork();
    commit("setNetwork", networkId);
  },

  setIsConnectWallet({ commit }, payload) {
    commit("setConnectWallet", payload);
  },

  setIsOpenWalletModal({ commit }, payload) {
    commit("setIsOpenWalletModal", payload);
  },

  setIsOpenBuyTicketModal({ commit }, payload) {
    commit("setIsOpenBuyTicketModal", payload);
  },

  setDarkTheme({ commit }, payload) {
    commit("setDarkTheme", payload);
  },

  setNotifications({ commit }, payload) {
    commit("setNotifications", payload);
  },

  async setCurrentLottery({ commit }) {
    let currentLottery = await getCurrentLottoInfo();
    commit("setCurrentLottery", currentLottery);
  },

  setIsOpenSnackBar({ commit }, payload) {
    commit("setIsOpenSnackBar", payload);
  },

  setTypeSnackBar({ commit }, payload) {
    commit("setTypeSnackBar", payload);
  },

  setMessageSnackBar({ commit }, payload) {
    commit("setMessageSnackBar", payload);
  },

  getTicketsByUser({ commit }, payload) {
    commit("getTicketsByUser", payload);
  },

  setIsOpenTicketsModal({ commit }, payload) {
    commit("setIsOpenTicketsModal", payload);
  },

  async setTemperatureLottery({ commit }, payload) {
    let temperatureLottery = await getBasicLottoInfo(payload);
    commit("setTemperatureLottery", temperatureLottery);
  },

  async setTicketsByUserAllRound({ commit }, payload) {
    let tickets = await getUserTicketsAllRound(payload);
    commit("setTicketsByUserAllRound", tickets);
  },

  setIsOpenCongratulationModal({ commit }, payload) {
    commit("setIsOpenCongratulationModal", payload);
  },

  setActiveSwitchWallet({ commit }, payload) {
    commit("setActiveSwitchWallet", payload);
  },
};
