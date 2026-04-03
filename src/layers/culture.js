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
import { createVoidBoundary, updateVoidBoundary, } from '../../../gnosis/src/void.js';
export const CULTURE_DIMENSIONS = [
    'collectivismIndividualism',
    'emotionalExpressiveness',
    'hierarchyEgalitarianism',
    'uncertaintyTolerance',
    'generationalTrauma',
    'generationalResilience',
];
export function createCultureLayer() {
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
export function initializeFromSignals(layer, signals) {
    for (let i = 0; i < CULTURE_DIMENSIONS.length; i++) {
        const dim = CULTURE_DIMENSIONS[i];
        const value = signals[dim];
        if (value !== undefined && value > 0) {
            updateVoidBoundary(layer.boundary, i, value);
        }
    }
}
//# sourceMappingURL=culture.js.map