import React, { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Command, CommandInput, CommandList, CommandEmpty, CommandItem } from "./ui/command";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MultiSelectOption {
    value: string;
    label: string;
}

interface MultiSelectProps {
    label: string;
    placeholder?: string;
    options: MultiSelectOption[];
    selected: Set<string>;
    onChange: (newSelected: Set<string>) => void;
    widthClass?: string; // e.g., "w-[160px]"
}

export function MultiSelect({
    label,
    placeholder,
    options,
    selected,
    onChange,
    widthClass = "w-[160px]",
}: MultiSelectProps) {
    const [open, setOpen] = useState(false);

    const toggle = (val: string) => {
        const next = new Set(selected);
        next.has(val) ? next.delete(val) : next.add(val);
        onChange(next);
    };

    const clear = () => {
        onChange(new Set());
    };

    const display =
        selected.size === 0
            ? (placeholder ?? label)
            : selected.size === 1
                ? options.find((o) => o.value === [...selected][0])?.label ?? label
                : `${selected.size} selected`;

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    size="sm"
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(widthClass, "justify-between")}
                >
                    {display}
                    <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[220px]" align="start">
                <Command loop className="bg-background">
                    <CommandInput placeholder={`Filter ${label.toLowerCase()}...`} />
                    <CommandList>
                        <CommandEmpty>No results.</CommandEmpty>
                        {options.map((opt) => {
                            const checked = selected.has(opt.value);
                            return (
                                <CommandItem
                                    key={opt.value}
                                    onSelect={() => toggle(opt.value)}
                                    className="flex items-center gap-2"
                                >
                                    <Checkbox
                                        checked={checked}
                                        onCheckedChange={() => toggle(opt.value)}
                                        aria-label={opt.label}
                                    />
                                    <span>{opt.label}</span>
                                </CommandItem>
                            );
                        })}
                    </CommandList>
                    {selected.size > 0 && (
                        <div className="border-t p-2">
                            <Button size="sm" variant="ghost" className="w-full" onClick={clear}>
                                Clear
                            </Button>
                        </div>
                    )}
                </Command>
            </PopoverContent>
        </Popover>
    );
}