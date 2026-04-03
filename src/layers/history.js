/**
 * Layer 6: History -- The Void Boundary Itself
 *
 * Personal history IS the void boundary. Every trauma, every success,
 * every major life event has shaped the boundary's geometry. This layer
 * is not a projection onto the boundary -- it IS the boundary.
 */
import { createVoidBoundary, updateVoidBoundary, decayVoidBoundary, } from '../../../gnosis/src/void.js';
export const HISTORY_DIMENSIONS = [
    'trauma',
    'copingAdaptive',
    'copingMaladaptive',
    'successes',
    'failures',
    'majorEvents',
];
export function createHistoryLayer() {
    return {
        boundary: createVoidBoundary(HISTORY_DIMENSIONS.length),
        dimensions: HISTORY_DIMENSIONS,
    };
}
export function initializeFromBaseline(layer, baseline) {
    if (baseline.pastTrauma?.hasTrauma &&
        baseline.pastTrauma.impactLevel !== undefined) {
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
        updateVoidBoundary(layer.boundary, 5, baseline.majorLifeEvents.length * 0.1);
    }
}
/**
 * Apply temporal decay -- older events contribute less to the boundary.
 * This models how trauma processing and time reshape history's influence.
 */
export function applyTemporalDecay(layer, factor) {
    decayVoidBoundary(layer.boundary, factor);
}
//# sourceMappingURL=history.js.map