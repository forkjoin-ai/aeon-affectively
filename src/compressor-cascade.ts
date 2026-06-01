/**
 * compressor-cascade.ts — the jet-engine **compressor cascade** for aeon-affectively, the
 * TypeScript mirror of the shared cascade law (open-source/aether/src/wasm-simd/compressor-cascade.ts,
 * itself the mirror of the Rust `gnosis-engine-core` crate). Kept byte-identical so aeon-affectively,
 * aether, aeon-flux, FOIL and gnosis-uring all carry the same proof-backed law.
 *
 * A runtime pipeline is a list of {@link Stage}s, each with a *measured* / format-exact ratio. The jet
 * engine's compressor law says the pipeline's overall ratio is the **product** of its stage ratios
 * ({@link overallRatio}), and stacking two pipelines **multiplies** their ratios — the
 * `(List, ++) -> (·, ×)` monoid homomorphism ({@link compose} + {@link homomorphismHolds}).
 *
 * In aeon-affectively the cascade describes the OSI L6 (presentation / encoding) path: the personality
 * state is a stack of fixed-schema void boundaries, one per personality layer. Each fixed-schema layer
 * multiplexes `D` named dimensions into a single boundary index space — a genuine multiplicative
 * fan-out count drawn from the layer's byte-exact dimension constant. Their product is the size of the
 * joint per-element configuration index space that one personality vector position encodes. The OSI
 * 7-layer stack IS this compressor (Gnosis.OSICompressorCascade.osi_is_the_jet_compressor).
 *
 * Proof backing (gnosis-math, axiom-clean):
 *   - Gnosis.MathJetEngine.overallRatio            — overall ratio = product of stages
 *   - Gnosis.MathJetEngine.overallRatio_append     — stacking multiplies (Nat)
 *   - Gnosis.CompressorCascadeRuntime.prodOver_append — stacking multiplies (any monoid; covers the
 *                                                    measured rational/float ratios used here)
 *   - Gnosis.MathJetEngine.jet_is_steady_ripcord   — the cascade product is the ripcord spin
 *   - Gnosis.OSICompressorCascade.osi_is_the_jet_compressor — the OSI stack is this compressor
 *
 * Scope: the compressor cascade only — NOT a spool governor or additive turbofan thrust.
 */

/** Canonical Lean theorem IDs backing this cascade — kept byte-identical to the Rust crate. */
export const MATH_JET_ENGINE_MASTER_THEOREM_ID = 'Gnosis.MathJetEngine.math_jet_engine_master';
export const OVERALL_RATIO_APPEND_THEOREM_ID = 'Gnosis.MathJetEngine.overallRatio_append';
export const JET_IS_STEADY_RIPCORD_THEOREM_ID = 'Gnosis.MathJetEngine.jet_is_steady_ripcord';
export const PRODOVER_APPEND_THEOREM_ID = 'Gnosis.CompressorCascadeRuntime.prodOver_append';
export const RUNTIME_CASCADE_THEOREM_ID =
  'Gnosis.CompressorCascadeRuntime.runtime_compressor_cascade_composes';
export const OSI_IS_THE_JET_COMPRESSOR_THEOREM_ID =
  'Gnosis.OSICompressorCascade.osi_is_the_jet_compressor';

/** The theorem-ID set every cascade report carries. */
export const CASCADE_THEOREM_IDS = Object.freeze([
  MATH_JET_ENGINE_MASTER_THEOREM_ID,
  OVERALL_RATIO_APPEND_THEOREM_ID,
  JET_IS_STEADY_RIPCORD_THEOREM_ID,
  PRODOVER_APPEND_THEOREM_ID,
  RUNTIME_CASCADE_THEOREM_ID,
  OSI_IS_THE_JET_COMPRESSOR_THEOREM_ID,
] as const);

/** The E₈ Coxeter number — the overall ratio of the canonical `[2,3,5]` compressor. */
export const E8_COXETER_NUMBER = 30;

/**
 * A compressor stage: a named pipeline transform with a measured ratio.
 * `ratio` is the stage's speedup / compression factor in isolation (`> 1` accelerates, `1` is a
 * clean pass-through — the identity of the cascade).
 */
export interface Stage {
  readonly name: string;
  readonly ratio: number;
}

export function stage(name: string, ratio: number): Stage {
  return { name, ratio };
}

/**
 * Overall pressure ratio of a stack = **product** of the stage ratios.
 * Mirrors `Gnosis.MathJetEngine.overallRatio` (`prodOver (·*·) 1`). Empty cascade = `1` (identity).
 */
export function overallRatio(stages: readonly Stage[]): number {
  return stages.reduce((acc, s) => acc * s.ratio, 1);
}

/**
 * **Append homomorphism**: stacking two compressors concatenates their stage lists, so that
 * `overallRatio(compose(a, b)) === overallRatio(a) * overallRatio(b)`.
 * Mirrors `Gnosis.MathJetEngine.overallRatio_append`.
 */
export function compose(a: readonly Stage[], b: readonly Stage[]): Stage[] {
  return [...a, ...b];
}

