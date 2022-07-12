<template>
  <div
    class="footer-container w-full bg-custom-nav box-border flex flex-col items-between py-2 xs:py-4 sm:py-12 px-2 xs:px-5 sm:px-40"
    :class="{ dark: darkTheme, hidden: path }"
  >
    <div class="top w-full flex flex-row items-start">
      <div class="about flex flex-col items-start w-1/4">
        <p
          class="title text-custom-purple-title font-semibold text-xxxs xs:text-xs sm:text-base mb-1"
        >
          ABOUT
        </p>
        <a
          class="item text-custom-purple-text-light leading-loose text-xxxs xs:text-xs sm:text-base font-normal hover:underline hover:cursor-pointer"
        >
          Contact
        </a>
        <a
          class="item text-custom-purple-text-light leading-loose text-xxxs xs:text-xs sm:text-base font-normal hover:underline hover:cursor-pointer"
        >
          Brand
        </a>
        <a
          class="item text-custom-purple-text-light leading-loose text-xxxs xs:text-xs sm:text-base font-normal hover:underline hover:cursor-pointer"
        >
          Blog
        </a>
        <a
          class="item text-custom-purple-text-light leading-loose text-xxxs xs:text-xs sm:text-base font-normal hover:underline hover:cursor-pointer"
        >
          Community
        </a>
      </div>
      <div class="about flex flex-col items-start w-1/4">
        <p
          class="title text-custom-purple-title font-semibold text-xxxs xs:text-xs sm:text-base mb-1"
        >
          HELP
        </p>
        <a
          class="item text-custom-purple-text-light text-xxxs xs:text-xs text-left sm:text-base leading-loose font-normal hover:underline hover:cursor-pointer"
        >
          Customer Support
        </a>
        <a
          class="item text-custom-purple-text-light text-xxxs xs:text-xs sm:text-base leading-loose font-normal hover:underline hover:cursor-pointer"
        >
          Troubleshooting
        </a>
        <a
          class="item text-custom-purple-text-light text-xxxs xs:text-xs text-left sm:text-base leading-loose font-normal hover:underline hover:cursor-pointer"
        >
          Guides
        </a>
      </div>
      <div class="about flex flex-col items-start w-1/4">
        <p
          class="title text-custom-purple-title font-semibold text-xxxs xs:text-xs sm:text-base mb-1"
        >
          DEVELOPERS
        </p>
        <a
          class="item text-custom-purple-text-light text-xxxs xs:text-xs sm:text-base leading-loose font-normal hover:underline hover:cursor-pointer"
        >
          Github
        </a>
        <a
          class="item text-custom-purple-text-light text-xxxs xs:text-xs sm:text-base leading-loose font-normal hover:underline hover:cursor-pointer"
        >
          Documentation
        </a>
        <a
          class="item text-custom-purple-text-light text-xxxs xs:text-xs sm:text-base leading-loose font-normal hover:underline hover:cursor-pointer"
        >
          Bug Bounty
        </a>
        <a
          class="item text-custom-purple-text-light text-xxxs xs:text-xs sm:text-base leading-loose font-normal hover:underline hover:cursor-pointer"
        >
          Audits
        </a>
        <a
          class="item text-custom-purple-text-light text-xxxs xs:text-xs text-left sm:text-base leading-loose font-normal hover:underline hover:cursor-pointer"
        >
          Careers
        </a>
      </div>
      <div class="logo-container w-1/4 pl-8 sm:pl-0 flex flex-col items-end">
        <div class="flex flex-row items-center justify-end">
          <img :src="images.logo" class="logo h-2 xs:h-4 sm:h-12" />
          <span
            class="logo-name font-bold text-xxxs xs:text-xs sm:text-xl ml-2"
          >
            PenguinLott
          </span>
        </div>
        <div class="flex flex-col sm:flex-row items-center mt-3 sm:mt-8">
          <div
            @click="toggleDarkMode"
            class="mr-0 sm:mr-12 btn-toggle-theme cursor-pointer flex flex-row items-center justify-between bg-slate-300 rounded-2xl w-8 xs:w-12 sm:w-14 h-3 xs:h-6 sm:h-7"
          >
            <div
              class="toggle rounded-full h-3 xs:h-5 sm:h-6 w-3 xs:w-5 sm:w-6 flex flex-row items-center justify-center ml-px transition-all ease-in-out duration-200"
              :class="{ toggleLight: !darkTheme }"
            >
              <mdicon
                name="white-balance-sunny"
                class="scale-50 xs:scale-75 sm:scale-100"
                :width="16"
                :height="16"
              />
            </div>
            <div
              class="toggle rounded-full h-3 xs:h-5 sm:h-6 w-3 xs:w-5 sm:w-6 flex flex-row items-center justify-center mr-px transition-all ease-in-out duration-300"
              :class="{ toggleDark: darkTheme }"
            >
              <mdicon
                class="night-icon scale-50 xs:scale-75 sm:scale-100"
                name="weather-night"
                :width="16"
                :height="16"
              />
            </div>
          </div>
          <div class="flex flex-row items-center">
            <mdicon
              class="custom-icon scale-50 xs:scale-75 sm:scale-100"
              name="earth"
              :width="18"
              :height="18"
            />
            <LanguageSwitch />
          </div>
        </div>
      </div>
    </div>
    <TheDivider class="mt-2 xs:mt-4 sm:mt-6" />
    <div class="bottom flex flex-row justify-start mt-2 xs:mt-3 sm:mt-8">
      <mdicon
        name="facebook"
        :width="24"
        :height="24"
        class="custom-icon mr-3 cursor-pointer text-custom-icon-nav scale-50 xs:scale-75 sm:scale-100"
      />
      <mdicon
        name="instagram"
        :width="24"
        :height="24"
        class="custom-icon mr-3 cursor-pointer text-custom-icon-nav scale-50 xs:scale-75 sm:scale-100"
      />
      <mdicon
        name="linkedin"
        :width="24"
        :height="24"
        class="custom-icon cursor-pointer text-custom-icon-nav scale-50 xs:scale-75 sm:scale-100"
      />
    </div>
    <div class="inline-container mt-2 xs:mt-4 flex flex-row items-center">
      <mdicon
        name="phone"
        :width="18"
        :height="18"
        class="custom-icon mr-3 text-custom-icon-nav scale-50 xs:scale-75 sm:scale-100"
      />
      <p class="detail text-custom-icon-nav text-xxs xs:text-xs sm:text-base">
        +84 795 799 457
      </p>
    </div>
    <div class="inline-container mt-2 xs:mt-4 flex flex-row items-center">
      <mdicon
        name="map-marker"
        :width="18"
        :height="18"
        class="custom-icon mr-3 text-custom-icon-nav scale-50 xs:scale-75 sm:scale-100"
      />
      <p class="detail text-custom-icon-nav text-xxs xs:text-xs sm:text-base">
        4th floor, 421 Tran Hung Dao Street, Da Nang
      </p>
    </div>
  </div>
