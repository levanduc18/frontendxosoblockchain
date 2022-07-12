<template>
  <div
    class="modal fixed top-0 w-screen h-screen bg-custom-background-modal flex flex-row items-center justify-center z-50"
    v-show="isOpenTicketsModal"
    :class="{ dark: darkTheme }"
  >
    <div
      class="modal-dialog px-4 xs:px-8 sm:px-12 md:px-0 w-full md:w-1/3 h-full flex flex-row items-center justify-center"
    >
      <div class="modal-content w-full">
        <div
          class="modal-header flex flex-row justify-between items-center px-4 sm:px-6 py-2 sm:py-4 rounded-t-2xl bg-custom-title-modal-background font-semibold"
        >
          <h5 class="modal-title text-sm sm:text-base">
            {{ $t("message.yourtk") }}
          </h5>
          <mdicon
            name="close"
            :width="28"
            :height="28"
            @click="handleCloseModal"
            class="cursor-pointer hover:opacity-60 scale-75 sm:scale-100"
          />
        </div>
        <div
          class="modal-footer flex flex-col bg-white p-4 sm:p-8 pb-5 sm:pb-10 rounded-b-2xl text-sm sm:text-lg"
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
                @click="setIsOpenTicketsModal(false)"
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
            <div class="w-full text-left">
              {{ $t("message.round") }} #{{ currentLottery?.lotteryID }}
            </div>
            <div class="w-full text-left font-light">
              {{ $t("message.drawnAt") }}: {{ deadlineFormat }}
            </div>
            <div class="w-full text-left font-light">
              {{ $t("message.costPer") }}: {{ costPerTicket }} USD
            </div>
            <div class="w-full text-left font-semibold">
              {{ $t("message.yourtk") }}: {{ tickets?.length }}
            </div>
            <perfect-scrollbar class="h-48 mt-2">
              <div
                v-for="(ticket, index) in tickets"
                :key="index"
                class="items w-full bg-slate-100 rounded-2xl px-4 py-2 mt-2"
              >
                <div class="ticket-container w-full flex flex-row items-center">
                  <img :src="images.ticket" class="h-12 -rotate-45" />
                  <div class="ml-2 flex flex-row items-center">
                    {{ $t("message.num") }}:
                    <div class="ml-1 font-semibold">{{ ticket?.numbers }}</div>
                  </div>
                  <div class="ml-6 flex flex-row items-center">
                    {{ $t("message.qua") }}:
                    <div class="ml-1 font-semibold">
                      {{ ticket?.numberOfTickets }}
                    </div>
                  </div>
                </div>
              </div>
            </perfect-scrollbar>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { NETWORK_ID } from "@/constants";
import { getUserTickets } from "@/utils/getTicketContract";
import moment from "moment";
import { mapActions, mapState } from "vuex";
import Web3 from "web3/dist/web3.min";
import { switchNetwork } from "@/utils/getWeb3";

export default {
  name: "TicketsModal",
  data() {
    return {
      defaultNetwork: NETWORK_ID,
      images: {
        ticket: require("@/assets/images/ticket.png"),
      },
    };
  },
  computed: {
    ...mapState([
      "isConnectWallet",
      "isOpenTicketsModal",
      "darkTheme",
      "usdtContract",
      "account",
      "currentLottery",
      "tickets",
      "network",
    ]),
    deadlineFormat() {
      return this?.currentLottery?.closingTimestamp
        ? moment
            .unix(this?.currentLottery?.closingTimestamp)
            .format("DD/MM/YYYY, hh:mm A")
        : null;
    },
    costPerTicket() {
      return this.currentLottery?.costPerTicket
        ? Web3.utils.fromWei(
            String(this.currentLottery?.costPerTicket),
            "picoether"
          )
        : null;
    },
  },
  methods: {
    ...mapActions({ setIsOpenTicketsModal: "setIsOpenTicketsModal" }),
    handleCloseModal() {
      this.setIsOpenTicketsModal(false);
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
  },
  watch: {
    async isOpenTicketsModal() {
      if (this.isOpenTicketsModal) {
        document.body.style.overflow = "hidden";
        await getUserTickets(this?.currentLottery?.lotteryID, this?.account);
      } else document.body.style.overflow = "auto";
    },
  },
};
</script>
<style lang="scss">
@use "@/assets/css/variables";
.dark {
  .items {
    color: variables.$primary-text-color;
  }
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
