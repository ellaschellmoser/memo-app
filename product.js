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
      <a href="shelf.html" class="btn btn-primary">Back to My Shelf</a>
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
    <div class="community-rating">
      <span class="community-avg-num">${avgRating.toFixed(1)}</span>
      <div class="community-avg-stars">
        ${[1,2,3,4,5].map(n =>
          `<span class="star ${n <= Math.round(avgRating) ? 'filled' : ''}">★</span>`
        ).join('')}
      </div>
      <span class="community-count">${totalCount} rating${totalCount !== 1 ? 's' : ''}</span>
    </div>` : '';

  const reviewsHtml = commRatings.length ? `
    <div class="reviews-section">
      <h3 class="reviews-title">What friends think</h3>
      <div class="reviews-grid">
        ${commRatings.map(r => `
          <div class="review-card">
            <div class="review-header">
              <img class="review-avatar" src="${escHtml(r.avatar)}" alt="${escHtml(r.name)}">
              <div class="review-meta">
                <div class="review-name">${escHtml(r.name)}</div>
                <div class="review-handle">${escHtml(r.handle)}</div>
              </div>
              <div class="review-stars">
                ${[1,2,3,4,5].map(n =>
                  `<span class="star ${n <= r.rating ? 'filled' : ''}">★</span>`
                ).join('')}
              </div>
            </div>
            <p class="review-comment">"${escHtml(r.comment)}"</p>
          </div>`
        ).join('')}
      </div>
    </div>` : '';

  card.innerHTML = `
    <div class="product-layout">

      <div class="product-img-col">
        <div class="product-detail-img">
          ${imgHtml}
          <span class="card-emoji-fallback" style="${emojiStyle}">${EMOJI_MAP[p.category] || '✦'}</span>
        </div>
      </div>

      <div class="product-info-col">
        <div class="detail-brand">${escHtml(p.brand)}</div>
        <div class="product-title">${escHtml(p.name)}</div>
        <span class="category-badge">${CATEGORY_LABELS[p.category] || p.category}</span>

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
          <label>Notes</label>
          <textarea id="detail-note" rows="5">${escHtml(p.note)}</textarea>
        </div>

        <div class="form-group ingredients-group">
          <div class="ingredients-header">
            <label>Ingredients</label>
            <button type="button" class="ingredients-toggle" id="ingredients-toggle">
              ${p.ingredientsList ? 'Edit' : '+ Add'}
            </button>
          </div>
          <textarea id="detail-ingredients"
            class="ingredients-textarea"
            style="display:none"
            rows="6"
            placeholder="Paste the full INCI list here, comma-separated…">${escHtml(p.ingredientsList || '')}</textarea>
          <div class="ingredients-pills" id="ingredients-pills">
            ${renderIngredientPills(p.ingredientsList || '')}
          </div>
        </div>

        <div class="form-group">
          <label>Pin to My Current Favorites</label>
          <div class="fav-slot-picker" id="fav-slot-picker">
            <button type="button" class="fav-slot-btn ${!p.favoriteSlot ? 'active' : ''}" data-slot="0">None</button>
            <button type="button" class="fav-slot-btn ${p.favoriteSlot === 1 ? 'active' : ''}" data-slot="1">★ 1</button>
            <button type="button" class="fav-slot-btn ${p.favoriteSlot === 2 ? 'active' : ''}" data-slot="2">★ 2</button>
            <button type="button" class="fav-slot-btn ${p.favoriteSlot === 3 ? 'active' : ''}" data-slot="3">★ 3</button>
          </div>
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

    </div>

    ${reviewsHtml}`;

  // Wire up ingredients toggle
  const ingToggle   = document.getElementById('ingredients-toggle');
  const ingTextarea = document.getElementById('detail-ingredients');
  const ingPills    = document.getElementById('ingredients-pills');
  let ingEditing    = false;

  ingToggle.addEventListener('click', () => {
    ingEditing = !ingEditing;
    if (ingEditing) {
      ingTextarea.style.display = '';
      ingPills.style.display    = 'none';
      ingToggle.textContent     = 'Done';
      ingTextarea.focus();
    } else {
      ingPills.innerHTML        = renderIngredientPills(ingTextarea.value);
      ingTextarea.style.display = 'none';
      ingPills.style.display    = '';
      ingToggle.textContent     = ingTextarea.value.trim() ? 'Edit' : '+ Add';
    }
  });

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
  product.ingredientsList = document.getElementById('detail-ingredients').value.trim();

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
