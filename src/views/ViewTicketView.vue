<template>
  <div class="w-full flex flex-col">
    <div class="font-semibold text-4xl text-left">
      {{ $t("message.view-ticket") }}
    </div>
    <div class="text-base text-left">{{ $t("message.vtv1") }}.</div>
    <TheDivider class="mt-4" />
    <div
      class="font-semibold text-xl text-left text-slate-700 mt-3"
      :class="{ dark: darkTheme }"
    >
      {{ $t("message.vtv2") }}
    </div>
    <div class="w-full text-left font-semibold mt-3">
      {{ $t("message.step") }} 1:
      <span class="font-normal ml-2">
        {{ $t("message.bt-2") }} <b> {{ $t("message.vtv3") }}</b>
        {{ $t("message.vtv4") }}
      </span>
    </div>
    <div class="mt-3"><img :src="bt1" class="h-16" /></div>
    <div class="w-full text-left font-semibold mt-3">
      {{ $t("message.step") }} 2:
      <span class="font-normal ml-2">
        {{ $t("message.vtv5") }}k <b>{{ $t("message.view-ticket") }}</b>
        {{ $t("message.bt-5") }}.
      </span>
    </div>
    <div class="mt-3"><img :src="vt1" class="h-48" /></div>
    <div class="w-full text-left font-semibold mt-3">
      {{ $t("message.step") }} 3:
      <span class="font-normal ml-2">
        {{ $t("message.vtv6") }}
      </span>
    </div>
    <div class="mt-3"><img :src="vt2" class="h-72" /></div>
    <TheDivider class="mt-4" />
    <div
      class="font-semibold text-xl text-left text-slate-700 mt-3"
      :class="{ dark: darkTheme }"
    >
      {{ $t("message.vtv7") }}
    </div>
    <div class="w-full text-left font-semibold mt-3">
      {{ $t("message.step") }} 1:
      <span class="font-normal ml-2">
        {{ $t("message.bt-2") }} <b> {{ $t("message.vtv3") }}</b>
        {{ $t("message.vtv4") }}
      </span>
    </div>
    <div class="mt-3"><img :src="bt1" class="h-16" /></div>
    <div class="w-full text-left font-semibold mt-3">
      {{ $t("message.step") }} 2:
      <span class="font-normal ml-2">
        {{ $t("message.vtv9") }} <b> {{ $t("message.vtv10") }}</b>
        {{ $t("message.bt-5") }}.
      </span>
    </div>
    <div class="mt-3"><img :src="vt3" class="h-32" /></div>
    <div class="w-full text-left font-semibold mt-3">
      {{ $t("message.step") }} 3:
      <span class="font-normal ml-2">
        {{ $t("message.vtv11") }}
      </span>
    </div>
    <div class="mt-3"><img :src="vt4" class="h-96" /></div>
  </div>
</template>
<script>
import TheDivider from "@/components/TheDivider/TheDivider.vue";
import bt1 from "@/assets/images/bt1.png";
import vt1 from "@/assets/images/vt1.png";
import vt2 from "@/assets/images/vt2.png";
import vt3 from "@/assets/images/vt3.png";
import vt4 from "@/assets/images/vt4.png";
import { mapState } from "vuex";
export default {
  name: "ViewTicketView",
  components: { TheDivider },
  data() {
    return {
      bt1,
      vt1,
      vt2,
      vt3,
      vt4,
    };
  },
  computed: {
    ...mapState(["darkTheme"]),
  },
};
</script>
<style lang="scss" scoped>
.dark {
  color: white !important;
}
</style>
