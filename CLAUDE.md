# mayank-mittall.github.io

Personal portfolio site, live at https://mayank-mittall.github.io/. Dark-minimalism
"Filmic Mono" theme (charcoal background, ember-orange accent). Plain static site —
no build step, no framework, no bundler. GitHub Pages serves the repo's raw files
directly, so what's committed is exactly what ships. Pushing to `main` is the deploy
step.

Copy conventions: lowercase, no em-dashes, no slogans or jabs at "other people"
("not slide decks", "no deck"). State things plainly, let numbers do the work.

## client naming (anonymous until approved)

As of fixes-round-3, the site describes cleverviral's clients by type instead of by
name — Mayank hasn't cleared naming them with his founder yet. **cleverviral itself
stays named** (it's his own employer and already on his LinkedIn): the homepage/`/projects`
"now: head of strategy at cleverviral" line and every case page's role line
(`at cleverviral · my part: strategy, targeting and copy.`) are unaffected.

This block exists so the switch back to real names is a single pass: when Mayank says
go, replace each anonymous title/slug below with its real name/slug everywhere this
file's other sections say to (row titles, h1s, `<title>`, meta description, og/twitter
tags, results strip, next-project labels, sitemap.xml), restore the removed
`full case study on cleverviral.co ↗` links and client quotes, and revert the
generalized brand mentions.

| real name | slug (real) | anonymous title (h1 / row) | slug (anon) | cleverviral url |
|---|---|---|---|---|
| speedsize | `speedsize` | ai media cdn for premium stores | `media-cdn` | https://cleverviral.co/case-studies/speedsize |
| trynow | `trynow` | try-before-you-buy app for shopify | `try-before-you-buy` | https://cleverviral.co/case-studies/trynow |
| itamg | `itamg` | it asset disposition company | `it-asset-disposition` | https://cleverviral.co/case-studies/itamg |
| fitmanager | `fitmanager` | fitness operations software | `fitness-software` | https://cleverviral.co/case-studies/fitmanager |
| hector ai | `hector-ai` | amazon ads platform | `amazon-ads` | https://cleverviral.co/case-studies/hector-ai |
| virtu3d | `virtu3d` | 3d product development platform | `3d-product-development` | https://cleverviral.co/case-studies/virtu3d |

Removed client quotes (restore onto their real-named page when unblinding):
- **trynow**: "you guys have been absolutely crushing it for us. you took cold outbound
  from a non-existent channel into a meaningful revenue driver in 6 weeks." — benjamin
  davis, founder, trynow.
- **itamg**: "shoutout to this entire team, you all are doing a great job and we have
  really enjoyed partnering. some big deals in the process from all of your work." —
  richy george, itamg.
- **virtu3d**: "most outreach always comes across as very generic, very non-personal,
  when i read your emails, they are personal, they're well done. i would respond to
  those emails." — enrico zamarra, sales director, virtu3d.

Generalized brand mentions to restore on unblinding:
- media-cdn's play 2: anonymous text "a jewelry reference for jewelry brands, skincare
  for skincare, apparel for apparel, and a head-to-head against a legacy cdn for
  enterprise" was originally "leibish for jewelry, mádara for skincare, allbirds for
  apparel, gap vs akamai for enterprise."
- 3d-product-development's play 5 said "browzwear customers" (now "customers of a
  partner design platform"), and its opener quote named virtu3d directly (now "the
  platform auto-generates the tech packs that role grinds out" — originally "virtu3d
  auto-generates the tech packs that role grinds out").
- All six anonymized pages' `<h1>`/situation sentences replaced the company name with
  "this platform"/"this app"/"this company" — search each page for those to find the
  exact spot the real name goes back in.

fitmanager and hector ai had no client quote to begin with (content-v4 never gave one),
so nothing to restore there beyond the title/slug/link.

## Structure

