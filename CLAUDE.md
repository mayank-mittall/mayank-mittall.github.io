# mayank-mittall.github.io

Personal portfolio site, live at https://mayank-mittall.github.io/. Dark-minimalism
"Filmic Mono" theme (charcoal background, ember-orange accent). Plain static site —
no build step, no framework, no bundler. Every page is a single self-contained HTML
file with CSS and JS inlined in `<style>`/`<script>` tags. GitHub Pages serves the
repo's raw files directly, so what's committed is exactly what ships. Pushing to
`main` is the deploy step.

## Structure

```
index.html              homepage
projects/index.html     projects page
skills-md/index.html    skills page
the-adhd-thing/index.html
404.html                custom 404
assets/logos/           self-hosted tool/GTM logo PNGs (160x160, NN-name.png)
robots.txt, sitemap.xml, .nojekyll
```

Clean URLs via directory-style routing (`/projects/`, not `/projects.html`) — each
"page" is `foldername/index.html`. Follow that pattern for any new page, and add it
to `robots.txt` / `sitemap.xml`.

## Custom systems — reuse, don't replace

- **Ember Motion**: scroll/reveal/hover animation system (`data-reveal`,
  `data-magnetic`, `data-roll`, `data-cursor` attributes). Inlined CSS + JS at the
  bottom of each page.
- **Ember Field**: background ambient canvas effect (`data-spotlight`, `data-field`
  attributes). Also inlined per page.

## Security/SEO — don't remove

Each page has a CSP `<meta>` tag, `referrer` meta set to
`strict-origin-when-cross-origin`, canonical URL, OG/Twitter meta tags, and every
`target="_blank"` link carries `rel="noopener noreferrer"`.

The CSP's `img-src` is `'self' data: https:`, so any HTTPS image source (including
hotlinked logo APIs) already loads without editing the CSP. `script-src`/`style-src`
are locked down — if you add a new external script or stylesheet origin, add it there
or it will be silently blocked.

## Logos in the homepage marquee

Most tool/GTM logos are self-hosted at `/assets/logos/NN-name.png` (160×160 PNGs) to
avoid depending on a third-party CDN staying up (this replaced an earlier setup that
hotlinked Webflow's S3 CDN). A newer batch was added via the logo.dev API instead
(see below) — that's a deliberate tradeoff, not an inconsistency: use logo.dev when
adding a logo from an environment that can't fetch/save the image locally, and prefer
self-hosting when you can, staying consistent with whichever an image you already committed.

### logo.dev API

Used for logos not self-hosted. Publishable key (client-safe, meant to be inlined
in `<img src>` — not a secret):

```
pk_BoDdLTqTSaaLs0t57KZ1hA
```

Usage: `https://img.logo.dev/<domain>?token=pk_BoDdLTqTSaaLs0t57KZ1hA&size=160&format=png`
(add `&theme=dark` for a variant meant for dark backgrounds — used for OpenAI's mark).
Docs: https://www.logo.dev/docs/logo-images/introduction

Free tier requires an attribution link back to logo.dev for commercial use — that's
the small "tool logos via logo.dev" line under the homepage marquee. Don't remove it
without upgrading the plan.
