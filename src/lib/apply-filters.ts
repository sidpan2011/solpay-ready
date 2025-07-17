import type { Wallet } from "./data";
import type { FiltersState } from "./filters";

export function applyFilters(
  wallets: Wallet[],
  filters: FiltersState,
  search: string
): Wallet[] {
  const q = search.trim().toLowerCase();

  return wallets.filter((w) => {
    // --- search ---
    if (q) {
      const haystack =
        w.wallet_name.toLowerCase() +
        "|" +
        w.slug.toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    // --- status ---
    if (filters.status !== "all") {
      if (filters.status !== w.solana_pay_qr) return false;
    }

    // --- platform ---
    if (filters.platforms.size) {
      // include wallet if it has ANY selected platform
      const has = w.platforms.some((p) => filters.platforms.has(p));
      if (!has) return false;
    }

    // --- custody ---
    if (filters.custody.size) {
      if (!filters.custody.has(w.custody_model)) return false;
    }

    // --- features (all selected must be YES-ish) ---
    if (filters.features.size) {
      for (const f of filters.features) {
        if (!featureMatch(w, f)) return false;
      }
    }

    // --- verified only ---
    if (filters.custody.size && !w.verified) return false;

    return true;
  });
}

function featureMatch(w: Wallet, key: string): boolean {
  switch (key) {
    case "dex": return hasYes(w.dex_swap);
    case "nft": return hasYes(w.nft_gallery);
    case "stake": return hasYes(w.staking);
    case "fiat": return hasYes(w.fiat_on) || hasYes(w.fiat_off);
    case "push": return hasYes(w.push_notifications);
    case "multi": return !!w.multi_chain;
    case "solpay": return w.solana_pay_qr === "yes" || w.solana_pay_qr === "partial";
    default: return false;
  }
}

function hasYes(v?: string) {
  if (!v) return false;
  const low = v.toLowerCase();
  return low === "yes" || low.startsWith("yes:");
}