import { vibeCategories, Listing } from "./mvp-data";

export function calculateMatchScore(userSelections: Record<string, any>, listing: Listing): number {
  if (!userSelections || Object.keys(userSelections).length === 0) return 0;
  if (!listing.vibeValues) {
    // Fallback to tag-based matching if no vibeValues
    const matchingTags = listing.vibeTags.filter(tag => 
      Object.values(userSelections).some(val => 
        typeof val === 'string' ? val === tag : false
      )
    );
    return Math.round((matchingTags.length / Math.max(listing.vibeTags.length, 1)) * 100);
  }

  let totalWeight = 0;
  let totalScore = 0;

  for (const category of vibeCategories) {
    const userVal = userSelections[category.id];
    const listingVal = listing.vibeValues[category.id];

    if (userVal === undefined || listingVal === undefined) continue;

    if (category.type === "choice") {
      totalWeight += 1;
      if (userVal === listingVal) totalScore += 1;
    } else if (category.type === "slider" && category.sliders) {
      for (const slider of category.sliders) {
        const uVal = userVal[slider.id];
        const lVal = listingVal[slider.id];
        if (uVal !== undefined && lVal !== undefined) {
          totalWeight += 1;
          const range = Math.max(slider.max - slider.min, 1);
          const diff = Math.abs(uVal - lVal);
          const similarity = 1 - diff / range;
          totalScore += similarity;
        }
      }
    }
  }

  if (totalWeight === 0) return 0;
  return Math.round((totalScore / totalWeight) * 100);
}
