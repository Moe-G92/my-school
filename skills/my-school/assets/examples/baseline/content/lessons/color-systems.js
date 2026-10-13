L({
  id: "color-systems",
  part: 2,
  n: 11,
  title: "Building a UI palette",
  short: "Turn one brand colour into even tint and shade scales, named roles and a dark theme that holds together.",
  minutes: { read: 5, watch: 12, practice: 18 },
  body: `
## From swatches to jobs

In lesson 10 you picked colours by eye. An interface needs a colour for every job on the screen: page background, cards, body text, secondary text, borders, the main action, and messages that say something worked, needs attention or failed.

A **UI palette** is two things working together. One is a small set of scales, each a single hue stepped from very light to very dark. The other is a map that says which step does which job. Most of the craft lives in the map.

## Tint and shade scales

Start with one colour, usually your brand colour, and build a **tint and shade scale** around it, with lighter tints towards white and darker shades towards black. The common naming runs 50, 100, 200 and so on up to 900 or 950. Most products need a brand scale, a grey scale, and one each for success, warning and danger.

[[fig:fig-color-scale]]

The steps should look evenly spaced in lightness, and HSL lets you down here. Its lightness comes from a simple formula that ignores how bright each hue looks. Pure yellow and pure blue both sit at 50% in HSL, yet the yellow looks nearly white and the blue looks dark.

**OKLCH** describes a colour by lightness (L), chroma (C, roughly how colourful it is) and hue (H), and its L tracks **perceptual lightness** far more closely. That yellow measures about 97% in OKLCH and the blue about 45%, which matches what you see. All current browsers support oklch() in CSS, and Tailwind v4 defines its default palette with it. To build a scale, fix the hue, step L evenly, and ease the chroma down at the very light and very dark ends.

OKLCH still has gaps. A light blue at high chroma falls outside what most screens can show, so the browser maps it to the nearest colour it can. WCAG contrast (lesson 12) is calculated from luminance, so equal OKLCH L does not guarantee equal contrast. Build the scale in OKLCH, then check every text pairing with a contrast tool.

## Name colours by their job

Give every colour a **semantic role**, a name that says what it is for. Instead of putting blue-600 on a button, you define primary as blue-600 and use primary everywhere. A workable starter set:

- Surfaces: background, surface, surface-raised
- Text: text, text-muted, on-primary (text on the primary colour)
- Lines: border, focus
- Action: primary, primary-hover
- Status: success, warning and danger, each with a subtle background and a strong foreground

The payoff comes with change. When the brand moves to green, or you add a dark theme, you repoint a few roles and every screen follows. Lesson 18 builds this into a token system.

Greys carry most of the screen, so tint them slightly towards your brand hue (a cool grey beside a blue brand). Status colours need care. Yellow text on white fails contrast badly (#facc15 on white is about 1.5:1), so a warning usually pairs a pale amber background with dark amber or near-black text.

> **Common mistake:** AI-generated screens often pour one indigo-to-purple accent over headings, icons, badges and buttons. When everything is accent, the button you need people to press gets lost.

## 60-30-10 as a starting budget

Interior designers use a rule of thumb called **60-30-10**: about 60% of a room in a dominant colour, 30% in a secondary colour and 10% in an accent. In an interface, read it as a rough budget. Neutral surfaces take most of the screen, supporting colour takes a smaller share, and the accent marks what matters.

[[fig:fig-60-30-10]]

Treat the numbers loosely; many good product screens are closer to 90% neutral. The useful idea is scarcity. An accent works because it is rare, the same reason a single heavy element wins the eye in lesson 7.

> **Rule of thumb:** Squint at the screen, as in lesson 7. The accent colour should show up only where you want the eye to land first.

## Dark mode is its own palette

An inverted light palette glares and loses its structure. A dark palette needs its own decisions.

- Base the page on a very dark grey; Material Design's dark theme recommends #121212. Pure white on pure black is harsh, and people with astigmatism often see bright letters bleed.
- Show elevation with lightness. Shadows barely register on dark surfaces, so raised cards and menus get lighter greys.
- Lighten and calm the accent. As link text on #121212, a blue like #2563eb manages only about 3.6:1, while a lighter #60a5fa reaches about 7.4:1. Apple's system blue does the same, #007AFF in light mode and a brighter #0A84FF in dark.
- Keep two or three text greys for emphasis, and check that the quietest still passes contrast.

Each role points to a different step in each theme. Surface might be 50 in light and 900 in dark, primary 600 in light and 400 in dark. The components stay the same and only the map changes.

> **Try it now:** Open Settings on your phone and switch between light and dark appearance. Note what happens to the background, the rows and the accent colour. On an iPhone, the grouped rows stay lighter than the page in both themes.

## Using this with your AI tools

AI coding tools tend to apply stock blues and indigos as raw classes on each element. Give the tool roles to work with. Ask for scales defined once, in OKLCH, as CSS custom properties, then semantic roles that point at steps, with a separate dark mapping.

> **Prompt:** Define brand, neutral, success, warning and danger scales from 50 to 950 in OKLCH as CSS variables. Add semantic roles (background, surface, surface-raised, text, text-muted, border, primary, primary-hover, on-primary, success, warning, danger) with separate light and dark mappings. Components may use only the roles.

Then check the result. Search component files for hex codes and colour classes that bypass the roles. View light and dark side by side. Run every text pair through a contrast checker. If the dark theme is a straight inversion or the warning text is pale yellow, name the wrong role and ask for that fix.
`,
  takeaways: [
    "Build each colour as a 50 to 950 scale with evenly stepped perceived lightness, and use OKLCH to get there because HSL lightness lies.",
    "Name colours by their job (surface, text, primary, danger) and let components use only those names.",
    "Neutrals do most of the work; keep the accent scarce so it points at the one thing that matters.",
    "Treat 60-30-10 as a rough starting budget; many good product screens are closer to 90% neutral.",
    "A dark theme is a second mapping of the same roles: dark grey base, lighter raised surfaces, lighter and calmer accents.",
  ],
  check: [
    {
      q: "You set three status badges in HSL at 50% lightness: yellow, green and blue. The yellow one looks far brighter than the blue. What is going on?",
      options: [
        "Your screen is miscalibrated",
        "HSL lightness ignores how bright each hue looks, so equal L values can look very different",
        "Yellow has higher saturation than blue in HSL",
        "Blue badges always need a lighter value in every colour model",
      ],
      answer: 1,
      why: "HSL computes lightness from the RGB numbers without modelling perception. Pure yellow and pure blue share 50% in HSL but measure about 97% and 45% in OKLCH. Saturation is the tempting answer, but both are fully saturated here; the difference is perceived lightness.",
    },
    {
      q: "Your light theme uses #2563eb for the primary button and links. You are building the dark theme on a #121212 background. What should the primary role point to?",
      options: [
        "The same #2563eb, so the brand stays consistent",
        "The inverted value of #2563eb",
        "A lighter, slightly calmer step of the same blue, checked for contrast",
        "Pure white, to get the most contrast possible",
      ],
      answer: 2,
      why: "As text on #121212, #2563eb is only about 3.6:1, below the 4.5:1 minimum, and saturated colours vibrate on dark surfaces. A lighter step such as #60a5fa reaches about 7.4:1 and still reads as the brand. Keeping the same hex feels consistent, but the role is what should stay consistent. Inverting it would turn the blue into an orange.",
    },
    {
      q: "A team names its colour variables red-500, red-700 and blue-600 and uses them directly in components. Marketing now wants the brand to move from blue to teal. What is the main problem?",
      options: [
        "Every place that used blue-600 to mean 'primary' has to be found and edited by hand",
        "Teal cannot be expressed as a 50 to 950 scale",
        "The red variables will need renaming as well",
        "There is no problem: change the value of blue-600 to a teal",
      ],
      answer: 0,
      why: "Without a semantic role such as primary between the scale and the components, the meaning is scattered across every file. Changing blue-600's value to teal looks like a shortcut, but now a variable called blue holds teal, and any place that used blue-600 for something other than the brand turns teal too.",
    },
  ],
  practice: [
    "lab-palette",
    {
      type: "choice",
      title: "Palette decisions",
      intro: "Each scenario is a decision you will meet when building a real palette. Pick the best option.",
      items: [
        {
          prompt: "Your brand red is #dc2626 and your main buttons use it. You now need a colour for form errors.",
          options: [
            "Reuse the brand red for errors, since it is already on-brand",
            "Make errors orange so they differ from the brand",
            "Keep a separate danger role, pair every error with an icon and a message, and consider a less alarming brand step for ordinary buttons",
          ],
          answer: 2,
          why: "If the main button and the error message look the same, people cannot tell 'do this' from 'something went wrong'. Orange is the conventional warning colour, so using it for errors muddles the warning role.",
        },
        {
          prompt: "You built a blue scale and a yellow scale in HSL using the same lightness values. At every step the yellow looks much lighter than the blue.",
          options: [
            "Rebuild both scales in OKLCH with matching L steps, then adjust by eye and check contrast",
            "Add more steps to the yellow scale",
            "Lower the saturation of the yellow scale until it looks darker",
          ],
          answer: 0,
          why: "Equal HSL lightness does not mean equal perceived lightness, and yellow is the worst case. OKLCH L tracks what you see, so matching steps across hues behave far more alike. Desaturating yellow just makes it muddy.",
        },
        {
          prompt: "In your dark theme, cards use the same #121212 as the page and rely on a drop shadow. People say the layout looks flat.",
          options: [
            "Make the shadow darker and larger",
            "Give raised surfaces a slightly lighter grey than the page",
            "Add a bright brand-coloured border to every card",
          ],
          answer: 1,
          why: "Shadows have almost nothing to darken on a near-black page, so dark themes show elevation with lighter surfaces. A bright border on every card turns structure into decoration and competes with the accent.",
        },
        {
          prompt: "A warning banner uses #facc15 yellow text on a white background.",
          options: [
            "Keep it, because yellow is the standard warning colour",
            "Make the yellow text bold",
            "Use a pale yellow or amber background with dark amber or near-black text and a warning icon",
          ],
          answer: 2,
          why: "#facc15 on white is about 1.5:1, far below 4.5:1, and bold text does not fix a ratio that low. Yellow works as a background tint or icon fill with dark text on top.",
        },
        {
          prompt: "Your landing page uses the accent colour for the headline, three feature icons, two badges, the button and the footer links.",
          options: [
            "Keep the accent mainly for the primary button and current states, and move the rest to neutrals",
            "Keep it, because repeating the accent reinforces the brand",
            "Introduce a second accent for half of them",
          ],
          answer: 0,
          why: "An accent guides the eye only while it is scarce. Spread over seven kinds of element it becomes background noise, and a second accent doubles the problem.",
        },
      ],
    },
  ],
  journal: "Open an app you use daily (Slack, Notion, your bank app) in light and then dark mode. Write down how many colours you can count beyond the greys, where the accent appears, and what changed between the two themes apart from the background.",
  terms: ["color-scale", "tint", "shade", "oklch", "perceptual-lightness", "semantic-color", "60-30-10-rule", "dark-mode"],
});
