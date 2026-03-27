# Peachy — Project Reference

## What is this app?

Peachy is a "Goodreads for beauty products." Users build a personal shelf of skincare, makeup, haircare, and other beauty products — logging each one with a rating, status, and personal notes. There's also a Friends page to browse shelves from friends and influencers.

The app is entirely frontend — no backend, no database. Data is stored in `localStorage`. It is a plain HTML/CSS/JS project with no frameworks or build tools.

---

## Folder Structure

```
memo-app/
├── index.html       — Landing / marketing page (hero, how it works, community shelf previews)
├── shelf.html       — The user's personal product shelf with filters and add modal
├── product.html     — Individual product detail page (edit status, rating, notes, delete)
├── friends.html     — Friends & influencers page with shelf viewer
├── app.js           — Core data layer: seed products, localStorage, rendering shelf grid, modal, add product logic, image fetching
├── product.js       — Product detail page logic: render, save changes, delete (two-step confirm)
├── friends.js       — Friends page logic: seed people data, follow/unfollow, shelf viewer, filter tabs
├── styles.css       — All styles for every page (single shared stylesheet)
└── CLAUDE.md        — This file
```

---

## Pages

### `index.html` — Home / Landing
- Sticky nav with logo, links, and "Open Shelf" CTA button
- Hero section: eyebrow label, large h1 with italic emphasis, description, two CTA buttons ("Start My Shelf" and "See How It Works")
- "How it works" section: 4 cards with decorative icons (✦ ★ ◎ ♡), explaining Add, Rate, Set Status, and Follow Friends
- "Shelves to explore" community section: 4 placeholder profile cards (Sophie K., Mia Derm, Rina T., Jake R.) with colored dot swatches
- Footer: `© 2026 Peachy · made with ♡ for beauty lovers`

### `shelf.html` — My Shelf
- Header with "My Shelf" title and live product count
- Filter tabs: All / In Rotation / Want to Try / Retired
- Product grid rendered by `app.js`
- "Add Product" modal (brand, name, category, status, star rating, notes)
- Each product card shows: emoji or product image, status badge, brand, name, star rating, italic note excerpt
- Clicking a card navigates to `product.html?id=N`

### `product.html` — Product Detail
- Back link to shelf
- Full product card: image/emoji, brand, name, category badge, editable status dropdown, interactive star rating, notes textarea
- "Save Changes" button with green "Saved!" feedback flash
- Two-step delete: first click shows "Are you sure?" + Cancel, second click deletes and redirects to shelf

### `friends.html` — Friends & Influencers
- Header with "Friends & Influencers" title and "+ Follow Someone" button
- Filter tabs: All / Friends / Influencers
- People grid: cards showing avatar emoji, name, handle, type badge (Friend / Influencer), bio, product count
- Clicking a person card opens an inline shelf viewer below the grid (scrolls into view)
- Shelf viewer has its own filter tabs and shows read-only product cards (no click navigation, no rating interaction)
- "+ Follow Someone" modal: type a handle (e.g. @sophiek) to follow; available seed people: @sophiek, @miaderm, @rinat, @jaker, @lunav

---

## Data & State

- **Products** stored in `localStorage` under key `peachy-products`
- **Following list** stored in `localStorage` under key `peachy-following`
- Seed products pre-populate the shelf on first load (The Ordinary, Rhode, Rare Beauty, Olaplex, Summer Fridays, Charlotte Tilbury)
- Seed people are hardcoded in `friends.js` — 3 friends (Sophie K., Rina T., Jake R.) and 2 influencers (Mia Derm, Luna V.)
- Product images are fetched automatically from the Open Beauty Facts API (`world.openbeautyfacts.org`) after a product is added; emoji fallback shown if no image found

### Product object shape
```js
{
  id: Number,
  brand: String,
  name: String,
  category: 'skincare' | 'makeup' | 'haircare' | 'bodycare' | 'fragrance' | 'tools',
  status: 'rotation' | 'retired' | 'want',
  rating: 0–5,
  note: String,
  imageUrl: String | null,
  imageFetched: Boolean
}
```

---

## Design

### Colors (CSS custom properties)
| Variable     | Value       | Usage                          |
|--------------|-------------|-------------------------------|
| `--cream`    | `#faf8f5`   | Page background                |
| `--blush`    | `#f2e8e1`   | Card image backgrounds, accents|
| `--rose`     | `#c9847a`   | Primary brand color, CTAs      |
| `--rose-dk`  | `#a85f55`   | Hover states, logo, emphasis   |
| `--ink`      | `#2c2420`   | Primary text                   |
| `--muted`    | `#8a7570`   | Secondary text, labels         |
| `--border`   | `#e8ddd8`   | All borders                    |
| `--white`    | `#ffffff`   | Cards, nav, modal backgrounds  |
| `--green`    | `#6a9e7f`   | "In Rotation" status badge     |
| `--amber`    | `#c49a4a`   | "Want to Try" status badge     |
| `--slate`    | `#8591a0`   | "Retired" status badge         |

### Typography
- **Body / headings**: `Georgia, serif` — warm, editorial feel
- **UI elements** (labels, nav links, buttons, small text): `Helvetica Neue, sans-serif` — clean contrast
- H1 on hero uses `clamp(2.2rem, 5vw, 3.5rem)` for fluid sizing
- Italic `<em>` in hero h1 is styled in `--rose-dk`
- Section labels: all-caps, wide letter-spacing, tiny size, rose color

### Buttons
- `.btn-primary` — rose background, white text, pill shape (`border-radius: 999px`)
- `.btn-outline` — transparent with rose border, fills on hover
- `.btn-ghost` — transparent, muted text, blush background on hover
- `.btn-danger` — transparent with red border, fills red on hover (used only for delete)

### Layout
- Nav: sticky, 64px height, white background, space-between logo and links
- Max widths: hero `760px`, shelf/friends pages `1100px`, product detail `680px`
- Product grid: `repeat(auto-fill, minmax(240px, 1fr))`
- People grid: `repeat(auto-fill, minmax(280px, 1fr))`
- Card hover effect: `translateY(-3px)` lift + box shadow
- Border radius: `--radius: 12px` (cards), `999px` (pills/badges/buttons)

### Status badges
- In Rotation: green text on light green background (`#e8f4ed`)
- Retired: slate text on light grey background (`#f0f0f2`)
- Want to Try: amber text on light amber background (`#fdf3e3`)

### Stars
- Unfilled: `--border` color
- Filled: `#e8a838` (warm gold)
- Interactive on shelf cards (inline rating update) and on detail page

---

## Hosting
- GitHub repo: `https://github.com/ellaschellmoser/memo-app` (public)
- Live site: `https://ellaschellmoser.github.io/memo-app/`
- Deployed via GitHub Pages from the `main` branch root
