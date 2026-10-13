L({
  id: "ia",
  part: 1,
  n: 5,
  title: "Information architecture",
  short: "How to organise, group and name what's in your product so people can find things and know where they are.",
  minutes: { read: 5, watch: 10, practice: 20 },
  body: `
## Structure before screens

Before anyone sees a layout, someone has decided what the product contains, how it's grouped, what each group is called and how you move between them. That is **information architecture** (IA): organising, structuring and labelling content so people can find things and understand where they are. On Garrett's planes from lesson 1, it lives on the structure plane, underneath every screen.

The architect Richard Saul Wurman popularised the term in the 1970s, and Rosenfeld and Morville's Information Architecture for the World Wide Web (1998) made it a discipline for websites. In apps, the sidebar of a project tool and the tab bar of a banking app are IA made visible.

Bad IA is expensive because it's hard to see. People blame themselves when they can't find something, so the problem arrives as support emails asking where things are, and as features nobody uses because nobody finds them.

## Schemes and structures

An **organisation scheme** is the logic used to group things. Exact schemes have one right answer: alphabetical like a contact list, chronological like a bank statement, or geographical like a store finder. They work when people already know the name, date or place they want.

Ambiguous schemes need judgement. You can group by topic (a help centre's Billing section), by task (Send an invoice, Get paid) or by audience (For freelancers, For agencies). They suit browsing, when people know roughly what they want and not its exact name. Most products mix the two.

Structures describe how the groups connect. A hierarchy, or tree, is the most common. A sequence suits tasks with a fixed order, like checkout. A **faceted** structure lets people filter one large collection along several independent attributes at once, the way Airbnb lets you filter by price, type of place and number of bedrooms. Facets beat deep hierarchies whenever items vary in several ways that people care about in different orders.

The classic IA mistake is organising by your own internals. Navigation that mirrors your company's departments, or your database tables, makes sense to you and to nobody else. Users carry a **mental model**, their own picture of how things fit together, and your structure should match it.

> **Common mistake:** Generating navigation straight from a feature list. AI tools will happily give you a sidebar with 14 items, one per feature, because that's what you described. Group features by what people are trying to do, and expect several features to share one destination.

## Labels and information scent

Labels are the words on the signposts. Peter Pirolli and Stuart Card at Xerox PARC described people searching for information as foragers following a scent. At each step they pick the link whose label seems most likely to lead to what they want. Strong **information scent** means a label clearly predicts what's behind it.

Clever or vague labels kill scent. "Solutions" and "Resources" could contain almost anything, while "Pricing" and "Help centre" say exactly what they hold. Use the words your users use, which you'll have heard in research (lesson 4), and keep sibling labels in the same form, all nouns or all verbs.

> **Rule of thumb:** A label should let someone predict what's behind it before they click. If a navigation item needs a tooltip to explain it, rename it.

## Testing structure

You can test IA before any visual design exists, with two cheap methods.

**Card sorting** shows how people group things. Put each piece of content or feature on a card and ask participants to sort the cards into groups that make sense to them. In an open sort they also name the groups, which gives you their vocabulary. In a closed sort they place cards into categories you provide.

**Tree testing** checks whether people can find things in a proposed hierarchy. Participants see only a text version of the menu tree and are asked to find specific things, such as where they'd change their billing address. You see where they go first and where they get lost. With no visual design in the way, a failure points straight at the structure or the labels.

Use them in that order: card sort to generate a structure, tree test to check it, then design the screens.

> **Try it now:** Open a large shop's website and try to find a specific item, such as a cast-iron frying pan, without using search. Note each label you considered and why you picked one over the others. You're following information scent.

## The myth of seven items

You may have heard that menus should have no more than seven items because of Miller's law. George Miller's 1956 paper, "The Magical Number Seven, Plus or Minus Two", was about how much people can hold in short-term memory, and later research puts working memory nearer four chunks. Navigation doesn't need memorising, though. It stays on screen, so people recognise options instead of recalling them.

What matters is how quickly people can scan and choose. Studies of menu design have generally found that broad, shallow hierarchies beat deep, narrow ones, provided the items are clearly labelled and grouped. Every extra level is another decision and another chance to take a wrong turn. Prefer fewer levels and clear labels, and group long lists visually, which is the subject of lesson 6.

## Using this with your AI tools

AI tools build navigation from whatever you describe, so describe the structure explicitly. Give them your top-level groups, what goes in each and the exact labels. If you've run a card sort, paste in the groups and the names participants used.

When you review generated navigation, read every label out of context and ask what you'd expect behind it. Check that one thing isn't called two names on different screens, a common slip when screens are generated separately ("Clients" in the sidebar, "Customers" on the dashboard). Check depth too. Anything important that sits more than two or three levels down needs a shortcut or a rethink.

You can also use AI to prepare tests, drafting the card list or the tree test tasks. Running them still needs real people.

> **Prompt:** Use this navigation exactly: Invoices, Clients, Payments, Reports, Settings. Use the same names on every screen, and call the people we bill "clients" everywhere, never "customers".
`,
  takeaways: [
    "Information architecture is the structure under every screen: what exists, how it's grouped and what it's called.",
    "Organise by how users think about the content, never by your org chart or your database.",
    "A good label lets people predict what's behind it before they click.",
    "Card sort to find a structure, tree test to check it, then design the screens.",
    "Navigation stays on screen, so clear labels and a shallow structure matter more than a strict item count.",
  ],
  check: [
    {
      q: "A startup's site navigation reads Solutions, Platform, Resources, Company. A visitor wants to know what it costs. What's the core problem?",
      options: [
        "There are too many top-level items",
        "Weak information scent: none of the labels predicts where pricing lives",
        "The menu should be hidden behind a hamburger icon",
        "The items are in the wrong order",
      ],
      answer: 1,
      why: "Four items is very manageable. The problem is that none of them promises pricing. The item count is tempting because of the 'seven items' idea, but a short menu of vague labels is harder to use than a longer menu of clear ones.",
    },
    {
      q: "You have 40 help articles and no idea how your customers would group them. What should you do first?",
      options: [
        "A tree test of your current categories",
        "An A/B test of two menu layouts",
        "Ask an AI tool to group them by topic",
        "An open card sort with a handful of customers",
      ],
      answer: 3,
      why: "An open card sort shows how customers group the articles and what they call each group. A tree test is tempting because it's also an IA method, but it checks a structure you already have, and you don't yet have one worth checking.",
    },
    {
      q: "A colleague insists the main navigation can have at most seven items, citing Miller's law. What's the best response?",
      options: [
        "Miller studied short-term memory. Navigation stays visible, so clear labels and grouping matter more than a strict count",
        "Agreed, and five would be even safer",
        "Miller's law only applies to mobile apps",
        "Miller's work was disproved, so the number of items doesn't matter",
      ],
      answer: 0,
      why: "Menus are visible, so people recognise options instead of remembering them. A strict cap is tempting because it sounds scientific, but it can force unrelated items together under vague labels. The last option goes too far, because fewer, well-grouped choices are still faster to scan.",
    },
  ],
  practice: [
    {
      type: "sort",
      title: "Exact or ambiguous?",
      intro: "Exact schemes have one right place for each item. Ambiguous schemes need judgement. Sort these real-world examples.",
      buckets: ["Exact scheme", "Ambiguous scheme"],
      items: [
        { text: "Contacts listed A to Z", bucket: 0, why: "Alphabetical order has one right place for every name. It works when you know the name you want." },
        { text: "A bank statement ordered by date", bucket: 0, why: "Chronological order is exact, and dates are how people remember transactions." },
        { text: "A store finder organised by town", bucket: 0, why: "Geographical schemes are exact when people know where they are." },
        { text: "An events page listed by date", bucket: 0, why: "Each event has exactly one date, so there's one right place for it." },
        { text: "A help centre split into Getting started, Billing and Troubleshooting", bucket: 1, why: "Grouping by topic needs judgement, since an article about failed payments could sit under Billing or Troubleshooting." },
        { text: "A website with sections For freelancers and For agencies", bucket: 1, why: "Audience schemes are ambiguous because some visitors fit both groups or neither." },
        { text: "An app menu of Send an invoice, Get paid and File your taxes", bucket: 1, why: "Task-based grouping is ambiguous, but it often matches what people came to do." },
        { text: "A film library grouped by genre", bucket: 1, why: "Genres overlap. A comedy-horror film could sit in either." },
        { text: "A recipe site grouped into breakfast, lunch and dinner", bucket: 1, why: "Plenty of dishes suit more than one meal, so placement is a judgement call." },
      ],
    },
    {
      type: "choice",
      title: "Structure the content",
      intro: "Pick the structure or label decision that best fits how people think.",
      items: [
        {
          prompt: "A clothing shop sells to women, men and children. Most visitors arrive already knowing which group they're shopping for.",
          options: [
            "Top level by audience: Women, Men, Kids",
            "Top level alphabetical by brand",
            "Top level by colour",
            "One long list of every product with a sort menu",
          ],
          answer: 0,
          why: "When people arrive with a clear first choice, put that choice at the top. Brand is tempting because it's exact, but most shoppers don't start from a brand name.",
        },
        {
          prompt: "In a recipe app, people usually start from what's in the fridge, how much time they have and any dietary needs, in no fixed order.",
          options: [
            "A deep hierarchy of Cuisine, then Course, then Dish",
            "Faceted filters for ingredient, cooking time and diet over one collection",
            "An alphabetical index of recipe names",
            "A single list of popular recipes",
          ],
          answer: 1,
          why: "Items that vary in several independent ways, explored in any order, call for facets. The deep hierarchy is tempting because it looks organised, but it forces everyone to start with cuisine.",
        },
        {
          prompt: "Your app's settings page has grown to 60 options in one long list.",
          options: [
            "Split them alphabetically across two tabs",
            "Hide everything behind an 'Advanced' button",
            "Group them into a few clearly labelled sections by what people are trying to do, and add search",
            "Keep one list and make the text smaller so more fits",
          ],
          answer: 2,
          why: "Grouping by intent matches how people think about settings, and search catches the rest. Alphabetical tabs are tempting because the scheme is exact, but nobody knows the exact name of a setting they've never seen.",
        },
        {
          prompt: "Your sidebar has an item called 'Insights' that holds invoices and payment history. Users keep asking where their invoices are.",
          options: [
            "Add an icon to 'Insights'",
            "Add a tooltip explaining what 'Insights' contains",
            "Move 'Insights' to the top of the sidebar",
            "Replace it with 'Invoices' and 'Payments', the words users actually look for",
          ],
          answer: 3,
          why: "The label has no scent for what it contains. A tooltip is tempting because it explains the label, but people scanning a sidebar don't hover over every item, and a label that needs explaining should be renamed.",
        },
        {
          prompt: "A council website's main navigation mirrors its departments: Environment Directorate, Corporate Services, Place and Economy. Residents mostly come to pay council tax or report a missed bin collection.",
          options: [
            "Organise around the tasks residents come to do, such as Pay, Report and Apply",
            "Add each department head's name and photo",
            "Keep the departments but add a large drop-down menu",
            "Rename the departments in plain English and keep the department structure",
          ],
          answer: 0,
          why: "Residents think in tasks and have no idea which department handles bins. Plain-English department names are tempting because they fix the jargon, but they still require people to know your org chart.",
        },
      ],
    },
    {
      type: "order",
      title: "Plan an information architecture",
      intro: "Put these steps for structuring a product's content in order.",
      items: [
        "List all the content and features the product has, or will have",
        "Learn how users talk about this content, from interviews and support emails",
        "Run an open card sort to find natural groups and their names",
        "Draft a hierarchy and labels",
        "Tree test the draft with realistic find-it tasks",
        "Revise the labels and groups where people went wrong, then test again",
        "Design the navigation and screens on top of the structure",
      ],
      why: "Take an inventory first so nothing is forgotten, then learn the users' language and let them group the content. Draft only once you have their groups and words, and tree test before any visual design so that failures point at the structure. Screens come last because they sit on top of it.",
    },
  ],
  journal: "Pick a website or app you use often and write out its top-level navigation. For each item, write what you expect behind it before you click, then check. Note any label whose contents surprised you and suggest a better one.",
  terms: ["information-architecture", "organisation-scheme", "faceted-navigation", "mental-model", "information-scent", "card-sorting", "tree-testing", "millers-law"],
});
