// ── Profile ───────────────────────────────────────────
const DEFAULT_PROFILE = {
  name: 'Your Name',
  handle: '@handle',
  bio: 'Beauty lover. Building my library one product at a time.',
};

function loadProfile() {
  return JSON.parse(localStorage.getItem(userKey('peachy-profile')) || JSON.stringify(DEFAULT_PROFILE));
}

function saveProfileData(data) {
  localStorage.setItem(userKey('peachy-profile'), JSON.stringify(data));
}

function renderProfile() {
  const p = loadProfile();
  document.getElementById('account-name').textContent   = p.name;
  document.getElementById('account-handle').textContent = p.handle;
  document.getElementById('account-bio').textContent    = p.bio;
}

// ── Stats ─────────────────────────────────────────────
function renderStats() {
  const products = JSON.parse(localStorage.getItem(userKey('peachy-products-v7')) || '[]');
  document.getElementById('stat-rated').textContent    = products.filter(p => p.rating > 0).length;
  document.getElementById('stat-rotation').textContent = products.filter(p => p.status === 'rotation').length;
  document.getElementById('stat-want').textContent     = products.filter(p => p.status === 'want').length;
  document.getElementById('stat-retired').textContent  = products.filter(p => p.status === 'retired').length;
}

// ── Preferences ───────────────────────────────────────
function loadPrefs() {
  const prefs = JSON.parse(localStorage.getItem(userKey('peachy-prefs')) || '{}');
  if (prefs.skin)       document.getElementById('pref-skin').value       = prefs.skin;
  if (prefs.concerns)   document.getElementById('pref-concerns').value   = prefs.concerns;
  if (prefs.categories) document.getElementById('pref-categories').value = prefs.categories;
}

function savePrefs() {
  localStorage.setItem(userKey('peachy-prefs'), JSON.stringify({
    skin:       document.getElementById('pref-skin').value,
    concerns:   document.getElementById('pref-concerns').value,
    categories: document.getElementById('pref-categories').value,
  }));
  const confirm = document.getElementById('prefs-saved');
  confirm.style.display = '';
  setTimeout(() => { confirm.style.display = 'none'; }, 2000);
}

// ── Edit Profile Modal ────────────────────────────────
function openEditProfile() {
  const p = loadProfile();
  document.getElementById('edit-name').value   = p.name;
  document.getElementById('edit-handle').value = p.handle;
  document.getElementById('edit-bio').value    = p.bio;
  document.getElementById('edit-profile-modal').classList.add('open');
}

function closeEditProfile() {
  document.getElementById('edit-profile-modal').classList.remove('open');
}

function saveProfile() {
  saveProfileData({
    name:   document.getElementById('edit-name').value.trim()   || DEFAULT_PROFILE.name,
    handle: document.getElementById('edit-handle').value.trim() || DEFAULT_PROFILE.handle,
    bio:    document.getElementById('edit-bio').value.trim()    || DEFAULT_PROFILE.bio,
  });
  renderProfile();
  closeEditProfile();
}

document.getElementById('edit-profile-modal').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeEditProfile();
});

// ── Init ──────────────────────────────────────────────
renderProfile();
renderStats();
loadPrefs();
