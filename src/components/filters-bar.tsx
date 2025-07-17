import { PLATFORM_OPTIONS, CUSTODY_OPTIONS, FEATURE_OPTIONS } from "@/lib/filter-options";
import { FiltersState } from "@/lib/filters";
import { StatusSelect } from "./status-select";
import { MultiSelect } from "./multi-select";

interface FiltersBarProps {
    filters: FiltersState;
    onChange: (f: FiltersState) => void;
}

export function FiltersBar({ filters, onChange }: FiltersBarProps) {
    const setStatus = (status: FiltersState["status"]) =>
        onChange({ ...filters, status });

    const setPlatforms = (platforms: Set<string>) =>
        onChange({ ...filters, platforms });

    const setCustody = (custody: Set<string>) =>
        onChange({ ...filters, custody });

    const setFeatures = (features: Set<string>) =>
        onChange({ ...filters, features });

    return (
        <div className="flex flex-wrap px-2 w-full items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
                <p className="text-sm font-medium">Solana Pay QR Status</p><StatusSelect value={filters.status} onChange={setStatus} />

                <MultiSelect
                    label="Platforms"
                    placeholder="Platforms"
                    options={PLATFORM_OPTIONS}
                    selected={filters.platforms}
                    onChange={setPlatforms}
                    widthClass="w-[160px]"
                />
                <MultiSelect
                    label="Custody"
                    placeholder="Custody"
                    options={CUSTODY_OPTIONS}
                    selected={filters.custody}
                    onChange={setCustody}
                    widthClass="w-[160px]"
                />

                <MultiSelect
                    label="Features"
                    placeholder="Features"
                    options={FEATURE_OPTIONS}
                    selected={filters.features}
                    onChange={setFeatures}
                    widthClass="w-[160px]"
                />
            </div>
            <p className="text-xs font-medium text-muted-foreground flex items-center"><span className="h-2 w-2 bg-violet-400 inline-block rounded-full mr-2" />Last Updated: 17th July 2025</p>
        </div>
    );
}