<template>
  <div
    class="modal fixed top-0 w-screen h-screen bg-custom-background-modal flex flex-row items-center justify-center z-50"
    v-show="isOpenSettingModal"
    :class="{ dark: darkTheme }"
  >
    <div
      class="modal-dialog px-4 xs:px-8 sm:px-12 md:px-0 w-full md:w-1/3 h-full flex flex-row items-center justify-center"
    >
      <div class="modal-content w-full">
        <div
          class="modal-header flex flex-row justify-between items-center px-2 pt-1 xs:p-4 rounded-t-2xl bg-custom-title-modal-background w-full"
        >
          <div
            class="modal-title mx-auto text-xs xs:text-base sm:text-xl font-semibold w-11/12 text-left"
          >
            {{ $t("message.settings") }}
          </div>
          <mdicon
            name="close"
            class="cursor-pointer hover:opacity-60 scale-50 xs:scale-75 sm:scale-100"
            :width="28"
            :height="28"
            @click="handleCloseModal"
          />
        </div>
        <div
          class="modal-footer px-4 xs:px-6 flex flex-col items-center justify-center bg-white pt-3 xs:pt-6 pb-3 xs:pb-6 rounded-b-2xl text-lg w-full"
        >
          <div class="flex flex-row items-center justify-between w-full">
            <div class="text-xxs xs:text-sm sm:text-base">
              {{ $t("message.darkMode") }}
            </div>
            <div
              @click="toggleDarkMode"
              class="btn-toggle-theme cursor-pointer flex flex-row items-center justify-between bg-slate-300 rounded-2xl w-8 xs:w-12 sm:w-14 h-3 xs:h-6 sm:h-7"
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
          </div>
          <div class="flex flex-row items-center justify-between w-full mt-3">
            <div class="text-xxs xs:text-sm sm:text-base">
              {{ $t("message.lang") }}
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
          <div class="flex flex-col items-start w-full mt-3">
            <div
              class="text-xxs xs:text-sm sm:text-basetext-sm sm:text-base text-left flex flex-row items-center"
            >
              {{ $t("message.transpeed") }} (GWEI)
              <Popper
                content="Higher GWEI = higher speed = higher fees"
                placement="top"
                hover
                arrow
                style="font-size: 12px; margin-left: 0px"
              >
                <mdicon
                  name="help-circle-outline"
                  class="cursor-pointer"
                  :height="16"
                  width="16"
                />
              </Popper>
            </div>

            <div class="flex flex-row items-center justify-evenly w-full mt-3">
              <div
                class="bg-slate-200 px-4 py-2 rounded-2xl cursor-pointer hover:opacity-80 text-custom-cyan-light font-semibold"
                :class="{ activeTag: speed == 'slow' }"
                @click="setSpeed('slow')"
              >
                <div class="text-xxs sm:text-sm">
                  {{ $t("message.slow") }} (10)
                </div>
              </div>
              <div
                class="bg-slate-200 px-4 py-2 rounded-2xl cursor-pointer hover:opacity-80 text-custom-cyan-light font-semibold"
                :class="{ activeTag: speed == 'medium' }"
                @click="setSpeed('medium')"
              >
                <div class="text-xxs sm:text-sm">
                  {{ $t("message.medium") }} (11)
                </div>
              </div>
              <div
                class="bg-slate-200 px-4 py-2 rounded-2xl cursor-pointer hover:opacity-80 text-custom-cyan-light font-semibold"
                @click="setSpeed('fast')"
                :class="{ activeTag: speed == 'fast' }"
              >
                <div class="text-xxs sm:text-sm">
                  {{ $t("message.fast") }} (12)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import LanguageSwitch from "../LanguageSwitch/LanguageSwitch.vue";
import Popper from "vue3-popper";

export default {
  name: "SettingModal",
  methods: {
    ...mapActions({
      setIsOpenSettingModal: "setIsOpenSettingModal",
      setDarkTheme: "setDarkTheme",
      setSpeed: "setSpeed",
    }),
    handleCloseModal() {
      this.setIsOpenSettingModal(false);
    },
    toggleDarkMode() {
      const bodyElement = document.getElementsByTagName("body")[0];
      this.setDarkTheme(!this.darkTheme);
      localStorage.setItem("darkTheme", this.darkTheme.toString());
      if (this.darkTheme) bodyElement.classList = "darkScrollbar";
      else bodyElement.classList = "";
    },
  },
  computed: {
    ...mapState(["isOpenSettingModal", "darkTheme", "speed"]),
  },
  watch: {
    speed() {
      localStorage.setItem("speed", this.speed);
    },
  },
  components: { LanguageSwitch, Popper },
};
</script>
<style lang="scss" scoped>
@use "@/assets/css/variables";
.active {
  background-color: #27262c;
  color: #fff;
}
.dark {
  .modal-dialog {
    .modal-content {
      .modal-header {
        background: variables.$custom-background-modal-dark;
        color: variables.$custom-white-text;
      }
      .modal-footer {
        background: variables.$dark-background-nav;
        .learn-how {
          background: variables.$custom-switch-dark-background;
        }
        .switch {
          background: variables.$custom-switch-dark-background;
          color: variables.$custom-white-text;
          .active {
            background-color: #fff;
            color: #27262c;
          }
        }
        .information {
          .balance {
            color: variables.$custom-white-text;
          }
        }
      }
    }
  }
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
.activeTag {
  background-color: variables.$primary-color;
  color: variables.$custom-white-text !important;
}
</style>
