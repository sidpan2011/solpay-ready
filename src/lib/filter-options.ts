export const STATUS_OPTIONS = [
    { value: "all", label: "All" },
    { value: "yes", label: "Yes" },
    { value: "partial", label: "Partial" },
    { value: "no", label: "No" },
    { value: "untested", label: "Untested" },
  ];
  
  export const PLATFORM_OPTIONS = [
    { value: "ios", label: "iOS" },
    { value: "android", label: "Android" },
    { value: "chrome", label: "Chrome" },
    { value: "firefox", label: "Firefox" },
    { value: "desktop", label: "Desktop" },   // rollup (mac/win/linux)
    { value: "hardware", label: "Hardware" },
  ];
  
  export const CUSTODY_OPTIONS = [
    { value: "self", label: "Self-custody" },
    { value: "custodial", label: "Custodial" },
    { value: "mpc", label: "MPC" },
    { value: "hybrid", label: "Hybrid" },
    { value: "hardware", label: "Hardware Device" },
  ];
  
  export const FEATURE_OPTIONS = [
    { value: "dex", label: "DEX Swap" },
    { value: "nft", label: "NFT Gallery" },
    { value: "staking", label: "Staking" },
    { value: "fiatOn", label: "Fiat On-Ramp" },
    { value: "fiatOff", label: "Fiat Off-Ramp" },
    { value: "push", label: "Push Notifications" },
    { value: "multiChain", label: "Multi-Chain" },
  ];