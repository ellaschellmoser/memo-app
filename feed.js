// ── Utilities ─────────────────────────────────────────
function escHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function stars(n) {
  return [1,2,3,4,5].map(i =>
    `<span class="star ${i <= n ? 'filled' : ''}">★</span>`
  ).join('');
}

// ── Feed Posts ────────────────────────────────────────
const POSTS = [
  {
    type: 'added',
    user: { name: 'Sophie K.', handle: '@sophiek', avatar: 'https://i.pravatar.cc/100?img=47' },
    time: '2m ago',
    product: { brand: 'Drunk Elephant', name: 'B-Hydra Intensive Hydration Serum', category: 'skincare', emoji: '🧴' },
    status: 'want',
    caption: 'Finally adding this to my want list after seeing it everywhere this month.',
  },
  {
    type: 'news',
    time: '18m ago',
    label: 'Beauty News',
    headline: 'Rare Beauty donates $10M to mental health initiatives',
    body: 'Selena Gomez\'s brand has now contributed over $10 million through the Rare Impact Fund, supporting mental health services for underserved communities across 17 countries.',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=700&q=80',
  },
  {
    type: 'rated',
    user: { name: 'Rina T.', handle: '@rinat', avatar: 'https://i.pravatar.cc/100?img=49' },
    time: '45m ago',
    product: { brand: 'NARS', name: 'Light Reflecting Foundation', category: 'makeup', emoji: '💄' },
    rating: 5,
    note: 'Still the most natural finish I\'ve ever worn. Shade Barcelona is perfection. This is the one.',
  },
  {
    type: 'tutorial',
    time: '1h ago',
    label: 'Tutorial',
    headline: 'Glass skin in 5 steps — the Korean routine breaking the internet',
    body: 'Double cleanse → exfoliate → essence → sheet mask → seal with a light moisturizer. The secret is layering thin, water-based products and never skipping the essence step.',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=700&q=80',
    steps: ['Double cleanse', 'Chemical exfoliant (AHA/BHA)', 'Hydrating essence', 'Sheet mask 15 min', 'Lock in with moisturizer'],
  },
  {
    type: 'added',
    user: { name: 'Jake R.', handle: '@jaker', avatar: 'https://i.pravatar.cc/100?img=12' },
    time: '2h ago',
    product: { brand: 'Supergoop!', name: 'Play Everyday Lotion SPF 50', category: 'skincare', emoji: '🧴' },
    status: 'rotation',
    caption: 'Upgraded my SPF game. Lighter than the Unseen and better for the body.',
  },
  {
    type: 'brand',
    time: '3h ago',
    label: 'Brand Spotlight',
    headline: 'The Ordinary — science-backed skincare without the markup',
    body: 'Founded in 2016 by Brandon Truaxe, The Ordinary disrupted the skincare industry by listing every active ingredient and its percentage on the label, and pricing products at cost. Their Niacinamide 10% + Zinc 1% remains one of the best-selling serums worldwide.',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=700&q=80',
    tag: 'Deciem family',
  },
  {
    type: 'rated',
    user: { name: 'Luna V.', handle: '@lunav', avatar: 'https://i.pravatar.cc/100?img=20' },
    time: '4h ago',
    product: { brand: 'Herbivore', name: 'Prism AHA + BHA Glow Serum', category: 'skincare', emoji: '🧴' },
    rating: 4,
    note: 'Effective and fully clean. My skin genuinely glows the morning after. Gentle enough for twice a week.',
  },
  {
    type: 'news',
    time: '5h ago',
    label: 'Trend Alert',
    headline: 'Slugging is back — and derms actually approve this time',
    body: 'The TikTok trend of applying a thin layer of Vaseline or Aquaphor as the final step of your night routine has earned a nod from several board-certified dermatologists for its occlusive barrier-sealing benefits. Best for dry and combination skin types.',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=700&q=80',
  },
  {
    type: 'added',
    user: { name: 'Mia Derm', handle: '@miaderm', avatar: 'https://i.pravatar.cc/100?img=32' },
    time: '6h ago',
    product: { brand: 'La Roche-Posay', name: 'Anthelios Mineral SPF 50', category: 'skincare', emoji: '🧴' },
    status: 'rotation',
    caption: 'Added to my in-rotation list. Best mineral SPF I\'ve tested in 2026 — no white cast, no pilling under makeup.',
  },
  {
    type: 'tutorial',
    time: '8h ago',
    label: 'How To',
    headline: 'Layer your actives without irritating your skin',
    body: 'The golden rule: lowest pH first, then thinnest to thickest. Always wait 20–30 minutes after applying Vitamin C before your next step. Never layer AHA/BHA with retinol on the same night.',
    image: 'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=700&q=80',
    steps: ['Vitamin C (morning only)', 'Wait 20 min', 'Niacinamide or peptides', 'Moisturizer', 'SPF to finish (AM)'],
  },
  {
    type: 'rated',
    user: { name: 'Sophie K.', handle: '@sophiek', avatar: 'https://i.pravatar.cc/100?img=47' },
    time: '10h ago',
    product: { brand: 'Paula\'s Choice', name: '2% BHA Liquid Exfoliant', category: 'skincare', emoji: '🧴' },
    rating: 5,
    note: 'Two years in and it\'s still the only exfoliant I trust. Never irritates, always delivers.',
  },
  {
    type: 'brand',
    time: '12h ago',
    label: 'Brand Spotlight',
    headline: 'Rhode — the art of lip care, elevated',
    body: 'Hailey Bieber\'s Rhode launched in 2022 with a razor-sharp focus: effortless, glazed skin. The Peptide Lip Treatment became an overnight cult product, with restocks selling out in minutes. The brand\'s philosophy is "your skin, but better" — minimal steps, maximum glow.',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=700&q=80',
    tag: 'Independent',
  },
];

