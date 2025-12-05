import { useParams } from "@tanstack/react-router";

import useRaffleContract from "@/contracts/Raffle/hooks/use_raffle_contract";

import type { Raffle } from "@/contracts/Raffle/types/RaffleAPIType";
import { useQuery } from "@tanstack/react-query";

export default function useRoomInfo() {
  const { room_id } = useParams({ from: "/room/$room_id" });

  const { getRoomInfo } = useRaffleContract();

  const {
    data: roomInfo,
    error,
    isLoading,
  } = useQuery<Raffle.LotRoomStructOutput>({
    queryFn: () => getRoomInfo(room_id),
    queryKey: ["room_info", room_id],
  });

  return {
    roomInfo,
    error,
    isLoading,
  };
}
