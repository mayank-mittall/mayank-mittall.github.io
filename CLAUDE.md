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
projects/<slug>/index.html  case study pages (11, see content-v4 section below)
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
- The `at cleverviral` / `before that` group labels above the work rows were removed
  entirely (they created a visible split in what's now one plain list on both the
  homepage and /projects). The "now: head of strategy at cleverviral" line is the only
  surviving "at cleverviral" text on either page, and it appears exactly once per page:
  under the hero sub on the homepage, under the h1 on /projects.
- Homepage `#built` (the logo marquee) ends with one centered muted line (`.toolagnostic`,
  15px, `color:var(--muted)`) below both logo rows: "tool-agnostic. married to the
  outcome." The `tool logos via logo.dev` credit stays in the footer, not here.
- /projects has no filter chips anymore (`.chips`/`#pf` and its JS were removed
  entirely — the sticky solid-background bar was rendering as a visible dark box over
  the ember glow). All 15 rows (as of content-v4, see below) are one plain
  `<ul class='work'>` list, unfiltered, in their original order (8 named/linked
  cleverviral engagements, 4 unnamed plain rows, then xeno/scrollmark/airblack).

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
contact block, footer, results strip, dropping the group labels), mobile nav, the
homepage copy rewrite + reorder, and /projects' own cleanup (no eyebrow, h1 "projects.",
cut the "what happened, with numbers." sub, filter chips removed entirely, meta line
replaced by the results strip, one plain unfiltered work list, the now-line moved
under the h1).