```
index.html              homepage
projects/index.html     projects page
projects/<slug>/index.html  case study pages (10, see content-v4/fixes-round-2/fixes-round-3 sections)
skills-md/index.html    skills page
the-adhd-thing/index.html    writing hub (see adhd-content-v1 section)
the-adhd-thing/<slug>/index.html  posts (3 so far: not-a-superpower, one-capture-point,
                        externalize-everything — 4 more planned, need Mayank's answers first)
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
  the ember glow). All 10 rows (as of fixes-round-3, see below) are one plain
  `<ul class='work'>` list, unfiltered, in their original order, and every row now
  links to a case page (there are no more unlinked plain rows) — 6 anonymized
  cleverviral engagements, then xeno/scrollmark/airblack/bright.

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

The /projects recommendations grid shows aditya singh and paul keegan (real LinkedIn
recommendation excerpts, 2-column grid) — these replaced the original 3, and stay
distinct from the homepage's own 3 quotes, so no quote repeats across those two pages.
(content-v3.md named "tushita jolly" as a third name, but the user's follow-up
explicitly said not to include her and gave paul keegan's quote instead — go with the
quotes actually supplied, not the doc's names, if they ever conflict again.) zoë
merchant's quote was originally the third card here too, but fixes-round-3 moved it
onto the new `/projects/bright/` case page (she's bright's managing director), so it
no longer appears on /projects itself.

**Not yet done**: /skills-md real downloads (needs actual `SKILL.md` files — none exist
yet). The mobile layout pass beyond the nav (results-strip mobile sizing,
touch-specific tweaks) also hasn't been done yet. the-adhd-thing's writing-hub
conversion (this section originally listed it as needing user-supplied content first)
is now done as of adhd-content-v1 — see that section below — though only 3 of the
planned 7 posts are live; the other 4 still need Mayank's answers to the doc's own
questions before they can be written.

## content-v4 rollout status ("the work": projects + case pages)

`content-v4-work.md` builds on content-v3.md and replaces its project rows and its
case-study plan entirely. Fully rolled out:

- **Source rule**: every client fact/number/play in the case pages comes verbatim
  from https://cleverviral.co/case-studies (for the cleverviral clients) or the
  user's own LinkedIn (for xeno, scrollmark, airblack, pre-cleverviral). Nothing
  invented — if a page has no published number (scrollmark) or no client quote, it
  simply has no numbers row / no quote block rather than a filler.
- **Role honesty**: every cleverviral case page carries the role line `at cleverviral ·
  my part: strategy, targeting and copy.` Mayank is never credited for deliverability
  (run by the cleverviral team) — that's why no case page mentions inbox
  infrastructure/deliverability plays. `fountane` was dropped from the site entirely
  per an explicit user call (it was the old "3d design service" /projects row, before
  content-v4 even shipped).
- **/projects rows**: originally 15, cut to 11 in fixes-round-2 and to 10 in
  fixes-round-3 (which also anonymized the 6 cleverviral rows and added `bright`) —
  see those sections for the current final row list. Homepage "selected work" mirrors
  4 of these with identical outcome text.
- **Case page template** (`projects/<slug>/index.html`; the current 10 pages and their
  slugs are listed in fixes-round-3 below): back link, eyebrow + h1, role line, up to 3
  big numbers (`.cnums`/`.cnum`), "the situation" (only where the doc gives one —
  xeno/scrollmark/airblack/bright skip it, they only have "what i did" steps from
  LinkedIn/resume), numbered steps (`.csteps`, muted result line after where the doc
  gives one), an optional "an opener that worked" quote block (`.copener`), an optional
  client quote (`.cquote`), originally a `full case study on cleverviral.co ↗` link on
  the cleverviral pages (removed in fixes-round-3 while anonymous — see the naming
  section above), and a "next project →" link chasing the row order in a loop. All the
  `.case`/`.cback`/`.ceyebrow`/`.cnums`/`.cnum`/`.cbody`/`.csteps`/`.copener`/`.cquote`/
  `.cfull`/`.cnext` rules live in `assets/site.css` (byte-identical across all case
  pages); each page still carries its own small inline `<style>` for the
  `.poster`/`.btn`/`.contact`/`footer` rules, matching the existing per-page-duplication
  pattern used by the other 5 pages (this predates content-v4 and wasn't refactored as
  part of it).
- **Results strip**: `RESULTS` array in `assets/site.js` originally named the four
  cleverviral clients directly; fixes-round-3 replaced those with type descriptions
  (see that section). Hero proof-strip numbers (500k+ emails, 1,000+ opportunities, $2m
  arr at xeno) are unchanged throughout.
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
- **sitemap.xml**: all new case-page URLs added (see fixes-round-2 for the current
  final list, after 2 of the original 11 case pages were deleted).

**Formerly a known limitation, now moot while anonymous**: this sandbox's egress policy
blocks `cleverviral.co` outright (`curl` returns `CONNECT tunnel failed, response 403` /
proxy `connect_rejected`, confirmed repeatedly across sessions) — the same pattern as
the `img.logo.dev` block documented above. This mattered while the site linked out to
`cleverviral.co/case-studies/<slug>`; fixes-round-2.md's own audit (run with real
browser access) confirmed those 8 links resolved and that the numbers matched
cleverviral's published figures. fixes-round-3 removed every such link while the client
names are anonymous (see the naming section above), so this block no longer affects
anything live on the site — but it will matter again if/when Mayank approves naming
clients and the `full case study on cleverviral.co ↗` links come back: a future session
(or the user) should re-verify those links resolve at that point, since this sandbox
still can't check.

## fixes round 2 (2026-09-25, same day as content-v4)

`fixes-round-2.md` was a user-run audit of the live content-v4 site plus one more
explicit content change. Rolled out:

*(Note: the client names below — speedsize, trynow, itamg, fitmanager, hector-ai,
virtu3d — are what this round actually shipped at the time, using the real names
content-v4 had given those pages. fixes-round-3 anonymized all six of them; see the
"client naming" section near the top of this file for the current slugs/titles, and
the fixes-round-3 section below for what's live now. Don't use the real names below
when describing current site state — they're historical record only.)*

- **4 projects removed entirely, per Mayank's own call**: caveminds,
  tattoo-numbing-cream-co, "logistics (3pl) platform", and "uk tax-consulting firm" are
  gone from /projects, the homepage, sitemap.xml and their case-page folders deleted
  (`projects/caveminds/`, `projects/tattoo-numbing-cream-co/` — `git rm -r`'d, not just
  unlinked). /projects is now **11 rows**: speedsize, trynow, itamg, fitmanager,
  hector ai, virtu3d, ai marketing agency (plain), accounting services firm (plain),
  xeno, scrollmark, airblack — renumbered 01-11 in that order. Remaining case pages:
  speedsize, trynow, itamg, fitmanager, hector-ai, virtu3d, xeno, scrollmark, airblack
  (9 total). The "next project" chain now runs speedsize → trynow → itamg → fitmanager →
  **hector-ai** → virtu3d → **xeno** → scrollmark → airblack → speedsize (fitmanager's
  and virtu3d's `next` links were repointed since their old targets no longer exist).
- **Hand-drawn loop no longer cuts through letters**: `.hand[data-hand="loop"] svg`'s
  box was too flat/short. Fixed in `assets/site.css`: `.hand{isolation:isolate}`,
  `.hand svg{z-index:-1}` (draw behind the text, not through it), and the loop box
  enlarged to `left:-10%;top:-34%;width:120%;height:168%`. Verified at 375/768/1440 on
  both "handled." and "problem" — the stroke now clears the capitals everywhere except
  the intentional gap at the loop's start/end.
- **Hand-drawn marks inside a headline no longer draw before the word appears**: the
  hand-marks IIFE in `assets/site.js` now splits `.hand` elements into two groups —
  `standalone` (own IntersectionObserver, unchanged: this is every case page's number
  mark, since numbers aren't inside a `[data-reveal="lines"]` heading) and `linked`
  (any `.hand` whose closest ancestor has `[data-reveal="lines"]` — the hero "handled.",
  homepage "work", every page's contact "problem", skills.md's ".md"). For `linked`
  marks, a `MutationObserver` watches the heading for Ember Motion's own `.is-in` class
  (added when the heading's word-mask reveal starts) and only then starts a 1.2s
  `setTimeout` before adding `.is-drawn` — instead of the mark's own scroll-observer
  firing independently and racing the ~1.1s word reveal. Verified via computed
  `strokeDashoffset` sampling over time that the loop stays fully undrawn until well
  after the heading reports `is-in`.
- **Hero and contact-block "let's talk →" are now solid**, matching the header's ember
  treatment: the base `.btn{...}` rule (duplicated inline per page, same
  per-page-duplication pattern as `.poster`/`.contact`/`footer` — see the content-v4
  section above) changed from an outline box (`background:none;color:var(--text)`) to
  solid (`background:var(--ember);color:var(--bg)`), and `.btn.ghost` now explicitly
  overrides back to the outline treatment (`background:none;color:var(--text)`) so
  "see the work", "email" and "linkedin" are unaffected. This is a sitewide change (all
  14 pages carry their own copy of this block) — every bare `.btn` (not `.ghost`) is now
  solid, which also includes the full-width mobile-menu CTA and skills.md's drawer
  "dm ... on linkedin" button, both intentionally, for consistency.
- **skills.md's filter chips are now generated from `SKILLS`, not hardcoded**: the
  `<div class='schips' id='sf'>` markup is now empty in HTML; its inline script builds
  `all` plus one chip per distinct `cat` actually present in the `SKILLS` array (using
  that category's own `catlabel`), so a chip can never point at zero skills again. This
  is also what silently absorbed the `deliverability` chip once
  `deliverability-triage.skill` was removed in content-v4 — no more empty-grid trap.
- **Mobile menu overlay is `inert` while closed**: `<div class='mmenu' id='mmenu'
  aria-hidden='true' inert>` in the markup of all 14 pages, with `assets/site.js`'s
  `open()`/`close()` removing/re-adding the `inert` attribute alongside the existing
  `aria-hidden` toggle. Verified Tab order from page load never reaches `.mmenu-close`
  while the overlay is closed, and that closing (Esc, link click, or the close button)
  restores `inert`.
- **Hero proof strip no longer wraps unevenly on mobile**: added
  `@media(max-width:600px){.proof{flex-direction:column;align-items:flex-start}}` to
  the shared `.proof` rule in `assets/site.css` — under 600px the three stats stack as
  a left-aligned list, one per line, instead of wrapping 1-then-2 centered.

Verified: `node --check` on site.js, HTML tag balance and no em-dashes sitewide, a
Playwright pass across all 14 remaining pages at 1440/768/375px (zero console/page
errors besides the pre-existing img.logo.dev block, zero horizontal overflow at any
width), the full next-project chain followed end-to-end (all 200s, closes the loop),
and the specific interaction checks called out above (hand-mark timing, inert/tab
order, chip list, button fill).

## fixes round 3 (2026-09-25, same day as content-v4 and fixes-round-2)

`fixes-round-3.md` did three things: cut 2 more /projects rows, switched the 6
cleverviral client case pages to anonymous mode, and rewrote the 3 pre-cleverviral
pages plus added a 4th from resume/LinkedIn detail. Rolled out:

- **`ai marketing agency` and `accounting services firm` removed** from /projects
  entirely (no case pages ever existed for these two, so nothing to delete there) —
  every remaining /projects row now links to a case page; there are no more unlinked
  plain rows (`.work .plain`'s CSS in `projects/index.html`'s inline style is now
  unused dead code, left in place rather than touched, since removing it wasn't asked
  and it's harmless).
- **Anonymous mode for the 6 cleverviral case pages**: see the "client naming" section
  near the top of this file for the full reversible mapping (real name ↔ anonymous
  title ↔ old slug ↔ new slug ↔ cleverviral url), the 3 removed client quotes, and the
  2 generalized brand-name plays. Summary of what changed on each of the 6 renamed
  pages (folders `git mv`'d to their new slugs, so history follows):
  - `<title>`/meta description/og/twitter tags, `<h1>`, `/projects` row title, homepage
    row title (3 of the 6 are on the homepage), results-strip label, and every
    "next project" label pointing at or from these pages all switched to the anonymous
    title.
  - Eyebrows shortened to a category tag (e.g. `saas, ecommerce infrastructure`) since
    the anonymous h1 is now the descriptive phrase that used to live in the eyebrow.
  - Situation paragraphs' opening sentence swapped the company name for "this
    platform"/"this app"/"this company".
  - The `full case study on cleverviral.co ↗` link (`.cfull`) removed from all 6.
  - The 3 client quotes that named the company (trynow/benjamin davis,
    itamg/richy george, virtu3d/enrico zamarra) removed entirely, per the spec.
  - 3d-product-development's opener quote originally said "virtu3d auto-generates the
    tech packs..." — the spec's own "keep the published openers, they don't name the
    client" rule didn't hold for this one specific opener, so it was edited to "the
    platform auto-generates the tech packs..." to actually satisfy the round's own "no
    client name anywhere in the page source" checklist. Flagging this explicitly since
    it's the one place this round deviated from "keep openers as-is."
  - All 6 pages already had exactly 5 numbered plays from content-v4 (the spec's "bring
    each page up to 5, a couple have 2 or 3" didn't end up applying to any of the
    survivors — that must have been about pages fixes-round-2 already deleted).
  - "The lesson" block (spec section 3) was **not added** — the spec's own text says
    "show these only after mayank approves the wording" since they're interpretive,
    and no approval has happened in this session. The draft wording is sitting in
    fixes-round-3.md if a future session gets the go-ahead to add it.
- **xeno, scrollmark, airblack rewritten from resume + LinkedIn** (titles/dates from
  LinkedIn, detail from the resume, nothing invented beyond those two sources):
  - xeno: numbers changed to `$2m` arr from 2 new lead-gen channels, `$1.4m` sql
    pipeline a quarter, `45%` faster first reach-out; "what i did" expanded from 5 to 6
    steps. Quote (pranav ahuja) and role line unchanged.
  - scrollmark: went from **no numbers row** (content-v4 explicitly said none were
    published) to 3 new numbers (`$525k` deal pipeline in 3 months, `120+` qualified
    leads from abm, `+70%` lead conversion rate) and 4 "what i did" steps (was 3). Its
    /projects row outcome text was also updated from the old placeholder "demand gen
    pipeline built from zero" to `$525k pipeline in 3 months` to match — not explicitly
    requested by the round-3 doc, but a direct consequence of it now having a real
    number, consistent with the site's "let numbers do the work" rule.
  - airblack: added a third number (`-40%` marketing cost) and expanded "what i did"
    from 3 to 6 steps. No quote (still none given). Its `next project` link now points
    to `bright` (was `speedsize`, which no longer exists under that name).
  - Titles are inconsistent across mayank's own resume and LinkedIn (resume says
    "growth marketing strategist" for xeno vs LinkedIn's "lead, growth marketing";
    "associate" vs "senior associate" for airblack; "lead" vs "specialist" for
    scrollmark) — LinkedIn's wording is what's live everywhere on the site per the
    spec's own instruction, and Mayank should align his resume to match.
- **New `/projects/bright/` case page**: eyebrow `uk marketing consultancy`, role line
  `fractional marketing consultant · oct to dec 2023 · remote, london`, numbers `+20%`
  weekly engagement and `+20%` email reply rate, 2 "what i did" steps, and zoë
  merchant's quote (`managing director, bright`) moved here from the /projects
  recommendations grid — she was already attributed to "bright" there, which is why
  this move makes sense. No cleverviral link (never a cleverviral client). Added to
  /projects as row 10 and to sitemap.xml.
- **/projects rows, final list (10, all linked)**: `media-cdn`, `try-before-you-buy`,
  `it-asset-disposition`, `fitness-software`, `amazon-ads`, `3d-product-development`,
  `xeno`, `scrollmark`, `airblack`, `bright`.
- **"Next project" chain, final** (closes the loop): media-cdn → try-before-you-buy →
  it-asset-disposition → fitness-software → amazon-ads → 3d-product-development → xeno
  → scrollmark → airblack → bright → media-cdn. (fitness-software's, amazon-ads's and
  airblack's `next` targets all changed from what fixes-round-2 had set, since two of
  the old slugs were renamed and airblack's old target no longer exists under that
  name.)
- **Results strip**: the 3 entries naming a cleverviral client directly were replaced
  with type descriptions — `pipeline for a media cdn saas`, `positive replies for an
  itad company`, `qualified leads for a try-before-you-buy app`, `qualified leads for a
  fitness ops saas`. The 2 xeno entries and the 1 generic entry (`4.2% → 9.6% reply
  rate on the same list`) are unaffected.
- **sitemap.xml**: `speedsize`/`trynow`/`itamg`/`fitmanager`/`hector-ai`/`virtu3d` URLs
  replaced with their new slugs; `bright` added. Final list matches the /projects rows
  above plus `/`, `/projects/`, `/skills-md/`, `/the-adhd-thing/`.

Verified: grepped the whole repo for every real client name/identifying string the
round's own checklist named (speedsize, trynow, itamg, fitmanager, hector, virtu3d,
leibish, mádara, allbirds, browzwear, benjamin, richy, enrico) — none appear in any
page source; confirmed no `cleverviral.co/case-studies` links remain; confirmed the old
6 slugs are gone from sitemap.xml; no em-dashes; HTML tag balance across all touched
files; `node --check` on site.js; the full next-project chain followed end-to-end
(closes the loop, all resolve). The reversible mapping above is what a future
"switch to named" pass reads from.

## adhd-content-v1 (the-adhd-thing becomes a writing hub)

`adhd-content-v1.md` converted the-adhd-thing from a single long page (a hero, an
inline "not a superpower" reframe, a 6-item "what i actually do" skim-mode list, a
"where to start" list and the footer disclaimer) into a hub-plus-posts structure, per
content-v3.md section 4. The doc's own facts all trace back to Mayank's canonical
`personal-website/webflow/adhd-copy.md`; nothing else about his life was added.

- **Hub page rewrite** (`the-adhd-thing/index.html`): hero is now just h1 `the adhd
  thing.`, sub `notes on working with adhd: what's helped me, and ai tools you can
  try.`, and a small italic disclaimer line `lived experience, not medical advice.`
  right under it (`.adhddisc`). The old `#reframe` section (an inline copy of what is
  now the first post) and `#systems` section (the 6-item skim-mode list, including its
  `localStorage`-backed toggle button and inline script) are both gone entirely. In
  their place, a `#writing` section lists posts as linked blocks (`.wposts` — title in
  serif italic, one-line summary, read time + tag, the whole block is the link),
  currently just the 3 launched posts. `#wheretostart` (the 5-item resource list) and
  the footer disclaimer paragraph (`.disc`, "i'm a gtm professional, not a
  clinician...") are unchanged, per the doc's own "keep it as it is" / "keep"
  instructions for those two.
- **3 new post pages** at `the-adhd-thing/<slug>/index.html` — `not-a-superpower`,
  `one-capture-point`, `externalize-everything` — each with: a `← the adhd thing` back
  link, a date/read-time line, an h1, a tl;dr box (`.tldr`), body copy under h2s
  (`.pbody`, 65ch reading width, 17px), a "try this" box (`.trybox`) with the prompt in
  an italic quote block (`.tryprompt`) plus a `.trycopy` button using the exact same
  `data-cursor='copy' data-copy='...'` copy-to-clipboard mechanism as the contact
  block's email button (just without `data-mailto`, since there's nothing to launch
  after copying) — verified it actually writes plain-text (straight quotes, not curly)
  to the clipboard so a pasted prompt reads naturally in a chat box, and prev/next post
  navigation (`.postnav`) that only shows a link where one exists (post 1 has no
  previous, post 3 has no next yet). All shared markup/CSS for this template
  (`.post`/`.pback`/`.pmeta2`/`.tldr`/`.pbody`/`.trybox`/`.trylabel`/`.tryprompt`/
  `.trycopy`/`.postnav`) lives in `assets/site.css`, per the doc's own build note to use
  one shared template. Posts 4 to 7 (`nets, not resolutions`, `manufacture pressure`,
  `spend hyperfocus, don't fight it`, `own the range`) are **not built** — the doc is
  explicit that each needs Mayank's answers to its own seed questions first ("nothing
  goes in that you didn't say"), and none have been answered in this session. Do not
  invent answers to those questions or list those posts on the hub before they exist.
