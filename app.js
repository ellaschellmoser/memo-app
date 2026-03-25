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

const FAV_TITLE_KEY = 'memo-fav-title';
function getFavTitle() {
  return localStorage.getItem(FAV_TITLE_KEY) || 'My Current Favorites';
}

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
    description: 'A water-based serum that reduces the appearance of blemishes and congestion. Niacinamide (Vitamin B3) at 10% works synergistically with Zinc PCA to visibly minimise shine and improve skin texture over time.',
    communityRatings: [
      { name: 'Sophie K.', handle: '@sophiek', avatar: 'https://i.pravatar.cc/100?img=47', rating: 5, comment: 'Holy grail for oily skin. Cheap, effective, no fuss — I always have a backup.' },
      { name: 'Rina T.', handle: '@rinat', avatar: 'https://i.pravatar.cc/100?img=49', rating: 4, comment: 'Really good for texture and pores. I layer it under SPF every morning.' },
      { name: 'Jake R.', handle: '@jaker', avatar: 'https://i.pravatar.cc/100?img=12', rating: 3, comment: 'Works fine but smells a bit clinical. Prefer something with a nicer texture.' },
    ],
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
    description: 'A lightweight, leave-on serum that plumps, smooths, and adds a glossy glow to the skin. Formulated with a blend of peptides and hyaluronic acid to support the skin barrier and lock in lasting moisture.',
    communityRatings: [
      { name: 'Mia Derm', handle: '@miaderm', avatar: 'https://i.pravatar.cc/100?img=32', rating: 5, comment: 'The glaze effect is unmatched. I wear it alone on no-makeup days.' },
      { name: 'Sophie K.', handle: '@sophiek', avatar: 'https://i.pravatar.cc/100?img=47', rating: 5, comment: 'Worth every penny. Skin looks so dewy and plump.' },
      { name: 'Luna V.', handle: '@lunav', avatar: 'https://i.pravatar.cc/100?img=20', rating: 4, comment: 'Love the glow but I add a heavier moisturiser on top in winter.' },
    ],
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
    description: 'A weightless liquid blush that blends seamlessly for a natural, lived-in flush. One small drop delivers buildable, long-wearing colour that never looks cakey or overdone.',
    communityRatings: [
      { name: 'Mia Derm', handle: '@miaderm', avatar: 'https://i.pravatar.cc/100?img=32', rating: 5, comment: 'Use the tiniest amount — seriously. Stunning payoff and stays all day.' },
      { name: 'Rina T.', handle: '@rinat', avatar: 'https://i.pravatar.cc/100?img=49', rating: 4, comment: 'Beautiful flush on the cheeks. Takes a second to blend but totally worth it.' },
      { name: 'Luna V.', handle: '@lunav', avatar: 'https://i.pravatar.cc/100?img=20', rating: 5, comment: 'My most-used makeup product. The Joy shade is perfect for everyday.' },
    ],
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
    description: 'An at-home bond-building treatment that reduces breakage and strengthens hair. The patented Bis-Aminopropyl Diglycol Dimaleate technology reconnects broken disulfide bonds for visibly healthier, stronger strands.',
    communityRatings: [
      { name: 'Sophie K.', handle: '@sophiek', avatar: 'https://i.pravatar.cc/100?img=47', rating: 4, comment: 'Transformed my bleached hair. I use it weekly and the difference is real.' },
      { name: 'Rina T.', handle: '@rinat', avatar: 'https://i.pravatar.cc/100?img=49', rating: 3, comment: 'Good for the first few months but I didn\'t notice much after that.' },
      { name: 'Mia Derm', handle: '@miaderm', avatar: 'https://i.pravatar.cc/100?img=32', rating: 2, comment: 'Didn\'t do much for my fine hair. Made it feel a bit heavy.' },
    ],
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
    description: 'A multi-use mask that soothes, moisturises, and brightens dull, tired skin. Wear it as an overnight mask, a daily moisturiser, or a primer under makeup — all three work beautifully.',
    communityRatings: [
      { name: 'Sophie K.', handle: '@sophiek', avatar: 'https://i.pravatar.cc/100?img=47', rating: 5, comment: 'I use this every single night. Skin looks incredible in the morning.' },
      { name: 'Mia Derm', handle: '@miaderm', avatar: 'https://i.pravatar.cc/100?img=32', rating: 4, comment: 'Great texture and hydration. A bit pricey but you don\'t need much.' },
      { name: 'Luna V.', handle: '@lunav', avatar: 'https://i.pravatar.cc/100?img=20', rating: 5, comment: 'My go-to for long-haul flights. Skin stays calm and plump the whole journey.' },
    ],
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
    description: 'A complexion booster, primer, and highlighter in one. The feather-light formula blurs imperfections and adds a naturally luminous, skin-like glow — wear it alone or layered under foundation.',
    communityRatings: [
      { name: 'Mia Derm', handle: '@miaderm', avatar: 'https://i.pravatar.cc/100?img=32', rating: 5, comment: 'The best "your-skin-but-better" product I\'ve ever tried. Always gets compliments.' },
      { name: 'Jake R.', handle: '@jaker', avatar: 'https://i.pravatar.cc/100?img=12', rating: 4, comment: 'Surprisingly good for men too. Just a little bit for a polished look.' },
      { name: 'Sophie K.', handle: '@sophiek', avatar: 'https://i.pravatar.cc/100?img=47', rating: 3, comment: 'Love the glow but a bit too dewy for oily skin without setting powder.' },
    ],
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
    description: 'An overnight lip mask with Moisture Wrap technology that deeply hydrates and softens lips while you sleep. Vitamin C and antioxidants restore the lip\'s natural moisture balance for noticeably softer lips by morning.',
    communityRatings: [
      { name: 'Sophie K.', handle: '@sophiek', avatar: 'https://i.pravatar.cc/100?img=47', rating: 5, comment: 'A cult product for a reason. I\'ve repurchased this more times than I can count.' },
      { name: 'Rina T.', handle: '@rinat', avatar: 'https://i.pravatar.cc/100?img=49', rating: 5, comment: 'My lips have never been softer. The berry scent makes it feel like a real treat.' },
      { name: 'Luna V.', handle: '@lunav', avatar: 'https://i.pravatar.cc/100?img=20', rating: 4, comment: 'Really effective. I\'d give it 5 stars if the pot weren\'t so unhygienic.' },
    ],
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
    description: 'A medium-coverage foundation with a natural satin finish that leaves skin looking luminous and healthy. Enriched with hyaluronic acid and antioxidants for comfortable, buildable wear that lasts up to 16 hours.',
    communityRatings: [
      { name: 'Mia Derm', handle: '@miaderm', avatar: 'https://i.pravatar.cc/100?img=32', rating: 4, comment: 'One of my all-time favourites. The finish is unmatched for a natural look.' },
      { name: 'Jake R.', handle: '@jaker', avatar: 'https://i.pravatar.cc/100?img=12', rating: 3, comment: 'Nice finish but oxidises slightly on my skin tone by midday.' },
      { name: 'Rina T.', handle: '@rinat', avatar: 'https://i.pravatar.cc/100?img=49', rating: 4, comment: 'Great for everyday wear. Doesn\'t emphasise dry patches at all.' },
    ],
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
    description: 'An intensive repair mask with B-vitamins, rosehip oil, algae extract, and ceramides that restores moisture and strengthens damaged hair. Vegan, cruelty-free, and safe for colour-treated hair.',
    communityRatings: [
      { name: 'Sophie K.', handle: '@sophiek', avatar: 'https://i.pravatar.cc/100?img=47', rating: 5, comment: 'Absolute lifesaver for damaged hair. Leave it on for 30 mins and your hair looks brand new.' },
      { name: 'Luna V.', handle: '@lunav', avatar: 'https://i.pravatar.cc/100?img=20', rating: 4, comment: 'Smells gorgeous and my curls are so much more defined after every use.' },
      { name: 'Rina T.', handle: '@rinat', avatar: 'https://i.pravatar.cc/100?img=49', rating: 3, comment: 'Works well but I\'ve tried cheaper masks with similar results.' },
    ],
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
    description: 'A protein-rich moisturiser formulated with signal peptides, growth factors, and amino acids to improve firmness, texture, and overall skin health. Lightweight enough for AM and PM use on all skin types.',
    communityRatings: [
      { name: 'Mia Derm', handle: '@miaderm', avatar: 'https://i.pravatar.cc/100?img=32', rating: 5, comment: 'The best moisturiser I\'ve ever used. Skin looks genuinely plumper within a week.' },
      { name: 'Sophie K.', handle: '@sophiek', avatar: 'https://i.pravatar.cc/100?img=47', rating: 5, comment: 'Worth the splurge. My skin barrier has never felt this healthy.' },
      { name: 'Luna V.', handle: '@lunav', avatar: 'https://i.pravatar.cc/100?img=20', rating: 4, comment: 'Lovely texture and sinks in fast. A little goes a long way.' },
      { name: 'Jake R.', handle: '@jaker', avatar: 'https://i.pravatar.cc/100?img=12', rating: 4, comment: 'Genuinely improved my skin texture. Not cheap but I\'d buy it again.' },
    ],
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
    description: 'A skin-improving foundation stick with buildable medium-to-full coverage and a natural, lit-from-within finish. Formulated with squalane and hyaluronic acid to nourish skin throughout the day.',
    communityRatings: [
      { name: 'Mia Derm', handle: '@miaderm', avatar: 'https://i.pravatar.cc/100?img=32', rating: 5, comment: 'The most skin-like coverage I\'ve ever found. Looks like your skin, perfected.' },
      { name: 'Luna V.', handle: '@lunav', avatar: 'https://i.pravatar.cc/100?img=20', rating: 5, comment: 'Worth every cent. Clean formula, beautiful finish, and it doesn\'t budge.' },
    ],
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
    description: 'A fast-absorbing, whipped body cream that leaves skin incredibly soft and scented with the iconic pistachio-caramel Cheirosa 62 fragrance. Guaraná and caffeine visibly firm and smooth skin with regular use.',
    communityRatings: [
      { name: 'Sophie K.', handle: '@sophiek', avatar: 'https://i.pravatar.cc/100?img=47', rating: 4, comment: 'The smell is absolutely addictive. Absorbs fast and skin feels silky all day.' },
      { name: 'Rina T.', handle: '@rinat', avatar: 'https://i.pravatar.cc/100?img=49', rating: 5, comment: 'I get compliments on how my skin smells every time I wear this. Pure happiness.' },
      { name: 'Jake R.', handle: '@jaker', avatar: 'https://i.pravatar.cc/100?img=12', rating: 5, comment: 'Bought it for my girlfriend, ended up using it myself. No regrets.' },
    ],
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
    description: 'A lightweight, fragrance-free serum with 10% niacinamide designed to minimise pores and improve skin clarity. Formulated without alcohol for sensitive skin compatibility.',
    communityRatings: [
      { name: 'Rina T.', handle: '@rinat', avatar: 'https://i.pravatar.cc/100?img=49', rating: 2, comment: 'Purging was intense and never really calmed down for me. Switched back to The Ordinary.' },
      { name: 'Jake R.', handle: '@jaker', avatar: 'https://i.pravatar.cc/100?img=12', rating: 3, comment: 'Decent results for me but nothing special compared to other niacinamides.' },
    ],
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
    description: 'A cult spot treatment formulated with salicylic acid, sulfur, and calamine to dry out active blemishes overnight. Apply directly onto spots with a cotton bud — do not shake the bottle.',
    communityRatings: [
      { name: 'Sophie K.', handle: '@sophiek', avatar: 'https://i.pravatar.cc/100?img=47', rating: 3, comment: 'Does work on whiteheads but left dry patches around the spot. Use sparingly.' },
      { name: 'Jake R.', handle: '@jaker', avatar: 'https://i.pravatar.cc/100?img=12', rating: 2, comment: 'Overdried my skin every time. Moved on to gentler spot treatments.' },
      { name: 'Luna V.', handle: '@lunav', avatar: 'https://i.pravatar.cc/100?img=20', rating: 4, comment: 'Old school but effective. Apply before bed and the spot is visibly smaller by morning.' },
    ],
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
    description: 'A lightweight blend of six oils — argan, coconut, maize, sweet almond, grape seed, and avocado — that tames frizz, adds shine, and protects against heat styling. Apply sparingly to damp or dry hair.',
    communityRatings: [
      { name: 'Mia Derm', handle: '@miaderm', avatar: 'https://i.pravatar.cc/100?img=32', rating: 4, comment: 'Amazing for dry, thick hair. Smells incredible and controls frizz beautifully.' },
      { name: 'Rina T.', handle: '@rinat', avatar: 'https://i.pravatar.cc/100?img=49', rating: 2, comment: 'Too heavy for fine hair. Roots looked greasy within hours.' },
      { name: 'Sophie K.', handle: '@sophiek', avatar: 'https://i.pravatar.cc/100?img=47', rating: 3, comment: 'Works well on the ends but I have to be careful not to get it near my roots.' },
    ],
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
    description: 'A pore-minimizing, matte-finish primer that blurs imperfections and extends foundation wear. The lightweight silicone formula creates a smooth canvas and controls excess shine throughout the day.',
    communityRatings: [
      { name: 'Jake R.', handle: '@jaker', avatar: 'https://i.pravatar.cc/100?img=12', rating: 3, comment: 'Good pore-blurring effect but needs to be paired with the right foundation.' },
      { name: 'Luna V.', handle: '@lunav', avatar: 'https://i.pravatar.cc/100?img=20', rating: 3, comment: 'Pilling was an issue for me too. Great worn alone though.' },
      { name: 'Rina T.', handle: '@rinat', avatar: 'https://i.pravatar.cc/100?img=49', rating: 2, comment: 'Didn\'t play well with my foundation at all. Disappointing given the hype.' },
    ],
  },
];

