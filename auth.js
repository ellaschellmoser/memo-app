// ── auth.js ────────────────────────────────────────────
// Auth disabled — all pages are publicly accessible.

function getSession()     { return { handle: 'guest' }; }
function requireAuth()    { return { handle: 'guest' }; }
function userKey(baseKey) { return baseKey; }
function logout()         { location.href = 'index.html'; }
