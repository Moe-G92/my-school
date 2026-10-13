L({
  id: "patterns",
  part: 3,
  n: 19,
  title: "Common interface patterns",
  short: "When to use a modal, drawer, popover or toast, how to split and page content, and how to design empty, loading and error states.",
  minutes: { read: 5, watch: 12, practice: 20 },
  body: `
## Why patterns exist

A **design pattern** is a proven answer to a problem that keeps coming up, such as how to interrupt, how to page through a long list or how to handle waiting. People learn patterns across every app they use, so a familiar one costs them nothing to understand. Jakob Nielsen's observation that users spend most of their time on other sites is the reason to reuse them; lesson 22 covers the psychology behind it. Invent a new pattern only when you can show the familiar one failing your users.

## Overlays: modal, drawer, popover, toast

All four appear on top of the page. They differ in how much they interrupt.

- A **modal dialog** blocks everything behind it until the person responds. Use it for decisions that must happen now, such as "Delete project and its 340 files", or for short, focused tasks. It must keep keyboard focus inside, close with Escape where that is safe, and return focus to the button that opened it. Never stack one modal on another.
- A **drawer**, or side sheet, slides in from an edge and leaves the page partly visible. It suits secondary tasks that benefit from context, like filters on a product list or the details of a table row.
- A **popover** is small, anchored to whatever opened it, and does not block the page: menus, date pickers, quick settings. A click outside closes it. A tooltip is its simpler cousin, text only, shown on hover and focus.
- A **toast**, or snackbar, is a short message that appears and fades without blocking anything, like Gmail's "Message sent" with an Undo link. Toasts suit confirmations. They are wrong for errors people must act on, because they vanish, and screen reader users can miss them unless they are announced.

To choose, first ask whether the person must respond before doing anything else; if so, use a modal. Then ask whether they need the page in view while they work; if so, use a drawer or a popover. If neither applies, a toast or an inline message is usually enough.

> **Rule of thumb:** For reversible actions, act straight away and offer Undo in a toast. Keep confirmation dialogs for things that cannot be undone. Every unnecessary "Are you sure?" trains people to click Yes without reading.

## Tabs and accordions

**Tabs** switch between peer views of the same thing, one at a time, like Overview, Activity and Settings for a project. Keep the labels short and on one row. Tabs are a poor fit for steps in a sequence, and for content people need to compare, because only one panel shows at once.

An **accordion** stacks sections that expand and collapse. It works when people need one or two sections out of many, as in an FAQ or long help content on a phone. It works badly when people need most of the content, because every section costs a tap. Make the whole header row clickable, use a chevron that turns, and let several sections stay open together.

## Long lists: pagination, infinite scroll, load more

**Pagination** splits results into numbered pages. It suits goal-driven tasks such as searching a shop, scanning an admin table or finding something again later. People know where they are and how much is left, and the footer stays reachable.

**Infinite scroll** loads more as you near the bottom. It suits feeds people browse without a goal, like social timelines. Its costs are real: no sense of an end, an unreachable footer, lost position after pressing Back, and pages that grow heavier as you go.

A Load more button sits between the two. People decide when to fetch more, and the footer stays reachable. Whichever you choose, restore the scroll position when someone comes back from a detail page.

## Empty, loading and error states

Every screen that shows data has more states than the one in the mockup. The designer Scott Hurff named five: ideal, empty, loading, partial and error. Mockups and AI tools tend to deliver only the ideal one.

- An **empty state** depends on why it is empty. On first use, say what will appear and offer the first action, such as "Create your first invoice". With no search results, suggest a fix, like clearing filters. When someone has cleared everything, as in an empty inbox, a short acknowledgement is enough.
- Loading depends on time. Nielsen's response-time limits still hold: about 0.1 s feels instant, about 1 s keeps a person's flow, and past about 10 s attention drifts. Under a second, show nothing, because a spinner that flashes looks like a glitch. For a few seconds, show a spinner or a **skeleton screen**, grey shapes in the layout of the content to come, which makes the wait feel shorter and stops the page jumping. For long tasks, show progress with an estimate and let people carry on with something else.
- An error state says what happened, why if you know, and what to do next, with a Retry button. Keep whatever the person had typed. Lesson 24 covers the wording.

> **Common mistake:** Generated dashboards often show one full-page spinner for every fetch, then drop all the content in at once so the layout jumps. Use skeletons that match the final layout, load sections independently, and design the empty state before the full one.

## Using this with your AI tools

Name the pattern and its behaviour, because "show a modal" alone tends to produce one with no focus handling. Ask for every state of a data screen up front.

> **Prompt:** Build the projects list with pagination (20 per page), a skeleton matching the card layout while loading, a first-use empty state with a 'Create project' button, a no-results state with 'Clear filters', and an error state with Retry. Deleting a project opens a confirmation dialog that traps focus, closes on Escape and returns focus to the trigger.

Then test the behaviour as well as the look. Open the dialog and press Tab and Escape. Throttle the network in DevTools to see the loading state. Filter down to nothing to see the empty state, and switch the network off to trigger the error.
`,
  takeaways: [
    "Reuse familiar patterns, because people already know how they behave.",
    "Modals block, drawers keep context, popovers stay small and anchored, toasts confirm and fade.",
    "For reversible actions, act at once and offer Undo; confirm only what cannot be undone.",
    "Paginate goal-driven lists, keep infinite scroll for aimless feeds, and always restore position on Back.",
    "Design the empty, loading and error states before you polish the ideal one.",
  ],
  check: [
    {
      q: "Why is a toast a poor way to tell someone 'Your payment failed'?",
      options: [
        "Toasts are too small to notice on desktop",
        "It disappears on its own, so people can miss an error they must act on, and screen readers may not announce it",
        "Toasts are only for success messages in green",
        "Errors must always appear in a modal dialog",
      ],
      answer: 1,
      why: "A failed payment needs action, and a message that fades away can be missed. The modal option is tempting, but the best place for this error is usually inline on the payment form, next to the field or button involved, where it stays until it is fixed.",
    },
    {
      q: "A product catalogue uses infinite scroll. Shoppers open a product, press Back, and land at the top of the list again. What fixes the most?",
      options: [
        "Add a 'Back to top' button",
        "Make products load faster",
        "Restore the scroll position on Back, and consider Load more or pagination for a goal-driven catalogue",
        "Show fewer products per batch",
      ],
      answer: 2,
      why: "Losing your place is the real cost here, and shopping is a goal-driven task where pagination or Load more often suits people better. Faster loading is nice, but people still have to scroll all the way back to where they were.",
    },
    {
      q: "A dashboard widget usually loads in 2 to 4 seconds, and its layout is always the same. Which loading treatment fits best?",
      options: [
        "A skeleton that matches the widget's layout",
        "A full-page spinner until every widget has loaded",
        "Nothing until it loads, then the content appears",
        "A progress bar with a time estimate",
      ],
      answer: 0,
      why: "A few seconds is long enough to need feedback, and a known layout is exactly where skeletons shine. A blank space for 2 to 4 seconds looks broken. A progress bar with an estimate is meant for long tasks, roughly 10 seconds or more.",
    },
  ],
  practice: [
    {
      type: "choice",
      title: "Pick the pattern",
      intro: "Each scenario has one best pattern. Choose it.",
      items: [
        {
          prompt: "Someone archives an email. Archived emails can be restored at any time.",
          options: [
            "A confirmation dialog asking 'Are you sure?'",
            "Archive immediately and show a toast with Undo",
            "A drawer explaining what archiving does",
          ],
          answer: 1,
          why: "The action is reversible, so a dialog only adds friction to something people do many times a day. The toast confirms it happened and offers an easy way back.",
        },
        {
          prompt: "Deleting a workspace permanently removes 340 files for the whole team.",
          options: [
            "A toast with Undo",
            "A popover next to the button",
            "A modal dialog that names what will be lost, with a 'Delete workspace' button",
          ],
          answer: 2,
          why: "Irreversible, high-stakes actions deserve an interruption. Naming the consequence and using a specific button label makes people read before they confirm.",
        },
        {
          prompt: "On a phone, shoppers want to adjust price, size and colour filters while seeing how many products match.",
          options: [
            "A drawer or bottom sheet with the filters and a live result count",
            "A modal dialog that hides the results completely",
            "A series of popovers, one per filter",
          ],
          answer: 0,
          why: "Filtering benefits from context, and a sheet keeps the task focused while showing its effect. Popovers for each filter are fiddly on a small screen.",
        },
        {
          prompt: "A project page has Overview, Activity and Settings, which people rarely need side by side.",
          options: ["An accordion", "Tabs", "Three separate modal dialogs"],
          answer: 1,
          why: "Peer views of the same object, used one at a time, are what tabs are for. An accordion would stack three large sections on top of each other.",
        },
        {
          prompt: "An admin table of 12,000 orders where staff search, sort and return to the same page later.",
          options: [
            "Infinite scroll",
            "Load all 12,000 rows at once",
            "Pagination, with the page number kept in the URL",
          ],
          answer: 2,
          why: "Goal-driven work needs a sense of position and a way back. A page number in the URL makes that position shareable and survives a refresh.",
        },
      ],
    },
    {
      type: "sort",
      title: "Name the state",
      intro: "Sort each message into the kind of state it belongs to.",
      buckets: ["First-use empty state", "No-results state", "Error state"],
      items: [
        { text: "No invoices yet. Create your first invoice to get paid.", bucket: 0, why: "Explains what will appear and offers the first action." },
        { text: "No projects yet. Start from a template or a blank project.", bucket: 0, why: "A new account with nothing in it, offered two ways to begin." },
        { text: "You have not added any teammates. Invite someone to collaborate.", bucket: 0, why: "A feature that has never been used, with a clear next step." },
        { text: "No orders match 'refnd'. Check the spelling or clear filters.", bucket: 1, why: "The data exists, but the search found nothing, so it suggests fixes." },
        { text: "Nothing matches these filters. Try removing 'Size: XS'.", bucket: 1, why: "Points at the exact filter that is excluding everything." },
        { text: "No results for 'blue jumper' in Kids. Search all departments instead?", bucket: 1, why: "Offers a wider search, a helpful no-results pattern." },
        { text: "We could not load your messages. Check your connection and try again.", bucket: 2, why: "Something failed. It says what, suggests a cause and offers a retry." },
        { text: "Payment did not go through and your card was not charged. Try again or use another card.", bucket: 2, why: "A failure with reassurance about the consequence and two ways forward." },
      ],
    },
    {
      type: "rewrite",
      title: "Rewrite an empty state",
      intro: "Empty states are often the first screen a new user sees. Make this one do its job.",
      task: "Rewrite the empty state for a new user's invoice list in an invoicing app. Include the message and the label of one button.",
      given: "No data.",
      rubric: [
        "Says what will appear in this space",
        "Offers one clear first action with a specific button label",
        "Short, friendly and free of jargon or blame",
      ],
      model: "No invoices yet. Create your first invoice and it will appear here with its status, from draft to paid. Button label: Create invoice.",
    },
  ],
  journal: "In an app you use daily, find three states most people never notice: an empty state (search for something nonsensical), a loading state (try it on a slow connection) and an error (switch off Wi-Fi). Write down what each one says and whether it tells you what to do next.",
  terms: ["modal-dialog", "drawer", "popover", "toast", "pagination", "infinite-scroll", "empty-state", "skeleton-screen"],
});
