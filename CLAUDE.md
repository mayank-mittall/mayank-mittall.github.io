# mayank-mittall.github.io

Personal portfolio site, live at https://mayank-mittall.github.io/. Dark-minimalism
"Filmic Mono" theme (charcoal background, ember-orange accent). Plain static site —
no build step, no framework, no bundler. GitHub Pages serves the repo's raw files
directly, so what's committed is exactly what ships. Pushing to `main` is the deploy
step.

Copy conventions: lowercase, no em-dashes, no slogans or jabs at "other people"
("not slide decks", "no deck"). State things plainly, let numbers do the work.

## Structure

```
index.html              homepage
projects/index.html     projects page
skills-md/index.html    skills page
the-adhd-thing/index.html
404.html                custom 404
assets/site.css          shared CSS (Ember Motion/Field, base reset, nav, results strip, mobile menu)
assets/site.js           shared JS (same systems + mobile menu logic)
assets/fonts/             self-hosted Archivo + Instrument Serif woff2s
assets/logos/             self-hosted tool/GTM logo PNGs (160x160, NN-name.png)
robots.txt, sitemap.xml, .nojekyll
```

Clean URLs via directory-style routing (`/projects/`, not `/projects.html`) — each
"page" is `foldername/index.html`. Follow that pattern for any new page, and add it
to `robots.txt` / `sitemap.xml`.

## Shared assets vs page-specific inline CSS/JS

Each page still has its own inline `<style>` blocks for page-specific layout (hero
sizing, section-specific components like `.sys`/`.work`/`.recs`/`.als`), but anything
byte-identical across all 5 pages lives in `/assets/site.css` and `/assets/site.js`
instead of being copy-pasted per page. This includes:

- Base reset/typography (`:root` vars, body, grain animation, `.wrap`, `.top` nav shell)
- **Ember Motion**: scroll/reveal/hover animation system (`data-reveal`,
  `data-magnetic`, `data-roll`, `data-cursor` attributes)
- **Ember Field**: background ambient canvas effect (`data-spotlight`, `data-field`
  attributes)
- The results-strip ticker (see below) and the mobile menu overlay/toggle
- `@font-face` declarations

When adding something that should appear identically on every page, put it in the
shared files, not inline. When editing something page-specific (e.g. one page's hero
padding), check first whether it's actually in the shared file before duplicating an
override inline — `grep` the class name across all 5 HTML files and `assets/site.css`.

## Sitewide conventions (content-v3 pass)

- No `.band` raised section backgrounds and no section borders — the page is one
  continuous charcoal surface, sections separated by space only
  (`padding-block: clamp(56px, 7vw, 104px)` as the base, tightened further per-section
  where noted inline). Hairlines *inside* lists (work rows, resources) are fine and
  intentional — only section-level dividers were removed.
- **Contact block** (identical on every page, in the `#contact` section): h2 `got a
  go-to-market problem?`, then `tell me what's stuck. 30 minutes on a call is usually
  enough to know if i can help.`, then three buttons: `let's talk →` (cal.com), `email`
  (button, not a link — click copies the address to clipboard, shows a "copied" tag,
  and also fires `mailto:` for visitors with a configured mail client; the address is
  never shown as visible text), `linkedin`. Implemented via `data-cursor='copy'
  data-copy='...' data-mailto='...'` on a `<button>`; the click handler lives in
  `assets/site.js`.
- **Footer** (identical on every page): `© 2026 mayank mittal` on the left, `tool logos
  via logo.dev` on the right, inside a `.wrap` for column alignment. No email/linkedin
  links in the footer (they're in the contact block instead).
- **Results strip**: a slow (24px/s) horizontal ticker of `number + label` result pairs
  separated by ember dots, sitting right below the hero on the homepage and replacing
  the old meta line on `/projects` (which also folds in the 3 hero-stat numbers via a
  `data-extra` JSON attribute on `.rtrack`, since /projects has no separate static
  trio). The item list lives in one JS array (`RESULTS` in `assets/site.js`) — add a
  result there and it shows up everywhere the strip is used. It stops completely (not
  just slows) on hover or keyboard focus, and under `prefers-reduced-motion: reduce`
  it renders as a static wrapped list instead of animating (no JS transform loop at
  all in that case — CSS handles the wrap).
- Every `via cleverviral` label is now `at cleverviral`.

## Mobile nav

Below 720px width, the desktop horizontal nav (`.mx-nav-links`) is hidden and replaced
with: `mm.` on the left (unchanged), a small solid `let's talk →` button
(`.nav-cta-m`), and a `menu` button (`.menu-btn`) that toggles a full-screen overlay
(`.mmenu`) with the same section links stacked in poster type plus a full-width
`let's talk →` button at the bottom. The overlay closes on link click, its own close
button, or Esc, and locks page scroll while open (`html{overflow:hidden}`) — logic is
in `assets/site.js`, a standalone IIFE that runs regardless of reduced-motion
preference (unlike Ember Motion, which is fully disabled under reduced motion).
404.html's overlay has only 3 links (no contact section on that page, matching its
desktop nav).

## Security/SEO — don't remove

Each page has a CSP `<meta>` tag, `referrer` meta set to
`strict-origin-when-cross-origin`, canonical URL, OG/Twitter meta tags, and every
`target="_blank"` link carries `rel="noopener noreferrer"`.

CSP is `script-src 'self' 'unsafe-inline'` / `style-src 'self' 'unsafe-inline'`, which
already covers loading `/assets/site.css` and `/assets/site.js` (same-origin) with no
edits needed. `img-src` is `'self' data: https:`, so hotlinked logo images load fine
too. `font-src` is `'self' data:` (Google Fonts domains were removed once fonts were
self-hosted — see below).

