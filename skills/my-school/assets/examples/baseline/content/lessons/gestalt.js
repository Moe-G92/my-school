L({
  id: "gestalt",
  part: 2,
  n: 6,
  title: "How we see: Gestalt principles",
  short: "The rules your eyes use to group things, and how to use them so layouts explain themselves.",
  minutes: { read: 5, watch: 15, practice: 20 },
  body: `
## Your eyes group before you read

Look at any screen and, before you've read a word, you already know which things belong together. Your visual system does this automatically, using cues like distance, colour and enclosure. In the 1910s and 1920s the German psychologists Max Wertheimer, Wolfgang Köhler and Kurt Koffka studied these rules, now known as the **Gestalt principles**, from the German word for shape or form.

Koffka's idea is usually paraphrased as "the whole is greater than the sum of its parts". He preferred to say the whole is *other* than the sum of its parts, because the arrangement creates something the parts don't contain on their own. In an interface that something is meaning. A label placed close to a field becomes a single unit, the email field, before anyone reads either.

Grouping is how an interface tells people what relates to what. Get it right and people understand the structure without effort. Get it wrong and they misread relationships, however clear your words are.

[[fig:fig-gestalt]]

## Proximity: distance is meaning

**Proximity** says that things close together are seen as a group. It's the principle you use most, because every layout has spacing whether you think about it or not.

The classic failure is a form where each label sits exactly halfway between two fields. People can't tell whether a label belongs to the field below or the one above, so they slow down. Move each label tight to its own field, put a larger gap between field pairs, and the form explains itself.

The same applies everywhere. A heading should sit closer to the paragraph it introduces than to the one before it. A price should sit with its product, and the space between products should be clearly bigger than the space inside each one. Lesson 9 turns this into a precise spacing rule.

> **Rule of thumb:** Make the space between groups clearly larger than the space within them. If you have to measure to see the difference, it isn't big enough. Doubling is a good starting point.

## Similarity and its traps

**Similarity** says that things that look alike, sharing a colour, shape, size or style, are seen as related. People also assume they behave alike. That's why every link in a product should share one style, and every primary button another.

Similarity cuts both ways. If your links are blue and your headings are the same blue, people will try to click the headings. If one button in a toolbar looks different, people assume it does something different. Use a visual difference only when there's a real difference in meaning or behaviour.

When spacing and colour pull in different directions, spacing often wins. A coloured item inside a group is read as a special member of that group. This is useful. A highlighted "Recommended" pricing card stands out without leaving the set.

## Regions, lines and alignment

Three more principles explain most of the structure in interface layouts.

- **Common region**: things inside the same boundary, such as a card, a panel or a shaded table row, are seen as a group. Enclosure is strong enough to override spacing, which is why cards are everywhere.
- **Connectedness**: things joined by a line are seen as related, as in a checkout stepper or a timeline.
- **Continuity**: the eye follows smooth lines and edges. Elements that share an alignment edge read as one sequence, which is why a strong left edge makes a list or form feel calm.

Common region is easy to overuse. A dashboard where every widget has a border, every set of widgets sits in a bordered panel, and every panel sits on a bordered page ends up as boxes inside boxes. Each border adds noise and the hierarchy flattens. You can often delete the inner borders and let spacing do the grouping.

> **Common mistake:** AI-generated layouts often use one gap size between everything, so nothing groups, and then compensate by putting every element in its own bordered card. Fix the spacing first and you'll need far fewer boxes.

## Figure, ground and closure

**Figure-ground** is how we separate an object, the figure, from what's behind it, the ground. A modal dialog dims the page behind it so the dialog becomes the figure. A sticky header gains a shadow as content scrolls beneath it, showing that it sits on top. When figure and ground are ambiguous, as with text over a busy photo, people have to work to see what's in front.

**Closure** means we complete incomplete shapes. An icon drawn with gaps still reads as a whole shape. A row of cards with the last one cut off at the screen edge reads as a row that continues, which is the scroll signifier from lesson 2.

**Common fate** completes the set. Things that move together are seen as a group. When you select three files and drag them, they move as one, so you read them as one.

> **Try it now:** Squint at a sign-up form on any site until the text blurs. Check whether you can still tell which label goes with which field, and where each section ends.

## Using this with your AI tools

Generated layouts usually get the parts right and the grouping wrong, because the model applies one spacing value everywhere. Give it the relationships explicitly. Name the groups ("each label and its field are one unit; billing and shipping are separate sections") and ask for small gaps within groups and larger gaps between them, with numbers from a spacing scale.

When you review, blur the screenshot or squint. List the groups you see and compare them with the groups you meant. Check similarity next: anything that isn't clickable must not share the styling of things that are. Then count the borders and ask which ones spacing could replace.

The names in this lesson are prompt vocabulary. "Use proximity to group each label with its input" is far more precise than "make the form cleaner".

> **Prompt:** Group each label tightly with its input (8 px apart), separate fields by 24 px and sections by 48 px. Use one link style only, and remove borders from cards that sit inside panels.
`,
  takeaways: [
    "People see groups before they read words, so a layout is a statement about what belongs together.",
    "Make the space between groups clearly larger than the space within them.",
    "Things that look alike are assumed to behave alike, so give each kind of element one consistent style.",
    "Enclosure groups strongly, so use borders sparingly and let spacing do most of the work.",
    "Use figure-ground to show what's in front, such as a dialog over a dimmed page.",
  ],
  check: [
    {
      q: "In a sign-up form, each label sits exactly halfway between the field above it and the field below it. People hesitate before typing. Which change fixes it?",
      options: [
        "Make the labels bold",
        "Put each section of the form in its own bordered card",
        "Move each label close to its own field and increase the gap between label-and-field pairs",
        "Change the label colour to the brand colour",
      ],
      answer: 2,
      why: "This is a proximity problem, and changing the distances fixes the relationship. Cards are tempting because enclosure groups strongly, but they group whole sections and leave each label just as ambiguous inside its card.",
    },
    {
      q: "A dashboard gives every widget its own border, puts related widgets in bordered panels and places the panels on a bordered page. Users say it feels cluttered. What's the best first change?",
      options: [
        "Remove the inner borders and group with spacing plus one level of enclosure",
        "Make all the borders thinner and lighter",
        "Give each widget a different background colour",
        "Add a heading above every widget",
      ],
      answer: 0,
      why: "Boxes inside boxes add noise without adding information, and spacing can do most of the grouping. Thinner borders are tempting because they soften the look, but every nested boundary is still there competing for attention.",
    },
    {
      q: "Your links and your section headings use the same shade of blue. People keep clicking the headings. Which principle explains this?",
      options: [
        "Figure-ground",
        "Closure",
        "Common fate",
        "Similarity: things that look alike are assumed to behave alike",
      ],
      answer: 3,
      why: "The headings share the links' colour, so people assume they share the links' behaviour. Figure-ground is tempting because the headings stand out, but standing out isn't the issue. Looking like a link is.",
    },
  ],
  practice: [
    "lab-gestalt",
    {
      type: "choice",
      title: "Name the principle",
      intro: "Each scenario comes from a real interface. Pick the Gestalt principle doing the work.",
      items: [
        {
          prompt: "A magnifying-glass icon is drawn with a small gap in its circle, yet everyone reads it as a complete circle.",
          options: ["Closure", "Proximity", "Similarity", "Common region"],
          answer: 0,
          why: "The eye completes the missing part of the shape. Similarity is tempting because the icon resembles others, but nothing here is being compared or grouped.",
        },
        {
          prompt: "You select three files that are far apart in a list and drag them. As they move together, you read them as one group.",
          options: ["Figure-ground", "Common fate", "Continuity", "Similarity"],
          answer: 1,
          why: "Things that move together are grouped, even when they started far apart. Similarity is tempting because the selected rows are highlighted alike, but the strong grouping here comes from the shared movement.",
        },
        {
          prompt: "A dialog opens and the page behind it dims. Everyone's attention goes to the dialog.",
          options: ["Closure", "Proximity", "Figure-ground", "Common fate"],
          answer: 2,
          why: "Dimming pushes the page into the background so the dialog becomes the figure. Proximity is tempting because the dialog's contents are grouped, but that's not what makes it read as in front.",
        },
        {
          prompt: "On a settings page every row is grey except 'Delete account', which is red. People treat it as a different kind of action.",
          options: ["Common region", "Connectedness", "Closure", "Similarity, broken on purpose"],
          answer: 3,
          why: "Breaking similarity signals a difference in meaning, here a destructive action. Common region is tempting because the rows share a list, but the red is what marks this one out.",
        },
        {
          prompt: "A delivery tracker shows four stages joined by a line. People read it as one sequence even though the gaps between stages are uneven.",
          options: ["Connectedness", "Figure-ground", "Closure", "Similarity"],
          answer: 0,
          why: "The connecting line groups the stages more strongly than the uneven spacing separates them. Similarity is tempting because the stage dots match, but matching dots alone wouldn't create a sequence.",
        },
        {
          prompt: "Search filters sit in a tinted panel on the left and results in a white area on the right. People understand which controls belong to which area.",
          options: ["Common fate", "Common region", "Closure", "Continuity"],
          answer: 1,
          why: "Each area has its own boundary, so its contents are grouped. Continuity is tempting because each column has a clean edge, but it's the separate backgrounds that create the two groups.",
        },
      ],
    },
  ],
  journal: "Open your own product, or an app you use daily, and find one place where grouping misleads: something looks related but isn't, or the reverse. Write which principle is at work and what change to spacing, enclosure or styling would fix it.",
  terms: ["gestalt-principles", "proximity", "similarity", "common-region", "connectedness", "continuity", "figure-ground", "closure"],
});
