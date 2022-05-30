<template>
  <div
    class="fixed top-0 w-screen h-screen bg-custom-background-modal flex flex-row items-center justify-center z-30"
    v-show="isOpenBuyTicketModal"
    :class="{ dark: darkTheme }"
  >
    <div class="modal-dialog w-1/4 mt-32">
      <div class="modal-content">
        <div
          class="modal-header flex flex-row justify-between items-center px-6 py-4 rounded-t-2xl bg-custom-title-modal-background text-xl font-semibold"
        >
          <h5 class="modal-title">Buy Tickets</h5>
          <mdicon
            name="close"
            :width="28"
            :height="28"
            @click="handleCloseModal"
            class="cursor-pointer hover:opacity-60"
          />
        </div>
        <div
          class="modal-footer flex flex-col bg-white p-8 rounded-b-2xl text-lg"
        >
          <div v-if="network != parseInt(defaultNetwork)" class="w-full">
            <div>
              You're connected to the wrong network.
              <br />Please switch to Polygon!
            </div>
            <button
              class="flex flex-row items-center justify-center font-semibold px-6 py-2 bg-button-background-primary text-custom-white-text rounded-2xl shadow-3xl hover:opacity-80 w-full mt-6"
            >
              Learn How <mdicon name="help-circle" :width="20" :height="20" />
            </button>
          </div>
          <div v-else class="buy-ticket-container w-full">
            <div
              class="ticket-number w-full rounded-2xl flex flex-col items-center justify-center mt-1"
            >
              <div class="number-container w-full">
                <div class="font-semibold">Ticket number</div>
                <div
                  class="value bg-custom-number-text bg-clip-text font-semibold text-6xl leading-relaxed"
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
                    Random
                  </div>
                  <div
                    class="transactions-switch px-4 py-1 font-semibold w-1/2 cursor-pointer rounded-2xl"
                    :class="{ active: views.activeSwitch == 1 }"
                    @click="views.activeSwitch = 1"
                  >
                    Customize
                  </div>
                </div>
                <div v-if="views.activeSwitch == 0" class="mt-3">
                  <div class="text-sm">
                    Click this button below to randomize the number
                  </div>
                  <button
                    class="bg-custom-cyan-light text-white rounded-2xl px-3 py-1 shadow-3xl mt-2"
                    @click="handleRandomNumber"
                  >
                    Random
                  </button>
                </div>
                <div v-else class="mt-3">
                  <div
                    class="input text-sm font-light"
                    :class="{ error: isErrorTicketNumber }"
                  >
                    Please enter your number from 0 to 99 below
                  </div>
                  <input
                    v-model.number="ticketNumber"
                    class="value-number-ticket text-center bg-slate-200 px-1 border-none py-1 rounded-2xl text-normal font-semibold w-20 mt-2"
                    :class="{ errorInput: isErrorTicketNumber }"
                    type="number"
                  />
                </div>
              </div>
              <div
                class="value-container w-full flex flex-row items-center mt-4 justify-between"
              >
                <div>Number of tickets</div>
                <div class="flex flex-row items-center">
                  <div
                    class="icon-container cursor-pointer select-none"
                    style="font-size: 28px"
                    @click="numberTicket--"
                  >
                    -
                  </div>
                  <input
                    class="value-number-ticket mx-2 bg-slate-200 rounded-2xl border-none h-8 w-16 text-center font-bold"
                    v-model.number="numberTicket"
                    :class="{ errorInput: isErrorNumberTicket }"
                  />
                  <div
                    class="icon-container cursor-pointer select-none"
                    style="font-size: 28px"
                    @click="numberTicket++"
                  >
                    +
                  </div>
                </div>
              </div>
              <div
                v-if="isErrorNumberTicket"
                class="text-sm mt-1 text-right w-full font-light"
                :class="{ error: isErrorNumberTicket }"
              >
                You only choose from 1 to 9
              </div>
              <div
                class="exchange mb-4 flex flex-row justify-between w-full items-center mt-2"
              >
                <div class="title">Cost</div>
                <div class="value-cost">~ {{ cost }} $</div>
              </div>
            </div>
            <TheDivider />
            <div
              class="exchange flex flex-row justify-between w-full items-center mt-2"
              :class="{ error: isNotEnoughBalance }"
            >
              <div class="title">Remaining Balance</div>
              <div class="value-cost">~ {{ remainBalance }}$</div>
            </div>
            <div
              v-if="isNotEnoughBalance"
              class="text-sm text-right font-light"
              :class="{ error: isNotEnoughBalance }"
            >
              You are not enough balance to pay
            </div>
            <button
              class="btn-buy-tickets bg-custom-cyan-light text-white rounded-2xl py-2 shadow-3xl mt-4 w-full"
              :class="{ disabled: !isEnableBuyButton }"
              @click="handleBuyTicket"
            >
              Buy
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
import { approve } from "@/utils/getUSDTContract";
import { buyTickets, costToBuyTickets } from "@/utils/getLotteryContract";

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
    addNotification: async function (data) {
      if (data.address == this.account)
        await this.getNotifications(this?.account);
    },
  },
  methods: {
    ...mapActions({
      setIsOpenBuyTicketModal: "setIsOpenBuyTicketModal",
      setCurrentLottery: "setCurrentLottery",
      getUSDTBalance: "getUSDTBalance",
      setNotifications: "setNotifications",
    }),
    addNotification(data) {
      this.$socket.emit("addNotification", data);
    },
    getNotifications(data) {
      this.$socket.emit("getNotifications", data);
    },
    handleCloseModal() {
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
      try {
        await approve(this?.cost, this?.account);
        await buyTickets(
          this.currentLottery?.lotteryID,
          this.numberTicket,
          this.ticketNumber,
          this.account
        );
        await this.addNotification({
          address: this?.account,
          type: "buyTicket",
          ticketNumber: this.ticketNumber,
          numberOfTickets: this.numberTicket,
          round: this.currentLottery?.lotteryID,
        });
      } catch (err) {
        console.log(err);
      }
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
      "USDTBalance",
      "darkTheme",
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
      return this.USDTBalance - this.cost;
    },
    isNotEnoughBalance() {
      return this.remainBalance < 0;
    },
  },
  watch: {
    isOpenBuyTicketModal() {
      if (this.isOpenBuyTicketModal) {
        this.handleRandomNumber();
        document.body.style.overflow = "hidden";
        this.getUSDTBalance(this.account);
      } else document.body.style.overflow = "auto";
    },
    ticketNumber() {
      if (
        this.ticketNumber < 0 ||
        this.ticketNumber > 99 ||
        this.ticketNumber == "" ||
        typeof this.ticketNumber == "string"
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
