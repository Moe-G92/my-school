F({
  id: "what-the-tool-cant-decide",
  title: "What the tool can't decide",
  minutes: 2,
  body: `AI coding tools can now turn a sentence into a working, good-looking interface. That moves where design effort goes. Layout, component code and a passable colour scheme cost almost nothing. The decisions that remain are the ones a tool cannot make for you, because the information they depend on lives in your head and in your users' lives, and nowhere in the prompt.

## Goals

A tool can build a pricing page. It cannot know whether the page exists to win sign-ups, to put off customers who are a poor fit, or to reassure existing customers before renewal. Each goal produces a different page. Without one, the tool builds the most common pricing page it has seen, with three tiers and a "Most popular" badge, even if you sell exactly one plan.

## Priorities

Every screen has one thing that matters most. A tool can make anything prominent, but it cannot tell which thing deserves it, so it tends to give everything similar weight. Deciding that the price outranks the feature list, or that search outranks the promotional banner, is a judgement about your users. It is the heart of visual hierarchy, and it is yours to make.

## Tone

Tone depends on who is reading and what has just happened to them. A tool writing an error message does not know that your users are nurses at the end of a night shift, or a shop owner who has just missed a supplier payment. It will write something cheerful and generic. You know who is on the other side of the screen.

## What to leave out

This is the hardest one. Tools lean toward adding, because more output looks like more help. Ask for a dashboard and you get a dozen charts. Ask for onboarding and you get five screens of tips. Deciding which feature to cut and which section nobody needs requires knowing what the product is for and who it serves. Dieter Rams spent a career on that decision, and no model can make it on your behalf.

> Before you prompt, write five lines: who this is for, what they are trying to do, the one thing this screen must make obvious, the tone, and what to leave out. Paste the lines into the prompt, then check the result against them.

The tool will still do most of the typing. Those five lines are the design.`,
  related: ["taste", "process", "ai-interfaces"],
});
