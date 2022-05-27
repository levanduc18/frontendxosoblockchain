<template>
  <div
    class="modal fixed top-0 w-screen h-screen bg-custom-background-modal flex flex-row items-center justify-center z-30"
    v-show="isOpenWalletModal"
    :class="{ dark: darkTheme }"
  >
    <div class="modal-dialog w-1/4 h-1/3" style="margin-top: -100px">
      <div class="modal-content w-full">
        <div
          class="modal-header flex flex-row justify-between items-center p-4 rounded-t-2xl bg-custom-title-modal-background w-full"
        >
          <div
            class="modal-title mx-auto text-xl font-semibold w-11/12 text-left"
          >
            Your Wallet
          </div>
          <mdicon
            name="close"
            class="cursor-pointer hover:opacity-60"
            :width="28"
            :height="28"
            @click="handleCloseModal"
          />
        </div>
        <div
          class="modal-footer flex flex-col items-center justify-center bg-white px-8 pt-8 pb-4 rounded-b-2xl text-lg w-full"
        >
          <div
            v-if="network != parseInt(defaultNetwork)"
            class="w-full learn-how pb-2"
          >
            <div>
              You're connected to the wrong network.
              <br />Please switch to Polygon!
            </div>
            <button
              class="learn-how-btn flex flex-row items-center justify-center font-semibold px-6 py-2 bg-button-background-primary text-custom-white-text rounded-2xl shadow-3xl hover:opacity-80 w-full mt-6"
            >
              Learn How
              <mdicon
                name="help-circle"
                class="ml-2"
                :width="20"
                :height="20"
              />
            </button>
          </div>
          <div v-else class="w-full">
            <div
              class="switch flex flex-row w-full rounded-2xl bg-slate-200 mt-1 items-center"
            >
              <div
                class="wallet-switch px-4 py-2 font-semibold w-1/2 cursor-pointer rounded-2xl"
                :class="{ active: activeSwitchWallet == 0 }"
                @click="setActiveSwitchWallet(0)"
              >
                Wallet
              </div>
              <div
                class="transactions-switch px-4 py-2 font-semibold w-1/2 cursor-pointer rounded-2xl"
                :class="{ active: activeSwitchWallet == 1 }"
                @click="setActiveSwitchWallet(1)"
              >
                Buy history
              </div>
            </div>
            <div
              v-if="activeSwitchWallet == 0"
              class="information pt-6 pb-2 flex flex-col items-end"
            >
              <div
                class="address-title flex flex-row justify-between font-semibold text-custom-purple-title w-full text-left"
              >
                YOUR ADDRESS
                <div
                  class="copy-alert bg-slate-100 px-4 py-1 text-sm rounded-2xl"
                  v-if="views.isViewCopied"
                >
                  Copied!
                </div>
              </div>
              <div
                class="address-value-icon mt-2 w-full overflow-hidden bg-slate-200 rounded-2xl p-2 flex flex-row items-center justify-around"
              >
                <input
                  type="text"
                  class="address-value w-10/12 overflow-hidden text-normal font-bold bg-transparent focus:outline-none"
                  v-model="account"
                />
                <mdicon
                  name="content-copy"
                  :width="18"
                  :height="18"
                  @click="handleCopyAddress"
                  class="copy-icon cursor-pointer"
                />
              </div>
              <div
                class="balance mt-6 flex flex-row items-center justify-between mb-6 w-full"
              >
                <div class="balance-title">Your Balance</div>
                <div class="balance-value font-semibold">
                  {{ USDTBalance + " USDT" }}
                </div>
              </div>
              <div>
                <a
                  :href="'https://bscscan.com/address/' + account"
                  class="view-on-bscscan text-custom-cyan-light mt-4"
                  target="_blank"
                >
                  View On BscScan
                </a>
              </div>
              <div class="w-full">
                <button
                  class="learn-how-btn flex flex-row items-center justify-center font-semibold px-6 py-2 bg-button-background-primary text-custom-white-text rounded-2xl shadow-3xl hover:opacity-80 w-full mt-6"
                  @click="handleLogout"
                >
                  Disconnect Wallet
                </button>
              </div>
            </div>
            <div v-else class="recent-transactions">
              <div
                class="recent-transactions-title font-semibold text-custom-purple-title text-left mt-6"
              >
                BUY HISTORY
              </div>
              <div v-for="(item, index) in ticketsAllRound" :key="index">
                <div
                  v-for="(it, id) in item"
                  :key="id"
                  class="w-full bg-slate-100 rounded-2xl px-4 py-2 mt-2 flex flex-row relative"
                >
                  <mdicon
                    name="check"
                    :width="32"
                    :height="32"
                    class="text-green-500 absolute top-0 right-0"
                  />
                  <img :src="images.ticket" class="h-12" />
                  <div class="flex flex-col ml-4">
                    <div
                      class="flex flex-row items-center font-semibold text-xl"
                    >
                      Round
                      {{ it?.lotteryId }}
                    </div>

                    <div
                      class="ticket-container w-full flex flex-row items-center"
                    >
                      <div class="flex flex-row items-center">
                        Number:
                        <div class="ml-1 font-semibold">
                          {{ it?.numbers }}
                        </div>
                      </div>
                      <div class="ml-6 flex flex-row items-center">
                        Quantity:
                        <div class="ml-1 font-semibold">
                          {{ it?.numberOfTickets }}
                        </div>
                      </div>
                    </div>
                  </div>
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
import { NETWORK_ID } from "@/constants";
export default {
  name: "WalletModal",
  methods: {
    ...mapActions({
      setIsOpenWalletModal: "setIsOpenWalletModal",
      getUSDTBalance: "getUSDTBalance",
      setActiveSwitchWallet: "setActiveSwitchWallet",
      getUserTicketsAllRound: "getUserTicketsAllRound",
      setTicketsByUserAllRound: "setTicketsByUserAllRound",
    }),
    handleCopyAddress() {
      navigator.clipboard.writeText(this.account);
      this.views.isViewCopied = true;
      setTimeout(() => {
        this.views.isViewCopied = false;
      }, 1000);
    },
    handleCloseModal() {
      this.setIsOpenWalletModal(false);
    },
  },
  data() {
    return {
      views: {
        isViewCopied: false,
      },
      defaultNetwork: NETWORK_ID,
      images: {
        ticket: require("@/assets/images/ticket.png"),
      },
    };
  },
  computed: {
    ...mapState([
      "USDTBalance",
      "account",
      "network",
      "isOpenWalletModal",
      "darkTheme",
      "activeSwitchWallet",
      "tickets",
      "ticketsAllRound",
      "currentLottery",
    ]),
    activeSwitch() {
      return this.activeSwitchWallet;
    },
  },
  watch: {
    isOpenWalletModal() {
      if (this.isOpenWalletModal) {
        document.body.style.overflow = "hidden";
        this.getUSDTBalance(this.account);
      } else document.body.style.overflow = "auto";
    },
  },
  async mounted() {
    const ticketsAllRound = await this.getUserTicketsAllRound(this?.account);
    this.setTicketsByUserAllRound(ticketsAllRound);
  },
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
</style>
