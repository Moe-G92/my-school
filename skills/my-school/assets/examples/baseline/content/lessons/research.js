L({
  id: "research",
  part: 1,
  n: 4,
  title: "Understanding people",
  short: "How to find out what people actually need and do, using interviews, observation and small usability tests.",
  minutes: { read: 5, watch: 15, practice: 15 },
  body: `
## You are not your user

You know your product too well to see it clearly. You know what every icon means because you chose it, and you never wonder where the export button is because you put it there. Every builder carries a picture of how people will use the product, and that picture is usually wrong in ways you can't detect from the inside.

**User research** replaces those assumptions with evidence about real people: what they're trying to do, how they do it now, and where your product helps or gets in the way. It's the discover phase of the Double Diamond from lesson 3, and the testing loop of the deliver phase.

## What people say and what they do

Research methods sort along a few useful axes.

- **Attitudinal or behavioural.** Surveys and interviews tell you what people say they think and do. Analytics, usability tests and observation show you what they actually do.
- **Qualitative or quantitative.** Qualitative research, such as a handful of interviews, tells you why and how. Quantitative research, such as analytics or A/B tests, tells you how many and how much.
- **Generative or evaluative.** **Generative research** explores needs before you have a solution. **Evaluative research** tests a solution you already have.

People are poor predictors of their own behaviour. They'll say they'd definitely use a feature and then never touch it. The "faster horses" line is usually credited to Henry Ford, though there's no evidence he said it, and its useful core is narrower than "ignore customers". Listen closely to the problems people describe, and be sceptical of the solutions they propose.

When words and behaviour disagree, trust behaviour. Better still, combine methods, so numbers show where a problem is and conversations tell you why.

> **Rule of thumb:** Ask about the last time something happened, never about what someone would do in future. The past is a fact they can recall. The future is a guess they'll shape to please you.

## Interviews that find the truth

A good research interview sounds like a curious conversation. Rob Fitzpatrick's book The Mom Test (2013) is built on the idea of asking questions that even your mum couldn't lie to you about, however kind she wanted to be. Talk about their life and their problems, and leave your idea out of it.

A few habits make the biggest difference.

- Ask for a specific instance. "Tell me about the last invoice that got paid late" produces real details, where "How do you feel about late payments?" produces opinions.
- Ask what happened next, and get comfortable with silence. People fill pauses with the interesting parts.
- Avoid **leading questions**, which signal the answer you want. "Wouldn't automatic reminders help?" invites a polite yes. "What do you do when an invoice is late?" invites the truth.
- Look for money and time already spent. Someone who built a spreadsheet to track late payments has a real problem. Someone who calls it "a bit annoying" may not.

## Watching people use your product

**Usability testing** means giving someone a realistic task ("You've just finished a job. Send your client an invoice for £350") and watching them attempt it. Ask them to **think aloud**, narrating what they're looking for and what they expect to happen. Then stay quiet. Resisting the urge to help is the hardest part, because their struggle is your data.

You don't need a lab. A video call with screen sharing works. As lesson 3 noted, about five people per round will surface most of the serious problems, provided they're the kind of people who would really use the product. Your co-founder doesn't count.

Record what people do, where they hesitate and what surprises them. Write observations first and interpretations later. "Clicked Clients while looking for invoices" is evidence. "Confused by navigation" is a conclusion to reach once you've seen the pattern across several sessions.

> **Try it now:** Ask someone nearby to change a specific setting in an app on their phone, such as turning off one type of notification, while you watch without helping. Note every pause. Two minutes of this teaches more than an hour of guessing.

## Turning notes into decisions

Raw notes become useful through **synthesis**. Put each observation on its own sticky note, physical or digital, then group the notes by similarity and name each group. This is affinity mapping. A pattern across several people is a finding. A single vivid quote is a lead worth following up.

Then express what you learned in a form the team can design against.

- A **job story** frames a need as a situation, a motivation and an outcome: "When a client hasn't paid after two weeks, I want to remind them without sounding rude, so I get paid and keep the relationship."
- A **persona** is a portrait of a type of user. Alan Cooper introduced personas in The Inmates Are Running the Asylum (1999). A persona is only as good as the research behind it, and one invented from demographics and a stock photo describes nobody.

> **Common mistake:** Asking "Would you use an app that does this?" The answer is almost always yes, and it predicts nothing. Ask what they did the last time they faced the problem, and what it cost them.

## Using this with your AI tools

AI is useful around research and no replacement for it. It can draft an interview guide, flag leading questions in your draft, sort transcripts into a first pass of themes and suggest tasks for a usability test. Check all of that against the raw notes.

Be wary of "synthetic users", where a model role-plays your customers. It produces plausible, average answers drawn from its training data. The surprises from your real users, the details that change a design, are exactly what an average leaves out.

When you prompt for a feature, paste in the actual research: quotes, observed problems and the job story. Then check the output against them. If the design solves a problem nobody in your notes had, ask why it's there.

> **Prompt:** Here are notes from five usability sessions. Group the observations into themes, count how many participants showed each one and quote the evidence. Don't propose solutions yet.
`,
  takeaways: [
    "You know your product too well to see it as a newcomer does, so get evidence from real people.",
    "When what people say and what they do disagree, trust what they do.",
    "In interviews, ask about the last time something happened, and leave your idea out of it.",
    "In usability tests, give a realistic task, ask people to think aloud and don't help.",
    "A pattern across several people is a finding; a single vivid quote is a lead.",
  ],
  check: [
    {
      q: "You're exploring an idea for a bill-splitting app. Which interview question is most likely to give you reliable information?",
      options: [
        "Would you use an app that splits bills automatically?",
        "How much would you pay for a bill-splitting app?",
        "Tell me about the last time you split a bill with friends. What happened?",
        "Don't you find splitting bills awkward?",
      ],
      answer: 2,
      why: "A specific past event produces real details you can design from. The 'would you use' question is tempting because it's direct, but people answer it politely and their prediction says little about what they'll actually do.",
    },
    {
      q: "In a survey, most respondents say they want a dark mode. You ship one, with the toggle at the top of the settings menu, and very few people turn it on. What's the most likely explanation?",
      options: [
        "What people say they want and what they actually do often differ",
        "The survey sample was too small",
        "The dark theme's colours were badly chosen",
        "People couldn't find the setting",
      ],
      answer: 0,
      why: "A survey captures stated preference, and behaviour is the better guide. 'Sample too small' is tempting because it sounds statistical, but a bigger survey would only collect more of the same stated preference.",
    },
    {
      q: "You don't yet know why freelancers give up on invoicing tools. Which research method fits first?",
      options: [
        "An A/B test of two pricing pages",
        "A survey asking people to rate features from 1 to 5",
        "A usability test of your current invoice form",
        "Interviews with freelancers who stopped using an invoicing tool, about what happened",
      ],
      answer: 3,
      why: "This is a generative question, because you have no solution to test yet. The A/B test is tempting because it's precise, but it can only compare options you already have and can't tell you why people leave.",
    },
  ],
  practice: [
    {
      type: "rewrite",
      title: "Fix the leading questions",
      intro: "These interview questions would get you polite, useless answers. Rewrite them.",
      task: "Rewrite the four questions so they are open, neutral and about real past or current behaviour. Replace a question entirely if it can't be saved.",
      given: "1. Wouldn't it be great to get automatic reminders for unpaid invoices? 2. How much would you pay for an app that did this? 3. Do you find invoicing frustrating? 4. Would you use the app more if it had a dark mode?",
      rubric: [
        "Each question asks about a specific past event or current behaviour",
        "Questions are open, with no simple yes or no answer",
        "No question mentions or pitches the product idea",
        "Wording is neutral, with no implied right answer",
      ],
      model: "1. Tell me about the last time a client paid you late. What did you do? 2. What do you use today to keep track of who owes you money, and what does that cost you in money or time? 3. Walk me through how you sent your most recent invoice, from start to finish. 4. (Dropped the dark mode question.) Where and when do you usually do your invoicing?",
    },
    {
      type: "sort",
      title: "Say or do?",
      intro: "Sort each research source by whether it mainly captures what people say or what they actually do.",
      buckets: ["What people say", "What people do"],
      items: [
        { text: "A survey about which features people value", bucket: 0, why: "Ratings and preferences are self-reported attitudes." },
        { text: "An interview about how someone plans their week", bucket: 0, why: "Even when people describe past behaviour, an interview is self-report. Asking about specific recent events makes it more reliable." },
        { text: "App store reviews", bucket: 0, why: "Reviews are opinions, written by a self-selected group who felt strongly." },
        { text: "A group discussion comparing three logo options", bucket: 0, why: "Group discussions capture opinions, and people's views drift towards whoever speaks first or loudest." },
        { text: "Analytics showing where people drop out of sign-up", bucket: 1, why: "Analytics record actual behaviour, though they can't tell you why it happened." },
        { text: "A usability test where people try to send an invoice", bucket: 1, why: "You watch what people do with a real task." },
        { text: "An A/B test of two checkout layouts", bucket: 1, why: "It measures what people actually do when shown each version." },
        { text: "Session recordings of people using the search page", bucket: 1, why: "Recordings show real clicks, scrolls and hesitations." },
        { text: "Watching a nurse use a ward system during a shift", bucket: 1, why: "Observation in context shows behaviour, including the workarounds people forget to mention." },
      ],
    },
    {
      type: "choice",
      title: "Pick the method",
      intro: "Choose the research method that best fits each question.",
      items: [
        {
          prompt: "Most people who open your invoice editor leave without sending anything. Your analytics can't tell you why.",
          options: [
            "Send a larger survey",
            "Watch five people try to send an invoice while thinking aloud",
            "A/B test a new button colour",
            "Add more analytics events",
          ],
          answer: 1,
          why: "Analytics told you where. Watching people tells you why. A/B testing a colour is tempting because it's easy to set up, but it guesses at a cause you haven't found yet.",
        },
        {
          prompt: "You have two candidate headlines for your pricing page and thousands of visitors a week.",
          options: [
            "Five interviews about pricing",
            "A week-long diary study",
            "A card sort",
            "An A/B test that shows each headline to half of visitors",
          ],
          answer: 3,
          why: "With two finished options and plenty of traffic, an A/B test measures real behaviour at scale. Interviews are tempting because they feel deeper, but people are poor at predicting which headline would make them act.",
        },
        {
          prompt: "You want to understand how small cafe owners manage stock across a whole week, including the busy moments when they're nowhere near a laptop.",
          options: [
            "A diary study where owners log a few notes and photos each day for a week",
            "A one-hour usability test",
            "An A/B test",
            "A one-question survey",
          ],
          answer: 0,
          why: "A diary study captures behaviour spread over days, in context. A usability test is tempting because it's familiar, but it shows one sitting and needs a design to test.",
        },
        {
          prompt: "You want to know roughly how many of your 4,000 users invoice in more than one currency.",
          options: [
            "Two in-depth interviews",
            "A query on your own data, or a short survey if the data doesn't exist",
            "A usability test",
            "A group discussion",
          ],
          answer: 1,
          why: "'How many' is a quantitative question, so you need numbers across the whole user base. Interviews are tempting because they're rich, but two people can't tell you a proportion.",
        },
        {
          prompt: "Before designing anything, you want to see how bookkeepers actually handle the receipts their clients send them.",
          options: [
            "A survey about receipt handling",
            "An A/B test",
            "Visit a few bookkeepers and watch them work, asking questions as they go",
            "A first-click test on your prototype",
          ],
          answer: 2,
          why: "Watching people in their own setting reveals workarounds they wouldn't think to mention. A survey is tempting because it reaches more people, but it only records what they remember and choose to tell you.",
        },
      ],
    },
  ],
  journal: "Watch someone (a friend, partner or colleague) use any app for five minutes today without helping. Write down where they hesitated, what they said out loud, and one thing you would never have predicted.",
  terms: ["user-research", "generative-research", "evaluative-research", "usability-testing", "think-aloud", "leading-question", "job-story", "persona"],
});
