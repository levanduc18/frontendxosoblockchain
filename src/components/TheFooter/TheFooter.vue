<template>
  <div
    class="footer-container w-full bg-custom-nav box-border flex flex-col items-between py-12 px-80"
    :class="{ dark: darkTheme }"
  >
    <div class="top w-full flex flex-row items-start">
      <div class="about flex flex-col items-start w-1/4">
        <p
          class="title text-custom-purple-title font-semibold text-normal mb-1"
        >
          ABOUT
        </p>
        <a
          class="item text-custom-purple-text-light leading-loose font-normal hover:underline hover:cursor-pointer"
        >
          Contact
        </a>
        <a
          class="item text-custom-purple-text-light leading-loose font-normal hover:underline hover:cursor-pointer"
        >
          Brand
        </a>
        <a
          class="item text-custom-purple-text-light leading-loose font-normal hover:underline hover:cursor-pointer"
        >
          Blog
        </a>
        <a
          class="item text-custom-purple-text-light leading-loose font-normal hover:underline hover:cursor-pointer"
        >
          Community
        </a>
      </div>
      <div class="about flex flex-col items-start w-1/4">
        <p
          class="title text-custom-purple-title font-semibold text-normal mb-1"
        >
          HELP
        </p>
        <a
          class="item text-custom-purple-text-light leading-loose font-normal hover:underline hover:cursor-pointer"
        >
          Customer Support
        </a>
        <a
          class="item text-custom-purple-text-light leading-loose font-normal hover:underline hover:cursor-pointer"
        >
          Troubleshooting
        </a>
        <a
          class="item text-custom-purple-text-light leading-loose font-normal hover:underline hover:cursor-pointer"
        >
          Guides
        </a>
      </div>
      <div class="about flex flex-col items-start w-1/4">
        <p
          class="title text-custom-purple-title font-semibold text-normal mb-1"
        >
          DEVELOPERS
        </p>
        <a
          class="item text-custom-purple-text-light leading-loose font-normal hover:underline hover:cursor-pointer"
        >
          Github
        </a>
        <a
          class="item text-custom-purple-text-light leading-loose font-normal hover:underline hover:cursor-pointer"
        >
          Documentation
        </a>
        <a
          class="item text-custom-purple-text-light leading-loose font-normal hover:underline hover:cursor-pointer"
        >
          Bug Bounty
        </a>
        <a
          class="item text-custom-purple-text-light leading-loose font-normal hover:underline hover:cursor-pointer"
        >
          Audits
        </a>
        <a
          class="item text-custom-purple-text-light leading-loose font-normal hover:underline hover:cursor-pointer"
        >
          Careers
        </a>
      </div>
      <div class="logo-container w-1/4 flex flex-row items-center justify-end">
        <img :src="images.logo" class="logo h-12" />
        <span class="logo-name font-bold text-xl ml-2">PenguinLott</span>
      </div>
    </div>
    <TheDivider class="mt-6" />
    <div class="bottom flex flex-row justify-start mt-8">
      <mdicon
        name="facebook"
        :width="24"
        :height="24"
        class="custom-icon mr-3 cursor-pointer text-custom-icon-nav"
      />
      <mdicon
        name="instagram"
        :width="24"
        :height="24"
        class="custom-icon mr-3 cursor-pointer text-custom-icon-nav"
      />
      <mdicon
        name="linkedin"
        :width="24"
        :height="24"
        class="custom-icon cursor-pointer text-custom-icon-nav"
      />
    </div>
    <div class="inline-container mt-4 flex flex-row items-center">
      <mdicon
        name="phone"
        :width="18"
        :height="18"
        class="custom-icon mr-3 text-custom-icon-nav"
      />
      <p class="detail text-custom-icon-nav">+84 795 799 457</p>
    </div>
    <div class="inline-container mt-4 flex flex-row items-center">
      <mdicon
        name="map-marker"
        :width="18"
        :height="18"
        class="custom-icon mr-3 text-custom-icon-nav"
      />
      <p class="detail text-custom-icon-nav">
        4th floor, 421 Tran Hung Dao Street, Da Nang
      </p>
    </div>
  </div>
</template>

<script>
import logo from "@/assets/images/penguin.png";
import TheDivider from "@/components/TheDivider/TheDivider.vue";
import { mapState } from "vuex";

export default {
  name: "TheFooter",
  data() {
    return {
      images: {
        logo,
      },
    };
  },
  computed: {
    ...mapState(["darkTheme"]),
  },
  components: { TheDivider },
};
</script>

<style lang="scss" scoped>
@use "@/assets/css/variables";
.dark {
  background: variables.$dark-background-nav;
  .top {
    .about {
      .item {
        color: variables.$custom-white-text;
      }
    }
    .logo-container {
      .logo-name {
        color: variables.$custom-white-text;
      }
    }
  }
}
</style>
