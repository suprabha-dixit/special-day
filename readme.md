# Italian PhD Birthday Website

A mobile-first, multi-page birthday celebration site with an Italian visual style, English-readable copy, PhD humour, photo gallery, interactive treats, and optional piano background music.

## Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | `index.html` | Hero, countdown, gift reveal, quick navigation |
| Memories | `gallery.html` | Photo gallery with lightbox |
| Wishes | `wishes.html` | Birthday cheers, PhD tribute, funny quips |
| Treats | `fun.html` | Tap cakes, chocolates, and gifts for surprises |

## Quick start

Double-click `index.html` in File Explorer to open the site in your browser.

For live reload while editing, you can also serve the folder locally:

**Option A — Node:**

```bash
npx serve .
```

**Option B — VS Code:** Install the "Live Server" extension and open `index.html`.

**Option C — Python (if installed):**

```bash
python -m http.server 8080
```

Then open `http://localhost:8080` (or the port shown).

**Mobile preview:** Open Chrome DevTools → toggle device toolbar to test the mobile-first layout.

## Customize

Edit [`js/config.js`](js/config.js):

| Field | What it controls |
|-------|------------------|
| `recipientName` | Name in hero and footer |
| `birthdayISO` | Countdown target, e.g. `"2026-06-20T18:00:00"` |
| `timezone` | Date display timezone, e.g. `"Europe/Rome"` |
| `heroSubtitle` | Tagline under the name |
| `giftReveal.hiddenMessage` | Message inside the gift box |
| `wishes` | Birthday cheer cards |
| `phdJokes` | Funny PhD humour cards |
| `funSurprises` | Interactive treats on the Fun page |
| `gallery` | Photo grid entries |
| `musicFile` | Path to background music MP3 |

Refresh the browser after saving.

## Add gallery photos

1. Drop JPEG or PNG screenshots into [`assets/gallery/`](assets/gallery/).
2. Add an entry to the `gallery` array in `config.js`:

```javascript
{
  src: "assets/gallery/my-photo.jpg",
  alt: "Description for screen readers",     // required
  caption: "Short grid label",               // optional — thumbnail only
  phrase: "Funny line when enlarged",        // optional — lightbox only; omit for photo-only
},
```

Add as many entries as you like. If a file is missing, the grid shows which filename to add.

## Add background music

1. Download a royalty-free Italian piano track.
2. Save it as [`assets/audio/italian-piano.mp3`](assets/audio/italian-piano.mp3).
3. Tap the **Italian piano vibes** button (top-right) to play.

## Deploy

Upload the entire folder to any static host — no build step:

- **GitHub Pages:** push repo, enable Pages on `main` / root
- **Netlify:** drag folder onto [Netlify Drop](https://app.netlify.com/drop)
- **Cloudflare Pages / Vercel:** connect repo or upload

## File structure

```
index.html          gallery.html        wishes.html         fun.html
css/
  styles.css        animations.css
js/
  config.js         shared.js           main.js
  gallery.js        wishes.js           fun.js
  animations.js     audio.js
assets/
  gallery/          (add your JPEG/PNG screenshots here)
  audio/            (add italian-piano.mp3)
```

## Features

- Italian palette, typography, and decorative motifs
- English copy with Italian accent phrases
- Live countdown with confetti on the big day
- Mobile bottom nav / desktop top nav
- Scroll-reveal animations (respects reduced motion)
- Accessible lightbox, music toggle, and countdown