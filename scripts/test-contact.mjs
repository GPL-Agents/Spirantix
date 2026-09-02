import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const handler = require(resolve(root, 'api/contact.js'));

function responseRecorder() {
  return {
    statusCode: 200,
    headers: {},
    payload: null,
    ended: false,
    setHeader(name, value) { this.headers[name] = value; },
    status(code) { this.statusCode = code; return this; },
    json(value) { this.payload = value; return this; },
    end() { this.ended = true; return this; }
  };
}

async function run(req) {
  const res = responseRecorder();
  await handler(req, res);
  return res;
}

let result = await run({ method: 'OPTIONS' });
assert.equal(result.statusCode, 204);
assert.equal(result.headers.Allow, 'POST');

result = await run({ method: 'GET' });
assert.equal(result.statusCode, 405);

result = await run({ method: 'POST', body: { name: 'Test', email: 'not-an-email' } });
assert.equal(result.statusCode, 400);
assert.equal(result.payload.ok, false);

result = await run({ method: 'POST', body: { website: 'bot.example', name: '', email: '' } });
assert.equal(result.statusCode, 200);
assert.equal(result.payload.ok, true);

console.log('Contact endpoint validation and honeypot tests passed.');
