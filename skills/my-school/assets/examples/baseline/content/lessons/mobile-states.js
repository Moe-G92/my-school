L({
  id: "mobile-states",
  part: 5,
  n: 34,
  title: "Lists, gestures and feedback on mobile",
  short: "How to design mobile lists, gestures people can discover, instant feedback, and the empty and offline states every app hits.",
  minutes: { read: 5, watch: 15, practice: 20 },
  body: `
## Lists do most of the work

Most mobile screens are lists: messages, transactions, songs, settings. A good list row has a predictable anatomy. A leading element (avatar, icon or thumbnail), a title, an optional secondary line, and a trailing element such as a time, an amount, a switch or a chevron. On iOS the chevron says "tapping opens more".

Keep the same structure in every row so the eye can run down one column (the similarity principle from lesson 6). Make the whole row tappable and at least 44 pt or 48 dp tall. For long lists, add search at the top and section headers that stick while scrolling, or an A to Z index down the edge like the iPhone's Contacts app.

While content loads, show a **skeleton screen**, grey placeholder rows in the shape of the real content. It tells people what is coming and feels faster than a lone spinner on a blank screen.

## Gestures are invisible

Lesson 2 said every action needs a signifier, and gestures have none. People only know a gesture exists if another app or yours taught them.

**Pull to refresh** is the success story. Loren Brichter introduced it in his Twitter client Tweetie, and it is now built into both platforms. It works because it appears where new content arrives at the top, in feeds and inboxes, so people try it there by habit. Use it there, and still refresh automatically when the screen opens. An "Updated 2 minutes ago" note saves people pulling just to check.

**Swipe actions** are the cautionary tale. In iOS Mail, swiping a message sideways reveals actions such as archive, flag and mark as read. Gmail archives on a swipe and offers Undo. Experts find them fast; everyone else never finds them at all.

- Treat a swipe as a shortcut. Every swipe action must also be available somewhere visible, such as the detail screen, a long-press menu or an edit mode.
- Keep directions consistent, so the same direction always means the same kind of action.
- Make destructive swipes undoable with a short message and an Undo button. A confirmation dialog after a swipe throws away the speed that made the gesture worth having.
- Teach it once, for example by nudging the first row sideways the first time the list appears.

> **Common mistake:** AI-generated list screens often make swipe-to-delete the only way to delete, with no undo. Half your users never find it, and the other half delete things by accident while scrolling.

## Optimistic UI and feedback timing

Nielsen's response-time limits are a useful scale. Around 0.1 seconds feels instant, around 1 second keeps people's flow, and around 10 seconds is as long as attention holds. The Doherty threshold from lesson 22, about 400 ms, sits in that range. Mobile networks often blow past them.

**Optimistic UI** updates the screen at once, as if the server has already said yes, and syncs in the background. Tap the heart on a post and it fills immediately. If the request fails, the app quietly reverts and says so, keeping whatever the person typed.

Use it when success is very likely and the action is low-stakes and reversible: likes, marking as read, reordering, adding to a basket. A chat message can appear instantly marked "Sending", then "Sent", or "Not sent. Tap to retry". Do not use it for payments, bookings or anything where a false "done" causes harm. There, show honest progress and then a real confirmation.

> **Rule of thumb:** Every tap gets visible feedback within about 100 ms, even if the real work takes longer. A pressed state or a sending label is enough.

## Empty, offline and error states

An **empty state** is the screen before there is anything to show, and it comes in three kinds.

- First use. Say what will appear and give one action: "No saved recipes yet. Tap the heart on any recipe to keep it here."
- Cleared by the user. Inbox zero is an achievement, so a calm, small reward fits.
- No results. Repeat what was searched, suggest a fix, and offer to clear filters.

Phones lose signal in lifts and tunnels, so treat offline as a normal state. Keep the last content visible, labelled with when it was updated. Let people keep working and queue their changes to sync later, marking anything not yet synced. A slim banner saying you are offline beats a full-screen error that wipes out what was already there. For real errors, use lesson 24's formula of what happened and what to do next.

> **Try it now:** Turn on airplane mode and open your bank app, a messaging app and a news app. Note which still show content, which explain what is happening, and which simply break.

## Haptics: feedback you can feel

**Haptic feedback** is the small, precise vibration that confirms something happened. iOS offers distinct patterns for selection changes, impacts, and success, warning and error, and Android has a similar set. A picker wheel that ticks as values pass, or a firm tap when a payment completes, makes the interface feel physical.

Use haptics for meaningful moments: a confirmed payment, a toggle snapping on, reaching a limit. Pair every haptic with a visible change, because some people turn haptics off. If everything buzzes, nothing means anything.

## Using this with your AI tools

AI tools usually generate the happy path, a full list on a fast connection. Ask for the other states by name: "skeleton loading rows", "pull to refresh on the feed", "swipe actions duplicated in a long-press menu", "undo snackbar instead of a confirmation dialog", "optimistic update with rollback on failure", "first-use empty state with one primary action", "offline banner with cached content and last-updated time", "success haptic on payment confirmation".

Then break it on purpose. Use a fresh account to see the empty states, switch to airplane mode mid-task, throttle the network in your browser's developer tools, and swipe-delete something then undo it.

> **Prompt:** For this inbox list, add skeleton rows while loading, pull to refresh, a swipe-to-archive action that shows an Undo snackbar and is also in the long-press menu, and an offline banner that keeps the cached messages visible with a 'last updated' time.
`,
  takeaways: [
    "Give every list row the same anatomy, make the whole row tappable, and show skeleton rows while it loads.",
    "Gestures have no signifier, so every swipe or long-press action needs a visible alternative and a one-time hint.",
    "Undo beats confirmation for fast, destructive actions like swipe to archive.",
    "Use optimistic UI for likely, low-stakes, reversible actions; never fake success for payments or bookings.",
    "Design first-use, cleared, no-results and offline states on purpose, and keep cached content visible when the signal drops.",
  ],
  check: [
    {
      q: "In your to-do app, swiping left deletes a task. Testing shows new users never find it and complain they cannot delete tasks. What is the best fix?",
      options: [
        "Also offer Delete on the task's detail screen and in a long-press menu, and nudge the first row once to hint at the swipe",
        "Add a tutorial carousel at first launch that explains every gesture",
        "Make swiping right delete too, so either direction works",
        "Add a confirmation dialog to every swipe",
      ],
      answer: 0,
      why: "A gesture should be a shortcut with a visible alternative, plus a light hint in context. A launch tutorial is tempting, but people skip carousels and forget gestures shown out of context before they need them.",
    },
    {
      q: "Which of these is the worst candidate for optimistic UI?",
      options: [
        "Liking a photo",
        "Marking an email as read",
        "Paying £180 for train tickets",
        "Reordering songs in a playlist",
      ],
      answer: 2,
      why: "Optimistic UI suits likely, low-stakes, reversible actions. A payment can fail for many reasons and a false 'done' could leave someone at the station without a ticket. Reordering might seem risky because it changes data, but it is easy to revert and rarely fails.",
    },
    {
      q: "A banking app loses signal in a lift. Today it replaces the whole screen with 'Something went wrong'. What is better?",
      options: [
        "Show a spinner until the signal returns",
        "Keep the last-loaded balance and transactions visible, label when they were updated, and show a slim offline banner",
        "Log the person out for security",
        "Show a full-screen illustration with a Retry button",
      ],
      answer: 1,
      why: "Offline is a normal state on phones, and cached content with a timestamp is still useful. A friendly full-screen illustration looks like an improvement, but it still hides information the app already had.",
    },
  ],
  practice: [
    {
      type: "sort",
      title: "Optimistic or wait",
      intro: "For each action, decide whether the app should update the screen instantly or wait for the server to confirm.",
      buckets: ["Optimistic: update instantly", "Wait for confirmation"],
      items: [
        { text: "Liking a friend's post", bucket: 0, why: "Almost always succeeds, harmless if it fails, and easy to revert quietly." },
        { text: "Marking a message as read", bucket: 0, why: "Low stakes and reversible. Waiting would make the inbox feel sluggish." },
        { text: "Dragging a task higher in a list", bucket: 0, why: "Reordering should feel physical. If the save fails, move it back and say so." },
        { text: "Sending a chat message", bucket: 0, why: "Show it at once with a 'Sending' status, and switch to 'Not sent. Tap to retry' if it fails." },
        { text: "Adding a jacket to a shopping basket", bucket: 0, why: "Cheap to undo, and stock is checked again at checkout." },
        { text: "Transferring £500 to a friend", bucket: 1, why: "Money must never look sent when it is not. Show progress, then a real confirmation." },
        { text: "Booking the last table at a restaurant", bucket: 1, why: "Someone else might get it first, so only the server can say yes." },
        { text: "Applying a discount code", bucket: 1, why: "Validity is decided by the server, and a wrong total breaks trust at the worst moment." },
        { text: "Deleting your account", bucket: 1, why: "Irreversible and high stakes. It needs a deliberate confirmation and a real result." },
      ],
    },
    {
      type: "choice",
      title: "Feedback that fits",
      intro: "Pick the best feedback for each moment in a mobile app.",
      items: [
        {
          prompt: "A person swipes to archive an email in their inbox.",
          options: ["Archive it at once and show 'Archived' with an Undo button for a few seconds", "Show a dialog asking 'Archive this email?'", "Archive it with no message at all"],
          answer: 0,
          why: "Undo keeps the gesture fast and recovers mistakes. A dialog cancels the speed, and silence leaves people unsure what happened to the email.",
        },
        {
          prompt: "A person sends a message on a weak train connection.",
          options: ["Block the input with a spinner until the server replies", "Show the message at once marked 'Sending', then 'Sent' or 'Not sent. Tap to retry'", "Show nothing until it is delivered"],
          answer: 1,
          why: "Optimistic display with honest status keeps the conversation flowing and makes failure recoverable. Blocking the input punishes people for the network.",
        },
        {
          prompt: "A recipe search for 'vegan lasagne' returns nothing.",
          options: ["Show 'No results'", "Show a blank screen", "Say there are no recipes for 'vegan lasagne', suggest 'vegan pasta', and offer to clear the 'Under 20 min' filter"],
          answer: 2,
          why: "A no-results state should repeat the query and offer a way forward. 'No results' is accurate but leaves people stuck.",
        },
        {
          prompt: "A person flips the 'Dark mode' switch in settings.",
          options: ["Show a dialog asking them to confirm", "Switch the theme instantly, with at most a light selection haptic", "Show a 'Saved' toast and play a success vibration"],
          answer: 1,
          why: "Switches apply immediately, and the visible change is the feedback. A success haptic and toast for a routine toggle is noise that dilutes the meaning of real successes.",
        },
        {
          prompt: "A payment for a £42 order goes through.",
          options: ["A success haptic plus a clear confirmation screen with the amount and order number", "Confetti animation and nothing else", "Three strong vibrations"],
          answer: 0,
          why: "This is the moment a success haptic is for, paired with visible proof people can trust. Confetti without details leaves them unsure what they paid.",
        },
      ],
    },
    {
      type: "rewrite",
      title: "An empty state that starts something",
      intro: "A new habit-tracking app shows this on a brand-new account.",
      task: "Rewrite the first-use empty state: one or two short sentences and the label for one button.",
      given: "No data.",
      rubric: [
        "Says what will appear on this screen once it is in use",
        "Gives one clear first action with a specific button label",
        "Includes a small, concrete example that makes starting feel easy",
        "Brief and friendly without jokes or exclamation marks",
      ],
      model: "Your habits will live here. Start with one small thing you want to do every day, like a ten-minute walk. [Add your first habit]",
    },
  ],
  journal: "Turn on airplane mode and use three apps you rely on. For each, write down what you saw, whether it told you what was happening, and one change that would have made it more useful offline.",
  terms: ["skeleton-screen", "pull-to-refresh", "swipe-action", "optimistic-ui", "empty-state", "offline-state", "haptic-feedback"],
});
