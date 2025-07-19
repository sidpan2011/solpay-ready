// src/lib/export.ts
import type { Wallet } from "@/lib/data";

/**
 * Convert wallet objects to CSV string in canonical column order.
 * - Joins array fields with '|'
 * - Stringifies booleans
 * - Quotes fields that contain comma, quote, newline
 * - Escapes embedded quotes by doubling them (CSV RFC 4180 style)
 * - Optionally include a UTF-8 BOM for Excel friendliness
 */
export function walletsToCsv(
  wallets: Wallet[],
  opts: { bom?: boolean } = {}
): string {
  const header = [
    "wallet_name",
    "slug",
    "categories",
    "platforms",
    "custody_model",
    "solana_pay_qr",
    "solana_pay_score",
    "solana_pay_notes",
    "dex_swap",
    "nft_gallery",
    "staking",
    "fiat_on",
    "fiat_off",
    "push_notifications",
    "multi_chain",
    "tested_version",
    "tested_date",
    "tested_by",
    "verified",
    "evidence_paths",
    "url",
  ];

  const lines: string[] = [];
  lines.push(header.join(","));

  for (const w of wallets) {
    const row = [
      w.wallet_name ?? "",
      w.slug ?? "",
      (w.categories ?? []).join("|"),
      (w.platforms ?? []).join("|"),
      w.custody_model ?? "",
      w.solana_pay_qr ?? "",
      safeNum(w.solana_pay_score),
      w.solana_pay_notes ?? "",
      w.dex_swap ?? "",
      w.nft_gallery ?? "",
      w.staking ?? "",
      w.fiat_on ?? "",
      w.fiat_off ?? "",
      w.push_notifications ?? "",
      boolStr(w.multi_chain),
      w.tested_version ?? "",
      w.tested_date ?? "",
      w.tested_by ?? "",
      boolStr(w.verified),
      (w.evidence_paths ?? []).join("|"),
      w.url ?? "",
    ].map(csvEscape);

    lines.push(row.join(","));
  }

  const csv = lines.join("\n");
  // Excel BOM if requested
  return opts.bom ? "\uFEFF" + csv : csv;
}

function safeNum(n: number | undefined): string {
  return typeof n === "number" && !Number.isNaN(n) ? String(n) : "";
}

function boolStr(b: boolean | undefined): string {
  return typeof b === "boolean" ? String(b) : "";
}

/**
 * Surround field in quotes if it contains: comma, quote, newline
 * Double any embedded quotes.
 */
function csvEscape(v: string): string {
  if (v == null) return "";
  const s = String(v);
  if (/[",\n\r]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

/**
 * Trigger browser download of a file.
 */
export function downloadTextFile(
  contents: string,
  filename: string,
  mime: string = "text/plain"
) {
  const blob = new Blob([contents], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Convenience: export wallets as CSV and download.
 */
export function exportWalletsCsv(
  wallets: Wallet[],
  filename: string = "solpay-ready.csv",
  opts?: { bom?: boolean }
) {
  const csv = walletsToCsv(wallets, opts);
  downloadTextFile(csv, filename, "text/csv");
}

/**
 * Convenience: export wallets as JSON and download.
 * By default we wrap in {wallets: [...]} to mirror build artifact.
 */
export function exportWalletsJson(
  wallets: Wallet[],
  filename: string = "solpay-ready.json",
  wrap: boolean = true
) {
  const payload = wrap ? { wallets } : wallets;
  const json = JSON.stringify(payload, null, 2);
  downloadTextFile(json, filename, "application/json");
}