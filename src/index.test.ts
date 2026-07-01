import { describe, expect, it } from 'bun:test';

import { createVoidBoundary, temperament } from './index';

describe('aeon-affectively exports', () => {
  it('exposes affective layers and void primitives', () => {
    expect(typeof createVoidBoundary).toBe('function');
    expect(typeof temperament).toBe('object');
  });
});
