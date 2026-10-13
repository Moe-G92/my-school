L({
  id: "color-basics",
  part: 2,
  n: 10,
  title: "Colour from first principles",
  short: "How colour works on screens, how to describe it precisely, and why lightness matters more than hue.",
  minutes: { read: 5, watch: 15, practice: 20 },
  body: `
## What colour actually is

Colour is something your eyes and brain construct from light. Your retina has three types of cone cell, each most sensitive to a different range of wavelengths, roughly long, medium and short. The brain compares their signals and produces the sensation of a colour. Because it's a comparison, the same light can look different depending on its surroundings.

Screens make colour by adding light. Each pixel mixes red, green and blue (RGB), and all three at full strength make white. This is **additive colour**. Print works the other way round. Inks absorb light, so cyan, magenta, yellow and black (CMYK) subtract from white paper. For interfaces, RGB is the physical reality, and the models below are friendlier ways to describe it.

## Hue, saturation and lightness

Any colour can be described by three properties, which are far easier to think in than hex codes.

- **Hue** is the position on the colour wheel, measured in degrees from 0 to 360. Red sits at 0, green at 120 and blue at 240.
- **Saturation** is intensity, from grey at 0% to the most vivid version of the hue at 100%.
- **Lightness** is how close the colour is to black or white. In HSL, 0% is black, 100% is white and 50% is the pure hue.

[[fig:fig-hsl]]

**HSL** expresses these three directly, and CSS supports it, so you can describe a colour as hue 220, saturation 80%, lightness 50% and adjust one property at a time. A hover state becomes "same hue, a little darker". A tinted background becomes "same hue, much lighter, less saturated". Design tools often show HSB (hue, saturation, brightness), a close relative that defines the third value differently.

## Lightness does most of the work

Of the three properties, lightness carries most of the information. Whether people can read text depends on contrast, which comes almost entirely from the difference in lightness (lesson 12 covers the exact ratios). If a design works in greyscale, colour can only help it. If it only works in colour, it will fail some people.

HSL has a flaw here. Its lightness value is a calculation that ignores how bright each hue looks to us. Yellow at 50% lightness looks far brighter than blue at 50%, so yellow text on white is nearly unreadable while blue text at the same setting is fine.

Perceptual colour spaces fix this. **OKLCH**, built on the Oklab model that Björn Ottosson published in 2020, describes colour as lightness, chroma (similar to saturation) and hue, with a lightness value that matches what people see much more closely. Modern browsers support it in CSS, and it's the better choice when a set of colours needs to look evenly light, such as status tags or chart series.

> **Try it now:** Turn on your phone's greyscale colour filter (iPhone and Android both have one in their accessibility settings) and use your most-used app for a minute. Notice which buttons and states become hard to tell apart.

## Harmony: relationships on the wheel

**Colour harmony** describes combinations that tend to look coherent, based on their positions on the wheel.

- **Monochromatic**: one hue at several levels of lightness and saturation.
- **Analogous**: neighbouring hues, such as blue, teal and green. Low tension.
- **Complementary**: opposite hues, such as blue and orange. Strong contrast for one accent.
- **Split-complementary**: a base hue plus the two hues either side of its complement.
- **Triadic**: three hues evenly spaced around the wheel. Lively and hard to balance.

These are starting points. Interfaces rarely use a scheme at full strength, because most of a good UI is neutral, with backgrounds, text and borders in greys, and one or two accent hues doing specific jobs. In a product, a complementary scheme usually means a deep blue brand with a single orange call to action. Lesson 11 turns this into a full palette.

> **Rule of thumb:** Build from one hue first, varying its lightness and saturation. Add a second hue only when it has a job, such as marking the main action or an error.

## Colour is relative and cultural

The painter Josef Albers showed how unstable colour perception is. In Interaction of Color (1963) he demonstrated that one grey can look warm or cool, light or dark, depending on its surroundings. This is **simultaneous contrast**, and you'll meet it in your own work when a grey label looks darker on a white card than on a pale grey sidebar.

Meaning shifts too. In most interfaces red signals errors and green signals success, but these meanings aren't universal. In mainland China's stock markets, red marks a rising price and green a falling one, the reverse of Western convention.

Colour vision varies as well. Among people of Northern European descent, around 1 in 12 men and 1 in 200 women have some form of colour vision deficiency, most often difficulty telling red from green. So never rely on colour alone. Pair it with a second cue, such as an icon, a text label or a plus or minus sign.

> **Common mistake:** AI tools default to purple-to-blue gradients and saturated colour on large surfaces, and often show status with colour alone. Keep saturated colour for small areas that need attention, and give every coloured status a text or icon partner.

## Using this with your AI tools

Describe colour in HSL or OKLCH terms instead of names or moods. "Primary: hue 220, high saturation, mid lightness; hover: same hue, slightly darker" gives a tool something precise to build. Ask for colours to be defined once as variables, with hover, pressed and tinted versions derived from the same hue.

Then review the output in greyscale. Check that hierarchy and clickable elements still read, that any yellow, lime or cyan text on white has been replaced with a darker shade, and that no status relies on colour alone. If the tool added a gradient you didn't ask for, ask what job it does.

> **Prompt:** Define colours as CSS variables in OKLCH: one brand hue for primary actions, neutrals tinted slightly towards it, and red, amber and green for status, each paired with an icon. Derive hover states by lowering lightness only.
`,
  takeaways: [
    "Describe colour as hue, saturation and lightness, and change one property at a time.",
    "Lightness carries most of the information; if a design works in greyscale, colour can only help.",
    "HSL lightness doesn't match what people see, so use OKLCH when colours must look evenly light.",
    "Most of a good interface is neutral, with one or two accent hues that each have a job.",
    "Never rely on colour alone; pair it with an icon, a label or a sign.",
  ],
  check: [
    {
      q: "Your warning text is HSL hue 60 (yellow), saturation 100%, lightness 50%, on white. It's almost unreadable, yet your blue text at lightness 50% reads fine. Why?",
      options: [
        "Yellow is a warm colour",
        "The saturation is too high",
        "White backgrounds can't display yellow properly",
        "HSL lightness doesn't match perceived brightness, and yellow at 50% looks far lighter than blue at 50%",
      ],
      answer: 3,
      why: "Contrast depends on perceived lightness, and HSL treats very different brightnesses as equal. Lowering saturation is tempting because the yellow looks so vivid, but a less saturated yellow at that lightness is still too pale. The fix is a much darker shade.",
    },
    {
      q: "You need a hover state for a blue primary button. What's the most reliable approach?",
      options: [
        "Keep the hue and lower the lightness slightly",
        "Shift the hue towards purple",
        "Make it a fully saturated neon blue",
        "Switch to the complementary orange",
      ],
      answer: 0,
      why: "Changing only lightness keeps the button recognisably the same while showing a change of state. Shifting the hue is tempting because the change is easy to see, but a different hue reads as a different colour, and people may think the button's meaning has changed.",
    },
    {
      q: "Your trading app shows price rises in green and falls in red, with no other cue, and it's launching in several countries. What's the biggest risk?",
      options: [
        "Green and red clash visually",
        "Red and green are too saturated for dark mode",
        "People with red-green colour vision deficiency may not tell them apart, and in mainland China red means rising",
        "Green makes prices look lower",
      ],
      answer: 2,
      why: "Colour alone fails people who can't distinguish the pair, and its meaning flips between markets. Adding arrows or plus and minus signs fixes both. The visual clash is tempting because it's the first thing a designer notices, but it's a matter of taste, while the other problem makes the data unreadable.",
    },
  ],
  practice: [
    "lab-color-match",
    "lab-harmony",
    {
      type: "sort",
      title: "Which property changed?",
      intro: "Each change adjusts mainly one property. Sort them by hue, saturation or lightness.",
      buckets: ["Hue", "Saturation", "Lightness"],
      items: [
        { text: "A success green shifted towards teal to fit the brand", bucket: 0, why: "Moving around the colour wheel changes the hue." },
        { text: "A warning colour moved from yellow towards orange", bucket: 0, why: "Yellow to orange is a move around the wheel, so it's a hue change." },
        { text: "A cool blue accent swapped for a warm red on a sale banner", bucket: 0, why: "Blue to red is a large hue change." },
        { text: "A vivid red badge turned into a dusty, greyish red", bucket: 1, why: "Moving towards grey while keeping the hue is a drop in saturation." },
        { text: "Chart colours toned down so they're less loud, at the same lightness", bucket: 1, why: "Less intensity at the same lightness means lower saturation." },
        { text: "A disabled icon drained of all colour but kept at the same lightness", bucket: 1, why: "Zero saturation gives a grey of the same lightness." },
        { text: "A blue button that turns darker blue on hover", bucket: 2, why: "Same hue, closer to black, so lightness has dropped." },
        { text: "The brand blue made very pale for an information banner's background", bucket: 2, why: "A tint is mainly a rise in lightness, often with saturation lowered a little too." },
        { text: "The brand blue made almost black for body text", bucket: 2, why: "A deep shade of the same hue is mainly a drop in lightness." },
      ],
    },
    {
      type: "choice",
      title: "Harmony and meaning",
      intro: "Apply colour relationships and meaning to real decisions.",
      items: [
        {
          prompt: "A meditation app wants a calm, gentle palette that feels close to nature.",
          options: [
            "Complementary red and green at full strength",
            "Analogous greens, teals and blues with muted saturation",
            "Triadic red, yellow and blue at full saturation",
            "Black with a neon pink accent",
          ],
          answer: 1,
          why: "Neighbouring hues have low tension, and muted saturation keeps them quiet. The triadic scheme is tempting because it's a recognised harmony, but three evenly spaced, saturated hues are lively, which works against calm.",
        },
        {
          prompt: "A finance site uses navy almost everywhere and needs its single sign-up button to stand out.",
          options: [
            "A warm orange accent, used only for that button",
            "A slightly lighter navy",
            "A rainbow gradient on the button",
            "A grey button with a navy border",
          ],
          answer: 0,
          why: "A complementary accent on one element gives maximum contrast against the dominant colour. A lighter navy is tempting because it stays on brand, but it blends into the page instead of standing out.",
        },
        {
          prompt: "A grey label looks noticeably darker on your white cards than in your pale grey sidebar, though it uses the same colour value.",
          options: [
            "A rendering bug in the browser",
            "Simultaneous contrast: the surrounding colour changes how the grey is perceived",
            "The sidebar renders at a lower resolution",
            "A colour vision deficiency",
          ],
          answer: 1,
          why: "Perception is relative, so the same grey looks darker against white than against a light grey. A rendering bug is tempting because the difference is real to your eye, but the colour value is identical.",
        },
        {
          prompt: "Your form marks invalid fields only by turning their border red.",
          options: [
            "Make the red brighter",
            "Make the border thicker",
            "Turn the whole form's background pink",
            "Add an error icon and a message under the field explaining what to fix",
          ],
          answer: 3,
          why: "A second cue that doesn't depend on colour reaches everyone, and the message says what to do. A brighter red is tempting because it's more noticeable, but people who can't distinguish red still see only a border.",
        },
      ],
    },
  ],
  journal: "Pick one app on your phone and list every colour you can see on its main screen (approximate is fine). Sort them into neutrals and accents. How many accent hues are there, and what job does each one do?",
  terms: ["additive-colour", "hue", "saturation", "lightness", "hsl", "oklch", "colour-harmony", "simultaneous-contrast"],
});
