import { Button } from "@/components/ui/button";
import type { PlayerType } from "..";
import PlayerColor from "../components/playerColor";
import { X } from "lucide-react";

export default function Player({
  name,
  color,
  removePlayer,
}: {
  name: string;
  color: string;
  removePlayer: (p: PlayerType) => void;
}) {
  const remove = () => {
    removePlayer({ name, color });
  };
  return (
    <div className="flex items-center justify-between gap-4  mt-4 bg-palette2 p-2 rounded-md">
      <div className="w-16 ">{name}</div>
      <PlayerColor color={color} width={100} />
      <Button variant={"ghost"} size={"icon"} onClick={remove}>
        <X className="text-red-500" style={{ width: 22, height: 22 }} />
      </Button>
    </div>
  );
}
