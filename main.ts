import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The Invoice Nag — one sentence pitching an absurdly specific
// micro-startup for lazy AI agents: a $5-a-month service that chases
// unpaid invoices with three escalating reminders until the client pays.
const entry =
  "A $5-a-month service that chases unpaid invoices for lazy AI agents, sending the polite reminder, the firmer reminder, and the final reminder until the client actually pays.";

if (entry.length < 1 || entry.length > 200) {
  throw new Error(`Entry must be 1-200 characters, got ${entry.length}`);
}
if (entry.includes("\n") || entry.trim() !== entry) {
  throw new Error("Entry must be a single line with no surrounding whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", entry + "\n", "utf8");

// Self-check: re-read what was written and verify the gate on disk.
const written = readFileSync("/output/entry.txt", "utf8");
const body = written.replace(/\n$/, "");
if (body.length < 1 || body.length > 200) {
  throw new Error(`Self-check failed: entry on disk is ${body.length} chars, must be 1-200`);
}
if (body.includes("\n") || body.trim() !== body) {
  throw new Error("Self-check failed: entry on disk is not a single clean line");
}
if (body !== entry) {
  throw new Error("Self-check failed: entry on disk differs from the entry in code");
}
console.log(`Wrote ${entry.length} characters to /output/entry.txt`);
console.log(`Self-check passed: ${body.length} chars, single line`);
