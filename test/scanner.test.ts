import { describe, expect, it } from 'vitest';
import { scan } from '../src/index.js';

describe('scanner', () => {
  it('passes a well-structured AGENTS.md', () => {
    const result = scan({ root: 'test/fixtures/good', format: 'json', failOn: 'fail' });
    expect(result.score).toBe(100);
    expect(result.findings).toHaveLength(0);
  });

  it('finds dangerous and stale instructions', () => {
    const result = scan({ root: 'test/fixtures/bad', format: 'json', failOn: 'fail' });
    expect(result.findings.map((f) => f.id)).toContain('dangerous-instruction.system-override');
    expect(result.findings.map((f) => f.id)).toContain('dangerous-instruction.skip-tests');
    expect(result.findings.map((f) => f.id)).toContain('stale-command.missing-package-script');
  });

  it('reports missing instruction file when none found', () => {
    const result = scan({ root: 'test/fixtures/empty', format: 'json', failOn: 'fail' });
    expect(result.findings.map((f) => f.id)).toContain('instruction-file.missing');
    expect(result.score).toBeLessThan(100);
  });

  it('detects context bloat in large files', () => {
    const result = scan({ root: 'test/fixtures/bloated', format: 'json', failOn: 'fail' });
    expect(result.findings.map((f) => f.id)).toContain('context-bloat.too-long');
  });

  it('returns scanned instruction file paths', () => {
    const result = scan({ root: 'test/fixtures/good', format: 'json', failOn: 'fail' });
    expect(result.files.length).toBeGreaterThan(0);
    expect(result.files[0]).toContain('AGENTS.md');
  });

  it('calculates score correctly — more severe findings reduce more', () => {
    const badResult = scan({ root: 'test/fixtures/bad', format: 'json', failOn: 'fail' });
    const goodResult = scan({ root: 'test/fixtures/good', format: 'json', failOn: 'fail' });
    expect(goodResult.score).toBeGreaterThan(badResult.score);
  });
});

describe('required-sections rule', () => {
  it('does not warn when all sections are present', () => {
    const result = scan({ root: 'test/fixtures/good', format: 'json', failOn: 'fail' });
    const sectionFindings = result.findings.filter((f) => f.id.startsWith('required-section'));
    expect(sectionFindings).toHaveLength(0);
  });

  it('warns about missing sections in minimal file', () => {
    const result = scan({ root: 'test/fixtures/minimal', format: 'json', failOn: 'fail' });
    const sectionFindings = result.findings.filter((f) => f.id.startsWith('required-section'));
    expect(sectionFindings.length).toBeGreaterThan(0);
  });
});

describe('dangerous-instructions rule', () => {
  it('detects system-override language', () => {
    const result = scan({ root: 'test/fixtures/bad', format: 'json', failOn: 'fail' });
    expect(result.findings.map((f) => f.id)).toContain('dangerous-instruction.system-override');
  });

  it('detects skip-tests instruction', () => {
    const result = scan({ root: 'test/fixtures/bad', format: 'json', failOn: 'fail' });
    expect(result.findings.map((f) => f.id)).toContain('dangerous-instruction.skip-tests');
  });
});

describe('stale-commands rule', () => {
  it('detects referenced scripts not in package.json', () => {
    const result = scan({ root: 'test/fixtures/bad', format: 'json', failOn: 'fail' });
    expect(result.findings.map((f) => f.id)).toContain('stale-command.missing-package-script');
  });
});

describe('reporters', () => {
  it('renderText includes score and findings', async () => {
    const { renderText } = await import('../src/reporters.js');
    const result = scan({ root: 'test/fixtures/bad', format: 'text', failOn: 'fail' });
    const text = renderText(result);
    expect(text).toContain('agents-md-xray score:');
    expect(text).toContain('[FAIL]');
  });

  it('renderJson returns valid JSON', async () => {
    const { renderJson } = await import('../src/reporters.js');
    const result = scan({ root: 'test/fixtures/good', format: 'json', failOn: 'fail' });
    const parsed = JSON.parse(renderJson(result));
    expect(parsed.score).toBe(100);
    expect(parsed.findings).toHaveLength(0);
  });

  it('shouldFail returns true when findings match fail level', async () => {
    const { shouldFail } = await import('../src/reporters.js');
    const result = scan({ root: 'test/fixtures/bad', format: 'json', failOn: 'fail' });
    expect(shouldFail(result, 'fail')).toBe(true);
  });

  it('shouldFail returns false for clean repo', async () => {
    const { shouldFail } = await import('../src/reporters.js');
    const result = scan({ root: 'test/fixtures/good', format: 'json', failOn: 'fail' });
    expect(shouldFail(result, 'fail')).toBe(false);
  });
});
