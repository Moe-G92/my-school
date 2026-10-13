L({
  id: "heuristics",
  part: 3,
  n: 23,
  title: "Usability heuristics",
  short: "Nielsen's ten usability heuristics with a real example of each, and how to run a heuristic evaluation.",
  minutes: { read: 5, watch: 12, practice: 20 },
  body: `
## Where the ten come from

In 1990 Jakob Nielsen and Rolf Molich described **heuristic evaluation**, a way of finding usability problems by inspecting an interface against a short list of principles. In 1994 Nielsen refined it into ten **usability heuristics** by analysing a couple of hundred real usability problems for the principles that explained most of them. The wording was refreshed in 2020; the ten are the same.

A heuristic is a rule of thumb. Each one names a kind of problem that keeps coming back, so you can spot it faster and explain it to others. You have met several already, such as feedback in lesson 2 and consistency in lesson 18.

## The first five

1. **Visibility of system status.** People should always know what is going on. A delivery app that shows your order moving from kitchen to rider to door saves you ringing the restaurant. A "Pay" button that shows nothing for three seconds breaks it, so people tap again.
2. **Match between the system and the real world.** Use the words and concepts people already have. A UK bank app asks for a sort code and account number, words its customers already use. An error reading "SQLSTATE 23505" when it means "That email already has an account" fails this.
3. **User control and freedom.** People make mistakes and need a clearly marked way out. Gmail's Undo send and a Back button that keeps what you typed both honour it. A multi-step modal with no close button breaks it.
4. **Consistency and standards.** The same thing should look and behave the same everywhere, and follow platform conventions (Jakob's law, lesson 22). Calling one action Delete in one place, Remove in another and Trash in a third makes people wonder whether they differ.
5. **Error prevention.** Better than a good error message is a design that stops the error. Gmail warning you when your message mentions an attachment that is not there, and GitHub making you type a repository's name before deleting it, are both prevention.

> **Common mistake:** AI-generated apps tend to fail heuristics 1, 3 and 9 together: buttons with no loading state, destructive actions with no undo, and errors that print whatever the server returned. Check those three first.

## The second five

6. **Recognition rather than recall.** Show options so people do not have to remember them. Recent searches and a checkout summary that repeats the delivery address both lighten memory load.
7. **Flexibility and efficiency of use.** Offer accelerators for frequent users that newcomers never need to see. Linear and Gmail both have keyboard shortcuts for actions that also exist as visible buttons.
8. **Aesthetic and minimalist design.** Every extra piece of information competes with the information that matters. This is about signal and noise, so a sparse screen that hides the one thing you need fails it as badly as a cluttered one.
9. **Help users recognise, diagnose and recover from errors.** Say in plain language what went wrong and how to fix it, next to the problem. "Your card was declined. Try another card or contact your bank." beats "Error 402". Lesson 24 covers writing these.
10. **Help and documentation.** When help is needed, it should be searchable, focused on the task and close at hand. A "Where do I find this?" link under a policy number field, showing where it sits on the paperwork, is a good example.

## Running a heuristic evaluation

A heuristic evaluation is a structured inspection by people who know the heuristics. It is cheap and works on anything from a clickable prototype to a live product.

1. **Set the scope.** Pick the screens and the real tasks to inspect, such as "sign up, create a first project, invite a teammate".
2. **Inspect alone, twice.** Each evaluator works independently, with one pass to get the feel of the flow and a second to examine every screen against the ten.
3. **Log every issue.** Note where it is, what happens, which heuristic it breaks, and a screenshot. One problem per entry.
4. **Merge.** Combine everyone's lists and remove duplicates.
5. **Rate and fix.** Each evaluator rates every problem on Nielsen's scale: 0 not a problem, 1 cosmetic, 2 minor, 3 major, 4 usability catastrophe. Average the ratings and fix from the top.

Nielsen recommends three to five evaluators, because any one person misses many problems and different people find different ones. Working separately stops the first list from shaping the others.

> **Rule of thumb:** Severity combines how often a problem occurs, how badly it hurts and whether people can work around it. A problem every user hits on the main task, with no workaround, is a 4.

## What it can and cannot tell you

A heuristic evaluation finds breaches of known principles. It cannot tell you whether the product solves a real problem or which issues real people stumble on. So pair it with usability testing (lesson 4): clear the obvious problems first, so your sessions with about five real people are spent on the ones you could not predict.

Working alone, evaluate on a different day from the one you built it, and bring in a second evaluator, even an AI one.

## Using this with your AI tools

AI models know Nielsen's heuristics well, which makes them useful second evaluators if you give them structure. Supply screenshots, define the tasks, and ask for findings in a fixed format: location, problem, heuristic, severity, fix. Ask for only the problems it can point to on screen, or it will pad the list with generic advice.

Then cover its blind spots. Screenshots show the happy path, so a model reviewing them cannot see loading, failure or recovery, which is where heuristics 1, 3 and 9 live. Trigger those states yourself by throttling the network, submitting bad data and cancelling halfway, and capture what happens. When you disagree on severity, your knowledge of the users decides.

> **Prompt:** Evaluate the sign-up flow in these screenshots against Nielsen's 10 usability heuristics; for each issue give the screen, the problem, the heuristic, a severity from 0 to 4 and a specific fix, and skip anything you cannot point to.
`,
  takeaways: [
    "The ten heuristics name problems that keep recurring; knowing them lets you spot and explain issues fast.",
    "Every action needs visible status, and every flow needs a clearly marked way out.",
    "Prevent errors first; when they happen, say what went wrong and how to fix it in plain words.",
    "Evaluate alone, then merge, then rate severity by frequency, impact and persistence.",
    "A heuristic review clears the obvious problems; testing with real people finds the rest.",
  ],
  check: [
    {
      q: "A settings area uses 'Delete', 'Remove' and 'Trash' for the same action on different screens. Which heuristic does this break most directly?",
      options: [
        "Error prevention",
        "Aesthetic and minimalist design",
        "Consistency and standards",
        "Help and documentation",
      ],
      answer: 2,
      why: "The same action has three names, so people wonder whether the actions differ. Error prevention is tempting because confusing labels can cause mistakes, but the root problem, and the fix, is one consistent word.",
    },
    {
      q: "You find two problems. A: the footer shows last year's copyright date. B: on small phones the 'Pay' button sits behind a cookie banner that has no obvious way to close. How should they be rated?",
      options: [
        "A is 1 (cosmetic) and B is 4 (catastrophe)",
        "Both are 2, because both are visible to every user",
        "A is 3 because everyone sees it, and B is 2 because only some phones are affected",
      ],
      answer: 0,
      why: "Severity weighs frequency, impact and persistence. B stops people paying, with no workaround, so it is a catastrophe even though it only affects some phones. The tempting answer rates A higher because everyone sees it, but seeing a wrong date harms nobody's task.",
    },
    {
      q: "Why does Nielsen recommend several evaluators working separately before their lists are merged?",
      options: [
        "To reach a statistically significant sample size",
        "Each person finds a different subset of problems, and working alone stops one list anchoring the others",
        "So each evaluator can take responsibility for two or three heuristics",
      ],
      answer: 1,
      why: "Single evaluators miss many problems, and the overlap between evaluators is small, so independent passes add coverage. Statistical significance is the tempting answer, but heuristic evaluation is an expert inspection, and the advice of three to five people is about covering more problems.",
    },
  ],
  practice: [
    "lab-heuristic-hunt",
    {
      type: "choice",
      title: "Name the heuristic",
      intro: "Each scenario breaks one heuristic more than the others. Pick it.",
      items: [
        {
          prompt: "You tap 'Upload' on a 200 MB video and nothing on screen changes for 20 seconds.",
          options: ["Visibility of system status", "Match between the system and the real world", "Flexibility and efficiency of use", "Help and documentation"],
          answer: 0,
          why: "People cannot tell whether the upload started, so they tap again or give up. A progress indicator fixes it.",
        },
        {
          prompt: "On the final 'Review order' step, the page shows only the total, so you have to remember which size and delivery option you chose.",
          options: ["Error prevention", "Recognition rather than recall", "Aesthetic and minimalist design", "User control and freedom"],
          answer: 1,
          why: "The system knows your choices and should show them, so you can check by recognising them instead of recalling them.",
        },
        {
          prompt: "A travel site labels a filter 'Inventory type: ancillary' when it means 'Extras such as bags and seats'.",
          options: ["Consistency and standards", "Help and documentation", "Match between the system and the real world", "Visibility of system status"],
          answer: 2,
          why: "It uses the company's internal vocabulary. Travellers think in bags and seats, so the label should too.",
        },
        {
          prompt: "A photo app deletes a whole album the moment you tap the bin icon, with no undo and no recently deleted folder.",
          options: ["User control and freedom", "Recognition rather than recall", "Flexibility and efficiency of use"],
          answer: 0,
          why: "There is no way back from a mistake. A confirmation would add error prevention, but an undo or a recently deleted folder is the clearly marked exit this heuristic asks for.",
        },
        {
          prompt: "A sign-up form clears every field when one is wrong and shows 'Invalid input' at the top of the page.",
          options: ["Aesthetic and minimalist design", "Consistency and standards", "Help users recognise, diagnose and recover from errors"],
          answer: 2,
          why: "The message does not say which field is wrong or how to fix it, and wiping the form makes recovery harder still.",
        },
        {
          prompt: "Accountants create invoices dozens of times a day, and every time they must click through three menus. There is no shortcut.",
          options: ["Error prevention", "Match between the system and the real world", "Help and documentation", "Flexibility and efficiency of use"],
          answer: 3,
          why: "Frequent users need accelerators, such as a keyboard shortcut or a 'New invoice' button on the home screen, that newcomers can ignore.",
        },
      ],
    },
    {
      type: "order",
      title: "Run a heuristic evaluation",
      intro: "Put the steps of a heuristic evaluation in order.",
      items: [
        "Choose the screens and the real tasks to inspect",
        "Each evaluator walks through the flow once to get a feel for it",
        "Each evaluator inspects every screen against the ten heuristics, alone",
        "Each evaluator logs every problem with its location, heuristic and a screenshot",
        "Merge the lists and remove duplicates",
        "Everyone rates the severity of each problem from 0 to 4",
        "Fix from the most severe down",
      ],
      why: "Scope comes first so everyone inspects the same thing. The independent passes come before merging so no one's findings anchor anyone else's. Severity is rated on the merged list so every problem gets several opinions, and those ratings decide the order of fixes.",
    },
  ],
  journal: "Pick one flow in an app you use, such as cancelling a subscription, which is often revealing. Walk through it against the ten heuristics and write down the two worst problems, the heuristic each breaks, and a severity from 0 to 4.",
  terms: ["heuristic-evaluation", "usability-heuristics", "severity-rating", "visibility-of-system-status", "user-control-and-freedom", "error-prevention", "recognition-over-recall"],
});
