<template>
  <div
    class="nice-select h-10 pr-2 relative text-left z-50 leading-10 box-border select-none block cursor-pointer float-left text-xxs xs:text-xs sm:text-base font-normal w-12"
    :class="{
      open: views.isOpenLanguageSwitch,
      dark: darkTheme,
    }"
    @click="handleOpen"
  >
    <span class="current left-2 absolute top-0 xs:top-3 sm:top-2">{{
      currentLanguage
    }}</span>
    <ul class="list">
      <li class="option" @click="handleChangeLanguage('en')">en</li>
      <li class="option" @click="handleChangeLanguage('vn')">vn</li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import i18n from "@/lang/i18n";

export default {
  name: "LanguageSwitch",
  data() {
    return {
      views: {
        isOpenLanguageSwitch: false,
      },
    };
  },
  computed: {
    ...mapState(["darkTheme"]),
    currentLanguage: () => {
      return i18n.global.locale;
    },
  },
  methods: {
    ...mapActions({}),
    handleOpen() {
      this.views.isOpenLanguageSwitch = !this.views.isOpenLanguageSwitch;
    },
    handleClose(e) {
      if (!this.$el.contains(e.target)) {
        this.views.isOpenLanguageSwitch = false;
      }
    },
    handleChangeLanguage(value) {
      this.currentLanguage = value;
      localStorage.setItem("language", value);
      i18n.global.locale = value;
    },
  },
  beforeMount() {
    const language = localStorage.getItem("language");
    if (language) {
      i18n.global.locale = language;
    } else {
      localStorage.setItem("language", this.currentLanguage.toString());
    }
  },
  mounted() {
    document.addEventListener("click", this.handleClose);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClose);
  },
  components: {},
};
</script>

<style lang="scss" scoped>
@use "@/assets/css/variables";
.nice-select {
  .list {
    visibility: hidden;
    background: variables.$light-background-nav;
    box-shadow: 0px 3px 7px 0px rgb(0 0 0 / 35%);
    width: 125px;
    border-radius: 16px;
    box-sizing: border-box;
    margin-top: 4px;
    overflow: hidden;
    position: absolute;
    top: 100%;
    right: 0;
    transform-origin: 50% 0;
    transition: all 0.15s cubic-bezier(0.5, 0, 0, 1.25);
    transform: scale(0.75) translateY(-21px);
  }
  .option {
    cursor: pointer;
    font-weight: 400;
    line-height: 40px;
    list-style: none;
    min-height: 40px;
    outline: none;
    padding-left: 18px;
    padding-right: 29px;
    text-align: left;
    color: variables.$primary-text-color;
    transition: padding 0.3s ease-in-out;
  }
}

.nice-select::after {
  border-bottom: 2px solid variables.$primary-text-color;
  border-right: 2px solid variables.$primary-text-color;
  content: "";
  display: block;
  height: 6px;
  margin-top: -4px;
  pointer-events: none;
  position: absolute;
  right: 10px;
  top: 50%;
  transform-origin: 66% 66%;
  transform: rotate(45deg);
  transition: all 0.15s ease-in-out;
  width: 6px;
  border-radius: 2px;
}

.nice-select.open {
  .list {
    visibility: visible;
    opacity: 1;
    pointer-events: auto;
    transform: scale(1) translateY(0);
  }
  .option:hover {
    background: variables.$primary-color;
    color: #fff;
    font-weight: 600;
    padding-left: 24px;
  }
}
.nice-select.open::after {
  transform: rotate(-135deg);
}

.dark {
  .current {
    color: variables.$custom-white-text;
  }
  .list {
    background: variables.$dark-background-nav;
  }
  .option {
    color: variables.$custom-white-text;
  }
}

.dark::after {
  border-bottom: 2px solid variables.$custom-white-text;
  border-right: 2px solid variables.$custom-white-text;
}
</style>
