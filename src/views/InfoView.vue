<template>
  <div
    class="info pt-12 pb-8 px-3 sm:px-20 w-full bg-custom-background-home-light"
    :class="{ darkPage: darkTheme }"
  >
    <div class="flex w-full px-2 flex-row items-center justify-between">
      <div class="title text-xl sm:text-2xl font-semibold text-left">
        {{ $t("message.i1") }}
      </div>
      <div class="text-right">{{ $t("message.i2") }}: {{ date }}</div>
    </div>
    <div class="w-full flex flex-col sm:flex-row justify-between items-center">
      <div
        class="relative darkbox bg-white border rounded-3xl mt-6 px-6 py-6 w-[calc(100%_-_1rem)] sm:w-[calc(50%_-_1rem)] shadow-sm"
      >
        <div class="flex flex-row items-center justify-between">
          <div
            class="font-semibold text-base sm:text-xl text-left text-custom-purple-title"
          >
            {{ $t("message.i3") }}($)
          </div>

          <div
            class="nice-select border border-slate-400 rounded-xl h-10 pr-2 relative text-left z-10 leading-10 box-border select-none block cursor-pointer float-left text-xxs xs:text-xs sm:text-base font-normal w-20"
            :class="{
              open: isOpenSwitch,
              dark: darkTheme,
            }"
            @click="handleOpen"
          >
            <span
              class="current left-2 text-sm absolute top-0 xs:top-3 sm:top-2"
              >{{ findBy }}
            </span>
            <ul class="list">
              <li class="option" @click="handleChangeValue($t('message.i4'))">
                {{ $t("message.i4") }}
              </li>
              <li class="option" @click="handleChangeValue($t('message.i5'))">
                {{ $t("message.i5") }}
              </li>
              <li class="option" @click="handleChangeValue($t('message.i6'))">
                {{ $t("message.i6") }}
              </li>
            </ul>
          </div>
        </div>
        <img
          :src="loadingSVG"
          class="h-20 absolute top-1/2 left-1/2 -mt-30 -ml-10"
          v-if="isLoading"
        />
        <Chart
          class="mt-4 ml-2 scale-75 sm:scale-100 -translate-x-16 sm:translate-x-0"
          :size="{ width: 480, height: 320 }"
          :data="formatData(data)"
          :margin="margin"
          :direction="direction"
          :axis="axis"
        >
          <template #layers>
            <Grid strokeDasharray="2,2" />
            <Area
              :dataKeys="['id', 'prizePool']"
              type="monotone"
              :areaStyle="{ fill: 'url(#grad)' }"
            />
            <Line
              :dataKeys="['id', 'prizePool']"
              type="monotone"
              :lineStyle="{
                stroke: '#9f7aea',
              }"
            />

            <defs>
              <linearGradient id="grad" gradientTransform="rotate(90)">
                <stop offset="0%" stop-color="#be90ff" stop-opacity="1" />
                <stop offset="100%" stop-color="white" stop-opacity="0.4" />
              </linearGradient>
            </defs>
          </template>

          <template #widgets>
            <Tooltip
              borderColor="#48CAE4"
              :config="{
                amountCollectedInUSDT: { hide: true },
                costPerTicket: { hide: true },
                status: { hide: true },
                _id: { hide: true },
                winningNumbers: { hide: true },
                startedAt: { hide: true },
                createdAt: { hide: true },
                updatedAt: { hide: true },
                userNumber: { hide: true },
              }"
            />
          </template>
        </Chart>
      </div>
      <div
        class="relative darkbox bg-white border rounded-3xl mt-6 px-6 py-6 w-[calc(100%_-_1rem)] sm:w-[calc(50%_-_1rem)] shadow-sm"
      >
        <div class="flex flex-row items-center justify-between">
          <div
            class="font-semibold text-base sm:text-xl text-left text-custom-purple-title"
          >
            {{ $t("message.i7") }} ($)
          </div>

          <div
            class="nice-select border border-slate-400 rounded-xl h-10 pr-2 relative text-left z-10 leading-10 box-border select-none block cursor-pointer float-left text-xxs xs:text-xs sm:text-base font-normal w-20"
            :class="{
              open: isOpenSwitch1,
              dark: darkTheme,
            }"
            @click="handleOpen1"
          >
            <span
              class="current left-2 text-sm absolute top-0 xs:top-3 sm:top-2"
              >{{ findBy1 }}</span
            >
            <ul class="list">
              <li
                class="option"
                @click="handleChangeValue1(this.$t('message.i4'))"
              >
                {{ $t("message.i4") }}
              </li>
              <li
                class="option"
                @click="handleChangeValue1(this.$t('message.i5'))"
              >
                {{ $t("message.i5") }}
              </li>
              <li
                class="option"
                @click="handleChangeValue1(this.$t('message.i6'))"
              >
                {{ $t("message.i6") }}
              </li>
            </ul>
          </div>
        </div>
        <img
          :src="loadingSVG"
          class="h-20 absolute top-1/2 left-1/2 -mt-30 -ml-10"
          v-if="isLoading1"
        />
        <Chart
          class="mt-4 ml-2 scale-75 sm:scale-100 -translate-x-16 sm:translate-x-0"
          :size="{ width: 480, height: 320 }"
          :data="formatDataWithLength(data1)"
          :margin="margin"
          :direction="direction"
          :axis="axis"
        >
          <template #layers>
            <Grid strokeDasharray="2,2" />
            <Area
              :dataKeys="['id', 'users']"
              type="monotone"
              :areaStyle="{ fill: 'url(#grad)' }"
            />
            <Line
              :dataKeys="['id', 'users']"
              type="monotone"
              :lineStyle="{
                stroke: '#9f7aea',
              }"
            />

            <defs>
              <linearGradient id="grad" gradientTransform="rotate(90)">
                <stop offset="0%" stop-color="#be90ff" stop-opacity="1" />
                <stop offset="100%" stop-color="white" stop-opacity="0.4" />
              </linearGradient>
            </defs>
          </template>

          <template #widgets>
            <Tooltip
              borderColor="#48CAE4"
              :config="{
                amountCollectedInUSDT: { hide: true },
                costPerTicket: { hide: true },
                status: { hide: true },
                _id: { hide: true },
                winningNumbers: { hide: true },
                startedAt: { hide: true },
                createdAt: { hide: true },
                updatedAt: { hide: true },
                userNumber: { hide: true },
                prizePool: { hide: true },
              }"
            />
          </template>
        </Chart>
      </div>
    </div>
    <div
      class="darkbox border bg-white w-full border-slate-200 p-1 pt-3 pb-6 sm:p-8 sm:pb-10 mt-6 rounded-3xl shadow-sm"
    >
      <div class="text-xl sm:text-3xl font-semibold mb-4">
        {{ $t("message.i8") }}
      </div>
      <TableLite
        class="table w-full text-xxxs sm:text-base"
        :is-static-mode="true"
        :is-loading="isLoadingUser"
        :columns="table.columns"
        :rows="table.rows"
        :total="table.totalRecordCount"
        :sortable="table.sortable"
        @is-finished="table.isLoading = false"
      />
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { reactive, ref } from "vue";
import { Chart, Grid, Area, Line, Tooltip } from "vue3-charts";
import loadingSVG from "@/assets/images/loading.svg";
import TableLite from "vue3-table-lite";
import { mapState } from "vuex";
export default {
  name: "InfoView",
  components: { Chart, Grid, Area, Line, Tooltip, TableLite },
  computed: {
    ...mapState(["darkTheme"]),
  },
  data() {
    return {
      date: moment(new Date()).format("DD/MM/YYYY"),
      table: reactive({
        isLoading: false,
        columns: [
          {
            label: "ID",
            field: "index",
            width: "3%",
            sortable: true,
            isKey: true,
          },
          {
            label: "Address",
            field: "address",
            width: "10%",
            sortable: true,
          },
          {
            label: "Amount ($)",
            field: "amount",
            width: "15%",
            sortable: true,
          },
        ],
        rows: [],
        totalRecordCount: 0,
        sortable: {
          order: "index",
          sort: "asc",
        },
      }),
      loadingSVG,
      users: [],
      findBy: this.$t("message.i4"),
      findBy1: this.$t("message.i4"),
      isOpenSwitch: false,
      isOpenSwitch1: false,
      isLoading: false,
      isLoading1: false,
      isLoadingUser: false,
      data: [],
      data1: [],
      margin: ref({
        left: 0,
        top: 20,
        right: 20,
        bottom: 0,
      }),
      axis: ref({
        primary: {
          type: "band",
        },
        secondary: {
          domain: ["dataMin", "dataMax + 100"],
          type: "linear",
          ticks: 8,
        },
      }),
      direction: ref("horizontal"),
    };
  },

  sockets: {
    getLotteries: function (data) {
      this.data = data;
      console.log(data);
      this.isLoading = false;
    },
    getLotteriesBoard: function (data) {
      this.data1 = data;
      this.isLoading1 = false;
    },
    getAllUsers: function (data) {
      this.table.rows = this.formatUser(data);
      this.isLoadingUser = false;
      this.table.totalRecordCount = data?.length;
    },
    pleaseUpdateLottery: function (data) {
      if (data == "check") {
        this.getLotteries();
        this.getLotteriesBoard();
      }
    },
    pleaseCheckUser: function (data) {
      if (data == "check") {
        this.getAllUsers();
      }
    },
  },
  beforeMount() {
    this.getLotteries();
    this.getLotteriesBoard();
    this.getAllUsers();
  },

  mounted() {
    document.addEventListener("click", this.handleClose);
    document.addEventListener("click", this.handleClose1);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClose);
    document.removeEventListener("click", this.handleClose1);
  },
  methods: {
    getLotteries() {
      this.isLoading = true;
      if (this.findBy == "Week" || this.findBy == "Tuần")
        this.$socket.emit("getLotteries", "week");
      if (this.findBy == "Month" || this.findBy == "Tháng")
        this.$socket.emit("getLotteries", "month");
      if (this.findBy == "Year" || this.findBy == "Năm")
        this.$socket.emit("getLotteries", "year");
    },
    getLotteriesBoard() {
      this.isLoading1 = true;
      if (this.findBy1 == "Week" || this.findBy1 == "Tuần")
        this.$socket.emit("getLotteriesBoard", "week");
      if (this.findBy1 == "Month" || this.findBy1 == "Tháng")
        this.$socket.emit("getLotteriesBoard", "month");
      if (this.findBy1 == "Year" || this.findBy1 == "Năm")
        this.$socket.emit("getLotteriesBoard", "year");
    },
    getAllUsers() {
      this.isLoadingUser = true;
      this.$socket.emit("getAllUsers");
    },
    handleChangeValue(value) {
      this.findBy = value;
      this.getLotteries();
    },
    handleChangeValue1(value) {
      this.findBy1 = value;
      this.getLotteriesBoard();
    },
    handleOpen() {
      this.isOpenSwitch = !this.isOpenSwitch;
    },
    handleOpen1() {
      this.isOpenSwitch1 = !this.isOpenSwitch1;
    },
    handleClose(e) {
      if (!this.$el.contains(e.target)) {
        this.isOpenSwitch = false;
      }
    },
    handleClose1(e) {
      if (!this.$el.contains(e.target)) {
        this.isOpenSwitch1 = false;
      }
    },
    formatData(data) {
      let clone = data;
      if (this.findBy == "Week" || this.findBy == "Tuần") {
        for (let i = 0; i < clone?.length; i++) {
          if (typeof clone[i].closingAt == "number") {
            clone[i].dayOfWeek = moment
              .unix(Number(clone[i].closingAt))
              .format("ddd");
            clone[i].closingAt = moment
              .unix(Number(clone[i].closingAt))
              .format("DD/MM/yyyy");
          }
        }
      }
      if (
        this.findBy == "Month" ||
        this.findBy == "Year" ||
        this.findBy == "Tháng" ||
        this.findBy == "Năm"
      ) {
        for (let i = 0; i < clone?.length; i++) {
          if (typeof clone[i].closingAt == "number") {
            clone[i].closingAt = moment
              .unix(Number(clone[i].closingAt))
              .format("DD/MM/yyyy");
          }
        }
      }
      return clone;
    },
    formatUser(data) {
      let clone = data;
      for (let i = 0; i < clone?.length; i++) {
        clone[i].index = i + 1;
        clone[i].amount = clone[i].amount?.toFixed(1);
      }
      return clone;
    },
    formatDataWithLength(data) {
      let clone = data;
      if (this.findBy1 == "Week" || this.findBy1 == "Tuần") {
        for (let i = 0; i < clone?.length; i++) {
          if (typeof clone[i].closingAt == "number") {
            clone[i].dayOfWeek = moment
              .unix(Number(clone[i].closingAt))
              .format("ddd");
            clone[i].closingAt = moment
              .unix(Number(clone[i].closingAt))
              .format("DD/MM/yyyy");
          }
        }
      }
      if (
        this.findBy1 == "Month" ||
        this.findBy1 == "Year" ||
        this.findBy1 == "Tháng" ||
        this.findBy1 == "Năm"
      ) {
        for (let i = 0; i < clone?.length; i++) {
          if (typeof clone[i].closingAt == "number") {
            clone[i].closingAt = moment
              .unix(Number(clone[i].closingAt))
              .format("DD/MM/yyyy");
          }
        }
      }

      for (let i = 0; i < clone?.length; i++) {
        clone[i].users = clone[i].userNumber?.length;
      }

      return clone;
    },
  },
};
</script>
<style lang="scss" scoped>
@use "@/assets/css/variables";
.nice-select {
  .list {
    visibility: hidden;
    background: variables.$light-background-nav;
    box-shadow: 0px 3px 7px 0px rgb(0 0 0 / 35%);
    width: 120px;
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
.darkPage {
  background: radial-gradient(103.12% 50% at 50% 50%, #21193a 0, #191326 100%);
  color: variables.$custom-white-text;
  .table {
    color: #191326 !important;
  }
  .darkbox {
    background: variables.$dark-background-nav !important;
  }
}
</style>
