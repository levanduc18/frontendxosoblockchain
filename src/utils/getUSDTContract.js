import { LOTTERY_CONTRACT_ADDRESS, USDT_CONTRACT_ADDRESS } from "@/constants";
import USDT from "@/contracts/ERC20Mock.json";
import { web3ToRead, web3ToWrite } from "./getWeb3";
import Web3 from "web3/dist/web3.min.js";

export const usdtContractToRead = new web3ToRead.eth.Contract(
  USDT.abi,
  USDT_CONTRACT_ADDRESS
);

export const usdtContractToWrite = new web3ToWrite.eth.Contract(
  USDT.abi,
  USDT_CONTRACT_ADDRESS
);
export const approve = async (numberTicket, from) => {
  await usdtContractToWrite.methods
    .approve(
      LOTTERY_CONTRACT_ADDRESS,
      Web3.utils.toWei(String(numberTicket), "ether")
    )
    .send({ from });
};

export const mint = async (from) => {
  await usdtContractToWrite.methods
    .mint(from, Web3.utils.toWei(String(2), "ether"))
    .send({
      from,
    });
};

export const getUSDTBalance = async (from) => {
  const balance = await usdtContractToRead.methods.balanceOf(from).call();
  return Web3.utils.fromWei(balance, "ether");
};
