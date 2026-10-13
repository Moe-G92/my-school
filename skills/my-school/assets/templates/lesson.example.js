// A compact example lesson showing every field and all four inline exercise types.
// A real lesson body is 750–1,050 words; see assets/examples/baseline/content/lessons/ for full ones.
L({
  id: "compounding",
  part: 1,
  n: 3,
  title: "How compounding works",
  short: "Why small, regular amounts grow into large ones, and the one variable that matters most.",
  minutes: { read: 5, watch: 15, practice: 15 },
  body: `
## Growth on growth

When returns are added to the balance, the next period's returns are earned on a bigger number. That is **compounding**: growth on growth. Over one year it looks like simple interest. Over thirty it looks like a different animal.

[[fig:fig-compound-curve]]

> **Rule of thumb:** Divide 72 by the annual rate to estimate how many years money takes to double. At 6% that is about 12 years.

## Time beats rate

Doubling the time does more than doubling the rate for most realistic horizons, because the curve bends upward late. Starting five years earlier often matters more than finding a slightly better return.

> **Common mistake:** Comparing two options by their first-year difference. The gap that matters shows up in year twenty.

## Putting it to work

Pick one recurring amount you could set aside. Use the lab below to see what 10, 20 and 30 years do to it.

> **Try it now:** Write down your current savings rate as a percentage of income.
`,
  takeaways: [
    "Compounding means returns earn returns.",
    "The rule of 72 estimates doubling time: 72 divided by the rate.",
    "Time in the market usually beats a small edge in rate.",
    "Judge long-term choices by their long-term gap, not year one.",
  ],
  check: [
    { q: "At 8% a year, roughly how long does money take to double?", options: ["About 5 years", "About 9 years", "About 14 years", "About 20 years"], answer: 1, why: "72 / 8 = 9. The 14-year answer is what you get with simple interest thinking." },
    { q: "Which change usually grows a 30-year balance most?", options: ["Starting 5 years earlier", "A 0.2% better rate", "Checking the balance monthly"], answer: 0, why: "Extra years sit at the steep end of the curve. A tiny rate gain compounds too, but far less." },
    { q: "Two plans differ by £40 after year one. What should you compare?", options: ["The £40", "The difference after the full horizon", "Which plan is more popular"], answer: 1, why: "Compounding hides most of the difference in later years." },
  ],
  practice: [
    "lab-compounding",
    { type: "choice", title: "Spot the compounding", intro: "Which of these compound?", items: [
      { prompt: "A savings account pays interest into the same account each month.", options: ["Compounds", "Simple interest", "Neither"], answer: 0, why: "Interest joins the balance, so next month earns on it." },
      { prompt: "A bond pays you a fixed coupon that you spend.", options: ["Compounds", "Simple interest", "Neither"], answer: 1, why: "Spent coupons never join the balance." },
    ] },
    { type: "sort", title: "Helps or hurts", intro: "Sort each habit.", buckets: ["Helps compounding", "Hurts compounding"], items: [
      { text: "Reinvesting dividends", bucket: 0, why: "Returns join the base." },
      { text: "High annual fees", bucket: 1, why: "Fees compound against you." },
    ] },
    { type: "order", title: "Doubling sequence", intro: "Order by doubling time, fastest first.", items: ["12% a year", "8% a year", "4% a year"], why: "Higher rates double sooner: 6, 9 and 18 years by the rule of 72." },
    { type: "rewrite", title: "Explain it to a friend", intro: "Teaching is the test of understanding.", task: "Explain compounding in two sentences to someone who has never invested.", given: "", rubric: ["Uses an everyday example", "Mentions returns earning returns", "Avoids jargon"], model: "If you leave the interest in the account, next year you earn interest on that interest too. Over decades that snowball does most of the work." },
  ],
  journal: "Find one recurring cost in your life and work out what it would grow to over 20 years at 5%. Write what surprised you.",
  terms: ["compounding", "rule-of-72"],
});
