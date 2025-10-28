import * as React from "react";
import { cn } from "@/lib/utils";
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input ref={ref} className={cn("w-full rounded-xl bg-black/40 border border-white/15 px-3 py-2 focus:ring-2 focus:ring-neon-cyan", className)} {...props} />
));
Input.displayName = "Input";
