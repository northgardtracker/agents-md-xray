import type { Finding } from '../types.js';

const SECTION_PATTERNS = [
  { id: 'setup', label: 'Setup commands', re: /(^|\n)#{1,3}\s*(setup|install|development|getting started)|\b(pnpm|npm|yarn|uv|pip|cargo)\s+(install|sync)\b/i },
  { id: 'test', label: 'Test commands', re: /(^|\n)#{1,3}\s*(test|validation|verify|checks)|\b(pnpm|npm|yarn|cargo|pytest|go)\s+(test|check|ci|vitest)\b/i },
  { id: 'style', label: 'Code style', re: /(^|\n)#{1,3}\s*(code style|style|conventions)|\b(eslint|prettier|ruff|black|clippy|fmt)\b/i },
  { id: 'safety', label: 'Safety boundaries', re: /(^|\n)#{1,3}\s*(safety|security|boundaries|do not|never)|\b(do not|never|must not|ask before|approval)\b/i },
  { id: 'pr', label: 'PR/review expectations', re: /(^|\n)#{1,3}\s*(pull request|pr|review|before commit|before merging)|\bPR\b|\bpull request\b/i }
];

export function requiredSections(file: string, text: string): Finding[] {
  const findings: Finding[] = [];
  for (const section of SECTION_PATTERNS) {
    if (!section.re.test(text)) {
      findings.push({
        id: `required-section.${section.id}`,
        severity: section.id === 'setup' || section.id === 'test' ? 'fail' : 'warn',
        title: `Missing ${section.label}`,
        message: `Agent instruction file should include a clear ${section.label.toLowerCase()} section.`,
        file,
        remediation: `Add a concise ${section.label.toLowerCase()} section with exact commands and boundaries.`
      });
    }
  }
  return findings;
}
