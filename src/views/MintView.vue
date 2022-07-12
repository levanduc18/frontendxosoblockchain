<template>
  <div
    class="w-full pt-36 pb-32 sm:pt-12 sm:pb-12 flex flex-col items-center px-4 sm:px-0"
    :class="{ dark: darkTheme }"
  >
    <div class="text-4xl font-semibold py-px">{{ $t("message.m1") }}</div>
    <div class="opacity-80 pb-px">
      {{ $t("message.m2") }}
    </div>
    <input
      type="text"
      class="value-number-ticket text-center bg-slate-200 px-1 border-none py-1 rounded-2xl text-xl font-semibold w-full sm:w-1/3 h-12 mt-4 sm:mt-8"
      v-model="addressWallet"
      :placeholder="$t('message.m3')"
    />
    <input
      type="number"
      class="value-number-ticket text-center bg-slate-200 px-1 border-none py-1 rounded-2xl text-xl font-semibold w-full sm:w-1/3 h-12 mt-4"
      v-model.number="balance"
      :placeholder="$t('message.m4')"
    />
    <button
      class="learn-how-btn flex flex-row items-center justify-center font-semibold px-6 py-2 bg-button-background-primary text-custom-white-text rounded-2xl shadow-3xl hover:opacity-80 w-48 mt-6"
      @click="mintUSDT"
    >
      {{ $t("message.gt19") }}
    </button>
  </div>
</template>
<script>
import { mint } from "@/utils/getUSDTContract";
import { mapActions, mapState } from "vuex";
import Web3 from "web3/dist/web3.min.js";
export default {
  name: "MintView",
  data() {
    return {
      balance: null,
      addressWallet: null,
    };
  },
  computed: {
    ...mapState(["account", "speed", "darkTheme"]),
  },
  methods: {
    ...mapActions({
      setLoader: "setLoader",
    }),
    async mintUSDT() {
      this.setLoader({ isLoading: true, type: "mint" });
      try {
        await mint(
          this?.account,
          Web3.utils.toChecksumAddress(this?.addressWallet),
          this?.balance,
          this?.speed
        );
      } catch (err) {
        this.setLoader({ isLoading: false, type: "" });
      }
      this.setLoader({ isLoading: false, type: "" });
    },
  },
};
</script>
<style lang="scss" scoped>
@use "@/assets/css/variables";
.value-number-ticket::-webkit-inner-spin-button,
.value-number-ticket::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.dark {
  background: radial-gradient(103.12% 50% at 50% 50%, #21193a 0, #191326 100%);
  color: variables.$custom-white-text;
  .value-number-ticket {
    color: variables.$primary-text-color !important;
  }
}
</style>
