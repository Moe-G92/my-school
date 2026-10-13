L({
  id: "desktop",
  part: 6,
  n: 37,
  title: "Desktop apps",
  short: "The conventions people expect on Mac and Windows: menus, shortcuts, right-click, hover, drag and drop, windows and command palettes.",
  minutes: { read: 5, watch: 15, practice: 20 },
  body: `
## Where people work for hours

Desktop gives you a precise pointer that can hover, a full keyboard, large screens and several windows at once. It is also where people spend whole working days inside one tool, which makes it the home of the **power user**, someone who uses your app daily and wants speed more than guidance. Good desktop software is easy to start and gets faster with experience.

People resize windows, tile them side by side and spread work across monitors, so the responsive thinking from lesson 29 applies inside the window. Remember window sizes and pane widths between launches, and support multi-level undo, because fast users make fast mistakes. Desktop can be denser than mobile, since a pointer is more precise than a thumb, but keep targets at or above WCAG's 24 by 24 pixel minimum.

Many desktop apps, including Slack, VS Code and Notion, are web technology inside an Electron shell. That makes it easy to ship a website in a window and forget what people expect from a desktop app.

## Menus are the index of everything

On the Mac, the **menu bar** sits at the top of the screen and belongs to whichever app is in front. The pointer stops at the screen's edge, so the menu bar behaves as if it were infinitely tall, a textbook case of Fitts's law from lesson 22. On Windows, menus live inside each window, and Microsoft Office swapped its menus for the ribbon in 2007.

- Put every command in a menu, even if it also has a button. Menus are where people browse for features, and they show each command's shortcut, which is how shortcuts get learned.
- A trailing ellipsis, as in "Export…", means the command needs more input before it runs.
- Disable unavailable commands instead of hiding them, so people learn they exist. Apple's and Microsoft's guidelines both recommend this.

The Mac's Help menu can search every menu command, so a complete menu bar doubles as a search index.

## Keyboard shortcuts and platform conventions

A **keyboard shortcut** lets experts act without reaching for the pointer. The standard set is muscle memory, so never repurpose it.

- Mac uses Command (⌘) where Windows uses Ctrl, for copy, paste, undo, save, find and the rest.
- Redo is Cmd+Shift+Z on the Mac and Ctrl+Y on Windows, though many Windows apps also accept Ctrl+Shift+Z.
- Cmd+W or Ctrl+W closes the current window or tab. Cmd+Q quits a Mac app, and Cmd+comma opens its settings.
- Esc cancels a dialog and Enter triggers its default button. The Mac puts the default button at the far right; Windows puts OK before Cancel.

Web apps often add single-key shortcuts. Linear uses C to create an issue, and Gmail, once shortcuts are switched on, uses E to archive. In Gmail and on GitHub, the question mark key lists every shortcut. Single-key shortcuts must not fire while someone is typing, and WCAG success criterion 2.1.4 requires a way to turn them off or remap them.

> **Common mistake:** Web apps wrapped as desktop apps often ignore Cmd+W, have no Cmd+comma for settings, and grab Cmd+F for a custom search that cannot find text on the page. Each one breaks a habit people use dozens of times a day.

## Hover, right-click and drag and drop

Hover is desktop's quiet advantage. Tooltips can name icon-only buttons and show their shortcut, such as "Bold (Cmd+B)", and Gmail reveals archive and delete icons on the email row under the pointer. Touchscreen laptops and keyboard users never hover, so show hover actions on keyboard focus too and keep them available elsewhere.

Right-click opens a **context menu** with actions for the thing under the pointer. Experts use it constantly and newcomers may never find it, so everything in it should also exist in the menu bar or toolbar.

**Drag and drop** feels direct when it shows what can be dragged, highlights valid targets, shows exactly where the item will land and lets Esc cancel. It also needs a non-drag route, such as a "Move to…" menu, which WCAG 2.2 success criterion 2.5.7 requires.

> **Rule of thumb:** Every command should be reachable in at least two ways, one visible (a button or menu) and one fast (a shortcut, the context menu or a command palette).

## Command palettes

A **command palette** is a searchable list of every command, opened with a shortcut. Sublime Text popularised it with Cmd+Shift+P, VS Code kept that shortcut, and Linear opens one with Cmd+K.

It combines typing, which is fast, with a filtered list that people recognise instead of having to recall exact names. A good palette matches loosely, so "exp pdf" finds "Export as PDF…". It shows recent commands first, includes navigation such as jumping to a project, and lists each command's shortcut so people learn it. Keep the menus too; the palette serves people who already know roughly what they want.

> **Try it now:** Press Cmd+K or Ctrl+K in three web apps you use for work. Note which open a palette, which open a search box and which do nothing.

## Using this with your AI tools

AI tools build desktop apps as websites unless you say otherwise. Name the conventions: "native menu bar with standard File, Edit and View menus", "shortcuts following macOS and Windows conventions", "Cmd+K command palette with fuzzy search and shortcut hints", "right-click context menu mirroring toolbar actions", "drag and drop with drop indicators and a Move to menu", "resizable three-pane layout that remembers its widths", "multi-level undo".

Then test it like a power user. Do a whole task without touching the mouse. Press Esc in every dialog, try Cmd+Z after each action, right-click everything, and shrink the window to its minimum size.

> **Prompt:** Add a Cmd+K (Ctrl+K on Windows) command palette that lists every command with fuzzy search, recent commands first and each shortcut shown on the right, and make sure every palette command also appears in the menu bar.
`,
  takeaways: [
    "Put every command in the menus, show shortcuts beside them, and disable unavailable items instead of hiding them.",
    "Respect the standard shortcuts on each platform: Command on Mac, Ctrl on Windows, and never repurpose them.",
    "Hover actions, right-click menus and drag and drop are accelerators, so each needs a visible or keyboard alternative.",
    "Remember window sizes and pane widths, support multi-level undo, and keep targets at 24 by 24 pixels or more.",
    "A command palette with fuzzy search and shortcut hints gives power users speed and teaches shortcuts along the way.",
  ],
  check: [
    {
      q: "Your desktop notes app adds 'Export as PDF', which opens a dialog to choose page size. How should it appear in the File menu?",
      options: [
        "Hidden until a note is open, so the menu stays short",
        "'Export as PDF…' with its shortcut shown, greyed out when no note is open",
        "Only in the right-click menu on a note",
        "Only in the command palette, to keep menus simple",
      ],
      answer: 1,
      why: "The ellipsis signals a dialog, the shortcut teaches speed, and a disabled item tells people the command exists. Hiding it seems tidier, but people then cannot discover the feature until they happen to be in the right state.",
    },
    {
      q: "Your web app adds single-letter shortcuts, and E archives a thread. A user types 'meeting' in a comment box and archives the thread. What is the fix?",
      options: [
        "Remove all keyboard shortcuts",
        "Show a warning toast after any shortcut fires",
        "Stop single-key shortcuts firing while focus is in a text field, and let people turn them off or remap them",
        "Change every shortcut to Ctrl+Alt combinations",
      ],
      answer: 2,
      why: "Single-key shortcuts are valuable for experts but must be inactive while typing, and WCAG 2.1.4 requires a way to turn them off or remap them. Removing them all fixes the bug by punishing the people who rely on them.",
    },
    {
      q: "A kanban board lets people move cards between columns only by dragging. Who is shut out, and what is the fix?",
      options: [
        "Keyboard and switch users, and people with tremors; add a 'Move to…' menu on each card and keyboard controls for moving",
        "Nobody, because everyone on desktop has a mouse",
        "Only mobile users; make the cards larger",
        "Only new users; add a tutorial explaining dragging",
      ],
      answer: 0,
      why: "Dragging needs fine, sustained pointer control that many people do not have, and WCAG 2.2's 2.5.7 requires a single-pointer alternative. Larger cards help with aiming but do not remove the need to drag.",
    },
  ],
  practice: [
    {
      type: "sort",
      title: "Mac, Windows or both",
      intro: "You are building a cross-platform desktop app. Sort each convention by the platform that expects it.",
      buckets: ["Mac", "Windows", "Both"],
      items: [
        { text: "One menu bar at the top of the screen for whichever app is in front", bucket: 0, why: "The Mac's global menu bar sits at the screen edge, which makes it easy to hit." },
        { text: "Menus inside each app window", bucket: 1, why: "Windows apps carry their menus, or a ribbon, inside the window." },
        { text: "Command+Q quits the app", bucket: 0, why: "Quitting is a Mac app menu command with this standard shortcut." },
        { text: "Alt+F4 closes the active window", bucket: 1, why: "A long-standing Windows shortcut." },
        { text: "Ctrl+Y redoes the last undone action", bucket: 1, why: "The traditional Windows redo, though many apps also accept Ctrl+Shift+Z." },
        { text: "Command+Shift+Z redoes the last undone action", bucket: 0, why: "Mac apps use Shift with the undo shortcut for redo." },
        { text: "Settings opened with Command+comma", bucket: 0, why: "A Mac convention found in most Mac apps, with no universal Windows equivalent." },
        { text: "OK placed to the left of Cancel in dialogs", bucket: 1, why: "Windows orders the commit button first. The Mac puts the default button at the far right." },
        { text: "Esc closes a dialog without making changes", bucket: 2, why: "Both platforms treat Esc as cancel." },
        { text: "A trailing ellipsis on menu items that open a dialog", bucket: 2, why: "Both platforms use the ellipsis to signal that more input is needed." },
      ],
    },
    {
      type: "choice",
      title: "Desktop design calls",
      intro: "Each scenario comes from a desktop or desktop-style web app. Pick the best design.",
      items: [
        {
          prompt: "Your Mac app has its settings behind a gear icon in the toolbar and nowhere else.",
          options: ["Leave it, because the gear is a well-known icon", "Move the gear to the sidebar", "Add 'Settings…' to the app menu with Command+comma, and keep the gear if you like"],
          answer: 2,
          why: "Mac users expect settings in the app menu with Command+comma. The gear can stay as a visible route, but it should not be the only one.",
        },
        {
          prompt: "Email rows show Archive and Delete icons only while the pointer hovers over them.",
          options: ["Also show them on keyboard focus, put them in the toolbar for the selected email, and add shortcuts and a context menu", "Remove the hover icons to keep rows clean", "Make the icons larger"],
          answer: 0,
          why: "Hover actions are a fine accelerator, but keyboard and touchscreen users never hover, so the actions need other routes.",
        },
        {
          prompt: "An icon-only toolbar button makes text bold.",
          options: ["Add a text label under every toolbar icon", "Leave it, since everyone knows the B icon", "Show a tooltip, 'Bold (Cmd+B)', on hover and on keyboard focus"],
          answer: 2,
          why: "The tooltip names the icon and teaches the shortcut without cluttering the toolbar. Labels under every icon can work, but in dense editors they usually cost too much space.",
        },
        {
          prompt: "People press Command+W in your Electron app to close a document tab, and nothing happens.",
          options: ["Add a close button to each tab and leave the shortcut", "Map Command+W and Ctrl+W to close the current tab or window, matching other apps", "Show a tip telling people to click the close button"],
          answer: 1,
          why: "People bring their shortcuts from every other app. When a standard shortcut does nothing, the app feels broken.",
        },
        {
          prompt: "A user needs to compare two contracts side by side in your document app.",
          options: ["Let them open each document in its own window or in a split view", "Tell them to print one", "Add a 'Compare' button that only works for two versions of the same document"],
          answer: 0,
          why: "Desktop's big screens and multiple windows exist for this. Supporting separate windows or panes lets people arrange their work as they like.",
        },
      ],
    },
  ],
  journal: "Spend ten minutes doing real work in a desktop app without touching the mouse or trackpad. Write down which tasks you finished, where you got stuck, and which shortcut, menu item or palette command would have saved you.",
  terms: ["power-user", "menu-bar", "keyboard-shortcut", "context-menu", "drag-and-drop", "command-palette"],
});