## Fonts — self-hosted

Archivo (variable, wdth 62–125%, wght 300–900) and Instrument Serif (italic + normal,
400) are self-hosted at `/assets/fonts/*.woff2`, loaded via `@font-face` in
`assets/site.css`. Only the "latin" Google Fonts subset was pulled (plain English text
+ basic punctuation covers everything this site uses) — if you ever add non-Latin
text, re-fetch the fuller subset from
`https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,300..900&family=Instrument+Serif:ital@0;1&display=swap`
with a browser User-Agent header to get current woff2 URLs, since Google rotates them.

## Logos in the homepage marquee

Most tool/GTM logos are self-hosted at `/assets/logos/NN-name.png` (160×160 PNGs) to
avoid depending on a third-party CDN staying up (this replaced an earlier setup that
hotlinked Webflow's S3 CDN). Prefer self-hosting for any new logo when your environment
can actually fetch and save the image — see the note below about sandbox network
policy blocking this in Claude Code sessions so far.

### logo.dev API — still hotlinked (OpenAI only)

1 logo (OpenAI) is still loaded live from `img.logo.dev` rather than self-hosted — not
by choice, but because every Claude Code session so far that touched this repo has run
in a sandbox whose network egress policy blocks `img.logo.dev` and the tool vendors'
own domains outright (confirmed repeatedly, including testing `github.com/favicon.ico`
directly — also blocked). Every other logo that used to be on this list (GitHub,
Cal.com, Calendly, AI Ark, Gamma) is now self-hosted, once the user sent real files.
If a future session gets an OpenAI file too, download it as a 160×160 PNG into
`/assets/logos/`, swap the `<img src>`, and remove the logo.dev attribution
line/section entirely, since nothing will depend on it anymore.

The OpenAI tile specifically uses `&theme=dark` for a white/light variant of the mark
that's visible against the dark background (OpenAI's default mark is black). Don't
confuse it with the self-hosted Codex logo (`07-codex.png`, no longer in the marquee)
— Codex was removed at one point as a "duplicate" of OpenAI, then the OpenAI tile was
mistakenly removed instead in a later pass; the OpenAI (white, theme=dark) tile is the
one that should stay.

**Self-hosted from user-uploaded files** (all 160×160 PNGs, converted with Pillow —
`pip install Pillow`, since no image tooling is preinstalled): `24-excalidraw.png`,
`25-miro.png`, `26-ai-ark.png`, `27-gamma.png`, `28-canva.png`, `29-github.png`,
`30-calendly.png`, `31-calcom.png`, `32-clickup.png`, `33-coda.png`, `34-notion.png`,
`35-obsidian.png`, `36-wispr.png`, `37-zapier.png`. `36-wispr.png` is Wispr Flow (the
voice-dictation app) — the user asked for "whisper" but the file they uploaded is
branded "wispr", so that's what's live; check with them if OpenAI's Whisper was
actually meant instead.

**A recurring gotcha worth flagging to the user proactively**: whether a pasted image
lands as a readable file is inconsistent turn to turn in this chat client — sometimes
inline-pasted images arrive with a `[Image: source: /path/to/file]` tag (readable,
usable), other times the exact same paste method produces no file at all (visible to
Claude, but nothing on disk). There's no reliable way to tell in advance which will
happen, so always check for a `source:` path before assuming an image is usable, and if
one isn't there, ask the user to resend — don't guess or fabricate a placeholder. The
reliable fallback that worked in the end: the user uploaded the files directly to
`assets/logos/` via GitHub's web UI ("Add files via upload"), with arbitrary names
(`Ai ark.png`, `cal_com_logo.jpeg`, etc.) — a future session should `git pull`, check
for files in `assets/logos/` that don't match the `NN-name.png` convention, resize them
to 160×160 PNGs with sequential numbers, delete the raw originals, and wire up the
`<img src>`s, rather than assuming logos only ever arrive via chat.

Publishable key (client-safe, meant to be inlined in `<img src>` — not a secret):

```
pk_BoDdLTqTSaaLs0t57KZ1hA
```

Usage: `https://img.logo.dev/<domain>?token=pk_BoDdLTqTSaaLs0t57KZ1hA&size=160&format=png`
(add `&theme=dark` for a variant meant for dark backgrounds, as used for OpenAI).
Docs: https://www.logo.dev/docs/logo-images/introduction

Free tier requires an attribution link back to logo.dev for commercial use — that's
the small "tool logos via logo.dev" line in the footer. Once all logos are
self-hosted, that line (and this section) can go.

## content-v3 rollout status

`content-v3.md` (the full redesign/rewrite spec) is being rolled out in the phases it
defines in its own "build order" section. Done so far: sitewide changes (bands,
contact block, footer, results strip, "at cleverviral"), mobile nav, and the homepage
copy rewrite + reorder. **Not yet done** (needs user-supplied content before it can
be): the /projects "other three" testimonials (zoë merchant, aditya singh, tushita
jolly — no quote text available yet), the-adhd-thing as a writing hub with real posts
(current posts are single paragraphs; doc wants them "expanded with you before
published"), and /skills-md real downloads (needs actual `SKILL.md` files — none
exist yet). The rest of /projects' own copy cleanup (eyebrow/h1 change, dropping the
now-line duplicate, the full case-study template) and the mobile layout pass beyond
the nav (results-strip mobile sizing, touch-specific tweaks) also haven't been done
yet — see content-v3.md section 7 for the intended order.
