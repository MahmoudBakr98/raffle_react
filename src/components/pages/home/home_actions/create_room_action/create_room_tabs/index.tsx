import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConnectTab from "./connext_tab";
import { useEffect, useState } from "react";
import type { TabsType } from "./types";
import CheckAccountBalanceTab from "./check_account_balance_tab";
import { useWalletInfoContext } from "@/contexts/wallet_info_context";
import CreateRoomTab from "./new_room_tab";

export default function CreateRoomTabs() {
  const [activeTab, setActiveTab] = useState<TabsType>("connect");
  const { connectedAccount, provider } = useWalletInfoContext();

  useEffect(() => {
    if (connectedAccount) {
      provider?.getNetwork().then(({ chainId }) => {
        if (chainId === 11155111n) {
          setActiveTab("checkBalance");
        }
      });
    }
  }, [connectedAccount]);

  return (
    <Tabs value={activeTab} className="min-h-[400px] min-w-[400px]">
      <TabsList className="mb-4">
        <TabsTrigger value="connect">Connect Your Wallet</TabsTrigger>
        <TabsTrigger value="checkBalance">check Your balance</TabsTrigger>
        <TabsTrigger value="CreateRoom">Create New Room</TabsTrigger>
      </TabsList>
      <TabsContent value="connect" className="h-[400px]">
        <ConnectTab {...{ setActiveTab }} />
      </TabsContent>
      <TabsContent value="checkBalance">
        <CheckAccountBalanceTab {...{ setActiveTab }} />
      </TabsContent>
      <TabsContent value="CreateRoom">
        <CreateRoomTab />
      </TabsContent>
    </Tabs>
  );
}
