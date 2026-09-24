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
or it will be silently blocked. `style-src`/`font-src` no longer allow Google Fonts
domains (see Fonts below) — the site now makes zero third-party network requests
except the still-hotlinked logos noted below.

## Fonts — self-hosted

Archivo (variable, wdth 62–125%, wght 300–900) and Instrument Serif (italic + normal,
400) are self-hosted at `/assets/fonts/*.woff2`, loaded via `@font-face` in the first
inline `<style>` block of each page. Only the "latin" Google Fonts subset was pulled
(plain English text + basic punctuation covers everything this site uses) — if you
ever add non-Latin text, re-fetch the fuller subset from
`https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,300..900&family=Instrument+Serif:ital@0;1&display=swap`
with a browser User-Agent header to get current woff2 URLs, since Google rotates them.

## Logos in the homepage marquee

Most tool/GTM logos are self-hosted at `/assets/logos/NN-name.png` (160×160 PNGs) to
avoid depending on a third-party CDN staying up (this replaced an earlier setup that
hotlinked Webflow's S3 CDN). Prefer self-hosting for any new logo when your environment
can actually fetch and save the image.

### logo.dev API — still hotlinked (GitHub, AI Ark, Gamma, Cal.com, Calendly)

5 logos (GitHub, AI Ark, Gamma, Cal.com, Calendly) are still loaded live from
`img.logo.dev` rather than self-hosted — not by choice, but because every Claude Code
session so far that touched this repo has run in a sandbox whose network egress policy
blocks `img.logo.dev` and the tool vendors' own domains outright (confirmed twice,
including testing `github.com/favicon.ico` etc. directly — also blocked). If a future
session has broader network access, download these 5 as 160×160 PNGs into
`/assets/logos/` following the `NN-name.png` convention, swap the `<img src>`s to local
paths, and remove the logo.dev attribution line once none of the marquee depends on it.
(A 6th logo, OpenAI, was removed entirely — it duplicated the already-self-hosted Codex
mark, which is also OpenAI's logo.)

Publishable key (client-safe, meant to be inlined in `<img src>` — not a secret):

```
pk_BoDdLTqTSaaLs0t57KZ1hA
```

Usage: `https://img.logo.dev/<domain>?token=pk_BoDdLTqTSaaLs0t57KZ1hA&size=160&format=png`
Docs: https://www.logo.dev/docs/logo-images/introduction

Free tier requires an attribution link back to logo.dev for commercial use — that's
the small "tool logos via logo.dev" line under the homepage marquee. Once all logos
are self-hosted, that line (and this section) can go.
