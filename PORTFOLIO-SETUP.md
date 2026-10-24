# Temmy Tee Graphics — Portfolio Site

A fast, single-page React + Vite + Tailwind site using the supplied Temmy Tee
Graphics logo artwork and matching blue, white and charcoal brand palette.

---

## 1. Add your real artwork (5 minutes)

Every project in the gallery is **structured data**. Nothing needs to be
redesigned to add, remove or re-order work.

1. Put your exported design in the matching folder under `public/images/`, e.g.
   `public/images/church/sunday-service-flyer.jpg`, or host it at a direct image URL.
2. Open `src/data/projects.ts` and find the project you want to update:

```ts
slot("church-sunday-flyer", "Sunday Service Flyer", "church", 4 / 5, "Portrait flyer · 4:5", "brand", 0, {
  featured: true,
  image: "/images/church/sunday-service-flyer.jpg",
  gallery: ["/images/church/sunday-service-flyer-2.jpg"], // optional extra views
  year: "2025",
  client: "Client name (optional)",
  description: "One or two sentences about the design.",
  objective: "What the design had to achieve (optional).",
  deliverables: ["Portrait flyer", "Instagram crop"],
})
```

3. Save. The image now appears in the gallery, the lightbox, the project page and
   any category card that references it.

**Rules of thumb**

- `ratio` = width ÷ height of the artwork. Set it to the real proportions so
  nothing is cropped (e.g. `4 / 5` portrait flyer, `1` square post, `16 / 9` banner).
- `featured: true` promotes a project to the homepage "Featured Work" grid.
- `also: ["flyer"]` lets one artwork appear under a second category filter.
- Delete a `slot(...)` line to remove that project.
- Add a new line to add a new project — the filters, counts and pagination-free
  gallery update themselves.

Until an `image` URL is supplied, a clearly labelled on-brand placeholder is
shown so the layout can be reviewed first. Placeholders are never presented as
finished client work.

## 2. Set your contact details

`src/data/site.ts` → `site.contact`:

```ts
whatsapp: "2348000000000",   // international format, no "+", no spaces
whatsappDisplay: "+234 800 000 0000",
email: "hello@temmyteegraphics.com",
location: "...",
availability: "...",
```

Social links live in `site.socials` — only keep the profiles that really exist
(both Pinterest profiles are pre-filled).

## 3. Connect the inquiry form

`src/data/site.ts` → `site.formEndpoint`.

- **Recommended:** create a free form at [Formspree](https://formspree.io),
  [Getform](https://getform.io), [Basin](https://usebasin.com) or
  [Web3Forms](https://web3forms.com) and paste the endpoint, e.g.
  `"https://formspree.io/f/abcdwxyz"`. Submissions are then delivered to that
  inbox, with real success/error handling.
- **Left empty:** the form validates as normal and then opens WhatsApp with the
  complete, formatted project brief ready to send — so no enquiry is ever lost.
  The site tells the visitor exactly what happened; it never pretends to send.

## 4. Edit the words

| Content | File |
| --- | --- |
| Services (titles, descriptions, deliverables) | `src/data/site.ts` → `services` |
| About copy, philosophy, tools, studio details | `src/data/site.ts` → `about` |
| Headlines, marquee items, CTA labels | `src/data/site.ts` → `site`, `marqueeItems`, `cta` |
| Project titles, categories, descriptions | `src/data/projects.ts` |

## 5. Run it

```bash
npm install
npm run dev      # local preview
npm run build    # production build → dist/
```

## 6. Structure

```
src/
  components/   Logo, ArtworkFrame, Nav, Footer, ProjectCard, Lightbox, Reveal
  data/         site.ts (config + copy), projects.ts (portfolio data)
  lib/          router.ts (tiny hash router)
  pages/        Home, Portfolio, ProjectDetail, Services, About, Contact
public/         favicon.svg, og.jpg (social preview), robots.txt, sitemap.xml
```

## 7. Accessibility & performance notes

- Keyboard support throughout: skip link, visible focus rings, Esc closes the
  menu and lightbox, ←/→ move between artworks in the lightbox.
- `prefers-reduced-motion` disables reveals, drift and marquee animations.
- Lazy loading on all gallery imagery; the artwork's true aspect ratio is
  reserved before load so there is no layout shift.
- Descriptive `alt` text on every artwork, SEO metadata, Open Graph/Twitter
  cards, JSON-LD structured data and a sitemap are all included.