const STATUS_LABELS = { rotation: 'In Rotation', retired: 'Not for Me', want: 'Want to Try' };

// ── Interactions (likes + comments) ───────────────────
const INTERACTIONS_KEY = 'peachy-feed-interactions';

function loadInteractions() {
  return JSON.parse(localStorage.getItem(userKey(INTERACTIONS_KEY)) || '{}');
}

function saveInteractions(data) {
  localStorage.setItem(userKey(INTERACTIONS_KEY), JSON.stringify(data));
}

function postActionsHtml(idx) {
  const data = loadInteractions();
  const post = data[idx] || {};
  const liked = !!post.liked;
  const likeCount = post.likeCount || 0;
  const comments = post.comments || [];
  const commentsHtml = comments.map(c => `
    <div class="post-comment">
      <span class="post-comment-author">You</span>
      <span class="post-comment-text">${escHtml(c.text)}</span>
    </div>`).join('');
  return `
    <div class="post-actions">
      <button class="post-like-btn ${liked ? 'liked' : ''}" data-idx="${idx}">
        ${liked ? '♥' : '♡'} <span class="post-like-count">${likeCount > 0 ? likeCount : ''}</span>
      </button>
      <button class="post-comment-toggle" data-idx="${idx}">
        💬 ${comments.length > 0 ? comments.length : ''}
      </button>
    </div>
    <div class="post-comment-section" id="comment-section-${idx}" style="display:none">
      ${commentsHtml ? `<div class="post-comments-list" id="comments-list-${idx}">${commentsHtml}</div>` : `<div class="post-comments-list" id="comments-list-${idx}"></div>`}
      <div class="post-comment-input-row">
        <input class="post-comment-input" type="text" placeholder="Add a comment…" data-idx="${idx}">
        <button class="post-comment-submit" data-idx="${idx}">Post</button>
      </div>
    </div>`;
}

// ── Render a single post ──────────────────────────────
function renderPost(post, idx) {
  if (post.type === 'added') return renderAdded(post, idx);
  if (post.type === 'rated') return renderRated(post, idx);
  if (post.type === 'news' || post.type === 'trend') return renderEditorial(post, idx);
  if (post.type === 'tutorial') return renderTutorial(post, idx);
  if (post.type === 'brand') return renderBrand(post, idx);
  return '';
}

