<template>
  <div class="w-full flex flex-col">
    <div class="font-semibold text-4xl text-left">
      {{ $t("message.get-token") }}
    </div>
  </div>
  <div class="text-base text-left mt-2">{{ $t("message.gt1") }}.</div>
  <TheDivider class="mt-4" />
  <div
    class="w-full text-left font-semibold text-slate-700 mt-3 text-xl title"
    :class="{ dark: darkTheme }"
  >
    {{ $t("message.gt2") }}
  </div>
  <div class="w-full text-left font-semibold mt-3">
    {{ $t("message.step") }} 1:
    <span class="font-normal ml-2">
      {{ $t("message.go-to") }}
      <span class="text-custom-cyan-light hover:underline">
        <a href="https://testnet.binance.org/faucet-smart" target="_blank">
          Binance Smart Chain : Faucet
        </a>
      </span>
    </span>
  </div>
  <div class="mt-3"><img :src="bscweb" class="h-56" /></div>

  <div class="w-full text-left font-semibold mt-3">
    {{ $t("message.step") }} 2:
    <span class="font-normal ml-2"> {{ $t("message.gt3") }}: </span>
  </div>
  <div class="mt-3"><img :src="bscweb1" class="h-56" /></div>

  <div class="w-full text-left font-semibold mt-3">
    {{ $t("message.step") }} 3:
    <span class="font-normal">{{ $t("message.gt4") }} </span>
    <span class="font-semibold"
      ><i class="mx-1">{{ $t("message.gt5") }}</i></span
    >
    <span class="font-normal ml-1">{{ $t("message.bt-5") }}. </span>
  </div>
  <div class="mt-3"><img :src="bscweb2" class="h-20" /></div>

  <div class="w-full text-left font-semibold mt-3">
    {{ $t("message.step") }} 4:
    <span class="font-normal">{{ $t("message.gt6") }}. </span>
    <span class="font-semibold">
      <i class="mx-1">{{ $t("message.gt5") }}</i>
    </span>
    <span class="font-normal ml-1">{{ $t("message.gt7") }}.</span>
  </div>
  <div class="mt-3"><img :src="bscweb3" class="h-20" /></div>

  <div class="w-full text-left font-semibold mt-3">
    {{ $t("message.step") }} 5:
    <span class="font-normal">
      {{ $t("message.gt8") }}
    </span>
  </div>
  <div class="mt-3"><img :src="bscweb4" class="h-32" /></div>

  <div class="w-full text-left font-semibold mt-3">
    {{ $t("message.step") }} 6:
    <span class="font-normal">{{ $t("message.gt9") }}. </span>
  </div>
  <div class="mt-3"><img :src="bscweb5" class="h-64" /></div>
  <TheDivider class="mt-4" />
  <div
    class="w-full text-left font-semibold text-slate-700 mt-3 text-xl title"
    :class="{ dark: darkTheme }"
  >
    {{ $t("message.gt10") }}
  </div>
  <div class="w-full text-left font-semibold mt-3">
    {{ $t("message.step") }} 1:
    <span class="font-normal ml-2">
      {{ $t("message.gt11") }}
    </span>
    <span
      ><i class="mx-1"> {{ $t("message.gt12") }}</i>
    </span>
    <span class="font-normal ml-1"> {{ $t("message.bt-5") }}.</span>
  </div>
  <div class="mt-3"><img :src="bscweb02" class="h-64" /></div>
  <div class="w-full text-left font-semibold mt-3">
    {{ $t("message.step") }} 2:
    <span class="font-normal ml-2">
      {{ $t("message.gt13") }}: <b>{{ addressUSDT }}</b>
      {{ $t("message.gt14") }}
    </span>
    <span
      ><i class="mx-1">{{ $t("message.gt15") }}</i>
    </span>
    <span class="font-normal ml-1">{{ $t("message.bt-5") }}.</span>
  </div>
  <div class="mt-3"><img :src="bscweb03" class="h-64" /></div>
  <div class="w-full text-left font-semibold mt-3">
    {{ $t("message.step") }} 3:
    <span class="font-normal ml-2"> {{ $t("message.bt-2") }} </span>
    <span
      ><i class="mx-1">{{ $t("message.gt12") }}</i>
    </span>
    <span class="font-normal ml-1">{{ $t("message.bt-5") }}.</span>
  </div>
  <div class="mt-3"><img :src="bscweb04" class="h-64" /></div>
  <div class="w-full text-left font-semibold mt-3">
    {{ $t("message.step") }} 4:
    <span class="font-normal ml-2">
      {{ $t("message.gt16") }}
    </span>
  </div>
  <div class="mt-3"><img :src="bscweb05" class="h-64" /></div>
  <div class="w-full text-left font-semibold mt-3">
    {{ $t("message.step") }} 5:
    <span class="font-normal ml-2">
      {{ $t("message.go-to") }}
      <span class="text-custom-cyan-light hover:underline">
        <router-link to="/mint"> {{ $t("message.gt17") }}. </router-link>
      </span>
    </span>
  </div>
  <div class="mt-3"><img :src="mintImg" class="h-48" /></div>
  <div class="w-full text-left font-semibold mt-3">
    {{ $t("message.step") }} 6:
    <span class="font-normal ml-2">
      {{ $t("message.gt18") }}
    </span>
    <span
      ><i class="mx-1"> {{ $t("message.gt19") }}</i>
    </span>
    <span class="font-normal ml-1"> {{ $t("message.bt-5") }}.</span>
  </div>
  <div class="mt-3"><img :src="mintImg1" class="h-48" /></div>

  <div class="w-full text-left font-semibold mt-3">
    {{ $t("message.step") }} 7:
    <span class="font-normal ml-2"> {{ $t("message.bt-2") }} </span>
    <span
      ><i class="mx-1"> {{ $t("message.confirm") }}</i>
    </span>
    <span class="font-normal ml-1"> {{ $t("message.gt20") }}.</span>
  </div>
  <div class="mt-3"><img :src="mintImg2" class="h-48" /></div>

  <div class="w-full text-left font-semibold mt-3">
    {{ $t("message.step") }} 8:
    <span class="font-normal ml-2">
      {{ $t("message.gt21") }}
    </span>
  </div>
  <div class="mt-3 mb-3"><img :src="mintImg3" class="h-24" /></div>
  <div>
    <span class="font-normal ml-2">
      {{ $t("message.gt22") }}
    </span>
  </div>
  <div class="mt-3"><img :src="mintImg4" class="h-24" /></div>
