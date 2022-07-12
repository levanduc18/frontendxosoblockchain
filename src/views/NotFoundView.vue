<template>
  <div
    class="w-full py-28 flex flex-col items-center"
    :class="{ dark: darkTheme }"
  >
    <img :src="error404" class="h-32" />
    <div class="font-semibold text-lg">{{ $t("message.notfound") }}</div>
    <router-link
      to="/"
      class="text-custom-cyan-light text-lg font-semibold mt-4 border px-3 py-1 rounded-3xl"
      >{{ $t("message.gohome") }}
    </router-link>
  </div>
</template>
<script>
import error404 from "@/assets/images/error-404.png";
import { mapState } from "vuex";
export default {
  name: "NotFoundView",
  data() {
    return {
      error404,
    };
  },
  computed: {
    ...mapState(["darkTheme"]),
  },
};
</script>
<style lang="scss" scoped>
@use "@/assets/css/variables";
.dark {
  background: radial-gradient(103.12% 50% at 50% 50%, #21193a 0, #191326 100%);
  color: variables.$custom-white-text;
  .description {
    color: #d1d1d1;
  }
}
</style>
