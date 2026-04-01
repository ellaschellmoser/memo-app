// ── Utilities ─────────────────────────────────────────
function escHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const STATUS_LABELS = { rotation: 'In Rotation', retired: 'Not for Me', want: 'Want to Try' };
const EMOJI_MAP     = { skincare:'🧴', makeup:'💄', haircare:'💆', bodycare:'🛁', fragrance:'🌸', tools:'🪞' };

// ── Seed People & Their Shelves ────────────────────────
const ALL_PEOPLE = [
  {
    id: 'sophiek',
    name: 'Sophie K.',
    handle: '@sophiek',
    avatar: 'https://i.pravatar.cc/100?img=47',
    bio: 'Skincare obsessive. Dry skin type. Will try anything with ceramides.',
    type: 'friend',
    products: [
      { id:1, brand:'La Roche-Posay', name:'Cicaplast Baume B5', category:'skincare', status:'rotation', rating:5, note:'My holy grail for barrier repair. Nothing else comes close.' },
      { id:2, brand:'Paula\'s Choice', name:'2% BHA Liquid Exfoliant', category:'skincare', status:'rotation', rating:5, note:'Changed my skin completely. Use it every other night.' },
      { id:3, brand:'Tatcha', name:'The Dewy Skin Cream', category:'skincare', status:'retired', rating:3, note:'Beautiful texture but too rich for summer. Retired until winter.' },
      { id:4, brand:'Glow Recipe', name:'Watermelon Glow Niacinamide Dew Drops', category:'skincare', status:'want', rating:0, note:'On my list — love the formula concept.' },
      { id:5, brand:'Drunk Elephant', name:'Protini Polypeptide Cream', category:'skincare', status:'rotation', rating:4, note:'Plumping and calming. Good for travel since a little goes far.' },
    ],
  },
  {
    id: 'miaderm',
    name: 'Mia Derm',
    handle: '@miaderm',
    avatar: 'https://i.pravatar.cc/100?img=32',
    bio: 'Board-certified derm. Evidence-based recommendations only. No fluff.',
    type: 'influencer',
    products: [
      { id:1, brand:'EltaMD', name:'UV Clear SPF 46', category:'skincare', status:'rotation', rating:5, note:'The best SPF for acne-prone skin. I recommend this daily.' },
      { id:2, brand:'CeraVe', name:'Moisturizing Cream', category:'skincare', status:'rotation', rating:5, note:'No frills. Works. Every skin type. The gold standard.' },
      { id:3, brand:'Differin', name:'Adapalene Gel 0.1%', category:'skincare', status:'rotation', rating:5, note:'Retinoid without a prescription. Life-changing for most patients.' },
      { id:4, brand:'The Inkey List', name:'Tranexamic Acid Night Treatment', category:'skincare', status:'rotation', rating:4, note:'Solid option for hyperpigmentation. Results in 4-6 weeks.' },
      { id:5, brand:'Neutrogena', name:'Hydro Boost Water Gel', category:'skincare', status:'rotation', rating:4, note:'Lightweight, non-comedogenic, affordable. Hard to beat.' },
      { id:6, brand:'First Aid Beauty', name:'Ultra Repair Cream', category:'skincare', status:'retired', rating:3, note:'Good but CeraVe does the same job for a fraction of the price.' },
    ],
  },
  {
    id: 'rinat',
    name: 'Rina T.',
    handle: '@rinat',
    avatar: 'https://i.pravatar.cc/100?img=49',
    bio: 'Makeup collector & skintellectual. Dewy skin & bold lip forever.',
    type: 'friend',
    products: [
      { id:1, brand:'NARS', name:'Light Reflecting Foundation', category:'makeup', status:'rotation', rating:5, note:'The most natural finish I\'ve ever gotten. Shade Barcelona.' },
      { id:2, brand:'Rare Beauty', name:'Positive Light Tinted Moisturizer', category:'makeup', status:'rotation', rating:5, note:'Summer staple. SPF 20 + gorgeous glow.' },
      { id:3, brand:'Charlotte Tilbury', name:'Matte Revolution Lipstick', category:'makeup', status:'rotation', rating:4, note:'Pillow Talk is genuinely the perfect everyday lip colour.' },
      { id:4, brand:'Hourglass', name:'Vanish Seamless Finish Stick', category:'makeup', status:'retired', rating:2, note:'Too dry on me, emphasized texture. Gorgeous packaging though.' },
      { id:5, brand:'Milk Makeup', name:'Cooling Water Jelly Tint', category:'makeup', status:'want', rating:0, note:'Saw this on three different people this week. Need to try.' },
    ],
  },
  {
    id: 'jaker',
    name: 'Jake R.',
    handle: '@jaker',
    avatar: 'https://i.pravatar.cc/100?img=12',
    bio: 'Minimalist routine. 3 steps max. Sensitive combo skin.',
    type: 'friend',
    products: [
      { id:1, brand:'Kiehl\'s', name:'Ultra Facial Cream', category:'skincare', status:'rotation', rating:4, note:'Straightforward, no nonsense. Reliable every single time.' },
      { id:2, brand:'Cetaphil', name:'Gentle Skin Cleanser', category:'skincare', status:'rotation', rating:5, note:'Never irritates. I\'ve used this for 8 years.' },
      { id:3, brand:'Supergoop!', name:'Unseen Sunscreen SPF 40', category:'skincare', status:'rotation', rating:4, note:'Goes on completely invisible. No excuses not to wear SPF.' },
    ],
  },
  {
    id: 'lunav',
    name: 'Luna V.',
    handle: '@lunav',
    avatar: 'https://i.pravatar.cc/100?img=20',
    bio: 'Clean beauty advocate. If I can\'t pronounce it, I research it.',
    type: 'influencer',
    products: [
      { id:1, brand:'Tata Harper', name:'Resurfacing Serum', category:'skincare', status:'rotation', rating:5, note:'100% natural and genuinely works. Worth every penny.' },
      { id:2, brand:'ILIA',  name:'Super Serum Skin Tint SPF 40', category:'makeup', status:'rotation', rating:5, note:'My everything product. Clean, SPF, skin-care benefits. Perfect.' },
      { id:3, brand:'Herbivore', name:'Prism 20% AHA + BHA Exfoliating Glow Serum', category:'skincare', status:'rotation', rating:4, note:'Gentle enough for me but really effective. Love the glow.' },
      { id:4, brand:'RMS Beauty', name:'Un Cover-Up Concealer', category:'makeup', status:'rotation', rating:4, note:'Buildable and skin-like. Doesn\'t crease.' },
      { id:5, brand:'Osea', name:'Ocean Cleanser', category:'skincare', status:'want', rating:0, note:'Their seaweed serum changed my life so this is next.' },
      { id:6, brand:'Ere Perez', name:'Oat Milk Foundation', category:'makeup', status:'retired', rating:3, note:'Love the brand ethos, but oxidized on my skin tone. Retired.' },
    ],
  },
];

