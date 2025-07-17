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
      <TabsList className="h-8 w-fit gap-1 rounded-md border bg-transparent p-0">
        <TabsTrigger
          value="gallery"
          aria-label="Gallery view"
          className="h-8 w-8 p-0 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
        >
          <IconLayoutGrid className="h-4 w-4" />
          <span className="sr-only">Gallery</span>
        </TabsTrigger>
        <TabsTrigger
          value="table"
          aria-label="Table view"
          className="h-8 w-8 p-0 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
        >
          <IconColumns className="h-4 w-4" />
          <span className="sr-only">Table</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}