function userHeader(user, time) {
  return `
    <div class="post-user">
      <img class="post-avatar" src="${user.avatar}" alt="${escHtml(user.name)}">
      <div>
        <div class="post-username">${escHtml(user.name)}</div>
        <div class="post-handle">${escHtml(user.handle)} · ${time}</div>
      </div>
    </div>`;
}

function renderAdded(post, idx) {
  return `
    <article class="feed-card">
      ${userHeader(post.user, post.time)}
      <p class="post-action-label">added to shelf</p>
      <div class="post-product-block">
        <div class="post-product-emoji">${post.product.emoji}</div>
        <div>
          <div class="post-product-brand">${escHtml(post.product.brand)}</div>
          <div class="post-product-name">${escHtml(post.product.name)}</div>
          <span class="status-badge status-${post.status}">${STATUS_LABELS[post.status]}</span>
        </div>
      </div>
      ${post.caption ? `<p class="post-caption">"${escHtml(post.caption)}"</p>` : ''}
      ${postActionsHtml(idx)}
    </article>`;
}

function renderRated(post, idx) {
  return `
    <article class="feed-card">
      ${userHeader(post.user, post.time)}
      <p class="post-action-label">rated a product</p>
      <div class="post-product-block">
        <div class="post-product-emoji">${post.product.emoji}</div>
        <div>
          <div class="post-product-brand">${escHtml(post.product.brand)}</div>
          <div class="post-product-name">${escHtml(post.product.name)}</div>
          <div class="stars post-stars">${stars(post.rating)}</div>
        </div>
      </div>
      ${post.note ? `<p class="post-caption">"${escHtml(post.note)}"</p>` : ''}
      ${postActionsHtml(idx)}
    </article>`;
}

function renderEditorial(post, idx) {
  return `
    <article class="feed-card feed-card--editorial">
      <div class="editorial-label">${escHtml(post.label)}</div>
      ${post.image ? `<img class="editorial-img" src="${post.image}" alt="">` : ''}
      <h2 class="editorial-headline">${escHtml(post.headline)}</h2>
      <p class="editorial-body">${escHtml(post.body)}</p>
      <div class="post-meta-row">${post.time}</div>
      ${postActionsHtml(idx)}
    </article>`;
}

function renderTutorial(post, idx) {
  const stepsHtml = post.steps
    ? `<ol class="tutorial-steps">${post.steps.map(s => `<li>${escHtml(s)}</li>`).join('')}</ol>`
    : '';
  return `
    <article class="feed-card feed-card--tutorial">
      <div class="editorial-label">${escHtml(post.label)}</div>
      ${post.image ? `<img class="editorial-img" src="${post.image}" alt="">` : ''}
      <h2 class="editorial-headline">${escHtml(post.headline)}</h2>
      <p class="editorial-body">${escHtml(post.body)}</p>
      ${stepsHtml}
      <div class="post-meta-row">${post.time}</div>
      ${postActionsHtml(idx)}
    </article>`;
}

function renderBrand(post, idx) {
  return `
    <article class="feed-card feed-card--brand">
      <div class="editorial-label">${escHtml(post.label)}</div>
      ${post.image ? `<img class="editorial-img" src="${post.image}" alt="">` : ''}
      <h2 class="editorial-headline">${escHtml(post.headline)}</h2>
      <p class="editorial-body">${escHtml(post.body)}</p>
      ${post.tag ? `<span class="brand-tag">${escHtml(post.tag)}</span>` : ''}
      <div class="post-meta-row">${post.time}</div>
      ${postActionsHtml(idx)}
    </article>`;
}

