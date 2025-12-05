import { useState, type ChangeEvent } from "react";
import { useNavigate } from "@tanstack/react-router";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function JoinRoomAction() {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const join = () => {
    navigate({
      to: "/room/$room_id",
      params: { room_id: inputValue },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-[400px] cursor-pointer">Join a Room</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join a Room</DialogTitle>
          <DialogDescription>Please Paste below the room ID you want to join</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="room-id">Room ID</Label>
            <Input id="room-id" name="room_id" onChange={onChangeInputHandler} />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={join}>
            Join
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
