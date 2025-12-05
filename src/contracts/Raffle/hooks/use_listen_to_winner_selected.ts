import { useEffect, useState } from "react";
import { toast } from "sonner";

import useRaffleContract from "./use_raffle_contract";

export default function useListenToWinnerSelected(roomId: string) {
  const [winner, setWinner] = useState("");
  const { getContract } = useRaffleContract();

  const setWinnerWhenFulfilled = async () => {
    const contract = await getContract();

    const eventFragment = contract.getEvent("RoomSelectWinnerFulfilled");
    contract.on(eventFragment, (roomOwner, winner) => {
      if (roomId === roomOwner) {
        toast.dismiss();
        toast.success("The Winner Is Here");
        setWinner(winner);
      }
    });
  };
  const removeListeners = async () => {
    const contract = await getContract();
    contract.removeAllListeners();
  };

  useEffect(() => {
    setWinnerWhenFulfilled();

    return () => {
      removeListeners();
    };
  }, []);

  return { winner };
}
