# Júlio Silva — Portfolio

A personal portfolio site showcasing my skills, experience, and projects as a Backend Engineer.
Single static page, built with vanilla HTML, CSS, and JavaScript — no frameworks, no build step.

Live: https://jmbcs.github.io/portfolio/

## Features

- **Technical/terminal aesthetic**: monospace accents, precise grid, dark-first palette with a single blue accent
- **Light/dark mode**: persisted to `localStorage`, applied before first paint (no flash)
- **Bilingual**: English and pt-PT; English lives in the markup, `?lang=pt` deep-links the translation
- **Responsive**: mobile-first, works across phone, tablet, and desktop
- **Tasteful animations**: staggered scroll reveals, hover lifts; fully disabled under `prefers-reduced-motion`
- **Accessible**: keyboard focus indicators, skip link, Escape-to-close menu, labelled form fields, ARIA on icon-only controls
- **SEO ready**: Open Graph / Twitter Card metadata, canonical and `hreflang` URLs, `robots.txt`, `sitemap.xml`, and `Person` JSON-LD
- **Contact form**: submits to Formspree with inline success/error states

## Technologies

- HTML5
- CSS3 (custom properties, Grid, Flexbox)
- Vanilla JavaScript (IntersectionObserver, `requestAnimationFrame`-throttled scroll)
- Inline SVG icons (no icon-font dependency)
- Google Fonts — Inter (body) and JetBrains Mono (accents)

## Sections

1. **Hero** — intro and primary calls to action
2. **About** — background and key details
3. **Experience** — work history as a timeline
4. **Skills** — technical skills by category (core stack highlighted)
5. **Projects** — personal projects, then team products worked on, each attributed to its owner
6. **Additional** — relevant links and languages
7. **Contact** — direct links and a contact form

## Run locally

```bash
git clone https://github.com/jmbcs/portfolio.git
cd portfolio
python -m http.server 8000
# open http://localhost:8000
```

## Customization

- Content and metadata: `index.html` (including the `<head>` SEO/OG tags and JSON-LD)
- Theme tokens (colors, spacing, type scale): the `:root` / `[data-theme="dark"]` blocks in `styles.css`
- Behavior (theme toggle, nav, reveals, form): `script.js`

English copy is edited in `index.html` — every translatable node carries a
`data-i18n` key, and `script.js` reads the English text straight off the DOM.
Only the Portuguese strings live in JavaScript, in the `PT` object. Adding a
string means adding the markup plus one `PT` entry.

## Checks

`.github/workflows/checks.yml` validates the markup with the Nu HTML Checker on
every push and pull request, and sweeps external links weekly with lychee.
Run the link sweep on demand from the Actions tab.

## License

Open source under the [MIT License](LICENSE).

## Contact

Júlio Silva — [julio.m.b.c.silva@gmail.com](mailto:julio.m.b.c.silva@gmail.com)

Project link: [https://github.com/jmbcs/portfolio](https://github.com/jmbcs/portfolio)
