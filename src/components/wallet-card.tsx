
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Wallet } from "@/lib/data";
import { StatusChip } from "./status-chip";
// import { FeatureIconsRow } from "./feature-icons-row";
import { formatShortDate } from "@/lib/formatting";
import { platformShort, custodyLabel } from "@/lib/labels";
import { IconPlus } from "@tabler/icons-react";
import { WalletIcon } from "./wallet-icon";
import { CustodyBadge } from "./custody-badge";

interface WalletCardProps {
  wallet: Wallet;
  onOpenDetails?: (wallet: Wallet) => void;
}

export function WalletCard({ wallet, onOpenDetails }: WalletCardProps) {
  const tested =
    wallet.tested_date
      ? `Tested ${formatShortDate(wallet.tested_date)}${wallet.tested_version ? ` · v${wallet.tested_version}` : ""}`
      : "Not tested";

  return (
    <Card className="h-full">
      <CardHeader className="space-y-0 pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <WalletIcon wallet={wallet} />
            <CardTitle className="truncate text-base font-semibold leading-tight">
              {wallet.wallet_name}
            </CardTitle>
          </div>
          <StatusChip status={wallet.solana_pay_qr} />
        </div>
        <CardDescription className="mt-2 flex flex-wrap items-center gap-1 text-xs">
          {wallet.platforms.map((p) => (
            <Badge
              key={p}
              variant="secondary"
              className="text-[12px] font-normal"
            >
              {platformShort(p)}
            </Badge>
          ))}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        {/* <div className="text-xs text-muted-foreground">
          {custodyLabel(wallet.custody_model)}
        </div> */}
        <CustodyBadge custody={wallet.custody_model} />
        {/* <FeatureIconsRow wallet={wallet} /> */}

        {wallet.solana_pay_notes && (
          <p className="mt-3 line-clamp-2 text-xs leading-snug text-muted-foreground">
            {wallet.solana_pay_notes}
          </p>
        )}

        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span className="truncate">{tested}</span>
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full border"
            onClick={() => onOpenDetails?.(wallet)}
          >
            <IconPlus />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}