- **`[confirm]` tags resolved by cutting**, per the doc's own build note ("every
  `[confirm]` is resolved or cut") — no answer was available in this session, so rather
  than guess:
  - one-capture-point originally had "it works because slack is already open all day.
    `[confirm: is that the real reason? if not, give me yours.]`" — the confirm-flagged
    sentence was cut; the paragraph now just says capture has to be faster than
    forgetting, without asserting a specific reason.
  - one-capture-point also had a standalone `[confirm: do you sort your slack dm with
    ai, or by hand?...]` question — cut entirely; that section stays general, as the doc
    itself said it would if unanswered.
- **No ember field and no hand-drawn marks on any adhd page** (hub or posts), per the
  doc's build note that these pages "stay calm": `data-field='off'` is set on both
  `<main>` and the shared contact section on all 4 pages (the-adhd-thing's `<main>`
  previously said `data-field='calm'`, which is a *dampened* level, not off — since the
  ember-field system defaults zones with no `[data-field]` coverage to full intensity
  rather than none, `off` had to be set explicitly, and on both the main content zone
  and the contact-section zone, to guarantee zero field for the whole scroll length of
  these pages, not just while `<main>` itself is in view). No `.hand` marks appear
  anywhere on these 4 pages, consistent with the pre-existing the-adhd-thing exemption
  noted in the content-v4 section above (this page's `#contact` h2 stays plain,
  unlike every other page's, which get the "problem" loop mark).
- **sitemap.xml**: added the 3 new post URLs.

Verified: HTML tag balance and no em-dashes across the hub and all 3 posts; no
`[confirm]` tags remain; none of the doc's own banned strings ("wired to panic",
childhood, delhi) appear anywhere; a Playwright pass across the hub, all 3 posts, and
the other main pages at 1440/375px (zero console errors besides the pre-existing
img.logo.dev block, zero horizontal overflow); the prev/next chain across the 3 posts
resolves correctly with no dangling links at either end; and the copy-prompt button
verified end-to-end (click → `.is-copied` class → clipboard contents match the intended
plain-text prompt, straight quotes included).
