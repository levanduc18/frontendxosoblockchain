<template>
  <div class="w-full flex flex-col">
    <div class="font-semibold text-4xl text-left">
      {{ $t("message.buy-ticket") }}
    </div>
    <div class="text-base text-left">
      {{ $t("message.bt-1") }}
    </div>
    <TheDivider class="mt-4" />

    <div class="w-full text-left font-semibold mt-3">
      {{ $t("message.step") }} 1:
      <span class="font-normal ml-2">
        {{ $t("message.bt-2") }} <b>{{ $t("message.bt-3") }}</b>
        {{ $t("message.bt-4") }}
      </span>
    </div>
    <div class="mt-3"><img :src="bt1" class="h-16" /></div>
    <div class="w-full text-left font-semibold mt-3">
      {{ $t("message.step") }} 2:
      <span class="font-normal ml-2">
        {{ $t("message.bt-2") }} <b>{{ $t("message.buy-tickets") }}</b>
        {{ $t("message.bt-5") }}.
      </span>
    </div>

    <div class="mt-3"><img :src="bt2" class="h-48" /></div>
    <div class="w-full text-left font-semibold mt-3">
      {{ $t("message.step") }} 3:
      <span class="font-normal ml-2">
        {{ $t("message.bt-6") }}
      </span>
    </div>
    <div class="flex flex-row items-center">
      <div class="mt-2">
        <img :src="bt3" class="h-48" /><b> {{ $t("message.option") }} 1.</b>
        {{ $t("message.random") }} {{ $t("message.num") }}
      </div>
      <div class="mt-2 ml-16">
        <img :src="bt4" class="h-48" />
        <b> {{ $t("message.option") }} 2.</b> {{ $t("message.customize") }}
        {{ $t("message.num") }}
      </div>
    </div>
    <div class="w-full text-left font-semibold mt-3">
      {{ $t("message.step") }} 4:
      <span class="font-normal ml-2">
        {{ $t("message.bt-7") }} <b>-</b> {{ $t("message.bt-8") }}<b>+</b>
        {{ $t("message.bt-9") }}
      </span>
    </div>
    <div class="mt-3 ml-16">
      <img :src="bt5" class="h-20" />
    </div>
    <div class="w-full text-left font-semibold mt-3">
      {{ $t("message.step") }} 5:
      <span class="font-normal ml-2">
        {{ $t("message.bt-2") }} <b> {{ $t("message.buy") }}</b>
        {{ $t("message.bt-5") }}
      </span>
    </div>
    <div class="mt-3 ml-16">
      <img :src="bt6" class="h-72" />
    </div>
    <div class="w-full text-left font-semibold mt-3">
      {{ $t("message.step") }} 6:
      <span class="font-normal ml-2">
        {{ $t("message.bt-2") }} <b>{{ $t("message.confirm") }}</b>
        {{ $t("message.bt-5") }}
      </span>
    </div>
    <div class="mt-3 ml-16">
      <img :src="bt7" class="h-72" />
    </div>
    <div class="w-full text-left font-semibold mt-3">
      {{ $t("message.step") }} 7:
      <span class="font-normal ml-2">
        {{ $t("message.bt-10") }}
      </span>
    </div>
  </div>
</template>
<script>
import TheDivider from "@/components/TheDivider/TheDivider.vue";
import bt1 from "@/assets/images/bt1.png";
import bt2 from "@/assets/images/bt2.png";
import bt3 from "@/assets/images/bt3.png";
import bt4 from "@/assets/images/bt4.png";
import bt5 from "@/assets/images/bt5.png";
import bt6 from "@/assets/images/bt6.png";
import bt7 from "@/assets/images/bt7.png";
export default {
  name: "BuyTicketView",
  components: { TheDivider },
  data() {
    return {
      bt1,
      bt2,
      bt3,
      bt4,
      bt5,
      bt6,
      bt7,
    };
  },
};
</script>
<style lang=""></style>
