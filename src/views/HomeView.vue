<template>
  <div
    class="home pt-24 pb-8 px-80 bg-custom-background-home-light w-full"
    :class="{ dark: darkTheme }"
  >
    <DashBoard />
    <div
      class="connect-wallet-container mt-12 w-full flex flex-row items-start relative"
    >
      <div class="left w-3/5 pt-40 flex flex-col items-start">
        <span
          class="connect-wallet-title text-custom-purple-title text-6xl font-semibold leading-loose"
        >
          Every day a pleasure.
        </span>
        <p
          class="connect-wallet-description text-custom-purple-description font-semibold text-lg text-left"
        >
          Bet and win crypto on the most popular decentralized platform
          <br />
          in the world.
        </p>
        <div class="btn-container flex flex-row mt-8">
          <button
            class="connect-wallet-btn font-semibold px-6 py-3 bg-button-background-primary text-custom-white-text rounded-2xl shadow-3xl hover:opacity-80"
          >
            Connect Wallet
          </button>
          <button
            class="read-more-btn font-semibold px-6 py-3 border-2 border-button-background-primary rounded-2xl text-button-background-primary ml-6 hover:opacity-80"
          >
            Read More
          </button>
        </div>
      </div>
      <div class="right flex flex-row justify-end animate-shake">
        <img :src="images.penguin" class="penguin-image h-px-540" />
      </div>
    </div>
    <div class="introduction w-full py-40">
      <div class="top flex flex-col items-center">
        <mdicon
          name="penguin"
          :width="64"
          :height="64"
          class="text-custom-purple-title"
        />
        <p
          class="title mt-6 text-4xl text-custom-purple-text-bold leading-tight font-semibold"
        >
          Used by millions. <br />
          Trusted with billions.
        </p>
        <p
          class="description text-custom-purple-text-light text-normal leading-normal mt-8"
        >
          PenguinLott has the most users of any decentralized platform, ever.<br />
          And those users are now entrusting the platform with over $12 billion
          in funds.
        </p>
        <p
          class="question text-custom-purple-text-light text-normal leading-normal mt-6 font-medium"
        >
          Will you join them?
        </p>
        <div class="card-container flex flex-row w-full justify-center mt-8">
          <div
            class="card bg-custom-background-card-light mx-4 rounded-2xl relative mb-4 w-1/4 h-72"
          >
            <mdicon
              name="account-group-outline"
              :width="48"
              :height="48"
              color="rgb(154, 106, 255)"
              class="custom-icon absolute top-6 right-6 z-10 text-custom-purple-title"
            />
            <p
              class="card-number absolute top-1/3 left-8 text-5xl font-semibold text-left z-10"
            >
              3 million <br />
              <span class="card-name-user text-custom-purple-title">users</span>
            </p>
            <p
              class="description absolute bottom-8 left-8 z-10 text-lg text-custom-purple-text-light"
            >
              In the last 30 days
            </p>
            <div
              class="behind behind bg-white w-p-99 h-p-98 absolute top-px left-px rounded-2xl"
            ></div>
          </div>
          <div
            class="card bg-custom-background-card-light mx-4 rounded-2xl relative mb-4 w-1/4 h-72"
          >
            <mdicon
              name="gamepad"
              :width="48"
              :height="48"
              class="custom-icon absolute top-6 right-6 z-10 text-custom-cyan-light"
            />
            <p
              class="card-number absolute top-1/3 left-8 text-5xl font-semibold text-left z-10"
            >
              126 <br />
              <span class="card-name-day text-custom-cyan-light">rounds</span>
            </p>
            <p
              class="description absolute bottom-8 left-8 z-10 text-lg text-custom-purple-text-light"
            >
              with fully automatic mode
            </p>
            <div
              class="behind bg-white w-p-99 h-p-98 absolute top-px left-px rounded-2xl"
            ></div>
          </div>
          <div
            class="card bg-custom-background-card-light mx-4 rounded-2xl relative mb-4 w-1/4 h-72"
          >
            <mdicon
              name="cash-100"
              :width="48"
              :height="48"
              class="custom-icon absolute top-6 right-6 z-10 text-custom-pink-text"
            />
            <p
              class="card-number absolute top-1/3 left-8 text-5xl font-semibold text-left z-10"
            >
              $5 million <br />
              <span class="card-name-stake text-custom-pink-text">staked</span>
            </p>
            <p
              class="description absolute bottom-8 left-8 z-10 text-lg text-custom-purple-text-light"
            >
              Total value locked
            </p>
            <div
              class="behind bg-white w-p-99 h-p-98 absolute top-px left-px rounded-2xl"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="start bg-custom-background-start-home py-20 relative">
    <span class="title text-custom-white-text text-3xl font-semibold">
      Start in seconds.
    </span>
    <p class="description text-custom-white-text font-normal mt-6">
      Connect your crypto wallet to start using the app in seconds.
    </p>
    <p class="extra text-custom-white-text font-bold font-normal mb-6">
      No registration needed.
    </p>
    <a
      href=""
      class="link font-normal absolute left-0 right-0 cursor-pointer text-custom-white-text text-custom-cyan-light font-bold hover:underline z-10"
      >Learn how to start</a
    >
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
