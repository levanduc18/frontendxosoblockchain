<template>
  <div class="w-full flex flex-col">
    <div class="font-semibold text-4xl text-left">
      {{ $t("message.connect-wallet-to") }}
    </div>
    <div class="text-base text-left mt-2">{{ $t("message.cnw1") }}:</div>
    <TheDivider class="mt-4" />
    <div class="w-full text-left font-semibold mt-3">
      {{ $t("message.step") }} 1:
      <span class="font-normal ml-2">
        {{ $t("message.cnw2") }}
      </span>
      <span class="font-semibold ml-2"
        ><i> {{ $t("message.next") }}</i>
      </span>
    </div>
    <div class="mt-3"><img :src="bscweb6" class="h-64" /></div>

    <div class="w-full text-left font-semibold mt-3">
      {{ $t("message.step") }} 2:
      <span class="font-normal ml-2">
        {{ $t("message.cnw3") }}
        <span
          ><i>{{ $t("message.connect") }}</i></span
        >
        {{ $t("message.cnw4") }}.
      </span>

      <span class="font-normal">{{ $t("message.bt-5") }}</span>
    </div>
    <div class="mt-3"><img :src="bscweb7" class="h-64" /></div>

    <div class="w-full text-left font-semibold mt-3">
      {{ $t("message.step") }} 3:
      <span class="font-normal ml-2">
        {{ $t("message.cnw5") }}
        <span
          ><i class="font-semibold">{{ $t("message.approve") }}</i></span
        >
        {{ $t("message.bt-5") }}.
      </span>
    </div>
    <div class="mt-3"><img :src="bscweb8" class="h-64" /></div>

    <div class="w-full text-left font-semibold mt-3">
      {{ $t("message.step") }} 4:
      <span class="font-normal ml-2">
        {{ $t("message.cnw6") }}
        <span
          ><i class="font-semibold"> {{ $t("message.switchnet") }}</i></span
        >
        {{ $t("message.bt-5") }}.
      </span>
    </div>
    <div class="mt-3"><img :src="bscweb8" class="h-64" /></div>

    <div class="w-full text-left font-semibold mt-3">
      {{ $t("message.step") }} 5:
      <span class="font-normal ml-2"> {{ $t("message.cnw7") }}. </span>
    </div>
    <div class="mt-3"><img :src="account" class="h-12" /></div>
  </div>
</template>
<script>
import bscweb6 from "@/assets/images/bscweb6.png";
import bscweb7 from "@/assets/images/bscweb7.png";
import bscweb8 from "@/assets/images/bscweb8.png";
import bscweb9 from "@/assets/images/bscweb9.png";
import account from "@/assets/images/account.png";
import TheDivider from "@/components/TheDivider/TheDivider.vue";
export default {
  name: "ConnectWalletView",
  data() {
    return {
      bscweb6,
      bscweb7,
      bscweb8,
      bscweb9,
      account,
    };
  },
  components: { TheDivider },
};
</script>
<style lang="scss" scoped></style>