</template>
<script>
import bscweb from "@/assets/images/bscweb.png";
import bscweb1 from "@/assets/images/bscweb1.png";
import bscweb2 from "@/assets/images/bscweb2.png";
import bscweb3 from "@/assets/images/bscweb3.png";
import bscweb4 from "@/assets/images/bscweb4.png";
import bscweb5 from "@/assets/images/bscweb5.png";
import TheDivider from "@/components/TheDivider/TheDivider.vue";
import bscweb02 from "@/assets/images/bscweb02.png";
import bscweb03 from "@/assets/images/bscweb03.png";
import bscweb04 from "@/assets/images/bscweb04.png";
import bscweb05 from "@/assets/images/bscweb05.png";
import mintImg from "@/assets/images/mint.png";
import mintImg1 from "@/assets/images/mint1.png";
import mintImg2 from "@/assets/images/mint2.png";
import mintImg3 from "@/assets/images/mint3.png";
import mintImg4 from "@/assets/images/mint4.png";
import { USDT_CONTRACT_ADDRESS } from "@/constants";
import { mapState } from "vuex";
export default {
  name: "GetToken",
  data() {
    return {
      bscweb,
      bscweb1,
      bscweb2,
      bscweb3,
      bscweb4,
      bscweb5,
      bscweb02,
      addressUSDT: USDT_CONTRACT_ADDRESS,
      bscweb03,
      bscweb04,
      bscweb05,
      mintImg,
      mintImg1,
      mintImg2,
      mintImg3,
      mintImg4,
    };
  },
  components: { TheDivider },
  computed: {
    ...mapState(["darkTheme"]),
  },
};
</script>
<style lang="scss">
.dark {
  color: white !important;
}
</style>
