# APRILIHA SINGH — PART 2: BESPOKE CONFIGURATOR, SEO/GEO/AEO & FOLDER STRUCTURE
### Companion document to `apriliha-singh-website-build-prompt.md`

This document extends the base brand/design spec with three things you asked for in depth:
1. A **part-by-part bespoke configurator** (build-your-own necklace/bracelet/mala, each part individually priced and individually storied)
2. **SEO + GEO + AEO** strategy so the site ranks in Google *and* gets cited by AI answer engines (ChatGPT, Perplexity, Google AI Overviews, Gemini)
3. A **production-grade folder structure** so any developer can open the repo cold and understand it in five minutes

Read this alongside Part 1 — colors, type, motion, and tone rules from that document still apply everywhere below.

---

## 1. THE BESPOKE CONFIGURATOR — PHILOSOPHY

This is the single most important feature on the site. It is not a "product options dropdown" — it is the *bespoke atelier experience*, translated to screen. The client should feel like they are sitting with a karigar (craftsperson), building a piece stone by stone, exactly as they would in a real Jaipur atelier consultation.

**Core principle:** Every part the client selects has (a) a visual, (b) a price, (c) a short story/provenance. Nothing is just a SKU. A gold clasp is not "Clasp — Gold — $80." It's "The Kadi Clasp — hand-finished 18k gold, inspired by Rajasthani anklet fastenings — $80."

This applies to three product families at launch:
- **Necklace Builder** (Maala)
- **Bracelet Builder**
- **Mala Builder** (prayer/meditation mala — beads, guru bead, tassel, spacers)

---

## 2. CONFIGURATOR DATA MODEL

Design this as a proper schema from day one — it will save the dev team months later.

```
Product (e.g. "Necklace")
 └── Component Slots (ordered, e.g. Base Chain → Centerpiece → Accent Stones → Clasp)
      └── Part Options (the actual selectable pieces within a slot)
           ├── id
           ├── name                  ("The Kadi Clasp")
           ├── slot_type             ("clasp" | "chain" | "centerpiece" | "accent" | "bead" | "tassel" | "guru_bead" | "spacer")
           ├── material               ("18k gold vermeil" | "oxidized silver" | "raw garnet" | ...)
           ├── price                 (base price, in smallest currency unit)
           ├── price_modifiers[]     (e.g. +$40 if paired with a specific centerpiece, for engineering/setting complexity)
           ├── weight_grams
           ├── compatible_slots[]    (which other slot types this can legally combine with)
           ├── incompatible_with[]   (hard constraints — e.g. this delicate chain cannot carry a heavy centerpiece)
           ├── images[]              (studio cutout on transparent/neutral background FOR the builder canvas,
                                       + one editorial lifestyle shot for the story panel)
           ├── story {
                 headline            ("Born from the anklets of old Udaipur")
                 narrative           (60–120 words, sensory, specific — see Section 6 template)
                 craft_time          ("Hand-finished over 3 days by a single karigar")
                 origin_region       ("Jaipur, Rajasthan")
               }
           ├── lead_time_days
           └── in_stock_quantity     (bespoke = often made-to-order; if 0, show "Made to order — ships in X weeks" not "Out of stock")

Configuration (a client's in-progress or completed build)
 ├── id (UUID)
 ├── product_type
 ├── selected_parts[]     (ordered list of Part Options chosen, one per required slot)
 ├── computed_price       (sum of parts + modifiers + any engraving/personalization fee)
 ├── preview_image        (server-composited flat-lay of the assembled piece, generated on save)
 ├── client_notes         (optional freeform note, e.g. "for my mother, she prefers shorter length")
 ├── status                ("draft" | "saved" | "in_cart" | "ordered" | "in_production" | "shipped")
 └── created_at / updated_at
```

**Why this matters:** the `compatible_slots` / `incompatible_with` fields let you enforce real craft constraints (a hairline chain literally cannot structurally hold a heavy uncut stone) without hardcoding logic into the frontend — it lives in data, so the atelier team can update it without a developer.

