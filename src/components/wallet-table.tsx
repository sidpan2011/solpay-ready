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
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { WalletIcon } from "./wallet-icon";
import { cn } from "@/lib/utils";
import Link from "next/link";

type FeatureValue = "yes" | "partial" | "no" | "untested";

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
                        <TableHead className="w-[100px]">QR Status</TableHead>
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
                    <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium">{wallet.wallet_name}</p>
                        {wallet.url && (
                            <Link href={wallet.url} target="_blank" rel="noopener noreferrer" className="text-xs flex items-center font-normal text-muted-foreground hover:underline">
                                Visit Website <ArrowUpRight size={16} />
                            </Link>
                        )}
                    </div>
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
                <FeatureBadgesRow wallet={wallet} />
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
                    "✅"
                ) : (
                    <span className="text-muted-foreground text-xs">—</span>
                )}
            </TableCell>
        </TableRow>
    );
}


function norm(v?: string | boolean): FeatureValue {
    if (v === true) return "yes";
    if (v === false) return "no";
    if (!v) return "untested";
    const s = String(v).toLowerCase();
    if (s.startsWith("yes")) return "yes";
    if (s.startsWith("partial")) return "partial";
    if (s.startsWith("no")) return "no";
    if (s === "untested") return "untested";
    return "untested";
}

/** Combine fiat_on + fiat_off into one badge. */
function fiatValue(on?: string, off?: string): FeatureValue {
    const o = norm(on);
    const f = norm(off);
    if (o === "yes" && f === "yes") return "yes";
    if (o === "no" && f === "no") return "no";
    // any mix / partial -> partial
    if (o === "untested" && f === "untested") return "untested";
    return "partial";
}

/** Badge style by value */
function featureBadgeClass(v: FeatureValue): string {
    switch (v) {
        case "yes":
            return "bg-emerald-500/15 text-emerald-500";
        case "partial":
            return "bg-amber-500/15 text-amber-500";
        case "no":
            return "bg-rose-500/15 text-rose-500";
        default:
            return "bg-muted text-muted-foreground";
    }
}

/** Render one tiny feature badge. */
function FeatureBadge({
    label,
    value,
}: {
    label: string;
    value: FeatureValue;
}) {
    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium leading-none",
                featureBadgeClass(value)
            )}
            title={`${label}: ${value === "untested" ? "?" : value}`}
        >
            {label}
        </span>
    );
}

function FeatureBadgesRow({ wallet }: { wallet: Wallet }) {
    const dex = norm(wallet.dex_swap);
    const nft = norm(wallet.nft_gallery);
    const stk = norm(wallet.staking);
    const fiat = fiatValue(wallet.fiat_on, wallet.fiat_off);
    const push = norm(wallet.push_notifications);
    const multi = wallet.multi_chain ? "yes" : "no";

    return (
        <div className="flex flex-wrap items-center gap-1">
            <FeatureBadge label="DEX" value={dex} />
            <FeatureBadge label="NFT" value={nft} />
            <FeatureBadge label="Stake" value={stk} />
            <FeatureBadge label="Fiat" value={fiat} />
            <FeatureBadge label="Push" value={push} />
            <FeatureBadge label="Multi" value={norm(multi)} />
        </div>
    );
}