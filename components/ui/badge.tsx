import { cn } from "@/lib/utils";
export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("px-2 py-1 rounded-xl text-xs bg-white/10 border border-white/20", className)}>{children}</span>;
}
