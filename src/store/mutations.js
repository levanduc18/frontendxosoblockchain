export default {
  setIsInstallMetaMask(state, payload) {
    state.isInstallMetaMask = payload;
  },
  setAccount(state, payload) {
    state.account = payload;
  },
  setBalance(state, payload) {
    state.balance = payload;
  },
  setUSDTBalance(state, payload) {
    state.USDTBalance = payload;
  },
  setNetwork(state, payload) {
    state.network = payload;
  },
  setConnectWallet(state, payload) {
    state.isConnectWallet = payload;
  },
  setIsOpenWalletModal(state, payload) {
    state.isOpenWalletModal = payload;
  },
  setIsOpenBuyTicketModal(state, payload) {
    state.isOpenBuyTicketModal = payload;
  },
  setDarkTheme(state, payload) {
    state.darkTheme = payload;
  },
  setNotifications(state, payload) {
    state.notifications = payload;
  },
  setCurrentLottery(state, payload) {
    state.currentLottery = payload;
  },
  setIsOpenSnackBar(state, payload) {
    state.isOpenSnackBar = payload;
  },
  setTypeSnackBar(state, payload) {
    state.typeSnackBar = payload;
  },
  setMessageSnackBar(state, payload) {
    state.messageSnackBar = payload;
  },
  getTicketsByUser(state, payload) {
    state.tickets = payload;
  },
  setIsOpenTicketsModal(state, payload) {
    state.isOpenTicketsModal = payload;
  },
  setTemperatureLottery(state, payload) {
    state.temperatureLottery = payload;
  },
  setTicketsByUserAllRound(state, payload) {
    state.ticketsAllRound = payload;
  },
  setIsOpenCongratulationModal(state, payload) {
    state.isOpenCongratulationModal = payload;
  },
  setActiveSwitchWallet(state, payload) {
    state.activeSwitchWallet = payload;
  },
  setLoader(state, payload) {
    state.loader = payload;
  },
  setUSDTAllowanceBalance(state, payload) {
    state.USDTAllowanceBalance = payload;
  },
  setSpeed(state, payload) {
    state.speed = payload;
  },
  setIsOpenSettingModal(state, payload) {
    state.isOpenSettingModal = payload;
  },
};
