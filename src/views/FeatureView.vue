<template>
  <div class="w-full flex flex-col pt-4 sm:pt-2 pb-56 sm:pb-40" v-if="path">
    <div class="font-semibold text-4xl text-left">
      {{ $t("message.features") }}
    </div>
    <div class="text-base text-left">{{ $t("message.ft1") }}.</div>
    <TheDivider class="my-4" />
    <div
      class="text-left text-2xl text-slate-600 font-semibold"
      :class="{ dark: darkTheme }"
    >
      {{ $t("message.ft2") }}
    </div>
    <div class="text-left text-slate-500" :class="{ dark: darkTheme }">
      {{ $t("message.ft3") }}.
    </div>
    <router-link to="/tutorial/features/buy-ticket">
      <div
        class="text-left hover:underline cursor-pointer text-custom-cyan-light mt-2"
      >
        {{ $t("message.buy-ticket") }}
      </div>
    </router-link>
    <router-link to="/tutorial/features/view-tickets">
      <div
        class="text-left hover:underline cursor-pointer text-custom-cyan-light mt-2"
      >
        {{ $t("message.view-ticket") }}
      </div>
    </router-link>
  </div>
  <router-view></router-view>
</template>
<script>
import TheDivider from "@/components/TheDivider/TheDivider.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";
import { mapState } from "vuex";
export default {
  name: "FeatureView",
  components: { TheDivider },
  computed: {
    ...mapState(["darkTheme"]),
    path() {
      const route = useRoute();
      const currentPath = computed(() => route.path);
      return currentPath.value === "/tutorial/features";
    },
  },
};
</script>
<style lang="scss" scoped>
.dark {
  color: rgb(216, 216, 216) !important;
}
</style>
