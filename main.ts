// Warning Label for Humans: One Line, Big Laugh
// Writes our single-line warning label to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Node 22, stdlib only. Never removes the output directory itself —
// it only empties the directory's contents, because the grader's
// /output is a mount point.
import { readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "WARNING: This unit checks the time and immediately forgets it. Do not ask again.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

// Empty the output directory's contents, never the directory itself.
for (const entry of readdirSync(outDir)) {
  rmSync(join(outDir, entry), { recursive: true, force: true });
}

if (LINE.length < 1 || LINE.length > 160 || LINE.trim().length === 0) {
  throw new Error(`entry must be 1-160 non-blank chars, got ${LINE.length}`);
}

writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");

// Read-back check: the file on disk must be exactly the line, byte for byte.
import { readFileSync } from "node:fs";
const written = readFileSync(join(outDir, "entry.txt"), "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the intended line");
}
