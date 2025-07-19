import { parse } from "csv-parse/sync";
import fs from "fs";
import path from "path";

const csvPath = path.join(process.cwd(), "data", "wallets.csv");
const jsonPath = path.join(process.cwd(), "data", "wallets.json");

const csvRaw = fs.readFileSync(csvPath, "utf8");
const records = parse(csvRaw, { columns: true, skip_empty_lines: true });

function splitPipes(v: string) {
  if (!v) return [];
  return v.split("|").map((s) => s.trim()).filter(Boolean);
}
function parseBool(v: string) {
  if (!v) return undefined;
  return v.toLowerCase() === "true";
}

const wallets = records.map((r: any) => ({
  wallet_name: r.wallet_name.trim(),
  slug: r.slug.trim(),
  categories: splitPipes(r.categories),
  platforms: splitPipes(r.platforms),
  custody_model: r.custody_model.trim(),
  solana_pay_qr: (r.solana_pay_qr || "untested").toLowerCase(),
  solana_pay_score: r.solana_pay_score ? Number(r.solana_pay_score) : undefined,
  solana_pay_notes: r.solana_pay_notes?.trim() || undefined,
  dex_swap: r.dex_swap?.trim() || undefined,
  nft_gallery: r.nft_gallery?.trim() || undefined,
  staking: r.staking?.trim() || undefined,
  fiat_on: r.fiat_on?.trim() || undefined,
  fiat_off: r.fiat_off?.trim() || undefined,
  push_notifications: r.push_notifications?.trim() || undefined,
  multi_chain: parseBool(r.multi_chain),
  tested_version: r.tested_version?.trim() || undefined,
  tested_date: r.tested_date?.trim() || undefined,
  tested_by: r.tested_by?.trim() || undefined,
  verified: parseBool(r.verified) ?? false,
  evidence_paths: splitPipes(r.evidence_paths),
  url: r.url?.trim() || undefined,
}));

const meta = {
  counts: wallets.reduce(
    (acc: any, w: any) => ((acc[w.solana_pay_qr] = (acc[w.solana_pay_qr] || 0) + 1), acc),
    {}
  ),
  total: wallets.length,
  last_updated: new Date().toISOString(),
};

fs.writeFileSync(jsonPath, JSON.stringify({ meta, wallets }, null, 2));
console.log(`Wrote ${wallets.length} wallets to ${jsonPath}`);