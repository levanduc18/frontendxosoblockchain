<template>
  <div
    class="dashboard-container h-64 w-full rounded-2xl py-8 flex flex-col items-start relative"
  >
    <span
      class="dashboard-title text-custom-white-text text-3xl font-semibold ml-16"
      v-if="currentLottery?.lotteryStatus == '0'"
    >
      Win ${{ prizePool }} in Lottery
    </span>
    <span
      class="dashboard-title text-custom-white-text text-3xl font-semibold ml-16 flex flex-row"
      v-if="currentLottery?.lotteryStatus == '1'"
    >
      Round today is closing, please wait
      <img :src="loadingSVG" style="width: 48px; height: 48px" class="ml-2" />
    </span>
    <span
      class="dashboard-title text-custom-white-text text-3xl font-semibold ml-16"
      v-if="currentLottery?.lotteryStatus == '2'"
    >
      Round today is already closed
    </span>
    <div
      class="count-down-container ml-16 mt-5"
      v-if="currentLottery?.lotteryStatus == '0'"
    >
      <Countdown
        mainColor="#fff"
        v-if="currentLottery !== null"
        labelColor="#fff"
        countdownSize="1.8rem"
        :deadlineISO="deadline"
      />
    </div>
    <div
      v-if="currentLottery?.lotteryStatus == '1'"
      class="text-lg text-custom-white-text ml-16 text-left dashboard-title"
    >
      The number will be coming soon after randomizing
    </div>
    <div
      v-if="currentLottery?.lotteryStatus == '2'"
      class="text-lg text-custom-white-text ml-16 text-left dashboard-title"
    >
      <div>
        Round : #<b>{{ currentLottery?.lotteryID }}</b>
      </div>
      <div>
        Drawn at : <b> {{ formatDeadline() }}</b>
      </div>
      <div>
        Winning number :
        <b
          class="animate-pulse prize bg-custom-number-text bg-clip-text font-semibold mt-16 text-xl leading-relaxed"
          >{{ currentLottery?.winningNumbers }}</b
        >
      </div>
    </div>
    <button
      class="btn-play-now pt-2 pb-3 pl-6 pr-4 bg-button-background-primary rounded-2xl font-semibold text-custom-white-text shadow-3xl text-xl ml-16 mt-5 hover:opacity-80"
      v-if="currentLottery?.lotteryStatus == '0'"
    >
      <a
        class="icon-container flex flex-row items-center justify-center"
        @click="goToLotteryPage"
      >
        Play Now
        <mdicon
          class="custom-icon ml-2"
          name="chevron-right"
          :height="18"
          :width="18"
        />
      </a>
    </button>
    <button
      class="btn-play-now pt-2 pb-3 pl-6 pr-4 bg-button-background-primary rounded-2xl font-semibold text-custom-white-text shadow-3xl text-xl ml-16 mt-5 hover:opacity-80"
      v-if="currentLottery?.lotteryStatus == '1'"
      disabled
    >
      <a class="icon-container flex flex-row items-center justify-center">
        Buy tickets
        <mdicon
          class="custom-icon ml-2"
          name="chevron-right"
          :height="18"
          :width="18"
        />
      </a>
    </button>
    <button
      class="btn-play-now pt-2 pb-3 pl-6 pr-4 bg-button-background-primary rounded-2xl font-semibold text-custom-white-text shadow-3xl text-xl ml-16 mt-5 hover:opacity-80"
      v-if="currentLottery?.lotteryStatus == '2'"
      @click="goToLotteryPageAndScroll"
    >
      <a class="icon-container flex flex-row items-center justify-center">
        More details
        <mdicon
          class="custom-icon ml-2"
          name="chevron-right"
          :height="18"
          :width="18"
        />
      </a>
    </button>

    <img :src="images.number" class="number-image" />
    <img :src="images.logo" class="penguin-image" />
    <img :src="images.winter" class="winter-image" />
  </div>
</template>

<script>
import { Countdown } from "vue3-flip-countdown";
import number from "@/assets/images/number1.png";
import logo from "@/assets/images/penguin-2.webp";
import winter from "@/assets/images/winter.png";
import { mapState } from "vuex";
import Web3 from "web3/dist/web3.min";
import moment from "moment";
import router from "../../router";
import loadingSVG from "@/assets/images/loading.svg";

export default {
  name: "DashBoard",
  data() {
    return {
      images: { number, logo, winter },
      isChangeFromClosedToOpen: false,
      loadingSVG,
    };
  },
  components: { Countdown },
  computed: {
    ...mapState(["currentLottery"]),
    deadline() {
      return this?.currentLottery?.closingTimestamp * 1000
        ? new Date(this?.currentLottery?.closingTimestamp * 1000).toISOString()
        : null;
    },
    prizePool() {
      return this.currentLottery?.prizePool
        ? Web3.utils.fromWei(String(this.currentLottery?.prizePool), "ether")
        : null;
    },
  },
  watch: {
    currentLottery(newVal, oldVal) {
      if (oldVal?.lotteryStatus == "2" && newVal?.lotteryStatus == "0")
        this.isChangeFromClosedToOpen = true;
    },
  },
  methods: {
    formatDeadline() {
      return moment(this.deadline).format("MMM DD, YYYY, HH:MM A");
    },
    goToLotteryPage() {
      router.push({ path: "/lottery" });
    },
    goToLotteryPageAndScroll() {
      router.push({ path: "/lottery" });
      window.scroll({ top: 1360, left: 0 });
    },
  },
};
</script>
<style lang="scss" scoped>
.dashboard-container {
  background: -webkit-linear-gradient(
    top,
    rgb(118, 69, 217) 0%,
    rgb(69, 42, 122) 100%
  );
  .dashboard-title {
    text-shadow: rgb(0 0 0 / 25%) 0px 4px 4px;
  }
}
.number-image {
  position: absolute;
  top: -100px;
  right: 240px;
  height: 360px;
}
.penguin-image {
  position: absolute;
  bottom: 0px;
  right: -16px;
  z-index: 1;
  height: 280px;
}
.winter-image {
  position: absolute;
  bottom: -168px;
  right: -32px;
  height: 300px;
}

.prize {
  -webkit-text-fill-color: transparent;
}
</style>
