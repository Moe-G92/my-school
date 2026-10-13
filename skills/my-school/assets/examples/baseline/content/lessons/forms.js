L({
  id: "forms",
  part: 3,
  n: 20,
  title: "Forms people can finish",
  short: "Ask less, label clearly, lay fields out in one column, and validate at the right moment with errors that help.",
  minutes: { read: 5, watch: 12, practice: 20 },
  body: `
## Every field is a cost

Forms are where people hand something over, usually their details or their money. Each field adds effort and one more chance to give up. So the first question about any field is whether you need it at all.

The forms specialist Caroline Jarrett calls this the question protocol: for every question, know who uses the answer and what for. If nobody uses it, delete it. If you need it later, ask later. If you can work it out yourself, such as a town from a postcode or a card brand from its first digits, do not ask.

## Anatomy of a good field

A field has up to five parts: a **label** that says what to enter, optional **hint text** that explains a format or why you are asking, the input itself, an error message when something is wrong, and a marker if the field is optional.

[[fig:fig-form-anatomy]]

Put labels above fields and keep them visible. Top-aligned labels keep the eye moving down one line and survive narrow screens and long translations. Link each label to its input in code, so clicking the label focuses the field and screen readers announce it.

Never use **placeholder** text as the label. It disappears as soon as typing starts, so people forget what the field wanted. It is usually pale grey that fails contrast (lesson 12). And a field showing placeholder text can look as if it is already filled in. Use placeholders, if at all, for short examples.

When most fields are required, mark the few optional ones with "(optional)" and leave the rest unmarked, because a column of asterisks is noise. GOV.UK goes further and asks services to remove optional questions wherever they can.

## One column, in a sensible order

People read a form as a path from top to bottom. Two columns turn that path into a zigzag, and in testing people skip fields or answer them in the wrong order. Keep one column. The exception is short fields read as one unit, like card expiry and security code side by side, as Stripe's checkout does.

Order questions the way people think about them, and group related ones under a short heading (proximity, from lesson 6). Size each input to its expected answer, so a postcode field is about eight characters wide and a street address is wider. The width itself is a hint.

End with one primary button whose label says what happens, like "Create account" or "Pay £42". Leave out Reset and Clear buttons; people press them by accident and lose everything.

> **Rule of thumb:** If a question does not change what you do next, cut it. If it does, ask it as late as you can.

## Help people type less

On a phone, the input type decides the keyboard.

- Use type email for email addresses, which brings up a keyboard with an @ key.
- Use type tel for phone numbers, which brings up the number pad.
- Use a text input with inputmode set to numeric for digits that are not quantities, such as card numbers and one-time codes. Type number is meant for quantities; it adds spinner arrows and can change the value when someone scrolls.
- Add autocomplete values such as email, given-name, postal-code, cc-number and one-time-code, so browsers and password managers can fill fields in one tap.

Keep input text at 16 px or larger, because Safari on iPhone zooms the page when someone taps into a smaller field. Be forgiving about format: accept card numbers with spaces and postcodes with or without the gap, then tidy them yourself. Let people paste, including into password fields; the UK's National Cyber Security Centre advises this because it helps password managers.

For dates people know by heart, like a date of birth, three short fields for day, month and year are quicker than a calendar picker, which is the GOV.UK pattern. Pickers suit dates near today, like booking a table.

## Validation timing and error messages

**Inline validation** checks a field before the form is submitted. Its timing decides whether it helps or nags.

- Do not flag errors while someone is still typing their first attempt. "Invalid email" after one letter is like being corrected mid-word.
- Check a field when the person leaves it.
- Once a field shows an error, re-check as they type, so the message clears the moment the problem is fixed. This pairing is sometimes called "reward early, punish late".
- On submit, check everything. Show an **error summary** at the top that links to each problem, move focus to it, and repeat each message beside its field.
- Keep everything the person entered. A form that clears itself after an error loses people fast.

An error message says what is wrong and how to fix it, in plain words, right by the field. "Enter an email address in the correct format, like name@example.com" is GOV.UK's model; "Invalid input" is the opposite. Pair the red with an icon and text so colour is never the only signal, and connect the message to its field in code so screen readers read it out.

> **Common mistake:** Generated forms often combine three habits: placeholders instead of labels, errors on every keystroke, and a submit button that stays disabled with no explanation (lesson 17). Each one alone costs completions.

## Using this with your AI tools

AI tools build forms that look tidy and behave badly, so describe the behaviour precisely.

> **Prompt:** Build the sign-up form in one column with visible labels above each field, hint text where format matters, and the correct type, inputmode and autocomplete on every input. Validate on blur, re-validate live once a field has an error, and on submit show an error summary that links to each field. Keep all values after an error.

Then fill it in on your own phone. Check that the keyboard changes for email and phone, that autofill works, that nothing zooms, and that errors appear only when you leave a field. Submit it empty, then with one mistake, and read every message aloud. Each should tell you exactly how to fix the problem.
`,
  takeaways: [
    "Ask only what you need now; remove, postpone or work out every other field.",
    "Labels sit above fields and stay visible; placeholders are never labels.",
    "Use one column in a natural order, with inputs sized to their expected answers.",
    "The right type, inputmode and autocomplete give phones the right keyboard and make autofill work.",
    "Validate when people leave a field, clear errors as they fix them, and keep everything they typed.",
  ],
  check: [
    {
      q: "An email field shows 'Invalid email' in red as soon as you type the first letter. What timing is better?",
      options: [
        "Keep checking on every keystroke, but show the message in grey",
        "Only check on the server after submit",
        "Never validate email addresses, because formats vary too much",
        "Check when the person leaves the field, then re-check live once an error is showing",
      ],
      answer: 3,
      why: "People deserve to finish typing before being judged, and once they are fixing a mistake they want to see it clear immediately. A grey message is still a premature error. Server-only checks are the tempting simple option, but they make people wait until the end to discover every problem.",
    },
    {
      q: "A sign-up form puts name, email, phone and password in two columns to look compact. What is the main risk?",
      options: [
        "People skip fields or fill them in the wrong order because the reading path zigzags",
        "WCAG does not allow two-column forms",
        "The form will look too short to be trustworthy",
        "Labels will have to move to the left of each field",
      ],
      answer: 0,
      why: "A single column gives one obvious path; two columns force people to work out the order, and some fields get missed. WCAG has no rule against columns, so that option is a trap; the real cost is forms left unfinished.",
    },
    {
      q: "Which setup suits a 16-digit card number on a phone?",
      options: [
        "Type number, to get the number keyboard",
        "A text input with inputmode numeric and autocomplete cc-number that accepts spaces",
        "Four separate boxes of four digits",
        "A text input with no attributes, so any format works",
      ],
      answer: 1,
      why: "inputmode numeric brings up the number pad without the side effects of type number, such as spinner arrows and values changing on scroll, and cc-number lets browsers fill the card. Four boxes look tidy but break pasting and autofill.",
    },
  ],
  practice: [
    "lab-form-fix",
    {
      type: "choice",
      title: "Pick the input",
      intro: "Choose the best way to ask for each piece of information.",
      items: [
        {
          prompt: "A UK postcode in a delivery address form.",
          options: [
            "A text input about eight characters wide, with autocomplete postal-code, accepting it with or without the space",
            "A dropdown listing every postcode area",
            "Type number, because postcodes contain digits",
          ],
          answer: 0,
          why: "UK postcodes mix letters and digits, so type number cannot hold them. A right-sized text field with autocomplete lets most people fill it in one tap.",
        },
        {
          prompt: "Date of birth on a government-style application form.",
          options: [
            "A calendar picker that opens on today's date",
            "Three dropdowns for day, month and year",
            "Three short text fields for day, month and year, with numeric input mode",
          ],
          answer: 2,
          why: "People know their birth date and can type it quickly. A picker that starts today makes them click back through decades, and dropdowns are slow to scroll.",
        },
        {
          prompt: "A six-digit code sent by text message.",
          options: [
            "Type number",
            "One text input with inputmode numeric and autocomplete one-time-code",
            "Six separate boxes that block pasting",
          ],
          answer: 1,
          why: "One-time-code lets phones offer the code straight from the message, and a single field accepts a paste. Separate boxes often break both.",
        },
        {
          prompt: "A mobile phone number in a contact form.",
          options: [
            "Type tel with autocomplete tel, accepting spaces, brackets and a leading plus",
            "Three boxes for area code, prefix and number",
            "Type number, so letters cannot be entered",
          ],
          answer: 0,
          why: "Type tel brings up the phone keypad and autocomplete fills the number. Split boxes assume one country's format, and type number rejects the plus sign and spaces.",
        },
        {
          prompt: "Choosing a new password during sign-up.",
          options: [
            "Block pasting so people type it carefully",
            "Ask for it twice and block pasting in both fields",
            "Allow pasting, offer a 'Show password' toggle, and list the rules before people type",
          ],
          answer: 2,
          why: "Pasting helps password managers produce strong, unique passwords, which is why the NCSC advises allowing it. Showing the rules up front prevents the error instead of reporting it.",
        },
      ],
    },
    {
      type: "rewrite",
      title: "Fix the error messages",
      intro: "Each message below tells people something went wrong and nothing else. Make each one say how to fix it.",
      task: "Rewrite all three error messages so each says what is wrong and how to put it right.",
      given: "1) Invalid input. (Email field; the person typed sam@gmail) 2) Error 422: DOB required. 3) Password does not meet requirements.",
      rubric: [
        "Each message names the field or the specific problem",
        "Each one says how to fix it, with an example where that helps",
        "Plain words, with no error codes, jargon or blame",
      ],
      model: "1) Enter an email address in the correct format, like name@example.com. 2) Enter your date of birth. 3) Your password must be at least 12 characters. Add 4 more characters.",
    },
  ],
  journal: "Go through a sign-up or checkout on your phone today, stopping before you pay. Note every field, which keyboard appeared, where autofill helped, and how errors behaved. Write down the one field you would remove and why.",
  terms: ["form-label", "hint-text", "placeholder", "inline-validation", "error-summary", "input-type", "autocomplete"],
});
