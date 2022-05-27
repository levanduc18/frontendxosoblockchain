import { TICKET_CONTRACT_ADDRESS } from "@/constants";
import TICKET from "@/contracts/TicketNFT.json";
import { web3ToRead } from "./getWeb3";
import store from "@/store/index";

export const ticketContractToRead = new web3ToRead.eth.Contract(
  TICKET.abi,
  TICKET_CONTRACT_ADDRESS
);
console.log(ticketContractToRead);
export const getUserTickets = async (lotteryID, from) => {
  const tickets = await ticketContractToRead.methods
    .getUserTickets(lotteryID, from)
    .call();
  store.dispatch("getTicketsByUser", tickets);
};

export const getUserTicketsAllRound = async (from) => {
  const tickets = await ticketContractToRead.methods
    .getUserTicketsAllRound(from)
    .call();
  return tickets;
};
