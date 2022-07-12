<template>
  <div class="lottery w-full" :class="{ dark: darkTheme }">
    <div
      class="buy-ticket-container relative bg-custom-background-start-home w-full pt-8 xs:pt-16 sm:pt-40 pb-0 box-border overflow-hidden flex flex-col items-center"
    >
      <span
        class="title text-custom-white-text text-xs xs:text-lg sm:text-2xl font-semibold"
        v-if="currentLottery?.lotteryStatus == '0'"
      >
        {{ $t("message.l1") }}
      </span>
      <span
        class="title text-custom-white-text text-xs xs:text-lg sm:text-2xl font-semibold"
        v-if="currentLottery?.lotteryStatus == '1'"
      >
        {{ $t("message.l2") }}
      </span>
      <span
        class="title text-custom-white-text text-xs xs:text-lg sm:text-2xl font-semibold"
        v-if="currentLottery?.lotteryStatus == '2'"
      >
        {{ $t("message.l3") }}
      </span>
      <p
        class="prize bg-custom-number-text bg-clip-text font-semibold text-2xl xs:text-4xl sm:text-6xl leading-relaxed"
        v-if="currentLottery?.lotteryStatus == '0'"
      >
        ${{ prizePool }}
      </p>
      <p
        class="description text-custom-white-text font-semibold text-xs xs:text-lg sm:text-2xl"
        v-if="currentLottery?.lotteryStatus == '0'"
      >
        {{ $t("message.l4") }}!
      </p>
      <p
        class="prize bg-custom-number-text bg-clip-text font-semibold mt-4 sm:mt-24 text-sm xs:text-xl sm:text-3xl leading-relaxed flex flex-row items-end"
        v-if="currentLottery?.lotteryStatus == '1'"
      >
        {{ $t("message.l5") }}
        <img :src="loadingSVG" class="ml-2 h-6 xs:h-8 sm:h-10" />
      </p>
      <p
        class="description text-custom-white-text font-semibold text-xxs xs:text-sm sm:text-xl mt-4"
        v-if="currentLottery?.lotteryStatus == '2'"
      >
        {{ $t("message.l6") }}
      </p>
      <div v-if="currentLottery?.winningNumbers?.length > 1">
        <p
          class="prize bg-custom-number-text bg-clip-text font-semibold text-base xs:text-3xl sm:text-7xl leading-relaxed"
          v-if="currentLottery?.lotteryStatus == '2'"
        >
          {{ currentLottery?.winningNumbers }}
        </p>
      </div>
      <div v-else>
        <p
          class="prize bg-custom-number-text bg-clip-text font-semibold text-base xs:text-3xl sm:text-7xl leading-relaxed"
          v-if="currentLottery?.lotteryStatus == '2'"
        >
          0{{ currentLottery?.winningNumbers }}
        </p>
      </div>
      <p
        class="font-semibold text-xxs xs:text-base sm:text-2xl leading-relaxed text-custom-white-text"
        v-if="currentLottery?.lotteryStatus == '2'"
      >
        {{ $t("message.round") }}: #{{ currentLottery?.lotteryID }}
      </p>
      <p
        class="font-semibold text-xxxs xs:text-sm sm:text-xl leading-relaxed text-custom-white-text"
        v-if="currentLottery?.lotteryStatus == '2'"
      >
        {{ $t("message.drawnAt") }}: {{ formatDeadline() }}
      </p>
      <div
        class="button-container mb-8 sm:mb-20 flex flex-row items-center justify-center w-28 xs:w-32 sm:w-72 h-28 xs:h-32 sm:h-72 animate-rotationButton overflow-hidden z-10"
        v-if="
          currentLottery?.lotteryStatus == '0' && !isTimesUp && isConnectWallet
        "
      >
        <button
          class="btn-buy-tickets bg-custom-background-start-home rounded-2xl w-20 xs:w-24 sm:w-48 py-2 text-custom-white-text font-semibold hover:opacity-80 text-xxs xs:text-xs sm:text-xl"
          @click="handleBuyTicket"
        >
          {{ $t("message.buy-tickets") }}
        </button>
      </div>
      <div
        class="button-container mb-8 sm:mb-20 flex flex-row items-center justify-center w-28 xs:w-32 sm:w-72 h-28 xs:h-32 sm:h-72 animate-rotationButton overflow-hidden z-10"
        v-if="!isConnectWallet"
      >
        <button
          class="btn-buy-tickets bg-custom-background-start-home rounded-2xl w-20 xs:w-24 sm:w-48 py-2 text-custom-white-text font-semibold hover:opacity-80 text-xxs xs:text-xs sm:text-xl"
          @click="handleConnectWallet"
        >
          {{ $t("message.connect-wallet") }}
        </button>
      </div>
      <div
        class="animate-pulse w-full mt-4 prize bg-custom-number-text bg-clip-text font-semibold mt-2 xs:mt-4 sm:mt-16 text-xxxs xs:text-sm sm:text-xl leading-relaxed relative overflow-hidden z-10 mb-8 sm:mb-32"
        v-if="currentLottery?.lotteryStatus == '0' && isTimesUp"
      >
        {{ $t("message.l7") }}. <br />
        {{ $t("message.l8") }}
      </div>

      <button
        class="btn-buy-tickets bg-slate-200 py-1 xs:py-2 sm:py-3 px-3 sm:px-4 rounded-2xl mt-8 xs:mt-16 text-slate-400 font-semibold hover:opacity-80 text-xxxs xs:text-sm sm:text-xl cursor-not-allowed mb-8 sm:mb-32"
        v-if="currentLottery?.lotteryStatus == '1'"
      >
        {{ $t("message.l9") }}!
      </button>

      <button
        v-if="currentLottery?.lotteryStatus == '2'"
        class="btn-buy-tickets bg-slate-200 py-1 xs:py-2 sm:py-3 px-3 sm:px-4 rounded-2xl mt-8 xs:mt-24 text-slate-400 font-semibold hover:opacity-80 text-xxxs xs:text-sm sm:text-xl cursor-not-allowed mb-12 sm:mb-32"
      >
        {{ $t("message.l10") }}!
      </button>
      <ul class="circles absolute top-0 left-0 w-full h-full overflow-hidden">
        <li v-for="index in 10" :key="index" class="animate-rotation"></li>
      </ul>
    </div>
    <div
      class="get-ticket flex flex-col items-center bg-custom-get-ticket-background relative px-4 sm:px-60 py-12 sm:py-24"
    >
      <p
        class="title text-custom-white-text font-semibold text-base xs:text-2xl sm:text-4xl leading-5"
        v-if="currentLottery?.lotteryStatus == '0' && !isTimesUp"
      >
        {{ $t("message.l11") }}!
      </p>
      <p
        class="title text-custom-white-text font-semibold text-base xs:text-2xl sm:text-4xl leading-5"
        v-if="currentLottery?.lotteryStatus == '0' && isTimesUp"
      >
        {{ $t("message.l12") }}!
      </p>
      <p
        class="title text-custom-white-text font-semibold text-base xs:text-2xl sm:text-4xl leading-5"
        v-if="currentLottery?.lotteryStatus != '0'"
      >
        {{ $t("message.l13") }}
      </p>
      <div
        class="count-down-container mt-2 sm:mt-8"
        v-if="currentLottery?.lotteryStatus == '0'"
      >
        <Countdown
          class="count-down hidden xs:flex"
          v-if="currentLottery !== null"
          mainColor="#fff"
          labelColor="#fff"
          :deadlineISO="deadline"
          @timeElapsed="isTimesUp = true"
        />
        <Countdown
          class="count-down flex xs:hidden"
          v-if="currentLottery !== null"
          mainColor="#fff"
          labelColor="#fff"
          labelSize="0.5rem"
          countdownSize="1rem"
          :deadlineISO="deadline"
          @timeElapsed="isTimesUp = true"
        />
      </div>
      <div
        class="draw-container w-full sm:w-2/3 bg-white rounded-2xl mt-3 xs:mt-4 sm:mt-9 flex flex-col items-center box-border"
      >
        <div
          class="title bg-custom-title-draw-light w-full rounded-t-2xl flex flex-row justify-between box-border px-2 xs:px-4 sm:px-8 py-1 xs:py-2 sm:py-4"
        >
          <div
            class="left text-xxs xs:text-sm sm:text-xl font-semibold"
            v-if="currentLottery?.lotteryStatus == '0'"
          >
            {{ $t("message.l14") }}
          </div>
          <div
            class="left text-xxs xs:text-sm sm:text-xl font-semibold"
            v-if="currentLottery?.lotteryStatus == '2'"
          >
            {{ $t("message.l15") }}
          </div>
          <div class="right text-xxs xs:text-xs sm:text-lg">
            #{{ this.currentLottery?.lotteryID }} | {{ $t("message.drawnAt") }}:
            {{ deadlineFormat }}
          </div>
        </div>
        <div
          class="content flex flex-row box-border w-full px-2 xs:px-4 sm:px-8 pt-1 xs:pt-3 sm:pt-6 pb-1 xs:pb-2 sm:pb-3"
        >
          <div
            class="key text-xxs xs:text-sm sm:text-xl font-semibold mt-2 w-1/3 sm:w-40 text-left"
          >
            {{ $t("message.prize") }}
          </div>
          <div class="value flex flex-row items-end">
            <div
              class="top text-sm xs:text-2xl sm:text-5xl font-semibold text-custom-prize-pot"
            >
              ~${{ prizePool }}
            </div>
            <div class="usd text-xxs xs:text-sm sm:text-xl ml-2 sm:ml-4">
              USD
            </div>
          </div>
        </div>
        <div
          class="content flex flex-row items-center box-border w-full px-4 sm:px-8 pt-2 sm:pt-4 pb-4 sm:pb-8"
        >
          <div
            class="key text-xxs xs:text-sm sm:text-xl font-semibold w-1/3 sm:w-40 text-left"
          >
            {{ $t("message.l13") }}
          </div>

          <button
            class="btn-buy-tickets font-semibold border-2 border-button-background-primary text-xxxs xs:text-xs sm:text-base mr-3 px-1 xs:px-3 sm:px-6 py-1 xs:py-2 sm:py-3 border-button-background-primary text-button-background-primary rounded-2xl hover:opacity-80"
            @click="setIsOpenTicketsModal(true)"
          >
            {{ $t("message.l16") }}
          </button>
          <button
            class="btn-buy-tickets font-semibold px-1 xs:px-3 sm:px-6 py-1 xs:py-2 sm:py-3 bg-button-background-primary text-custom-white-text text-xxxs xs:text-xs sm:text-base rounded-2xl shadow-3xl hover:opacity-80"
            @click="handleBuyTicket"
            v-if="
              currentLottery?.lotteryStatus == '0' &&
              !isTimesUp &&
              isConnectWallet
            "
          >
            {{ $t("message.buy-tickets") }}
          </button>
          <button
            class="btn-buy-tickets font-semibold px-1 xs:px-3 sm:px-4 py-1 xs:py-2 sm:py-3 bg-button-background-primary text-custom-white-text text-xxxs xs:text-xs sm:text-base rounded-2xl shadow-3xl hover:opacity-80"
            @click="handleConnectWallet"
            v-if="!isConnectWallet"
          >
            {{ $t("message.connect-wallet") }}
          </button>
        </div>
      </div>
    </div>
    <div
      class="connect relative bg-custom-winner-background overflow-hidden py-8 sm:py-20"
    >
      <div
        class="title text-xxs xs:text-sm sm:text-xl font-semibold mb-1 xs:mb-2 sm:mb-6 text-custom-white-text"
        v-if="!isConnectWallet"
      >
        {{ $t("message.l17") }}<br />
        {{ $t("message.l18") }}!
      </div>

      <div
        class="title text-xxs xs:text-sm sm:text-xl font-semibold mb-1 xs:mb-2 sm:mb-6 text-custom-white-text"
        v-else
      >
        {{ $t("message.l19") }}?
      </div>
      <button
        v-if="!isConnectWallet"
        @click="handleConnectWallet"
        class="connect-wallet-btn text-xxxs xs:text-xs sm:text-base font-semibold px-1 xs:px-3 sm:px-6 py-1 xs:py-2 sm:py-3 bg-button-background-primary text-custom-white-text rounded-2xl shadow-3xl hover:opacity-80"
      >
        {{ $t("message.connect-wallet") }}
      </button>
      <button
        v-else
        class="connect-wallet-btn font-semibold text-xxxs xs:text-xs sm:text-base px-1 xs:px-3 sm:px-6 py-1 xs:py-2 sm:py-3 bg-button-background-primary text-custom-white-text rounded-2xl shadow-3xl hover:opacity-80"
        @click="handleOpenWalletModal"
      >
        {{ $t("message.l20") }}
      </button>
      <img
        :src="images.coin"
        class="wallet-icon h-6 xs:12 sm:h-20 absolute left-2/3 animate-rotationFast"
      />
      <img
        :src="images.coin"
        class="coin-icon h-6 xs:12 sm:h-20 absolute left-1/4 animate-rotationFast"
      />
    </div>
    <div
      class="finished-rounds flex flex-col items-center bg-custom-round-background py-4 xs:py-8 sm:py-20 px-4 xs:px-4 sm:px-0"
    >
      <div class="title text-sm xs:text-2xl sm:text-5xl font-semibold">
        {{ $t("message.l21") }}
      </div>
      <div
        class="round-container w-full sm:w-1/2 bg-white mt-3 sm:mt-9 rounded-2xl"
      >
        <div
          class="top p-2 xs:p-4 sm:p-8 flex flex-row justify-between items-start"
        >
          <div class="left">
            <div
              class="round text-xxs xs:text-sm sm:text-xl font-semibold flex flex-row items-center"
            >
              {{ $t("message.round") }}
              <div
                class="index font-semibold bg-custom-number-background text-custom-white-text text-xxxs xs:text-sm sm:text-base rounded-2xl py-px sm:py-1 px-2 sm:px-4 ml-2 sm:ml-4"
              >
                {{ temperatureLottery?.lotteryID }}
              </div>
            </div>
            <div
              class="deadline text-xxs xs:text-sm sm:text-base mt-2 w-full text-left"
            >
              {{ $t("message.drawnAt") }}: {{ deadlineFormatTemperature }}
            </div>
          </div>
          <div class="right flex flex-row items-center">
            <mdicon
              name="arrow-left"
              :width="20"
              :height="20"
              class="cursor-pointer scale-50 xs:scale-75 sm:scale-100"
              @click="handleDecrease"
              :class="{ disable: isDisableBack }"
            />
            <mdicon
              name="arrow-right"
              :width="20"
              :height="20"
              class="ml-4 cursor-pointer scale-50 xs:scale-75 sm:scale-100"
              @click="handleIncrease"
              :class="{ disable: isDisableNext }"
            />
            <mdicon
              name="arrow-collapse-right"
              :width="20"
              :height="20"
              class="ml-4 cursor-pointer scale-50 xs:scale-75 sm:scale-100"
              @click="handleToLast"
              :class="{ disable: isDisableNext }"
            />
          </div>
        </div>
        <TheDivider />
        <div
          class="middle overflow-hidden p-2 xs:p-4 sm:p-8 flex flex-row items-start justify-between relative"
        >
          <div class="left text-xxs xs:text-sm sm:text-xl font-semibold">
            {{ $t("message.l22") }}
          </div>
          <div
            class="right flex flex-row mr-0 sm:mr-4"
            v-if="temperatureLottery?.winningNumbers.length !== 1"
          >
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
          <div class="right flex flex-row mr-0 sm:mr-4" v-else>
            <NumberLottery :number="0" class="mr-2" />
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
            class="bg-custom-purple-bold p-px sm:p-2 w-20 xs:w-32 sm:w-48 text-xxxs xs:text-xs sm:text-sm text-custom-white-text absolute top-1 xs:top-3 -right-8 xs:-right-12 sm:-right-16 rotate-45"
          >
            {{ $t("message.l23") }}
          </div>
        </div>
        <TheDivider />
        <div
          v-if="isShowDetailRound"
          class="prize-pot-container bg-white flex flex-row py-1 xs:py-2 sm:py-6 px-2 xs:px-4 sm:px-8 rounded-b-2xl"
        >
          <div class="left flex flex-col items-start">
            <div
              class="prize-pot-title text-xxs xs:text-sm sm:text-xl font-semibold"
            >
              {{ $t("message.prize") }}
            </div>
            <div class="value flex flex-row items-end">
              <div
                class="top text-xs xs:text-xl sm:text-4xl font-semibold text-custom-prize-pot"
              >
                ~${{ prizePoolTemperature }}
              </div>
              <div class="usd text-xxs xs:text-xs sm:text-xl ml-2">USD</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="how-to-play bg-custom-background-htp py-4 xs:py-8 sm:py-16 px-4 sm:px-16 flex flex-col items-center"
    >
      <div
        class="title text-custom-purple-title text-sm xs:text-2xl sm:text-4xl font-semibold leading-loose"
      >
        {{ $t("message.l24") }}
      </div>
      <div
        class="description text-xxxs xs:text-sm sm:text-base text-custom-purple-description"
      >
        {{ $t("message.l25") }}. <br />{{ $t("message.l26") }}!
      </div>
      <div
        class="card-container flex flex-col sm:flex-row w-full items-center justify-center mt-4 xs:mt-8"
      >
        <div
          class="card bg-custom-background-card-light mx-px mx-2 sm:mx-4 mb-2 xs:mb-4 sm:mb-6 rounded-2xl relative w-full sm:w-1/4 h-28 xs:h-32 sm:h-48"
        >
          <p
            class="card-title text-custom-purple-title text-sm xs:text-xl sm:text-2xl font-semibold absolute top-8 sm:top-12 left-6 z-10"
          >
            {{ $t("message.buy-tickets") }}
          </p>
          <p
            class="description text-custom-purple-text-light text-xxxs xs:text-xs sm:text-normal absolute top-16 sm:top-24 left-6 text-left w-10/12 z-10"
          >
            {{ $t("message.l27") }}.
          </p>
          <div
            class="behind behind bg-white w-p-99 h-p-98 absolute top-px left-px rounded-2xl"
          ></div>
          <div
            class="step-number text-xs xs:text-sm sm:text-base absolute top-4 right-6"
          >
            {{ $t("message.step").toUpperCase() }} 1
          </div>
        </div>
        <div
          class="card bg-custom-background-card-light mx-2 sm:mx-4 mb-2 xs:mb-4 sm:mb-6 rounded-2xl relative w-full sm:w-1/4 h-28 xs:h-32 sm:h-48"
        >
          <p
            class="card-title text-custom-purple-title text-sm xs:text-xl sm:text-2xl font-semibold absolute top-8 sm:top-12 left-6 z-10"
          >
            {{ $t("message.l28") }}
          </p>
          <p
            class="description text-custom-purple-text-light text-xxxs xs:text-xs sm:text-normal absolute top-16 sm:top-24 left-6 text-left w-10/12 z-10"
          >
            {{ $t("message.l29") }}
          </p>
          <div
            class="behind behind behind bg-white w-p-99 h-p-98 absolute top-px left-px rounded-2xl"
          ></div>
          <div
            class="step-number text-xs xs:text-sm sm:text-base absolute top-4 right-6"
          >
            {{ $t("message.step").toUpperCase() }} 2
          </div>
        </div>
        <div
          class="card bg-custom-background-card-light mx-2 sm:mx-4 mb-2 xs:mb-4 sm:mb-6 rounded-2xl relative w-full sm:w-1/4 h-28 xs:h-32 sm:h-48"
        >
          <p
            class="card-title text-custom-purple-title text-sm xs:text-xl sm:text-2xl font-semibold absolute top-8 sm:top-12 left-6 z-10"
          >
            {{ $t("message.l30") }}
          </p>
          <p
            class="description text-custom-purple-text-light text-xxxs xs:text-xs sm:text-normal absolute top-16 sm:top-24 left-6 text-left w-10/12 z-10"
          >
            {{ $t("message.l31") }}!
          </p>
          <div
            class="behind behind bg-white w-p-99 h-p-98 absolute top-px left-px rounded-2xl"
          ></div>
          <div
            class="step-number text-xs xs:text-sm sm:text-base absolute top-4 right-6"
          >
            {{ $t("message.step").toUpperCase() }} 3
          </div>
        </div>
      </div>
      <TheDivider class="w-full sm:w-4/5 mt-2 xs:mt-4" />
      <div
        class="winning-criteria flex flex-row px-2 xs:px-4 sm:px-40 justify-between w-full box-border"
      >
        <div class="left py-4 xs:py-8 sm:py-16 text-left w-2/3 sm:w-3/5">
          <div
            class="title leading-loose text-custom-purple-title text-sm xs:text-base sm:text-2xl font-semibold"
          >
            {{ $t("message.l32") }}
          </div>
          <div
            class="description text-xxxs xs:text-sm sm:text-lg font-semibold leading-loose"
          >
            {{ $t("message.l33") }}.
          </div>
          <div
            class="content text-xxxs xs:text-xs sm:text-base text-custom-purple-text-light"
          >
            {{ $t("message.l34") }}.
            <ul class="ml-4 mb-2 list-disc">
              <li>{{ $t("message.l35") }}.</li>
              <li>{{ $t("message.l36") }}.</li>
            </ul>
            {{ $t("message.l37") }}.
          </div>
        </div>
        <div
          class="right bg-custom-background-card-light rounded-2xl overflow-hidden relative mb-4 w-1/3 sm:w-1/3 h-20 xs:h-32 sm:h-56 mt-36 ml-2 sm:ml-0"
        >
          <div
            class="behind bg-white w-p-99 h-p-98 absolute top-px left-px rounded-2xl"
          ></div>
          <div class="top-example flex flex-row ml-1 xs:ml-3 sm:ml-12 mt-3">
            <NumberLottery
              number="3"
              class="ml-4 xs:ml-2 sm:ml-0"
              style="transform: scale(0.4)"
            />
            <NumberLottery
              number="7"
              class="-ml-2 xs:-ml-5 sm:-ml-9"
              style="transform: scale(0.4)"
            />
          </div>
          <div
            class="example-a flex flex-row items-center ml-2 xs:ml-2 sm:ml-6 -mt-3 xs:-mt-2 sm:-mt-6"
          >
            <div
              class="title mr-0 xs:mr-0 sm:mr-3 text-xxs xs:text-sm sm:text-lg text-custom-purple-title z-10 font-semibold"
            >
              A
            </div>
            <NumberLottery number="3" style="transform: scale(0.4)" />
            <NumberLottery
              class="-ml-2 xs:-ml-5 sm:-ml-9"
              number="7"
              style="transform: scale(0.4)"
            />
            <mdicon
              name="check"
              style="color: #00c853; z-index: 10"
              :width="20"
              :height="20"
              class="scale-50 xs:scale-75 sm:scale-100"
            />
          </div>
          <div
            class="example-a flex flex-row items-center ml-2 xs:ml-2 sm:ml-6 -mt-3 xs:-mt-3 sm:-mt-6"
          >
            <div
              class="title mr-0 xs:mr-0 sm:mr-3 text-xxs xs:text-sm sm:text-lg text-custom-purple-title z-10 font-semibold"
            >
              B
            </div>
            <NumberLottery number="7" style="transform: scale(0.4)" />
            <NumberLottery
              class="-ml-2 xs:-ml-5 sm:-ml-9"
              number="3"
              style="transform: scale(0.4)"
            />
            <mdicon
              name="close"
              style="color: #ef5350; z-index: 10"
              :width="20"
              :height="20"
              class="scale-50 xs:scale-75 sm:scale-100"
            />
          </div>
        </div>
      </div>
      <TheDivider class="w-full sm:w-4/5 mt-3 sm:mt-4" />
      <div
        class="prize-funds flex flex-row px-2 xs:px-4 sm:px-40 justify-between w-full box-border"
      >
        <div class="left py-2 xs:py-8 sm:py-16 text-left w-full sm:w-3/5">
          <div
            class="title text-sm xs:text-base sm:text-2xl text-custom-purple-title font-semibold leading-loose"
          >
            {{ $t("message.l38") }}
          </div>
          <div class="content text-xxxs xs:text-sm sm:text-lg">
            {{ $t("message.l39") }}:
          </div>
          <div
            class="description mt-2 font-semibold text-xxxs xs:text-sm sm:text-lg"
          >
            {{ $t("message.l40") }}
          </div>
          <ul
            class="ml-4 mb-2 list-disc text-xxxs xs:text-xs sm:text-base text-custom-purple-text-light"
          >
            <li>{{ $t("message.l41") }}.</li>
          </ul>
          <div
            class="description mt-2 font-semibold text-xxxs xs:text-sm sm:text-lg"
            style="margin-top: 16px"
          >
            {{ $t("message.l42") }}
          </div>
          <ul
            class="ml-4 mb-2 list-disc text-xxxs xs:text-xs sm:text-base text-custom-purple-text-light"
          >
            <li>{{ $t("message.l43") }}.</li>
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
import { connectMetaMask, switchNetwork } from "@/utils/getWeb3";
export default defineComponent({
  name: "LotteryView",
  data() {
    return {
      images: { ticket, coin },
      isShowDetailRound: true,
      temperatureIndex: null,
      isDisableBack: null,
      isDisableNext: false,
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
            Web3.utils.fromWei(
              String(this.currentLottery?.prizePool),
              "picoether"
            )
          ).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
        : null;
    },
    prizePoolTemperature() {
      return this?.temperatureLottery?.prizePool
        ? String(
            Web3.utils.fromWei(
              String(this.temperatureLottery?.prizePool),
              "picoether"
            )
          ).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
        : null;
    },
    deadlineFormat() {
      return this?.currentLottery?.closingTimestamp
        ? moment
            .unix(this?.currentLottery?.closingTimestamp)
            .format("DD/MM/YYYY, hh:mm A")
        : null;
    },
    deadlineFormatTemperature() {
      return this?.temperatureLottery?.closingTimestamp
        ? moment
            .unix(this?.temperatureLottery?.closingTimestamp)
            .format("DD/MM/YYYY, hh:mm A")
        : null;
    },
    deadline() {
      return this?.currentLottery?.closingTimestamp
        ? new Date(this.currentLottery?.closingTimestamp * 1000).toISOString()
        : null;
    },
    isTimesUp() {
      return moment().unix() > this?.currentLottery?.closingTimestamp;
    },
  },
  methods: {
    ...mapActions({
      setIsOpenBuyTicketModal: "setIsOpenBuyTicketModal",
      setIsOpenTicketsModal: "setIsOpenTicketsModal",
      setTemperatureLottery: "setTemperatureLottery",
      setIsOpenWalletModal: "setIsOpenWalletModal",
      setActiveSwitchWallet: "setActiveSwitchWallet",
      setIsConnectWallet: "setIsConnectWallet",
      setWeb3: "setWeb3",
    }),
    async handleConnectWallet() {
      try {
        await connectMetaMask();
        await switchNetwork();
        await this.setWeb3();
        localStorage.setItem("isConnectWallet", true);
        this.setIsConnectWallet(true);
      } catch (error) {
        console.log(error);
      }
    },
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
      return moment(this.deadline).format("DD-MM-YYYY, hh:mm A");
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
  mounted() {
    if (this.currentLottery?.lotteryStatus == "2")
      this.temperatureIndex = Number(this.currentLottery?.lotteryID);
    else this.temperatureIndex = Number(this.currentLottery?.lotteryID) - 1;
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
      .prize-pot-container {
        background-color: variables.$dark-background-nav;
        .left {
          color: variables.$custom-white-text;
          .prize-pot-title {
            color: variables.$custom-white-text;
          }
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
.button-container {
  background-image: url("@/assets/images/ticket.png");
  background-size: contain;
}
</style>
