export interface FiltersState {
    status: "all" | "yes" | "partial" | "no" | "untested";
    platforms: Set<string>;
    custody: Set<string>;
    features: Set<string>;
}


export function createDefaultFilters(): FiltersState {
    return {
      status: "all",
      platforms: new Set(),
      custody: new Set(),
      features: new Set(),
    };
  }