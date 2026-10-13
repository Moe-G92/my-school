L({
  id: "critique",
  part: 7,
  n: 39,
  title: "Critique: giving and getting feedback",
  short: "How to judge a design against its goals, give feedback people can use, and take criticism of your own work well.",
  minutes: { read: 5, watch: 15, practice: 20 },
  body: `
## What critique is for

**Design critique** is a structured conversation about whether a design achieves what it set out to do. Its subject is the work and its goals, which keeps the designer's ego and the reviewer's taste out of the middle.

Adam Connor and Aaron Irizarry, in their book Discussing Design (2015), separate critique from two other kinds of feedback. A reaction is a gut response, such as "I love it" or "it feels busy". It tells you how something landed but not why. Direction jumps straight to a fix, such as "make the button blue", before anyone has agreed what the problem is. Critique links an observation to an objective: "If the goal is sign-ups, the equal weight of these three buttons works against it."

Pixar is the well-known model. Ed Catmull's Creativity, Inc. (2014) describes its Braintrust, a group of experienced filmmakers who give blunt notes on films in progress but have no power to make the director act on them. Because the director decides, honesty is safe on both sides.

## Start with the goals

Critique without **design goals** turns into a contest of preferences. Before anyone comments, the designer should state four things.

- Who the design is for and what they are trying to do.
- What the business needs from it, such as trial sign-ups or fewer support tickets.
- The constraints, such as brand rules, technical limits or a deadline.
- The stage. A rough sketch needs feedback on structure and flow; a polished screen can take comments on spacing and type (lesson 3 covered fidelity).

Connor and Irizarry suggest four questions for every point. What is the objective? Which elements relate to it? Are they effective? Why or why not?

## Describe, interpret, evaluate

A sequence borrowed from art education keeps critique honest by separating what you see from what you think. It is often called **describe, interpret, evaluate**.

1. Describe what is there, neutrally. "There are three buttons of the same size and colour under the headline." Anyone in the room should agree with a description.
2. Interpret what it seems to communicate or how people will probably use it. "It reads as if all three paths matter equally, so first-time visitors must choose before they understand the product."
3. Evaluate it against the goal. "The goal is trial sign-ups, so this works against it. Making 'Start free trial' the only primary button would help."

The order matters. Jumping straight to "this is cluttered" skips the evidence, so people end up defending opinions. When you describe first, disagreements surface as facts ("actually, there are only two buttons on mobile"), which are easy to settle.

> **Try it now:** Open any app on your phone and write three sentences about its main screen: one that describes, one that interprets, and one that evaluates it against what you think its goal is.

## Giving critique people can use

**Actionable feedback** is specific, tied to a goal and possible to act on.

- Point at the evidence. Name the element and what you noticed about it.
- Link it to a goal or a principle from this course, such as hierarchy, contrast, Fitts's law or one of the heuristics. Then the point can be discussed instead of defended.
- Prioritise. Lead with the two or three issues that hurt the goal most, and label polish as polish.
- Ask questions where you are unsure, such as "What should someone do first here?" Questions surface assumptions without attacking anyone.
- Say what works and why, so it survives the next round of changes.
- Describe the problem fully, and offer fixes as options. The designer owns the solution.

> **Common mistake:** AI-generated critiques, and beginners' ones, tend to be either all praise or a long generic checklist like "consider improving contrast", with no priorities and no link to the goal. Ask for the three issues that most hurt the goal, ranked, with evidence for each.

## Receiving critique well

Receiving is harder than giving, because criticism of your work feels like criticism of you.

- Set it up. Share the goals and the stage, and say what kind of feedback you want, such as "I'm testing the flow today; colours come later."
- Listen and take notes. Do not explain or defend in the moment; if a design needs you standing next to it to make sense, that is itself useful feedback.
- Ask clarifying questions, such as "Where did you look first?" or "What did you expect to happen?"
- Separate the problem from the suggested fix. Someone who says "make the button bigger" may be right that it is hard to find and wrong about the cure.
- Decide afterwards. You do not have to act on every note. Look for patterns across people, and weigh opinions against the goals and against what testing shows (lesson 4).
- Thank people. Honest feedback costs effort and some social risk.

> **Rule of thumb:** When several people stumble in the same place, the problem is real, even if each of them suggests a different fix.

## Using this with your AI tools

AI models make useful critics if you give them structure, because left alone they lean agreeable and generic. Give the screenshot and the goal, and ask for the three stages in order. Ask for ranked issues with evidence, for links to named principles, and for facts kept separate from opinions. Tell it to skip praise unless it explains what to keep. The lab-critique coach in this course works the same way.

Treat the result as one reviewer's notes. It cannot watch a real person hesitate, so check its biggest claims against a quick test with real users.

> **Prompt:** Here is my pricing page, and its goal is to get freelancers to start a 14-day trial. First describe what you see, neutrally. Then say how a first-time visitor would probably read it. Then give the three issues that most hurt trial sign-ups, ranked, each with its evidence and one possible fix.
`,
  takeaways: [
    "Critique judges the work against its goals; reactions and direction are useful only once they are tied back to a goal.",
    "State the audience, goal, constraints and stage before anyone comments.",
    "Describe what is there, interpret what it communicates, then evaluate it against the goal, in that order.",
    "Give two or three ranked issues with evidence, and leave the solution to the designer.",
    "When receiving critique, listen without defending, separate the problem from the suggested fix, and decide afterwards.",
  ],
  check: [
    {
      q: "In a review, a colleague says 'The homepage feels cluttered.' Which reply turns this into useful critique?",
      options: [
        "'OK, I'll remove a few sections.'",
        "'Where did you look first, and what were you looking for? Our goal is getting visitors to book a demo.'",
        "'Cluttered is subjective, so I'll leave it.'",
        "'I'll make everything a bit smaller so it breathes.'",
      ],
      answer: 1,
      why: "Asking for the evidence and restating the goal turns a reaction into something you can evaluate. Removing sections straight away feels responsive, but you would be fixing a problem nobody has defined yet.",
    },
    {
      q: "Which comment is critique, as opposed to a reaction or direction?",
      options: [
        "'I love the colours.'",
        "'Make the reorder button green.'",
        "'Something about this feels off.'",
        "'The goal is quick repeat orders, but Reorder sits below three promotions, so returning customers have to scroll past offers to reach it.'",
      ],
      answer: 3,
      why: "It names the goal, points at the evidence and explains the effect. 'Make the button green' sounds actionable, but it is direction: a fix offered before anyone agrees on the problem.",
    },
    {
      q: "You present a checkout redesign. A stakeholder says, 'Put the coupon field at the top in big letters.' What is the best response?",
      options: [
        "Ask what problem they have seen, such as customers struggling to find where to enter a code, and note it to check against the goal and the data",
        "Make the change straight away to keep them happy",
        "Explain why they are wrong about coupon fields",
        "Say nothing and ignore it",
      ],
      answer: 0,
      why: "A suggested fix usually hides a real concern, so dig for the problem before judging the solution. Explaining why they are wrong may be correct on the design, but it skips the concern and makes the next conversation harder.",
    },
  ],
  practice: [
    "lab-critique",
    {
      type: "order",
      title: "Build a critique",
      intro: "You are reviewing a friend's budgeting app. Put these critique statements in the order a good critique runs.",
      items: [
        "Goal: this onboarding screen should get new users to connect their bank account.",
        "Describe: the screen has a long paragraph of text, a bold blue 'Skip for now' link, and a grey 'Connect bank' button beneath it.",
        "Interpret: the bold blue link is the most visible action, so it reads as the expected choice.",
        "Evaluate: against the goal, the hierarchy steers people away from connecting, which is the most serious issue on this screen.",
        "Suggest: one option is to make 'Connect bank' the primary button and turn 'Skip for now' into a quieter link below it.",
      ],
      why: "Agreeing the goal first gives everything else a yardstick. Description establishes facts everyone can check, interpretation explains the likely effect, evaluation judges it against the goal, and only then is a fix offered, as an option.",
    },
    {
      type: "rewrite",
      title: "From vague to useful",
      intro: "A friend runs a dog-walking business. Her booking page's goal is to get new customers to request a first walk. The form asks for seven fields, including the vet's details, and the 'Request a walk' button is the same grey as the body text. Someone gave her this feedback.",
      task: "Rewrite the feedback as a critique she can act on, using describe, interpret and evaluate, and putting the most important issue first.",
      given: "Honestly, it looks a bit boring and the form is weird. Maybe make it pop more?",
      rubric: [
        "States the goal of the page",
        "Describes specific elements neutrally (the number of fields, the button's colour)",
        "Interprets how a new visitor would probably read them",
        "Evaluates against the goal, with the most important issue first, and offers fixes as options",
        "Avoids vague words like 'boring' and 'pop'",
      ],
      model: "Your goal is getting people to request a first walk. The form asks for seven fields, including your vet's details, before anyone has spoken to you. A new visitor would probably read that as a big commitment for a first contact. That is the biggest issue for the goal; asking only for name, phone and postcode, and collecting the rest after the first call, would likely bring more requests. Second, the 'Request a walk' button is the same grey as the body text, so it is easy to miss. Making it the one strong colour on the page would help.",
    },
  ],
  journal: "Ask one person to look at a screen from your product for 30 seconds, then tell you what they think it is for and what they would do first. Write down what they said without defending anything, then note one thing you will change and one you will keep.",
  terms: ["design-critique", "design-goals", "describe-interpret-evaluate", "actionable-feedback"],
});
