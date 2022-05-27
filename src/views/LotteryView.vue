<template>
  <div class="lottery w-full" :class="{ dark: darkTheme }">
    <div
      class="buy-ticket-container bg-custom-background-start-home w-full pt-40 pb-10 px-60 box-border overflow-hidden flex flex-col items-center h-full"
    >
      <span
        class="title text-custom-white-text text-2xl font-semibold"
        v-if="currentLottery?.lotteryStatus == '0'"
      >
        The PenguinLott Lottery
      </span>
      <span
        class="title text-custom-white-text text-2xl font-semibold"
        v-if="currentLottery?.lotteryStatus == '1'"
      >
        The PenguinLott Lottery is closing
      </span>
      <span
        class="title text-custom-white-text text-2xl font-semibold"
        v-if="currentLottery?.lotteryStatus == '2'"
      >
        The PenguinLott Lottery is closed
      </span>
      <p
        class="prize bg-custom-number-text bg-clip-text font-semibold text-6xl leading-relaxed"
        v-if="currentLottery?.lotteryStatus == '0'"
      >
        ${{ prizePool }}
      </p>
      <p
        class="description text-custom-white-text font-semibold text-2xl"
        v-if="currentLottery?.lotteryStatus == '0'"
      >
        in prizes!
      </p>
      <p
        class="prize bg-custom-number-text bg-clip-text font-semibold mt-16 text-3xl leading-relaxed flex flex-row items-end"
        v-if="currentLottery?.lotteryStatus == '1'"
      >
        The winning number is randomizing
        <img :src="loadingSVG" style="height: 42px; width: 42px" class="ml-2" />
      </p>
      <p
        class="description text-custom-white-text font-semibold text-xl mt-4"
        v-if="currentLottery?.lotteryStatus == '2'"
      >
        Winning number today
      </p>
      <p
        class="prize bg-custom-number-text bg-clip-text font-semibold text-7xl leading-relaxed"
        v-if="currentLottery?.lotteryStatus == '2'"
      >
        {{ currentLottery?.winningNumbers }}
      </p>
      <p
        class="font-semibold text-2xl leading-relaxed text-custom-white-text"
        v-if="currentLottery?.lotteryStatus == '2'"
      >
        Round: #{{ currentLottery?.lotteryID }}
      </p>
      <p
        class="font-semibold text-xl leading-relaxed text-custom-white-text"
        v-if="currentLottery?.lotteryStatus == '2'"
      >
        Drawn at: {{ formatDeadline() }}
      </p>
      <div
        class="button-container relative w-72 h-72 animate-rotationButton overflow-hidden z-10"
        v-if="currentLottery?.lotteryStatus == '0'"
      >
        <img :src="images.ticket" class="ticket-icon w-72 rotate-45" />
        <button
          class="btn-buy-tickets bg-custom-background-start-home py-3 rounded-2xl absolute top-1/3 left-12 right-12 mt-6 text-custom-white-text font-semibold hover:opacity-80 text-xl"
          @click="handleBuyTicket"
        >
          Buy Tickets
        </button>
      </div>
      <div
        class="button-container relative w-72 h-48 animate-rotationButton overflow-hidden z-10"
        v-if="currentLottery?.lotteryStatus == '1'"
      >
        <button
          class="btn-buy-tickets bg-slate-200 py-3 rounded-2xl absolute top-1/3 left-12 right-12 mt-6 text-slate-400 font-semibold hover:opacity-80 text-xl cursor-not-allowed"
        >
          Please wait!
        </button>
      </div>
      <div
        class="button-container relative w-72 h-48 animate-rotationButton overflow-hidden z-10"
        v-if="currentLottery?.lotteryStatus == '2'"
      >
        <button
          class="btn-buy-tickets bg-slate-200 py-3 rounded-2xl absolute top-1/3 left-12 right-12 mt-6 text-slate-400 font-semibold hover:opacity-80 text-xl cursor-not-allowed"
        >
          Coming soon!
        </button>
      </div>
      <ul class="circles absolute top-0 left-0 w-full h-full overflow-hidden">
        <li v-for="index in 10" :key="index" class="animate-rotation"></li>
      </ul>
    </div>
    <div
      class="get-ticket flex flex-col items-center bg-custom-get-ticket-background relative px-60 py-24"
    >
      <p
        class="title text-custom-white-text font-semibold text-4xl leading-5"
        v-if="currentLottery?.lotteryStatus == '0'"
      >
        Get your tickets now!
      </p>
      <p
        class="title text-custom-white-text font-semibold text-4xl leading-5"
        v-if="currentLottery?.lotteryStatus == '2'"
      >
        Your tickets
      </p>
      <div
        class="count-down-container mt-8"
        v-if="currentLottery?.lotteryStatus == '0'"
      >
        <Countdown
          class="count-down"
          v-if="currentLottery !== null"
          mainColor="#fff"
          labelColor="#fff"
          :deadlineISO="deadline"
        />
      </div>
      <div
        class="draw-container w-2/3 bg-white rounded-2xl mt-9 flex flex-col items-center box-border"
      >
        <div
          class="title bg-custom-title-draw-light w-full rounded-t-2xl flex flex-row justify-between box-border px-8 py-4"
        >
          <div
            class="left text-xl font-semibold"
            v-if="currentLottery?.lotteryStatus == '0'"
          >
            Next Draw
          </div>
          <div
            class="left text-xl font-semibold"
            v-if="currentLottery?.lotteryStatus == '2'"
          >
            Current Draw
          </div>
          <div class="right text-lg">
            #{{ this.currentLottery?.lotteryID }} | Draw: {{ deadlineFormat }}
          </div>
        </div>
        <div class="content flex flex-row box-border w-full px-8 pt-6 pb-3">
          <div class="key text-xl font-semibold mt-2 w-40 text-left">
            Prize Pot
          </div>
          <div class="value flex flex-row items-end">
            <div class="top text-5xl font-semibold text-custom-prize-pot">
              ~${{ prizePool }}
            </div>
            <div class="usd text-xl ml-4">USD</div>
          </div>
        </div>
        <div
          class="content flex flex-row items-center box-border w-full px-8 pt-4 pb-8"
        >
          <div class="key text-xl font-semibold w-40 text-left">
            Your tickets
          </div>

          <button
            class="btn-buy-tickets font-semibold border-2 border-button-background-primary mr-3 px-6 py-3 border-button-background-primary text-button-background-primary rounded-2xl hover:opacity-80"
            @click="setIsOpenTicketsModal(true)"
          >
            View Tickets
          </button>
          <button
            class="btn-buy-tickets font-semibold px-6 py-3 bg-button-background-primary text-custom-white-text rounded-2xl shadow-3xl hover:opacity-80"
            @click="handleBuyTicket"
            v-if="currentLottery?.lotteryStatus == '0'"
          >
            Buy Tickets
          </button>
        </div>
      </div>
    </div>
    <div
      class="connect relative bg-custom-winner-background overflow-hidden py-20"
    >
      <div
        class="title text-xl font-semibold mb-6 text-custom-white-text"
        v-if="!isConnectWallet"
      >
        Connect your wallet<br />
        to check if you've won!
      </div>

      <div
        class="title text-xl font-semibold mb-6 text-custom-white-text"
        v-else
      >
        Want to check deals with Penguin Lott?
      </div>
      <button
        v-if="!isConnectWallet"
        class="connect-wallet-btn font-semibold px-6 py-3 bg-button-background-primary text-custom-white-text rounded-2xl shadow-3xl hover:opacity-80"
      >
        Connect Wallet
      </button>
      <button
        v-else
        class="connect-wallet-btn font-semibold px-6 py-3 bg-button-background-primary text-custom-white-text rounded-2xl shadow-3xl hover:opacity-80"
        @click="handleOpenWalletModal"
      >
        Check it
      </button>
      <img
        :src="images.coin"
        class="wallet-icon h-20 absolute left-2/3 animate-rotationFast"
      />
      <img
        :src="images.coin"
        class="coin-icon h-20 absolute left-1/4 animate-rotationFast"
      />
    </div>
    <div
      class="finished-rounds flex flex-col items-center bg-custom-round-background py-20"
    >
      <div class="title text-5xl font-semibold">Finished Rounds</div>
      <div class="round-container w-1/2 bg-white mt-9 rounded-2xl">
        <div class="top p-8 flex flex-row justify-between items-start">
          <div class="left">
            <div class="round text-xl font-semibold flex flex-row items-center">
              Round
              <div
                class="index font-semibold bg-custom-number-background text-custom-white-text rounded-2xl py-1 px-4 ml-4"
              >
                {{ temperatureLottery?.lotteryID }}
              </div>
            </div>
            <div class="deadline mt-2 w-full text-left">
              Drawn: {{ deadlineFormatTemperature }}
            </div>
          </div>
          <div class="right flex flex-row items-center">
            <mdicon
              name="arrow-left"
              :width="20"
              :height="20"
              class="cursor-pointer"
              @click="handleDecrease"
              :class="{ disable: isDisableBack }"
            />
            <mdicon
              name="arrow-right"
              :width="20"
              :height="20"
              class="ml-4 cursor-pointer"
              @click="handleIncrease"
              :class="{ disable: isDisableNext }"
            />
            <mdicon
              name="arrow-collapse-right"
              :width="20"
              :height="20"
              class="ml-4 cursor-pointer"
              @click="handleToLast"
              :class="{ disable: isDisableNext }"
            />
          </div>
        </div>
        <TheDivider />
        <div
          class="middle overflow-hidden p-8 flex flex-row items-start justify-between relative"
        >
          <div class="left text-xl font-semibold">Winning Number</div>
          <div class="right flex flex-row mr-4">
            <div
              v-for="index in temperatureLottery?.winningNumbers.length"
              :key="index"
            >
              <NumberLottery
                :number="temperatureLottery?.winningNumbers[index - 1]"
                class="mr-2"
              />
            </div>
          </div>
          <div
            v-if="isDisableNext"
            class="bg-custom-purple-bold p-2 w-48 text-custom-white-text absolute top-3 -right-16 text-sm rotate-45"
          >
            Latest
          </div>
        </div>
        <TheDivider />
        <div
          v-if="isShowDetailRound"
          class="bg-white flex flex-row py-6 px-8 rounded-b-2xl"
        >
          <div class="left flex flex-col items-start">
            <div class="prize-pot-title text-xl font-semibold">Prize pot</div>
            <div class="value flex flex-row items-end">
              <div class="top text-4xl font-semibold text-custom-prize-pot">
                ~${{ prizePoolTemperature }}
              </div>
              <div class="usd text-xl ml-2">USD</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="how-to-play bg-custom-background-htp py-16 px-16 flex flex-col items-center"
    >
      <div
        class="title text-custom-purple-title text-4xl font-semibold leading-loose"
      >
        How to Play
      </div>
      <div class="description text-normal text-custom-purple-description">
        If the digits on your tickets match the winning numbers in the correct
        order, you win a portion of the prize pool. <br />Simple!
      </div>
      <div class="card-container flex flex-row w-full justify-center mt-8">
        <div
          class="card bg-custom-background-card-light mx-4 rounded-2xl relative mb-4 w-1/4 h-48"
        >
          <p
            class="card-title text-custom-purple-title text-2xl font-semibold absolute top-12 left-6 z-10"
          >
            Buy Tickets
          </p>
          <p
            class="description text-custom-purple-text-light text-normal absolute top-24 left-6 text-left w-10/12 z-10"
          >
            Prices are set when the round starts, equal to 5 USD in ETH per
            ticket.
          </p>
          <div
            class="behind behind bg-white w-p-99 h-p-98 absolute top-px left-px rounded-2xl"
          ></div>
          <div class="step-number absolute top-4 right-6">STEP 1</div>
        </div>
        <div
          class="card bg-custom-background-card-light mx-4 rounded-2xl relative mb-4 w-1/4 h-48"
        >
          <p
            class="card-title text-custom-purple-title text-2xl font-semibold absolute top-12 left-6 z-10"
          >
            Wait for the Draw
          </p>
          <p
            class="description text-custom-purple-text-light text-normal absolute top-24 left-6 text-left w-10/12 z-10"
          >
            There is one draw every day alternating between 6 PM UTC +7
          </p>
          <div
            class="behind behind behind bg-white w-p-99 h-p-98 absolute top-px left-px rounded-2xl"
          ></div>
          <div class="step-number absolute top-4 right-6">STEP 2</div>
        </div>
        <div
          class="card bg-custom-background-card-light mx-4 rounded-2xl relative mb-4 w-1/4 h-48 z-10"
        >
          <p
            class="card-title text-custom-purple-title text-2xl font-semibold absolute top-12 left-6 z-10"
          >
            Check for Prizes
          </p>
          <p
            class="description text-custom-purple-text-light text-normal absolute top-24 left-6 text-left w-10/12 z-10"
          >
            Once the round’s over, come back to the page and check to see if
            you’ve won!
          </p>
          <div
            class="behind behind bg-white w-p-99 h-p-98 absolute top-px left-px rounded-2xl"
          ></div>
          <div class="step-number absolute top-4 right-6">STEP 3</div>
        </div>
      </div>
      <TheDivider class="w-4/5 mt-4" />
      <div
        class="winning-criteria flex flex-row px-40 justify-between w-full box-border"
      >
        <div class="left py-16 text-left w-3/5">
          <div
            class="title leading-loose text-custom-purple-title text-2xl font-semibold"
          >
            Winning Criteria
          </div>
          <div class="description text-lg font-semibold leading-loose">
            The digits on your ticket must match in the correct order to win.
          </div>
          <div class="content text-custom-purple-text-light">
            Here’s an example lottery draw, with two tickets, A and B.
            <ul class="ml-4 mb-2 list-disc">
              <li>
                Ticket A: Both numbers match the result so this ticket is the
                winning ticket.
              </li>
              <li>
                Ticket B: Both numbers match but the order is wrong so this
                ticket does not win.
              </li>
            </ul>
            Lottery tickets include 2 digits, every 6pm every day UTC +7, the
            system automatically chooses a 2 digit number, whoever gets 2 digits
            completely will be the winner of all the rewards in the pool.
          </div>
        </div>
        <div
          class="right bg-custom-background-card-light rounded-2xl overflow-hidden relative mb-4 w-1/3 h-56 mt-16"
        >
          <div
            class="behind bg-white w-p-99 h-p-98 absolute top-px left-px rounded-2xl"
          ></div>
          <div class="top-example flex flex-row ml-12 mt-3">
            <NumberLottery number="3" style="transform: scale(0.4)" />
            <NumberLottery
              number="7"
              style="transform: scale(0.4); margin-left: -36px"
            />
          </div>
          <div
            class="example-a flex flex-row items-center ml-6"
            style="margin-top: -24px"
          >
            <div
              class="title text-lg text-custom-purple-title z-10 font-semibold"
            >
              A
            </div>
            <NumberLottery
              number="3"
              style="transform: scale(0.4); margin-left: 12px"
            />
            <NumberLottery
              number="7"
              style="transform: scale(0.4); margin-left: -36px"
            />
            <mdicon
              name="check"
              style="color: #00c853; z-index: 10"
              :width="20"
              :height="20"
            />
          </div>
          <div
            class="example-a flex flex-row items-center ml-6"
            style="margin-top: -24px"
          >
            <div
              class="title text-lg text-custom-purple-title z-10 font-semibold"
            >
              B
            </div>
            <NumberLottery
              number="7"
              style="transform: scale(0.4); margin-left: 12px"
            />
            <NumberLottery
              number="3"
              style="transform: scale(0.4); margin-left: -36px"
            />
            <mdicon
              name="close"
              style="color: #ef5350; z-index: 10"
              :width="20"
              :height="20"
            />
          </div>
        </div>
      </div>
      <TheDivider class="w-4/5 mt-4" />
      <div
        class="prize-funds flex flex-row px-40 justify-between w-full box-border"
      >
        <div class="left py-16 text-left w-3/5">
          <div
            class="title text-2xl text-custom-purple-title font-semibold leading-loose"
          >
            Prize Funds
          </div>
          <div class="content text-lg">
            The prizes for each lottery round come from three sources:
          </div>
          <div class="description mt-2 font-semibold text-lg">
            Ticket Purchases
          </div>
          <ul class="ml-4 mb-2 list-disc text-custom-purple-text-light">
            <li>
              100% of the ETH paid by people buying tickets that round goes back
              into the prize pools.
            </li>
          </ul>
          <div
            class="description mt-2 font-semibold text-lg"
            style="margin-top: 16px"
          >
            Rollover Prizes
          </div>
          <ul class="ml-4 mb-2 list-disc text-custom-purple-text-light">
            <li>
              After every round, if nobody wins in one of the prize brackets,
              the unclaimed ETH for that bracket rolls over into the next round
              and are redistributed among the prize pools.
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <TicketsModal />
</template>