// ── State ─────────────────────────────────────────────
let products = JSON.parse(localStorage.getItem('memo-products-v7') || 'null') || [...SEED_PRODUCTS];
// Sync seed data into stored products (images, descriptions, community ratings)
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
  p.description      = seed.description      || null;
  p.communityRatings = seed.communityRatings || [];
});
let nextId   = Math.max(0, ...products.map(p => p.id)) + 1;
let activeFilter     = 'all';
let filterCategory   = '';
let filterRating     = 0;
let filterIngredient = '';
let pendingRating    = 0;
let pendingImageUrl  = null;

function save() {
  localStorage.setItem('memo-products-v7', JSON.stringify(products));
}

// ── Top 3 ─────────────────────────────────────────────
function renderTop3() {
  const grid    = document.getElementById('top3-grid');
  const titleEl = document.getElementById('fav-title-text');
  if (!grid) return;
  if (titleEl) titleEl.textContent = getFavTitle();

  grid.innerHTML = [1, 2, 3].map(slot => {
    const p = products.find(p => p.favoriteSlot === slot);
    if (!p) return `
      <div class="top3-card top3-card-empty" onclick="/* no-op */">
        <div class="top3-rank top3-rank-empty">${slot}</div>
        <div class="top3-body">
          <div class="top3-empty-hint">No favorite set — open a product and pin it here</div>
        </div>
      </div>`;
    return `
      <div class="top3-card" onclick="location.href='product.html?id=${p.id}'">
        <div class="top3-rank">${slot}</div>
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
      </div>`;
  }).join('');
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
  pendingRating   = 0;
  pendingImageUrl = null;
  document.getElementById('input-brand').value     = '';
  document.getElementById('input-name').value      = '';
  document.getElementById('input-note').value      = '';
  document.getElementById('input-status').value    = 'rotation';
  document.getElementById('input-category').value  = 'skincare';
  document.getElementById('input-image-url').value = '';
  document.getElementById('input-image-file').value = '';
  setImgPreview(null);
  // Reset to URL tab
  document.querySelectorAll('.img-tab').forEach(t => t.classList.remove('active'));
  document.querySelector('.img-tab[data-img-tab="url"]').classList.add('active');
  document.getElementById('img-pane-url').style.display    = '';
  document.getElementById('img-pane-upload').style.display = 'none';
  updateModalStars(0);
  document.getElementById('modal-overlay').classList.add('open');
  document.getElementById('input-brand').focus();
}

