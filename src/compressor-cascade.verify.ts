/**
 * compressor-cascade.verify.ts — runnable verification of the aeon-affectively jet-engine compressor
 * cascade. Confirms the product law (overall = ∏ stages), the append homomorphism, and that the
 * format-exact personality-schema cascade's product predicts the joint config index space exactly.
 *
 * Run:  pnpm run gnode -- run open-source/aeon-affectively/src/compressor-cascade.verify.ts
 */

import {
  affectivelyCascadeReport,
  schemaStages,
  overallRatio,
  homomorphismHolds,
  lawHolds,
  residual,
  summarize,
  compose,
  FIXED_SCHEMA_LAYERS,
  CASCADE_THEOREM_IDS,
} from './compressor-cascade.js';

let failures = 0;
function check(name: string, cond: boolean, detail = ''): void {
  if (cond) {
    console.log(`  ok   ${name}${detail ? ' — ' + detail : ''}`);
  } else {
    failures++;
    console.log(`  FAIL ${name}${detail ? ' — ' + detail : ''}`);
  }
}

console.log('aeon-affectively :: jet-engine compressor cascade verification');
console.log('OSI layer: L6 (presentation / personality-state encoding)');

const report = affectivelyCascadeReport();
console.log('  ' + summarize(report));

const stages = schemaStages();
const expectedProduct = FIXED_SCHEMA_LAYERS.reduce((acc, l) => acc * l.dims, 1);

check(
  'overallRatio = product of fixed-schema dimension counts',
  overallRatio(stages) === expectedProduct,
  `overall=${overallRatio(stages)} expected=${expectedProduct}`,
);

check(
  'product law predicts joint config index space exactly (residual=1)',
  lawHolds(report) && Math.abs(residual(report) - 1) < 1e-9,
  `residual=${residual(report)}`,
);

// Append homomorphism on a real split of the cascade.
const left = stages.slice(0, 2);
const right = stages.slice(2);
check(
  'append homomorphism: overall(a++b) = overall(a)*overall(b)',
  homomorphismHolds(left, right),
  `${overallRatio(left)} * ${overallRatio(right)} = ${overallRatio(compose(left, right))}`,
);

check(
  'cascade carries the OSI keystone theorem id',
  CASCADE_THEOREM_IDS.includes('Gnosis.OSICompressorCascade.osi_is_the_jet_compressor'),
);

check(
  'all fixed-schema dimension counts are positive integers (byte-exact)',
  FIXED_SCHEMA_LAYERS.every((l) => Number.isInteger(l.dims) && l.dims > 0),
  FIXED_SCHEMA_LAYERS.map((l) => `${l.name}=${l.dims}`).join(', '),
);

console.log(
  `\nresult: ${failures === 0 ? 'PASS' : 'FAIL'} (${failures} failure${failures === 1 ? '' : 's'})`,
);
if (failures > 0) process.exit(1);
