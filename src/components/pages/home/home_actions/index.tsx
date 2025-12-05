import JoinRoomAction from "./join_room_action";
import CreateRoomAction from "./create_room_action";

export default function HomeActions() {
  return (
    <div className="h-full flex flex-col  items-center justify-center gap-12">
      <JoinRoomAction />
      <CreateRoomAction />
    </div>
  );
}
