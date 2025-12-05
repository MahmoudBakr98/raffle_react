import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useState, type ChangeEvent } from "react";
import PlayerColor from "../components/playerColor";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import type { PlayerType } from "..";

const playerColors = [
  "#FF0000",
  "#FFFF00",
  "#0000FF",
  "#FFA500",
  "#00FF00",
  "#800080",
  "#FF4500",
  "#FFD700",
  "#ADFF2F",
  "#00CED1",
  "#8A2BE2",
  "#C71585",
];

export default function AddNewPlayer({ addPlayer }: { addPlayer: (p: PlayerType) => void }) {
  const [playerName, setPlayerName] = useState("");
  const [playerColor, setPlayerColor] = useState("");

  const savePlayerName = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setPlayerName(name);
  };
  const selectColor = (color: string) => () => {
    setPlayerColor(color);
  };

  const add = () => {
    if (!playerName) {
      return toast.error("Enter this player name");
    }
    if (!playerColor) {
      return toast.error("Select a color for this player");
    }
    addPlayer({
      name: playerName,
      color: playerColor,
    });
    setPlayerName("");
    setPlayerColor("");
  };

  return (
    <div>
      <div className="flex justify-between items-center gap-5 mt-4  p-4 border-4 border-palette2">
        <Input
          type="text"
          placeholder="Player Name"
          value={playerName}
          autoFocus
          onChange={savePlayerName}
        />

        <div style={{ fontSize: 0 }}>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <PlayerColor color={playerColor} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuGroup className="flex flex-wrap justify-center">
                {playerColors.map((color) => (
                  <DropdownMenuItem
                    key={color}
                    onSelect={selectColor(color)}
                    className="cursor-pointer"
                  >
                    <PlayerColor color={color} className="w-6 h-6" />
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="text-end mt-4">
        <Button className="" variant={"outline"} size={"icon"} onClick={add}>
          <Plus style={{ width: 24, height: 24 }} className="text-green-600 w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
