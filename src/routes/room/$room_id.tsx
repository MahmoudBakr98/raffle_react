import { createFileRoute } from "@tanstack/react-router";

import Room from "@/components/pages/room";

export const Route = createFileRoute("/room/$room_id")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Room />;
}
