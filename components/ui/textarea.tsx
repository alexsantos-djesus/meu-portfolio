import * as React from "react";
import { cn } from "@/lib/utils";
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => (
  <textarea ref={ref} className={cn("w-full rounded-xl bg-black/40 border border-white/15 px-3 py-2 min-h-[120px] focus:ring-2 focus:ring-neon-cyan", className)} {...props} />
));
Textarea.displayName = "Textarea";
