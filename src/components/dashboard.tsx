"use client";
import { Input } from "./ui/input";
import { FiltersBar } from "./filters-bar";
import { useState } from "react";
import { FiltersState } from "@/lib/filters";
import { createDefaultFilters } from "@/lib/filters";
import CardsGrid from "./cards-grid";
import { Button } from "./ui/button";
import { IconDownload } from "@tabler/icons-react";
import { wallets } from "@/lib/data";
import WalletTable from "./wallet-table";
import { ViewTabs } from "./view-tabs";
import { exportWalletsCsv } from "@/lib/export";
import { applyFilters } from "@/lib/apply-filters";
import { NoResults } from "./no-results";

export default function Dashboard() {
    const [filters, setFilters] = useState<FiltersState>(createDefaultFilters());
    const [view, setView] = useState<"table" | "gallery">("gallery");
    const [search, setSearch] = useState<string>("");
    const filteredWallets = applyFilters(wallets, filters, search);
    const hasFilters = 
        filters.status !== "all" ||
        filters.platforms.size > 0 ||
        filters.custody.size > 0 ||
        filters.features.size > 0;
    const hasResults = filteredWallets.length > 0;

    const handleClearFilters = () => {
        setFilters(createDefaultFilters());
        setSearch("");
    }

    return (
        <div className="p-4">
            <div className="sticky top-17 py-4 bg-background z-20">
                <Input
                    className="w-full focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Search wallets… e.g., Phantom, Coinbase"
                    data-field="wallet_name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className="mt-4">
                    <FiltersBar filters={filters} onChange={setFilters} />
                </div>
            </div>
            <div className="flex justify-between items-center py-4 bg-background px-2">
                <div>
                    <ViewTabs view={view} setView={(v) => setView(v)} />
                </div>
                <div className="flex items-center gap-2">

                    <Button size={"sm"} variant={"ghost"} className="w-fit text-xs" onClick={() => exportWalletsCsv(wallets, "solpay-ready.csv", { bom: true })}>
                        <IconDownload />
                        Export CSV
                    </Button>
                </div>
            </div>
            {
                hasResults && <div className="flex items-center gap-1">
                    <p className="text-sm text-muted-foreground px-2">Showing {filteredWallets.length} wallets</p>
                    {hasFilters && <Button size={"sm"} variant={"ghost"} className="w-fit text-xs" onClick={() => handleClearFilters()}>Clear Filters</Button>}
                </div>
            }
            <main className="mt-4 min-h-screen px-2 overflow-y-auto z-0">
                {
                    hasResults
                        ?
                        (
                            view === "gallery"
                                ?
                                <CardsGrid wallets={filteredWallets} className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10" />
                                :
                                <WalletTable wallets={filteredWallets} className="z-0 mb-10" />
                        )
                        :
                        <NoResults search={search} hasFilters={hasFilters} onClearFilters={() => handleClearFilters()} />
                }
            </main>
        </div>
    )
}