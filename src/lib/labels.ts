export function platformShort(p: string): string {
    switch (p) {
      case "ios": return "iOS";
      case "android": return "Android";
      case "chrome": return "Ext";
      case "firefox": return "Fx";
      case "windows": return "Win";
      case "mac": return "Mac";
      case "linux": return "Linux";
      case "hardware": return "HW";
      default: return p;
    }
  }
  
  export function custodyLabel(c: string): string {
    switch (c) {
      case "self": return "Self-custody";
      case "custodial": return "Custodial";
      case "mpc": return "MPC";
      case "hybrid": return "Hybrid";
      case "hardware": return "Hardware Device";
      default: return c;
    }
  }