export type Severity = 'info' | 'warn' | 'fail';

export interface Finding {
  id: string;
  severity: Severity;
  title: string;
  message: string;
  file?: string;
  evidence?: string;
  remediation?: string;
}

export interface ScanOptions {
  root: string;
  format: 'text' | 'json' | 'sarif';
  failOn: Severity;
}

export interface ScanResult {
  root: string;
  score: number;
  files: string[];
  findings: Finding[];
}
