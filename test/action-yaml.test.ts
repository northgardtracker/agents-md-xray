import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// Guards the composite action's scan step against a real reliability bug:
// redirecting `npx`/`npm` stdout into the results file can prepend install or
// resolution output to the scanner JSON, which then fails to parse in
// set-outputs.mjs / pr-comment.mjs / enforce-threshold.mjs. The fix installs the
// CLI into an isolated temp dir and redirects only the scanner's own stdout.
const actionYml = readFileSync(resolve("action.yml"), "utf8");

describe("action.yml scan step (stdout/JSON contamination guard)", () => {
  it("installs the published CLI into an isolated temp directory", () => {
    expect(actionYml).toMatch(
      /npm --prefix "\$TOOL_DIR" install[^\n]*\brootmark\b/,
    );
  });

  it("runs the installed CLI binary (not npx) to produce the JSON", () => {
    expect(actionYml).toMatch(
      /"\$TOOL_DIR\/node_modules\/\.bin\/rootmark" verify "\$ROOT" --format json --fail-on off > "\$RESULTS_JSON"/,
    );
  });

  it("never redirects a package manager into the results file", () => {
    expect(actionYml).not.toMatch(/npx[^\n]*>\s*"\$RESULTS_JSON"/);
    expect(actionYml).not.toMatch(/npm[^\n]*>\s*"\$RESULTS_JSON"/);
  });

  it("still collects findings with --fail-on off", () => {
    expect(actionYml).toMatch(/--fail-on off/);
  });

  it("still exposes the json-path step output", () => {
    expect(actionYml).toMatch(
      /echo "json-path=\$RESULTS_JSON" >> "\$GITHUB_OUTPUT"/,
    );
  });
});
