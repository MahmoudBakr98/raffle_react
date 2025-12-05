import { useState } from "react";

import { TypographyP } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";

import Player from "./player";
import AddNewPlayer from "./add_new_player";
import useRaffleContract from "@/contracts/Raffle/hooks/use_raffle_contract";
import { useMutation } from "@tanstack/react-query";

export type PlayerType = {
  name: string;
  color: string;
};
export default function CreateRoomTab() {
  const [players, setPlayers] = useState<PlayerType[]>([]);
  const { createRoom, handleEthersError } = useRaffleContract();

  const createRoomMutation = useMutation({
    mutationFn: createRoom,
    onError: handleEthersError,
  });

  const addPlayer = (newPlayer: PlayerType) => {
    setPlayers((currentPlayers) => [...currentPlayers, newPlayer]);
  };
  const removePlayer = (removedPlayer: PlayerType) => {
    setPlayers((currentPlayers) =>
      currentPlayers.filter(
        ({ name, color }) => name !== removedPlayer.name && color !== removedPlayer.color
      )
    );
  };

  const create = () => {
    createRoomMutation.mutate(players);
  };

  const isButtonDisabled =
    players.length < 2 || players.length > 10 || createRoomMutation.isPending;

  return (
    <div>
      <TypographyP>Room Players ({players.length})</TypographyP>
      <div className="max-h-[200px] overflow-y-auto mb-[20px]">
        {players.map(({ name, color }) => (
          <Player key={name + color} {...{ name, color, removePlayer }} />
        ))}
      </div>
      <AddNewPlayer {...{ addPlayer }} />

      <TypographyP className="text-palette3 my-8">
        Your Room Has to have at least 2 players and maximum 10 players
      </TypographyP>
      <div className="text-end">
        <Button
          className="text-white bg-palette2 hover:bg-green-700"
          onClick={create}
          disabled={isButtonDisabled}
        >
          Create Room
        </Button>
      </div>
    </div>
  );
}
