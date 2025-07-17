import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IconLayoutGrid, IconColumns } from "@tabler/icons-react";

interface ViewTabsProps {
  view: "gallery" | "table";
  setView: (v: "gallery" | "table") => void;
  className?: string;
}

export function ViewTabs({ view, setView, className }: ViewTabsProps) {
  return (
    <Tabs value={view} onValueChange={(v) => setView(v as any)} className={className}>
      <TabsList>
        <TabsTrigger
          value="gallery"
          aria-label="Gallery view"
        >
          <IconLayoutGrid className="h-4 w-4" />
          <span className="sr-only">Gallery</span>
        </TabsTrigger>
        <TabsTrigger
          value="table"
          aria-label="Table view"
        >
          <IconColumns className="h-4 w-4" />
          <span className="sr-only">Table</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}