function setImgPreview(src) {
  const wrap = document.getElementById('image-preview');
  const img  = document.getElementById('image-preview-img');
  if (src) { img.src = src; wrap.style.display = ''; }
  else      { img.src = ''; wrap.style.display = 'none'; }
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

// ── Image input tabs ──────────────────────────────────
document.querySelectorAll('.img-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.img-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const which = tab.dataset.imgTab;
    document.getElementById('img-pane-url').style.display    = which === 'url'    ? '' : 'none';
    document.getElementById('img-pane-upload').style.display = which === 'upload' ? '' : 'none';
    pendingImageUrl = null;
    setImgPreview(null);
  });
});

// URL input → live preview on blur
document.getElementById('input-image-url')?.addEventListener('blur', () => {
  const val = document.getElementById('input-image-url').value.trim();
  pendingImageUrl = val || null;
  setImgPreview(val || null);
});

// File input → convert to data URL
document.getElementById('input-image-file')?.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) { pendingImageUrl = null; setImgPreview(null); return; }
  const reader = new FileReader();
  reader.onload = ev => {
    pendingImageUrl = ev.target.result;
    setImgPreview(ev.target.result);
    // Update label to show filename
    document.querySelector('.file-upload-label').textContent = file.name;
  };
  reader.readAsDataURL(file);
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
    imageUrl:     pendingImageUrl || null,
    imageFetched: !!pendingImageUrl,
  };

  products.unshift(product);
  save();
  closeModal();
  if (!product.imageFetched) fetchProductImage(product); // fire-and-forget

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

