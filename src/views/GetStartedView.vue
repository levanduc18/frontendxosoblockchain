<template>
  <div
    class="w-full pb-40 sm:pb-32 pt-6 sm:pt-4 flex flex-col"
    v-if="path"
    :class="{ dark: darkTheme }"
  >
    <div class="font-semibold text-4xl text-left">
      {{ $t("message.get-start") }}
    </div>
    <div class="text-base text-left">{{ $t("message.gs1") }}!</div>
    <TheDivider class="my-4" />
    <div class="text-left text-2xl text-slate-600 font-semibold title">
      {{ $t("message.gs2") }}
    </div>
    <div class="text-left text-slate-500 description">
      {{ $t("message.gs3") }}.
    </div>
    <router-link to="/tutorial/get-started/create-wallet">
      <div
        class="text-left hover:underline cursor-pointer text-custom-cyan-light mt-2"
      >
        {{ $t("message.create-wallet") }}
      </div>
    </router-link>
    <router-link to="/tutorial/get-started/connect-wallet">
      <div
        class="text-left hover:underline cursor-pointer text-custom-cyan-light mt-3"
      >
        {{ $t("message.connect-wallet-to") }}
      </div>
    </router-link>
    <router-link to="/tutorial/get-started/get-token">
      <div
        class="text-left hover:underline cursor-pointer text-custom-cyan-light mt-3"
      >
        {{ $t("message.get-token") }}
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
  name: "GetStartedView",
  components: { TheDivider },
  computed: {
    ...mapState(["darkTheme"]),
    path() {
      const route = useRoute();
      const currentPath = computed(() => route.path);
      return currentPath.value === "/tutorial/get-started";
    },
  },
};
</script>
<style lang="scss" scoped>
@use "@/assets/css/variables";
.dark {
  .title {
    color: variables.$custom-white-text !important;
  }
  .description {
    color: rgb(194, 194, 194) !important;
  }
}
</style>
