<template>
  <div
    class="fixed top-0 w-screen h-screen bg-black opacity-80 flex flex-row items-center justify-center z-50"
    v-show="loader?.isLoading"
  >
    <div
      class="animate-pulse modal-dialog w-full h-full sm:w-full flex flex-row items-center justify-center"
    >
      <img
        :src="penguin"
        class="w-8 xs:w-12 sm:w-24 h-8 xs:h-12 mr-4 sm:h-24"
      />

      <div
        v-if="loader?.type == 'BuyTicket'"
        class="text-custom-white-text text-xxs xs:text-xl sm:text-3xl mr-2"
      >
        {{ $t("message.buying-ticket") }}
      </div>
      <div
        v-if="loader?.type == 'mint'"
        class="text-custom-white-text text-xxs xs:text-xl sm:text-3xl mr-2"
      >
        {{ $t("message.minting") }}
      </div>
      <div
        v-if="loader?.type == 'approve'"
        class="text-custom-white-text text-xxs xs:text-xl sm:text-3xl mr-2"
      >
        {{ $t("message.approving") }}
      </div>

      <div
        v-if="loader?.type == 'restore'"
        class="text-custom-white-text text-xxs xs:text-xl sm:text-3xl mr-2"
      >
        {{ $t("message.restoring") }}
      </div>

      <div
        v-if="loader?.type == 'switchNetwork'"
        class="text-custom-white-text text-xxs xs:text-xl sm:text-3xl mr-2"
      >
        {{ $t("message.switching") }}
      </div>
      <img
        :src="loadingSVG"
        :width="64"
        :height="64"
        class="w-4 xs:w-8 sm:w-16 h-4 xs:h-8 mr-4 sm:h-16"
      />
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import loadingSVG from "@/assets/images/loading.svg";
import penguin from "@/assets/images/penguin.png";
export default {
  name: "LoaderVue",
  data() {
    return {
      loadingSVG,
      penguin,
    };
  },
  computed: {
    ...mapState(["loader"]),
  },
};
</script>
<style lang="scss"></style>
