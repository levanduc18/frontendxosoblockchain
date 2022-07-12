<template>
  <div
    class="fixed top-0 w-screen h-screen bg-custom-background-modal flex flex-row items-center justify-center z-50"
    v-show="isOpenBuyTicketModal"
    :class="{ dark: darkTheme }"
  >
    <div
      class="modal-dialog px-4 xs:px-8 sm:px-0 w-full sm:w-1/3 h-full flex flex-row items-center justify-center"
    >
      <div class="modal-content">
        <div
          class="modal-header flex flex-row justify-between items-center px-3 xs:px-4 sm:px-6 py-2 sm:py-4 rounded-t-2xl bg-custom-title-modal-background text-sm sm:text-xl font-semibold"
        >
          <h5 class="modal-title text-xs xs:text-base sm:text-xl">
            {{ $t("message.buy-tickets") }}
          </h5>
          <mdicon
            name="close"
            :width="28"
            :height="28"
            @click="handleCloseModal"
            class="cursor-pointer hover:opacity-60 scale-50 xs:scale-75 sm:scale-100"
          />
        </div>
        <div
          class="modal-footer flex flex-col bg-white p-8 rounded-b-2xl text-xxs xs:text-sm sm:text-lg"
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
                @click="setIsOpenBuyTicketModal(false)"
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
          <div v-else class="buy-ticket-container w-full">
            <div
              class="ticket-number w-full rounded-2xl flex flex-col items-center justify-center mt-1"
            >
              <div class="number-container w-full">
                <div class="font-semibold">
                  {{ $t("message.ticket-number") }}
                </div>
                <div
                  class="value bg-custom-number-text bg-clip-text font-semibold text-xl xs:text-3xl sm:text-6xl leading-relaxed"
                >
                  {{ ticketNumber }}
                </div>
                <div
                  class="switch flex flex-row w-full rounded-2xl bg-slate-200 mt-1 items-center"
                >
                  <div
                    class="wallet-switch px-4 py-1 font-semibold w-1/2 cursor-pointer rounded-2xl"
                    :class="{ active: views.activeSwitch == 0 }"
                    @click="views.activeSwitch = 0"
                  >
                    {{ $t("message.random") }}
                  </div>
                  <div
                    class="transactions-switch px-4 py-1 font-semibold w-1/2 cursor-pointer rounded-2xl"
                    :class="{ active: views.activeSwitch == 1 }"
                    @click="views.activeSwitch = 1"
                  >
                    {{ $t("message.customize") }}
                  </div>
                </div>
                <div v-if="views.activeSwitch == 0" class="mt-3">
                  <div>{{ $t("message.hintRandom") }}</div>
                  <button
                    class="bg-custom-cyan-light text-white rounded-2xl px-3 py-1 shadow-3xl mt-2"
                    @click="handleRandomNumber"
                  >
                    {{ $t("message.random") }}
                  </button>
                </div>
                <div v-else class="mt-3">
                  <div
                    class="input font-light"
                    :class="{ error: isErrorTicketNumber }"
                  >
                    {{ $t("message.hintEnterTicketNum") }}
                  </div>
                  <input
                    v-model.number="ticketNumber"
                    class="value-number-ticket text-center bg-slate-200 px-1 border-none py-1 rounded-2xl text-normal font-semibold w-1/2 mt-2"
                    :class="{ errorInput: isErrorTicketNumber }"
                    type="number"
                  />
                </div>
              </div>
              <div
                class="value-container w-full flex flex-row items-center mt-4 justify-between"
              >
                <div>{{ $t("message.numTicket") }}</div>
                <div class="flex flex-row items-center">
                  <div
                    class="icon-container cursor-pointer select-none text-lg xs:text-3xl sm:text-5xl"
                    @click="handleDecreaseNumber"
                  >
                    -
                  </div>
                  <input
                    class="value-number-ticket mx-2 bg-slate-200 rounded-2xl border-none h-4 xs:h-6 sm:h-8 w-8 xs:w-12 sm:w-16 text-center font-bold"
                    v-model.number="numberTicket"
                    :class="{ errorInput: isErrorNumberTicket }"
                  />
                  <div
                    class="icon-container cursor-pointer select-none text-lg xs:text-3xl sm:text-5xl"
                    @click="handleIncreaseNumber"
                  >
                    +
                  </div>
                </div>
              </div>
              <div
                v-if="isErrorNumberTicket"
                class="mt-1 text-right w-full font-light"
                :class="{ error: isErrorNumberTicket }"
              >
                {{ $t("message.numTicketErr") }}
              </div>
              <div
                class="exchange mb-4 flex flex-row justify-between w-full items-center mt-2"
              >
                <div class="title">{{ $t("message.cost") }}</div>
                <div class="value-cost">~ {{ cost + " USDT" }}</div>
              </div>
            </div>
            <TheDivider />
            <div class="text-sm" v-if="USDTBalance - USDTAllowanceBalance > 0">
              {{ $t("message.foundYouHave") }}
              {{ Number(USDTBalance - USDTAllowanceBalance).toFixed(2) }}
              {{ $t("message.usdt1") }}
              <span
                class="cursor-pointer hover:underline text-custom-cyan-light"
                @click="handleOpenWalletModel(0)"
              >
                <b>{{ $t("message.here") }}</b>
              </span>
              {{ $t("message.approveIt") }}
            </div>
            <div
              class="exchange flex flex-row justify-between w-full items-center mt-2"
              :class="{ error: isNotEnoughBalance }"
            >
              <div class="title">{{ $t("message.remainingBal") }}</div>
              <div class="value-cost">~ {{ remainBalance + " USDT" }}</div>
            </div>
            <div
              v-if="isNotEnoughBalance"
              class="text-right font-light"
              :class="{ error: isNotEnoughBalance }"
            >
              {{ $t("message.payErr") }}
            </div>
            <button
              class="btn-buy-tickets bg-custom-cyan-light text-white rounded-2xl py-2 shadow-3xl mt-4 w-full"
              :class="{ disabled: !isEnableBuyButton }"
              @click="handleBuyTicket"
            >
              {{ $t("message.buy") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import TheDivider from "@/components/TheDivider/TheDivider.vue";
import { NETWORK_ID } from "@/constants";
import { buyTickets, costToBuyTickets } from "@/utils/getLotteryContract";
import { switchNetwork } from "@/utils/getWeb3";

export default {
  name: "BuyTicketModal",
  data() {
    return {
      images: { ticket: require("@/assets/images/tag.png") },
      numberTicket: 1,
      ticketNumber: 1,
      defaultNetwork: NETWORK_ID,
      isErrorTicketNumber: false,
      isErrorNumberTicket: false,
      views: {
        activeSwitch: 0,
      },
      isRandomized: false,
      cost: 0,
    };
  },
  sockets: {
    getNotifications: function (data) {
      this.setNotifications(data);
    },
  },
  methods: {
    ...mapActions({
      setIsOpenBuyTicketModal: "setIsOpenBuyTicketModal",
      setCurrentLottery: "setCurrentLottery",
      getUSDTBalance: "getUSDTBalance",
      setNotifications: "setNotifications",
      setLoader: "setLoader",
      setUSDTAllowanceBalance: "setUSDTAllowanceBalance",
      setIsOpenWalletModal: "setIsOpenWalletModal",
      setActiveSwitchWallet: "setActiveSwitchWallet",
      setIsOpenSnackBar: "setIsOpenSnackBar",
      setTypeSnackBar: "setTypeSnackBar",
      setMessageSnackBar: "setMessageSnackBar",
    }),
    handleIncreaseNumber() {
      if (this.numberTicket > 0 && this.numberTicket < 9) this.numberTicket++;
    },
    handleDecreaseNumber() {
      if (this.numberTicket > 1 && this.numberTicket <= 9) this.numberTicket--;
    },
    getNotifications(data) {
      this.$socket.emit("getNotifications", data);
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
    handleCloseModal() {
      this.setIsOpenBuyTicketModal(false);
      this.numberTicket = 1;
      this.ticketNumber = 1;

      this.isErrorTicketNumber = false;
      this.isErrorNumberTicket = false;

      this.isRandomized = false;
      this.cost = 0;
      this.views.activeSwitch = 0;
    },
    handleOpenWalletModel(switchValue) {
      this.setIsOpenWalletModal(true);
      this.setActiveSwitchWallet(switchValue);
      this.setIsOpenBuyTicketModal(false);
    },
    handleRandomNumber() {
      this.isRandomized = false;
      let interval = setInterval(() => {
        this.ticketNumber = Math.floor(Math.random() * 100);
      }, 15);
      setTimeout(() => {
        clearInterval(interval);
        this.isRandomized = true;
      }, 1500);
    },
    async handleBuyTicket() {
      this.setLoader({ isLoading: true, type: "BuyTicket" });
      try {
        await buyTickets(
          this.currentLottery?.lotteryID,
          this.numberTicket,
          this.ticketNumber,
          this?.account,
          this?.speed
        );
      } catch (err) {
        console.log(err);
      }
      this.setLoader({ isLoading: false, type: "" });

      this.setUSDTAllowanceBalance();
    },
    async calculateCost() {
      const calculatedCost = await costToBuyTickets(
        this.currentLottery?.lotteryID,
        this.numberTicket
      );
      this.cost = calculatedCost;
    },
  },
  computed: {
    ...mapState([
      "balance",
      "account",
      "network",
      "isOpenBuyTicketModal",
      "currentLottery",
      "USDTAllowanceBalance",
      "USDTBalance",
      "darkTheme",
      "speed",
    ]),
    isEnableBuyButton() {
      return (
        this.isRandomized &&
        !this.isErrorTicketNumber &&
        !this.isErrorNumberTicket &&
        !this.isNotEnoughBalance
      );
    },
    remainBalance() {
      return this.USDTAllowanceBalance - this.cost;
    },
    isNotEnoughBalance() {
      return this.remainBalance < 0;
    },
  },
  watch: {
    isOpenBuyTicketModal() {
      if (this.isOpenBuyTicketModal) {
        this.handleRandomNumber();
        this.calculateCost();
        document.body.style.overflow = "hidden";
        this.getUSDTBalance();
        this.setUSDTAllowanceBalance();
      } else document.body.style.overflow = "auto";
    },
    ticketNumber() {
      if (
        this.ticketNumber < 0 ||
        this.ticketNumber > 99 ||
        this.ticketNumber === ""
      ) {
        this.isErrorTicketNumber = true;
        if (this.ticketNumber < 0 && this.ticketNumber != "")
          this.ticketNumber = 0;

        if (typeof this.ticketNumber == "string") this.ticketNumber = "";
        if (String(this.ticketNumber).length > 2) this.ticketNumber = 99;
      } else this.isErrorTicketNumber = false;
    },
    numberTicket() {
      this.calculateCost();
      if (
        this.numberTicket < 1 ||
        this.numberTicket > 9 ||
        this.numberTicket == "" ||
        typeof this.numberTicket == "string"
      ) {
        this.isErrorNumberTicket = true;
        if (this.numberTicket < 1 && this.numberTicket != "")
          this.numberTicket = 1;
        if (typeof this.numberTicket == "string") this.numberTicket = "";
        if (String(this.numberTicket).length > 1) this.numberTicket = 9;
      } else this.isErrorNumberTicket = false;
    },
  },
  async mounted() {
    await this.setCurrentLottery();
    await this.calculateCost();
  },
  components: { TheDivider },
};
</script>

<style lang="scss" scoped>
@use "@/assets/css/variables";
.value-number-ticket::-webkit-inner-spin-button,
.value-number-ticket::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.value {
  -webkit-text-fill-color: transparent;
}

.active {
  background-color: variables.$background-purple-bold;
  color: #fff;
}
.error {
  color: #f44336;
}
.errorInput {
  border: #f44336 1px solid !important;
  color: #f44336;
}
.isErrorTicketNumber {
  border: #f44336 1px solid !important;
  color: #f44336;
}
.input.isErrorTicketNumber:active {
  border: #f44336 1px solid !important;
}
.disabled {
  cursor: not-allowed;
  background-color: rgb(229, 229, 229);
}
.dark {
  .modal-dialog {
    .modal-content {
      .modal-header {
        background: variables.$custom-background-modal-dark;
        color: variables.$custom-white-text;
      }
      .modal-footer {
        background: variables.$dark-background-nav;
        color: variables.$custom-white-text;
        .buy-ticket-container {
          .ticket-number {
            .switch {
              background: variables.$custom-switch-dark-background;
              color: variables.$custom-white-text;
              .active {
                background-color: #fff;
                color: #27262c;
              }
            }
            .value-number-ticket {
              color: #27262c;
            }
          }
        }
      }
    }
  }
}
</style>
