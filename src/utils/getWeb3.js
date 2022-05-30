import Web3 from "web3/dist/web3.min.js";
import { NETWORK_ID, PROVIDER, RPCHTTP } from "@/constants";

const provider = new Web3.providers.WebsocketProvider(PROVIDER);

export const web3ToRead = new Web3(provider);

export const web3ToWrite = new Web3(Web3.givenProvider);

provider.on("connect", () => console.log("Connected"));
provider.on("error", (e) => {
  console.log("WS error", e);
});
provider.on("end", () => {
  console.log("WS closed");
  console.log("Attempting to reconnect...");
});

const { ethereum } = window;

export const getAccountChangeEvent = async () => {
  ethereum.on("accountsChanged", function (accounts) {
    return accounts[0];
  });
};

export const getNetworkChangeEvent = async () => {
  ethereum.on("chainChanged", function (networkId) {
    return networkId;
  });
};

export const switchNetwork = async () => {
  let currentNetwork = await ethereum.request({ method: "eth_chainId" });
  if (currentNetwork !== Web3.utils.toHex(NETWORK_ID))
    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [
          {
            chainId: Web3.utils.toHex(NETWORK_ID),
          },
        ],
      });
    } catch (error) {
      if (error.code == 4902) {
        await ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: Web3.utils.toHex(NETWORK_ID),
              chainName: "Ganache",
              nativeCurrency: {
                name: "MATIC",
                symbol: "MATIC",
                decimals: 18,
              },
              rpcUrls: [RPCHTTP],
            },
          ],
        });
      }
    }
};

export const connectMetaMask = async () => {
  await ethereum.request({ method: "eth_requestAccounts" });
};

export const checkInstallMetaMask = () => {
  return ethereum && ethereum.isMetaMask;
};

export const getBalance = async (account) => {
  const balance = await web3ToRead.eth.getBalance(account);
  return Web3.utils.fromWei(balance, "ether");
};

export const getNetwork = async () => {
  const networkId = await ethereum.request({ method: "eth_chainId" });
  return parseInt(networkId, 16);
};