The /projects recommendations grid now shows zoë merchant, aditya singh and paul
keegan (real LinkedIn recommendation excerpts) — this replaced the original 3, which
stay on the homepage unchanged, so no quote repeats across pages. (content-v3.md named
"tushita jolly" as a third name, but the user's follow-up explicitly said not to
include her and gave paul keegan's quote instead — go with the quotes actually
supplied, not the doc's names, if they ever conflict again.)

**Not yet done** (needs user-supplied content before it can be): the-adhd-thing as a
writing hub with real posts (current posts are single paragraphs; doc wants them
"expanded with you before published"), and /skills-md real downloads (needs actual
`SKILL.md` files — none exist yet). The mobile layout pass beyond the nav
(results-strip mobile sizing, touch-specific tweaks) also hasn't been done yet.

## content-v4 rollout status ("the work": projects + case pages)

`content-v4-work.md` builds on content-v3.md and replaces its project rows and its
case-study plan entirely. Fully rolled out:

- **Source rule**: every client fact/number/play in the 11 case pages comes verbatim
  from https://cleverviral.co/case-studies (for the 8 cleverviral clients) or the
  user's own LinkedIn (for xeno, scrollmark, airblack, pre-cleverviral). Nothing
  invented — if a page has no published number (scrollmark) or no client quote, it
  simply has no numbers row / no quote block rather than a filler.
- **Role honesty**: every cleverviral case page carries the role line `at cleverviral ·
  my part: strategy, targeting and copy.` Mayank is never credited for deliverability
  (run by the cleverviral team) — that's why no case page mentions inbox
  infrastructure/deliverability plays. `fountane` was dropped from the site entirely
  per an explicit user call (it was the old "3d design service" /projects row).
- **/projects rows** (15 total, replacing the old 16): 8 named rows link to case pages
  (`/projects/<slug>/`), 4 rows (`ai marketing agency`, `accounting services firm`,
  `uk tax-consulting firm`, `logistics (3pl) platform`) stay plain — no link, no hover
  state (`<div class='plain'>` instead of `<a>`, styled via `.work .plain` alongside
  `.work a` in `projects/index.html`'s own inline style) — and 3 rows (xeno, scrollmark,
  airblack) also link to case pages. Homepage "selected work" mirrors 4 of these
  (speedsize, itamg, trynow, xeno) with identical outcome text.
- **Case page template** (`projects/<slug>/index.html`, 11 pages: speedsize, trynow,
  itamg, fitmanager, tattoo-numbing-cream-co, hector-ai, virtu3d, caveminds, xeno,
  scrollmark, airblack): back link, eyebrow + h1, role line, up to 3 big numbers
  (`.cnums`/`.cnum`), "the situation" (only where the doc gives one — xeno/scrollmark/
  airblack skip it, they only have "what i did" steps from LinkedIn), numbered steps
  (`.csteps`, muted result line after where the doc gives one), an optional "an opener
  that worked" quote block (`.copener`), an optional client quote (`.cquote`), a `full
  case study on cleverviral.co ↗` link (the 8 cleverviral pages only — xeno/scrollmark/
  airblack have no such link), and a "next project →" link chasing the doc's own row
  order, wrapping from airblack back to speedsize. All the `.case`/`.cback`/`.ceyebrow`/
  `.cnums`/`.cnum`/`.cbody`/`.csteps`/`.copener`/`.cquote`/`.cfull`/`.cnext` rules live in
  `assets/site.css` (byte-identical across all 11 pages); each page still carries its
  own small inline `<style>` for the `.poster`/`.btn`/`.contact`/`footer` rules, matching
  the existing per-page-duplication pattern used by the other 5 pages (this predates
  content-v4 and wasn't refactored as part of it).
- **Results strip**: `RESULTS` array in `assets/site.js` fully replaced with the
  content-v4 list (speedsize, itamg, trynow, fitmanager numbers, plus the pre-existing
  xeno numbers). Hero proof-strip numbers (500k+ emails, 1,000+ opportunities, $2m arr
  at xeno) are unchanged.
- **skills-md**: `deliverability-triage.skill` removed from the `SKILLS` array (outside
  Mayank's own scope per the role-honesty rule above) — 7 skills remain.
- **Hand-drawn marks** (new design system): `.hand[data-hand="loop"|"under"]` in
  `assets/site.css` + a standalone IIFE at the end of `assets/site.js` that injects an
  SVG path into every `.hand` element and adds `.is-drawn` via IntersectionObserver
  (stroke animates once, 0.9s, on scroll-into-view; shows fully drawn immediately under
  `prefers-reduced-motion: reduce`). Markup pattern: wrap one word in
  `<span class="hand" data-hand="loop|under">word</span>`. Placed at: homepage hero
  "handled." (loop, replacing the old `<em>`-based ember-color treatment), homepage
  "selected work" → "work" (under), the shared `#contact` h2 → "problem" (loop, on every
  page that has a contact section), skills.md h1 → ".md" (under), and each case page's
  first big number (under). the-adhd-thing intentionally has none ("that page stays
  calm") and neither does 404.html (no contact section there either).
  **Gotcha hit and fixed**: `.cnum span{...}` (meant to style only the muted label span
  next to each number) was a descendant selector, so it also matched the `.hand` span
  nested inside `.cnum b` for the first number, shrinking it to the label's 13px/block
  styles. Fixed by scoping it to `.cnum>span` (direct child only). If you add another
  `.hand`-wrapped element nested inside a styled parent, check for this same kind of
  accidental descendant-selector collision.
- **sitemap.xml**: all 11 new case-page URLs added.

**Known limitation, unresolved**: this sandbox's egress policy blocks `cleverviral.co`
outright (`curl` returns `CONNECT tunnel failed, response 403` / proxy `connect_rejected`
for both the base `/case-studies` page and all 8 individual client slugs, confirmed
repeatedly across sessions) — the same pattern as the `img.logo.dev` block documented
above. content-v4-work.md's own build order ends with "check every cleverviral.co link
opens, then publish"; that verification step could not be performed from inside this
sandbox. The 8 links were implemented exactly as given in the spec and are believed
correct (the user stated they read cleverviral.co/case-studies directly on 2026-09-25),
but a future session with working egress to cleverviral.co — or the user themselves —
should do a final click-through pass on all 8 external links before treating this as
fully verified.
