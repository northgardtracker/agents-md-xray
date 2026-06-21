import type { Finding } from '../types.js';

export function contextBloat(file: string, text: string): Finding[] {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  if (words <= 900) return [];
  return [{
    id: 'context-bloat.too-long',
    severity: words > 1600 ? 'fail' : 'warn',
    title: 'Instruction file may be too large',
    message: `This file has about ${words} words. Long agent instructions increase token cost and can hide conflicts.`,
    file,
    remediation: 'Move long reference material into docs/ and keep AGENTS.md focused on commands, boundaries, and invariants.'
  }];
}
