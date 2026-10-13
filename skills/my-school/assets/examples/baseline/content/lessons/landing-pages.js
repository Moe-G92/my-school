L({
  id: "landing-pages",
  part: 4,
  n: 27,
  title: "Landing pages that persuade",
  short: "How to structure a landing page around one goal: message, hero, proof, objections and the call to action.",
  minutes: { read: 5, watch: 12, practice: 20 },
  body: `
## One page, one job

A **landing page** is built for one audience and one action. Someone arrives from an ad, an email or a search result with a question in mind, and the page has to answer it and then ask for one thing: start a trial, book a demo, join a waiting list. A home page serves many visitors with many routes. A landing page deliberately removes routes, because every link that is not the goal is an exit.

On paid campaign pages, many teams drop the main navigation and keep the logo, the content and a repeated call to action. A secondary action can stay if it serves the same goal, such as "See how it works" beside "Start free trial".

The page also has to keep the promise that brought people there, which marketers call **message match**. If an ad says "Bookkeeping for UK plumbers, £12 a month" and the page opens with "Your finances, simplified", visitors wonder whether they are in the right place, and many leave.

## The message hierarchy

Visitors decide within seconds whether to stay, so the page should answer their questions in the order they ask them. This is the visual hierarchy of lesson 7, applied to the message.

1. What is this?
2. Is it for me?
3. Why should I care?
4. Why should I believe you?
5. What do I do next?

The first three together are your **value proposition**: what it is, who it is for and the outcome it gives, in a sentence or two. The fourth is proof, and the fifth is the call to action.

A quick way to check the top of the page is a **five-second test**. Show someone the hero for five seconds, hide it, and ask what the product does and who it is for. If they cannot tell you, the hero is not doing its job, however good it looks.

## The hero

Everyone sees the hero, so it carries most of the persuasion.

- **Headline.** Say what it is or the outcome, in plain words. "Invoicing for freelance designers" tells people far more than "Get paid, beautifully".
- **Subheadline.** Say who it is for and how it works, in one sentence.
- **Primary action.** One button, visually dominant, so it stands out the way the Von Restorff effect from lesson 22 predicts.
- **Visual.** Show the real product or the real outcome. A clear screenshot of the app beats an abstract illustration or a stock photo of a smiling team.
- **Quick proof, if you have it.** A rating, a known customer or a usage figure, as long as it is true.

> **Rule of thumb:** A good call to action finishes the sentence "I want to..." from the visitor's side, as in "Start my free trial" or "Get my quote".

## Proof and objections

People believe evidence more than claims. **Social proof** works because people look to others when they are unsure. Specific beats vague: a testimonial with a full name, photo, role and a concrete result ("We cut month-end from four days to one") does far more than an anonymous "Great product". Customer logos, independent reviews, case studies and a short demo video all count, and all must be real. Place proof near the claim it supports and near the button, where doubt peaks.

Then deal with **objections**. List every reason a reasonable person would hesitate, such as price, setup time, switching from their current tool, data security and commitment. Answer each where it comes up: "No card needed" under a trial button, an import option next to the switching worry, clear terms in the pricing section, an FAQ for the rest.

How long the page should be depends on the decision. A free, low-risk product can win people in one screen. An expensive or risky purchase needs more proof and more answers, so the page grows.

> **Common mistake:** AI-generated landing pages invent proof: "Trusted by 10,000+ teams", placeholder logos, testimonials from people who do not exist. Delete anything that is not true. Beyond the damage to trust, UK consumer law explicitly bans fake reviews.

## Calls to action

A **call to action** (CTA) is the button or link that asks for the goal. Say what happens and what people get: "Start free trial", "Get my quote", "Book a 20-minute demo". "Submit", "Learn more" and "Click here" say nothing about the outcome. Some teams find first-person wording ("Get my quote") performs better, which is worth testing with your own audience.

Put reassurance right beside the button, such as "No card needed. Cancel any time.", provided it is true. On a long page, repeat the same CTA with identical wording after each major section, so the action is close whenever someone is convinced. Keep one primary style for it; anything secondary should look secondary.

## Using this with your AI tools

Give the tool the strategy before the layout: the audience, where they arrive from, the one action, their main objections and the real proof you have. Without that, it fills the page with generic sections and invented praise. Ask for sections in a persuasion order (hero, proof, problem and outcome, how it works, testimonials, pricing, FAQ, final CTA).

Then review it as a sceptical visitor. Read only the hero and check you could say what the product is and who it is for. Remove any invented numbers, placeholder logos and made-up names. Count the links that lead away from the goal, and tick off each objection on your list against an answer on the page.

> **Prompt:** Write a landing page for a bookkeeping app aimed at UK sole traders arriving from a search for "self assessment software"; one goal, "Start free trial"; use only the proof I paste below; answer worries about price, setup time and data security; repeat the same CTA after every second section.
`,
  takeaways: [
    "One audience and one action per page; every other link is an exit.",
    "The headline should keep the promise of the link that brought people there.",
    "Answer in order: what it is, who it's for, why it matters, why believe it, what to do next.",
    "Use real, specific proof, placed near the claims and near the button.",
    "Write CTAs that finish 'I want to...', and repeat the same one down the page.",
  ],
  check: [
    {
      q: "An ad reads 'Bookkeeping for UK plumbers, £12 a month'. The landing page headline is 'Your finances, simplified'. Most visitors leave within seconds. What is the most likely cause?",
      options: [
        "The page has too few images",
        "The headline breaks message match, so visitors doubt they are in the right place",
        "The button colour is wrong",
        "The page is too short",
      ],
      answer: 1,
      why: "People arrive expecting the ad's promise: plumbers, bookkeeping, £12. A generic headline makes them wonder whether they clicked the wrong link. Page length is tempting to blame, but people leaving within seconds have not read far enough for length to matter.",
    },
    {
      q: "A landing page asks visitors to request a price for kitchen fitting. Which button label is best?",
      options: ["Submit", "Learn more", "Continue", "Get my free quote"],
      answer: 3,
      why: "It says what happens and what the visitor gets, and it finishes 'I want to...'. 'Continue' is tempting because it feels gentle, but it hides what the click commits them to.",
    },
    {
      q: "Which product most needs a long landing page with detailed proof, objection handling and an FAQ?",
      options: [
        "Payroll software at £30,000 a year for companies with 500 staff",
        "A free browser extension that hides cookie banners",
        "A £3 recipe e-book",
      ],
      answer: 0,
      why: "Page length follows how much convincing the decision needs. An expensive, risky, multi-person purchase raises many objections. The free extension is tempting to pad out with content, but it needs little more than a clear hero and a button.",
    },
  ],
  practice: [
    "lab-landing",
    {
      type: "choice",
      title: "Landing page decisions",
      intro: "Pick what a careful designer would do in each situation.",
      items: [
        {
          prompt: "A paid search ad says 'Dog walkers in Leeds, from £12 a walk'. Which headline should the landing page use?",
          options: ["'Happy dogs, happy owners'", "'Trusted dog walkers in Leeds, from £12 a walk'", "'Welcome to PawPals'"],
          answer: 1,
          why: "It repeats the ad's promise, so visitors know at once they are in the right place. The other two are pleasant but make people work out whether this is what they clicked.",
        },
        {
          prompt: "A 'Book a demo' landing page keeps the full site navigation of nine links and a blog sidebar.",
          options: ["Keep them, because people like to explore", "Add a newsletter sign-up as a second goal", "Remove the navigation and sidebar, keeping the logo, the content and a repeated 'Book a demo'"],
          answer: 2,
          why: "Each extra link is a way out of the one action the page exists for. A newsletter sign-up adds a competing goal.",
        },
        {
          prompt: "Which testimonial will do the most for a finance tool's landing page?",
          options: ["'Great product, highly recommend.' (anonymous)", "'Five stars.' (J.)", "'We cut month-end from four days to one.' Priya Shah, finance lead, with her photo"],
          answer: 2,
          why: "A named person with a role and a specific, believable result is evidence. Vague praise without a name reads as filler, or worse, as fake.",
        },
        {
          prompt: "Interviews show people hesitate at 'Start free trial' because they fear being charged automatically. The trial genuinely needs no card.",
          options: ["Put 'No card needed' directly under the button", "Make the button larger", "Add a countdown timer to create urgency"],
          answer: 0,
          why: "It answers the exact objection at the moment of doubt. A bigger button does not address the fear, and a fake timer adds pressure while costing trust.",
        },
        {
          prompt: "The same sign-up action appears as 'Start trial', 'Get started', 'Try it free' and 'Sign up' in different sections.",
          options: ["Fine, variety keeps the page fresh", "Use one wording everywhere so people know it is the same action", "Remove every button except the one in the hero"],
          answer: 1,
          why: "Different labels suggest different actions and make people stop to wonder. Repeating the CTA is good; changing its words is not.",
        },
      ],
    },
    {
      type: "rewrite",
      title: "Rewrite a vague hero",
      intro: "Turn a generic hero into one that passes the five-second test.",
      task: "Rewrite the headline, subheadline, button and the line under the button for a bookkeeping app for UK sole traders. It connects to your bank, sorts transactions into tax categories and prepares your Self Assessment figures. The 30-day trial needs no card.",
      given: "Headline: Finance, reimagined. Subheadline: The all-in-one platform that empowers you to take control. Button: Learn more",
      rubric: [
        "The headline says what it is or the outcome, in plain words",
        "The subheadline names the audience and how it works",
        "The button names the action and what they get",
        "The line under the button removes a real worry using only the facts given",
      ],
      model: "Headline: Bookkeeping for UK sole traders, done as you go. Subheadline: Connect your bank and every transaction is sorted into tax categories, ready for your Self Assessment. Button: Start free trial. Under the button: 30 days free. No card needed.",
    },
  ],
  journal: "Click through from an ad you see today and study the landing page. Write down how it answers each of the five questions (what, who, why care, why believe, what next) and which one it answers worst.",
  terms: ["landing-page", "message-match", "value-proposition", "five-second-test", "social-proof", "objection-handling", "call-to-action"],
});
