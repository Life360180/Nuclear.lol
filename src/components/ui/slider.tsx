import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

export function Slider({
  value,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  label,
}: {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange: (value: number) => void;
  label?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      {label ? (
        <div className="flex items-center justify-between text-xs font-medium text-muted">
          <span>{label}</span>
          <span className="tabular-nums text-fg">{value}</span>
        </div>
      ) : null}
      <SliderPrimitive.Root
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(v) => onValueChange(v[0] ?? value)}
        className="relative flex h-11 w-full touch-none items-center"
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow rounded-full bg-elevated">
          <SliderPrimitive.Range className="absolute h-full rounded-full bg-accent" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className={cn(
            "block size-4 rounded-full bg-fg shadow-sm",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70",
          )}
        />
      </SliderPrimitive.Root>
    </div>
  );
}
