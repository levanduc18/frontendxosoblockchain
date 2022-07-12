<template>
  <div
    class="snackbar flex rounded-3xl border-2 border-green-300 bg-green-100 flex-row items-center justify-between fixed bottom-20 sm:bottom-8 left-3 sm:left-8 w-96 sm:w-1/4 h-20 shadow animate-slideRightToLeft z-40"
    v-if="typeSnackBar == 'success'"
    v-show="isOpenSnackBar"
  >
    <div class="flex flex-row items-center justify-center z-30 w-5/6">
      <div class="p-1 rounded-full bg-green-400">
        <mdicon name="check" :width="18" :height="18" class="text-white" />
      </div>
      <div class="w-3/4 pl-2 text-left text-sm font-light">
        {{ messageSnackBar }}
      </div>
    </div>
    <div class="w-1/6 text-sm">
      <div
        class="icon-container cursor-pointer hover:bg-white flex flex-row justify-center items-center w-6 h-6 rounded-full"
        @click="setIsOpenSnackBar(false)"
      >
        <mdicon name="close" :width="16" :height="16" />
      </div>
    </div>
  </div>
  <div
    class="snackbar flex rounded-3xl border-2 border-red-300 bg-red-100 flex-row items-center justify-between fixed bottom-20 sm:bottom-8 left-3 sm:left-8 w-96 sm:w-1/4 h-20 bg-custom-nav shadow animate-slideRightToLeft z-40"
    :class="{ dark: darkTheme }"
    v-if="typeSnackBar == 'error'"
    v-show="isOpenSnackBar"
  >
    <div class="flex flex-row items-center justify-center z-30 w-5/6">
      <div class="p-1 rounded-full bg-red-400">
        <mdicon name="close" :width="16" :height="16" />
      </div>
      <div class="w-3/4 pl-2 text-left text-sm font-light">
        {{ messageSnackBar }}
      </div>
    </div>
    <div class="w-1/6 text-sm">
      <div
        class="icon-container cursor-pointer hover:bg-white flex flex-row justify-center items-center w-6 h-6 rounded-full"
        @click="setIsOpenSnackBar(false)"
      >
        <mdicon name="close" :width="16" :height="16" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "SnackBar",
  data() {
    return {
      countUpValue: 0,
    };
  },
  methods: {
    ...mapActions({
      setIsOpenSnackBar: "setIsOpenSnackBar",
    }),
    countUpTimer() {
      if (this.countUpValue < 300) {
        setTimeout(() => {
          this.countUpValue += 1;
          this.countUpTimer();
        }, 20);
      } else {
        this.countUpValue = 0;
        this.setIsOpenSnackBar(false);
      }
    },
  },
  computed: {
    ...mapState([
      "isOpenSnackBar",
      "typeSnackBar",
      "messageSnackBar",
      "darkTheme",
    ]),
  },
  watch: {
    isOpenSnackBar() {
      if (this.isOpenSnackBar) this.countUpTimer();
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/assets/css/variables";
</style>
