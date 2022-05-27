import { LOTTERY_CONTRACT_ADDRESS } from "@/constants";
import LOTTERY from "@/contracts/Lottery.json";
import Web3 from "web3/dist/web3.min.js";
import { web3ToRead, web3ToWrite } from "./getWeb3";
import store from "@/store/index";

export const lotteryContractToRead = new web3ToRead.eth.Contract(
  LOTTERY.abi,
  LOTTERY_CONTRACT_ADDRESS
);

export const lotteryContractToWrite = new web3ToWrite.eth.Contract(
  LOTTERY.abi,
  LOTTERY_CONTRACT_ADDRESS
);
console.log(lotteryContractToRead);
const options = { filter: { value: [] }, fromBlock: 1 };

lotteryContractToRead.events.LotteryOpen(options).on("data", () => {
  store.dispatch("setCurrentLottery");
});

lotteryContractToRead.events.PrizePoolChanged(options).on("data", () => {
  store.dispatch("setCurrentLottery");
});

lotteryContractToRead.events.RequestNumbers(options).on("data", () => {
  store.dispatch("setCurrentLottery");
});

lotteryContractToRead.events.LotteryClose(options).on("data", () => {
  store.dispatch("setCurrentLottery");
});

export const buyTickets = async (
  lotteryID,
  numberTicket,
  ticketNumber,
  from
) => {
  await lotteryContractToWrite.methods
    .buyTickets(lotteryID, numberTicket, ticketNumber)
    .send({
      gas: "6721975",
      gasPrice: Web3.utils.toWei(String(20), "gwei"),
      from,
    });
  store.dispatch("setIsOpenBuyTicketModal", false);
  store.dispatch("setIsOpenSnackBar", true);
  store.dispatch("setTypeSnackBar", "success");
  store.dispatch("setMessageSnackBar", "Buy ticket successfully");
};

export const getCurrentLottoInfo = async () => {
  return await lotteryContractToRead.methods.getCurrentLottoInfo().call();
};

export const getBasicLottoInfo = async (lotteryID) => {
  return await lotteryContractToRead.methods
    .getBasicLottoInfo(lotteryID)
    .call();
};

export const costToBuyTickets = async (lotteryID, numberOfTickets) => {
  const cost = await lotteryContractToRead.methods
    .costToBuyTickets(lotteryID, numberOfTickets)
    .call();
  return Web3.utils.fromWei(cost, "ether");
};
