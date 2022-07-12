<template>
  <div
    class="w-full flex flex-col items-start pl-8 sm:pl-80 py-8 sm:py-16 pr-8 sm:pr-12"
    :class="{ dark: darkTheme }"
  >
    <div class="w-full" v-if="path">
      <div
        class="w-full bg-custom-cyan-light px-4 sm:px-12 py-2 sm:py-4 rounded-3xl relative"
      >
        <div class="flex flex-row items-center">
          <img :src="penguin" class="h-16 sm:h-48" />
          <div
            class="text-base sm:text-4xl font-semibold text-custom-white-text ml-2 sm:ml-4"
          >
            PenguinLott
          </div>
        </div>
        <div
          class="flex flex-col items-start absolute top-3 right-12 sm:top-16 sm:right-28"
        >
          <div
            class="text-custom-white-text font-semibold text-xl sm:text-5xl logo"
          >
            Join.
          </div>
          <div class="flex flex-row items-center">
            <div
              class="text-custom-white-text font-semibold text-xl sm:text-5xl logo"
            >
              Buy.
            </div>
            <div
              class="text-custom-white-text font-semibold text-xl sm:text-5xl ml-3 logo"
            >
              Win.
            </div>
          </div>
        </div>
        <img
          :src="coin"
          class="h-4 sm:h-16 absolute top-2 sm:top-4 right-12 sm:right-24 -rotate-45"
        />
        <img
          :src="coin"
          class="h-4 sm:h-16 absolute bottom-2 sm:bottom-4 right-40 sm:right-96 rotate-45"
        />
      </div>
      <div class="font-semibold mt-4 text-left text-sm sm:text-base">
        {{ $t("message.t1") }}.
      </div>
      <TheDivider class="mt-3" />
      <div class="text-2xl sm:text-3xl font-semibold text-left mt-3">
        {{ $t("message.t2") }}
      </div>
      <div class="text-sm sm:text-base text-left description">
        {{ $t("message.t3") }}.
      </div>
      <TheDivider class="mt-3" />
      <div class="text-2xl sm:text-3xl font-semibold text-left mt-3">
        {{ $t("message.t4") }}
      </div>
      <div class="text-sm sm:text-base text-left description">
        {{ $t("message.t5") }}.
      </div>
      <div class="text-2xl sm:text-3xl font-semibold text-left mt-3">
        {{ $t("message.t6") }}
      </div>
      <div class="text-sm sm:text-base text-left description">
        {{ $t("message.t7") }}.
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>
<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import penguin from "@/assets/images/penguin.png";
import coin from "@/assets/images/coin.png";
import TheDivider from "@/components/TheDivider/TheDivider.vue";
import { mapState } from "vuex";

export default {
  name: "TutorialView",
  components: { TheDivider },
  data() {
    return {
      penguin,
      coin,
    };
  },
  computed: {
    ...mapState(["darkTheme"]),
    path() {
      const route = useRoute();
      const currentPath = computed(() => route.path);
      return currentPath.value === "/tutorial";
    },
  },
};
</script>
<style lang="scss" scoped>
@use "@/assets/css/variables";
.logo {
  text-shadow: 2px 0 0 rgb(131, 131, 131), -2px 0 0 rgb(131, 131, 131),
    0 2px 0 rgb(131, 131, 131), 0 -2px 0 rgb(131, 131, 131),
    1px 1px rgb(131, 131, 131), -1px -1px 0 rgb(131, 131, 131),
    1px -1px 0 rgb(131, 131, 131), -1px 1px 0 rgb(131, 131, 131);
}
.dark {
  background: radial-gradient(103.12% 50% at 50% 50%, #21193a 0, #191326 100%);
  color: variables.$custom-white-text;
  .description {
    color: #d1d1d1;
  }
}
</style>
