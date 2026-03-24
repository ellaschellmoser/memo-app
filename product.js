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
let detailRating = product ? product.rating : 0;

function renderDetail(p) {
  const card = document.getElementById('detail-card');

  const imgHtml = p.imageUrl
    ? `<img class="detail-product-img" src="${escHtml(p.imageUrl)}"
           alt="${escHtml(p.brand)} ${escHtml(p.name)}"
           onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
    : '';
  const emojiStyle = p.imageUrl ? 'display:none' : '';

  card.innerHTML = `
    <div class="detail-img">
      ${imgHtml}
      <span class="card-emoji-fallback" style="${emojiStyle}">${EMOJI_MAP[p.category] || '✦'}</span>
    </div>

    <div class="detail-body">
      <div class="detail-brand">${escHtml(p.brand)}</div>
      <div class="detail-name">${escHtml(p.name)}</div>
      <span class="category-badge">${CATEGORY_LABELS[p.category] || p.category}</span>

      <div class="form-group">
        <label>Status</label>
        <select id="detail-status">
          <option value="rotation" ${p.status === 'rotation' ? 'selected' : ''}>In Rotation</option>
          <option value="want"     ${p.status === 'want'     ? 'selected' : ''}>Want to Try</option>
          <option value="retired"  ${p.status === 'retired'  ? 'selected' : ''}>Retired</option>
        </select>
      </div>

      <div class="form-group">
        <label>Your Rating</label>
        <div class="detail-stars" id="detail-stars">
          ${[1,2,3,4,5].map(n =>
            `<span class="star ${n <= detailRating ? 'filled' : ''}" data-val="${n}">★</span>`
          ).join('')}
        </div>
      </div>

      <div class="form-group">
        <label>Notes</label>
        <textarea id="detail-note" rows="4">${escHtml(p.note)}</textarea>
      </div>

      <div class="detail-actions">
        <button class="btn btn-primary" onclick="saveChanges()">Save Changes</button>
        <span class="save-feedback" id="save-feedback">Saved!</span>
        <div class="delete-zone">
          <button class="btn btn-ghost" id="cancel-delete" style="display:none" onclick="cancelDelete()">Cancel</button>
          <button class="btn-danger btn" id="delete-btn" onclick="confirmDelete()">Delete</button>
        </div>
      </div>
    </div>`;

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

function updateDetailStars(n) {
  document.querySelectorAll('#detail-stars .star').forEach(s => {
    s.classList.toggle('filled', parseInt(s.dataset.val) <= n);
  });
}

// ── Save ──────────────────────────────────────────────
function saveChanges() {
  product.status = document.getElementById('detail-status').value;
  product.rating = detailRating;
  product.note   = document.getElementById('detail-note').value.trim();
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
