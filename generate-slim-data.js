/**
 * generate-slim-data.js
 *
 * Generates frontend/public/jeopardy_slim.json from jeopardy_pretty.json.
 * Run once from the project root before starting the app:
 *   node generate-slim-data.js
 *
 * Optimisations applied:
 *   - Only the five fields the app needs are kept: q, a, cat, dd, val, round
 *   - `dd` is omitted when false (app treats missing as false)
 *   - `val` is omitted when 0 (final-round clues; app treats missing as 0)
 *   - `round` is encoded as a single char: "j" | "d" | "f"
 *   - Output is a single minified line (no whitespace)
 *   - cluebase.js decodes the short field names back to full names at runtime
 */

const fs   = require("fs");
const path = require("path");

const inputPath  = path.join(__dirname, "frontend", "public", "jeopardy_pretty.json");
const outputPath = path.join(__dirname, "frontend", "public", "jeopardy_slim.json");

console.log("Reading source JSON...");
const data = JSON.parse(fs.readFileSync(inputPath, "utf8"));

const allClues = [];
let ddCount = 0;
let finalCount = 0;

// Round encoded as single char to shave bytes on every record
const ROUND_CODE = { jeopardy: "j", double: "d", final: "f" };

Object.values(data).forEach((episode) => {
  const addClues = (clues, round) => {
    if (!clues) return;
    clues.forEach((clue) => {
      if (!clue.q || !clue.a || !clue.cat) return;

      const rec = {
        q:   clue.q,
        a:   clue.a,
        cat: clue.cat,
        r:   ROUND_CODE[round],   // "j" | "d" | "f"  (saves ~4 chars per record vs "round")
      };

      // Omit dd when false — saves ~9 chars per non-DD record
      if (clue.dd === true) { rec.dd = 1; ddCount++; }

      // Omit val when 0 — final-round clues always have val 0
      if (clue.val) rec.val = clue.val;

      if (round === "final") finalCount++;

      allClues.push(rec);
    });
  };

  addClues(episode.jeopardy, "jeopardy");
  addClues(episode.double,   "double");
  addClues(episode.final,    "final");
});

console.log(`Total clues:             ${allClues.length}`);
console.log(`Daily Doubles (dd=1):    ${ddCount}`);
console.log(`Final Jeopardy clues:    ${finalCount}`);

// Single-line minified output — no pretty-printing whitespace
fs.writeFileSync(outputPath, JSON.stringify(allClues));

const inputMB  = (fs.statSync(inputPath).size  / 1024 / 1024).toFixed(1);
const outputMB = (fs.statSync(outputPath).size / 1024 / 1024).toFixed(1);
console.log(`Done!  ${inputMB} MB  →  ${outputMB} MB`);
console.log(`Output: ${outputPath}`);
