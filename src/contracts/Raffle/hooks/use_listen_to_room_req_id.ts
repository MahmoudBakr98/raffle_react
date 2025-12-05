import { useEffect, useState } from "react";
import { toast } from "sonner";

import useRaffleContract from "./use_raffle_contract";

export default function useListenToRoomReqId(roomId: string) {
  const [reqId, setReqId] = useState("");
  const { getContract } = useRaffleContract();

  const listenToSelectWinnerStarted = async () => {
    const contract = await getContract();

    const eventFragment = contract.getEvent("RoomSelectWinnerStarted");
    contract.on(eventFragment, (roomOwner, reqId) => {
      if (roomId === roomOwner) {
        toast.dismiss();
        toast.loading("The Winner is Coming....");
        setReqId(reqId.toString());
      }
    });
  };
  const removeListeners = async () => {
    const contract = await getContract();
    contract.removeAllListeners();
  };

  useEffect(() => {
    listenToSelectWinnerStarted();

    return () => {
      removeListeners();
    };
  }, []);

  return reqId;
}
