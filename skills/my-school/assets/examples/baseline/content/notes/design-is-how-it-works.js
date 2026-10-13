F({
  id: "design-is-how-it-works",
  title: "Design is how it works",
  minutes: 2,
  body: `In 2003 Steve Jobs told a New York Times Magazine writer that most people mistake design for veneer, a finish applied at the end to make a product look good. His own summary was five words long: "Design is how it works." The line has been quoted so often that it has lost its edge, so it helps to look at an example where the edge is obvious.

## A slider that explained itself

When the first iPhone launched in 2007, its lock screen asked you to slide a handle across the bottom of the screen, with an arrow on the handle and a glint moving across the label in the direction you were meant to drag. It looked lovely, and its real achievement was behaviour. A phone with no keyboard, carried in a pocket, needed a way to wake that a stray touch would not trigger. A deliberate sideways drag solved that. The arrow and the moving glint told a first-time user what to do without a manual. The visual design served the behaviour, and the behaviour was the design.

## Behaviour first, surface last

That suggests a useful order of work. Before you think about colour or type, describe what happens. The person does something, the system responds, and the person sees the result and decides what to do next. Write it as a sequence of verbs. Then cover the awkward cases: a slow network, a form abandoned halfway, a button pressed twice, an empty list on first use.

Jesse James Garrett's five planes put the surface, the visual layer, at the top of the stack. It is the last thing decided and the first thing seen, which is why it attracts so much attention. A beautiful surface on a confusing flow is still a confusing flow, and people tend to blame themselves for it.

This trap is easier to fall into when you build with AI tools, because a polished surface now costs almost nothing. A model will produce a handsome screen in seconds. Whether the states exist, whether the error paths go anywhere and whether the button does what its label says are still your questions to answer.

> Before you style a screen, write its behaviour as a list of steps: what the person does, what the system does back, and what happens when something goes wrong. If you cannot write the list, the screen is not ready to style.

Once the list exists, styling it is the easy part.`,
  related: ["what-is-design", "everyday-things", "components"],
});
