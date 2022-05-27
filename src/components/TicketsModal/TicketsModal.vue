<template>
  <div
    class="fixed top-0 w-screen h-screen bg-custom-background-modal flex flex-row items-center justify-center z-30"
    v-show="isOpenTicketsModal"
    :class="{ dark: darkTheme }"
  >
    <div class="modal-dialog w-1/4 mt-32">
      <div class="modal-content">
        <div
          class="modal-header flex flex-row justify-between items-center px-6 py-4 rounded-t-2xl bg-custom-title-modal-background text-xl font-semibold"
        >
          <h5 class="modal-title">Your Tickets</h5>
          <mdicon
            name="close"
            :width="28"
            :height="28"
            @click="handleCloseModal"
            class="cursor-pointer hover:opacity-60"
          />
        </div>
        <div
          class="modal-footer flex flex-col bg-white p-8 pb-10 rounded-b-2xl text-lg"
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
            <div class="w-full text-left">
              Round #{{ currentLottery?.lotteryID }}
            </div>
            <div class="w-full text-left font-light">
              Draw: {{ deadlineFormat }}
            </div>
            <div class="w-full text-left font-light">
              Cost per ticket: {{ costPerTicket }} USD
            </div>
            <div class="w-full text-left font-semibold">
              Your tickets: {{ tickets?.length }}
            </div>
            <perfect-scrollbar class="h-48 mt-2">
              <div
                v-for="(ticket, index) in tickets"
                :key="index"
                class="w-full bg-slate-100 rounded-2xl px-4 py-2 mt-2"
              >
                <div class="ticket-container w-full flex flex-row items-center">
                  <img :src="images.ticket" class="h-12" />
                  <div class="ml-2 flex flex-row items-center">
                    Number:
                    <div class="ml-1 font-semibold">{{ ticket?.numbers }}</div>
                  </div>
                  <div class="ml-6 flex flex-row items-center">
                    Quantity:
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
            .format("MMM DD, YYYY, hh:mm A")
        : null;
    },
    costPerTicket() {
      return this.currentLottery?.costPerTicket
        ? Web3.utils.fromWei(
            String(this.currentLottery?.costPerTicket),
            "ether"
          )
        : null;
    },
  },
  methods: {
    ...mapActions({ setIsOpenTicketsModal: "setIsOpenTicketsModal" }),
    handleCloseModal() {
      this.setIsOpenTicketsModal(false);
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
<style lang="scss"></style>
