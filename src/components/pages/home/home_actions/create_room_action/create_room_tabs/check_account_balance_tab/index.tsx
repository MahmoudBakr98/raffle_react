import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { RefreshCw } from "lucide-react";

import { useWalletInfoContext } from "@/contexts/wallet_info_context";

import { Button } from "@/components/ui/button";
import { TypographyH4, TypographyP } from "@/components/ui/typography";

import { getAccountBalance } from "@/lib/ethers";
import type { TabsType } from "../types";

export default function CheckAccountBalanceTab({
  setActiveTab,
}: {
  setActiveTab: Dispatch<SetStateAction<TabsType>>;
}) {
  const { provider, connectedAccount } = useWalletInfoContext();
  const [accountBalance, setAccountBalance] = useState<string>("");

  const checkBalance = () => {
    if (provider) {
      getAccountBalance(provider, connectedAccount).then((balance) => {
        setAccountBalance(balance);
      });
    }
  };

  const toCreateRoomTab = () => {
    setActiveTab("CreateRoom");
  };
  useEffect(() => {
    checkBalance();
  }, [connectedAccount, provider]);

  return (
    <div className="flex flex-col h-full">
      <div>
        <TypographyH4 className="text-palette2 ">Your Address</TypographyH4>
        <TypographyP className="text-palette3 text-center mt-3">{connectedAccount}</TypographyP>
      </div>
      <div>
        <div className="flex justify-between items-center mt-10">
          <TypographyH4 className="text-palette2">Your Balance:</TypographyH4>
          <Button variant={"outline"} size={"sm"} className="text-palette43" onClick={checkBalance}>
            <RefreshCw />
            ReCheck
          </Button>
        </div>
        <TypographyP className="text-3xl text-center text-palette3 mt-3">
          {accountBalance}
        </TypographyP>
      </div>
      <div className="mt-auto text-center">
        <TypographyP className="text-palette4">
          Please use the link below to get some balance to create a room
        </TypographyP>
        <a
          target="_blank"
          href="https://cloud.google.com/application/web3/faucet/ethereum/sepolia"
          className="underline text-blue-700 text-center"
        >
          Get Free Balance
        </a>
      </div>

      <Button
        className="block  ms-auto mt-4 "
        size={"default"}
        variant={"secondary"}
        disabled={+accountBalance <= 0}
        onClick={toCreateRoomTab}
      >
        Next
      </Button>
    </div>
  );
}
