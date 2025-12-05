import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export function Spinner({ size, className }: { size?: number; className?: string }) {
  return <Loader2 size={size} className={cn(" animate-spin text-muted-foreground", className)} />;
}
