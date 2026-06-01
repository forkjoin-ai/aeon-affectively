# aeon-affectively

Personality and emotion tracking reimagined on the void walking foundation.

The 7-layer personality model maps directly to void walking structures:
- The 58-element personality vector is a complement distribution over a 58-dimensional void boundary
- Each personality layer represents a different timescale of void accumulation
- Emotion tracking becomes measurement of where the walker stands relative to the boundary

## Layers

| Layer | Name | Void Walking Interpretation |
|-------|------|----------------------------|
| 1 | Temperament | Inherited void -- birth configuration of the boundary |
| 2 | Attachment | Earliest void singularity patterns |
| 3 | Traits | Shape of the complement distribution |
| 4 | Behaviors | Gait selection (stand/trot/canter/gallop) |
| 5 | Mental Health | Kurtosis of the complement distribution |
| 6 | History | The void boundary itself |
| 7 | Culture | Inherited void -- generational trace |

## Architecture

Built on:
- **gnosis/void-walker** -- core void walking engine
- **gnosis/behavioral-taxonomy** -- behavioral loop classification
- **shared-ui/aic/types** -- ProfileBaseline personality types

## Jet-Engine Compressor Cascade

**OSI layer: L6 (presentation / personality-state encoding).** The personality state is a stack of
fixed-schema void boundaries, one per personality layer. Each fixed-schema layer multiplexes its named
dimensions into a single boundary index space, so the cascade's overall ratio is the **product** of the
per-layer dimension counts (the jet-engine compressor law: overall = ∏ stage ratios, the
`(List, ++) -> (·, ×)` monoid homomorphism).

Stage ratios (byte-exact, read from each layer's `*_DIMENSIONS` constant — the dynamic Traits/Behaviors
layers carry no fixed schema and are excluded):

| Stage | Ratio | Source |
|-------|-------|--------|
| temperament | 8 | `TEMPERAMENT_DIMENSIONS.length` |
| attachment | 5 | `ATTACHMENT_DIMENSIONS.length` |
| mentalHealth | 5 | `MENTAL_HEALTH_DIMENSIONS.length` |
| history | 6 | `HISTORY_DIMENSIONS.length` |
| culture | 6 | `CULTURE_DIMENSIONS.length` |

**Overall = 8 · 5 · 5 · 6 · 6 = 7200x** — the cardinality of the joint per-position configuration index
space one personality-vector position encodes. The product law predicts it exactly (residual = 1.000).

- Cascade module: `src/compressor-cascade.ts` (mirrors `open-source/aether/src/wasm-simd/compressor-cascade.ts`
  and the Rust `gnosis/gnosis-engine-core` crate).
- Keystone: the OSI 7-layer stack IS this compressor
  (`Gnosis.OSICompressorCascade.osi_is_the_jet_compressor`); product law
  `Gnosis.MathJetEngine.overallRatio_append`, runtime `Gnosis.CompressorCascadeRuntime.prodOver_append`.
- Verify: `pnpm run gnode -- run open-source/aeon-affectively/src/compressor-cascade.verify.ts`