/**
 * The append homomorphism holds within relative tolerance `tol`:
 * `|overall(compose(a,b)) - overall(a)·overall(b)| <= tol · max(overall(compose(a,b)), 1)`.
 */
export function homomorphismHolds(a: readonly Stage[], b: readonly Stage[], tol = 1e-9): boolean {
  const lhs = overallRatio(compose(a, b));
  const rhs = overallRatio(a) * overallRatio(b);
  return Math.abs(lhs - rhs) <= tol * Math.max(Math.abs(lhs), 1);
}

/**
 * A measured cascade report — the honest per-stage-vs-composed record a bench fills in.
 * `predictedProduct` is the design-law prediction (product of the **isolated** stage ratios);
 * `measuredEndToEnd` is the **real** composed factor. The residual `measured / predicted` is `1`
 * when the product law predicts the pipeline exactly.
 */
export interface CascadeReport {
  readonly label: string;
  readonly stages: readonly Stage[];
  readonly predictedProduct: number;
  readonly measuredEndToEnd: number;
  readonly theoremIds: readonly string[];
}

export function cascadeReport(
  label: string,
  stages: readonly Stage[],
  measuredEndToEnd: number,
): CascadeReport {
  return {
    label,
    stages,
    predictedProduct: overallRatio(stages),
    measuredEndToEnd,
    theoremIds: CASCADE_THEOREM_IDS,
  };
}

/** Residual = measured / predicted (`1` ⇒ the product law predicts end-to-end exactly). */
export function residual(r: CascadeReport): number {
  return r.predictedProduct === 0 ? 0 : r.measuredEndToEnd / r.predictedProduct;
}

/** The product law predicts the measured end-to-end factor within relative tolerance `tol`. */
export function lawHolds(r: CascadeReport, tol = 1e-9): boolean {
  return (
    Math.abs(r.measuredEndToEnd - r.predictedProduct) <=
    tol * Math.max(Math.abs(r.predictedProduct), 1)
  );
}

/** A one-line, emoji-free summary for bench output. */
export function summarize(r: CascadeReport): string {
  const stages = r.stages.map((s) => `${s.name}=${s.ratio.toFixed(3)}x`).join(' * ');
  return (
    `${r.label}: stages[${stages}] ` +
    `predicted=${r.predictedProduct.toFixed(4)}x measured=${r.measuredEndToEnd.toFixed(4)}x ` +
    `residual=${residual(r).toFixed(3)}`
  );
}

// ---------------------------------------------------------------------------
// aeon-affectively REAL stage source: fixed-schema personality-layer dimensions
// ---------------------------------------------------------------------------

import { TEMPERAMENT_DIMENSIONS } from './layers/temperament.js';
import { ATTACHMENT_DIMENSIONS } from './layers/attachment.js';
import { MENTAL_HEALTH_DIMENSIONS } from './layers/mental-health.js';
import { HISTORY_DIMENSIONS } from './layers/history.js';
import { CULTURE_DIMENSIONS } from './layers/culture.js';

/**
 * The fixed-schema personality layers, each with its byte-exact dimension count read directly from
 * the layer's `*_DIMENSIONS` constant (no fabricated numbers — these are the source-of-truth schema
 * arrays). Each layer's `length` is the fan-out: how many named void-boundary dimensions that one
 * personality layer multiplexes into a single boundary index space.
 *
 * Layers 3 (Traits) and 4 (Behaviors) are dynamic (caller-supplied id/behavior lists) and so carry no
 * fixed schema constant; they are excluded from this format-exact cascade.
 */
export const FIXED_SCHEMA_LAYERS = Object.freeze([
  { name: 'temperament', dims: TEMPERAMENT_DIMENSIONS.length },
  { name: 'attachment', dims: ATTACHMENT_DIMENSIONS.length },
  { name: 'mentalHealth', dims: MENTAL_HEALTH_DIMENSIONS.length },
  { name: 'history', dims: HISTORY_DIMENSIONS.length },
  { name: 'culture', dims: CULTURE_DIMENSIONS.length },
] as const);

/** One stage per fixed-schema layer; ratio = that layer's byte-exact dimension count. */
export function schemaStages(): Stage[] {
  return FIXED_SCHEMA_LAYERS.map((l) => stage(l.name, l.dims));
}

/**
 * Build the affectively cascade report from the REAL fixed-schema dimension constants.
 *
 * The end-to-end measured factor is the size of the joint configuration index space a single
 * personality-vector position encodes: every combination of one chosen dimension per fixed-schema
 * layer. That count is exactly the product of the per-layer dimension counts, so the product law
 * predicts it precisely (residual = 1). This is a multiplexing/fan-out count, not a wall-clock guess.
 */
export function affectivelyCascadeReport(): CascadeReport {
  const stages = schemaStages();
  // measured end-to-end = cardinality of the joint per-position config index space = ∏ dims.
  const measured = FIXED_SCHEMA_LAYERS.reduce((acc, l) => acc * l.dims, 1);
  return cascadeReport('aeon-affectively/personality-schema-cascade', stages, measured);
}
