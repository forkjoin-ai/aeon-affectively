/**
 * Layer 3: Traits -- Complement Distribution Shape
 *
 * Personality traits define the shape of the complement distribution.
 * Each identified trait is a dimension where void has accumulated
 * differently than the population mean. The frequency of trait
 * expression gives the magnitude of accumulation.
 */

import {
  type VoidBoundary,
  createVoidBoundary,
  updateVoidBoundary,
} from '../../../gnosis/src/runtime/void-walker.js';

export interface TraitsLayer {
  boundary: VoidBoundary;
  /** Map from trait ID to its index in the boundary */
  traitIndex: Map<string, number>;
}

export function createTraitsLayer(traitIds: string[]): TraitsLayer {
  const traitIndex = new Map<string, number>();
  traitIds.forEach((id, i) => traitIndex.set(id, i));
  return {
    boundary: createVoidBoundary(traitIds.length),
    traitIndex,
  };
}

export function initializeFromBaseline(
  layer: TraitsLayer,
  baseline: {
    identified_traits?: string[];
    trait_frequencies?: Record<string, number>;
  },
): void {
  if (baseline.identified_traits) {
    for (const traitId of baseline.identified_traits) {
      const idx = layer.traitIndex.get(traitId);
      if (idx !== undefined) {
        const freq = baseline.trait_frequencies?.[traitId] ?? 1;
        updateVoidBoundary(layer.boundary, idx, freq);
      }
    }
  }
}