<script>
import { defineComponent } from "vue";
import ticket from "@/assets/images/ticket.png";
import { Countdown } from "vue3-flip-countdown";
import TheDivider from "@/components/TheDivider/TheDivider.vue";
import coin from "@/assets/images/coin.png";
import { mapActions, mapState } from "vuex";
import NumberLottery from "@/components/NumberLottery/NumberLottery.vue";
import Web3 from "web3/dist/web3.min";
import moment from "moment";
import TicketsModal from "@/components/TicketsModal/TicketsModal.vue";
import loadingSVG from "@/assets/images/loading.svg";
export default defineComponent({
  name: "LotteryView",
  data() {
    return {
      images: { ticket, coin },
      isShowDetailRound: true,
      temperatureIndex: null,
      isDisableBack: null,
      isDisableNext: null,
      currentIndex: null,
      isChangeFromClosedToOpen: false,
      loadingSVG,
    };
  },
  components: {
    Countdown,
    TheDivider,
    NumberLottery,
    TicketsModal,
  },
  computed: {
    ...mapState([
      "isConnectWallet",
      "isOpenBuyTicketModal",
      "darkTheme",
      "usdtContract",
      "account",
      "currentLottery",
      "tickets",
      "temperatureLottery",
      "isWaitingCloseLottery",
    ]),
    prizePool() {
      return this?.currentLottery?.prizePool
        ? String(
            Web3.utils.fromWei(String(this.currentLottery?.prizePool), "ether")
          ).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
        : null;
    },
    prizePoolTemperature() {
      return this?.temperatureLottery?.prizePool
        ? String(
            Web3.utils.fromWei(
              String(this.temperatureLottery?.prizePool),
              "ether"
            )
          ).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
        : null;
    },
    deadlineFormat() {
      return this?.currentLottery?.closingTimestamp
        ? moment
            .unix(this?.currentLottery?.closingTimestamp)
            .format("MMM DD, YYYY, hh:mm A")
        : null;
    },
    deadlineFormatTemperature() {
      return this?.temperatureLottery?.closingTimestamp
        ? moment
            .unix(this?.temperatureLottery?.closingTimestamp)
            .format("MMM DD, YYYY, hh:mm A")
        : null;
    },
    deadline() {
      return this?.currentLottery?.closingTimestamp
        ? new Date(this.currentLottery?.closingTimestamp * 1000).toISOString()
        : null;
    },
  },
  methods: {
    ...mapActions({
      setIsOpenBuyTicketModal: "setIsOpenBuyTicketModal",
      setIsOpenTicketsModal: "setIsOpenTicketsModal",
      setTemperatureLottery: "setTemperatureLottery",
      setIsOpenWalletModal: "setIsOpenWalletModal",
      setActiveSwitchWallet: "setActiveSwitchWallet",
    }),
    handleOpenWalletModal() {
      this.setIsOpenWalletModal(true);
      this.setActiveSwitchWallet(1);
    },
    async handleBuyTicket() {
      this.setIsOpenBuyTicketModal(true);
    },
    handleDecrease() {
      if (this.temperatureIndex > 1) this.temperatureIndex--;
    },
    formatDeadline() {
      return moment(this.deadline).format("MMM DD, YYYY, HH:MM A");
    },
    handleIncrease() {
      if (
        this.temperatureIndex == Number(this.currentLottery?.lotteryID) - 1 &&
        this.currentLottery?.lotteryStatus == "2"
      )
        this.temperatureIndex++;
      else if (
        this.temperatureIndex <
        Number(this.currentLottery?.lotteryID) - 1
      )
        this.temperatureIndex++;
    },
    handleDecreaseYourHistory() {
      if (this.currentIndex > 1) this.currentIndex--;
    },
    handleToLast() {
      if (this.currentLottery?.lotteryStatus == "2")
        this.temperatureIndex = Number(this.currentLottery?.lotteryID);
      else this.temperatureIndex = Number(this.currentLottery?.lotteryID) - 1;
    },
    checkEmpty(array) {
      for (let i = 0; i < array.length - 1; i++) {
        if (array[i]?.length != 0) return false;
      }
      return true;
    },
  },
  watch: {
    currentLottery(newVal, oldVal) {
      if (this.currentLottery?.lotteryStatus == "2")
        this.temperatureIndex = this.currentLottery.lotteryID;
      else this.temperatureIndex = this.currentLottery.lotteryID - 1;
      if (oldVal?.lotteryStatus == "2" && newVal?.lotteryStatus == "0")
        this.isChangeFromClosedToOpen = true;
    },
    async temperatureIndex() {
      if (this.temperatureIndex <= 1) {
        this.isDisableBack = true;
      } else this.isDisableBack = false;
      if (this.currentLottery?.lotteryStatus == "2") {
        if (this.temperatureIndex == Number(this.currentLottery?.lotteryID)) {
          this.isDisableNext = true;
        } else this.isDisableNext = false;
      } else if (
        this.temperatureIndex ==
        Number(this.currentLottery?.lotteryID) - 1
      ) {
        this.isDisableNext = true;
      } else this.isDisableNext = false;
      if (
        this.temperatureIndex >= 1 &&
        this.temperatureIndex <= Number(this.currentLottery?.lotteryID)
      )
        await this.setTemperatureLottery(String(this.temperatureIndex));
    },
  },
});
</script>

