import { Button } from "@/components/ui/button";
import CreateRoomTabs from "./create_room_tabs";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function CreateRoomAction() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-[400px] cursor-pointer">Create a new Room</Button>
      </DialogTrigger>
      <DialogContent className="max-w-fit! px-16">
        <DialogTitle />
        <CreateRoomTabs />
      </DialogContent>
    </Dialog>
  );
}
