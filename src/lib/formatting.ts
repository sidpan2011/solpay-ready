export function formatShortDate(iso?: string) {
    if (!iso) return "";
    
    // Check if the string looks like a valid date format
    const isValidDateString = /^\d{4}-\d{2}-\d{2}/.test(iso) || 
                             /^\d{1,2}\/\d{1,2}\/\d{4}/.test(iso) ||
                             /^\d{4}\/\d{1,2}\/\d{1,2}/.test(iso);
    
    if (!isValidDateString) {
        return iso; // Return the original string if it's not a date format
    }
    
    const d = new Date(iso);
    
    // Check if the date is valid
    if (isNaN(d.getTime())) {
        return iso; // Return the original string if date parsing fails
    }
    
    // Use a consistent locale to prevent hydration mismatches
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}