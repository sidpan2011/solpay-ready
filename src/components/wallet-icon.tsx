import { Wallet } from "@/lib/data";
import Image from "next/image";

interface WalletIconProps {
    wallet: Wallet;
}

export function WalletIcon({ wallet }: WalletIconProps) {
    return (
        <Image
            src={`/logos/${wallet.slug}.png`}
            alt={wallet.wallet_name}
            width={44}
            height={44}
            className="shrink-0 rounded bg-muted"
        />
    );
}