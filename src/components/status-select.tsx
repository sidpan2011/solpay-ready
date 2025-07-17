import { FiltersState } from "@/lib/filters";
import {
    Select, SelectTrigger, SelectValue, SelectContent, SelectItem
} from "./ui/select";
import { STATUS_OPTIONS } from "@/lib/filter-options";

interface StatusSelectProps {
    value: FiltersState["status"];
    onChange: (v: FiltersState["status"]) => void;
}

export function StatusSelect({ value, onChange }: StatusSelectProps) {
    return (
        <Select value={value} onValueChange={(v) => onChange(v as any)}>
            <SelectTrigger size="sm" className="w-[130px]">
                <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-background">
                {STATUS_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}