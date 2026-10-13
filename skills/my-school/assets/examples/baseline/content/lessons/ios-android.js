L({
  id: "ios-android",
  part: 5,
  n: 32,
  title: "iOS and Android conventions",
  short: "Where Apple's and Google's design rules differ, and how to decide when to follow the platform or your brand.",
  minutes: { read: 5, watch: 15, practice: 20 },
  body: `
## Two platforms, two sets of habits

Apple publishes the **Human Interface Guidelines** (the HIG) for iOS. Google publishes **Material Design**, now in its third version, Material 3, for Android. Each describes how apps on that platform should look and behave, and each platform's own apps follow it, so people who use one phone every day build deep habits around it.

Jakob's law from lesson 22 applies here with full force. People spend most of their time in other apps, so they expect yours to work like those. A different shade of blue confuses nobody. A back gesture that does something unexpected breaks trust.

## Navigation and going back

On iOS, top-level sections live in a **tab bar** at the bottom of the screen. iPhone shows at most five tabs. Each screen has a navigation bar at the top with its title and, on any screen you drilled into, a back button in the top-left corner labelled with a chevron and often the previous screen's name. You can also swipe right from the left edge to go back. There is no system back button, so every pushed screen needs its own back button and every modal needs a visible Cancel or Close.

On Android, Material 3 calls its bottom bar the navigation bar and recommends it for three to five destinations. On tablets and larger screens it becomes a navigation rail down the side. Going back is a system feature. People swipe in from either the left or the right edge, or press a back button if they use three-button navigation. System back is expected to close whatever is on top first, such as the keyboard, a menu, a sheet or a dialog, before leaving the screen. Recent Android versions add predictive back, which previews the destination as you swipe.

[[fig:fig-ios-android]]

Since iOS 26, Apple's Liquid Glass style floats tab bars and toolbars over content as translucent layers. Tabs still sit at the bottom and back still sits at the top left.

## Actions, sheets and alerts

The **floating action button**, or FAB, is Material's home for the single most important action on a screen, like compose in Gmail. It floats in the bottom-right corner, inside easy thumb reach. iOS has no FAB. The primary action usually sits in the navigation bar (often top right, such as "Add" or "Done") or in a bottom toolbar, as with the compose button in Notes.

Both platforms use sheets that slide up from the bottom and can be dragged down to dismiss.

Confirmations look different. An iOS alert is a compact box in the centre of the screen with its buttons in a row, and Apple puts Cancel on the leading side (the left in English) with a destructive action in red. A Material dialog has a title, supporting text and text buttons aligned to the bottom right, with the confirming action on the far right.

Small things signal the platform too. The iOS share icon is a square with an upward arrow; Android's is three dots joined by lines. Each opens the system share sheet, which you should use instead of building your own.

> **Common mistake:** AI tools often produce one blended phone design, with an iOS-style "< Back" text link inside an Android app, a FAB with Material ripples on iPhone, or a custom popup that ignores the Android back gesture. Each looks fine in a screenshot and feels wrong in the hand.

## Type, units and sizes

iOS uses Apple's system typeface, SF Pro. Material uses Roboto by default, though manufacturers such as Samsung ship their own system fonts. Using the system font gets you each platform's tuned spacing and support for people who enlarge text.

The units differ too. iOS measures in points (pt). Android measures layout in **density-independent pixels** (dp) and text in scale-independent pixels (sp), which also follow the user's font-size setting. Both are designed to give roughly the same physical size on any screen density, which is why the minimum targets, 44 pt and 48 dp, feel similar under a thumb. Default body text is 17 pt on iOS and 16 sp for Material's large body style.

Both platforms let people make text much larger (lesson 25), so rows and buttons must grow with the text.

## Follow the platform or keep one brand

Most successful apps land in the middle. Airbnb and Spotify look recognisably the same on both platforms, with the same colours, imagery, tone of voice and content layouts. Underneath, they use each platform's back behaviour, share sheet, permission prompts and text scaling.

Follow the platform for anything people learn at the level of the operating system: navigation, going back, gestures, system dialogs, pickers, share, payments and accessibility settings. Keep your brand in colour, illustration, typography for headings, voice, and the way your own content is laid out.

> **Rule of thumb:** Brand the surface, follow the platform's behaviour. If a person would have to relearn something to use your app, it should probably be native.

How you build affects this. React Native renders real platform components, so many conventions come free. Flutter draws its own widgets and ships Material and Cupertino (iOS-style) sets, so you choose which to use where.

## Using this with your AI tools

Name the platform and the guideline in every mobile prompt, or you get an average of both. Vocabulary that steers well: "Apple Human Interface Guidelines", "Material 3", "tab bar", "large-title navigation bar", "top app bar", "navigation bar with 3 to 5 destinations", "floating action button", "modal bottom sheet", "system back", "SF Symbols", "Material Symbols", "Dynamic Type".

Then check the result on both platforms. On Android, system back should close sheets and dialogs before leaving the screen. On iOS, every pushed screen needs a visible way back. Share icons and alert button order should match the platform, and rows should grow at the largest text size.

> **Prompt:** Make this screen adapt per platform. On iOS use a large-title navigation bar and an alert with Cancel on the left and a red Delete on the right. On Android use a Material 3 top app bar, a FAB for 'New note', and make system back close any open sheet before leaving the screen.
`,
  takeaways: [
    "Follow each platform for behaviour people learned at the system level: navigation, back, gestures, system dialogs, share and text scaling.",
    "Keep your brand in colour, illustration, voice and content layout, which is how Airbnb and Spotify look the same on both platforms.",
    "iOS has no system back button, so every pushed screen needs one; Android's system back must close the top layer first.",
    "Material's FAB holds the one main action on a screen; on iOS the primary action goes in the navigation bar or toolbar.",
    "44 pt on iOS and 48 dp on Android are the minimum targets, and both sizes are roughly the same under a thumb.",
  ],
  check: [
    {
      q: "On Android, a user opens your filter bottom sheet and then swipes in from the edge of the screen. What should happen?",
      options: [
        "The app returns to the previous screen, keeping the sheet's filters",
        "Nothing, because the sheet has its own close button",
        "The sheet closes and the user stays on the current screen",
        "A dialog asks whether they want to leave the app",
      ],
      answer: 2,
      why: "Android's system back closes the topmost layer first: keyboard, menu, sheet or dialog, then the screen. Returning to the previous screen is the tempting answer because 'back' sounds like a page change, but skipping the sheet makes people lose their place.",
    },
    {
      q: "You need a 'Delete this note?' confirmation on both platforms. Which matches each platform's convention?",
      options: [
        "iOS: a centred alert with Cancel on the left and a red Delete on the right. Android: a dialog with text buttons at the bottom right, Delete on the far right",
        "Both: a full-screen page with a large red Delete button at the top",
        "iOS: a FAB that turns red. Android: a red bar at the top of the screen",
        "Both: Delete on the left so it is read first, Cancel on the right",
      ],
      answer: 0,
      why: "Apple places Cancel on the leading side of an alert and marks destructive actions in red; Material right-aligns dialog actions with the confirming action last. Putting Delete first may feel logical, but it goes against both platforms' habits and invites accidental deletes.",
    },
    {
      q: "A two-person startup is building a habit tracker for iOS and Android. Which approach is most sensible?",
      options: [
        "Two fully separate native designs, one per platform",
        "The iOS design everywhere, because the founders use iPhones",
        "One identical custom design, including a custom back button, custom alerts and a custom share sheet",
        "One brand (colour, illustration, voice, content layout) with each platform's navigation, back behaviour, system dialogs and share sheet",
      ],
      answer: 3,
      why: "Shared branding keeps the work manageable while platform behaviour keeps the app familiar. A fully identical custom design is tempting for a small team, but it breaks the habits people use in every other app, and system dialogs and back gestures are exactly where that hurts.",
    },
  ],
  practice: [
    "lab-platform",
    {
      type: "sort",
      title: "Whose convention is it",
      intro: "Sort each pattern by the platform whose guidelines it comes from. Some belong to both.",
      buckets: ["iOS (Human Interface Guidelines)", "Android (Material 3)", "Both platforms"],
      items: [
        { text: "A round button floating at the bottom right for 'Compose'", bucket: 1, why: "That is Material's floating action button. iOS puts primary actions in the navigation bar or toolbar." },
        { text: "Going back by swiping in from the right-hand edge", bucket: 1, why: "Android's system back gesture works from either edge. On iOS the back swipe starts at the left edge only." },
        { text: "A back button in the top left with a chevron and the previous screen's name", bucket: 0, why: "This is the iOS navigation bar back button. Android uses system back plus an optional up arrow in the top app bar." },
        { text: "Minimum touch target of 48 by 48 dp", bucket: 1, why: "dp is Android's unit and 48 dp is Material's minimum." },
        { text: "Minimum touch target of 44 by 44 pt", bucket: 0, why: "Points are Apple's unit and 44 pt is the HIG minimum." },
        { text: "Share icon drawn as a square with an arrow pointing up", bucket: 0, why: "That is Apple's share symbol. Android's share icon is three connected dots." },
        { text: "Main sections in a bar at the bottom of the screen, three to five items", bucket: 2, why: "iOS calls it a tab bar and Material calls it a navigation bar, but both put top-level sections at the bottom." },
        { text: "A sheet that slides up from the bottom and can be dragged down to dismiss", bucket: 2, why: "Both platforms use sheets this way, with small differences in handles and resting heights." },
        { text: "A navigation rail down the side of the screen on tablets", bucket: 1, why: "The navigation rail is a Material component for medium and large screens." },
        { text: "Roboto as the default typeface", bucket: 1, why: "Roboto is Material's default. iOS uses SF Pro." },
      ],
    },
    {
      type: "choice",
      title: "Platform or brand",
      intro: "Each request comes from a teammate on a cross-platform app. Pick the best response.",
      items: [
        {
          prompt: "Marketing wants the selected tab icon on iOS to use the brand purple instead of the default blue.",
          options: ["Refuse, because tab bars must use system blue", "Do it; tinting the tab bar with a brand colour keeps the platform's behaviour and only changes the surface", "Replace the tab bar with a custom purple side menu"],
          answer: 1,
          why: "Colour is surface. Both platforms expect apps to apply their own accent colour, and nothing about the tab bar's behaviour changes.",
        },
        {
          prompt: "A designer drew a custom hand-drawn back arrow and wants to turn off Android's back gesture so people use the arrow instead.",
          options: ["Keep the custom arrow if you like it, but never block system back or the iOS edge swipe", "Ship it as designed so the brand feels consistent", "Remove all back buttons and rely on gestures"],
          answer: 0,
          why: "A custom icon is a surface choice. Blocking system back breaks a habit people use hundreds of times a day, and they will feel trapped.",
        },
        {
          prompt: "Date of birth entry: the team is choosing between a custom branded scrolling carousel and the system date picker.",
          options: ["The custom carousel, because it matches the brand", "A plain text field with no format hint", "The system date picker, or a well-labelled text field, because it brings locale formats and accessibility for free"],
          answer: 2,
          why: "System pickers handle locale date formats, screen readers and large text. A custom carousel has to rebuild all of that and usually gets some of it wrong.",
        },
        {
          prompt: "You want more people to allow notifications, and someone suggests restyling the system permission prompt to match the app.",
          options: ["Restyle the prompt in your brand colours", "You cannot change the system prompt; design your own explanation screen before it, in your brand style", "Show the system prompt three times in a row"],
          answer: 1,
          why: "System permission dialogs are drawn by the operating system and cannot be styled. What you control is the screen that explains the benefit before it appears, which lesson 33 covers.",
        },
      ],
    },
  ],
  journal: "Pick one app you know well and look at it on both platforms (on two phones, or through its App Store and Play Store screenshots). Write down which behaviours differ, which surfaces stay the same, and one difference you would copy in your own app.",
  terms: ["human-interface-guidelines", "material-design", "tab-bar", "floating-action-button", "density-independent-pixel", "system-back"],
});
