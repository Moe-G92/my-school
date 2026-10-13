# Identity: making each school look like its subject

The engine gives every school the same reliable structure. What makes a school feel made for its subject is its name, its type, its palette and one signature element on the home page. Spend real effort here; a templated look is the main reason generated learning sites feel generic.

## 1. Start from the subject's real artefacts

Before choosing anything, list 6–10 physical or visual artefacts from the subject's own world. Build the identity from those, never from adjectives like "modern" or "clean".

| Subject | Artefacts to draw from | A signature that teaches |
|---|---|---|
| UI/UX design (Baseline) | typographic guidelines, redline spec annotations, swatch chips, selection handles | the name set huge with its real ascender, cap-height, x-height and baseline drawn behind it |
| Music theory | staves, clefs, piano keys, tempo markings, metronome | the name written as notes on a stave that play when tapped |
| Chess | algebraic notation, board coordinates, clocks, score sheets | a famous position with the decisive move highlighted |
| Personal finance | ledgers, receipts, compound curves, tax tables | a ledger line totting up while the curve bends |
| Law | statute numbering, case citations, margin notes | the name set like a statute heading with a citation |
| Cooking | recipe cards, ratios, timers, knife cuts | a ratio card (flour : water : salt) that scales |
| Languages | IPA, conjugation tables, flashcards | the name with its pronunciation, playable with speech synthesis |
| Photography | contact sheets, exposure triangle, crop marks | crop marks and a rule-of-thirds grid over the name |

The signature lives in `signature.js` (`SITE.hero = el => ...`) with styles in `theme.css`. It should be complete at rest, may animate once on load (respect `prefers-reduced-motion`), and must never move behind running text.

## 2. Name

One or two words, ideally with a double meaning from the subject's vocabulary that also means "fundamentals" or "practice" (Baseline: the typographic baseline, and a baseline of knowledge). Use the learner's own name for the thing if they have one. The browser title is a 2–4 word name ("Baseline Design School"), never "Name: explainer".

## 3. Type

- Pair a characterful display face (used with restraint: hero, headings) with a highly readable body face, plus a mono for data if the subject has numbers or code.
- Google Fonts is the only font host artifacts allow; give every face a fallback stack.
- Avoid the faces every generated site uses as a default (Inter, Space Grotesk, Fraunces, Playfair on cream) unless the subject calls for them.
- Check real rendered words in the learner's script before shipping. A font that "supports" a script can still draw it badly (Arabic-first fonts mangle Persian, for example).
- Body text 17–19px, line length about 65 characters, line height 1.5–1.7.
- Check the display face's numerals and tall letters: some high-contrast faces draw a 1 that reads as a capital I (set stats in the body face if so), and faces with tall ascenders need extra line height on big headings so nothing clips.
- Set a long site name at a size that fits a 390px screen without breaking mid-word (the default hero does this with `--len`).

## 4. Palette

- Define every colour as a token in `theme.css`, light values on `:root`, dark values redefined in both the `prefers-color-scheme: dark` block and the `[data-theme="dark"]` block. Design the dark theme on purpose; don't invert.
- Neutrals with a slight bias toward the subject's hue look intentional; pure mid-greys look accidental.
- One signature accent (`--spec`) used rarely: section numbers, annotations, small labels. The interactive accent (`--accent`, `--sel`) is separate.
- Part colours `--p1`…`--p8` act as swatches on the path and home page.
- Contrast: text pairs 4.5:1, `--field` (input borders) and `--sel` (focus) 3:1, in both themes. `check.mjs` audits this.

## 5. Defaults that apply to every school

- Plain numbers (1, 2, 3); never zero-padded (01, 02).
- A short, promotional home page; detail lives on the path, lesson and reference pages.
- No decorative motion behind body text.
- Readable in light and dark at every width; no sideways scrolling at 390px.
- Avoid the generated-design tells: warm cream with a serif and terracotta; near-black with one acid-green pop; purple-to-blue gradients; emoji as section markers; everything centred; identical rounded cards everywhere; tracked all-caps labels; mono "tags"; arrow-in-every-button. If the learner asks for one of these, their words win.
- Structural devices must mean something: numbering only for real sequences, dividers between real groups.

## 6. Check it

Run `node check.mjs --shots` and look at both contact sheets (`dist/_check/sheet-1280.png`, `sheet-390.png`). Ask: could this school be mistaken for one about a different subject? If yes, push the signature, type or palette further toward the subject's artefacts.
