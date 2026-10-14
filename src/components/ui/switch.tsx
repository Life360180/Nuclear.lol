import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

export function Switch({
  checked,
  onCheckedChange,
  disabled,
  label,
}: {
  checked: boolean;
  onCheckedChange: (next: boolean) => void;
  disabled?: boolean;
  label?: string;
}) {
  return (
    <label className="flex min-h-11 items-center justify-between gap-3">
      {label ? <span className="text-sm text-fg">{label}</span> : null}
      <SwitchPrimitive.Root
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full border border-border bg-elevated transition-colors duration-150",
          "data-[state=checked]:bg-accent data-[state=checked]:border-accent",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70",
          "disabled:opacity-40",
        )}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            "block size-5 translate-x-0.5 rounded-full bg-fg transition-transform duration-150",
            "data-[state=checked]:translate-x-5 data-[state=checked]:bg-accent-fg",
          )}
        />
      </SwitchPrimitive.Root>
    </label>
  );
}
