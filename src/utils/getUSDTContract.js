import { LOTTERY_CONTRACT_ADDRESS, USDT_CONTRACT_ADDRESS } from "@/constants";
import USDT from "@/contracts/UsdtMock.json";
import { web3ToRead, web3ToWrite } from "./getWeb3";
import Web3 from "web3/dist/web3.min.js";
import store from "@/store/index";

export const usdtContractToRead = new web3ToRead.eth.Contract(
  USDT.abi,
  USDT_CONTRACT_ADDRESS
);

export const usdtContractToWrite = new web3ToWrite.eth.Contract(
  USDT.abi,
  USDT_CONTRACT_ADDRESS
);
export const increaseAllowance = async (numberTicket, from, speed) => {
  try {
    await usdtContractToWrite.methods
      .increaseAllowance(
        LOTTERY_CONTRACT_ADDRESS,
        Web3.utils.toWei(String(numberTicket), "picoether")
      )
      .send({
        from,
        gas: "6721975",
        gasPrice: Web3.utils.toWei(
          String(speed == "slow" ? 10 : speed == "medium" ? 11 : 12),
          "gwei"
        ),
      });
    store.dispatch("setIsOpenWalletModal", false);
    store.dispatch("setIsOpenSnackBar", true);
    store.dispatch("setTypeSnackBar", "success");
    store.dispatch("setMessageSnackBar", "Approve successfully");
  } catch (err) {
    store.dispatch("setIsOpenWalletModal", false);
    store.dispatch("setIsOpenSnackBar", true);
    store.dispatch("setTypeSnackBar", "error");
    store.dispatch("setMessageSnackBar", "Approve failed");
  }
};

export const decreaseAllowance = async (numberTicket, from, speed) => {
  try {
    await usdtContractToWrite.methods
      .decreaseAllowance(
        LOTTERY_CONTRACT_ADDRESS,
        Web3.utils.toWei(String(numberTicket), "picoether")
      )
      .send({
        from,
        gas: "6721975",
        gasPrice: Web3.utils.toWei(
          String(speed == "slow" ? 10 : speed == "medium" ? 11 : 12),
          "gwei"
        ),
      });
    store.dispatch("setIsOpenWalletModal", false);
    store.dispatch("setIsOpenSnackBar", true);
    store.dispatch("setTypeSnackBar", "success");
    store.dispatch("setMessageSnackBar", "Restore successfully");
  } catch (err) {
    store.dispatch("setIsOpenWalletModal", false);
    store.dispatch("setIsOpenSnackBar", true);
    store.dispatch("setTypeSnackBar", "error");
    store.dispatch("setMessageSnackBar", "Restore failed");
  }
};

export const mint = async (from, receiver, amount, speed) => {
  try {
    await usdtContractToWrite.methods
      .mint(receiver, Web3.utils.toWei(String(amount), "picoether"))
      .send({
        from,
        gasPrice: Web3.utils.toWei(
          String(speed == "slow" ? 10 : speed == "medium" ? 11 : 12),
          "gwei"
        ),
        gas: "6721975",
      });
    store.dispatch("setIsOpenSnackBar", true);
    store.dispatch("setTypeSnackBar", "success");
    store.dispatch("setMessageSnackBar", "Mint successfully");
  } catch (err) {
    store.dispatch("setIsOpenSnackBar", true);
    store.dispatch("setTypeSnackBar", "error");
    store.dispatch("setMessageSnackBar", "Mint failed");
  }
};

export const getAllowanceBalance = async (from) => {
  const balance = await usdtContractToRead.methods
    .allowance(from, LOTTERY_CONTRACT_ADDRESS)
    .call();
  return Web3.utils.fromWei(balance, "picoether");
};

export const getUSDTBalance = async (from) => {
  const balance = await usdtContractToRead.methods.balanceOf(from).call();
  return Web3.utils.fromWei(balance, "picoether");
};
