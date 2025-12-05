import { BrowserProvider, formatEther } from "ethers";

export const getConnectedAccount = async (provider: BrowserProvider) => {
  if (window.ethereum) {
    const accounts = await provider.listAccounts();
    if (accounts[0]) {
      return accounts[0].address;
    }
  }
  return "";
};
export const getAccountBalance = async (provider: BrowserProvider, address: string) => {
  const balanceBigInt = await provider.getBalance(address);
  const balanceInEth = formatEther(balanceBigInt);

  return balanceInEth;
};
