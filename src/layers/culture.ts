/**
 * Layer 7: Culture -- Inherited Void (Generational Trace)
 *
 * Cultural context as inherited void boundary shape. This layer
 * captures the generational trace -- patterns passed down through
 * family, community, and society that pre-shape the void boundary
 * before individual experience begins.
 *
 * Mirrors Layer 1 (Temperament) as biological inheritance,
 * but operates on social/cultural inheritance.
 */

import {
  type VoidBoundary,
  createVoidBoundary,
  updateVoidBoundary,
} from '../../../gnosis/src/runtime/void-walker.js';

export const CULTURE_DIMENSIONS = [
  'collectivismIndividualism',
  'emotionalExpressiveness',
  'hierarchyEgalitarianism',
  'uncertaintyTolerance',
  'generationalTrauma',
  'generationalResilience',
] as const;

export type CultureDimension = (typeof CULTURE_DIMENSIONS)[number];

export interface CultureLayer {
  boundary: VoidBoundary;
  dimensions: typeof CULTURE_DIMENSIONS;
}

export function createCultureLayer(): CultureLayer {
  return {
    boundary: createVoidBoundary(CULTURE_DIMENSIONS.length),
    dimensions: CULTURE_DIMENSIONS,
  };
}

/**
 * Initialize cultural layer from available signals.
 * Cultural void is inherited -- it shapes the boundary before
 * any individual experience.
 */
export function initializeFromSignals(
  layer: CultureLayer,
  signals: Partial<Record<CultureDimension, number>>,
): void {
  for (let i = 0; i < CULTURE_DIMENSIONS.length; i++) {
    const dim = CULTURE_DIMENSIONS[i];
    const value = signals[dim];
    if (value !== undefined && value > 0) {
      updateVoidBoundary(layer.boundary, i, value);
    }
  }
}