</template>

<script>
import logo from "@/assets/images/penguin.png";
import TheDivider from "@/components/TheDivider/TheDivider.vue";
import { mapActions, mapState } from "vuex";
import { useRoute } from "vue-router";
import { computed } from "vue";
import LanguageSwitch from "../LanguageSwitch/LanguageSwitch.vue";
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
    path() {
      const route = useRoute();
      const currentPath = computed(() => route.path);
      return currentPath.value.startsWith("/tutorial");
    },
  },
  methods: {
    ...mapActions({
      setDarkTheme: "setDarkTheme",
    }),
    toggleDarkMode() {
      const bodyElement = document.getElementsByTagName("body")[0];
      this.setDarkTheme(!this.darkTheme);
      localStorage.setItem("darkTheme", this.darkTheme.toString());
      if (this.darkTheme) bodyElement.classList = "darkScrollbar";
      else bodyElement.classList = "";
    },
  },
  components: { TheDivider, LanguageSwitch },
};
</script>

<style lang="scss" scoped>
@use "@/assets/css/variables";
.active {
  background-color: #27262c;
  color: #fff;
}
.toggleLight {
  background: white;
  border: 2px variables.$dark-background-nav solid;
}
.toggleDark {
  background: rgb(39, 38, 44);
  border: 2px variables.$custom-white-text solid;
  .night-icon {
    color: white;
  }
}
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
.hidden {
  display: none;
}
</style>
