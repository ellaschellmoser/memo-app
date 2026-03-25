// ── Data ──────────────────────────────────────────────
const EMOJI_MAP = {
  skincare:  '🧴',
  makeup:    '💄',
  haircare:  '💆',
  bodycare:  '🛁',
  fragrance: '🌸',
  tools:     '🪞',
};

const STATUS_LABELS = {
  rotation:    'In Rotation',
  retired:     'Not for Me',
  want:        'Want to Try',
};

// Seed data so the shelf isn't empty on first load
const SEED_PRODUCTS = [
  {
    id: 1,
    brand: 'The Ordinary',
    name: 'Niacinamide 10% + Zinc 1%',
    category: 'skincare',
    status: 'rotation',
    rating: 4,
    note: 'Great for pores and texture. Takes about 3 weeks to really notice a difference.',
    imageUrl: 'images/the-ordinary-niacinamide.png',
    imageFetched: true,
    tags: ['niacinamide', 'zinc'],
  },
  {
    id: 2,
    brand: 'Rhode',
    name: 'Peptide Glazing Fluid',
    category: 'skincare',
    status: 'rotation',
    rating: 5,
    note: 'Obsessed. Gives the glossy glass skin look I\'ve been chasing for years.',
    imageUrl: 'images/rhode-peptide-glazing-fluid.webp',
    tags: ['peptides', 'hyaluronic acid'],
    imageFetched: true,
  },
  {
    id: 3,
    brand: 'Rare Beauty',
    name: 'Soft Pinch Liquid Blush',
    category: 'makeup',
    status: 'rotation',
    rating: 5,
    note: 'A tiny dot goes a very, very long way. Best blush I\'ve ever used.',
    imageUrl: 'images/rare-beauty-soft-pinch-blush.png',
    imageFetched: true,
  },
  {
    id: 4,
    brand: 'Olaplex',
    name: 'No.3 Hair Perfector',
    category: 'haircare',
    status: 'retired',
    rating: 3,
    note: 'It helped a lot at first but felt like it stopped working after a few months. May revisit.',
    imageUrl: 'images/olaplex-no3.png',
    tags: ['bond repair'],
    imageFetched: true,
  },
  {
    id: 5,
    brand: 'Summer Fridays',
    name: 'Jet Lag Mask',
    category: 'skincare',
    status: 'want',
    rating: 0,
    note: 'Been on my list forever. Love the ingredients — niacinamide + hyaluronic.',
    imageUrl: 'images/summer-fridays-jet-lag-mask.png',
    tags: ['niacinamide', 'hyaluronic acid'],
    imageFetched: true,
  },
  {
    id: 6,
    brand: 'Charlotte Tilbury',
    name: 'Flawless Filter',
    category: 'makeup',
    status: 'rotation',
    rating: 4,
    note: 'Perfect for a no-makeup-makeup look. Shade 3 is a perfect match for me.',
    imageUrl: 'images/charlotte-tilbury-flawless-filter.png',
    imageFetched: true,
  },
  // In Rotation additions
  {
    id: 7,
    brand: 'Laneige',
    name: 'Lip Sleeping Mask',
    category: 'bodycare',
    status: 'rotation',
    rating: 5,
    note: 'Wake up with the softest lips every single morning. Berry scent is everything.',
    imageUrl: 'images/laneige-lip-sleeping-mask.png',
    imageFetched: true,
  },
  {
    id: 8,
    brand: 'NARS',
    name: 'Sheer Glow Foundation',
    category: 'makeup',
    status: 'rotation',
    rating: 4,
    note: 'Buildable coverage without looking cakey. Syracuse is my holy grail shade.',
    imageUrl: 'images/nars-sheer-glow-foundation.png',
    imageFetched: true,
  },
  {
    id: 9,
    brand: 'Briogeo',
    name: "Don't Despair, Repair! Deep Conditioning Mask",
    category: 'haircare',
    status: 'rotation',
    rating: 4,
    note: 'My hair feels like silk after every use. Leave it on overnight for best results.',
    imageUrl: 'images/briogeo-dont-despair-repair.png',
    tags: ['ceramides'],
    imageFetched: true,
  },
  // Want to Try additions
  {
    id: 10,
    brand: 'Drunk Elephant',
    name: 'Protini Polypeptide Cream',
    category: 'skincare',
    status: 'want',
    rating: 0,
    note: 'Everyone raves about this. The peptide combo sounds incredible for barrier repair.',
    imageUrl: 'images/drunk-elephant-protini.png',
    tags: ['peptides', 'ceramides'],
    imageFetched: true,
  },
  {
    id: 11,
    brand: 'Westman Atelier',
    name: 'Vital Skin Foundation Stick',
    category: 'makeup',
    status: 'want',
    rating: 0,
    note: 'Seen it on so many "clean beauty" lists. The skin-like finish looks stunning.',
    imageUrl: 'images/westman-atelier-foundation.png',
    imageFetched: true,
  },
  {
    id: 12,
    brand: 'Sol de Janeiro',
    name: 'Brazilian Bum Bum Cream',
    category: 'bodycare',
    status: 'want',
    rating: 0,
    note: 'The smell alone has me convinced. Waiting for a sale before committing.',
    imageUrl: 'images/sol-de-janeiro-bum-bum.png',
    imageFetched: true,
  },
  // Retired additions
  {
    id: 16,
    brand: 'Sonsie',
    name: 'Niacinamide Face Serum',
    category: 'skincare',
    status: 'retired',
    rating: 1,
    note: 'Broke me out after the first week. Shame because the texture is lovely.',
    imageUrl: 'images/sonsie-super-serum.png',
    tags: ['niacinamide'],
    imageFetched: true,
  },
  {
    id: 13,
    brand: 'Mario Badescu',
    name: 'Drying Lotion',
    category: 'skincare',
    status: 'retired',
    rating: 2,
    note: 'Did work on surface breakouts but way too drying for my skin. Left little dry patches.',
    imageUrl: 'images/mario-badescu-drying-lotion.png',
    tags: ['salicylic acid'],
    imageFetched: true,
  },
  {
    id: 14,
    brand: 'Bumble and Bumble',
    name: "Hairdresser's Invisible Oil",
    category: 'haircare',
    status: 'retired',
    rating: 3,
    note: 'Smells amazing but built up fast and made my roots look greasy by day two.',
    imageUrl: 'images/bumble-hairdressers-oil.png',
    imageFetched: true,
  },
  {
    id: 15,
    brand: 'Fenty Beauty',
    name: 'Pro Filt\'r Instant Retouch Primer',
    category: 'makeup',
    status: 'retired',
    rating: 2,
    note: 'Pore-blurring effect was great but it pilled under my foundation. Not compatible.',
    imageUrl: 'images/fenty-beauty-pro-filtr-primer.png',
    imageFetched: true,
  },
];

