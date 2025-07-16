"use client";
import { Input } from "./ui/input";
import { FiltersBar } from "./filters-bar";
import { useState } from "react";
import { FiltersState } from "@/lib/filters";
import { createDefaultFilters } from "@/lib/filters";

export default function Dashboard() {
    const [filters, setFilters] = useState<FiltersState>(createDefaultFilters());

    return (
        <div className="p-4">
            <div className="sticky top-20 pb-4">
                <Input
                    className="w-full focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Search wallets… e.g., Phantom, Coinbase"
                    data-field="wallet_name"
                />
                <div className="mt-4">
                    <FiltersBar filters={filters} onChange={setFilters} />
                </div>
            </div>
            <div className="h-screen"></div>
        </div>
    )
}