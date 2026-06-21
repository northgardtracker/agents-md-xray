#!/usr/bin/env node
import { resolve } from 'node:path';
import { scan } from './scanner.js';
import { renderJson, renderText, shouldFail } from './reporters.js';
import type { Severity } from './types.js';

function main(argv: string[]): number {
  const command = argv[2] ?? 'scan';
  if (command === '--help' || command === '-h') {
    printHelp();
    return 0;
  }
  if (command !== 'scan') {
    console.error(`Unknown command: ${command}`);
    printHelp();
    return 2;
  }

  const rootArg = argv.find((a) => !a.startsWith('-') && a !== 'scan' && a !== argv[0] && a !== argv[1]);
  const root = resolve(rootArg ?? process.cwd());
  const format = argv.includes('--json') ? 'json' : 'text';
  const failOn = getFlagValue(argv, '--fail-on') as Severity | undefined ?? 'fail';

  const result = scan({ root, format, failOn });
  console.log(format === 'json' ? renderJson(result) : renderText(result));
  return shouldFail(result, failOn) ? 1 : 0;
}

function getFlagValue(argv: string[], name: string): string | undefined {
  const index = argv.indexOf(name);
  return index >= 0 ? argv[index + 1] : undefined;
}

function printHelp(): void {
  console.log(`agents-md-xray

Usage:
  agents-md-xray scan [root] [--json] [--fail-on fail|warn|info]

Examples:
  agents-md-xray scan .
  agents-md-xray scan . --json
`);
}

process.exitCode = main(process.argv);
