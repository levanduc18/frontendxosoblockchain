<template>
  <div
    class="snackbar flex flex-col justify-center fixed top-1/4 right-12 w-1/5 h-24 bg-custom-nav shadow animate-slideRightToLeft z-40"
    :class="{ dark: darkTheme }"
    v-show="isOpenSnackBar"
  >
    <div class="flex flex-row items-center justify-center z-30">
      <div class="p-1 rounded-full bg-success-color">
        <mdicon
          name="check"
          :width="16"
          :height="16"
          class="text-custom-white-text"
        />
      </div>
      <div class="text-success-color w-3/4 pl-2 text-left font-light">
        {{ messageSnackBar }}
      </div>
    </div>
    <div class="progress-container absolute top-20 w-full">
      <progress
        class="progress w-full h-2"
        max="100"
        :value="countUpValue"
      ></progress>
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
      if (this.countUpValue < 100) {
        setTimeout(() => {
          this.countUpValue += 1;
          this.countUpTimer();
        }, 23);
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
.dark {
  background: variables.$dark-background-nav;
  color: variables.$custom-white-text;
}
</style>
