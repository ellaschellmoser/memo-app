// ── Product Detail Page ───────────────────────────────
// Relies on products[], save(), escHtml(), EMOJI_MAP, STATUS_LABELS from app.js

const CATEGORY_LABELS = {
  skincare:  'Skincare',
  makeup:    'Makeup',
  haircare:  'Haircare',
  bodycare:  'Body Care',
  fragrance: 'Fragrance',
  tools:     'Tools & Accessories',
};

// Read ?id from URL
const params  = new URLSearchParams(location.search);
const rawId   = parseInt(params.get('id'));
const product = isNaN(rawId) ? null : products.find(p => p.id === rawId);
let detailRating   = product ? product.rating : 0;
let pendingFavSlot = product ? (product.favoriteSlot || 0) : 0;

if (!product) {
  renderNotFound();
} else {
  renderDetail(product);
}

// ── Not Found ─────────────────────────────────────────
function renderNotFound() {
  document.getElementById('detail-card').innerHTML = `
    <div class="empty-state" style="padding:4rem 2rem">
      <div class="empty-icon">✦</div>
      <h3>Product not found</h3>
      <p>This product may have been removed or the link is invalid.</p>
      <a href="shelf.html" class="btn btn-primary">Back to My Library</a>
    </div>`;
}

// ── Render Detail ─────────────────────────────────────
function renderDetail(p) {
  const card = document.getElementById('detail-card');

  const imgHtml = p.imageUrl
    ? `<img class="detail-product-img" src="${escHtml(p.imageUrl)}"
           alt="${escHtml(p.brand)} ${escHtml(p.name)}"
           onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
    : '';
  const emojiStyle = p.imageUrl ? 'display:none' : '';


  // Community stats
  const commRatings = p.communityRatings || [];
  const allRatings  = p.rating > 0 ? [...commRatings, { rating: p.rating }] : [...commRatings];
  const avgRating   = allRatings.length
    ? allRatings.reduce((s, r) => s + r.rating, 0) / allRatings.length
    : 0;
  const totalCount  = allRatings.length;

  const communityHtml = totalCount > 0 ? `
    <div class="community-rating" onclick="document.getElementById('reviews-section').scrollIntoView({behavior:'smooth'})" style="cursor:pointer">
      <span class="community-avg-num">${avgRating.toFixed(1)}</span>
      <div class="community-avg-stars">
        ${[1,2,3,4,5].map(n =>
          `<span class="star ${n <= Math.round(avgRating) ? 'filled' : ''}">★</span>`
        ).join('')}
      </div>
      <span class="community-count">${totalCount} rating${totalCount !== 1 ? 's' : ''}</span>
    </div>` : '';

  const following = JSON.parse(localStorage.getItem(userKey('peachy-following')) || '[]');
  const friendHandles = new Set(following.map(id => '@' + id));
  const myHandle = (JSON.parse(localStorage.getItem(userKey('peachy-profile')) || '{}').handle || '@you').toLowerCase();

  const myReviews     = commRatings.filter(r => r.handle.toLowerCase() === myHandle);
  const friendReviews = commRatings.filter(r => r.handle.toLowerCase() !== myHandle && friendHandles.has(r.handle));
  const otherReviews  = commRatings.filter(r => r.handle.toLowerCase() !== myHandle && !friendHandles.has(r.handle));

  function reviewRow(r, isMe = false) {
    return `
      <div class="review-row${isMe ? ' review-row--mine' : ''}">
        <div class="review-header">
          <img class="review-avatar" src="${escHtml(r.avatar)}" alt="${escHtml(r.name)}">
          <div class="review-meta">
            <div class="review-name">${escHtml(r.name)}${isMe ? ' <span class="review-you-badge">You</span>' : ''}</div>
            <div class="review-handle">${escHtml(r.handle)}</div>
          </div>
          <div class="review-stars">
            ${[1,2,3,4,5].map(n =>
              `<span class="star ${n <= r.rating ? 'filled' : ''}">★</span>`
            ).join('')}
          </div>
        </div>
        <p class="review-comment">"${escHtml(r.comment)}"</p>
      </div>`;
  }

  const existingReviewsHtml = commRatings.length ? `
      ${myReviews.length ? `
        <p class="reviews-sublabel">Your Review</p>
        <div class="reviews-list">${myReviews.map(r => reviewRow(r, true)).join('')}</div>
      ` : ''}
      ${friendReviews.length ? `
        <p class="reviews-sublabel">Friends</p>
        <div class="reviews-list">${friendReviews.map(r => reviewRow(r)).join('')}</div>
      ` : ''}
      ${otherReviews.length ? `
        <div class="reviews-list">${otherReviews.map(r => reviewRow(r)).join('')}</div>
      ` : ''}` : '';

  const reviewsHtml = `
    <div class="reviews-section" id="reviews-section">
      <div class="reviews-title-row">
        <h3 class="reviews-title">Ratings &amp; Reviews</h3>
        <button class="btn btn-outline" id="write-review-btn" onclick="toggleWriteReview()">✎ Write a Review</button>
      </div>
      <div class="write-review-form" id="write-review-form" style="display:none">
        <div class="write-review-stars" id="write-review-stars">
          ${[1,2,3,4,5].map(n => `<span class="star" data-val="${n}">★</span>`).join('')}
        </div>
        <textarea id="write-review-text" rows="3" placeholder="Share your thoughts about this product…"></textarea>
        <div class="write-review-actions">
          <button class="btn btn-ghost" onclick="toggleWriteReview()">Cancel</button>
          <button class="btn btn-primary" onclick="submitReview()">Post Review</button>
        </div>
      </div>
      <div id="existing-reviews">${existingReviewsHtml}</div>
    </div>`;

  card.innerHTML = `
    <div class="product-layout-stacked">

      <!-- Image hero -->
      <div class="product-detail-img-hero">
        ${imgHtml}
        <span class="card-emoji-fallback card-emoji-fallback--hero" style="${emojiStyle}">${EMOJI_MAP[p.category] || '✦'}</span>
        <a href="#" class="btn btn-primary shop-now-btn" onclick="return false;">Shop Now →</a>
      </div>

      <!-- Header row: brand/name -->
      <div class="product-detail-header">
        <div class="detail-brand">${escHtml(p.brand)}</div>
        <div class="product-title">${escHtml(p.name)}</div>
        <span class="category-badge">${CATEGORY_LABELS[p.category] || p.category}</span>
      </div>

      ${p.description ? `<p class="product-description">${escHtml(p.description)}</p>` : ''}

      ${communityHtml}

      <div class="form-group">
        <label>Your Rating</label>
        <div class="detail-stars" id="detail-stars">
          ${[1,2,3,4,5].map(n =>
            `<span class="star ${n <= detailRating ? 'filled' : ''}" data-val="${n}">★</span>`
          ).join('')}
        </div>
      </div>

      <div class="form-group">
        <label>Status</label>
        <select id="detail-status">
          <option value="rotation" ${p.status === 'rotation' ? 'selected' : ''}>In Rotation</option>
          <option value="want"     ${p.status === 'want'     ? 'selected' : ''}>Want to Try</option>
          <option value="retired"  ${p.status === 'retired'  ? 'selected' : ''}>Not for Me</option>
        </select>
      </div>

      <div class="form-group">
        <label>Private Notes</label>
        <textarea id="detail-note" rows="5">${escHtml(p.note)}</textarea>
      </div>

      <div class="form-group ingredients-group">
        <label>Ingredients</label>
        ${renderIngredientChecker(p.ingredientsList || '')}
      </div>

<div class="detail-actions">
        <button class="btn btn-primary" onclick="saveChanges()">Save Changes</button>
        <span class="save-feedback" id="save-feedback">Saved!</span>
        <div class="delete-zone">
          <button class="btn btn-ghost" id="cancel-delete" style="display:none" onclick="cancelDelete()">Cancel</button>
          <button class="btn-danger btn" id="delete-btn" onclick="confirmDelete()">Delete</button>
        </div>
      </div>

    </div>

    ${reviewsHtml}`;

  // Wire up favorite slot picker
  pendingFavSlot = p.favoriteSlot || 0;
  document.querySelectorAll('#fav-slot-picker .fav-slot-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      pendingFavSlot = parseInt(btn.dataset.slot);
      document.querySelectorAll('#fav-slot-picker .fav-slot-btn').forEach(b =>
        b.classList.toggle('active', parseInt(b.dataset.slot) === pendingFavSlot)
      );
    });
  });

  // Wire up detail star interactions
  document.querySelectorAll('#detail-stars .star').forEach(star => {
    star.addEventListener('click', () => {
      detailRating = parseInt(star.dataset.val);
      updateDetailStars(detailRating);
    });
    star.addEventListener('mouseenter', () => updateDetailStars(parseInt(star.dataset.val)));
    star.addEventListener('mouseleave', () => updateDetailStars(detailRating));
  });

  // Wire up write-review star interactions
  document.querySelectorAll('#write-review-stars .star').forEach(star => {
    star.addEventListener('click', () => {
      writeReviewRating = parseInt(star.dataset.val);
      updateWriteReviewStars(writeReviewRating);
    });
    star.addEventListener('mouseenter', () => updateWriteReviewStars(parseInt(star.dataset.val)));
    star.addEventListener('mouseleave', () => updateWriteReviewStars(writeReviewRating));
  });
}

// ── Ingredient Analysis ──────────────────────────────
function analyzeIngredients(ingredientsList) {
  if (!ingredientsList.trim()) return { all: [], recommended: [], lowConcern: [], individual: [], counts: { recommended: 0, lowConcern: 0, individual: 0 } };
  
  const ingredients = ingredientsList.split(',')
    .map(i => i.trim())
    .filter(Boolean)
    .map(name => {
      const data = getIngredientSafety(name);
      return { name, ...data };
    });
  
  const counts = { recommended: 0, lowConcern: 0, individual: 0 };
  const categorized = { recommended: [], lowConcern: [], individual: [] };
  
  ingredients.forEach(ing => {
    if (ing.safety === 'recommended') {
      categorized.recommended.push(ing);
      counts.recommended++;
    } else if (ing.safety === 'low-concern') {
      categorized.lowConcern.push(ing);
      counts.lowConcern++;
    } else {
      categorized.individual.push(ing);
      counts.individual++;
    }
  });
  
  return { all: ingredients, ...categorized, counts };
}

function renderIngredientChecker(ingredientsList) {
  const analysis = analyzeIngredients(ingredientsList);
  const total = analysis.all.length;
  
  if (total === 0) {
    return '<div class="ingredients-checker-empty">No ingredients added yet.</div>';
  }
  
  const summaryHtml = `
    <div class="ingredient-checker-summary">
      <div class="ingredient-checker-count"><strong>${total}</strong> total</div>
      ${analysis.counts.recommended > 0 ? `<div class="ingredient-checker-badge recommended"><span>${analysis.counts.recommended}</span> Recommended</div>` : ''}
      ${analysis.counts.lowConcern > 0 ? `<div class="ingredient-checker-badge low-concern"><span>${analysis.counts.lowConcern}</span> Low Concern</div>` : ''}
      ${analysis.counts.individual > 0 ? `<div class="ingredient-checker-badge individual"><span>${analysis.counts.individual}</span> Individual Rating</div>` : ''}
    </div>
  `;
  
  const pillsHtml = `
    <div class="ingredient-pills-grid">
      ${analysis.all.map((ing, idx) => {
        const safetyClass = ing.safety === 'individual-rating' ? 'individual-rating' : ing.safety;
        return `<span class="ingredient-pill ingredient-pill--${safetyClass}" data-idx="${idx}" onclick="toggleIngredientDetail(event, ${idx})" title="${escHtml(ing.name)}">${escHtml(ing.name)}</span>`;
      }).join('')}
    </div>
  `;
  
  return `<div class="ingredients-checker">${summaryHtml}${pillsHtml}</div>`;
}

function toggleIngredientDetail(event, idx) {
  event.stopPropagation();
  const pill = event.target;
  const allPopovers = document.querySelectorAll('.ingredient-detail-popover');
  allPopovers.forEach(p => p.remove());
  
  if (pill.dataset.popoverOpen) {
    delete pill.dataset.popoverOpen;
    return;
  }
  
  const ingredientsList = document.querySelector('.ingredients-checker')?.innerText || '';
  const analysis = analyzeIngredients(product.ingredientsList || '');
  const ing = analysis.all[idx];
  
  if (!ing) return;
  
  const popover = document.createElement('div');
  popover.className = 'ingredient-detail-popover';
  const safetyLabel = ing.safety === 'recommended' ? '✓ Recommended' : ing.safety === 'low-concern' ? '◎ Low Concern' : '⚠ Individual Rating';
  popover.innerHTML = `
    <div class="popover-content">
      <div class="popover-name">${escHtml(ing.name)}</div>
      <div class="popover-safety">
        <span class="popover-safety-badge popover-safety--${ing.safety === 'individual-rating' ? 'individual-rating' : ing.safety}">${safetyLabel}</span>
      </div>
      <p class="popover-description">${escHtml(ing.description)}</p>
    </div>
  `;
  
  document.body.appendChild(popover);
  pill.dataset.popoverOpen = 'true';
  
  const rect = pill.getBoundingClientRect();
  popover.style.position = 'fixed';
  popover.style.left = Math.max(10, rect.left - 150) + 'px';
  popover.style.top = (rect.top - popover.offsetHeight - 10) + 'px';
  
  setTimeout(() => {
    document.addEventListener('click', function closePop() {
      popover.remove();
      delete pill.dataset.popoverOpen;
      document.removeEventListener('click', closePop);
    });
  }, 0);
}

function renderIngredientPills(raw) {
  if (!raw.trim()) return '<span class="ingredients-empty">No ingredients added yet.</span>';
  return raw.split(',')
    .map(i => i.trim()).filter(Boolean)
    .map(i => `<span class="ingredient-pill">${escHtml(i)}</span>`)
    .join('');
}

function updateDetailStars(n) {
  document.querySelectorAll('#detail-stars .star').forEach(s => {
    s.classList.toggle('filled', parseInt(s.dataset.val) <= n);
  });
}

// ── Save ──────────────────────────────────────────────
function saveChanges() {
  product.status          = document.getElementById('detail-status').value;
  product.rating          = detailRating;
  product.note            = document.getElementById('detail-note').value.trim();


  // Clear the chosen slot from any other product first
  if (pendingFavSlot > 0) {
    products.forEach(other => {
      if (other.id !== product.id && other.favoriteSlot === pendingFavSlot) {
        other.favoriteSlot = null;
      }
    });
  }
  product.favoriteSlot = pendingFavSlot > 0 ? pendingFavSlot : null;

  save();

  const fb = document.getElementById('save-feedback');
  fb.classList.add('visible');
  setTimeout(() => fb.classList.remove('visible'), 2000);
}

// ── Delete ────────────────────────────────────────────
let deleteStep = 0;

function confirmDelete() {
  if (deleteStep === 0) {
    deleteStep = 1;
    const btn = document.getElementById('delete-btn');
    btn.textContent = 'Are you sure?';
    document.getElementById('cancel-delete').style.display = '';
    // Second click executes delete
    btn.onclick = executeDelete;
  }
}

function cancelDelete() {
  deleteStep = 0;
  const btn = document.getElementById('delete-btn');
  btn.textContent = 'Delete';
  btn.onclick = confirmDelete;
  document.getElementById('cancel-delete').style.display = 'none';
}

function executeDelete() {
  const idx = products.findIndex(p => p.id === product.id);
  if (idx !== -1) products.splice(idx, 1);
  save();
  location.href = 'shelf.html';
}

// ── Write a Review ────────────────────────────────────
let writeReviewRating = 0;

function toggleWriteReview() {
  const form = document.getElementById('write-review-form');
  const opening = form.style.display === 'none';
  form.style.display = opening ? '' : 'none';
  if (opening) {
    writeReviewRating = 0;
    updateWriteReviewStars(0);
    document.getElementById('write-review-text').value = '';
  }
}

function updateWriteReviewStars(n) {
  document.querySelectorAll('#write-review-stars .star').forEach(s => {
    s.classList.toggle('filled', parseInt(s.dataset.val) <= n);
  });
}

function submitReview() {
  const text = document.getElementById('write-review-text').value.trim();
  if (!text && writeReviewRating === 0) return;

  const profile = JSON.parse(localStorage.getItem(userKey('peachy-profile')) || '{}');
  const review = {
    name:    profile.name   || 'You',
    handle:  profile.handle || '@you',
    avatar:  'profile.jpg',
    rating:  writeReviewRating,
    comment: text || '—',
  };

  if (!product.communityRatings) product.communityRatings = [];
  product.communityRatings.push(review);
  save();

  renderDetail(product);
  setTimeout(() => document.getElementById('reviews-section').scrollIntoView({ behavior: 'smooth' }), 50);
}
