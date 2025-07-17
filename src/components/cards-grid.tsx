import { cn } from "@/lib/utils";
import { WalletCard } from "./wallet-card";
import { Wallet } from "@/lib/data";

interface CardsGridProps {
    wallets: Wallet[];
    onOpenDetails?: (w: Wallet) => void;
    className?: string;
}

export default function CardsGrid({ wallets, onOpenDetails, className }: CardsGridProps) {
    return (
        <div
            className={cn(
                "grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3",
                className
            )}
        >
            {wallets.map((w) => (
                <WalletCard key={w.slug} wallet={w} onOpenDetails={onOpenDetails} />
            ))}
        </div>
    );
}