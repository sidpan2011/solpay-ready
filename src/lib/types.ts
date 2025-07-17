
export type SolPayLevel = "yes" | "partial" | "no" | "untested";

export interface Wallet {
  wallet_name: string;
  slug: string;
  platforms: string[];
  custody_model: string;
  solana_pay_qr: SolPayLevel;
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
}