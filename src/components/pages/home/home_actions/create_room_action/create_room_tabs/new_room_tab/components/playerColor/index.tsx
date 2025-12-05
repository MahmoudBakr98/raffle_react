import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export default function PlayerColor({
  color,
  width,
  className,
}: {
  color?: string;
  width?: number;
  className?: string;
}) {
  if (!color) {
    return (
      <div
        className={cn(
          "p-[0px] w-5 h-5 bg-white rounded-[2px] flex justify-center items-center",
          className
        )}
      >
        <X color="red" size={20} />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "p-[3px] w-5 h-5 bg-white rounded-[2px] flex justify-center items-center",
        className
      )}
      style={{ width }}
    >
      <div className={"h-full w-full"} style={{ backgroundColor: color }}></div>
    </div>
  );
}
