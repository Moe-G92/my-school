L({
  id: "ai-interfaces",
  part: 6,
  n: 36,
  title: "Designing AI and chat interfaces",
  short: "How to design AI features people can steer, check and correct, from the input box to sources, errors and undo.",
  minutes: { read: 5, watch: 15, practice: 20 },
  body: `
## Helping people ask

Most software is deterministic, so the same input always gives the same output. A language model gives different answers to the same question and can be wrong while sounding completely sure.

Don Norman described two gaps every interface must bridge: knowing what you can do, and knowing what happened. AI widens both. An empty text box hides what the system can do, and a fluent paragraph hides whether it is right. So an AI interface has two extra jobs. It has to help people ask well, and help them judge and fix what comes back. The asking comes first.

A blank box with "How can I help?" invites anything and suggests nothing. People do not know the system's abilities or limits, so they type something vague and get something vague back.

**Suggested prompts** fix the blank page. These are starter chips based on the context, such as "Summarise this note" and "Turn this into a to-do list" inside a notes app. They show what the system is good at, in the person's own material, and one tap gets a useful result.

Set expectations around the box as well. Say what the assistant can see (this document, your whole workspace, the web) and what it cannot do. ChatGPT keeps a one-line reminder under its input that it can make mistakes, which is small but honest.

Chat is also only one way in. Gmail's Smart Compose offers the rest of a sentence in grey text as you type. A "Summarise" button above a long thread, or a rewrite option on selected text, often beats a chat panel. Use chat for open-ended questions and buttons for tasks people repeat.

## Waiting, streaming and stopping

AI is slow by interface standards. Answers take seconds and agent tasks can take minutes, far past the Doherty threshold from lesson 22.

**Streaming** shows the answer as it is generated, so the time to the first words matters more than the total time. While it streams, the Send button should become Stop, and stopping should keep whatever was produced. Do not force-scroll to the bottom while someone has scrolled up to read; that fights them.

For long tasks, show real progress in steps, such as "Searching 12 sources", "Reading", "Drafting". Let people leave and come back, or notify them when it is done.

## Sources, uncertainty and errors

A **hallucination** is a confident statement that is false. The interface cannot stop a model from producing one, but it can make claims easy to check. Show sources as numbered citations next to the sentences they support, linking to the exact passage. Perplexity built its product around this pattern. When answering from someone's own files, link to the document and highlight the passage.

Express uncertainty in words where it matters, such as "I couldn't find the 2024 figure, so this uses 2023". Avoid fake precision like "92% confident" unless the number is genuinely calibrated.

Treat failures as two different things:

- System errors, such as a dropped connection or a timeout. Say what happened, keep the person's prompt and any partial answer, and offer Retry. Losing what someone typed is the worst AI error of all.
- Refusals, where the model will not do something. Say plainly what it cannot do and offer the nearest thing it can, without lecturing.

> **Try it now:** Ask an AI assistant a question you already know the answer to in detail. Click its sources, if it shows any, and check whether they actually say what the answer claims.

## Editing, regenerating and staying in control

People rarely get the right result on the first try, so make iteration cheap. Let them edit their last message and re-run it, regenerate a response, and move between versions. Make outputs easy to use: copy, insert into the document, accept part of it.

When AI takes actions in the world, such as sending emails, editing files or spending money, keep a **human in the loop**. Show a plan or a preview before acting, and require confirmation for anything that cannot be undone. Coding assistants show proposed changes as a diff that you accept or reject piece by piece; that pattern works for documents and data too. Then provide undo, ideally with checkpoints to roll back a whole run.

> **Rule of thumb:** The more an action costs to undo, the more the interface should show before it happens. Tagging can be automatic; sending, deleting and paying need a preview and a yes.

> **Common mistake:** AI-built chat features often ship with a bare input, no Stop button, and an error that wipes the prompt. Each one is small, and together they make the product feel careless.

## Generative UI in plain words

**Generative UI** means the AI returns pieces of interface instead of only paragraphs. Ask a travel assistant for flights and it shows flight cards with prices and a Book button, or a chart instead of a table of numbers. The model chooses which component to show and fills it with data.

It works best when the model picks from your own design system's components (lesson 18) instead of inventing layouts on the fly. That keeps results consistent and accessible, because every component was designed and tested in advance. Treat the model's output as data passed into trusted components.

## Using this with your AI tools

You are likely to build AI features with AI tools, so name each piece. Useful vocabulary: "context-aware suggested prompt chips", "stream the response and turn Send into Stop, keeping partial output", "numbered inline citations linking to the source passage", "keep the prompt and partial answer on error with a Retry button", "edit and regenerate with version history", "preview and confirm before irreversible actions", "render results with components from our design system".

Then test the unhappy paths. Kill the network mid-answer, ask something out of scope, scroll up during streaming, and check that a screen reader announces the finished answer politely instead of every word.

> **Prompt:** Add an AI assistant panel to this notes app with three suggested prompts based on the open note, streaming answers with a Stop button, numbered citations that jump to the quoted line, and a preview with Accept and Undo before any change is applied to the note.
`,
  takeaways: [
    "AI interfaces must help people ask well and help them judge and fix what comes back.",
    "Replace the blank box with context-aware suggested prompts, and say what the assistant can and cannot do.",
    "Stream answers, turn Send into Stop, and never lose the person's prompt or a partial answer on error.",
    "Make claims checkable with sources linked to the exact passage, and state uncertainty in words.",
    "The harder an action is to undo, the more the interface should preview and ask before acting.",
  ],
  check: [
    {
      q: "Your notes app adds an AI assistant. In testing, people stare at the empty chat box and type 'hi'. What is the best first fix?",
      options: [
        "A longer welcome message listing everything the assistant can do",
        "A larger input box with a friendlier placeholder",
        "Three or four suggested prompts based on the open note, such as 'Summarise this note'",
        "A tutorial video shown before first use",
      ],
      answer: 2,
      why: "Suggested prompts show capability in the person's own material and give a useful result in one tap. A long welcome message seems helpful, but people skim it, and it still leaves them to translate abilities into a request.",
    },
    {
      q: "An AI agent in your CRM can email customers on the user's behalf. Which design is safest while staying useful?",
      options: [
        "Show a draft with recipients that the person can edit, send on confirmation, and allow undo for a few seconds",
        "Send automatically and show a log of sent emails",
        "Ask 'Are you sure?' without showing the email",
        "Remove the feature, because AI should never send emails",
      ],
      answer: 0,
      why: "Sending is hard to undo, so a preview and a clear yes are worth the extra tap. 'Are you sure?' looks like a safeguard, but without the content people cannot judge, so they click yes by habit.",
    },
    {
      q: "Halfway through a long answer, the network drops. The app clears the screen and shows 'Error'. What is better?",
      options: [
        "Retry silently in the background until it works",
        "Show a toast saying 'Something went wrong'",
        "Hide the error and leave the partial answer as if it were complete",
        "Keep the partial answer and the prompt, say the connection dropped, and offer Retry",
      ],
      answer: 3,
      why: "People should never lose their input or what has already arrived, and they need to know the answer is incomplete. Silent retrying feels kind, but it leaves people staring at a stalled screen with no idea what is happening.",
    },
  ],
  practice: [
    {
      type: "choice",
      title: "AI moments",
      intro: "Each scenario is a moment in a real kind of AI product. Pick the best design.",
      items: [
        {
          prompt: "A research assistant answers a question about medication doses with a confident paragraph and no sources.",
          options: ["Add a confidence percentage at the end", "Show numbered citations linked to the exact passages, and say where sources disagree", "Add a disclaimer in small print at the bottom"],
          answer: 1,
          why: "Traceable claims let people verify what matters. An uncalibrated percentage looks precise without being meaningful, and a footer disclaimer does nothing to help checking.",
        },
        {
          prompt: "A bank's assistant is asked to close a joint account, which it cannot do.",
          options: ["'I can't help with that.'", "A paragraph explaining the bank's policies on joint accounts", "'I can't close joint accounts here, because both holders need to agree. I can book a call with the joint accounts team or show you the form.'"],
          answer: 2,
          why: "A good refusal is plain, gives a short reason and offers the nearest useful action. The bare refusal is a dead end, and the policy paragraph is a lecture.",
        },
        {
          prompt: "A writing assistant offers to tighten a 2,000-word document.",
          options: ["Show the changes as a diff that can be accepted or rejected piece by piece, with undo", "Replace the text and remind people about version history", "Ask for confirmation before showing any changes"],
          answer: 0,
          why: "Reviewing a diff keeps the person in control of their own words. Replacing everything forces them to hunt for what changed, and confirming blind tells them nothing.",
        },
        {
          prompt: "An image generator takes about 40 seconds per image.",
          options: ["A spinner in the middle of the screen", "Show the stages and an early preview as the image forms, and let people keep working with a notice when it is done", "A progress bar that jumps to 99% and waits"],
          answer: 1,
          why: "Honest progress and the freedom to do something else make a long wait acceptable. A fake progress bar trains people to distrust every bar you show them.",
        },
        {
          prompt: "In a spreadsheet tool, most people want AI help to clean up inconsistent date formats.",
          options: ["A 'Fix dates' action on the selected column that previews the changes before applying them", "A general chat panel where people describe what they want", "A help article on writing good prompts"],
          answer: 0,
          why: "For a frequent, well-defined task, a button with a preview beats asking everyone to write the same prompt. Chat is best kept for open-ended requests.",
        },
      ],
    },
    {
      type: "sort",
      title: "How much autonomy",
      intro: "An AI assistant is built into a small business's tools. Decide how much it should do on its own for each task.",
      buckets: ["Act, then report (easy to undo)", "Draft, then wait for approval", "Suggest only"],
      items: [
        { text: "Tagging incoming support tickets by topic", bucket: 0, why: "Low stakes and easy to correct. Showing the tags afterwards is enough." },
        { text: "Filing newsletters into a 'Read later' folder", bucket: 0, why: "Harmless and reversible, and asking each time would defeat the point." },
        { text: "Replying to an angry customer email", bucket: 1, why: "Tone matters and a sent email cannot be unsent, so a human should review the draft." },
        { text: "Deleting 300 files it believes are duplicates", bucket: 1, why: "Show the list first. A wrong guess here destroys work." },
        { text: "Moving £2,000 between the owner's accounts", bucket: 1, why: "Money needs a preview with the amounts and an explicit confirmation every time." },
        { text: "Pointing out that a contract clause conflicts with company policy", bucket: 2, why: "Judgement stays with the person; the AI's job is to flag it with the reason." },
        { text: "Recommending a different chart type on a sales dashboard", bucket: 2, why: "A design choice the owner should make, so a suggestion with a preview fits." },
        { text: "Noting a likely error in a spreadsheet formula", bucket: 2, why: "The formula might be intentional. Flag it and let the person decide." },
      ],
    },
    {
      type: "rewrite",
      title: "A refusal that still helps",
      intro: "A travel assistant can search and compare flights but cannot book them. A user asks it to book a flight to Lisbon on Friday.",
      task: "Rewrite the assistant's reply so it is honest about the limit and still moves the person forward.",
      given: "I'm sorry, but I'm unable to assist with that request.",
      rubric: [
        "Says plainly what it cannot do, in one short sentence",
        "Offers the closest thing it can do, with a concrete next step",
        "Ends with a simple question or action the person can take straight away",
        "No apologetic padding, no lecturing, under about 40 words",
      ],
      model: "I can't book flights myself. I can compare Friday's flights to Lisbon and open the airline's booking page with your dates filled in. Want me to do that?",
    },
  ],
  journal: "Use two AI products today: a chat assistant and an AI feature inside another app. Write down how each told you what it could do, how it showed where its answers came from, and what happened when you stopped, edited or retried a response.",
  terms: ["suggested-prompt", "streaming-response", "hallucination", "source-citation", "human-in-the-loop", "generative-ui"],
});
