// src/components/wallet-table.tsx
"use client";

import React from "react";
import { Wallet } from "@/lib/data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { StatusChip } from "./status-chip";
import { CustodyBadge } from "./custody-badge";
// import { FeatureIconsRow } from "./feature-icons-row";
import { formatShortDate } from "@/lib/formatting";
import { platformShort } from "@/lib/labels";
import { ShieldCheck } from "lucide-react";
import { WalletIcon } from "./wallet-icon";
import { cn } from "@/lib/utils";

interface WalletTableProps {
  wallets: Wallet[];
  onOpenDetails?: (w: Wallet) => void;
  className?: string;
}

export default function WalletTable({
  wallets,
  onOpenDetails,
  className,
}: WalletTableProps) {
  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <Table className="min-w-[800px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[220px]">Wallet</TableHead>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead>Platforms</TableHead>
            <TableHead className="w-[120px]">Custody</TableHead>
            <TableHead className="w-[160px]">Features</TableHead>
            <TableHead className="w-[110px]">Tested</TableHead>
            <TableHead className="w-[80px]">Version</TableHead>
            <TableHead className="w-[80px] text-center">Verified</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {wallets.map((w) => (
            <WalletRow
              key={w.slug}
              wallet={w}
              onOpenDetails={onOpenDetails}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

interface WalletRowProps {
  wallet: Wallet;
  onOpenDetails?: (w: Wallet) => void;
}

function WalletRow({ wallet, onOpenDetails }: WalletRowProps) {
  const testedDate = wallet.tested_date
    ? formatShortDate(wallet.tested_date)
    : "—";
  const version = wallet.tested_version ? `v${wallet.tested_version}` : "—";

  return (
    <TableRow className="align-top">
      {/* Wallet */}
      <TableCell className="py-3">
        <div className="flex items-center gap-2">
          <WalletIcon wallet={wallet} />
            <p className="text-sm font-medium">{wallet.wallet_name}</p>
        </div>
      </TableCell>

      {/* Status */}
      <TableCell className="py-3">
        <StatusChip status={wallet.solana_pay_qr} />
      </TableCell>

      {/* Platforms */}
      <TableCell className="py-3">
        <div className="flex flex-wrap items-center gap-1 text-xs">
          {wallet.platforms.map((p) => (
            <Badge
              key={p}
              variant="secondary"
              className="px-1 py-0 text-[10px] font-normal"
            >
              {platformShort(p)}
            </Badge>
          ))}
        </div>
      </TableCell>

      {/* Custody */}
      <TableCell className="py-3">
        <CustodyBadge custody={wallet.custody_model} />
      </TableCell>

      {/* Features */}
      <TableCell className="py-3">
        {/* <FeatureIconsRow wallet={wallet} /> */}
      </TableCell>

      {/* Tested */}
      <TableCell className="py-3 text-xs text-muted-foreground whitespace-nowrap">
        {testedDate}
      </TableCell>

      {/* Version */}
      <TableCell className="py-3 text-xs text-muted-foreground">
        {version}
      </TableCell>

      {/* Verified */}
      <TableCell className="py-3 text-center">
        {wallet.verified ? (
          <ShieldCheck
            className="mx-auto h-4 w-4 text-emerald-500"
            aria-label="Verified"
          />
        ) : (
          <span className="text-muted-foreground text-xs">—</span>
        )}
      </TableCell>
    </TableRow>
  );
}