// ── State ─────────────────────────────────────────────
let following    = JSON.parse(localStorage.getItem(userKey('peachy-following')) || '["sophiek","miaderm","rinat","jaker","lunav"]');
let followers    = JSON.parse(localStorage.getItem(userKey('peachy-followers')) || '["sophiek","rinat","lunav"]');
let activeFilter        = 'all';
let activePerson        = null;
let viewerFilter        = 'all';
let viewerFilterCat     = '';
let viewerFilterRating  = 0;

function saveFollowing() {
  localStorage.setItem(userKey('peachy-following'), JSON.stringify(following));
}

// ── Render People Grid ────────────────────────────────
function renderPeople() {
  const grid = document.getElementById('people-grid');
  const list = ALL_PEOPLE.filter(p => {
    if (activeFilter === 'following') return following.includes(p.id);
    if (activeFilter === 'followers') return followers.includes(p.id);
    // 'all': union of following and followers
    return following.includes(p.id) || followers.includes(p.id);
  });

  if (list.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <div class="empty-icon">♡</div>
        <h3>Nobody here yet</h3>
        <p>Follow someone to see their library.</p>
        <button class="btn btn-primary" onclick="openFollowModal()">+ Follow Someone</button>
      </div>`;
    return;
  }

  grid.innerHTML = list.map(person => {
    const isActive = activePerson && activePerson.id === person.id;
    return `
      <div class="person-card ${isActive ? 'person-card--active' : ''}"
           onclick="viewShelf('${person.id}')">
        <div class="person-card-top">
          <div class="person-avatar"><img src="${person.avatar}" alt="${escHtml(person.name)}"></div>
          <div class="person-meta">
            <div class="person-name">${escHtml(person.name)}</div>
            <div class="person-handle">${escHtml(person.handle)}</div>
          </div>
        </div>
        <p class="person-bio">${escHtml(person.bio)}</p>
        <div class="person-footer">
          <span class="person-count">${person.products.length} products</span>
          <span class="person-cta">${isActive ? 'Viewing library ↓' : 'View library →'}</span>
        </div>
      </div>`;
  }).join('');
}

// ── Shelf Viewer ──────────────────────────────────────
function viewShelf(personId) {
  const person = ALL_PEOPLE.find(p => p.id === personId);
  if (!person) return;

  // Toggle off if same person clicked again
  if (activePerson && activePerson.id === personId) {
    closeShelf();
    return;
  }

  activePerson       = person;
  viewerFilter       = 'all';
  viewerFilterCat    = '';
  viewerFilterRating = 0;

  document.getElementById('viewer-avatar').innerHTML = `<img src="${person.avatar}" alt="${escHtml(person.name)}">`;
  document.getElementById('viewer-name').textContent   = person.name;
  document.getElementById('viewer-handle').textContent = `${person.handle} · ${person.products.length} products`;

  // Reset viewer filter tabs
  document.querySelectorAll('[data-vfilter]').forEach(t => t.classList.remove('active'));
  document.querySelector('[data-vfilter="all"]').classList.add('active');

  // Reset secondary filter dropdowns
  document.getElementById('viewer-filter-category').value = '';
  document.getElementById('viewer-filter-rating').value   = '0';

  renderViewerGrid();

  const viewer = document.getElementById('shelf-viewer');
  viewer.style.display = '';
  setTimeout(() => viewer.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);

  renderPeople(); // update active state on cards
}

function closeShelf() {
  activePerson = null;
  document.getElementById('shelf-viewer').style.display = 'none';
  renderPeople();
}

function applyViewerSecondaryFilters() {
  viewerFilterCat    = document.getElementById('viewer-filter-category').value;
  viewerFilterRating = parseInt(document.getElementById('viewer-filter-rating').value || '0');
  renderViewerGrid();
}

function renderViewerGrid() {
  const grid = document.getElementById('viewer-grid');
  if (!activePerson) return;

  const filtered = activePerson.products.filter(p => {
    if (viewerFilter !== 'all' && p.status !== viewerFilter) return false;
    if (viewerFilterCat && p.category !== viewerFilterCat) return false;
    if (viewerFilterRating > 0 && p.rating < viewerFilterRating) return false;
    return true;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1;padding:2rem">
        <h3>Nothing here</h3>
        <p>Try a different filter.</p>
      </div>`;
    return;
  }

  grid.innerHTML = filtered.map(p => `
    <div class="product-card product-card--readonly">
      <div class="card-img">
        <span class="card-emoji-fallback">${EMOJI_MAP[p.category] || '✦'}</span>
        <span class="status-badge status-${p.status}">${STATUS_LABELS[p.status]}</span>
      </div>
      <div class="card-body">
        <div class="card-brand">${escHtml(p.brand)}</div>
        <div class="card-name">${escHtml(p.name)}</div>
        <div class="stars">
          ${p.rating > 0
            ? [1,2,3,4,5].map(n => `<span class="star ${n <= p.rating ? 'filled' : ''}">★</span>`).join('')
            : '<span style="font-family:\'Helvetica Neue\',sans-serif;font-size:.78rem;color:var(--muted)">Not yet rated</span>'}
        </div>
        ${p.note ? `<div class="card-note">"${escHtml(p.note)}"</div>` : ''}
      </div>
    </div>
  `).join('');
}

