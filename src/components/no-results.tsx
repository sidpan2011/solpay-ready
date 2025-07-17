import { Button } from "./ui/button";

interface NoResultsProps {
  search?: string;
  hasFilters?: boolean;
  onClearFilters?: () => void;
}

export function NoResults({ search, hasFilters, onClearFilters }: NoResultsProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
      <p className="text-lg font-medium text-foreground">No wallets found.</p>
      {search ? (
        <p className="mt-1 text-sm">
          Nothing matched <span className="font-semibold">“{search}”</span>.
        </p>
      ) : (
        <p className="mt-1 text-sm">Try adjusting your filters.</p>
      )}
      {hasFilters && (
        <Button
          size="sm"
          variant="outline"
          className="mt-4"
          onClick={onClearFilters}
        >
          Clear filters
        </Button>
      )}
    </div>
  );
}