import { Wallet } from "lucide-react";

import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import MetaMaskIcon from "./assets/meta_mask_icon.svg?react";
import ChainlinkIcon from "./assets/chainlink_icon.svg?react";

const cardsData = [
  {
    title: "Connect Your Wallet",
    content: "Use MetaMask, WalletConnect, or Coinbase Wallet",
    Icon: MetaMaskIcon,
  },
  {
    title: "Join or Create a Raffle Room",
    content: "Pick a room, enter the raffle, or create your own with entry price and max players",
    Icon: Wallet,
  },
  {
    title: "Winner Picked Randomly",
    content: "Uses Chainlink VRF to ensure fair winner selection.",
    Icon: ChainlinkIcon,
  },
];

export default function HomeCards() {
  return (
    <div className="flex justify-between gap-8 mt-8">
      {cardsData.map(({ title, content, Icon }) => (
        <Card key={title} className="flex-1">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardAction>
              <Icon width={50} height={50} />
            </CardAction>

            <CardDescription>{content}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