<style lang="scss" scoped>
@use "@/assets/css/variables";
.prize {
  -webkit-text-fill-color: transparent;
}
.circles li {
  position: absolute;
  display: block;
  list-style: none;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
  bottom: -150px;
}

.circles li:nth-child(1) {
  left: 25%;
  width: 80px;
  height: 80px;
  animation-delay: 0s;
}

.circles li:nth-child(2) {
  left: 10%;
  width: 20px;
  height: 20px;
  animation-delay: 2s;
  animation-duration: 12s;
}

.circles li:nth-child(3) {
  left: 70%;
  width: 20px;
  height: 20px;
  animation-delay: 4s;
}

.circles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  animation-delay: 0s;
  animation-duration: 18s;
}

.circles li:nth-child(5) {
  left: 65%;
  width: 20px;
  height: 20px;
  animation-delay: 0s;
}

.circles li:nth-child(6) {
  left: 75%;
  width: 110px;
  height: 110px;
  animation-delay: 3s;
}

.circles li:nth-child(7) {
  left: 35%;
  width: 150px;
  height: 150px;
  animation-delay: 7s;
}

.circles li:nth-child(8) {
  left: 50%;
  width: 25px;
  height: 25px;
  animation-delay: 15s;
  animation-duration: 45s;
}

.circles li:nth-child(9) {
  left: 20%;
  width: 15px;
  height: 15px;
  animation-delay: 2s;
  animation-duration: 35s;
}

