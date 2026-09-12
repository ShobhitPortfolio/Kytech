# Kytech — Digital Systems, Engineered Differently

The Kytech marketing site. Static HTML/CSS/JS, no build step, no dependencies.

## Structure

```
index.html          Page markup
css/
  styles.css         Layout, typography, colors, components (fonts embedded as data URIs)
  animations.css      Scroll-reveal system, cursor ring, scroll-progress bar, keyframes
js/
  main.js             Nav scroll state, industry accordion, FAQ accordion, mobile menu
  animations.js        Scroll-progress bar, cursor ring, hero load-in, reveal-on-scroll, magnetic buttons
```

## Running locally

No build step — open `index.html` directly in a browser, or serve the folder:

```
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploying

Works as-is on GitHub Pages, Netlify, Vercel, or any static host — just point it at this folder.

## Notes

- Fonts (Marble Crown, Atavian, Thegralke, Myriad Pro) are embedded directly in `styles.css` as base64 data URIs, so there are no separate font files to host or link.
- The custom cursor ring and most motion effects respect `prefers-reduced-motion` and are automatically disabled on touch devices.
- Team/industry photos are embedded inline in `index.html` as base64 data URIs.
