L({
  id: "wearables-tv-voice",
  part: 6,
  n: 38,
  title: "Watches, TVs and voice",
  short: "How design changes for a two-second glance at a wrist, a screen across the room, and a conversation with no screen at all.",
  minutes: { read: 5, watch: 15, practice: 20 },
  body: `
## Different devices, different moments

Every lesson so far assumed someone looking closely at a screen they can touch or point at. These devices break that assumption. A watch is seen for a second or two while you are doing something else. A TV is three metres away and driven by a remote with arrow keys. A voice assistant has no screen at all, so everything happens in time and in memory.

Copying a phone design onto them rarely works. Start again from the person's situation, the habit this course has been building since lesson 1.

## Watches: design for the glance

Apple's watchOS guidance centres on interactions measured in seconds. Aim for a **glanceable** screen, understood in a second or two without real reading.

- Show one main piece of information per screen, in large type with strong contrast. Black backgrounds blend into the bezel on the watch's OLED display and save power.
- Notifications are the main event. Apple divides them into a short look, shown briefly as you raise your wrist, and a long look, with more detail and actions if you keep looking.
- A **complication** is a small piece of an app's data shown on the watch face, such as the next meeting or today's activity. It is often the most-used part of a watch app, because it needs no opening at all.
- Input is limited to taps, the Digital Crown, dictation and quick replies, so offer choices instead of typing.
- Haptics can carry meaning. Apple Watch can give walking directions with different tap patterns for left and right turns, so you can navigate without looking.

Pick the one or two tasks that make sense on a wrist, such as checking a status or starting a timer, and leave the rest to the phone.

## TV: the ten-foot interface

A **ten-foot UI** is designed to be used from a sofa about three metres from the screen. A large TV at that distance fills less of your view than a laptop on your knees, so type must be larger, items fewer, spacing wider and contrast higher than on a desktop. Avoid thin type weights, which break up.

[[fig:fig-ten-foot]]

There is no pointer. The remote's arrow keys move a highlight from item to item, which is called **focus navigation**. Exactly one item is focused at any time, and the focus state must be unmistakable from across the room. Apple TV lifts the focused poster and tilts it slightly as you move your thumb on the remote. Lesson 25's advice on visible focus applies at ten times the distance.

- Make movement predictable, so pressing right moves to whatever is visually to the right.
- Remember position, so returning to a row puts focus where it was.
- Back always goes back one step, and Home always goes home.

Older TVs cropped the edges of the picture, a behaviour called **overscan**, and some still do. Keep text and focusable items inside a safe area about 5% in from each edge. Android TV's guidance sets this as 48 dp on the sides and 27 dp at the top and bottom of its layout.

Typing with a remote is miserable. Many streaming apps let you sign in by scanning a QR code or entering a short code on your phone.

> **Common mistake:** Porting a web or phone layout to TV gives you small type, a dozen items per row, a hamburger menu, no visible focus state and a search field that expects a mouse click. Test every screen with the arrow keys alone.

> **Try it now:** Open a streaming app on your TV and search for a film by typing its title with the remote. Count the button presses it takes.

## Voice: design for the ear

A **voice user interface** has no screen to scan. People cannot look back at what was said, so they must hold it in working memory, which lesson 22 put at about four chunks. Keep each turn short, offer no more than about three options at a time, and end with the question, so people know when it is their turn to speak.

The philosopher Paul Grice's cooperative principle (1975) is a good brief for any voice response. Say as much as is needed and no more, be truthful, be relevant and be clear.

Confirmation depends on the stakes. **Implicit confirmation** repeats what was understood as part of the reply ("OK, a 10-minute timer, starting now"), so people can correct it without an extra step. Explicit confirmation asks a yes or no question before acting, which is right for money, messages and anything irreversible: "Send £50 to Sam Jones from your current account?"

Errors come in two kinds: hearing nothing, and hearing words that match nothing. In both cases, never blame the person, and give more help with each attempt, such as example answers. After two or three failures, offer another route, such as sending a link to their phone or passing them to a person.

> **Rule of thumb:** If a voice reply would sound odd read aloud to a friend, rewrite it. If a TV focus state cannot be spotted from the sofa in under a second, strengthen it.

## Using this with your AI tools

AI tools will shrink a phone app onto a watch or stretch it onto a TV unless you name the device's constraints. For watches: "glanceable layout, one data point per screen, black background, complication". For TV: "10-foot UI, D-pad focus navigation, focus state with scale and bright outline, 5% safe-area margins, no text entry". For voice: "implicit confirmation for low-stakes actions, explicit confirmation for payments, escalating reprompts for no input and no match".

Then test in the right posture. Drive a TV prototype from the sofa with arrow keys only, view watch screens at real size on your wrist, and read every voice prompt aloud to someone to see if they can answer without a repeat.

> **Prompt:** Design a TV home screen for this app as a 10-foot UI: rows of large posters navigated with arrow keys, a focused item that scales up with a bright outline, focus remembered per row, all content inside 5% safe margins, and sign-in by QR code instead of typing.
`,
  takeaways: [
    "A watch screen should be understood in a second or two: one fact, large type, high contrast, and a complication if possible.",
    "TV interfaces are driven by focus, so exactly one item is focused and that focus must be obvious from three metres away.",
    "Keep TV text and controls about 5% in from each edge, and replace typing with QR codes, phone sign-in or voice.",
    "Voice has no screen to scan: keep turns short, offer about three options at most, and end with the question.",
    "Confirm implicitly for low-stakes voice actions and explicitly for money, messages and anything irreversible.",
  ],
  check: [
    {
      q: "You are adding a watch app for a parcel delivery service. What should it focus on?",
      options: [
        "Full order history with search",
        "A full delivery map with pinch to zoom",
        "Account and payment settings",
        "A glanceable delivery status, a notification when the courier is close, and a complication with the arrival time",
      ],
      answer: 3,
      why: "Watches suit brief checks and timely alerts, and a complication answers 'when will it arrive' without opening anything. The map is tempting because tracking feels visual, but it needs zooming and attention that a two-second glance cannot give.",
    },
    {
      q: "In a TV app, testers keep getting lost in a grid of shows and cannot tell which one is selected. What is the most likely fix?",
      options: [
        "A much stronger focus state, such as scaling the item up with a bright outline, visible from across the room",
        "Add an on-screen cursor controlled by the arrow keys",
        "Fit more items into each row so there is less scrolling",
        "Make the thumbnails smaller so the whole grid fits on screen",
      ],
      answer: 0,
      why: "Focus navigation only works if people can see the focus instantly from the sofa. A cursor sounds familiar, but steering one with arrow keys is slow and imprecise, which is why TV platforms use focus instead.",
    },
    {
      q: "A banking voice assistant hears 'pay Sam fifty pounds'. What should it say next?",
      options: [
        "'Done.'",
        "'OK, paying Sam,' and then make the payment",
        "'Send £50 to Sam Jones from your current account? Say yes to confirm.'",
        "Read out both account numbers and sort codes, then ask for confirmation",
      ],
      answer: 2,
      why: "Money is high-stakes and irreversible, so it needs explicit confirmation with the key details. Implicit confirmation ('OK, paying Sam') is right for timers and music, but here it leaves no chance to catch the wrong Sam or a misheard amount.",
    },
  ],
  practice: [
    "lab-tv-focus",
    {
      type: "sort",
      title: "Implicit or explicit confirmation",
      intro: "A home voice assistant receives each request. Decide whether it should simply repeat what it understood and act, or ask a yes or no question first.",
      buckets: ["Implicit: repeat and act", "Explicit: ask before acting"],
      items: [
        { text: "'Set a timer for 10 minutes'", bucket: 0, why: "Low stakes and easy to correct. 'OK, 10 minutes, starting now' is enough." },
        { text: "'Play some jazz'", bucket: 0, why: "If it picks the wrong playlist, the person just says something else." },
        { text: "'Turn off the kitchen lights'", bucket: 0, why: "Instantly reversible, and the result is visible." },
        { text: "'Add milk to my shopping list'", bucket: 0, why: "Repeating 'milk' lets people catch a mishearing without an extra question." },
        { text: "'Call Mum'", bucket: 0, why: "'Calling Mum' gives a moment to cancel, which is enough for a call." },
        { text: "'Transfer £300 to my landlord'", bucket: 1, why: "Money is irreversible. Confirm the amount, the recipient and the account." },
        { text: "'Delete all my reminders'", bucket: 1, why: "Destructive and wide in scope, so a mishearing would be costly." },
        { text: "'Open the garage door'", bucket: 1, why: "A security action. Confirm before acting, and consider requiring a code." },
        { text: "'Book a table for four on Saturday at 8'", bucket: 1, why: "It commits the person to something with a cost if wrong, so read back the details first." },
      ],
    },
    {
      type: "rewrite",
      title: "A reprompt that helps",
      intro: "A cinema's voice booking line asked 'Which showing would you like?' and could not understand the reply. Its current second attempt is below.",
      task: "Rewrite the reprompt so it gives more help than the first question did.",
      given: "I didn't understand that. Please try again.",
      rubric: [
        "Does not blame the caller or sound like an error message",
        "Gives concrete options, no more than about three",
        "Ends with a clear question so the caller knows it is their turn",
        "Short enough to say comfortably in one breath",
      ],
      model: "Sorry, I didn't catch that. Today there's a 6:15 and a 9 o'clock showing. Which one would you like?",
    },
  ],
  journal: "Tonight, use a TV streaming app, a smart speaker or a smartwatch for ten minutes. Write down one moment where you lost track of the focus, forgot what was said or had to look twice, and describe the change that would have prevented it.",
  terms: ["glanceable", "complication", "ten-foot-ui", "focus-navigation", "overscan", "voice-user-interface", "implicit-confirmation"],
});
