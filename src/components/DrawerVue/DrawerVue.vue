<template>
  <div
    class="hidden sm:block fixed top-0 left-0 w-64 h-screen bg-slate-100 shadow-3xl z-20 pt-32 text-left"
    :class="{
      hiddenComponent: path,
      onScroll: !view.topOfPage,
      dark: darkTheme,
    }"
  >
    <router-link to="/tutorial">
      <div
        :class="{ isActive: currentPathVue == '/tutorial' }"
        class="option text-slate-700 font-semibold text-base cursor-pointer hover:bg-slate-200 px-4 py-2"
      >
        {{ $t("message.introduction") }}
      </div>
    </router-link>
    <router-link to="/tutorial/get-started">
      <div
        class="option flex flex-row items-center justify-between text-slate-700 font-semibold text-base cursor-pointer hover:bg-slate-200 px-4 py-2"
        :class="{ isActive: currentPathVue == '/tutorial/get-started' }"
      >
        {{ $t("message.get-start") }}
        <div v-if="!isOpenGetStarted">
          <mdicon
            name="chevron-right"
            class="hover:text-custom-cyan-light"
            @click="handleClickIconGetStarted"
          />
        </div>
        <div v-else>
          <mdicon
            name="chevron-down"
            class="hover:text-custom-cyan-light"
            @click="handleClickIconGetStarted"
          />
        </div>
      </div>
    </router-link>

    <div class="text-slate-700 font-light text-base" v-if="isOpenGetStarted">
      <router-link to="/tutorial/get-started/create-wallet">
        <div
          class="option hover:bg-slate-200 cursor-pointer px-6 py-2"
          :class="{
            isActive: currentPathVue == '/tutorial/get-started/create-wallet',
          }"
        >
          {{ $t("message.create-wallet") }}
        </div>
      </router-link>
      <router-link to="/tutorial/get-started/connect-wallet">
        <div
          class="option hover:bg-slate-200 cursor-pointer px-6 py-2"
          :class="{
            isActive: currentPathVue == '/tutorial/get-started/connect-wallet',
          }"
        >
          {{ $t("message.connect-wallet-to") }}
        </div>
      </router-link>
      <router-link to="/tutorial/get-started/get-token">
        <div
          class="option hover:bg-slate-200 cursor-pointer px-6 py-2"
          :class="{
            isActive: currentPathVue == '/tutorial/get-started/get-token',
          }"
        >
          {{ $t("message.get-token") }}
        </div>
      </router-link>
    </div>

    <router-link to="/tutorial/features">
      <div
        class="option flex flex-row items-center justify-between text-slate-700 font-semibold text-base cursor-pointer hover:bg-slate-200 px-4 py-2"
        :class="{ isActive: currentPathVue == '/tutorial/features' }"
      >
        {{ $t("message.features") }}
        <div v-if="!isOpenFeatures">
          <mdicon
            name="chevron-right"
            class="hover:text-custom-cyan-light"
            @click="handleClickIconFeatures"
          />
        </div>
        <div v-else>
          <mdicon
            name="chevron-down"
            class="hover:text-custom-cyan-light"
            @click="handleClickIconFeatures"
          />
        </div>
      </div>
    </router-link>

    <div class="text-slate-700 font-light text-base" v-if="isOpenFeatures">
      <router-link to="/tutorial/features/buy-ticket">
        <div
          class="option hover:bg-slate-200 cursor-pointer px-6 py-2"
          :class="{
            isActive: currentPathVue == '/tutorial/features/buy-ticket',
          }"
        >
          {{ $t("message.buy-ticket") }}
        </div>
      </router-link>
      <router-link to="/tutorial/features/view-tickets">
        <div
          class="option hover:bg-slate-200 cursor-pointer px-6 py-2"
          :class="{
            isActive: currentPathVue == '/tutorial/features/view-tickets',
          }"
        >
          {{ $t("message.view-ticket") }}
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { mapState } from "vuex";

export default {
  name: "DrawerVue",
  data() {
    return {
      isOpenGetStarted: false,
      isOpenFeatures: false,
      view: {
        topOfPage: true,
      },
    };
  },
  beforeMount() {
    window.addEventListener("scroll", this.handleScroll);
  },
  computed: {
    ...mapState(["darkTheme"]),
    path() {
      const route = useRoute();
      const currentPath = computed(() => route.path);
      return !currentPath.value.startsWith("/tutorial");
    },
    activeTitle() {
      const route = useRoute();
      const currentPath = computed(() => route.path);
      if (currentPath.value == "/tutorial/get-started") return "getStarted";
      return "introduction";
    },
    currentPathVue() {
      const route = useRoute();
      const crPath = computed(() => route.path);
      return crPath.value;
    },
  },
  methods: {
    handleClickIconGetStarted() {
      this.isOpenGetStarted = !this.isOpenGetStarted;
    },

    handleClickIconFeatures() {
      this.isOpenFeatures = !this.isOpenFeatures;
    },
    handleScroll() {
      if (window.pageYOffset > 16) {
        if (this.view.topOfPage) this.view.topOfPage = false;
      } else {
        if (!this.view.topOfPage) this.view.topOfPage = true;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@use "@/assets/css/variables";
.hiddenComponent {
  display: none;
}
.onScroll {
  padding-top: 90px !important;
}
.isActive {
  background-color: variables.$primary-color !important;
  color: variables.$custom-white-text;
}
.dark {
  background: linear-gradient(
    139.73deg,
    rgb(49, 61, 92) 0%,
    rgb(61, 42, 84) 100%
  );
  color: variables.$custom-white-text !important;
  .option:hover {
    color: black;
  }
}
</style>
