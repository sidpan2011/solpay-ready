import { cn } from "@/lib/utils";

export function CustodyBadge({ custody }: { custody: string | null }) {
    if (!custody) return null;
  const map: Record<string, { label: string; cls: string }> = {
    self: {
      label: "Self-custody",
      cls: "bg-emerald-500/15 text-emerald-400",
    },
    custodial: {
      label: "Custodial",
      cls: "bg-amber-500/15 text-amber-400",
    },
    mpc: {
      label: "MPC",
      cls: "bg-sky-500/15 text-sky-400",
    },
    hybrid: {
      label: "Hybrid",
      cls: "bg-purple-500/15 text-purple-400",
    },
    hardware: {
      label: "Hardware",
      cls: "bg-blue-500/15 text-blue-400",
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