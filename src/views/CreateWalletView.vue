<template>
  <div class="w-full flex flex-col">
    <div class="font-semibold text-4xl text-left">
      {{ $t("message.create-wallet") }}
    </div>
    <div class="text-base text-left mt-2">{{ $t("message.cw1") }}.</div>
    <TheDivider class="mt-4" />
    <div class="w-full text-left font-semibold mt-3">
      {{ $t("message.step") }} 1:
      <span class="font-normal ml-2">
        {{ $t("message.go-to") }}
        <span class="text-custom-cyan-light hover:underline">
          <a
            href="https://chrome.google.com/webstore/category/extensions"
            target="_blank"
          >
            Chrome Web Store Extensions Section.
          </a>
        </span>
      </span>
    </div>

    <div class="w-full text-left font-semibold mt-3">
      {{ $t("message.step") }} 2:
      <span class="ml-2">
        {{ $t("message.search") }} <b><i>MetaMask</i>.</b>
      </span>
    </div>

    <div class="w-full text-left font-semibold mt-3">
      {{ $t("message.step") }} 3:
      <span class="ml-2 font-normal"> {{ $t("message.cw2") }}. </span>
    </div>
    <div class="mt-3"><img :src="metamask1" class="h-28 sm:h-56" /></div>

    <div class="w-full text-left font-semibold mt-3">
      {{ $t("message.step") }} 4:
      <span class="font-normal">{{ $t("message.cw3") }}</span>
      <span>
        <i class="ml-1">{{ $t("message.cw4") }}</i></span
      >
      <span class="font-normal ml-1">{{ $t("message.bt-5") }}.</span>
    </div>

    <div class="w-full text-left font-semibold mt-3">
      {{ $t("message.step") }} 5:
      <span class="ml-2 font-normal">
        {{ $t("message.cw5") }}
      </span>
      <span>
        <i class="ml-1">{{ $t("message.get-start") }}</i>
      </span>
      <span class="font-normal ml-1">{{ $t("message.bt-5") }}.</span>
    </div>

    <div class="w-full text-left font-semibold mt-3">
      {{ $t("message.step") }} 6:
      <span class="ml-2 font-normal">
        {{ $t("message.cw6") }}
      </span>
      <span class="ml-1">
        <i> {{ $t("message.create-wallet") }}</i>
      </span>
      <span class="font-normal ml-1">
        {{ $t("message.cw7") }}
      </span>
      <span class="ml-1"
        ><i> {{ $t("message.cw8") }}</i></span
      >
      <span class="font-normal ml-1"> {{ $t("message.bt-5") }}.</span>
    </div>
    <div class="mt-3">
      <img :src="createwalletscreen" class="h-28 sm:h-56" />
    </div>
    <div class="w-full text-left font-semibold mt-3">
      {{ $t("message.step") }} 7:
      <span class="ml-2 font-normal"> {{ $t("message.cw9") }} </span>
      <span>
        <i class="ml-1"> {{ $t("message.cw10") }}</i>
      </span>
      <span class="font-normal ml-1 mr-1">
        {{ $t("message.cw11") }}
      </span>
      <span
        ><i>{{ $t("message.cw12") }} </i></span
      >
      <span class="font-normal">
        {{ $t("message.cw13") }}
      </span>
      <span
        ><i>{{ $t("message.cw12") }} </i></span
      >
      <span class="font-normal">{{ $t("message.bt-5") }}.</span>
    </div>
    <div class="mt-3"><img :src="improveMetamask" class="h-48 sm:h-72" /></div>
    <div class="w-full text-left font-semibold mt-3">
      {{ $t("message.step") }} 8:
      <span class="ml-2 font-normal mr-1">
        {{ $t("message.cw14") }}
      </span>
      <span
        ><i class="ml-1">{{ $t("message.cw8") }}</i></span
      >
      <span class="font-normal ml-1 mr-1">
        {{ $t("message.cw15") }}
      </span>
      <span
        ><i>{{ $t("message.cw16") }}</i></span
      >
    </div>
    <div class="mt-3"><img :src="createPassword" class="h-64" /></div>
    <div class="w-full text-left font-semibold mt-3">
      {{ $t("message.step") }} 9:
      <span class="ml-2 font-normal"> {{ $t("message.cw17") }} </span>
      <span>
        <i class="ml-1 mr-1">{{ $t("message.cw18") }}</i>
      </span>
      <span class="font-normal">{{ $t("message.cw19") }}. </span>
    </div>
    <div class="w-full text-left font-semibold mt-3">
      {{ $t("message.step") }} 10:
      <span class="ml-2 font-normal">
        {{ $t("message.cw20") }}
      </span>
      <span
        ><i class="ml-1 mr-1">{{ $t("message.next") }} </i></span
      >
      <span class="font-normal"> {{ $t("message.bt-5") }}. </span>
    </div>
    <div class=""><img :src="phrase" class="h-64" /></div>
    <div class="w-full text-left font-semibold mt-3">
      {{ $t("message.step") }} 11:
      <span class="ml-2 font-normal">
        {{ $t("message.cw21") }}
      </span>
      <span
        ><i class="mr-1 ml-1"> {{ $t("message.confirm") }} </i></span
      >
      <span class="font-normal"> {{ $t("message.cw22") }}. </span>
    </div>
    <div class="mt-3"><img :src="confirmPhrase" class="h-72" /></div>
    <div class="w-full text-left font-semibold mt-3">
      {{ $t("message.step") }} 12:
      <span class="ml-2 font-normal"> {{ $t("message.cw3") }} </span>
      <span
        ><i class="mx-1">{{ $t("message.confirm") }} </i></span
      >
    </div>
    <div class=""><img :src="doneWallet" class="h-72" /></div>
    <div class="w-full text-left font-semibold mt-3">
      {{ $t("message.step") }} 13:
      <span class="ml-2 font-normal">
        {{ $t("message.cw24") }}
      </span>
      <span class="mx-1"><i>Account 1 </i></span>
      <span class="font-normal"> {{ $t("message.cw23") }}.</span>
    </div>
    <div class="mt-3"><img :src="wallet1" class="h-72" /></div>
    <div class="w-full text-left font-semibold mt-3">
      {{ $t("message.step") }} 14:
      <span class="ml-2 font-normal"> {{ $t("message.cw26") }}. </span>
    </div>
    <div class="mt-3"><img :src="extension" class="h-96" /></div>
    <div class="mt-4 font-semibold text-left">{{ $t("message.done") }}</div>
  </div>
</template>
<script>
import metamask1 from "@/assets/images/metamask1.png";
import createwalletscreen from "@/assets/images/createwalletscreen.png";
import improveMetamask from "@/assets/images/improvemetamask.png";
import createPassword from "@/assets/images/createpassword.png";
import phrase from "@/assets/images/phrase.png";
import confirmPhrase from "@/assets/images/confirmphrase.png";
import doneWallet from "@/assets/images/donewallet.png";
import wallet1 from "@/assets/images/wallet1.png";
import extension from "@/assets/images/extension.png";
import TheDivider from "@/components/TheDivider/TheDivider.vue";
export default {
  name: "CreateWalletView",
  data() {
    return {
      metamask1,
      createwalletscreen,
      improveMetamask,
      createPassword,
      phrase,
      confirmPhrase,
      doneWallet,
      wallet1,
      extension,
    };
  },
  components: { TheDivider },
};
</script>
<style lang="scss"></style>
