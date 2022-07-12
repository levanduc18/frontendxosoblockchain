<template>
  <div
    class="modal fixed top-0 w-screen h-screen bg-custom-background-modal flex flex-row items-center justify-center z-50"
    v-show="isOpenWalletModal"
    :class="{ dark: darkTheme }"
  >
    <div
      class="modal-dialog w-full px-3 xs:px-8 sm:px-0 h-full sm:w-1/3 flex flex-row items-center justify-center"
    >
      <div class="modal-content w-full">
        <div
          class="modal-header flex flex-row justify-between items-center p-1 xs:p-2 sm:p-3 rounded-t-2xl bg-custom-title-modal-background w-full"
        >
          <div
            class="modal-title mx-auto text-xs xs:text-sm sm:text-xl font-semibold w-11/12 text-left"
          >
            {{ $t("message.yourwl") }}
          </div>
          <mdicon
            name="close"
            class="cursor-pointer scale-50 xs:scale-75 sm:scale-100 hover:opacity-60"
            :width="28"
            :height="28"
            @click="handleCloseModal"
          />
        </div>
        <div
          class="modal-footer text-xs xs:text-sm sm:text-base w-full flex flex-col items-center justify-center bg-white px-2 xs:px-4 sm:px-8 pt-1 xs:pt-2 sm:pt-3 pb-1 xs:pb-2 sm:pb-4 rounded-b-2xl"
        >
          <div v-if="network != parseInt(defaultNetwork)" class="w-full">
            <div>
              {{ $t("message.connect-wrong-network") }}
              <br />{{ $t("message.please-switch-BSC") }}
            </div>
            <button
              class="flex flex-row items-center justify-center font-semibold px-3 xs:px-6 py-1 xs:py-2 bg-button-background-primary text-custom-white-text rounded-2xl shadow-3xl hover:opacity-80 w-full mt-6"
              @click="handleSwitchNetwork"
            >
              {{ $t("message.switchnet") }}
            </button>

            <router-link to="/tutorial/get-started/create-wallet">
              <button
                class="flex flex-row items-center justify-center font-semibold px-3 xs:px-6 py-1 xs:py-2 bg-white border-2 border-button-background-primary text-button-background-primary rounded-2xl hover:opacity-80 w-full mt-6"
                @click="setIsOpenWalletModal(false)"
              >
                {{ $t("message.learn-how") }}
                <mdicon
                  name="help-circle-outline"
                  :width="20"
                  :height="20"
                  class="ml-1 scale-50 xs:scale-75 sm:scale-100"
                />
              </button>
            </router-link>
          </div>
          <div v-else class="w-full">
            <div
              class="switch flex flex-row w-full rounded-2xl bg-slate-200 mt-1 items-center"
            >
              <div
                class="wallet-switch px-4 py-2 font-semibold w-1/2 cursor-pointer rounded-2xl"
                :class="{ active: activeSwitchWallet == 0 }"
                @click="setActiveSwitchWallet(0)"
              >
                {{ $t("message.wl") }}
              </div>
              <div
                class="transactions-switch px-4 py-2 font-semibold w-1/2 cursor-pointer rounded-2xl"
                :class="{ active: activeSwitchWallet == 1 }"
                @click="setActiveSwitchWallet(1)"
              >
                {{ $t("message.buy-history") }}
              </div>
            </div>
            <div
              v-if="activeSwitchWallet == 0"
              class="information pt-2 xs:pt-2 sm:pt-3 pb-1 flex flex-col items-end"
            >
              <div
                class="address-title flex flex-row justify-between font-semibold text-custom-purple-title w-full text-left"
              >
                {{ $t("message.youradd") }}
                <div
                  class="copy-alert bg-slate-100 px-4 py-1 rounded-2xl"
                  v-if="views.isViewCopied"
                >
                  {{ $t("message.copy") }}
                </div>
              </div>
              <div
                class="address-value-icon mt-2 w-full overflow-hidden bg-slate-200 rounded-2xl p-2 flex flex-row items-center justify-around"
              >
                <input
                  type="text"
                  class="address-value w-10/12 overflow-hidden text-normal font-bold bg-transparent focus:outline-none"
                  v-model="account"
                />
                <mdicon
                  name="content-copy"
                  :width="18"
                  :height="18"
                  @click="handleCopyAddress"
                  class="copy-icon cursor-pointer scale-50 xs:scale-75 sm:scale-100"
                />
              </div>
              <div
                class="balance flex flex-row mt-3 items-center justify-between mb-3 w-full"
              >
                <div class="balance-title">{{ $t("message.yourbal") }}</div>
                <div class="balance-value font-semibold">
                  {{ USDTAllowanceBalance + " USDT" }}
                </div>
              </div>
              <div class="w-full">
                <div class="flex flex-row">
                  <div class="flex flex-row items-center w-1/2">
                    <ToggleVue
                      activeColor="#9a6aff"
                      class="text-xxxs xs:text-xs sm:text-sm"
                      name="toggle"
                      title=""
                      @toggle="isOpenApprove = !isOpenApprove"
                      :class="{ disablePanel: isOpenRestore }"
                    />
                    <div
                      class="text-slate-400"
                      :class="{ isOpenDeposit: isOpenApprove }"
                    >
                      {{ $t("message.approveUSDT") }}
                    </div>
                  </div>
                  <div class="flex flex-row items-center w-1/2">
                    <ToggleVue
                      activeColor="#9a6aff"
                      class="text-xxxs xs:text-xs sm:text-sm"
                      name="toggle"
                      title=""
                      @toggle="isOpenRestore = !isOpenRestore"
                      :class="{ disablePanel: isOpenApprove }"
                    />
                    <div
                      class="text-slate-400"
                      :class="{ isOpenDeposit: isOpenRestore }"
                    >
                      {{ $t("message.restoreUSDT") }}
                    </div>
                  </div>
                </div>
                <div
                  class="border-2 rounded-2xl p-3 mt-4"
                  :class="{ disablePanel: !isOpenApprove && !isOpenRestore }"
                >
                  <div
                    class="balance flex flex-row items-center justify-between mb-2 w-full"
                    v-if="USDTBalance - USDTAllowanceBalance > 0"
                  >
                    <div class="balance-title">{{ $t("message.hello") }}</div>
                    <div class="balance-value font-semibold">
                      {{
                        Number(USDTBalance - USDTAllowanceBalance).toFixed(2) +
                        " USDT"
                      }}
                    </div>
                  </div>
                  <div v-if="isOpenApprove || isOpenRestore">
                    <div class="choose-amount text-left">
                      {{ $t("message.hi1") }}
                    </div>
                    <div class="flex flex-row mt-1">
                      <div
                        class="input-number bg-slate-200 px-6 py-1 rounded-3xl cursor-pointer hover:opacity-70"
                        @click="balanceToChange = 10"
                      >
                        10
                      </div>
                      <div
                        class="input-number bg-slate-200 px-6 py-1 rounded-3xl cursor-pointer hover:opacity-70 ml-2"
                        @click="balanceToChange = 100"
                      >
                        100
                      </div>
                      <div
                        class="input-number bg-slate-200 px-6 py-1 rounded-3xl cursor-pointer hover:opacity-70 ml-2"
                        @click="balanceToChange = 1000"
                      >
                        1000
                      </div>
                    </div>
                    <div class="flex flex-row items-center mt-4">
                      <div class="flex flex-row justify-start">
                        <input
                          v-model.number="balanceToChange"
                          class="input-number value-number-ticket text-center bg-slate-200 px-1 border-none py-1 rounded-2xl text-normal font-semibold w-full"
                          type="number"
                        />
                      </div>
                      <div
                        class="text-sm text-left ml-2 text-red-800"
                        v-if="balanceToChange > USDTBalance"
                      >
                        {{ $t("message.insuBal") }}
                      </div>
                    </div>
                  </div>
                  <div class="w-1/4">
                    <button
                      class="learn-how-btn flex flex-row items-center justify-center font-semibold px-6 py-1 bg-button-background-primary text-custom-white-text rounded-2xl shadow-3xl hover:opacity-80 w-full mt-6"
                      @click="handleApprove"
                      v-if="isOpenApprove"
                    >
                      {{ $t("message.approve") }}
                    </button>
                    <button
                      class="learn-how-btn flex flex-row items-center justify-center font-semibold px-6 py-1 bg-button-background-primary text-custom-white-text rounded-2xl shadow-3xl hover:opacity-80 w-full mt-6"
                      @click="handleRestore"
                      v-if="isOpenRestore"
                    >
                      {{ $t("message.restore") }}
                    </button>
                  </div>
                </div>
              </div>
              <div class="mt-4">
                <a
                  :href="'https://testnet.bscscan.com/address/' + account"
                  class="view-on-bscscan text-custom-cyan-light"
                  target="_blank"
                >
                  {{ $t("message.viewon") }} BSCScan
                </a>
              </div>

              <div class="w-full">
                <button
                  class="learn-how-btn flex flex-row items-center justify-center font-semibold px-6 py-2 bg-button-background-primary text-custom-white-text rounded-2xl shadow-3xl hover:opacity-80 w-full mt-4"
                  @click="handleLogout"
                >
                  {{ $t("message.disconnectWal") }}
                </button>
              </div>
            </div>
            <div v-else class="recent-transactions pt-0 pb-6">
              <div
                class="recent-transactions-title pt-0 pb-4 font-semibold text-custom-purple-title text-left mt-6"
              >
                {{ $t("message.buy-history").toUpperCase() }}
              </div>

              <div v-if="allTicketsOfUser?.length > 0">
                <perfect-scrollbar class="h-96">
                  <div
                    v-for="(it, id) in allTicketsOfUser.slice().reverse()"
                    :key="id"
                    :class="{ darkCard: darkTheme }"
                    class="w-full bg-slate-100 rounded-2xl px-4 py-2 mt-2 sm:mt-4 flex flex-row relative"
                  >
                    <mdicon
                      name="check"
                      :width="40"
                      :height="40"
                      v-if="it?.winAmount > 0"
                      class="text-green-500 absolute top-0 xs:top-2 right-0 xs:right-4 scale-50 xs:scale-75 sm:scale-100"
                    />
                    <mdicon
                      name="close"
                      :width="40"
                      :height="40"
                      v-if="
                        it?.winAmount == 0 &&
                        it?.lotteryId !== currentLottery?.lotteryID
                      "
                      class="text-red-500 absolute top-0 xs:top-2 right-0 xs:right-4 scale-50 xs:scale-75 sm:scale-100"
                    />
                    <mdicon
                      name="update"
                      title="Pending"
                      :width="40"
                      :height="40"
                      v-if="
                        it?.winAmount == 0 &&
                        it?.lotteryId === currentLottery?.lotteryID &&
                        currentLottery?.lotteryStatus == '0'
                      "
                      class="text-blue-500 absolute top-0 xs:top-2 right-0 xs:right-4 scale-50 xs:scale-75 sm:scale-100"
                    />
                    <img
                      :src="images.ticket"
                      class="h-6 xs:h-8 sm:h-12 -rotate-45"
                    />
                    <div class="flex flex-col ml-4">
                      <div
                        class="round-container flex flex-row items-center font-semibold text-xxs xs:text-sm sm:text-xl"
                      >
                        {{ $t("message.round") }}
                        {{ it?.lotteryId }}
                      </div>

                      <div
                        class="ticket-container w-full flex flex-row items-center"
                      >
                        <div class="flex flex-row items-center">
                          {{ $t("message.num") }}:
                          <div class="ml-1 font-semibold">
                            {{ it?.numbers }}
                          </div>
                        </div>
                        <div class="ml-6 flex flex-row items-center">
                          {{ $t("message.qua") }}:
                          <div class="ml-1 font-semibold">
                            {{ it?.numberOfTickets }}
                          </div>
                        </div>
                      </div>
                      <div class="flex flex-row items-center">
                        {{ $t("message.status") }}:
                        <div
                          class="ml-1 font-semibold"
                          v-if="it?.winAmount > 0"
                        >
                          {{ $t("message.won") }} ${{ it?.winAmount / 1000000 }}
                        </div>
                        <div
                          class="ml-1 font-semibold"
                          v-if="
                            it?.winAmount == 0 &&
                            it?.lotteryId !== currentLottery?.lotteryID
                          "
                        >
                          {{ $t("message.noprize") }}
                        </div>
                        <div
                          class="ml-1 font-semibold"
                          v-if="
                            it?.winAmount == 0 &&
                            it?.lotteryId === currentLottery?.lotteryID &&
                            currentLottery?.lotteryStatus == '0'
                          "
                        >
                          {{ $t("message.pending") }}
                        </div>
                      </div>
                      <div class="flex flex-row items-center">
                        {{ $t("message.boughtat") }}:
                        <div class="ml-1 font-semibold">
                          {{ formatDate(it?.buyAt) }}
                        </div>
                      </div>
                    </div>
                  </div>
                </perfect-scrollbar>
              </div>
              <div v-else class="choose-amount mt-6 opacity-80 pb-8">
                {{ $t("message.nohistory") }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { NETWORK_ID } from "@/constants";
import moment from "moment";
import ToggleVue from "vue-toggle-component";
import { decreaseAllowance, increaseAllowance } from "@/utils/getUSDTContract";
import { switchNetwork } from "@/utils/getWeb3";
export default {
  name: "WalletModal",
  methods: {
    ...mapActions({
      setIsOpenWalletModal: "setIsOpenWalletModal",
      getUSDTBalance: "getUSDTBalance",
      setActiveSwitchWallet: "setActiveSwitchWallet",
      setTicketsByUserAllRound: "setTicketsByUserAllRound",
      setLoader: "setLoader",
      setUSDTAllowanceBalance: "setUSDTAllowanceBalance",
      setIsConnectWallet: "setIsConnectWallet",
    }),
    handleCopyAddress() {
      navigator.clipboard.writeText(this?.account);
      this.views.isViewCopied = true;
      setTimeout(() => {
        this.views.isViewCopied = false;
      }, 1000);
    },
    handleCloseModal() {
      this.setIsOpenWalletModal(false);
    },
    formatDate(data) {
      return data
        ? moment(new Date(data * 1000).toISOString()).format(
            "DD/MM/YYYY, hh:mm A"
          )
        : null;
    },
    async handleSwitchNetwork() {
      this.setLoader({ isLoading: true, type: "switchNetwork" });
      try {
        await switchNetwork();
      } catch (err) {
        console.log(err);
      }
      this.setLoader({ isLoading: false, type: "" });
    },
    handleLogout() {
      localStorage.setItem("isConnectWallet", false);
      this.setIsConnectWallet(false);
      this.setIsOpenWalletModal(false);
    },
    async handleApprove() {
      this.setLoader({ isLoading: true, type: "approve" });
      try {
        await increaseAllowance(
          this?.balanceToChange,
          this?.account,
          this?.speed
        );
        await this.setUSDTAllowanceBalance();
        await this.getUSDTBalance();
      } catch (err) {
        this.setLoader({ isLoading: false, type: "" });
      }
      this.setLoader({ isLoading: false, type: "" });
    },
    async handleRestore() {
      this.setLoader({ isLoading: true, type: "restore" });
      try {
        await decreaseAllowance(
          this?.balanceToChange,
          this?.account,
          this?.speed
        );
        await this.setUSDTAllowanceBalance();
        await this.getUSDTBalance();
      } catch (err) {
        this.setLoader({ isLoading: false, type: "" });
      }
      this.setLoader({ isLoading: false, type: "" });
    },
  },
  data() {
    return {
      views: {
        isViewCopied: false,
      },
      balanceToChange: 0,
      isOpenApprove: false,
      isOpenRestore: false,
      defaultNetwork: NETWORK_ID,
      images: {
        ticket: require("@/assets/images/ticket.png"),
      },
      allTicketsOfUser: null,
    };
  },
  computed: {
    ...mapState([
      "USDTBalance",
      "account",
      "network",
      "isOpenWalletModal",
      "darkTheme",
      "activeSwitchWallet",
      "tickets",
      "ticketsAllRound",
      "currentLottery",
      "USDTAllowanceBalance",
      "speed",
    ]),
    activeSwitch() {
      return this.activeSwitchWallet;
    },
  },
  watch: {
    isOpenWalletModal() {
      if (this.isOpenWalletModal) {
        document.body.style.overflow = "hidden";
        this.getUSDTBalance(this?.account);
        this.setUSDTAllowanceBalance();
        this.amount = 0;
      } else document.body.style.overflow = "auto";
    },
    ticketsAllRound() {
      let ticketsAllRoundUser = [];
      for (let i = 0; i < this?.ticketsAllRound.length; i++) {
        for (let j = 0; j < this?.ticketsAllRound[i].length; j++) {
          ticketsAllRoundUser.push(this?.ticketsAllRound[i][j]);
        }
      }
      this.allTicketsOfUser = ticketsAllRoundUser;
    },
    activeSwitchWallet() {
      if (this.activeSwitchWallet == 1)
        this.setTicketsByUserAllRound(this?.account);
    },
  },
  async mounted() {
    const ticketsAllRound = await this.setTicketsByUserAllRound(this?.account);
    this.setTicketsByUserAllRound(ticketsAllRound);
  },
  components: { ToggleVue },
};
</script>

<style lang="scss" scoped>
@use "@/assets/css/variables";
.active {
  background-color: #27262c;
  color: #fff;
}
.dark {
  .round-container {
    color: variables.$primary-color;
  }
  .input-number {
    color: variables.$primary-text-color;
  }
  .address-value {
    color: variables.$primary-text-color;
  }
  .copy-icon {
    color: variables.$primary-text-color;
  }
  .choose-amount {
    color: variables.$custom-white-text;
  }
  .modal-dialog {
    .modal-content {
      .modal-header {
        background: variables.$custom-background-modal-dark;
        color: variables.$custom-white-text;
      }
      .modal-footer {
        background: variables.$dark-background-nav;
        .learn-how {
          background: variables.$custom-switch-dark-background;
        }
        .switch {
          background: variables.$custom-switch-dark-background;
          color: variables.$custom-white-text;
          .active {
            background-color: #fff;
            color: #27262c;
          }
        }
        .information {
          .balance {
            color: variables.$custom-white-text;
          }
        }
      }
    }
  }
  .isOpenDeposit {
    color: variables.$custom-white-text;
  }
}

.isOpenDeposit {
  color: variables.$primary-text-color;
  font-weight: 600;
}
.value-number-ticket::-webkit-inner-spin-button,
.value-number-ticket::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.disableButton {
  cursor: not-allowed;
  background-color: rgb(229, 229, 229);
}

.disablePanel {
  opacity: 50%;
  cursor: not-allowed;
  pointer-events: none;
}

.darkCard {
  background: rgb(80, 80, 80);
}
</style>
