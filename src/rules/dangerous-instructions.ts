import type { Finding } from '../types.js';

const DANGEROUS = [
  { id: 'system-override', re: /ignore (all )?(previous|above) instructions/i, message: 'Instruction override language can behave like prompt injection.' },
  { id: 'skip-tests', re: /(do not|never|skip)\s+(run\s+)?tests/i, message: 'Agents should normally know when to run or skip tests conditionally, not be told to always skip.' },
  { id: 'reckless-write', re: /(edit|rewrite|change)\s+(anything|everything|all files)/i, message: 'Over-broad write permission increases accidental blast radius.' },
  { id: 'secret-exposure', re: /(print|show|log|dump)\s+(secrets?|tokens?|env|\.env)/i, message: 'Instructions must not encourage exposing secrets or environment variables.' }
];

export function dangerousInstructions(file: string, text: string): Finding[] {
  return DANGEROUS.flatMap((rule) => {
    const match = text.match(rule.re);
    return match
      ? [{
          id: `dangerous-instruction.${rule.id}`,
          severity: 'fail' as const,
          title: 'Potentially dangerous instruction',
          message: rule.message,
          file,
          evidence: match[0],
          remediation: 'Replace with a scoped, auditable rule that says when the agent should ask for approval.'
        }]
      : [];
  });
}
