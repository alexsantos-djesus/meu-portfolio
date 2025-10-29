// components/ui/badge.tsx
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "secondary" | "outline" | "destructive";

export type BadgeProps = {
  children: React.ReactNode;
  className?: string;
  variant?: BadgeVariant;
};

const base =
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold";

const styles: Record<BadgeVariant, string> = {
  default: "bg-primary text-primary-foreground border-transparent",
  secondary: "bg-white/10 text-zinc-200 border-white/20",
  outline: "bg-transparent text-foreground border-white/20",
  destructive: "bg-red-500/10 text-red-300 border-red-500/30",
};

export function Badge({
  children,
  className,
  variant = "default",
}: BadgeProps) {
  return (
    <span className={cn(base, styles[variant], className)}>{children}</span>
  );
}
