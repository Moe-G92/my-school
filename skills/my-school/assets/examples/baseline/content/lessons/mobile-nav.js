L({
  id: "mobile-nav",
  part: 5,
  n: 33,
  title: "App navigation and flows",
  short: "How to build an app's skeleton from tabs, stacks and sheets, and how to handle first runs, permissions and notifications.",
  minutes: { read: 5, watch: 15, practice: 20 },
  body: `
## Choose the skeleton first

Most apps are built from three parts. Tabs hold the top-level places, stacks take people deeper, and modals or sheets handle focused tasks. This is the information architecture of lesson 5, squeezed onto a phone.

A tab bar works best for three to five destinations that people return to again and again, such as Home, Search and Library. Each tab is a place, named with a noun, shown with an icon and a visible label. Each tab also keeps its own history. If you drill into an album in Library, switch to Search and come back, you should land on the same album. Tapping the active tab again takes you back to the top of that tab.

Bottom tabs beat a hamburger menu for the main sections because visible options get used. Nielsen Norman Group's testing found hidden navigation is discovered and used less. Menus suit secondary things such as settings and help.

> **Rule of thumb:** If you cannot name three to five places people come back to every week, you may not need tabs at all. A single home screen with stacks beneath it is a respectable app.

## Stacks: going deeper and coming back

A **navigation stack** is the list-to-detail pattern. Tap a row and a new screen slides in on top; go back and it slides away, revealing the list exactly as you left it. The title tells people where they are, and the back control tells them where they will return.

Keep stacks shallow. Two or three levels is easy to hold in your head; six is a maze. If people keep drilling down to reach something common, promote it to a tab or a shortcut.

Pay special attention to **deep links**, which open a specific screen directly from a notification, an email or a web link. If someone taps "Your order has shipped", open the order detail with the orders list behind it, so back takes them somewhere sensible instead of closing the app. Android's guidance asks for this constructed back stack, and iOS apps benefit from it too.

Preserve state through interruptions. Scroll positions, half-filled forms and filters should survive a phone call or a trip to another app.

## Modals and sheets for focused tasks

A **modal** takes over the screen for a self-contained task, such as writing a message or adding a payment card, and ends with an explicit Save or Cancel. On iOS it slides up from the bottom, which signals that it sits outside the normal back-and-forth of the stack. Use modals for tasks; use the stack for browsing deeper.

Modals can be swiped away, so protect anything people have typed. iOS Mail asks whether to delete or save a draft when you cancel it.

A **bottom sheet** covers part of the screen and keeps the context visible. Apple Maps shows a place's details in a sheet that can rest at different heights over the map. Sheets suit options, filters and quick details. Avoid stacking sheet on sheet, which leaves people unsure what back or a swipe will close.

> **Common mistake:** AI-built apps often open detail screens as modals, nest modals three deep, or show a full-screen modal with no visible close button. People lose the way back. Detail screens belong in the stack, and every modal needs a clear exit.

## First run: onboarding that gets out of the way

Most people swipe through feature-tour carousels without reading. They opened the app to do something, so the best **onboarding** lets them do it quickly.

- Show value before asking for an account. Duolingo lets you pick a language and start a lesson before creating a profile.
- Ask only for what changes the first screen, such as a goal or a level.
- Teach in context, with a one-time hint when someone first reaches a feature.
- Treat the empty first screen as onboarding, with a clear first action (lesson 34 covers empty states).

## Permissions and notifications

System permission prompts are a scarce resource. On iOS, an app gets one chance to show the system prompt for each permission; after a refusal, the person has to find the switch in Settings. Since Android 11, if someone denies a permission twice, the system stops showing the prompt.

**Permission priming** protects that one chance. Ask at the moment a feature needs access, such as the camera when someone taps "Scan receipt". If the benefit is not obvious from the context, show your own short explanation first, with "Continue" and "Not now". Only "Continue" triggers the system prompt. If someone refused earlier, explain how to turn it on and offer a button that opens Settings.

Notifications follow the same logic. iOS has always required permission for them, and Android 13 made them a runtime permission too. Ask after people have seen value, such as straight after a first order. iOS also supports provisional notifications, which arrive quietly in Notification Centre without a prompt, so people can judge them before deciding.

Each notification should be timely and worth acting on. Let people choose categories in settings. Every irrelevant or promotional alert teaches people to switch off all of them.

> **Try it now:** Open your phone's notification settings and count how many apps you have silenced. Pick one and write down the notification that made you do it.

## Using this with your AI tools

Describe the skeleton before any screen. Name the tabs, what sits in each stack, and which tasks are modals or sheets. Useful vocabulary: "bottom tab bar with 4 destinations", "each tab keeps its own navigation stack", "push detail screen", "modal with Cancel and Save", "bottom sheet with medium and large heights", "deep link with constructed back stack", "permission priming screen before the system prompt".

Then test the flows by hand. Switch tabs mid-task, open a deep link and press back, and swipe away a modal with unsaved text. Deny each permission and check the app still works.

> **Prompt:** Set up navigation as a bottom tab bar with Home, Search, Orders and Profile, each with its own stack. Open order details from a notification with the orders list behind them, and show a priming screen before the notification permission prompt only after the first completed order.
`,
  takeaways: [
    "Use a tab bar for three to five places people return to, and let each tab remember its own history.",
    "Go deeper with a stack, handle self-contained tasks in a modal with a clear exit, and use sheets when context must stay visible.",
    "Deep links should open with a sensible screen behind them, so back never dumps people out of the app.",
    "You get one real chance at each system permission prompt, so ask in context and explain the benefit first.",
    "Ask for notifications after people have seen value, and send only alerts worth acting on.",
  ],
  check: [
    {
      q: "A recipe app has seven top-level sections and the designer has squeezed all seven into a bottom tab bar. What is the best fix?",
      options: [
        "Shrink the icons and drop the labels so all seven fit",
        "Move all seven into a hamburger menu",
        "Make the tab bar scroll sideways",
        "Keep the four places people visit most as tabs and move the rest into a 'More' or profile screen",
      ],
      answer: 3,
      why: "Tab bars work for three to five frequent destinations, and iPhone shows at most five. Moving everything into a hamburger menu looks tidy, but hidden navigation is found and used less, which hurts the sections people visit most.",
    },
    {
      q: "Someone taps a notification saying 'Your order has shipped'. The app opens the order detail. They press back. What should happen?",
      options: [
        "The app closes, because it was opened from a notification",
        "They land on the orders list, and pressing back again takes them home",
        "The onboarding carousel appears",
        "The order detail reloads",
      ],
      answer: 1,
      why: "A deep link should come with a sensible back stack, so back moves up the app's hierarchy. Closing the app is what happens when nothing is behind the deep-linked screen, which feels like being thrown out mid-task.",
    },
    {
      q: "Your receipt-scanning app needs the camera. When should the system camera permission prompt appear?",
      options: [
        "On first launch, together with location and notifications",
        "At the end of the onboarding carousel",
        "When the person taps 'Scan receipt', after a short explanation if the benefit is not obvious",
        "Never; ask people to enable the camera in Settings themselves",
      ],
      answer: 2,
      why: "Asking in context makes the benefit obvious and protects your one chance at the system prompt. Asking for everything at launch feels efficient, but people refuse what they do not yet understand, and a refusal is hard to undo.",
    },
  ],
  practice: [
    {
      type: "sort",
      title: "Tab, stack, modal or sheet",
      intro: "You are structuring a podcast app. Decide which navigation pattern fits each piece.",
      buckets: ["Tab (top-level place)", "Stack (push a new screen)", "Modal (focused task)", "Sheet (partial, keeps context)"],
      items: [
        { text: "Library, where your saved shows live", bucket: 0, why: "It is a place people return to daily, which is what tabs are for." },
        { text: "Search", bucket: 0, why: "Search is a frequent top-level destination in most content apps." },
        { text: "An episode page opened from a show in your Library", bucket: 1, why: "It is a step deeper in the hierarchy, so it pushes onto the Library stack and back returns to the list." },
        { text: "A host's profile opened from an episode page", bucket: 1, why: "Another level deeper in the same stack. Keep an eye on depth when chains like this grow." },
        { text: "Writing a review with a star rating and text", bucket: 2, why: "It is a self-contained task that ends with Submit or Cancel, and unsaved text needs protecting." },
        { text: "Adding a payment card for premium", bucket: 2, why: "A focused task with a clear end. It should not be mixed into the browsing stack." },
        { text: "Playback speed options while listening", bucket: 3, why: "A small set of options where the player should stay visible behind them." },
        { text: "Sort and filter options over the episode list", bucket: 3, why: "Filters work best when people can still see the list they are filtering." },
        { text: "Sharing an episode to a messaging app", bucket: 3, why: "Both platforms use a system share sheet for this, and you should use it instead of building your own." },
      ],
    },
    {
      type: "order",
      title: "Asking for location the right way",
      intro: "A shop app wants location access to show nearby stores. Put the steps in the best order.",
      items: [
        "Person taps 'Find stores near me'",
        "App shows a short screen explaining that location is used only to sort nearby stores, with 'Continue' and 'Not now'",
        "Person taps 'Continue'",
        "App shows the system location prompt",
        "If allowed, the list sorts by distance; if denied, the app offers a postcode search instead",
      ],
      why: "The request starts from the person's own action, so the reason is obvious. Your explanation comes before the system prompt because you only get one real chance at it, and the fallback means a refusal never leaves a dead end.",
    },
    {
      type: "rewrite",
      title: "A notification primer people accept",
      intro: "A food delivery app shows this screen on first launch, before anyone has ordered. Almost everyone taps 'Don't allow'.",
      task: "Rewrite it as a priming screen shown straight after the first order is placed. Write a headline, one or two sentences, and the two button labels.",
      given: "Allow notifications? We'd like to send you notifications. [Allow] [Don't allow]",
      rubric: [
        "Ties the request to a concrete benefit in this moment, such as knowing when the food is close",
        "Says what kind of notifications to expect, and ideally what they will not get",
        "Offers a genuine way to decline that does not trigger the system prompt",
        "Short enough to read in a few seconds (around 40 words or fewer in total)",
      ],
      model: "Know when your food is close. We'll let you know when your order is picked up and when it's two minutes away. No marketing. [Turn on order updates] [Not now]",
    },
  ],
  journal: "Pick an app you installed recently. List everything it asked of you in the first five minutes (account, permissions, notifications, preferences) in order, and note which request came before you had any reason to say yes.",
  terms: ["navigation-stack", "modal", "bottom-sheet", "deep-link", "onboarding", "permission-priming", "push-notification"],
});
