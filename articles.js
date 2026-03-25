// ── Article data ──────────────────────────────────────
const ARTICLES = [
  {
    id: 1,
    tag: 'science',
    featured: true,
    title: 'The Science of Retinoids: Why Vitamin A is the Gold Standard of Anti-Ageing',
    excerpt: 'From tretinoin to retinol to bakuchiol — a deep dive into how retinoids actually work at a cellular level, and which form is right for your skin.',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=900&q=80',
    author: 'Dr. Clara Voss',
    date: 'March 24, 2026',
    readTime: '8 min read',
  },
  {
    id: 2,
    tag: 'skincare',
    title: 'Ceramides 101: The Barrier Ingredient Your Skin Has Been Missing',
    excerpt: 'If your skin feels tight, reactive, or perpetually dehydrated, a compromised moisture barrier might be to blame. Here\'s how ceramides help — and which formulas actually deliver.',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=700&q=80',
    author: 'Nadia Ferrer',
    date: 'March 22, 2026',
    readTime: '5 min read',
  },
  {
    id: 3,
    tag: 'trends',
    title: 'Skinimalism in 2026: Less is Still More (But Science Has Caught Up)',
    excerpt: 'The multi-step routine is officially out. We spoke to facialists, dermatologists, and devoted skincare minimalists about how to do more with three products.',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=700&q=80',
    author: 'Camille Reyes',
    date: 'March 21, 2026',
    readTime: '6 min read',
  },
  {
    id: 4,
    tag: 'haircare',
    title: 'Bond Repair Explained: What Olaplex, K18, and MONDAY Actually Do to Your Hair',
    excerpt: 'Bond repair is one of the most overhyped categories in haircare. But the underlying science is real. We break down what\'s marketing and what genuinely works.',
    image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=700&q=80',
    author: 'Sasha Bloom',
    date: 'March 20, 2026',
    readTime: '7 min read',
  },
  {
    id: 5,
    tag: 'science',
    title: 'Peptides vs Retinol: Do You Need Both, or Is One Enough?',
    excerpt: 'Both are touted as anti-ageing superstars. But they work through completely different mechanisms — and layering them isn\'t always necessary.',
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=700&q=80',
    author: 'Dr. Clara Voss',
    date: 'March 19, 2026',
    readTime: '6 min read',
  },
  {
    id: 6,
    tag: 'trends',
    title: 'The Return of SPF Culture: How Sun Protection Became a Beauty Status Symbol',
    excerpt: 'From Korean sunscreens to tinted SPFs to the "no foundation, just SPF" movement — we look at how sunscreen went from chore to cornerstone.',
    image: 'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=700&q=80',
    author: 'Tom Hale',
    date: 'March 18, 2026',
    readTime: '4 min read',
  },
  {
    id: 7,
    tag: 'makeup',
    title: 'The Glazed Skin Formula: How to Get the Dewy Look Without Looking Greasy',
    excerpt: 'Glazed, dewy, glass skin — the look has many names but one goal: a luminous, healthy finish that reads fresh, not oily. Here\'s how to nail it for every skin type.',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=700&q=80',
    author: 'Camille Reyes',
    date: 'March 17, 2026',
    readTime: '5 min read',
  },
  {
    id: 8,
    tag: 'skincare',
    title: 'Niacinamide: The One Ingredient That Actually Does What It Claims',
    excerpt: 'Pore minimiser, brightener, barrier booster, sebum regulator — niacinamide somehow does it all. We look at the clinical evidence behind the buzz.',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=700&q=80',
    author: 'Dr. Clara Voss',
    date: 'March 15, 2026',
    readTime: '5 min read',
  },
];

// ── State ─────────────────────────────────────────────
let activeTag = 'all';

// ── Render ────────────────────────────────────────────
function render() {
  const featured = ARTICLES.find(a => a.featured);
  const featuredEl = document.getElementById('article-featured');

  // Only show the featured hero on "All"; hide it when a tag is active
  if (activeTag === 'all' && featured) {
    featuredEl.style.display = '';
    featuredEl.innerHTML = `
      <div class="article-featured-inner">
        <img class="article-featured-img" src="${featured.image}" alt="">
        <div class="article-featured-body">
          <span class="article-tag-pill">${featured.tag}</span>
          <h2 class="article-featured-title">${featured.title}</h2>
          <p class="article-excerpt">${featured.excerpt}</p>
          <div class="article-meta">${featured.author} · ${featured.date} · ${featured.readTime}</div>
        </div>
      </div>`;
  } else {
    featuredEl.style.display = 'none';
  }

  // Grid — when a tag is active, include the featured article too so nothing is hidden
  const rest = ARTICLES.filter(a =>
    (activeTag === 'all' ? !a.featured : true) && (activeTag === 'all' || a.tag === activeTag)
  );

  document.getElementById('article-grid').innerHTML = rest.map(a => `
    <div class="article-card">
      <img class="article-card-img" src="${a.image}" alt="">
      <div class="article-card-body">
        <span class="article-tag-pill">${a.tag}</span>
        <h3 class="article-card-title">${a.title}</h3>
        <p class="article-excerpt">${a.excerpt}</p>
        <div class="article-meta">${a.author} · ${a.readTime}</div>
      </div>
    </div>
  `).join('');
}

// ── Filter tabs ───────────────────────────────────────
document.querySelectorAll('[data-atag]').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('[data-atag]').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    activeTag = tab.dataset.atag;
    render();
  });
});

render();
