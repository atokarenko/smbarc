import type { CatalogModule } from "./catalog-data";
import type { MaturityScore } from "@/lib/demo-data";

/**
 * Compute relevance of a module based on dimension scores.
 * Lower business health in relevant dimensions = higher module relevance.
 * Returns 0-100.
 */
export function computeRelevance(
  module: CatalogModule,
  dimensions: MaturityScore["dimensions"]
): number {
  const dims = module.relevantDimensions;
  if (dims.length === 0) return 0;

  const avg =
    dims.reduce(
      (sum, dim) => sum + (dimensions[dim as keyof typeof dimensions] ?? 50),
      0
    ) / dims.length;

  // Invert: low health = high relevance
  return Math.max(0, Math.min(100, Math.round(100 - avg)));
}

/**
 * Returns all modules with computed relevance, sorted descending.
 * If dimensions is null, returns modules with relevance 0 (no personalization).
 */
export function getRecommendedModules(
  modules: CatalogModule[],
  dimensions: MaturityScore["dimensions"] | null
): (CatalogModule & { relevance: number })[] {
  if (!dimensions) {
    return modules.map((m) => ({ ...m, relevance: 0 }));
  }

  return modules
    .map((m) => ({ ...m, relevance: computeRelevance(m, dimensions) }))
    .sort((a, b) => b.relevance - a.relevance);
}