// ── State ─────────────────────────────────────────────
let products = JSON.parse(localStorage.getItem('memo-products-v7') || 'null') || [...SEED_PRODUCTS];
// Sync seed images into stored products (additions and removals)
products.forEach(p => {
  const seed = SEED_PRODUCTS.find(s => s.id === p.id);
  if (!seed) return;
  if (seed.imageUrl) {
    p.imageUrl = seed.imageUrl;
    p.imageFetched = true;
  } else {
    p.imageUrl = null;
    p.imageFetched = false;
  }
});
let nextId   = Math.max(0, ...products.map(p => p.id)) + 1;
let activeFilter     = 'all';
let filterCategory   = '';
let filterRating     = 0;
let filterIngredient = '';
let pendingRating    = 0;

function save() {
  localStorage.setItem('memo-products-v7', JSON.stringify(products));
}

// ── Top 3 ─────────────────────────────────────────────
function renderTop3() {
  const grid = document.getElementById('top3-grid');
  if (!grid) return;

  const top3 = [...products]
    .filter(p => p.rating > 0)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  grid.innerHTML = top3.map((p, i) => `
    <div class="top3-card" onclick="location.href='product.html?id=${p.id}'">
      <div class="top3-rank">${i + 1}</div>
      <div class="top3-img">
        ${p.imageUrl
          ? `<img src="${escHtml(p.imageUrl)}" alt="${escHtml(p.brand)} ${escHtml(p.name)}"
                 onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
          : ''}
        <span class="card-emoji-fallback" style="${p.imageUrl ? 'display:none' : ''}">${EMOJI_MAP[p.category] || '✦'}</span>
      </div>
      <div class="top3-body">
        <div class="card-brand">${escHtml(p.brand)}</div>
        <div class="card-name">${escHtml(p.name)}</div>
        <div class="stars">
          ${[1,2,3,4,5].map(n => `<span class="star ${n <= p.rating ? 'filled' : ''}">★</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

// ── Render ────────────────────────────────────────────
function renderGrid() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  let filtered = activeFilter === 'all' ? products : products.filter(p => p.status === activeFilter);
  if (filterCategory)   filtered = filtered.filter(p => p.category === filterCategory);
  if (filterRating)     filtered = filtered.filter(p => p.rating >= filterRating);
  if (filterIngredient) filtered = filtered.filter(p => (p.tags || []).includes(filterIngredient));

  // Update count
  const countEl = document.getElementById('product-count');
  if (countEl) countEl.textContent = `${products.length} product${products.length !== 1 ? 's' : ''}`;

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">✦</div>
        <h3>${activeFilter === 'all' ? 'Your shelf is empty' : 'Nothing here yet'}</h3>
        <p>${activeFilter === 'all' ? 'Add your first product to get started.' : 'Try a different filter or add a product.'}</p>
        ${activeFilter === 'all' ? '<button class="btn btn-primary" onclick="openModal()">+ Add Product</button>' : ''}
      </div>`;
    return;
  }

  grid.innerHTML = filtered.map(p => `
    <div class="product-card" data-id="${p.id}" onclick="location.href='product.html?id=${p.id}'">
      <div class="card-img">
        ${p.imageUrl
          ? `<img class="card-product-img" src="${escHtml(p.imageUrl)}"
                 alt="${escHtml(p.brand)} ${escHtml(p.name)}"
                 onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
          : ''}
        <span class="card-emoji-fallback" style="${p.imageUrl ? 'display:none' : ''}">${EMOJI_MAP[p.category] || '✦'}</span>
        <span class="status-badge status-${p.status}">${STATUS_LABELS[p.status]}</span>
      </div>
      <div class="card-body">
        <div class="card-brand">${escHtml(p.brand)}</div>
        <div class="card-name">${escHtml(p.name)}</div>
        <div class="stars">
          ${[1,2,3,4,5].map(n =>
            `<span class="star ${n <= p.rating ? 'filled' : ''}"
                   onclick="event.stopPropagation(); setRatingInline(${p.id}, ${n})">★</span>`
          ).join('')}
        </div>
        ${p.note ? `<div class="card-note">"${escHtml(p.note)}"</div>` : ''}
      </div>
    </div>
  `).join('');
}

function escHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Filters ───────────────────────────────────────────
document.querySelectorAll('.filter-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    activeFilter = tab.dataset.filter;
    renderGrid();
  });
});

// ── Inline star rating on cards ───────────────────────
function setRatingInline(id, rating) {
  const p = products.find(p => p.id === id);
  if (!p) return;
  p.rating = rating;
  save();
  renderGrid();
}

// ── Modal ─────────────────────────────────────────────
function openModal() {
  pendingRating = 0;
  document.getElementById('input-brand').value    = '';
  document.getElementById('input-name').value     = '';
  document.getElementById('input-note').value     = '';
  document.getElementById('input-status').value   = 'rotation';
  document.getElementById('input-category').value = 'skincare';
  updateModalStars(0);
  document.getElementById('modal-overlay').classList.add('open');
  document.getElementById('input-brand').focus();
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
}

// Close on overlay click
document.getElementById('modal-overlay')?.addEventListener('click', e => {
  if (e.target === e.currentTarget) closeModal();
});

// Modal star picker
document.querySelectorAll('#modal-stars .star').forEach(star => {
  star.addEventListener('click', () => {
    pendingRating = parseInt(star.dataset.val);
    updateModalStars(pendingRating);
  });
  star.addEventListener('mouseenter', () => updateModalStars(parseInt(star.dataset.val)));
  star.addEventListener('mouseleave', () => updateModalStars(pendingRating));
});

function updateModalStars(n) {
  document.querySelectorAll('#modal-stars .star').forEach(s => {
    s.classList.toggle('filled', parseInt(s.dataset.val) <= n);
  });
}

// ── Add product ───────────────────────────────────────
function addProduct() {
  const brand = document.getElementById('input-brand').value.trim();
  const name  = document.getElementById('input-name').value.trim();

  if (!brand || !name) {
    document.getElementById(brand ? 'input-name' : 'input-brand').focus();
    return;
  }

  const product = {
    id:           nextId++,
    brand,
    name,
    category:     document.getElementById('input-category').value,
    status:       document.getElementById('input-status').value,
    rating:       pendingRating,
    note:         document.getElementById('input-note').value.trim(),
    imageUrl:     null,
    imageFetched: false,
  };

  products.unshift(product);
  save();
  closeModal();
  fetchProductImage(product); // fire-and-forget

  // Show the right filter
  if (activeFilter !== 'all' && activeFilter !== product.status) {
    document.querySelector('.filter-tab[data-filter="all"]').click();
  } else {
    renderGrid();
  }
}

// ── Image fetch (Open Beauty Facts) ───────────────────
async function fetchProductImage(product) {
  if (product.imageFetched) return;
  const query = encodeURIComponent(`${product.brand} ${product.name}`);
  const url   = `https://world.openbeautyfacts.org/cgi/search.pl?search_terms=${query}&action=process&json=1&page_size=3`;
  try {
    const res  = await fetch(url);
    if (!res.ok) throw new Error('non-200');
    const data = await res.json();
    const match = (data.products || []).find(p => p.image_url || p.image_front_url);
    product.imageUrl = match ? (match.image_url || match.image_front_url) : null;
  } catch (_) {
    product.imageUrl = null;
  } finally {
    product.imageFetched = true;
    save();
    renderGrid();
  }
}

// Allow Enter to submit in text fields
document.getElementById('input-name')?.addEventListener('keydown', e => {
  if (e.key === 'Enter') addProduct();
});

// ── Secondary filters ─────────────────────────────────
function applySecondaryFilters() {
  filterCategory   = document.getElementById('filter-category')?.value   || '';
  filterRating     = parseInt(document.getElementById('filter-rating')?.value || '0');
  filterIngredient = document.getElementById('filter-ingredient')?.value || '';
  renderGrid();
}

// ── Init ──────────────────────────────────────────────
renderTop3();
renderGrid();
products.forEach(p => { if (!p.imageFetched) fetchProductImage(p); });
