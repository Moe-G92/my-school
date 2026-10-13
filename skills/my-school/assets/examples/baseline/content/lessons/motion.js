L({
  id: "motion",
  part: 3,
  n: 21,
  title: "Motion with a purpose",
  short: "When to animate, how long for, which easing to use, and how to respect people who need less movement.",
  minutes: { read: 5, watch: 12, practice: 15 },
  body: `
## Why interfaces move

Motion is information about change. When something on screen changes instantly, your eye has to work out what happened: whether the panel replaced the old one or sits on top of it, and where the deleted row went. A short animation answers that before anyone has to ask.

Good interface motion does one of four jobs. It shows **continuity**. On an iPhone, an app grows out of its icon when it opens and shrinks back into it when it closes. It gives **feedback**, like a button that visibly presses in. It points attention at something that changed, like a new message sliding into a chat. And it can carry character, as in Duolingo's celebration at the end of a lesson.

Motion also groups things. The Gestalt principle of common fate (from the family in lesson 6) says elements that move together are seen as belonging together, so a menu and its items should move as one. An animation that does none of these jobs is decoration, and decoration costs the user a moment whenever it plays.

> **Rule of thumb:** If you cannot say in one sentence what an animation tells the user, cut it or make it shorter.

## Duration is shorter than you think

Most interface transitions sit between 100 and 500 milliseconds. Small, frequent changes such as a hover colour or a toggle feel right at 100 to 200 ms. A side panel or a modal usually wants around 200 to 300 ms, and full-screen transitions can stretch towards 400 or 500 ms. Past half a second, most UI motion reads as a delay.

Bigger distances need a little more time, or the movement looks like a jump. Things leaving the screen can be quicker than things arriving, because the person has already decided to move on.

Frequency matters as much as size. An animation seen once during onboarding can take its time. A menu opened fifty times a day should open almost instantly, because by the hundredth time every extra millisecond feels like lag.

## Easing: how speed changes over time

Nothing in the physical world starts or stops instantly. A drawer accelerates as you pull it and slows as it reaches the end of its runners. **Easing** describes that change of speed across an animation, and it is what makes motion feel physical.

[[fig:fig-easing]]

- **Ease-out** starts fast and slows to a stop. Use it for things entering or responding to the user: the movement begins the instant they act, then settles. It is the right default for most UI.
- **Ease-in** starts slowly and speeds up. Use it for things leaving the screen. Avoid it for entrances, because the slow start lands exactly when the person is waiting.
- **Ease-in-out** is slow at both ends. Use it for something travelling from one place on screen to another.
- **Linear** keeps a constant speed. It looks robotic for movement but suits things that track work or time, such as a progress bar.

In CSS these curves are written as a **cubic-bezier**, four numbers that position two control points on the curve. The keywords ease, ease-in, ease-out and ease-in-out are presets; a custom curve lets you make an ease-out sharper or softer. Apple's platforms lean heavily on **spring animations** instead, defined by stiffness and damping, which settle naturally and can overshoot slightly for a livelier feel.

> **Try it now:** Pull down the notification panel on your phone slowly, then flick it. It tracks your finger exactly, and when you let go its speed tails off before it stops.

## Choreography and performance

When several things move at once, give them an order. A list can **stagger** its items by 20 to 50 ms each so the eye reads downwards, but watch the total: thirty rows at 50 ms each makes the last one wait a second and a half. Related elements should move together and in the same direction.

Browsers can animate some properties far more cheaply than others. Transform (moving, scaling, rotating) and opacity can usually be animated without recalculating the page layout, so they stay smooth on a modest phone. Animating width, height, top or margin makes the browser redo the layout on every frame, which is where stutter comes from.

> **Common mistake:** AI-generated sites often fade and slide every section in as you scroll. Readers wait for text they came to read, and if the reveal script fails, the content stays invisible. Keep scroll effects rare and make content visible by default.

## Motion and comfort

People with vestibular disorders can feel dizzy or sick from large zooms, parallax scrolling and spinning effects. Every major operating system has a setting for this: Reduce Motion on iOS and macOS, Remove animations on Android, Animation effects on Windows. Websites can read it through the **prefers-reduced-motion** media query.

Reducing motion should keep the feedback. Replace movement with a short fade or an instant change and drop the purely decorative effects. Separately, anything that moves on its own for more than five seconds, like an auto-advancing carousel, needs a pause control, and nothing should flash more than three times a second. Both are WCAG requirements, covered in lesson 25.

## Using this with your AI tools

AI tools add motion freely and rarely add it well, so give them the purpose and the numbers. Name the duration in milliseconds, the easing (ease-out for entrances, ease-in for exits) and the properties to animate (transform and opacity). Ask for a reduced-motion alternative every time; tools seldom add one unprompted.

In the output, look for a transition set on "all", which animates properties you never meant to. Check for durations over 500 ms on everyday interactions, scroll reveals that hide content until a script runs, and animated width, height or position. Then switch on Reduce Motion in your system settings and reload. The page should still make sense, with fades or instant changes in place of movement.

> **Prompt:** Slide the settings panel in from the right over 240 ms with ease-out and out over 180 ms with ease-in, animating transform and opacity only; under prefers-reduced-motion, replace the slide with a 150 ms fade.
`,
  takeaways: [
    "Every animation needs a job: continuity, feedback, attention or character.",
    "Keep everyday transitions between 100 and 300 ms, with small changes at the short end.",
    "Ease-out for things arriving, ease-in for things leaving, linear only for progress and loops.",
    "Animate transform and opacity; leave width, height and position alone.",
    "Honour Reduce Motion with fades or instant changes, and keep the feedback.",
  ],
  check: [
    {
      q: "A modal takes 450 ms to appear and uses ease-in. People say the app feels sluggish. What is the best fix?",
      options: [
        "Keep ease-in but add a spinner while it opens",
        "Switch to ease-out and bring it down to around 200 to 250 ms",
        "Switch to linear so the speed stays constant",
        "Remove the dimmed overlay behind the modal",
      ],
      answer: 1,
      why: "Ease-in puts the slowest part of the motion right at the start, exactly when the person is waiting, and 450 ms is long for something opened often. Ease-out moves immediately and settles. Linear is tempting because it sounds neutral, but constant speed looks mechanical and it keeps the long duration.",
    },
    {
      q: "Someone has Reduce Motion switched on. Your page has a parallax hero, and a 'Saved' tick that scales up when a form saves. What should the reduced-motion version do?",
      options: [
        "Remove all animation, including the tick, so nothing changes on screen",
        "Keep everything as it is, because each animation is short",
        "Make the hero static and show the tick with a quick fade or no transition",
      ],
      answer: 2,
      why: "The setting asks for less movement. The tick is information the person still needs, so it stays, delivered with a fade or an instant change, while the parallax goes. Removing everything is the tempting answer, but it throws away feedback along with the motion.",
    },
    {
      q: "Which of these animations earns its place?",
      options: [
        "A deleted row collapses so the rows below slide up to close the gap",
        "The hero headline drops in letter by letter on every visit",
        "Every card on the page floats gently up and down while idle",
        "The logo spins once when the page loads",
      ],
      answer: 0,
      why: "The collapsing row shows where the deleted item went and why the list moved, which is continuity. The letter-by-letter headline is the tempting pick because it looks crafted, but it delays the most important text on the page on every single visit.",
    },
  ],
  practice: [
    "lab-easing",
    {
      type: "choice",
      title: "Pick the motion",
      intro: "For each situation, choose the duration and easing a careful designer would use.",
      items: [
        {
          prompt: "A toggle in a settings list flips from off to on.",
          options: ["150 ms, ease-out", "600 ms, ease-in-out", "300 ms, linear"],
          answer: 0,
          why: "Small, frequent changes want short durations, and ease-out makes the response feel immediate. At 600 ms a toggle feels broken.",
        },
        {
          prompt: "A toast notification leaves the screen after five seconds.",
          options: ["400 ms, ease-out", "200 ms, ease-in", "800 ms, linear"],
          answer: 1,
          why: "Exits accelerate away, so ease-in fits, and they can be quicker than entrances because nobody is waiting for the toast to go.",
        },
        {
          prompt: "You press a keyboard shortcut and a card moves from the 'To do' column to the 'Done' column on a board.",
          options: ["Around 250 ms, ease-in-out", "100 ms, ease-in", "No animation, it just appears in the new column"],
          answer: 0,
          why: "The card travels from one place on screen to another, so ease-in-out suits it, and the movement shows where it went. An instant jump leaves you hunting for the card.",
        },
        {
          prompt: "A bar fills as a large file uploads.",
          options: ["Ease-out, so it slows near the end", "Linear, tracking the real progress", "A spring that overshoots slightly"],
          answer: 1,
          why: "A progress bar represents real work, so it should move with the work. An overshoot would suggest it went past 100 per cent, and ease-out would misrepresent how much is left.",
        },
        {
          prompt: "A command palette opens with Cmd+K and is used dozens of times a day.",
          options: ["A 300 ms slide and scale", "Near instant, or a fade of about 100 ms", "500 ms, with each result staggered in"],
          answer: 1,
          why: "Frequency shortens everything. A tool used dozens of times a day has to feel instant; the longer options turn a shortcut into a wait.",
        },
      ],
    },
    {
      type: "sort",
      title: "Job or decoration",
      intro: "Sort each animation by whether it tells the user something or only decorates.",
      buckets: ["Has a job", "Decoration"],
      items: [
        { text: "A drawer slides in from the left edge, where its menu button sits", bucket: 0, why: "Continuity: it shows where the menu lives and where it will go back to." },
        { text: "A new comment is briefly highlighted, then fades to normal", bucket: 0, why: "Attention: it points to what changed without a permanent badge." },
        { text: "Soft gradient blobs drift behind the pricing table", bucket: 1, why: "It tells the user nothing and competes with the prices for attention." },
        { text: "A photo expands from its thumbnail into a full-screen view", bucket: 0, why: "Continuity: you can see which photo you opened and where it will return." },
        { text: "Every heading types itself out letter by letter", bucket: 1, why: "It delays reading for effect, on every visit." },
        { text: "The cart icon bumps once when you add an item", bucket: 0, why: "Feedback: it confirms the item went somewhere and shows where." },
        { text: "Buttons wobble when you hover over them", bucket: 1, why: "Hover already has a colour change for feedback; the wobble adds movement without meaning." },
        { text: "Each section fades up as it scrolls into view", bucket: 1, why: "The content was already arriving by scrolling; the fade only makes people wait for it." },
      ],
    },
  ],
  journal: "Pick one app you use daily and watch three transitions closely: opening something, closing it, and a confirmation. For each, write what the motion tells you and whether it would still work at half the duration.",
  terms: ["easing", "ease-out", "ease-in", "cubic-bezier", "spring-animation", "stagger", "prefers-reduced-motion"],
});
