<template>
  <div
    class="home pt-8 xs:pt-12 sm:pt-16 md:pt-20 pb-8 px-4 sm:px-8 md:px-12 lg:px-40 bg-custom-background-home-light w-full"
    :class="{ dark: darkTheme }"
  >
    <DashBoard />
    <div
      class="connect-wallet-container mt-3 xs:mt-3 sm:mt-32 w-full flex flex-row items-start relative"
    >
      <div
        class="left w-3/5 pt-12 xs:pt-20 sm:pt-40 md:pt-42 lg:pt-48 xl:pt-54 flex flex-col items-start"
      >
        <span
          class="connect-wallet-title text-custom-purple-title text-left text-sm xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl xxl:text-6xl font-semibold leading-loose"
        >
          {{ $t("message.home-title") }}
        </span>
        <p
          class="connect-wallet-description text-custom-purple-description xs:font-semibold text-xxs xs:text-xs sm:text-lg text-left"
        >
          {{ $t("message.h1") }}
          <br />
          {{ $t("message.h2") }}.
        </p>
        <div
          class="btn-container flex flex-row text-xxxs xs:text-xs sm:text-base mt-2 sm:mt-8"
        >
          <button
            class="connect-wallet-btn font-semibold px-2 sm:px-10 py-1 sm:py-3 bg-button-background-primary text-custom-white-text rounded-2xl shadow-3xl hover:opacity-80"
          >
            <router-link to="/lottery">
              {{ $t("message.play") }}
            </router-link>
          </button>
          <button
            class="read-more-btn font-semibold px-2 sm:px-6 py-1 sm:py-3 border-2 border-button-background-primary rounded-2xl text-button-background-primary ml-2 sm:ml-6 hover:opacity-80"
          >
            <router-link to="/tutorial"> {{ $t("message.h3") }} </router-link>
          </button>
        </div>
      </div>
      <div class="right flex flex-row justify-end animate-shake">
        <img
          :src="images.penguin"
          class="penguin-image mt-30 xs:mt-32 sm:mt-0 md:mt-24 xl:mt-38 h-24 xs:h-40 sm:h-40 md:h-72 xl:h-96 xxl:h-px-540"
        />
      </div>
    </div>
    <div class="introduction w-full py-12 sm:py-40">
      <div class="top flex flex-col items-center">
        <mdicon
          name="penguin"
          :width="64"
          :height="64"
          class="text-custom-purple-title scale-50 xs:scale-75 sm:scale-100"
        />
        <p
          class="title mt-0 xs:mt-3 sm:mt-6 text-sm xs:text-lg sm:text-4xl text-custom-purple-text-bold leading-tight font-semibold"
        >
          {{ $t("message.h4") }}. <br />
          {{ $t("message.h5") }}.
        </p>
        <p
          class="description text-custom-purple-text-light text-xxs xs:text-xs sm:text-base leading-normal mt-3 sm:mt-8"
        >
          {{ $t("message.h6") }} <br />. {{ $t("message.h61") }}
        </p>
        <p
          class="question text-custom-purple-text-light text-xxs xs:text-xs sm:text-base leading-normal mt-2 sm:mt-6 font-medium mb-5"
        >
          {{ $t("message.h7") }}?
        </p>
        <div
          class="card-container flex flex-col items-center sm:flex-row w-full justify-center mt-2 xs:mt-4 sm:mt-8 px-3 xs:px-8"
        >
          <div
            class="card bg-custom-background-card-light mx-1 xs:mx-3 sm:mx-4 rounded-2xl relative mb-2 xs:mb-4 w-full md:w-1/4 h-28 xs:h-40 sm:h-72"
          >
            <mdicon
              name="account-group-outline"
              :width="48"
              :height="48"
              color="rgb(154, 106, 255)"
              class="custom-icon absolute scale-50 xs:scale-75 sm:scale-100 top-0 xs:top-3 sm:top-6 right-6 z-10 text-custom-purple-title"
            />
            <p
              class="card-number absolute top-3 xs:top-7 left-8 text-base xs:text-2xl sm:text-5xl font-semibold text-left z-10"
            >
              3 <br />
              {{ $t("message.h8") }}
              <span class="card-name-user text-custom-purple-title">
                {{ $t("message.h9") }}</span
              >
            </p>
            <p
              class="description absolute bottom-8 left-8 z-10 text-sm xs:text-base sm:text-lg text-custom-purple-text-light"
            >
              {{ $t("message.h10") }}
            </p>
            <div
              class="behind behind bg-white w-p-99 h-p-98 absolute top-px left-px rounded-2xl"
            ></div>
          </div>
          <div
            class="card bg-custom-background-card-light mx-1 xs:mx-3 sm:mx-4 rounded-2xl relative mb-2 xs:mb-4 w-full md:w-1/4 h-28 xs:h-40 sm:h-72"
          >
            <mdicon
              name="gamepad"
              :width="48"
              :height="48"
              class="custom-icon absolute scale-50 xs:scale-75 sm:scale-100 top-0 xs:top-3 sm:top-6 right-6 z-10 text-custom-cyan-light"
            />
            <p
              class="card-number absolute top-3 xs:top-7 left-8 text-base xs:text-2xl sm:text-5xl font-semibold text-left z-10"
            >
              362 <br />
              <span class="card-name-day text-custom-cyan-light">
                {{ $t("message.h11") }}</span
              >
            </p>
            <p
              class="description absolute bottom-8 left-8 z-10 text-sm xs:text-base sm:text-lg text-custom-purple-text-light"
            >
              {{ $t("message.h12") }}
            </p>
            <div
              class="behind bg-white w-p-99 h-p-98 absolute top-px left-px rounded-2xl"
            ></div>
          </div>
          <div
            class="card bg-custom-background-card-light mx-1 xs:mx-3 sm:mx-4 rounded-2xl relative mb-2 xs:mb-4 w-full md:w-1/4 h-28 xs:h-40 sm:h-72"
          >
            <mdicon
              name="cash-100"
              :width="48"
              :height="48"
              class="custom-icon absolute scale-50 xs:scale-75 sm:scale-100 top-0 xs:top-3 sm:top-6 right-6 z-10 text-custom-pink-text"
            />
            <p
              class="card-number absolute top-3 xs:top-7 left-8 text-base xs:text-2xl sm:text-5xl font-semibold text-left z-10"
            >
              $12 <br />{{ $t("message.h13") }}
              <span class="card-name-stake text-custom-pink-text">
                {{ $t("message.h14") }}</span
              >
            </p>
            <p
              class="description absolute bottom-8 left-8 z-10 text-sm xs:text-base sm:text-lg text-custom-purple-text-light"
            >
              {{ $t("message.h15") }}
            </p>
            <div
              class="behind bg-white w-p-99 h-p-98 absolute top-px left-px rounded-2xl"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    class="start bg-custom-background-start-home py-6 xs:py-10 sm:py-20 relative"
  >
    <span
      class="title text-custom-white-text text-sm xs:text-xl sm:text-3xl font-semibold"
    >
      {{ $t("message.h16") }}.
    </span>
    <p
      class="description text-custom-white-text text-xxs xs:text-sm sm:text-base font-normal mt-6"
    >
      {{ $t("message.h17") }}.
    </p>
    <p
      class="extra text-custom-white-text text-xxs xs:text-sm sm:text-base font-bold font-normal mb-6"
    >
      {{ $t("message.h18") }}.
    </p>
    <router-link
      to="/tutorial"
      class="link font-normal text-xxs xs:text-sm sm:text-base absolute -mt-3 xs:mt-0 left-0 right-0 cursor-pointer text-custom-cyan-light font-bold hover:underline z-10"
    >
      {{ $t("message.h19") }}
    </router-link>
    <ul class="circles absolute top-0 left-0 w-full h-full overflow-hidden">
      <li v-for="index in 10" :key="index" class="animate-rotation"></li>
    </ul>
  </div>
</template>

<script>
import penguin from "@/assets/images/penguin-1.png";
import { mapState } from "vuex";
import DashBoard from "@/components/DashBoard/DashBoard.vue";
export default {
  name: "HomeView",
  components: { DashBoard },
  computed: {
    ...mapState(["darkTheme"]),
  },
  data() {
    return {
      images: { penguin },
    };
  },
};
</script>

<style lang="scss" scoped>
@use "@/assets/css/variables";
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
.dark {
  background: radial-gradient(103.12% 50% at 50% 50%, #21193a 0, #191326 100%);
  .connect-wallet-container {
    .left {
      .connect-wallet-description {
        color: variables.$custom-white-text;
      }
    }
  }
  .introduction {
    .top {
      .title {
        color: variables.$custom-white-text;
      }
      .description {
        color: variables.$custom-icon-nav;
      }
      .question {
        color: variables.$custom-icon-nav;
      }
      .card-container {
        .card {
          background: variables.$custom-shadow-card;
          .behind {
            background: variables.$dark-background-nav;
          }
          .card-number {
            color: variables.$custom-white-text;
          }
        }
      }
    }
  }
}
</style>
