import { ethers } from "ethers";

import { TypographyP } from "@/components/ui/typography";

import MetaMaskIcon from "@/assets/meta_mask_icon.svg?react";
import type React from "react";
import type { TabsType } from "../types";
import { useWalletInfoContext } from "@/contexts/wallet_info_context";

export default function ConnectTab({ setActiveTab }: { setActiveTab: React.Dispatch<TabsType> }) {
  const { setConnectedAccount } = useWalletInfoContext();

  async function handleConnect() {
    if (!window.ethereum) return alert("Install MetaMask!");

    const provider = new ethers.BrowserProvider(window.ethereum);

    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const userAddress = await signer.getAddress();
    const { chainId } = await provider.getNetwork();

    if (chainId === 11155111n) {
      setActiveTab("checkBalance");
      setConnectedAccount(userAddress);
    } else {
      alert("Please switch to the Sepolia network in MetaMask.");
    }
  }

  return (
    <div className="h-[400px] flex flex-col ">
      <div className="">
        <TypographyP>Connect your wallet through MetaMask</TypographyP>
        <div
          onClick={handleConnect}
          className="w-[100px] h-[100px] m-auto border-2 border-gray-400 p-4 rounded-md mt-4 cursor-pointer hover:bg-gray-400"
        >
          <MetaMaskIcon />
        </div>
      </div>
    </div>
  );
}
