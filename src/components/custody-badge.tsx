import { cn } from "@/lib/utils";

export function CustodyBadge({ custody }: { custody: string | null }) {
    if (!custody) return null;
  const map: Record<string, { label: string; cls: string }> = {
    self: {
      label: "Self-custody",
      cls: "bg-blue-500/15 text-blue-600",
    },
    custodial: {
      label: "Custodial",
      cls: "bg-amber-500/10 text-amber-600",
    },
    mpc: {
      label: "MPC",
      cls: "bg-sky-500/15 text-sky-600",
    },
    hybrid: {
      label: "Hybrid",
      cls: "bg-purple-500/15 text-purple-600",
    },
    hardware: {
      label: "Hardware",
      cls: "bg-neutral-500/15 dark:text-neutral-400 text-neutral-600",
    },
  };
  const item = map[custody] ?? { label: custody, cls: "bg-muted text-muted-foreground" };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium",
        item.cls
      )}
    >
      {item.label}
    </span>
  );
}