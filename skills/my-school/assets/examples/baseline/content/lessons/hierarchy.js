L({
  id: "hierarchy",
  part: 2,
  n: 7,
  title: "Visual hierarchy",
  short: "How to make the most important thing look most important, and how to test that it does.",
  minutes: { read: 5, watch: 15, practice: 20 },
  body: `
## Importance made visible

**Visual hierarchy** is the arrangement of elements so that their visual weight matches their importance. A good hierarchy sets the order people see things in: the main point first, then what supports it, then details they'll look for only if they need them.

Hierarchy is your priorities made visible, so you can't design it until you've decided what matters (lesson 1's strategy plane at work). If everything on a screen is important, nothing is, and people have to read all of it to find what they came for. Lesson 6 showed how elements group. Hierarchy ranks the groups, and the elements within them.

A Google results page shows it working. In each result the title is the largest, most colourful text, and it's the link. The site name and address sit smaller above it, and the snippet sits below in plainer grey text. You can scan ten results in seconds because each one repeats the same three levels in the same order.

## The levers of emphasis

You make an element heavier or lighter with a handful of levers.

- **Size**: bigger reads as more important. It's the strongest lever and the easiest to overuse.
- **Weight**: bold stands out from regular text of the same size.
- **Colour and contrast**: saturated or high-contrast elements pull the eye, and grey recedes.
- **Position**: things near the top, and near the left in left-to-right languages, tend to be seen first.
- **Space**: an element with empty space around it gains importance through isolation.

[[fig:fig-hierarchy]]

Every lever works by contrast with its surroundings. Bold means nothing in a paragraph that's entirely bold. A 32 px heading feels huge next to 14 px text and modest next to a 64 px headline. Hierarchy is always relative, so you're really designing differences.

Within one component, three levels are usually enough. A product card might show the name as primary, the price as secondary, and the rating and delivery date as tertiary.

## Emphasise by holding back

The beginner's move is to make the important thing bigger and bolder. The better move is often to make everything else quieter. In Refactoring UI (2018), Adam Wathan and Steve Schoger, two of the people behind Tailwind CSS, recommend emphasising by de-emphasising: make secondary elements smaller, lighter or greyer, and the primary one stands out without shouting.

On a balance screen, the label "Available balance" is context you read once, and the figure "£1,240.50" is what you came for. Make the number large and dark, and the label small and grey.

Buttons need the same discipline. Give each screen one **primary action**, styled as a solid button. Secondary actions get an outline or a quieter fill, and tertiary actions become text links. A dialog with Save, Cancel and Delete as three solid buttons in three colours offers three equally loud choices and no guidance. Destructive actions don't need to be the loudest either. Delete often works best as a quiet button, set apart from the others, with a confirmation step.

> **Rule of thumb:** One primary button per screen or dialog. If you have two, decide which one most people should press and demote the other.

## How people actually scan

Most people scan a screen for anything that looks relevant and read only once they've found it. In 2006 Jakob Nielsen published eye-tracking research showing an **F-pattern** on text-heavy web pages: a horizontal sweep across the top, a shorter sweep a little lower, then a vertical scan down the left edge.

Later work at Nielsen Norman Group (2017) found the F-pattern is what people fall back on when a page offers no better structure. With clear headings and paragraphs that lead with their point, people scan in a **layer-cake pattern** instead, jumping from heading to heading and reading only where something looks relevant. If people read your page in an F, treat it as a symptom of weak structure.

The **Z-pattern** is a layout convention for sparse pages such as a landing page hero: logo top left, navigation top right, then a diagonal down to the content and the main call to action at the bottom. It has less research behind it than the F-pattern, but it's a sensible path for placing a few elements.

[[fig:fig-reading-patterns]]

> **Common mistake:** AI-generated screens often have several solid buttons competing, headings barely larger than body text and coloured badges on everything. Each choice looks fine alone. Together they cancel out, and nothing leads.

## Testing hierarchy

Two quick tests tell you whether a hierarchy works.

The **squint test** means blurring your eyes, or a screenshot, until you can't read the text. The shapes that still stand out are what people notice first. If that isn't what you wanted noticed, adjust size, weight or contrast until it is.

The **five-second test** means showing someone the screen for five seconds, hiding it, and asking what they remember and what the page is for. If they can't name the main point, the hierarchy isn't doing its job.

> **Try it now:** Squint at your phone's home screen, then at the first screen of your banking app. Name the first three things you notice on each, and whether they're what the designers would want you to see first.

## Using this with your AI tools

When you prompt, state the order of importance. "The balance first, then the last three transactions, then everything else" gives the tool something it can translate into size and contrast. Without it, the tool guesses, and it tends to make everything medium-loud.

Name the levers too. Ask for de-emphasis ("labels smaller and mid-grey") as well as emphasis, and limit each screen to one solid primary button.

Then squint at the result or blur a screenshot. Check that the first thing you see is the first thing you listed. Count the solid buttons. Check that headings are clearly larger than body text, with a visible step between each level.

> **Prompt:** On this product card the name is primary, the price secondary, and the rating and delivery date tertiary. Show this with size and grey levels, keep one solid button only, and make the wishlist action an icon button.
`,
  takeaways: [
    "Decide what matters most before styling anything; hierarchy is your priorities made visible.",
    "Emphasis is relative, so quieten the minor things as well as boosting the major one.",
    "Give each screen one primary action and demote everything else.",
    "An F-shaped scan signals weak structure; clear headings let people jump to what they need.",
    "When you squint, the first thing you see should be the first thing you meant people to see.",
  ],
  check: [
    {
      q: "A product card shows the name, price, rating, seller and delivery date, all in 16 px bold. What's the best first step?",
      options: [
        "Make the name 24 px bold so it stands out",
        "Decide the order of importance, then make the less important items smaller, lighter or greyer",
        "Give each item a different colour",
        "Put each item in its own box",
      ],
      answer: 1,
      why: "Hierarchy starts with priorities, and quietening the minor items creates contrast without making everything louder. Enlarging the name is tempting and helps a little, but four other bold items still compete with each other on equal terms.",
    },
    {
      q: "A 'Project settings' dialog has Save, Cancel and Delete project as three solid buttons in blue, grey and red. What's the best fix?",
      options: [
        "Make Delete the largest, because it's the most dangerous",
        "Make all three buttons the same colour for consistency",
        "Add an icon to each button",
        "Keep Save as the only solid button, make Cancel quieter, and move Delete apart as a quiet destructive action with a confirmation step",
      ],
      answer: 3,
      why: "One primary action gives people a clear default, and separating the destructive action protects against slips. Making Delete loudest is tempting because danger feels important, but loudness invites clicks, which is the opposite of what you want for a destructive action.",
    },
    {
      q: "Eye-tracking on your help article shows most people scanning in an F-pattern and missing the answer halfway down. What does this suggest?",
      options: [
        "The page lacks scannable structure, and clear headings with answer-first paragraphs would help",
        "It's working as intended, because the F-pattern is the goal",
        "The answer should move to the right-hand side",
        "The text should be larger",
      ],
      answer: 0,
      why: "The F-pattern is a fallback when there's nothing better to scan, and structure turns it into a layer-cake scan. The second option is tempting because the F-pattern is famous, but it describes how people cope with an unstructured page.",
    },
  ],
  practice: [
    "lab-squint",
    "lab-hierarchy",
    {
      type: "choice",
      title: "What gets the emphasis?",
      intro: "For each screen, pick the hierarchy that matches what people came to do.",
      items: [
        {
          prompt: "A dashboard stat card shows the label 'Monthly revenue' and the figure '£12,400'.",
          options: [
            "The label large and bold, the figure small",
            "Both the same size, so they feel balanced",
            "The figure large and dark, the label small and grey",
            "The label in the brand colour, the figure in grey",
          ],
          answer: 2,
          why: "People come for the value and read the label once for context. Equal sizes are tempting because they look tidy, but they force people to read both every time.",
        },
        {
          prompt: "A product page has two actions: 'Add to basket' and 'Save for later'.",
          options: [
            "Both as solid buttons in the brand colour",
            "'Add to basket' as the solid primary button, 'Save for later' as an outline or text button",
            "'Save for later' larger, because it's less of a commitment",
            "Both as plain text links",
          ],
          answer: 1,
          why: "The main path gets the strongest treatment and the alternative stays available but quieter. Two solid buttons are tempting because both actions matter, but equal weight means people have to stop and decide.",
        },
        {
          prompt: "An article page has a headline, the author and date, and the body text.",
          options: [
            "Author and date smaller and lighter than the headline, close beneath it",
            "Author and date in bold above the headline",
            "Author and date the same size as the headline",
            "Author and date only at the very end of the article",
          ],
          answer: 0,
          why: "Author and date are useful context, so they sit near the headline at a lower level. Moving them to the end is tempting because it clears the top, but readers often want to know how recent an article is before they start.",
        },
        {
          prompt: "A pricing page offers three plans, and you want most people to consider the middle one.",
          options: [
            "Make all three cards identical so it feels fair",
            "Make the middle card twice the size of the others",
            "Move the middle plan to the left so it's seen first",
            "Give the middle card a subtle highlight and the only solid button, with outline buttons on the others",
          ],
          answer: 3,
          why: "A small difference in emphasis guides attention while keeping the three comparable. Doubling the size is tempting because it's unmissable, but it breaks the comparison people need to make.",
        },
        {
          prompt: "A new project tool shows an empty state: an illustration, the heading 'No projects yet', one sentence of explanation and a 'Create project' button.",
          options: [
            "The illustration, as large as possible",
            "The explanation sentence, in bold",
            "The heading and the 'Create project' button, with the illustration small and quiet",
            "All four elements at equal weight",
          ],
          answer: 2,
          why: "The empty state exists to get people started, so the next action leads. A large illustration is tempting because it fills the space attractively, but it pulls attention away from the one thing people need to do.",
        },
      ],
    },
  ],
  journal: "Take a screenshot of the home screen of an app you use every day. Number the first five things your eye lands on, in order. Write what the designers decided was most important, and whether you agree.",
  terms: ["visual-hierarchy", "primary-action", "de-emphasis", "f-pattern", "layer-cake-pattern", "z-pattern", "squint-test", "five-second-test"],
});
