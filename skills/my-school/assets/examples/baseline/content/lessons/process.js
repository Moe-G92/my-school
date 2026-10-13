L({
  id: "process",
  part: 1,
  n: 3,
  title: "The design process",
  short: "How designers move from a vague request to a tested solution, and how to pick the right fidelity at each step.",
  minutes: { read: 5, watch: 15, practice: 15 },
  body: `
## Why process exists

The first idea you have for a feature is rarely the best one, and it's the hardest to see past. Once something exists on screen it starts to feel inevitable. A design process is a set of habits for resisting that pull: understand the problem before committing to a solution, and generate options before choosing one.

Process also manages risk. Every product decision is a bet made with incomplete information. Good process swaps expensive bets, like months of building, for cheap ones, like an afternoon of sketching or five conversations. You learn early, while changes still cost little.

## The Double Diamond

In 2005 the UK Design Council published the **Double Diamond**, a simple model of how design work moves. It has four phases across two diamonds.

1. **Discover**: go wide to understand the problem. Talk to people, watch them, read the data.
2. **Define**: narrow down to a clear statement of the problem worth solving.
3. **Develop**: go wide again, exploring many possible solutions.
4. **Deliver**: narrow down by testing, choosing and refining one solution until it ships.

[[fig:fig-double-diamond]]

The shape matters more than the labels. Each diamond opens out with **divergent thinking**, producing options without judging them, and then closes in with **convergent thinking**, choosing between them against criteria. The first diamond is about finding the right problem. The second is about solving it well. Teams most often skip the first, which is how products end up as well-built answers to questions nobody asked.

The drawing looks more linear than real work. Testing in the deliver phase regularly shows that the problem was defined wrongly, and you go back. Treat the diamonds as a map of the kind of thinking you're doing at any moment, and expect to loop.

> **Try it now:** Pick a feature on your roadmap and write the problem it solves in one sentence without naming a solution. "People need a dashboard" names a solution. "Freelancers can't tell which clients owe them money" names a problem.

## Diverge on purpose, converge with criteria

Divergence feels unproductive, which is why people skip it. Make it concrete with limits on time and quantity. Crazy 8s, a technique from the Google Ventures design sprint, has you fold a sheet of paper into eight panels and sketch eight different ideas in eight minutes. The time limit stops you polishing, and by idea five you're past the obvious ones.

Convergence needs criteria decided before you look at the options, or you'll simply pick the one you like. Write down what success means for this problem, such as "a new user sends their first invoice without help". Then judge each option against it, and steal the best parts of the losers.

A **problem statement** gives both halves a shared anchor. A useful one names a specific person, what they need to do, and the insight from research that explains why. "First-time freelancers need to know an invoice was received, because silence makes them chase clients awkwardly" points at a whole range of solutions without choosing one.

## Fidelity: match the model to the question

**Fidelity** is how closely a design artefact resembles the finished product. It runs from a pen sketch, through a grey-box **wireframe** that shows layout and content without visual styling, to a high-fidelity mockup that looks real, to a **prototype** that people can click through or use.

[[fig:fig-fidelity]]

Fidelity has dimensions that move independently: how finished it looks, how real the content is, and how much it responds. A wireframe with real copy is often more useful than a beautiful mockup full of placeholder text.

Choose fidelity by the question you're asking. Low fidelity is fast to change and invites comments on structure, because nobody can argue about colours that aren't there. High fidelity is needed when the question involves feel or trust, such as whether people would enter card details on this page. Show a polished mockup too early and you'll get opinions on the shade of blue when you wanted to know whether the steps make sense.

> **Rule of thumb:** Use the lowest fidelity that can answer your question. If you catch yourself adjusting shadows on a screen whose flow you haven't tested, drop back down.

## Small loops beat big launches

The point of all this is to learn cheaply and often. Jakob Nielsen argued in 2000 that testing with about five users finds most of the usability problems in a design, so three rounds of five teach you more than one round of fifteen. Fix what you found, then test again with new people, because the next problems were hidden behind the first ones.

This cycle of making, testing, learning and changing is **iteration**. Lesson 4 covers how to run the tests themselves.

> **Common mistake:** Going straight to a polished, working build because AI makes it cheap, then treating every later change as a tweak. The first version anchors everyone, including you. Explore the problem and several directions before you commit.

## Using this with your AI tools

AI tools make high fidelity nearly free, which tempts you to skip the wide, exploratory half of both diamonds. Use them to diverge instead. Ask for several structurally different approaches to one problem, say a step-by-step wizard and a single long page, and compare them against criteria you wrote down first.

You can also ask for deliberately low fidelity. Grey boxes, system fonts and real copy make a screen easy to judge on structure alone. Add visual styling once the flow has survived a test.

Put your problem statement in the prompt so the tool works from it too, and ask it to explain how each part of its output serves that problem. Anything it can't justify is a candidate for cutting.

> **Prompt:** Problem: first-time freelancers can't tell whether a client has seen their invoice. Propose three structurally different solutions, each as a grey wireframe with real copy and no colour, and list the trade-offs of each.
`,
  takeaways: [
    "Spend time on the problem before the solution; the first diamond is the one most teams skip.",
    "Diverge without judging, then converge against criteria you wrote down beforehand.",
    "Use the lowest fidelity that can answer the question you're asking right now.",
    "Test with about five people, fix what you find, and test again with new people.",
    "A good problem statement names a person, a need and an insight, and no solution.",
  ],
  check: [
    {
      q: "You've been asked to 'add a dashboard' to your product. Which question belongs in the first diamond?",
      options: [
        "Which chart library should we use?",
        "Should the cards have rounded corners?",
        "What decisions are people trying to make when they'd open it, and how do they make them today?",
        "How many widgets fit on screen without scrolling?",
      ],
      answer: 2,
      why: "The first diamond is about understanding the problem, and the request already names a solution. Asking what decisions people need to make might reveal that a weekly email would serve them better. The chart library question is tempting because it feels like progress, but it assumes the answer.",
    },
    {
      q: "You want to know whether people understand the order of a new three-step onboarding. What should you test with?",
      options: [
        "A clickable grey wireframe with the real wording",
        "A polished high-fidelity mockup in your brand colours",
        "The fully built feature in production",
        "A written description of the three steps",
      ],
      answer: 0,
      why: "The question is about sequence and understanding, which a quick clickable wireframe answers well, and the real wording matters because people follow words. The polished mockup is tempting because it looks finished, but it costs more to change and draws comments about colour.",
    },
    {
      q: "In a usability test with five people, four got stuck at the same step. What's the best next move?",
      options: [
        "Recruit 20 more people to confirm the problem is real",
        "Ship it, since one person got through",
        "Redesign the whole product from scratch",
        "Fix that step and run another small round with new people",
      ],
      answer: 3,
      why: "Four out of five stuck at the same step is a clear signal. Fix it and test again, because new problems often hide behind the first. Recruiting 20 more is tempting because it feels rigorous, but it spends your time re-confirming a problem you already know about.",
    },
  ],
  practice: [
    {
      type: "order",
      title: "One loop through both diamonds",
      intro: "Put these steps for designing a new feature into a sensible order.",
      items: [
        "Talk to people who have the problem and watch how they handle it today",
        "Write a one-sentence problem statement and what success would look like",
        "Sketch many different approaches quickly, without judging them",
        "Choose one or two directions using the success criteria",
        "Build a prototype at the lowest fidelity that can answer your question",
        "Test it with about five people",
        "Refine what you learned, ship it and watch how it's used",
      ],
      why: "The first two steps are the first diamond: discover widely, then define. The next two open and close the second diamond. Prototyping and testing come before polish so that changes are still cheap, and watching real use after shipping feeds the next loop.",
    },
    {
      type: "sort",
      title: "Diverging or converging?",
      intro: "Each activity either opens up options or narrows them down. Sort them.",
      buckets: ["Diverging", "Converging"],
      items: [
        { text: "Sketching eight layouts in eight minutes", bucket: 0, why: "Quantity under time pressure, with no judging, is classic divergence." },
        { text: "Interviewing people who recently cancelled", bucket: 0, why: "Discovery widens your understanding of the problem before you narrow it." },
        { text: "Listing every way people currently solve the problem, including spreadsheets and sticky notes", bucket: 0, why: "Mapping existing workarounds opens up the problem space." },
        { text: "Asking an AI tool for four structurally different onboarding flows", bucket: 0, why: "Generating distinct options is divergence, as long as you ask for different structures and not variations of one." },
        { text: "Brainstorming possible names for a feature with the team", bucket: 0, why: "Producing many candidates before choosing is divergent." },
        { text: "Writing one problem statement from a week of interview notes", bucket: 1, why: "Distilling many observations into one statement is the define phase, which converges." },
        { text: "Choosing two concepts to prototype using your success criteria", bucket: 1, why: "Selecting against criteria is convergence." },
        { text: "Cutting features from the first release", bucket: 1, why: "Narrowing scope is a convergent decision." },
        { text: "Ranking usability problems by how often and how badly they block people", bucket: 1, why: "Prioritising narrows a long list down to what to fix first." },
      ],
    },
    {
      type: "choice",
      title: "Pick the fidelity",
      intro: "Match the artefact to the question being asked.",
      items: [
        {
          prompt: "You and a co-founder disagree about what belongs on your app's home screen. You need to agree on the contents and their order.",
          options: [
            "A rough sketch or grey wireframe you can rearrange in minutes",
            "A polished mockup in your brand style",
            "A coded prototype with real data",
            "A mood board of apps you both like",
          ],
          answer: 0,
          why: "Contents and order are structural questions, and low fidelity keeps the conversation on structure. A coded prototype is tempting because it feels decisive, but it's slow to rearrange and invites arguments about details.",
        },
        {
          prompt: "You want to know whether people would trust your pricing page enough to enter card details.",
          options: [
            "A paper sketch",
            "A grey wireframe",
            "A high-fidelity mockup with real prices, real copy and your brand styling",
            "A list of the plans in a document",
          ],
          answer: 2,
          why: "Trust depends heavily on visual quality and real content, so this question needs high fidelity. A grey wireframe is tempting because it's quicker, but people can't judge trustworthiness from grey boxes.",
        },
        {
          prompt: "You're testing whether a swipe-to-archive gesture feels natural in your mobile app.",
          options: [
            "A static mockup",
            "An interactive prototype running on a real phone",
            "A wireframe printed on paper",
            "A video of you using it",
          ],
          answer: 1,
          why: "Feel comes from interaction, so the prototype has to respond to a real finger on a real device. A video is tempting because it shows the motion, but watching a gesture tells you nothing about how it feels to perform.",
        },
        {
          prompt: "You want to know whether newcomers understand what your product does from the home page text.",
          options: [
            "A polished mockup with placeholder text",
            "A coded page with the final animations",
            "A mood board",
            "A plain page with the real copy and almost no styling",
          ],
          answer: 3,
          why: "The question is about content, so content fidelity has to be high while visual fidelity can stay low. The polished mockup is tempting because it looks closest to the real thing, but placeholder text makes the actual question untestable.",
        },
      ],
    },
  ],
  journal: "Think of the last feature you built with an AI tool. Map what you did onto the Double Diamond: which phases did you spend time in, and which did you skip? Write down one thing you might have learned in a phase you skipped.",
  terms: ["double-diamond", "divergent-thinking", "convergent-thinking", "problem-statement", "fidelity", "wireframe", "prototype", "iteration"],
});
