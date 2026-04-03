/**
 * Layer 3: Traits -- Complement Distribution Shape
 *
 * Personality traits define the shape of the complement distribution.
 * Each identified trait is a dimension where void has accumulated
 * differently than the population mean. The frequency of trait
 * expression gives the magnitude of accumulation.
 */
import { createVoidBoundary, updateVoidBoundary, } from '../../../gnosis/src/void.js';
export function createTraitsLayer(traitIds) {
    const traitIndex = new Map();
    traitIds.forEach((id, i) => traitIndex.set(id, i));
    return {
        boundary: createVoidBoundary(traitIds.length),
        traitIndex,
    };
}
export function initializeFromBaseline(layer, baseline) {
    if (baseline.identified_traits) {
        for (const traitId of baseline.identified_traits) {
            const idx = layer.traitIndex.get(traitId);
            if (idx !== undefined) {
                const freq = baseline.trait_frequencies?.[traitId] ?? 1;
                updateVoidBoundary(layer.boundary, idx, freq);
            }
        }
    }
}
//# sourceMappingURL=traits.js.map