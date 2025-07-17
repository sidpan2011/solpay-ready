import raw from "../../data/wallets.json";

// ---- Types ----
export type SolPayLevel = "yes" | "partial" | "no" | "untested";

export interface Wallet {
  wallet_name: string;
  slug: string;
  categories: string[];
  platforms: string[];
  custody_model: string;
  solana_pay_qr: SolPayLevel;
  solana_pay_score?: number;
  solana_pay_notes?: string;
  dex_swap?: string;
  nft_gallery?: string;
  staking?: string;
  fiat_on?: string;
  fiat_off?: string;
  push_notifications?: string;
  multi_chain?: boolean;
  tested_version?: string;
  tested_date?: string;
  tested_by?: string;
  verified?: boolean;
  evidence_paths?: string[];
}

interface WalletsJson {
  meta?: {
    counts?: Record<string, number>;
    total?: number;
    last_updated?: string;
  };
  wallets: any[]; // we’ll normalize below
}

// raw is typed as any; cast:
const data = raw as WalletsJson;

// convert pipe-delimited strings → arrays; coerce booleans
function normalize(rec: any): Wallet {
  const pipe = (v: any) =>
    typeof v === "string" && v.length
      ? v.split("|").map((s: string) => s.trim()).filter(Boolean)
      : [];

  const bool = (v: any) => {
    if (typeof v === "boolean") return v;
    if (typeof v === "string") return v.toLowerCase() === "true";
    return undefined;
  };

  const w: Wallet = {
    wallet_name: rec.wallet_name ?? "",
    slug: rec.slug ?? "",
    categories: Array.isArray(rec.categories) ? rec.categories : pipe(rec.categories),
    platforms: Array.isArray(rec.platforms) ? rec.platforms : pipe(rec.platforms),
    custody_model: rec.custody_model ?? "",
    solana_pay_qr: (rec.solana_pay_qr ?? "untested").toLowerCase(),
    solana_pay_score: numOrU(rec.solana_pay_score),
    solana_pay_notes: emptyOrU(rec.solana_pay_notes),
    dex_swap: emptyOrU(rec.dex_swap),
    nft_gallery: emptyOrU(rec.nft_gallery),
    staking: emptyOrU(rec.staking),
    fiat_on: emptyOrU(rec.fiat_on),
    fiat_off: emptyOrU(rec.fiat_off),
    push_notifications: emptyOrU(rec.push_notifications),
    multi_chain: bool(rec.multi_chain),
    tested_version: emptyOrU(rec.tested_version),
    tested_date: emptyOrU(rec.tested_date),
    tested_by: emptyOrU(rec.tested_by),
    verified: bool(rec.verified),
    evidence_paths: Array.isArray(rec.evidence_paths)
      ? rec.evidence_paths
      : pipe(rec.evidence_paths),
  } as Wallet;

  return w;
}

function numOrU(v: any) {
  if (v === null || v === undefined || v === "") return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}
function emptyOrU(v: any) {
  if (v === null || v === undefined) return undefined;
  const s = String(v).trim();
  return s.length ? s : undefined;
}

// normalized array
export const wallets: Wallet[] = (data.wallets ?? []).map(normalize);

// meta passthrough (fallbacks)
export const meta = {
  counts: data.meta?.counts ?? {},
  total: data.meta?.total ?? wallets.length,
  last_updated: data.meta?.last_updated ?? "",
};