.circles li:nth-child(10) {
  left: 85%;
  width: 150px;
  height: 150px;
  animation-delay: 0s;
  animation-duration: 11s;
}

.wallet-icon {
  animation-delay: 1.5s;
  bottom: -80px;
}

.coin-icon {
  bottom: -80px;
}

.active {
  background-color: white;
  color: #27262c;
}
.dark {
  .get-ticket {
    .draw-container {
      background: variables.$dark-background-nav;
      .title {
        background: variables.$custom-title-dark;
        color: variables.$custom-white-text;
      }
      .content {
        .key {
          color: variables.$custom-white-text;
        }
        .value {
          .bottom {
            color: variables.$custom-white-text;
          }
        }
        .usd {
          color: variables.$custom-white-text;
        }
      }
    }
  }
  .finished-rounds {
    background: variables.$custom-background-dark;
    .title {
      color: variables.$custom-white-text;
    }
    .round-container {
      background: variables.$dark-background-nav;
      .top {
        .left {
          .round {
            color: variables.$custom-white-text;
          }
          .deadline {
            color: variables.$custom-white-text;
          }
        }
        .right {
          color: variables.$custom-white-text;
        }
      }
      .middle {
        .left {
          color: variables.$custom-white-text;
        }
      }
    }
  }
  .how-to-play {
    background: black;
    .title {
      color: variables.$custom-purple-title;
    }
    .description {
      color: variables.$custom-white-text;
    }
    .card-container {
      .card {
        background: variables.$custom-shadow-card;
        .step-number {
          color: variables.$custom-white-text;
        }
      }
      .behind {
        background: variables.$dark-background-nav;
      }
    }
  }
  .winning-criteria {
    .left {
      .content {
        color: variables.$custom-icon-nav;
      }
    }
    .right {
      background: variables.$custom-shadow-card;
      .behind {
        background: variables.$dark-background-nav;
      }
    }
  }
  .prize-funds {
    .left {
      .content {
        color: variables.$custom-white-text;
      }
    }
  }
}
.disable {
  cursor: not-allowed;
  color: rgb(196, 196, 196);
}
</style>
