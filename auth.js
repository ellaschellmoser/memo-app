// ── auth.js ────────────────────────────────────────────
// Load this before any other script on every gated page.

const AUTH_SESSION_KEY  = 'peachy-session';
const AUTH_ACCOUNTS_KEY = 'peachy-accounts';

/** Returns { handle } or null */
function getSession() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_SESSION_KEY)) || null;
  } catch (_) {
    return null;
  }
}

/**
 * Call at the top of every gated page.
 * Redirects to login.html if no session exists, and throws so
 * subsequent scripts never run.
 */
function requireAuth() {
  const session = getSession();
  if (!session || !session.handle) {
    location.replace('login.html');
    throw new Error('Not authenticated — redirecting to login');
  }
  return session;
}

/**
 * Returns a per-user namespaced localStorage key.
 * e.g. userKey('peachy-products-v7') → 'peachy-products-v7-ella'
 */
function userKey(baseKey) {
  const session = getSession();
  const handle  = session ? session.handle.toLowerCase().replace(/^@/, '') : 'guest';
  return `${baseKey}-${handle}`;
}

/** Clears session and redirects to login.html */
function logout() {
  localStorage.removeItem(AUTH_SESSION_KEY);
  location.href = 'login.html';
}

/** Used only by login.html */
function _getAccounts() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_ACCOUNTS_KEY)) || [];
  } catch (_) {
    return [];
  }
}

function _saveAccounts(accounts) {
  localStorage.setItem(AUTH_ACCOUNTS_KEY, JSON.stringify(accounts));
}
