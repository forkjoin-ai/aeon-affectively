/**
 * Layer 4: Behaviors -- Gait Selection
 *
 * Observable behavioral patterns as gaits of void walking.
 * Stand = no movement (baseline). Trot = habitual patterns.
 * Canter = active coping. Gallop = crisis response.
 *
 * Integrates with gnosis behavioral taxonomy for loop classification.
 */

import {
  type VoidBoundary,
  createVoidBoundary,
  updateVoidBoundary,
} from '../../../gnosis/src/runtime/void-walker.js';
import type {
  BehavioralLoopRecord,
} from '../../../gnosis/src/behavioral-taxonomy.js';

export type Gait = 'stand' | 'trot' | 'canter' | 'gallop';

export interface BehaviorsLayer {
  boundary: VoidBoundary;
  /** Map from behavior name to its index in the boundary */
  behaviorIndex: Map<string, number>;
  /** Current gait derived from boundary activity */
  currentGait: Gait;
}

export function createBehaviorsLayer(behaviorNames: string[]): BehaviorsLayer {
  const behaviorIndex = new Map<string, number>();
  behaviorNames.forEach((name, i) => behaviorIndex.set(name, i));
  return {
    boundary: createVoidBoundary(behaviorNames.length),
    behaviorIndex,
    currentGait: 'stand',
  };
}

/**
 * Derive gait from boundary activity level.
 * More total entries = faster gait.
 */
export function deriveGait(boundary: VoidBoundary): Gait {
  const activity = boundary.totalEntries;
  if (activity < 1) return 'stand';
  if (activity < 5) return 'trot';
  if (activity < 15) return 'canter';
  return 'gallop';
}

export function initializeFromBaseline(
  layer: BehaviorsLayer,
  baseline: {
    habitual_behaviors?: string[];
    behavior_patterns?: Record<string, number>;
    copingMechanisms?: string[];
  },
): void {
  if (baseline.habitual_behaviors) {
    for (const behavior of baseline.habitual_behaviors) {
      const idx = layer.behaviorIndex.get(behavior);
      if (idx !== undefined) {
        const freq = baseline.behavior_patterns?.[behavior] ?? 1;
        updateVoidBoundary(layer.boundary, idx, freq);
      }
    }
  }
  layer.currentGait = deriveGait(layer.boundary);
}

/**
 * Record a behavioral loop observation from the gnosis taxonomy.
 */
export function recordBehavioralLoop(
  layer: BehaviorsLayer,
  loop: BehavioralLoopRecord,
  magnitude: number = 1,
): void {
  const idx = layer.behaviorIndex.get(loop.name);
  if (idx !== undefined) {
    updateVoidBoundary(layer.boundary, idx, magnitude);
    layer.currentGait = deriveGait(layer.boundary);
  }
}
