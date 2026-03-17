/**
 * Layer 2: Attachment -- Earliest Void Singularity Patterns
 *
 * Attachment style determines how the void boundary warps around
 * relational singularities. Secure attachment = smooth boundary,
 * disorganized = fractal/chaotic boundary geometry.
 */

import {
  type VoidBoundary,
  createVoidBoundary,
  updateVoidBoundary,
} from '../../../gnosis/src/void.js';

export const ATTACHMENT_DIMENSIONS = [
  'secure',
  'anxious',
  'avoidant',
  'disorganized',
  'trustLevel',
] as const;

export type AttachmentDimension = (typeof ATTACHMENT_DIMENSIONS)[number];

export interface AttachmentLayer {
  boundary: VoidBoundary;
  dimensions: typeof ATTACHMENT_DIMENSIONS;
}

export function createAttachmentLayer(): AttachmentLayer {
  return {
    boundary: createVoidBoundary(ATTACHMENT_DIMENSIONS.length),
    dimensions: ATTACHMENT_DIMENSIONS,
  };
}

/** Attachment style weights -- how much void each style accumulates */
const STYLE_WEIGHTS: Record<string, Partial<Record<AttachmentDimension, number>>> = {
  secure: { secure: 1.0, trustLevel: 0.8 },
  anxious: { anxious: 1.0, trustLevel: 0.3 },
  avoidant: { avoidant: 1.0, trustLevel: 0.2 },
  disorganized: { disorganized: 1.0, anxious: 0.5, avoidant: 0.5, trustLevel: 0.1 },
};

export function initializeFromBaseline(
  layer: AttachmentLayer,
  baseline: {
    attachment_style?: 'secure' | 'anxious' | 'avoidant' | 'disorganized';
    trustLevels?: number;
  },
): void {
  if (baseline.attachment_style) {
    const weights = STYLE_WEIGHTS[baseline.attachment_style];
    if (weights) {
      for (let i = 0; i < ATTACHMENT_DIMENSIONS.length; i++) {
        const dim = ATTACHMENT_DIMENSIONS[i];
        const w = weights[dim];
        if (w !== undefined) {
          updateVoidBoundary(layer.boundary, i, w);
        }
      }
    }
  }
  if (baseline.trustLevels !== undefined) {
    const trustIdx = ATTACHMENT_DIMENSIONS.indexOf('trustLevel');
    updateVoidBoundary(layer.boundary, trustIdx, baseline.trustLevels);
  }
}
