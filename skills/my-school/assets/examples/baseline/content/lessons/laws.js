L({
  id: "laws",
  part: 3,
  n: 22,
  title: "The psychology behind interfaces",
  short: "The named laws of UX, what each one actually says, and where it holds or gets misused.",
  minutes: { read: 5, watch: 15, practice: 15 },
  body: `
## Laws, effects and rules of thumb

Designers borrow findings from psychology and human factors and call them laws. A few are measured relationships with a formula behind them, some are memory effects found in the lab, and others are well-argued opinions with a famous name attached. Knowing which is which stops you using them as trump cards, so each one below comes with its limits.

## Pointing and choosing

**Fitts's law** (Paul Fitts, 1954) says the time to hit a target grows with its distance and shrinks with its size. The relationship is logarithmic, so enlarging a small button helps a lot and enlarging a big one helps little. That is why right-click menus open under the pointer, and why the macOS menu bar sits on the top edge of the screen: the pointer stops at the edge, so the target behaves as if it were infinitely tall.

[[fig:fig-fitts]]

It applies to pointing, and says nothing about how long people take to decide. The edge trick also fails on touch screens, where edges are among the hardest places to reach (lesson 31 covers thumbs).

**Hick's law** (Hick, 1952; Hyman, 1953) says decision time grows with the number of choices, again logarithmically. It holds best when the options are unfamiliar and equally likely, so each one has to be weighed. It weakens when people know what they want and scan for a word, or when options are well grouped. The misuse is cutting every menu to three items and burying the rest two levels deep, which swaps a small decision cost for extra clicks. It genuinely helps with first-time choices, like picking a plan, where a short set with a "See all" link beats a wall of options.

> **Rule of thumb:** Make the action people take most often the biggest, closest target, and keep the choice they face most often short.

## Memory and effort

**Cognitive load** is the mental effort a task demands; the term comes from John Sweller's work on teaching in 1988. Some load belongs to the task (comparing two mortgage offers is hard) and some is added by the design (remembering a reference number from the previous screen). Your job is to remove the added kind.

**Miller's law** comes from George Miller's 1956 paper on "the magical number seven, plus or minus two", about how much people can hold in short-term memory. Later work, notably Nelson Cowan's in 2001, puts working memory closer to about four chunks. It applies to whatever people must carry between screens, like a verification code, and chunking helps, which is why card numbers are printed in groups.

> **Common mistake:** Quoting "seven plus or minus two" to cap a navigation bar. Nobody memorises a menu they can see; they recognise the options. Judge a menu by how distinct and well grouped its labels are.

**Jakob's law** (named by Jakob Nielsen) says people spend most of their time on other sites, so they expect yours to work the same way. It is the case for conventions: a logo at top left that goes home, a basket at top right, underlined links. Break a convention only when the gain is clear and big enough to repay the relearning.

**Tesler's law** (Larry Tesler, of Xerox PARC and Apple) says every task has a core of complexity that can only be moved, never removed. Someone has to deal with the time zones in a calendar invite, either the software or the person. Moving that work into the system is usually right, as long as every automatic guess has a visible override.

## What people notice and remember

The **Von Restorff effect** (1933), or isolation effect, says the item that differs from its neighbours gets noticed and remembered. It is why a pricing table highlights one recommended plan and why a screen should have one primary button. It only works while the difference is rare, and colour alone should never carry it (lesson 12).

The **serial position effect** says people recall the first and last items in a sequence best. It comes from research on lists heard or read in order, such as a phone menu read aloud. On a screen people scan and jump, so treat it as a weak nudge.

The **aesthetic-usability effect** describes people rating attractive interfaces as easier to use; a 1995 study of cash machine layouts by Kurosu and Kashimura is the classic source. Good looks buy patience and also hide problems, because testers under-report issues on a polished prototype. Trust what they do over what they rate.

The **peak-end rule** (Daniel Kahneman and colleagues, 1990s) says people judge an experience largely by its most intense moment and by its end. Fix the worst moment first, such as an error that wipes a form or a surprise fee at checkout, then make the ending clear, with a confirmation that says what happens next. A tool used daily is also judged on its everyday friction.

## Speed

The **Doherty threshold** comes from a 1982 IBM paper by Doherty and Thadani, which found that productivity rose sharply when systems responded in under about 400 milliseconds. The number dates from mainframe terminals but still matches how responsive software feels. When real work takes longer, respond inside that window anyway with an optimistic update, a skeleton or a progress indicator. Lesson 30 returns to perceived speed.

## Using this with your AI tools

These names give you precise vocabulary for a prompt, and help you push back when a tool or a teammate quotes one wrongly. Pair the principle with a concrete change, such as "apply Fitts's law: make the primary action full width on mobile, in the bottom third".

In what the tool builds, look for the opposite patterns. Several buttons styled as primary cancel out the Von Restorff effect. Tiny icon buttons far from where the person is working break Fitts. Novel navigation breaks Jakob's law. A slow action with no immediate response misses the Doherty threshold. If the tool cites "7 plus or minus 2" for a menu, doubt the rest of its reasoning too.

> **Prompt:** Review this checkout against Fitts's law, Hick's law, Jakob's law and the peak-end rule; list each issue with the element, the principle and a specific fix.
`,
  takeaways: [
    "Fitts: put frequent actions in big targets close to where attention already is.",
    "Hick holds for unfamiliar, equal choices; deep nesting is not a cure.",
    "Miller's seven is about memory; visible menus rely on recognition, and working memory holds about four chunks.",
    "Highlight one thing per view, or nothing stands out.",
    "Fix the worst moment and the ending first, and respond within about 400 ms.",
  ],
  check: [
    {
      q: "A teammate says: 'Our docs sidebar has 11 links. Miller's law says we must cut it to 7.' The links are always visible. What is the best response?",
      options: [
        "Agree, and move four links into a 'More' menu",
        "Agree, but round down to 5 to be safe",
        "Miller was about holding items in memory; a visible list relies on recognition, so judge it on grouping and label clarity",
        "Disagree, because Hick's law says more options are always faster",
      ],
      answer: 2,
      why: "Miller's 1956 paper was about short-term memory span, and nobody has to memorise a list they can see. The tempting answer is to hide links in a 'More' menu, which adds a click and hides the links while solving a problem that was never there.",
    },
    {
      q: "On a product page, which change most reduces the time it takes to hit 'Add to basket' with a mouse?",
      options: [
        "Make it larger and place it right beside the price and photo, where the pointer and eye already are",
        "Change it from blue to bright red",
        "Move it into the sticky header so it is always on screen",
        "Add a small animated icon inside the button",
      ],
      answer: 0,
      why: "Fitts's law is about size and distance. A red button may be noticed sooner (a Von Restorff effect), but it is no easier to hit. The sticky header is tempting because it is always visible, but it moves the target further from where the person is looking and pointing.",
    },
    {
      q: "A bank's account sign-up has one painful step, an ID upload that often fails, and ends on a plain 'Application received' page. You can make one change. Which helps people's memory of the experience most?",
      options: [
        "Add a celebration animation to the final page",
        "Make the ID upload far more reliable, with clear recovery when it does fail",
        "Add a progress bar to every step",
      ],
      answer: 1,
      why: "The peak-end rule says the most intense moment and the ending dominate memory, and here the peak is a failure. The celebration is tempting because it improves the end, but it paints over the worst moment, which is what people will remember and tell others about.",
    },
  ],
  practice: [
    "lab-fitts",
    "lab-hick",
    {
      type: "choice",
      title: "Which principle, and does it really apply",
      intro: "Each scenario has a principle behind it. Pick the reading a careful designer would give.",
      items: [
        {
          prompt: "A desktop app's most-used command is a small icon in the far corner of a toolbar, well away from where people work.",
          options: ["Fitts's law: make it bigger, bring it closer, or give it a keyboard shortcut", "Jakob's law: move it to where other apps keep it", "Von Restorff: make it bright red"],
          answer: 0,
          why: "The problem is the time to reach a small, distant target. A brighter colour helps people find it, yet it is no easier to hit; a shortcut skips the pointing altogether.",
        },
        {
          prompt: "A booking site shows a 6-character reference on one screen and asks people to type it on the next.",
          options: ["Hick's law: reduce the number of characters", "Cognitive load: carry the reference forward so nobody has to remember it", "Serial position: put the reference at the top of the page"],
          answer: 1,
          why: "Holding six random characters across screens is exactly the working-memory load designs should remove. The system already knows the reference.",
        },
        {
          prompt: "A pricing table gives all three plans a different bright background colour.",
          options: ["Fine, colour helps comparison", "Von Restorff: highlight only the plan you recommend, keep the others calm", "Hick's law: cut it to two plans"],
          answer: 1,
          why: "The isolation effect only works when one item differs. Three highlights cancel each other out.",
        },
        {
          prompt: "A calendar app asks every user to choose a time zone by hand each time they create an event.",
          options: ["Tesler's law: the system should absorb the complexity, detect the zone and offer an override", "Jakob's law: copy another calendar's time zone picker", "Miller's law: limit the list to seven zones"],
          answer: 0,
          why: "Time zones are complexity that cannot be removed, only moved. The software knows the device's zone; the person should only deal with it when it differs.",
        },
        {
          prompt: "In testing, people rate a polished new prototype 9 out of 10 for ease of use, but two of five could not finish the main task.",
          options: ["The ratings show the design works", "Aesthetic-usability effect: trust the task failures over the ratings", "Peak-end rule: improve the final screen"],
          answer: 1,
          why: "Attractive designs earn generous ratings and hide problems. What people did tells you more than how they scored it.",
        },
        {
          prompt: "A colleague wants to turn a flat settings page of 14 clearly labelled toggles into four nested sub-pages, citing Hick's law.",
          options: ["Do it, fewer options per screen is always faster", "Probably not: people come looking for one known setting, so group the toggles under headings on one page", "Use a carousel to show four toggles at a time"],
          answer: 1,
          why: "Hick's law weakens when people know what they are looking for and scan for a word. Nesting adds clicks and guesswork; headings give the grouping without hiding anything.",
        },
      ],
    },
  ],
  journal: "Open an app you use every day and find one place where a law from this lesson is clearly working for you and one where it is being broken. Write down which law, what you saw, and the change you would make.",
  terms: ["fitts-law", "hicks-law", "cognitive-load", "jakobs-law", "teslers-law", "von-restorff-effect", "peak-end-rule", "doherty-threshold"],
});
