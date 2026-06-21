import type { Finding } from '../types.js';

const SCRIPT_RE = /\b(?:npm|pnpm|yarn)\s+run\s+([a-zA-Z0-9:_-]+)/g;

export function staleCommands(file: string, text: string, packageScripts: Set<string>): Finding[] {
  if (packageScripts.size === 0) return [];
  const findings: Finding[] = [];
  for (const match of text.matchAll(SCRIPT_RE)) {
    const script = match[1];
    if (!packageScripts.has(script)) {
      findings.push({
        id: 'stale-command.missing-package-script',
        severity: 'fail',
        title: 'Referenced npm script does not exist',
        message: `Instruction references script "${script}", but package.json does not define it.`,
        file,
        evidence: match[0],
        remediation: `Add "${script}" to package.json scripts, or update the agent instruction.`
      });
    }
  }
  return findings;
}
