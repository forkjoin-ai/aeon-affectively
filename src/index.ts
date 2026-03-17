/**
 * aeon-affectively
 *
 * Personality and emotion tracking as void walking over complement distributions.
 * The 58-element Float32Array personality vector IS a complement distribution
 * over a 58-dimensional void boundary.
 */

// Layer modules
export * as temperament from './layers/temperament.js';
export * as attachment from './layers/attachment.js';
export * as traits from './layers/traits.js';
export * as behaviors from './layers/behaviors.js';
export * as mentalHealth from './layers/mental-health.js';
export * as history from './layers/history.js';
export * as culture from './layers/culture.js';

// Re-export void walker primitives
export {
  type VoidBoundary,
  createVoidBoundary,
  updateVoidBoundary,
  decayVoidBoundary,
  complementDistribution,
} from '../../gnosis/src/runtime/void-walker.js';

// Re-export behavioral taxonomy types
export type {
  BehavioralLoopRecord,
  BehavioralLoopTaxonomy,
  BehavioralLoopLogic,
} from '../../gnosis/src/behavioral-taxonomy.js';
