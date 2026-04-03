/**
 * Layer 1: Temperament -- Inherited Void (Birth Configuration)
 *
 * The biological baseline. This is the initial shape of the void boundary
 * before any experience has accumulated. Neuroticism, sensitivity, and
 * baseline physiological metrics define the birth configuration.
 */
import { createVoidBoundary, updateVoidBoundary, } from '../../../gnosis/src/void.js';
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
];
export function createTemperamentLayer() {
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
export function initializeFromBaseline(layer, baseline) {
    const values = {
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
//# sourceMappingURL=temperament.js.map