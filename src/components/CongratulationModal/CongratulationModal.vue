<template>
  <div
    class="fixed top-0 left-0 w-screen h-screen bg-custom-background-modal flex flex-row items-center justify-center z-30"
    v-show="isOpenCongratulationModal"
  >
    <div class="px-8 sm:px-0 w-full sm:w-1/3 mt-0 relative animate-shake">
      <div
        class="text-3xl sm:text-4xl text-white dashboard-title absolute -top-32 left-28 z-10"
      >
        {{ $t("message.numbertoday") }}
      </div>
      <img
        :src="fireworkGIF"
        style="width: 160px; height: 160px"
        class="absolute bottom-0 right-0 -z-10 scale-75 sm:scale-100"
      />
      <img
        :src="fireworkGIF"
        style="width: 160px; height: 160px"
        class="absolute top-0 left-0 scale-75 sm:scale-100"
      />
      <img
        :src="penguinPNG"
        style="width: 320px; height: 320px"
        class="absolute -top-32 left-16 scale-75 sm:scale-100"
      />
      <div class="text-7xl dashboard-title absolute top-8 left-64">
        {{ currentLottery?.winningNumbers }}
      </div>
      <div>
        <mdicon
          name="close"
          :width="48"
          :height="48"
          class="text-red-700 absolute -top-32 right-2 cursor-pointer scale-75 sm:scale-100"
          @click="handleCloseModal"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import fireworkGIF from "@/assets/images/firework.gif";
import penguinPNG from "@/assets/images/penguin-1.png";
export default {
  name: "CongratulationModal",
  data() {
    return { fireworkGIF, penguinPNG };
  },
  computed: {
    ...mapState(["isOpenCongratulationModal", "currentLottery"]),
  },
  watch: {
    async isOpenCongratulationModal() {
      if (this.isOpenCongratulationModal) {
        document.body.style.overflow = "hidden";
      } else document.body.style.overflow = "auto";
    },
  },
  methods: {
    ...mapActions({
      setIsOpenCongratulationModal: "setIsOpenCongratulationModal",
    }),
    handleCloseModal() {
      this.setIsOpenCongratulationModal(false);
    },
  },
};
</script>
<style lang="scss" scoped>
.dashboard-title {
  text-shadow: rgb(0 0 0 / 25%) 0px 4px 4px;
}
</style>
