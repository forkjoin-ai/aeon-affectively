/**
 * Layer 1: Temperament -- Inherited Void (Birth Configuration)
 *
 * The biological baseline. This is the initial shape of the void boundary
 * before any experience has accumulated. Neuroticism, sensitivity, and
 * baseline physiological metrics define the birth configuration.
 */

import {
  type VoidBoundary,
  createVoidBoundary,
  updateVoidBoundary,
} from '../../../gnosis/src/void.js';

/** Dimensions of the temperament void boundary */
export const TEMPERAMENT_DIMENSIONS = [
  'neuroticism',
  'sensitivity',
  'avoidance',
  'sleepDebt',
  'traitAnxiety',
  'emotionalSensitivity',
  'restingHeartRate',
  'heartRateVariability',
] as const;

export type TemperamentDimension = (typeof TEMPERAMENT_DIMENSIONS)[number];

export interface TemperamentLayer {
  boundary: VoidBoundary;
  dimensions: typeof TEMPERAMENT_DIMENSIONS;
}

export function createTemperamentLayer(): TemperamentLayer {
  return {
    boundary: createVoidBoundary(TEMPERAMENT_DIMENSIONS.length),
    dimensions: TEMPERAMENT_DIMENSIONS,
  };
}

/**
 * Initialize temperament from ProfileBaseline layer1 data.
 * Maps numeric personality values into void boundary counts --
 * higher values mean more "rejection" accumulated at that dimension.
 */
export function initializeFromBaseline(
  layer: TemperamentLayer,
  baseline: {
    neuroticism?: number;
    sensitivity?: number;
    avoidant_score?: number;
    sleep_debt?: number;
    traitAnxiety?: number;
    emotionalSensitivity?: number;
    baseline_metrics?: {
      restingHeartRate?: number;
      heartRateVariability?: number;
    };
  }
): void {
  const values: Record<TemperamentDimension, number | undefined> = {
    neuroticism: baseline.neuroticism,
    sensitivity: baseline.sensitivity,
    avoidance: baseline.avoidant_score,
    sleepDebt: baseline.sleep_debt,
    traitAnxiety: baseline.traitAnxiety,
    emotionalSensitivity: baseline.emotionalSensitivity,
    restingHeartRate: baseline.baseline_metrics?.restingHeartRate,
    heartRateVariability: baseline.baseline_metrics?.heartRateVariability,
  };

  for (let i = 0; i < TEMPERAMENT_DIMENSIONS.length; i++) {
    const dim = TEMPERAMENT_DIMENSIONS[i];
    const value = values[dim];
    if (value !== undefined && value > 0) {
      updateVoidBoundary(layer.boundary, i, value);
    }
  }
}