---

## 3. CONFIGURATOR UX FLOW — STEP BY STEP

This is the flow the client experiences, end to end. Build it as a **guided, linear builder** (like Apple's Mac configurator or a Rolls-Royce "Configure Your Own") — never a busy all-options-at-once page.

### Step 0 — Entry
From the Collections page, a piece is tagged **"Bespoke — Build This Piece"**. Client clicks in. Alternatively, a standalone **"Design Your Own"** entry point exists in the main nav under Collections.

### Step 1 — Choose the Base
Full-bleed image of the empty base (chain/cord/band), one line of copy: *"Every piece begins with a foundation. Choose yours."* 2–4 base options shown as large cards (not a grid of 12) — image, name, one-line material story, price. Selecting one advances automatically (no "Next" button needed for single-choice steps — reduces friction).

### Step 2 — Choose the Centerpiece
Same pattern. This is the emotional core of the build, so give it the most visual space — one large image at a time, swipeable (or arrow-navigable on desktop), with the running "your design so far" preview thumbnail pinned bottom-left, growing as parts are added.

### Step 3 — Choose Accents / Stones / Beads
This step may allow **multi-select** (e.g. mala beads, or accent stones along a chain). Show a live-updating price and a live-updating visual composite as they add/remove. Use a persistent **"Your Piece" side panel** (desktop: right-fixed panel; mobile: collapsible bottom sheet) showing:
- Composited image (updates in real time or near-real-time)
- Running total price
- List of selected parts (each removable via a small "x")

### Step 4 — Choose the Clasp/Finish
Same card pattern as Step 1.

### Step 5 — Personalize (optional)
Engraving (initials, a date, a word in Devanagari script optional), length adjustment, gift wrapping toggle. Each option shows its own price delta live.

### Step 6 — Review Your Piece
Full composited image, full story recap — **this is important**: stitch together the individual part stories into one short narrative paragraph automatically, e.g.:
> *"Your necklace begins with a hand-forged 18k gold vermeil chain from our Jaipur atelier, carries a raw-cut garnet centerpiece sourced from Rajasthan's ancient mines, and closes with our signature Kadi clasp — inspired by the anklet fastenings of old Udaipur."*

This turns the checkout review page into an emotional payoff moment, not just an order summary.

### Step 7 — Add to Cart / Save for Later / Book a Video Consultation
Three clear actions:
1. **Add to Cart** (primary, deep-terracotta button)
2. **Save & Email Me This Design** (secondary — captures email for remarketing, critical for a considered high-ticket purchase)
3. **Book a Video Consult With Our Atelier Team** (ghost button — for clients who want human reassurance before a $500–5,000+ purchase; this materially increases bespoke conversion)

### Step 8 — Checkout
Standard, calm checkout. Clearly communicate **production lead time** (bespoke ≠ instant shipping) at every relevant step: cart, checkout, and confirmation email — e.g. *"Your piece will be hand-finished over approximately 12–18 days before it ships."* Managing this expectation upfront prevents support tickets and protects trust.

### Step 9 — Confirmation & Production Tracking
Order confirmation page + email includes: the final composited image, the full story paragraph, an estimated ship date, and (nice-to-have, phase 2) a production-status tracker (Sketched → Cast → Set → Polished → Quality Checked → Shipped) so the client feels connected to the making process, reinforcing "bespoke craftsmanship" all the way through fulfillment — not just at the point of sale.

### Mobile-specific configurator notes
- Each step becomes a full-screen card with a persistent slim progress bar at top (dots or a thin terracotta line, not a busy stepper with numbers).
- The "Your Piece" panel becomes a bottom sheet, collapsed by default (shows just price + a "View Design" tap target), expandable via swipe-up.
- Swipe left/right to browse options within a step, tap to select.
- One thumb, one hand — every primary action reachable in the bottom third of the screen.

---

## 4. CONFIGURATOR VISUAL RENDERING — TECHNICAL OPTIONS

Pick based on budget/timeline; listed cheapest-to-build → most immersive:

1. **Layered 2D flat-lay compositing (recommended for launch):** Each part is a pre-shot, color-graded PNG (transparent background) shot from a consistent top-down flat-lay angle. Frontend/backend layers them into one composed image as the client selects parts. Fast to build, fully on-brand (matches the museum-photography direction), no 3D asset production needed.
2. **Pre-rendered combination photography:** For a smaller, curated set of "sanctioned" combinations, commission real photography of the finished assembled piece (highest quality, but doesn't scale to fully arbitrary combinations — use this for the "Editor's Picks" starting points, and Option 1 for fully custom builds).
3. **3D/WebGL live render (phase 2 stretch goal):** True real-time 3D preview, rotate-able. High production cost (3D-scanning every part), best reserved for a v2 once the configurator's commercial viability is proven.

**Recommendation:** Launch with Option 1 + Option 2 hybrid — real photography for hero "starting templates," layered compositing for full customization. This keeps the site's museum-photography soul intact while still being buildable in a reasonable timeline.

---

## 5. PRICING ENGINE — LOGIC RULES

- **Base price** = sum of each selected part's price.
- **Modifiers** apply for: complexity of setting (e.g. pairing a heavy stone with a fine chain requires reinforcement — small upcharge, shown transparently as a labeled line item, never hidden), personalization/engraving, gift packaging upgrade, rush production (if offered).
- **Always show a live, itemized breakdown** — never just a single total. Luxury clients trust transparency; it also reduces cart abandonment from price anxiety and reduces "why is this so expensive" support tickets.
- **Currency/locale:** detect and display in local currency (reference Mejuri's approach — `mejuri.com/world/en/` pattern), but keep production pricing source-of-truth in one base currency server-side.
- **Price changes never silently break a saved design** — if a part's price changes after a client saved a draft, show a clear "price updated" notice on return, don't just silently recalculate.

---

## 6. THE STORY TEMPLATE — every part needs one

Give your content/atelier team this exact template to fill in for every single part in the system (chains, clasps, stones, beads, tassels, guru beads, spacers — everything):

```
Part Name: [evocative name, not a SKU — e.g. "The Kadi Clasp"]
Headline (≤8 words): [emotional hook]
Narrative (60–120 words): 
   - What it's made of (material, honestly)
   - Where the inspiration/technique comes from (region, tradition, or design reference)
   - Who makes it / how long it takes (specificity builds trust — "hand-finished by a single 
     karigar over three days" beats "handmade")
   - One sensory detail (weight, sound, texture, how light hits it)
Craft time: [X days/hours]
Origin: [region/city]
```

**Example (fully filled):**
> **The Kadi Clasp**
> *Fastened like an heirloom.*
> Cast in 18k gold vermeil and hand-polished to a soft matte finish, the Kadi clasp takes its form from the anklet fastenings once worn across old Udaipur — small, sturdy, quietly ornamental. Each clasp is filed and set by a single karigar in our Jaipur atelier, a process that takes just under three days from wax to finish. Fasten it once, and you'll hear the same soft click that closed anklets a hundred years ago.
> Craft time: 3 days · Origin: Jaipur, Rajasthan

This content becomes: (a) the story panel copy on that part's selection card, (b) part of the auto-generated "your piece" narrative at checkout, (c) structured content that feeds directly into the GEO/AEO strategy below (AI answer engines love specific, well-structured provenance content — generic copy gets ignored, specific copy gets cited).

---

## 7. SEO STRATEGY (traditional search)

- **URL structure:**
  - `/collections/[collection-slug]`
  - `/collections/[collection-slug]/[product-slug]`
  - `/design-your-own/[necklace|bracelet|mala]`
  - `/journal/[article-slug]`
  - `/atelier` (craftsmanship/about)
- **Structured data (schema.org):**
  - `Product` schema on every product & configurator entry page (price, currency, availability, brand, image, aggregateRating if reviews exist)
  - `Article` schema on Journal posts
  - `BreadcrumbList` on all deep pages
  - `FAQPage` schema on any page with an FAQ block (see AEO section — this does double duty)
  - `Organization` + `LocalBusiness` schema (if there's a physical atelier/showroom) on the homepage/contact page, including logo, social profiles, and founding story
- **Metadata:** unique, specific `<title>` and `<meta description>` per page — never templated boilerplate. Titles should read like a person wrote them: *"The Zenana Necklace — Hand-Set Garnet & 18k Gold Vermeil | Apriliha Singh"*, not *"Necklace | Apriliha Singh Store."*
- **Image SEO:** descriptive file names and alt text for every photograph (critical here since photography is the dominant content type) — e.g. `alt="Close-up of hand-set raw garnet centerpiece on 18k gold vermeil chain, Apriliha Singh Zenana necklace"`.
- **Core Web Vitals:** as specified in Part 1 — LCP < 2.5s is a direct ranking factor, and this site is photography-heavy, so this needs real engineering attention (responsive images, priority-loading the hero image only).
- **Internal linking:** every product part's story page (if given its own URL — recommended, see GEO below) links back to the parent collection and the configurator; every Journal article links to relevant collections/parts.

---

## 8. GEO STRATEGY (Generative Engine Optimization — getting cited by ChatGPT, Perplexity, Gemini, Google AI Overviews)

GEO is new territory and most competitors are ignoring it — this is a real advantage window for a brand this size in 2026.

**Core GEO principles:**
1. **AI answer engines favor specific, well-structured, fact-dense content over vague marketing copy.** Every part story (Section 6) is written specifically to be quotable/citable by an AI engine — specific craft times, specific regions, specific materials, not "luxurious" and "exquisite."
2. **Give every meaningfully distinct "thing" its own URL.** Each configurator part (e.g. "The Kadi Clasp") should have its own indexable page/section with a permalink, not be buried inside a JS-only interactive widget with no server-rendered content. AI crawlers (and Google) need real HTML content to cite — server-render (SSR/SSG) all part stories, collection pages, and journal content. Don't hide your best content behind client-side-only JS.
3. **Answer the question before it's asked.** Add short, direct-answer blocks near the top of key pages — e.g. on The Atelier page: *"How long does it take to make a bespoke Apriliha Singh piece? Most pieces take 12–18 days from final design to shipment, hand-finished by a single karigar in our Jaipur atelier."* This exact sentence pattern (question implied, direct factual answer, specific numbers) is what gets lifted verbatim into AI-generated answers.
4. **Author/expertise signals (E-E-A-T, which also feeds GEO):** name real people — the founder, the lead karigar/atelier team — with short bios on The Atelier page. AI engines and Google both weight demonstrated first-hand expertise heavily, especially for anything resembling a "how is this made / is this trustworthy" query.
5. **Structured data is even more load-bearing for GEO than classic SEO** — `Product`, `FAQPage`, `Article`, and `HowTo` (for the craft-process steps in Section 9.4 of Part 1) schema give AI crawlers unambiguous, machine-readable facts to cite, rather than making them infer from prose.
6. **Third-party mentions matter more than on-site claims.** AI engines heavily weight what press, forums, and independent sites say about a brand over what the brand says about itself. Build a modest, genuine digital-PR/press-mentions plan (product seeding to relevant editorial/jewelry press, founder interviews) — this is a content/PR workstream, not a dev workstream, but it materially affects GEO outcomes more than any on-page tweak.

---

## 9. AEO STRATEGY (Answer Engine Optimization — voice search & direct-answer boxes)

AEO overlaps with GEO but specifically targets featured snippets, voice assistants, and "position zero" answer boxes.

- **FAQ blocks on every major page**, written as real question-and-answer pairs, marked up with `FAQPage` schema:
  - On Collections: *"What is the difference between vermeil and solid gold?"*
  - On The Atelier: *"Where is Apriliha Singh jewelry made?"* / *"How long does bespoke production take?"*
  - On Care Guide: *"How do I clean oxidized bronze jewelry?"* / *"Can I shower with vermeil jewelry?"*
  - On Design-Your-Own: *"Can I customize the length of my necklace?"* / *"What happens if a part I want is out of stock?"*
- **Write the first sentence of every FAQ answer as a complete, standalone, quotable fact** — assume it will be read aloud by a voice assistant or lifted whole into an AI answer, with zero surrounding context. Front-load the specific number/fact, then elaborate after.
- **Use question-phrased H2/H3 headers** where natural (not forced) — e.g. *"How is a mala strung?"* as a section header in the craft-process content, rather than a generic *"Our Process."*

---

## 10. FULL FOLDER STRUCTURE (Next.js App Router + Tailwind + Headless CMS + Shopify/Medusa)

This structure assumes the Part 1 tech stack recommendation (Next.js, Tailwind, Sanity/Contentful for editorial content, Shopify Storefront API or Medusa for commerce). Adjust names if a different stack is chosen, but keep this *shape* — it's organized by feature/domain, not just by file type, which is what keeps large e-commerce codebases sane long-term.

```
apriliha-singh-web/
├── README.md                          # setup, env vars, deploy instructions, brand token reference
├── .env.example
├── next.config.js
├── tailwind.config.ts                 # custom theme: colors, type scale, spacing — mirrors Part 1 tokens exactly
├── package.json
│
├── public/
│   ├── fonts/
│   ├── favicons/
│   └── logo/                          # placeholder AS monogram lockups (SVG) until final logo lands
│
├── src/
│   ├── app/                           # Next.js App Router — route-first structure
│   │   ├── layout.tsx                 # root layout: fonts, nav, footer, global providers
│   │   ├── page.tsx                   # Home
│   │   ├── globals.css
│   │   │
│   │   ├── collections/
│   │   │   ├── page.tsx               # all collections landing
│   │   │   └── [collectionSlug]/
│   │   │       ├── page.tsx           # single collection (editorial lookbook layout)
│   │   │       └── [productSlug]/
│   │   │           └── page.tsx       # product detail page
│   │   │
│   │   ├── design-your-own/
│   │   │   ├── page.tsx               # entry: choose necklace / bracelet / mala
│   │   │   ├── necklace/
│   │   │   │   └── page.tsx           # configurator flow (client component, SSR shell for SEO/GEO)
│   │   │   ├── bracelet/
│   │   │   │   └── page.tsx
│   │   │   └── mala/
│   │   │       └── page.tsx
│   │   │
│   │   ├── parts/
│   │   │   └── [partSlug]/
│   │   │       └── page.tsx           # ⭐ individual server-rendered story page per part
│   │   │                              #    (critical for GEO — see Section 8.2)
│   │   │
│   │   ├── atelier/
│   │   │   └── page.tsx               # craftsmanship / about — long-form editorial
│   │   │
│   │   ├── journal/
│   │   │   ├── page.tsx
│   │   │   └── [articleSlug]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── appointment/
│   │   │   └── page.tsx               # book a private viewing / video consult
│   │   │
│   │   ├── care-guide/
│   │   │   └── page.tsx               # + FAQPage schema (AEO)
│   │   │
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   │
│   │   ├── cart/
│   │   │   └── page.tsx
│   │   │
│   │   ├── checkout/
│   │   │   └── page.tsx               # or redirect to Shopify-hosted checkout if using Storefront API
│   │   │
│   │   ├── account/
│   │   │   ├── page.tsx
│   │   │   └── orders/
│   │   │       └── [orderId]/
│   │   │           └── page.tsx       # production status tracker (Sketched→Cast→Set→Polished→Shipped)
│   │   │
│   │   ├── api/                       # route handlers (server-side only)
│   │   │   ├── pricing/
│   │   │   │   └── route.ts           # configurator pricing engine (Section 5) — server-authoritative,
│   │   │   │                          #   never trust client-computed totals
│   │   │   ├── configurations/
│   │   │   │   ├── route.ts           # save/load draft configurations
│   │   │   │   └── [id]/route.ts
│   │   │   ├── composite-image/
│   │   │   │   └── route.ts           # server-side layered image compositing (Section 4, Option 1)
│   │   │   └── webhooks/
│   │   │       └── shopify/route.ts   # order status → production tracker sync
│   │   │
│   │   ├── sitemap.ts                 # dynamic sitemap incl. every part/product/journal URL
│   │   └── robots.ts
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Nav.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MobileMenu.tsx
│   │   │
│   │   ├── ui/                        # dumb, reusable primitives — Section 10 of Part 1
│   │   │   ├── Button.tsx
│   │   │   ├── HairlineDivider.tsx
│   │   │   ├── EyebrowLabel.tsx
│   │   │   ├── QuoteBlock.tsx
│   │   │   ├── Accordion.tsx
│   │   │   └── FormField.tsx
│   │   │
│   │   ├── home/
│   │   │   ├── Hero.tsx
│   │   │   ├── PhilosophyStrip.tsx
│   │   │   ├── FeaturedCollection.tsx
│   │   │   ├── CraftsmanshipTeaser.tsx
│   │   │   ├── JournalTeaser.tsx
│   │   │   └── TestimonialStrip.tsx
│   │   │
│   │   ├── product/
│   │   │   ├── ProductGallery.tsx
│   │   │   ├── ProductInfo.tsx
│   │   │   └── MakingOfAccordion.tsx
│   │   │
│   │   ├── configurator/              # ⭐ the core feature — kept isolated as its own module
│   │   │   ├── ConfiguratorShell.tsx  # orchestrates step state, progress bar
│   │   │   ├── StepBase.tsx
│   │   │   ├── StepCenterpiece.tsx
│   │   │   ├── StepAccents.tsx
│   │   │   ├── StepClasp.tsx
│   │   │   ├── StepPersonalize.tsx
│   │   │   ├── StepReview.tsx
│   │   │   ├── PartCard.tsx           # single selectable part — image, name, story teaser, price
│   │   │   ├── YourPiecePanel.tsx     # persistent side panel (desktop) / bottom sheet (mobile)
│   │   │   ├── LivePreviewCanvas.tsx  # layered image compositing renderer
│   │   │   ├── PriceBreakdown.tsx
│   │   │   └── StoryNarrativeBuilder.tsx  # stitches individual part stories into one paragraph
│   │   │
│   │   ├── journal/
│   │   │   ├── ArticleCard.tsx
│   │   │   └── ArticleBody.tsx
│   │   │
│   │   └── seo/
│   │       ├── ProductSchema.tsx      # JSON-LD generators
│   │       ├── FaqSchema.tsx
│   │       ├── ArticleSchema.tsx
│   │       └── BreadcrumbSchema.tsx
│   │
│   ├── lib/
│   │   ├── cms/                       # Sanity/Contentful client + typed queries
│   │   │   ├── client.ts
│   │   │   └── queries/
│   │   ├── commerce/                  # Shopify Storefront API or Medusa client
│   │   │   ├── client.ts
│   │   │   ├── products.ts
│   │   │   ├── cart.ts
│   │   │   └── orders.ts
│   │   ├── pricing/
│   │   │   └── engine.ts              # pure functions — same logic used client-side (optimistic UI)
│   │   │                              #   and server-side (source of truth) — Section 5
│   │   ├── compositing/
│   │   │   └── layerImages.ts         # image compositing logic (sharp/canvas on server)
│   │   └── analytics/
│   │       └── events.ts              # typed event tracking (configurator step completion,
│   │                                  #   part selected, drop-off point — critical for optimizing
│   │                                  #   the bespoke funnel post-launch)
│   │
│   ├── types/
│   │   ├── part.ts                    # Section 2 data model, typed
│   │   ├── configuration.ts
│   │   ├── product.ts
│   │   └── order.ts
│   │
│   ├── styles/
│   │   └── tokens.ts                  # single source of truth for the color/type tokens from Part 1 —
│   │                                  #   imported into tailwind.config.ts, never hardcoded in components
│   │
│   └── hooks/
│       ├── useConfigurator.ts         # step state, selected parts, computed price (client-side)
│       ├── useCart.ts
│       └── useLocalePricing.ts
│
├── content/                           # if using Git-based content instead of/alongside a CMS
│   └── parts/                         # ⭐ one markdown/JSON file per part, following the Section 6 template —
│       ├── kadi-clasp.md              #   this is what non-technical atelier/content team edits directly
│       ├── zenana-chain.md
│       └── ...
│
├── tests/
│   ├── pricing-engine.test.ts         # pricing logic must be unit-tested — real money depends on it
│   ├── compositing.test.ts
│   └── e2e/
│       └── configurator-flow.spec.ts  # Playwright/Cypress — full build-to-cart flow, desktop + mobile viewport
│
└── docs/
    ├── brand-tokens.md                # links back to Part 1 of this spec
    ├── configurator-data-model.md     # links back to Section 2/6 of this spec
    └── content-guide-for-part-stories.md  # the Section 6 template, ready to hand to the content team
```

**Why this structure works long-term:**
- `configurator/` is isolated as its own component + logic domain — a future developer can understand, test, and modify the bespoke builder without touching unrelated homepage code.
- `content/parts/` (or the CMS equivalent) separates **editorial/story content** from **code** — your content/atelier team should never need a developer to add a new clasp or update a story.
- `lib/pricing/engine.ts` being a **pure, shared function** used both client-side (instant UI feedback) and server-side (`api/pricing/route.ts`, source of truth) prevents the classic bug where displayed price and charged price drift apart.
- `types/` centralizes the data model from Section 2 so the configurator, the CMS layer, and the commerce layer all agree on one shape.
- `docs/` keeps this entire specification linked directly into the repo, so six months from now a new hire isn't hunting through old chat threads to understand *why* something was built a certain way.

---

## 11. HANDOFF CHECKLIST

- [ ] Brand tokens (Part 1, Section 3–4) implemented in `styles/tokens.ts` and `tailwind.config.ts`
- [ ] Placeholder monogram lockup in nav + footer, ready to swap for final logo
- [ ] Every configurator part has a completed story (Section 6 template) before launch — no placeholder Lorem Ipsum ships
- [ ] Pricing engine unit-tested and server-authoritative
- [ ] Every part has its own server-rendered URL under `/parts/[partSlug]` (GEO requirement, Section 8.2)
- [ ] `Product`, `FAQPage`, `Article`, `BreadcrumbList`, `Organization` schema implemented and validated (Google Rich Results Test)
- [ ] FAQ blocks written and placed on Collections, Atelier, Care Guide, and Design-Your-Own pages
- [ ] Core Web Vitals tested on both desktop and throttled mobile (LCP, CLS, INP)
- [ ] Full configurator flow tested end-to-end on real mobile devices (not just browser devtools emulation) — thumb reach, tap target sizing, bottom-sheet behavior
- [ ] Production-status tracker copy reviewed with the atelier/ops team for accuracy before going live (don't promise timelines fulfillment can't hit)

---

*This document is designed to be handed directly to a development team or fed section-by-section into a build tool. Part 1 (`apriliha-singh-website-build-prompt.md`) covers brand, visual system, and non-configurator pages. Part 2 (this document) covers the bespoke configurator, discoverability strategy, and codebase architecture.*