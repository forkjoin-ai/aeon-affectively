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
// Re-export void primitives from gnosis core
export { createVoidBoundary, updateVoidBoundary, decayVoidBoundary, complementDistribution, measure, createTimescaleBoundary, createBoundaryStack, tickBoundaryStack, measureStack, flattenStack, createResonance, projectBoundary, createWalker, createStackWalker, stepStackWalker, measureStackWalker, } from '../../gnosis/src/void.js';
//# sourceMappingURL=index.js.map