// ── Viewer filter tabs ────────────────────────────────
document.querySelectorAll('[data-vfilter]').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('[data-vfilter]').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    viewerFilter = tab.dataset.vfilter;
    renderViewerGrid();
  });
});

// ── People filter tabs ────────────────────────────────
document.querySelectorAll('[data-filter]').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    activeFilter = tab.dataset.filter;
    renderPeople();
  });
});

// ── Follow Modal ──────────────────────────────────────
function openFollowModal() {
  document.getElementById('follow-input').value = '';
  document.getElementById('follow-modal').classList.add('open');
  document.getElementById('follow-input').focus();
}

function closeFollowModal() {
  document.getElementById('follow-modal').classList.remove('open');
}

document.getElementById('follow-modal').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeFollowModal();
});

document.getElementById('follow-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') followByHandle();
});

function followByHandle() {
  const raw    = document.getElementById('follow-input').value.trim().toLowerCase().replace(/^@/, '');
  const person = ALL_PEOPLE.find(p => p.id === raw);

  if (!person) {
    document.getElementById('follow-input').style.borderColor = '#c0392b';
    document.getElementById('follow-input').placeholder = 'Person not found — try @sophiek';
    setTimeout(() => {
      document.getElementById('follow-input').style.borderColor = '';
      document.getElementById('follow-input').placeholder = 'e.g. @sophiek';
    }, 2000);
    return;
  }

  if (!following.includes(person.id)) {
    following.push(person.id);
    saveFollowing();
  }

  closeFollowModal();
  renderPeople();
}

// ── Init ──────────────────────────────────────────────
renderPeople();