// ── Suggested people ──────────────────────────────────
const SUGGESTED = [
  { name: 'Mia Derm', handle: '@miaderm', avatar: 'https://i.pravatar.cc/100?img=32' },
  { name: 'Luna V.',  handle: '@lunav',   avatar: 'https://i.pravatar.cc/100?img=20' },
  { name: 'Jake R.',  handle: '@jaker',   avatar: 'https://i.pravatar.cc/100?img=12' },
];

function renderSidebar() {
  const el = document.getElementById('suggested-list');
  if (!el) return;
  el.innerHTML = SUGGESTED.map(p => `
    <div class="suggested-person">
      <img src="${p.avatar}" alt="${escHtml(p.name)}" class="suggested-avatar">
      <div class="suggested-meta">
        <div class="suggested-name">${escHtml(p.name)}</div>
        <div class="suggested-handle">${escHtml(p.handle)}</div>
      </div>
      <button class="btn btn-ghost suggested-follow-btn">Follow</button>
    </div>
  `).join('');
}

// ── Init ──────────────────────────────────────────────
document.getElementById('feed-main').innerHTML = POSTS.map((post, idx) => renderPost(post, idx)).join('');
renderSidebar();

// ── Like & Comment handlers (event delegation) ────────
document.getElementById('feed-main').addEventListener('click', e => {
  // Like button
  const likeBtn = e.target.closest('.post-like-btn');
  if (likeBtn) {
    const idx = likeBtn.dataset.idx;
    const data = loadInteractions();
    if (!data[idx]) data[idx] = { liked: false, likeCount: 0, comments: [] };
    data[idx].liked = !data[idx].liked;
    data[idx].likeCount = (data[idx].likeCount || 0) + (data[idx].liked ? 1 : -1);
    saveInteractions(data);
    likeBtn.classList.toggle('liked', data[idx].liked);
    likeBtn.innerHTML = `${data[idx].liked ? '♥' : '♡'} <span class="post-like-count">${data[idx].likeCount > 0 ? data[idx].likeCount : ''}</span>`;
    return;
  }

  // Comment toggle
  const toggleBtn = e.target.closest('.post-comment-toggle');
  if (toggleBtn) {
    const idx = toggleBtn.dataset.idx;
    const section = document.getElementById(`comment-section-${idx}`);
    const isOpen = section.style.display !== 'none';
    section.style.display = isOpen ? 'none' : 'block';
    if (!isOpen) section.querySelector('.post-comment-input')?.focus();
    return;
  }

  // Submit comment
  const submitBtn = e.target.closest('.post-comment-submit');
  if (submitBtn) {
    const idx = submitBtn.dataset.idx;
    const input = document.querySelector(`.post-comment-input[data-idx="${idx}"]`);
    const text = input.value.trim();
    if (!text) return;
    const data = loadInteractions();
    if (!data[idx]) data[idx] = { liked: false, likeCount: 0, comments: [] };
    data[idx].comments.push({ text });
    saveInteractions(data);
    const list = document.getElementById(`comments-list-${idx}`);
    const div = document.createElement('div');
    div.className = 'post-comment';
    div.innerHTML = `<span class="post-comment-author">You</span><span class="post-comment-text">${escHtml(text)}</span>`;
    list.appendChild(div);
    // Update comment toggle count
    const toggle = document.querySelector(`.post-comment-toggle[data-idx="${idx}"]`);
    if (toggle) toggle.innerHTML = `💬 ${data[idx].comments.length}`;
    input.value = '';
    return;
  }
});

// ── Trending list links ────────────────────────────────
(function wireTrendingLinks() {
  const key = userKey('peachy-products-v7');
  const products = JSON.parse(localStorage.getItem(key) || '[]');
  document.querySelectorAll('.trending-list li[data-product-name]').forEach(li => {
    const targetName = li.dataset.productName.toLowerCase();
    const match = products.find(p => p.name.toLowerCase().includes(targetName) || targetName.includes(p.name.toLowerCase()));
    if (match) {
      li.style.cursor = 'pointer';
      li.addEventListener('click', () => { location.href = 'product.html?id=' + match.id; });
    }
  });
})();
