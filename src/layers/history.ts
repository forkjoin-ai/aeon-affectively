/**
 * Layer 6: History -- The Void Boundary Itself
 *
 * Personal history IS the void boundary. Every trauma, every success,
 * every major life event has shaped the boundary's geometry. This layer
 * is not a projection onto the boundary -- it IS the boundary.
 */

import {
  type VoidBoundary,
  createVoidBoundary,
  updateVoidBoundary,
  decayVoidBoundary,
} from '../../../gnosis/src/void.js';

export const HISTORY_DIMENSIONS = [
  'trauma',
  'copingAdaptive',
  'copingMaladaptive',
  'successes',
  'failures',
  'majorEvents',
] as const;

export type HistoryDimension = (typeof HISTORY_DIMENSIONS)[number];

export interface HistoryLayer {
  boundary: VoidBoundary;
  dimensions: typeof HISTORY_DIMENSIONS;
}

export function createHistoryLayer(): HistoryLayer {
  return {
    boundary: createVoidBoundary(HISTORY_DIMENSIONS.length),
    dimensions: HISTORY_DIMENSIONS,
  };
}

export function initializeFromBaseline(
  layer: HistoryLayer,
  baseline: {
    pastTrauma?: {
      hasTrauma?: boolean;
      impactLevel?: number;
    };
    learningHistory?: {
      copingMechanisms?: string[];
      behavioralPatterns?: string[];
      successes?: string[];
      failures?: string[];
    };
    majorLifeEvents?: Array<{ event: string }>;
  }
): void {
  if (
    baseline.pastTrauma?.hasTrauma &&
    baseline.pastTrauma.impactLevel !== undefined
  ) {
    updateVoidBoundary(layer.boundary, 0, baseline.pastTrauma.impactLevel);
  }

  if (baseline.learningHistory) {
    const lh = baseline.learningHistory;
    if (lh.copingMechanisms) {
      updateVoidBoundary(layer.boundary, 1, lh.copingMechanisms.length * 0.1);
    }
    if (lh.behavioralPatterns) {
      updateVoidBoundary(layer.boundary, 2, lh.behavioralPatterns.length * 0.1);
    }
    if (lh.successes) {
      updateVoidBoundary(layer.boundary, 3, lh.successes.length * 0.1);
    }
    if (lh.failures) {
      updateVoidBoundary(layer.boundary, 4, lh.failures.length * 0.1);
    }
  }

  if (baseline.majorLifeEvents) {
    updateVoidBoundary(
      layer.boundary,
      5,
      baseline.majorLifeEvents.length * 0.1
    );
  }
}

/**
 * Apply temporal decay -- older events contribute less to the boundary.
 * This models how trauma processing and time reshape history's influence.
 */
export function applyTemporalDecay(layer: HistoryLayer, factor: number): void {
  decayVoidBoundary(layer.boundary, factor);
}
