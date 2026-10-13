L({
  id: "navigation-web",
  part: 4,
  n: 28,
  title: "Navigation and wayfinding",
  short: "How people find their way around a website, and how to design navigation, labels and links that support them.",
  minutes: { read: 5, watch: 10, practice: 20 },
  body: `
## Every page is a front door

**Wayfinding** is how people work out where they are and where to go. On the web they rarely arrive at the home page: search engines, shared links and ads drop them onto any page at all. So every page has to answer four questions on its own: where am I, what is here, where can I go next, and how do I get back.

Steve Krug's **trunk test**, from Don't Make Me Think (2000), makes this practical. Imagine being driven around in a car boot (a trunk, in Krug's American) and dropped on a random page. At a glance you should be able to find the site's name, the page's name, the main sections, where you are within them, and a way to search.

> **Try it now:** Search for something specific on a big site you use and open the fifth result. Without scrolling, find the site name, the page name, the section you are in and a way to search.

## Kinds of navigation

- **Global navigation** lists the main sections in the header and stays the same on every page, so people learn it once (consistency, lesson 23).
- **Local navigation** lists the pages within the current section, often down the side of documentation and help sites.
- **Breadcrumbs** show the path from the home page to here, such as Home / Garden / Tools / Spades, with each step a link. They help on deep hierarchies like shops and documentation, and add nothing on a flat five-page site.
- **Utility navigation** holds account, basket and language links, usually smaller and at top right.
- **Contextual links** sit inside content, such as a link to the returns policy from a delivery FAQ.
- **Search** is essential on large sites, because people who know what they want go straight to it. On content-heavy sites, show it as a visible field, as Amazon does across its header.

The footer then acts as a safety net for people who reach the end (lesson 26).

## Labels and information scent

People choose links much as animals forage, following the cue that most strongly suggests their goal lies that way. Peter Pirolli and Stuart Card at Xerox PARC called this **information scent**. A label with strong scent predicts what is behind it. Labels like "Solutions", "Platform" and "Resources" could mean almost anything, so people hesitate, guess or leave.

- Use your visitors' words. The card sorts and tree tests from lesson 5 tell you what those are.
- Be specific: "Pricing" beats "Plans and offers", and "Help with an order" beats "Support hub".
- Front-load the distinctive word (lesson 24).
- Make categories distinct, so every page has one obvious home.
- There is no magic number of items (remember the Miller misuse from lesson 22). Judge by how quickly people can scan and choose.

Show people where they are, too. Highlight the current section in the navigation, make the page heading match the link they clicked, and keep breadcrumbs accurate. In code, an attribute called aria-current tells screen readers which link is the current page.

## Menus on small and large screens

On phones the full navigation rarely fits, so it often hides behind a menu button with three lines, the **hamburger menu**. Nielsen Norman Group's testing found that hiding navigation makes content harder to discover, with the strongest effect on desktop.

- On desktop, show the main navigation whenever there is room. A hamburger on a wide screen hides routes for no reason.
- On mobile, keep the two or three most important destinations visible and put the rest behind the menu. Add the word "Menu" beside the icon if your audience might not recognise it.
- A **mega menu** suits large sites with many categories, such as a department store. Group links under headings, open the panel on click or after a short hover delay, and make it work with the keyboard. Hover-only menus fail on touch screens and snap shut when a pointer drifts.
- Sticky headers keep navigation close but cost height on phones. A common compromise hides the header as you scroll down and shows it as you scroll up.

> **Common mistake:** AI-built sites often ship nav links that point nowhere, a hamburger at every screen width, and filters that never reach the URL. Click every link, resize the window from wide to narrow, and test the back button after filtering.

## Links, URLs and the back button

Links in body text should look like links, usually underlined, because colour alone fails people who cannot see the difference (lesson 12). Open links in the same tab by default: new tabs break the back button and disorient people, especially on phones and with screen readers.

People lean heavily on the back button, so it must do what they expect. URLs are navigation too. Readable addresses such as /pricing or /help/returns tell people where they are and can be shared. Filters, tabs and searches should update the URL, so that Back, refresh and sharing all restore what the person saw. Single-page apps often get this wrong: you filter a list, open an item, press Back, and your filters are gone.

A missing page should say so plainly and offer search and the main routes.

## Using this with your AI tools

Decide the structure before you prompt, or the tool will invent a generic "Solutions, Platform, Resources, Company" sitemap. Give it your real sections, labels and hierarchy, then ask for specific patterns: global navigation visible from a stated width, breadcrumbs on deep pages, the current page marked with aria-current, and filter state stored in the URL.

To review, run the trunk test on three deep pages and click every link. Tab through the menus with the keyboard and resize from wide to narrow, checking the menu at each size. Then apply a filter, open an item and press Back.

> **Prompt:** Build the navigation from this sitemap: these five global links, visible at 1024 px and wider and behind a button labelled "Menu" below that; breadcrumbs on product pages; aria-current on the active link; and filter and sort state kept in the URL so Back restores it.
`,
  takeaways: [
    "Every page is a front door: show where people are, what is here and where they can go.",
    "Labels should predict what is behind them; words like 'Solutions' carry weak scent.",
    "Show navigation when there is room; when you must hide it, label the menu.",
    "Menus must work with click, touch and keyboard, never hover alone.",
    "Keep state in the URL so Back, refresh and sharing all work.",
  ],
  check: [
    {
      q: "Someone lands on a help article from a search engine. The page shows the article and nothing else: no site name, no section, no navigation. What fails most?",
      options: [
        "Wayfinding: they cannot tell where they are or where to go next",
        "Page speed",
        "The article's reading level",
      ],
      answer: 0,
      why: "The page fails the trunk test: no site identity, no section, no routes onward. The article may answer the question, which is why reading level is tempting, but anyone who needs a related page is stranded.",
    },
    {
      q: "A software company's top navigation reads 'Solutions, Platform, Resources, Company'. What is the main problem?",
      options: [
        "Four items is too many",
        "The labels should be in title case",
        "The labels have weak information scent, so visitors cannot predict what is behind them",
        "They should be icons to save space",
      ],
      answer: 2,
      why: "Each label could hide almost anything, so people have to click around to find pricing or help. The count is tempting to blame, but four items is a small menu; the words are the problem.",
    },
    {
      q: "On a single-page shop, someone filters trainers to size 9, opens a pair, then presses Back and sees every trainer again. What is the best fix?",
      options: [
        "Open products in a new tab so the list stays put",
        "Store the filters in the URL so Back restores them",
        "Add a 'Back to results' button on the product page",
      ],
      answer: 1,
      why: "Putting the state in the URL fixes Back, refresh and sharing in one go. A new tab is tempting because it keeps the list, but it breaks the back button and piles up tabs, especially on phones.",
    },
  ],
  practice: [
    {
      type: "sort",
      title: "Name the navigation",
      intro: "Sort each example into the kind of navigation it is.",
      buckets: ["Global navigation", "Local navigation", "Breadcrumbs", "Utility navigation"],
      items: [
        { text: "Women, Men, Kids, Home, Sale across the top of every page of a clothing shop", bucket: 0, why: "The main sections, the same on every page." },
        { text: "The list of articles in the Billing section of a help centre, down the left side", bucket: 1, why: "Pages within the current section only." },
        { text: "Home / Garden / Tools / Spades above a product title", bucket: 2, why: "The path from the home page to this page, each step a link." },
        { text: "Sign in, Basket (2) and English (UK) in small type at top right", bucket: 3, why: "Account, basket and language tools, not content sections." },
        { text: "Product, Pricing, Customers, Docs in a software company's header", bucket: 0, why: "Top-level sections shown site-wide." },
        { text: "Chapters of a long guide listed beside the text, with the current one highlighted", bucket: 1, why: "Navigation within one section, with a 'you are here' marker." },
        { text: "Docs / API / Authentication above a developer article", bucket: 2, why: "A trail through the hierarchy back to the top." },
        { text: "Account and Help links beside the search box", bucket: 3, why: "Tools that support the visit; they are not sections of content." },
      ],
    },
    {
      type: "choice",
      title: "Navigation decisions",
      intro: "Choose what a careful designer would do.",
      items: [
        {
          prompt: "A desktop site has five main sections and a wide header with plenty of room, but hides everything behind a hamburger icon.",
          options: ["Keep it, because hamburgers look clean", "Show the five sections as visible links", "Add a second hamburger for the utility links"],
          answer: 1,
          why: "There is room, and hidden navigation gets used less. The hamburger exists for screens where links cannot fit.",
        },
        {
          prompt: "A department store's mega menu opens only on hover and closes the moment the pointer leaves the trigger.",
          options: ["Open it on click, or after a short hover delay, keep it open while the pointer crosses to it, and support the keyboard", "Make the trigger bigger", "Replace it with a single long dropdown"],
          answer: 0,
          why: "Hover-only menus fail on touch screens and for keyboard users, and they snap shut when the pointer takes a diagonal route to a link.",
        },
        {
          prompt: "A six-page portfolio site wants to add breadcrumbs to every page.",
          options: ["Yes, breadcrumbs always help", "Only on the home page", "Not needed; highlight the current page in the main navigation instead"],
          answer: 2,
          why: "A flat site has no hierarchy for breadcrumbs to show. The 'you are here' job is done by highlighting the current page in the navigation.",
        },
        {
          prompt: "A link to a related article in a blog post opens in a new tab.",
          options: ["Open it in the same tab, so the back button works as people expect", "Keep the new tab so readers do not leave your site", "Open it in a pop-up window"],
          answer: 0,
          why: "New tabs break the back button and confuse people on phones and screen readers. Reserve them for cases like a help link inside a half-finished form.",
        },
        {
          prompt: "A restaurant's mobile site puts everything, including the menu and table booking, behind a hamburger.",
          options: ["Fine, it keeps the header tidy", "Move 'Book a table' into the hero only", "Keep 'Menu' and 'Book a table' visible in the header and put the rest behind the hamburger"],
          answer: 2,
          why: "Most visitors want the food menu or a booking. Keep the two most important destinations visible and hide only the long tail.",
        },
      ],
    },
    {
      type: "rewrite",
      title: "Give the labels some scent",
      intro: "Replace vague navigation labels with ones that predict what is behind them.",
      task: "Rewrite the header navigation for an online bookkeeping app for small UK businesses. Its pages are: features (invoicing, expenses, VAT returns), pricing, a help centre with guides, an about page with careers, and the sign-up form.",
      given: "Solutions | Platform | Resources | Company | Get started",
      rubric: [
        "Each label predicts what is behind it",
        "Uses words customers would use",
        "No two labels overlap",
        "The sign-up link names the action",
      ],
      model: "Features | Pricing | Help | About us | Start free trial",
    },
  ],
  journal: "Pick a large site you use, such as a supermarket, your council or your bank. Land on a deep page from a search engine and run the trunk test. Write down what it shows you, what is missing, and the one change that would help most.",
  terms: ["wayfinding", "trunk-test", "global-navigation", "local-navigation", "breadcrumbs", "information-scent", "hamburger-menu", "mega-menu"],
});
