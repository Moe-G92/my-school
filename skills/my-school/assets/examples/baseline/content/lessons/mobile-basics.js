L({
  id: "mobile-basics",
  part: 5,
  n: 31,
  title: "Designing for thumbs",
  short: "How people really hold phones, and how to size and place controls so one thumb can do the job.",
  minutes: { read: 5, watch: 15, practice: 20 },
  body: `
## A phone is a different situation

A laptop user is usually sitting down, with a precise pointer and a large screen. A phone user is often standing on a train with a bag in one hand, glancing at the screen between other things. Their pointer is a fingertip that covers whatever it touches, and there is no hover to preview anything.

So on mobile you design for **interrupted, one-handed use**: short sessions, partial attention, glare and patchy signal. Good mobile screens do one main thing each and keep the next action within reach. A small screen forces you to decide what matters, which is the real case for "mobile first" from lesson 29.

## How people actually hold phones

In 2013 Steven Hoober watched 1,333 people using phones in public. 49% held the phone in one hand and tapped with that thumb, 36% cradled it in one hand and tapped with the other, and 15% used both thumbs. People also switched grips constantly as tasks changed. So design the main actions for one thumb.

For a one-handed grip, the comfortable area is an arc from the bottom of the screen up towards the middle. This map is the **thumb zone**, a diagram popularised by designer Josh Clark. It has an easy zone in the lower middle, a stretch zone above and to the sides, and hard corners at the top, especially the one furthest from the thumb.

[[fig:fig-thumb-zone]]

Phones have also grown far beyond the 3.5-inch screens these ideas started with, so the top of a 6-inch-plus screen is out of one-thumb reach for most hands. And Hoober's later observations found people tap most accurately near the middle of the screen, so targets near the edges need extra size.

> **Try it now:** Hold your phone in one hand, open the app you use most and try to tap every control on its main screen without shifting your grip. Any that make you stretch are placements to question in your own product.

## Targets sized for fingers

A fingertip is imprecise and hides what it touches, so both platforms set minimums. Apple asks for 44 by 44 points on iOS, and Material asks for 48 by 48 dp on Android, which it notes is roughly 9 mm. WCAG 2.2 success criterion 2.5.8 sets 24 by 24 CSS pixels for the web. Treat that as the legal floor and the platform sizes as the comfortable target.

- **Hit area** and visual size are separate. A 20-point icon can sit inside a 44-point tappable area, so the icon stays light and the target stays generous. Most tiny-icon tap bugs come from a hit area that matches the drawing.
- Spacing prevents wrong taps. Material suggests at least 8 dp between targets. "Edit" and "Delete" as small links side by side are a mis-tap waiting to happen.

Fitts's law from lesson 22 says the time to hit a target depends on its size and its distance. On a phone, distance is how far the thumb travels from where it rests, so controls near the bottom feel fast.

> **Rule of thumb:** Make anything tappable at least 44 by 44 points, give it at least 8 points of clear space from its neighbours, and make destructive targets harder to hit by accident than the safe ones next to them.

## Content up, controls down

The thumb zone leads to the main layout rule of modern phone apps. Put content in the top half, where it is easy to see, and controls in the bottom half, where they are easy to reach.

Both platforms have moved this way. Tab bars sit at the bottom, sheets slide up so their buttons land near the thumb, and since iOS 15 Safari's address bar sits at the bottom of the screen by default.

The top still suits the screen title, which is read and never tapped, and rare actions such as settings. It also suits actions you want to be deliberate, such as "Delete account", where a slower reach is useful friction.

Respect the **safe area** too. Notches, camera cut-outs, rounded corners and the home indicator all eat into the screen. Keep text and controls inside the safe area so nothing is clipped or fights system gestures, and let backgrounds run to the edges.

> **Common mistake:** AI-generated mobile screens often shrink a desktop layout, with a top bar crammed with icons, a hamburger menu in the top left and the main button at the top of a long form. On a 6.7-inch phone every one of those is a stretch. Move the main action into a bottom bar that stays visible above the keyboard.

## Typing on glass

The on-screen keyboard covers close to half the screen, so mobile forms need more care than the general advice in lesson 20.

- Ask for less, because every field costs more on a phone.
- Show the right keyboard, with the @ key for email, the number pad for phone numbers and a decimal pad for money. On the web, the input's type and inputmode attributes control this.
- Allow autofill and one-time code suggestions so fields fill with a single tap.
- Keep the active field and its submit button visible while the keyboard is open.

## Using this with your AI tools

AI tools default to the layouts they have seen most, many of them designed desktop first. Be explicit about the hand, the screen and the target sizes.

Useful prompt words: "one-handed use", "thumb zone", "primary action in the bottom third", "sticky bottom action bar", "44 by 44 pt minimum touch targets with 8 pt spacing", "respect safe area insets", "correct keyboard type for each field".

Then test on a real phone, or a large-phone preset in your browser's device toolbar, using one thumb. Look for icon buttons whose hit area shrank to the icon, bottom bars that collide with the home indicator, and submit buttons hidden by the keyboard.

> **Prompt:** Redesign this screen for one-handed use on a 6.7-inch phone. Move the primary action into a sticky bottom bar inside the safe area, make every tappable element at least 44 by 44 pt with 8 pt gaps, and keep the title and read-only content in the top half.
`,
  takeaways: [
    "About half of observed phone use is one-handed, and people switch grips all the time, so main actions must work with one thumb.",
    "Content goes in the top half where it is easy to see; controls go in the bottom half where the thumb can reach.",
    "Tappable areas need at least 44 by 44 pt (iOS) or 48 by 48 dp (Android), even when the visible icon is smaller.",
    "Leave at least 8 points between targets, and keep destructive actions away from the easy-to-hit spots.",
    "Keep text and controls inside the safe area, and make sure the keyboard never hides the field or its submit button.",
  ],
  check: [
    {
      q: "Your expense app's main action is 'Add expense'. Most people log expenses one-handed while paying at a till. Where should the action live?",
      options: [
        "An icon in the top-right corner of the navigation bar",
        "A prominent button in the bottom third of the screen",
        "Inside a menu behind a hamburger icon in the top left",
        "At the top of the expense list so it is the first thing people see",
      ],
      answer: 1,
      why: "The bottom third is inside the easy part of the thumb zone, and this is the action people repeat most. The top-right icon is the tempting answer because many apps put actions there, but on a large phone it is the hardest spot to reach one-handed.",
    },
    {
      q: "A list row has a 20 pt trash icon. Users keep missing it and opening the row instead. What is the best fix?",
      options: [
        "Add a tooltip that explains the icon",
        "Redraw the icon at 44 pt so it is easier to see",
        "Move the icon to the top of the screen",
        "Keep the icon at 20 pt and give it a tappable area of at least 44 by 44 pt",
      ],
      answer: 3,
      why: "The problem is the size of the hit area, and the hit area can be larger than the drawing. Redrawing the icon at 44 pt also enlarges the target, but it makes the row visually heavy; separating visual size from hit area fixes the taps and keeps the design light. Tooltips need hover, which phones do not have.",
    },
    {
      q: "A teammate says reach does not matter because 'everyone uses two hands on big phones'. What is the strongest reply?",
      options: [
        "Observation studies found about half of use is one-handed and people switch grips constantly, so the main actions must work with one thumb",
        "They are right, so the safest choice is to follow desktop layout conventions",
        "Two-handed use only matters on tablets, so phone layouts can ignore it",
        "Reach matters only for left-handed users, who are a small minority",
      ],
      answer: 0,
      why: "Hoober's observations found 49% one-handed use, 36% cradled and 15% two-thumbed, with people changing grip as they go. Designing for one thumb still works for two hands; designing for two hands fails the many people who use one.",
    },
  ],
  practice: [
    "lab-thumb",
    "lab-targets",
    {
      type: "sort",
      title: "Top or bottom",
      intro: "You are laying out screens for a food delivery app on a large phone. Decide where each element belongs.",
      buckets: ["Bottom half, easy thumb reach", "Top half, fine to stretch for"],
      items: [
        { text: "The 'Checkout £24.50' button on the basket screen", bucket: 0, why: "It is the main action of the screen and it is repeated often, so it belongs where the thumb rests." },
        { text: "The screen title 'Your basket'", bucket: 1, why: "Titles orient people and are read, never tapped, so the top is ideal." },
        { text: "The app's main tab bar", bucket: 0, why: "Switching sections is frequent, which is why both iOS and Android put the main navigation at the bottom." },
        { text: "A settings gear on the profile screen", bucket: 1, why: "Settings are used rarely, so a stretch costs little and frees the bottom for frequent actions." },
        { text: "The 'Send' button in the chat with your courier", bucket: 0, why: "It sits next to the keyboard, which is already at the bottom, and it is tapped every message." },
        { text: "The read-only order summary and delivery address", bucket: 1, why: "Content that is read belongs in the easy-to-see top half, leaving the reachable area for controls." },
        { text: "'Delete account' on the account screen", bucket: 1, why: "A destructive, rare action should take deliberate effort. Putting it in easy reach invites accidents." },
        { text: "The 'Add to basket' button on a dish page", bucket: 0, why: "It is the main action on that page and is tapped repeatedly while browsing." },
      ],
    },
    {
      type: "choice",
      title: "Mobile field fixes",
      intro: "Each scenario comes from a real kind of mobile form problem. Pick the best fix.",
      items: [
        {
          prompt: "A sign-up form asks for a phone number, but the full QWERTY keyboard appears and people have to switch to numbers manually.",
          options: ["Add a hint saying 'numbers only'", "Set the field to a telephone input type so the number pad appears", "Split the number into three separate boxes"],
          answer: 1,
          why: "The right input type brings up the right keyboard with no extra effort from the user. A hint still leaves them switching keyboards, and split boxes break pasting and autofill.",
        },
        {
          prompt: "On a checkout screen, opening the keyboard for the postcode field hides the 'Pay' button. Users dismiss the keyboard and hunt for the button.",
          options: ["Keep the action bar pinned above the keyboard while it is open", "Make the 'Pay' button larger", "Move the 'Pay' button to the top of the screen"],
          answer: 0,
          why: "The button needs to stay visible when the keyboard is open, so it should ride above the keyboard. A larger button is still hidden, and the top of the screen is the hardest place to reach.",
        },
        {
          prompt: "Two-step login sends a six-digit code by text message. Users switch to Messages, memorise the code and switch back.",
          options: ["Make the code shorter", "Show the code on screen as well", "Mark the field as a one-time code so the keyboard offers it automatically"],
          answer: 2,
          why: "Both iOS and Android can suggest the incoming code above the keyboard when the field is marked as a one-time code, turning a memory task into one tap. Shortening the code weakens security and does not remove the app switch.",
        },
        {
          prompt: "A list row has 'Edit' and 'Delete' as small text links 4 points apart at the right edge of the row.",
          options: ["Make both links bold", "Give each a 44 pt tappable area with clear space between them, and confirm or allow undo on delete", "Swap their order"],
          answer: 1,
          why: "Edge targets are hit least accurately, and these are tiny and crowded, with a costly mistake on one side. Bold text does not change the hit area, and swapping the order only moves the risk.",
        },
      ],
    },
  ],
  journal: "Use three apps one-handed today: a bank app, a messaging app and a map. For each, write down one control that sits outside easy thumb reach and whether its placement looks deliberate (a rare or risky action) or careless.",
  terms: ["thumb-zone", "touch-target", "hit-area", "safe-area", "one-handed-use"],
});
