<template>
  <div
    class="dashboard-container relative overflow-hidden h-32 xs:h-40 sm:h-64 w-full rounded-2xl flex flex-row"
  >
    <div class="flex flex-col items-start w-full py-1 xs:py-2 sm:py-8">
      <span
        class="dashboard-title text-custom-white-text text-sm xs:text-lg sm:text-3xl font-semibold ml-4 xs:ml-6 sm:ml-16"
        v-if="currentLottery?.lotteryStatus == '0'"
      >
        {{ $t("message.win") }} ${{ prizePool }} {{ $t("message.inLot") }}
      </span>
      <span
        class="dashboard-title text-custom-white-text text-sm xs:text-lg sm:text-3xl font-semibold ml-4 xs:ml-6 sm:ml-16"
        v-if="currentLottery?.lotteryStatus == '1'"
      >
        {{ $t("message.roundClose") }}
      </span>
      <span
        class="dashboard-title text-custom-white-text text-sm xs:text-lg sm:text-3xl font-semibold ml-4 xs:ml-6 sm:ml-16"
        v-if="currentLottery?.lotteryStatus == '2'"
      >
        {{ $t("message.roundClosed") }}
      </span>
      <div
        class="count-down-container flex xs:hidden sm:hidden ml-4 mt-2"
        v-if="currentLottery?.lotteryStatus == '0'"
      >
        <Countdown
          mainColor="#fff"
          v-if="currentLottery !== null"
          labelColor="#fff"
          countdownSize="1rem"
          labelSize="0.5rem"
          :deadlineISO="deadline"
          @timeElapsed="isTimesUp = true"
        />
      </div>
      <div
        class="count-down-container hidden xs:flex sm:hidden ml-6 mt-3"
        v-if="currentLottery?.lotteryStatus == '0'"
      >
        <Countdown
          mainColor="#fff"
          v-if="currentLottery !== null"
          labelColor="#fff"
          countdownSize="1.3rem"
          labelSize="0.7rem"
          :deadlineISO="deadline"
          @timeElapsed="isTimesUp = true"
        />
      </div>
      <div
        class="count-down-container hidden sm:flex md:hidden ml-16 mt-5"
        v-if="currentLottery?.lotteryStatus == '0'"
      >
        <Countdown
          mainColor="#fff"
          v-if="currentLottery !== null"
          labelColor="#fff"
          countdownSize="1.6rem"
          labelSize="0.8rem"
          :deadlineISO="deadline"
          @timeElapsed="isTimesUp = true"
        />
      </div>
      <div
        class="count-down-container hidden md:flex ml-16 mt-5"
        v-if="currentLottery?.lotteryStatus == '0'"
      >
        <Countdown
          mainColor="#fff"
          v-if="currentLottery !== null"
          labelColor="#fff"
          countdownSize="1.8rem"
          :deadlineISO="deadline"
          @timeElapsed="isTimesUp = true"
        />
      </div>
      <div
        class="flex flex-row items-center"
        v-if="currentLottery?.lotteryStatus == '1'"
      >
        <div
          class="text-xxs xs:text-xs sm:text-lg text-custom-white-text ml-6 sm:ml-16 text-left dashboard-title my-6"
        >
          {{ $t("message.randomizing") }}
        </div>
        <img :src="loadingSVG" class="ml-2 h-4 sm:h-12" />
      </div>
      <div
        v-if="currentLottery?.lotteryStatus == '2'"
        class="text-xs xs:text-sm sm:text-lg text-custom-white-text ml-6 sm:ml-16 text-left dashboard-title"
      >
        <div>
          {{ $t("message.round") }} : #<b>{{ currentLottery?.lotteryID }}</b>
        </div>
        <div>
          {{ $t("message.drawnAt") }} : <b> {{ formatDeadline() }}</b>
        </div>
        <div>
          {{ $t("message.winNum") }} :
          <b
            class="animate-pulse prize bg-custom-number-text bg-clip-text font-semibold text-xs xs:text-sm sm:text-xl leading-relaxed"
            v-if="currentLottery?.winningNumbers?.length > 1"
            >{{ currentLottery?.winningNumbers }}
          </b>
          <b
            class="animate-pulse prize bg-custom-number-text bg-clip-text font-semibold text-xs xs:text-sm sm:text-xl leading-relaxed"
            v-else
            >0{{ currentLottery?.winningNumbers }}
          </b>
        </div>
      </div>
      <button
        class="btn-play-now pt-1 xs:pt-2 sm:pt-2 pb-1 xs:pb-2 sm:pb-3 pl-2 xs:pl-3 sm:pl-6 pr-1 xs:pr-2 sm:pr-4 bg-button-background-primary rounded-2xl font-semibold text-custom-white-text shadow-3xl text-xs xs:text-sm sm:text-xl ml-4 xs:ml-6 sm:ml-16 mt-2 sm:mt-5 hover:opacity-80"
        v-if="currentLottery?.lotteryStatus == '0' && !isTimesUp"
      >
        <a
          class="icon-container flex flex-row items-center justify-center"
          @click="goToLotteryPage"
        >
          {{ $t("message.play") }}
          <mdicon
            class="custom-icon ml-2 scale-75 xs:scale-100"
            name="chevron-right"
            :height="18"
            :width="18"
          />
        </a>
      </button>
      <div
        v-if="currentLottery?.lotteryStatus == '0' && isTimesUp"
        class="animate-pulse text-left ml-6 sm:ml-16 prize bg-custom-number-text bg-clip-text font-semibold mt-2 text-xs sm:text-lg leading-relaxed"
      >
        {{ $t("message.stopBuy") }} <br />
        {{ $t("message.wait") }}
      </div>
      <button
        class="disabled btn-play-now pt-1 xs:pt-2 sm:pt-2 pb-1 xs:pb-2 sm:pb-3 pl-2 xs:pl-3 sm:pl-6 pr-1 xs:pr-2 sm:pr-4 bg-button-background-primary rounded-2xl font-semibold text-custom-white-text shadow-3xl text-xs xs:text-sm sm:text-xl ml-4 xs:ml-6 sm:ml-16 mt-2 sm:mt-5 hover:opacity-80"
        v-if="currentLottery?.lotteryStatus == '1'"
      >
        <a class="icon-container flex flex-row items-center justify-center">
          {{ $t("message.play") }}
          <mdicon
            class="custom-icon scale-75 xs:scale-100 ml-2"
            name="chevron-right"
            :height="18"
            :width="18"
          />
        </a>
      </button>
      <button
        class="btn-play-now pt-1 xs:pt-2 sm:pt-2 pb-1 xs:pb-2 sm:pb-3 pl-2 xs:pl-3 sm:pl-6 pr-1 xs:pr-2 sm:pr-4 bg-button-background-primary rounded-2xl font-semibold text-custom-white-text shadow-3xl text-xs xs:text-sm sm:text-xl ml-4 xs:ml-6 sm:ml-16 mt-2 sm:mt-5 hover:opacity-80"
        v-if="currentLottery?.lotteryStatus == '2'"
        @click="goToLotteryPageAndScroll"
      >
        <a class="icon-container flex flex-row items-center justify-center">
          {{ $t("message.more") }}
          <mdicon
            class="custom-icon scale-75 sm:scale-100 ml-2"
            name="chevron-right"
            :height="18"
            :width="18"
          />
        </a>
      </button>
    </div>
    <div class="h-full">
      <img :src="images.number" class="number-image" />
      <img :src="images.logo" class="penguin-image" />
      <img :src="images.winter" class="winter-image" />
    </div>
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
      isTimesUp: false,
      currentTime: moment().unix(),
    };
  },
  mounted() {
    this.isTimesUp = moment().unix() > this?.currentLottery?.closingTimestamp;
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
        ? Web3.utils.fromWei(
            String(this.currentLottery?.prizePool),
            "picoether"
          )
        : null;
    },
  },
  watch: {
    currentLottery(newVal, oldVal) {
      if (oldVal?.lotteryStatus == "2" && newVal?.lotteryStatus == "0")
        this.isChangeFromClosedToOpen = true;
      this.isTimesUp = moment().unix() > this?.currentLottery?.closingTimestamp;
    },
  },
  methods: {
    formatDeadline() {
      return moment(this.deadline).format("DD/MM/YYYY, hh:mm A");
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

.prize {
  -webkit-text-fill-color: transparent;
}
.disabled {
  cursor: not-allowed;
  background-color: rgb(229, 229, 229);
}

@media only screen and (max-width: 319px) {
  .penguin-image {
    position: absolute;
    height: 60%;
    bottom: 0%;
    right: 0%;
    z-index: 1;
  }
  .number-image {
    position: absolute;
    top: -10%;
    right: -2%;
    height: 80%;
    z-index: 2;
  }
  .winter-image {
    position: absolute;
    bottom: -45%;
    right: -4%;
    height: 80%;
  }
}
@media only screen and (min-width: 320px) and (max-width: 479px) {
  .penguin-image {
    position: absolute;
    height: 70%;
    bottom: 0%;
    right: 0%;
    z-index: 1;
  }
  .number-image {
    position: absolute;
    top: -15%;
    right: -2%;
    height: 80%;
    z-index: 2;
  }
  .winter-image {
    position: absolute;
    bottom: -45%;
    right: -2%;
    height: 80%;
  }
}

@media only screen and (min-width: 480px) and (max-width: 767px) {
  .penguin-image {
    position: absolute;
    height: 70%;
    bottom: 0%;
    right: 0%;
    z-index: 1;
  }
  .number-image {
    position: absolute;
    top: -15%;
    right: 10%;
    height: 80%;
    z-index: 2;
  }
  .winter-image {
    position: absolute;
    bottom: -45%;
    right: -2%;
    height: 80%;
  }
}

@media only screen and (min-width: 768px) and (max-width: 991px) {
  .penguin-image {
    position: absolute;
    height: 80%;
    bottom: 0%;
    right: 0%;
    z-index: 1;
  }
  .number-image {
    position: absolute;
    top: -25%;
    right: 10%;
    height: 100%;
    z-index: 2;
  }
  .winter-image {
    position: absolute;
    bottom: -45%;
    right: -1%;
    height: 80%;
  }
}

@media only screen and (min-width: 992px) and(max-width: 1199px) {
  .penguin-image {
    position: absolute;
    height: 90%;
    bottom: 0%;
    right: 0%;
    z-index: 1;
  }
  .number-image {
    position: absolute;
    top: -25%;
    right: 15%;
    height: 100%;
    z-index: 2;
  }
  .winter-image {
    position: absolute;
    bottom: -55%;
    right: -3%;
    height: 100%;
  }
}

@media only screen and (min-width: 1200px) and (max-width: 1599px) {
  .penguin-image {
    position: absolute;
    height: 100%;
    bottom: 0%;
    right: 0%;
    z-index: 1;
  }
  .number-image {
    position: absolute;
    top: -25%;
    right: 20%;
    height: 120%;
    z-index: 2;
  }
  .winter-image {
    position: absolute;
    bottom: -60%;
    right: -3%;
    height: 110%;
  }
}

@media only screen and (min-width: 1600px) {
  .penguin-image {
    position: absolute;
    height: 100%;
    bottom: 0%;
    right: 0%;
    z-index: 1;
  }
  .number-image {
    position: absolute;
    top: -25%;
    right: 15%;
    height: 120%;
    z-index: 2;
  }
  .winter-image {
    position: absolute;
    bottom: -60%;
    right: -2%;
    height: 110%;
  }
}
</style>
