<template>
  <div
    class="nice-select flex flex-row items-center justify-center relative text-left z-50 leading-10 box-border select-none block cursor-pointer float-left text-sm font-normal"
    :class="{
      open: isOpenNotificationButton,
      dark: darkTheme,
    }"
    @click="handleOpen"
  >
    <div class="relative">
      <mdicon
        name="bell"
        :width="20"
        :height="20"
        class="logo-icon cursor-pointer"
      />
      <div
        class="absolute animate-bounce -top-1 -right-1 text-custom-white-text bg-red-500 text-xs w-2 h-2 p-2 flex flex-row items-center justify-center rounded-full"
        v-if="countNotReadNotifications !== 0"
      >
        {{ countNotReadNotifications }}
      </div>
    </div>
    <ul v-if="notifications !== null" class="list">
      <perfect-scrollbar class="h-96">
        <li class="option" v-for="(item, index) in notifications" :key="index">
          <div class="flex flex-row items-center py-4">
            <img :src="images.logo" class="h-10 w-10" />
            <div
              v-if="item?.type == 'buyTicket'"
              class="description ml-3 flex-col justify-center text-sm"
            >
              <div>
                {{ $t("message.youbought") }}
                <b class="font-semibold"> {{ item?.numberOfTickets }}</b>
                {{ $t("message.ticketsNum") }}
                <b class="font-semibold"> {{ item?.ticketNumber }}</b>
                {{ $t("message.inround") }}
                <b class="font-semibold">{{ item?.round }}</b>
              </div>
              <div class="font-medium">{{ formatDate(item?.buyAt) }}</div>
            </div>
            <div
              v-if="item?.type == 'winning'"
              class="ml-3 flex-col justify-center text-sm"
            >
              <div>
                <b class="font-semibold">{{ $t("message.congratulation") }} </b>
                {{ $t("message.youwon") }}
                <b class="font-semibold">{{ item?.round }}</b>
                {{ $t("message.amountof") }}
                <b class="font-semibold">
                  {{ formatToUSDT(item?.winAmount) }} $
                </b>
                <div class="font-medium">
                  {{ formatDate1(item?.createdAt) }}
                </div>
              </div>
            </div>
          </div>
          <div
            class="w-full h-px bg-slate-200"
            v-if="index != notifications.length - 1"
          ></div>
        </li>
      </perfect-scrollbar>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import logo from "@/assets/images/penguin.png";
import moment from "moment";
import Web3 from "web3/dist/web3.min.js";
export default {
  name: "NotificationButton",
  data() {
    return {
      isOpenNotificationButton: false,
      images: { logo },
    };
  },
  computed: {
    ...mapState(["darkTheme", "notifications", "account"]),
    countNotReadNotifications() {
      let count = 0;
      for (let i = 0; i < this?.notifications?.length; i++)
        if (this.notifications[i].isRead == false) count++;
      return count;
    },
  },
  watch: {
    isOpenNotificationButton() {
      if (this.isOpenNotificationButton) {
        document.body.style.overflow = "hidden";
        this.readNotifications();
      } else document.body.style.overflow = "auto";
    },
  },
  sockets: {
    getNotifications: function (data) {
      this.setNotifications(data);
    },
    addNotification: function (data) {
      if (data == "check") this.getNotifications(this?.account);
    },
  },
  methods: {
    ...mapActions({
      setNotifications: "setNotifications",
    }),
    handleOpen() {
      this.isOpenNotificationButton = !this.isOpenNotificationButton;
    },
    handleClose(e) {
      if (!this.$el.contains(e.target)) {
        this.isOpenNotificationButton = false;
      }
    },
    formatDate(date) {
      return moment.unix(date).format("hh:mm a, DD/MM/YYYY");
    },
    formatDate1(date) {
      return moment(date).format("hh:mm a, DD/MM/YYYY");
    },
    async readNotifications() {
      await this.$socket.emit("readNotifications", this?.account);
    },
    getNotifications(data) {
      this.$socket.emit("getNotifications", data);
    },
    formatToUSDT(data) {
      return Web3.utils.fromWei(String(data), "picoether");
    },
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
    background: white;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    width: 300px;
    border-radius: 16px;
    box-sizing: border-box;
    margin-top: 24px;
    overflow: hidden;
    position: absolute;
    top: 100%;
    right: 0;
    transform-origin: 50% 0;
    transition: all 0.15s cubic-bezier(0.5, 0, 0, 1.25);
    padding: 4px;
  }
  .option {
    cursor: pointer;
    border-radius: 16px;
    font-weight: 300;
    padding: 0;
    list-style: none;
    font-size: 15px;
    outline: none;
    padding-left: 18px;
    padding-right: 29px;
    text-align: left;
    color: variables.$primary-text-color;
    transition: padding 0.3s ease-in-out;
  }
}

.nice-select.open {
  .list {
    visibility: visible;
    opacity: 1;
    pointer-events: auto;
    transform: scale(1) translateY(0);
  }
  .option:hover {
    background: rgb(233, 233, 233);
  }
}

.dark {
  .current {
    color: variables.$custom-white-text;
  }
  .description:hover {
    color: variables.$primary-text-color;
  }
  .list {
    background: variables.$dark-background-nav;
  }
  .option {
    color: variables.$custom-white-text;
  }
  .option:hover {
    color: variables.$primary-text-color;
  }
  .logo-icon {
    color: variables.$custom-white-text;
  }
}

.dark::after {
  border-bottom: 2px solid variables.$custom-white-text;
  border-right: 2px solid variables.$custom-white-text;
}

@media only screen and (max-width: 319px) {
  .nice-select {
    transform: scale(0.6);
  }
}
@media only screen and (min-width: 320px) and (max-width: 479px) {
  .nice-select {
    transform: scale(0.7);
  }
}

@media only screen and (min-width: 480px) and (max-width: 767px) {
  .nice-select {
    transform: scale(0.8);
  }
}
</style>