// ── Editable favourites title ─────────────────────────
const favTitleBtn   = document.getElementById('fav-title-btn');
const favTitleText  = document.getElementById('fav-title-text');
const favTitleInput = document.getElementById('fav-title-input');

if (favTitleBtn) {
  favTitleBtn.addEventListener('click', () => {
    favTitleInput.value = getFavTitle();
    favTitleText.style.display  = 'none';
    favTitleBtn.style.display   = 'none';
    favTitleInput.style.display = '';
    favTitleInput.focus();
    favTitleInput.select();
  });

  function commitFavTitle() {
    const val = favTitleInput.value.trim();
    if (val) localStorage.setItem(FAV_TITLE_KEY, val);
    favTitleText.textContent    = getFavTitle();
    favTitleText.style.display  = '';
    favTitleBtn.style.display   = '';
    favTitleInput.style.display = 'none';
  }

  favTitleInput.addEventListener('blur', commitFavTitle);
  favTitleInput.addEventListener('keydown', e => {
    if (e.key === 'Enter')  { e.preventDefault(); commitFavTitle(); }
    if (e.key === 'Escape') {
      favTitleText.style.display  = '';
      favTitleBtn.style.display   = '';
      favTitleInput.style.display = 'none';
    }
  });
}

// ── Init ──────────────────────────────────────────────
renderTop3();
renderGrid();
products.forEach(p => { if (!p.imageFetched) fetchProductImage(p); });
