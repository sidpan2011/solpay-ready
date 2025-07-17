[![MIT License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-blue)](#contributing)
[![Vercel Deploy](https://img.shields.io/badge/deploy-vercel-black?logo=vercel)](https://solpay-ready.vercel.app/)

# SolPay Ready
**Which wallets actually work at Solana checkout?**  
Open, filterable index of Solana wallets with **Solana Pay QR** compatibility and key commerce features.

![SolPay Ready screenshot](public/social/og.png)

## 💡 Why
Wallet fragmentation = checkout failures. SolPay Ready gives builders & merchants a single source of truth: which wallets parse Solana Pay URIs, which only do addresses, and which support real-world features (swap, staking, fiat ramps, push, etc.).


## 🧭 What’s Inside
- **Gallery Cards** – quick status (Yes / Partial / No / Untested)
- **Compare Table** – feature matrix across all wallets
- **Filters & Search** – platform, custody, features, verified
- **CSV / JSON Export** – reuse the data anywhere
- **Detail Modal** – full notes + test evidence

## 📊 Data Source
Canonical data lives in **`data/wallets.csv`**.  
App builds a normalized **`wallets.json`** + downloadable exports.

**Status Legend**
| Value | Meaning |
|---|---|
| **Yes** | Parses Solana Pay QR & sends reliably. |
| **Partial** | Works w/ caveats (SOL only, ignores token params, extra steps). |
| **No** | No Solana Pay QR flow (address send only / fails). |
| **Untested** | Not yet confirmed.

## 🔧 Quick Dev (npm)
```bash
npm install            # install deps
npm run build:data     # validate CSV, generate JSON, copy exports
npm run dev            # start local dev (http://localhost:3000)

# production build
npm run build          # runs build:data + next build (check package.json)
npm start              # start production server
```

**CSV schema:**
```bash
wallet_name,slug,categories,platforms,custody_model,solana_pay_qr,solana_pay_score,solana_pay_notes,dex_swap,nft_gallery,staking,fiat_on,fiat_off,push_notifications,multi_chain,tested_version,tested_date,tested_by,verified,evidence_paths
```

## Update the Data
- Edit data/wallets.csv.
- Run npm run build:data.
- Commit & open PR.

**Contributions welcome—PRs open!**









