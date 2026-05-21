/**
 * Layer 5: Mental Health -- Kurtosis of the Complement Distribution
 *
 * Mental health state reflects the kurtosis (peakedness) of the
 * complement distribution. High kurtosis = concentrated/rigid patterns.
 * Low kurtosis = diffuse/scattered patterns. Healthy = moderate kurtosis
 * with good coverage of the complement space.
 */

import {
  type VoidBoundary,
  createVoidBoundary,
  updateVoidBoundary,
  complementDistribution,
} from '../../../gnosis/src/void.js';

export const MENTAL_HEALTH_DIMENSIONS = [
  'anxiety',
  'depression',
  'chronicStressPhysical',
  'chronicStressEmotional',
  'stressDuration',
] as const;

export type MentalHealthDimension = (typeof MENTAL_HEALTH_DIMENSIONS)[number];

export interface MentalHealthLayer {
  boundary: VoidBoundary;
  dimensions: typeof MENTAL_HEALTH_DIMENSIONS;
}

export function createMentalHealthLayer(): MentalHealthLayer {
  return {
    boundary: createVoidBoundary(MENTAL_HEALTH_DIMENSIONS.length),
    dimensions: MENTAL_HEALTH_DIMENSIONS,
  };
}

/**
 * Compute kurtosis of the complement distribution.
 * High kurtosis indicates concentrated void -- rigid mental patterns.
 */
export function computeKurtosis(boundary: VoidBoundary, eta?: number): number {
  const dist = complementDistribution(boundary, eta);
  const n = dist.length;
  if (n < 4) return 0;
  const mean = dist.reduce((a, b) => a + b, 0) / n;
  const variance = dist.reduce((a, v) => a + (v - mean) ** 2, 0) / n;
  if (variance === 0) return 0;
  const fourthMoment = dist.reduce((a, v) => a + (v - mean) ** 4, 0) / n;
  return fourthMoment / variance ** 2 - 3; // excess kurtosis
}

const DEPRESSION_SCALE: Record<string, number> = {
  none: 0,
  mild: 0.25,
  moderate: 0.5,
  severe: 1.0,
};

export function initializeFromBaseline(
  layer: MentalHealthLayer,
  baseline: {
    anxietyLevel?: number;
    depressionCycles?: 'none' | 'mild' | 'moderate' | 'severe';
    depressionLevel?: number;
    chronicStress?: {
      physicalSymptoms?: boolean;
      emotionalBurnout?: boolean;
      duration?: number;
    };
  }
): void {
  if (baseline.anxietyLevel !== undefined) {
    updateVoidBoundary(layer.boundary, 0, baseline.anxietyLevel / 10);
  }
  if (baseline.depressionCycles) {
    const val = DEPRESSION_SCALE[baseline.depressionCycles] ?? 0;
    updateVoidBoundary(layer.boundary, 1, val);
  } else if (baseline.depressionLevel !== undefined) {
    updateVoidBoundary(layer.boundary, 1, baseline.depressionLevel / 10);
  }
  if (baseline.chronicStress) {
    if (baseline.chronicStress.physicalSymptoms) {
      updateVoidBoundary(layer.boundary, 2, 1);
    }
    if (baseline.chronicStress.emotionalBurnout) {
      updateVoidBoundary(layer.boundary, 3, 1);
    }
    if (baseline.chronicStress.duration !== undefined) {
      updateVoidBoundary(
        layer.boundary,
        4,
        baseline.chronicStress.duration / 52
      );
    }
  }
}
