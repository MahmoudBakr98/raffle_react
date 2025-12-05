import { toast } from "sonner";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { CopyIcon } from "lucide-react";

import { useWalletInfoContext } from "@/contexts/wallet_info_context";

import useRoomInfo from "./hooks/use-room-info";

import { Spinner } from "@/components/ui/spinner";
import Wheel from "@/components/wheel";
import { Button } from "@/components/ui/button";
import { TypographyH1, TypographyP } from "@/components/ui/typography";

import useRaffleContract from "@/contracts/Raffle/hooks/use_raffle_contract";
import useListenToRoomReqId from "@/contracts/Raffle/hooks/use_listen_to_room_req_id";
import useListenToWinnerSelected from "@/contracts/Raffle/hooks/use_listen_to_winner_selected";

import { copyTextToClipboard } from "@/lib/utils";

export default function Room() {
  const navigate = useNavigate();
  const { connectedAccount } = useWalletInfoContext();
  const { room_id } = useParams({ from: "/room/$room_id" });

  const { roomInfo, isLoading, error } = useRoomInfo();

  const { winner } = useListenToWinnerSelected(room_id);
  useListenToRoomReqId(room_id);

  const roomCreatedDate = BigInt(roomInfo?.[1] || 0).toString();
  const roomWinner = roomInfo?.[3] || winner;

  const { deleteMyRoom, selectWinner, handleEthersError } = useRaffleContract();

  const selectWinnerMutation = useMutation({
    mutationFn: selectWinner,
    onError: handleEthersError,
  });

  const deleteRoomMutation = useMutation({
    mutationFn: deleteMyRoom,
    onError: handleEthersError,
  });

  const isRoomOwner = connectedAccount === room_id;

  const getWinnerIndex = () => {
    return roomInfo?.players?.findIndex(({ name }) => name === roomWinner);
  };

  const copyRoomId = async () => {
    await copyTextToClipboard(room_id);
    toast.success("Room Id is copied to your clipboard");
  };

  if (isLoading) {
    return (
      <div className="h-dvh flex justify-center items-center">
        <Spinner size={84} className="text-palette2" />
      </div>
    );
  }

  if (roomCreatedDate === "0" || error) {
    navigate({ to: "/" });
    return null;
  }

  if (roomInfo) {
    const winnerIndex = getWinnerIndex();
    return (
      <div className="min-h-dvh flex flex-col justify-center items-center gap-12 ">
        <div className="flex  justify-between w-full px-7">
          <TypographyP
            className="flex gap-2 text-xs text-palette3 rounded-2xl border-2 p-3 cursor-pointer"
            onClick={copyRoomId}
          >
            {connectedAccount}
            <CopyIcon size={16} />
          </TypographyP>
          {isRoomOwner && (
            <Button
              className="block ml-auto mr-8 bg-amber-300"
              variant={"destructive"}
              disabled={deleteRoomMutation.isPending}
              onClick={() => {
                deleteRoomMutation.mutate();
              }}
            >
              Delete The Room
            </Button>
          )}
        </div>
        <Wheel players={roomInfo[0]} winner={winnerIndex} />

        {isRoomOwner && !roomWinner && (
          <Button
            className="block"
            disabled={selectWinnerMutation.isPending || (selectWinnerMutation.data && !roomWinner)}
            onClick={() => {
              selectWinnerMutation.mutate();
            }}
          >
            Pick A Winner
          </Button>
        )}
        {roomWinner && (
          <div className="pt-8 text-center">
            <TypographyH1>Congratulations {roomWinner}</TypographyH1>
          </div>
        )}
      </div>
    );
  }
}
