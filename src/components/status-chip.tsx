import { SolPayLevel } from "@/lib/types";
import { cn } from "@/lib/utils";

const styles: Record<SolPayLevel, string> = {
  yes: "bg-emerald-500 text-emerald-50",
  partial: "bg-amber-500 text-amber-950 dark:text-amber-50",
  no: "bg-rose-500 text-rose-50",
  untested: "dark:bg-neutral-800 bg-neutral-200 text-black dark:text-slate-50",
};

export function StatusChip({ status }: { status: SolPayLevel }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium tracking-wide",
        styles[status]
      )}
    >
      {status}
    </span>
  );
}