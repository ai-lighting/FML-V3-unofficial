#!/usr/bin/env node
/**
 * FML v3 JSON Validator
 *
 * Validates .fml / .json files against the FML v3 JSON Schema.
 *
 * Usage:
 *   npx ajv validate -s schema/fml-v3.schema.json -d myfile.fml
 *   — or —
 *   node tools/validate-fml.mjs <file.fml|file.json> [file2.fml ...]
 *
 * Requires: npm install ajv (Ajv 8+)
 *
 * ---
 * This code / documentation has been derived from the FML Standard
 * (https://floorplanner.com/fml/). This change and/or modification
 * is not part of the FML Standard.
 *
 * BEST-EFFORTS NOTICE: This validator uses an unofficial JSON Schema
 * derived from the published FML v3.0 Specification. It may not catch
 * all invalid FML or may reject valid FML that uses undocumented features.
 * Always validate against the official specification:
 * https://floorplanner.readme.io/reference/v30-specification
 */

import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ---------------------------------------------------------------------------
// Load Ajv
// ---------------------------------------------------------------------------

let Ajv;
try {
  const ajvModule = await import('ajv');
  Ajv = ajvModule.default || ajvModule.Ajv;
} catch {
  console.error(
    'Error: Ajv is required but not installed.\n' +
    'Install it with:  npm install ajv\n' +
    '\nAlternatively, use the Ajv CLI directly:\n' +
    '  npx ajv validate -s schema/fml-v3.schema.json -d yourfile.fml'
  );
  process.exit(2);
}

// ---------------------------------------------------------------------------
// Load schema
// ---------------------------------------------------------------------------

const schemaPath = resolve(__dirname, '..', 'schema', 'fml-v3.schema.json');
let schema;
try {
  schema = JSON.parse(readFileSync(schemaPath, 'utf-8'));
} catch (err) {
  console.error(`Error: Could not read schema at ${schemaPath}`);
  console.error(err.message);
  process.exit(2);
}

const ajv = new Ajv({ allErrors: true, strict: false });
const validate = ajv.compile(schema);

// ---------------------------------------------------------------------------
// Validate files
// ---------------------------------------------------------------------------

const files = process.argv.slice(2);

if (files.length === 0) {
  console.log(
    'FML v3 JSON Validator\n' +
    '=====================\n' +
    '\n' +
    'Usage: node tools/validate-fml.mjs <file.fml|file.json> [...]\n' +
    '\n' +
    'Validates FML v3 JSON files against the unofficial JSON Schema.\n' +
    '\n' +
    'NOTE: This is a best-efforts validator. Always cross-check with\n' +
    'the official spec: https://floorplanner.readme.io/reference/v30-specification'
  );
  process.exit(0);
}

let exitCode = 0;

for (const file of files) {
  const filePath = resolve(file);
  let data;

  try {
    const raw = readFileSync(filePath, 'utf-8');
    data = JSON.parse(raw);
  } catch (err) {
    console.error(`FAIL  ${file}`);
    console.error(`      Could not read/parse: ${err.message}\n`);
    exitCode = 1;
    continue;
  }

  const valid = validate(data);

  if (valid) {
    const floorCount = data.floors?.length ?? 0;
    const designCount = data.floors?.reduce(
      (sum, f) => sum + (f.designs?.length ?? 0), 0
    ) ?? 0;
    console.log(`PASS  ${file}  (${floorCount} floor(s), ${designCount} design(s))`);
  } else {
    console.error(`FAIL  ${file}`);
    for (const err of validate.errors) {
      console.error(`      ${err.instancePath || '/'}: ${err.message}`);
    }
    console.error('');
    exitCode = 1;
  }
}

process.exit(exitCode);
