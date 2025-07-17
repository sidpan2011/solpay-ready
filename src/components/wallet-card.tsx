
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Wallet } from "@/lib/data";
import { StatusChip } from "./status-chip";
// import { FeatureIconsRow } from "./feature-icons-row";
import { formatShortDate } from "@/lib/formatting";
import { platformShort } from "@/lib/labels";
import { IconBell, IconCreditCard, IconPlus, IconQrcode, IconShare, IconStackFront, IconTransfer, IconUserCircle } from "@tabler/icons-react";
import { WalletIcon } from "./wallet-icon";
import { CustodyBadge } from "./custody-badge";
import { Dialog, DialogTitle, DialogHeader, DialogContent, DialogTrigger, DialogDescription, DialogFooter } from "./ui/dialog";
import { cn } from "@/lib/utils";
import { Check, Minus, X } from "lucide-react";

interface WalletCardProps {
    wallet: Wallet;
    onOpenDetails?: (wallet: Wallet) => void;
}

export function WalletCard({ wallet, onOpenDetails }: WalletCardProps) {
    const tested =
        wallet.tested_date
            ? `Tested on ${formatShortDate(wallet.tested_date)}${wallet.tested_version ? ` · v${wallet.tested_version}` : ""}`
            : "Not tested";

    return (
        <Card className="h-full">
            <CardHeader className="space-y-0">
                <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                        <WalletIcon wallet={wallet} />
                        <CardTitle className="truncate text-base font-semibold leading-tight">
                            {wallet.wallet_name}
                        </CardTitle>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2">
                            {/* <p className="text-xs text-muted-foreground">QR Compatibility</p> */}
                            <StatusChip status={wallet.solana_pay_qr} />
                        </div>
                        <CustodyBadge custody={wallet.custody_model} />
                    </div>
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
                <FeatureBadgesRow wallet={wallet} />
                {wallet.solana_pay_notes && (
                    <p className="mt-3 line-clamp-2 text-xs leading-snug text-muted-foreground">
                        {wallet.solana_pay_notes}
                    </p>
                )}

                <div className="mt-4 flex items-center justify-between text-xs">
                    <span className="truncate text-muted-foreground">{tested}</span>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                size="icon"
                                variant="ghost"
                                className="rounded-full border"
                                aria-label={`More details: ${wallet.wallet_name}`}
                            >
                                <IconPlus />
                            </Button>
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                    <WalletIcon wallet={wallet} />
                                    {wallet.wallet_name}
                                </DialogTitle>

                                <DialogDescription asChild>
                                    <div className="mt-2 flex flex-col gap-4">
                                        {/* Status + Custody */}
                                        <div className="flex items-center gap-2">
                                            <StatusChip status={wallet.solana_pay_qr} />
                                            <CustodyBadge custody={wallet.custody_model} />
                                        </div>

                                        {/* Platforms */}
                                        <div className="flex gap-2 items-center">
                                            <h3 className="text-sm font-medium text-primary">Platforms</h3>
                                            <div className="flex flex-wrap gap-1">
                                                {wallet.platforms.map((p) => (
                                                    <Badge
                                                        key={p}
                                                        variant="secondary"
                                                        className="px-1 py-0 text-[11px] font-normal"
                                                    >
                                                        {platformShort(p)}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Features */}
                                        <div className="flex flex-col items-start gap-2">
                                            <h3 className="text-sm font-medium text-primary">Features</h3>
                                            <ul className="flex flex-wrap gap-2 justify-between">
                                                {detailFeatures(wallet).map((f) => (
                                                    <li key={f.key} className="flex items-center gap-3">
                                                        {f.icon}
                                                        <span className="truncate">{f.label}</span>
                                                        <FeatureValueBadge value={f.value as boolean | string} />
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Solana Pay Notes */}
                                        {wallet.solana_pay_notes && (
                                            <div className="rounded-md bg-muted/50 px-2 py-2 text-xs leading-snug text-muted-foreground">
                                                {wallet.solana_pay_notes}
                                            </div>
                                        )}
                                    </div>
                                </DialogDescription>
                            </DialogHeader>

                            {/* Evidence gallery */}
                            {(() => {
                                const ev = getEvidencePaths(wallet.evidence_paths as any);
                                return ev.length ? (
                                    <div className="mt-4 space-y-2">
                                        <h4 className="text-sm font-medium">Evidence</h4>
                                        <EvidencePathsList paths={ev} />
                                    </div>
                                ) : null;
                            })()}

                            <DialogFooter className="mt-2 flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
                                <div className="text-xs text-muted-foreground">
                                    {wallet.tested_date ? (
                                        <p className="text-xs text-muted-foreground">
                                            Tested {formatShortDate(wallet.tested_date)}
                                            {wallet.tested_version && <> · v{wallet.tested_version}</>}
                                            {/* {wallet.tested_by && <> · {wallet.tested_by}</>} */}
                                            {wallet.verified && <> · ✅ Verified</>}
                                        </p>
                                    ) : (
                                        <p className="text-xs text-muted-foreground">Not yet tested</p>
                                    )}
                                </div>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    {/* <Button
            size="icon"
            variant="ghost"
            className="rounded-full border"
            onClick={() => onOpenDetails?.(wallet)}
          >
            <IconPlus />
          </Button> */}
                </div>
            </CardContent>
        </Card>
    );
}

function detailFeatures(wallet: Wallet) {
    return [
        { key: "solpay", label: "Solana Pay QR", value: wallet.solana_pay_qr, icon: <IconQrcode className="h-6 w-6" /> },
        { key: "dex", label: "DEX Swap", value: wallet.dex_swap, icon: <IconTransfer className="h-6 w-6" /> },
        { key: "nft", label: "NFT Gallery", value: wallet.nft_gallery, icon: <IconUserCircle className="h-6 w-6" /> },
        { key: "staking", label: "Staking", value: wallet.staking, icon: <IconStackFront className="h-6 w-6" /> },
        { key: "fiat_on", label: "Fiat On-Ramp", value: wallet.fiat_on, icon: <IconCreditCard className="h-6 w-6" /> },
        { key: "fiat_off", label: "Fiat Off-Ramp", value: wallet.fiat_off, icon: <IconCreditCard className="h-6 w-6" /> },
        { key: "push", label: "Push Notifications", value: wallet.push_notifications, icon: <IconBell className="h-6 w-6" /> },
        { key: "multi", label: "Multi-Chain", value: wallet.multi_chain ? "yes" : "no", icon: <IconShare className="h-6 w-6" /> },
    ];
}

function normalizeValue(v: boolean | string): "yes" | "partial" | "no" | "untested" {
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

function FeatureValueBadge({ value }: { value: boolean | string }) {
    const norm = normalizeValue(value);
    let cls = "", icon = null, txt = "";
    switch (norm) {
        case "yes":
            cls = "bg-emerald-500/15 text-emerald-500";
            icon = <Check className="h-4 w-4" />;
            txt = "Yes";
            break;
        case "partial":
            cls = "bg-amber-500/15 text-amber-500";
            icon = <Minus className="h-4 w-4" />;
            txt = "Partial";
            break;
        case "no":
            cls = "bg-rose-500/15 text-rose-500";
            icon = <X className="h-4 w-4" />;
            txt = "No";
            break;
        default:
            cls = "bg-muted text-muted-foreground";
            icon = <Minus className="h-4 w-4 opacity-50" />;
            txt = "—";
    }
    return (
        <span
            className={cn(
                "ml-1 inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-medium",
                cls
            )}
        >
            {icon}
            {txt}
        </span>
    );
}

function fiatValue(on?: string, off?: string): "yes" | "partial" | "no" | "untested" {
    const o = normalizeValue(on as boolean | string);
    const f = normalizeValue(off as boolean | string);
    if (o === "yes" && f === "yes") return "yes";
    if (o === "no" && f === "no") return "no";
    // any mix / partial -> partial
    if (o === "untested" && f === "untested") return "untested";
    return "partial";
}

/** Badge style by value */
function featureBadgeClass(v: "yes" | "partial" | "no" | "untested"): string {
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
    value: "yes" | "partial" | "no" | "untested";
}) {
    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium leading-none",
                featureBadgeClass(value)
            )}
            title={`${label}: ${value === "untested" ? "?" : value}`}
        >
            {label}
        </span>
    );
}

function FeatureBadgesRow({ wallet }: { wallet: Wallet }) {
    const dex = normalizeValue(wallet.dex_swap as boolean | string);
    const nft = normalizeValue(wallet.nft_gallery as boolean | string);
    const stk = normalizeValue(wallet.staking as boolean | string);
    const fiat = fiatValue(wallet.fiat_on, wallet.fiat_off);
    const push = normalizeValue(wallet.push_notifications as boolean | string);
    const multi = wallet.multi_chain ? "yes" : "no";

    return (
        <div className="flex flex-wrap items-center gap-1">
            <FeatureBadge label="DEX" value={dex} />
            <FeatureBadge label="NFT" value={nft} />
            <FeatureBadge label="Stake" value={stk} />
            <FeatureBadge label="Fiat" value={fiat} />
            <FeatureBadge label="Push" value={push} />
            <FeatureBadge label="Multi" value={multi} />
        </div>
    );
}


function EvidencePathsList({ paths }: { paths: string[] }) {
    if (!paths.length) return null;
    return (
        <ul className="mt-1 space-y-1 text-xs text-primary break-all">
            {paths.map((p) => (
                <li key={p}>
                    <a
                        href={p}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2 hover:no-underline"
                    >
                        {p}
                    </a>
                </li>
            ))}
        </ul>
    );
}

function getEvidencePaths(raw?: string[] | string): string[] {
    if (!raw) return [];
    if (Array.isArray(raw)) return raw.filter(Boolean);
    return raw
        .split("|")
        .map((s) => s.trim())
        .filter(Boolean);
}