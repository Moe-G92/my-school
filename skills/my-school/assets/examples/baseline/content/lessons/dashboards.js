L({
  id: "dashboards",
  part: 6,
  n: 35,
  title: "Dashboards and data-heavy tools",
  short: "How to build dashboards from real questions, pick honest charts, set tables properly and handle filters and empty data.",
  minutes: { read: 5, watch: 15, practice: 20 },
  body: `
## Start from the questions

Most bad dashboards start from whatever data happens to be in the database. Good ones start from the people using them and the questions they ask. Stephen Few, in Information Dashboard Design (2006), described a **dashboard** as the most important information for a goal, arranged on one screen so it can be monitored at a glance.

Questions come in three kinds. Monitoring asks whether anything is wrong right now. Analysis asks why something changed, such as last week's drop in sign-ups. Reporting asks how a period went. One screen rarely serves all three, so decide which you are building.

Write down the three to five questions the screen must answer. Every chart should answer one of them. A chart that answers none is decoration, however good it looks.

Lay it out in the order people need it, with the most important number at the top left where the reading patterns from lesson 7 start. Ben Shneiderman's guideline from 1996 still describes the flow well: overview first, zoom and filter, then details on demand.

## Numbers need context

A card that says "1,284 sign-ups" tells you nothing until you know whether that is good. Every **KPI** (key performance indicator) needs a comparison: the previous period, a target or a trend. A useful KPI card has a label, the value, the change with its direction in words or an arrow, and often a **sparkline**, Edward Tufte's name for a small, word-sized line chart that shows the trend without axes.

Colour the change by whether it is good or bad news. Up is good for revenue and bad for refunds, churn and error rates. Keep an arrow or a sign next to the colour, so the meaning survives for people who cannot tell red from green (lesson 12).

## Choose charts honestly

William Cleveland and Robert McGill's 1984 experiments found people compare values most accurately by position along a common scale, then by length, and much less accurately by angle or area. That one finding explains most chart advice.

- Comparing categories: a bar chart, sorted by value unless the categories have a natural order. Use horizontal bars when labels are long.
- Change over time: a line chart.
- Part of a whole: a single stacked bar, or a pie with two or three slices at most.
- Spread of values: a histogram.
- Relationship between two measures: a scatter plot.

[[fig:fig-chart-choice]]

Honesty matters as much as the chart type. Bar charts must start at zero, because the bar's length is the value. Line charts may zoom in on a range, as long as the axis is labelled. Avoid 3D, which distorts size, and dual axes, which let you make any two lines look related. Tufte called decoration that carries no data **chartjunk**. Label lines directly where you can instead of using a legend, use grey for context and one accent colour for what matters, and mark incomplete periods, so that today's half-finished bar is not read as a collapse.

> **Common mistake:** AI-generated dashboards love four identical KPI cards with green "+12%" badges, a donut chart and a gradient area chart with no axis labels. It looks like a dashboard and answers nothing. Ask what each element is for, and check whether the sample numbers even add up.

## Tables are the workhorse

In data-heavy tools, people often spend more time in tables than in charts.

- Left-align text. Right-align numbers and their column headers, so digits of the same value line up and magnitudes can be compared down the column.
- Use **tabular figures**, digits that are all the same width, set with the CSS property font-variant-numeric. Many interface fonts default to proportional digits, which makes number columns wobble.
- Keep the same number of decimal places down a column, use thousands separators, and put units in the header, such as "Revenue (£)", instead of repeating them in every cell.
- Never centre data. Keep the header row sticky, freeze the first column on wide tables, and show which column is sorted and in which direction.

**Information density** is how much data fits in a view. Experts scanning hundreds of rows want it high, which is why tools like Linear and spreadsheet apps feel tight. Density works when alignment and spacing are consistent; it fails when you just shrink the type. Offer a compact and a comfortable row height when your users vary.

> **Rule of thumb:** Text left, numbers right, figures tabular, units in the header. If you cannot say which question a chart answers, delete it.

## Filters and empty states

Put global filters, such as the date range, at the top, always visible, with the active values shown as chips that can be cleared one by one, plus a reset. Store filters in the URL so a view can be shared and survives a reload.

Design for missing data, because three different situations look identical as a blank chart:

- Zero means the number really is zero, so show 0.
- No data yet means tracking has just started, so say when data will appear.
- Failed to load is an error, so say so and offer to retry.

While data loads, give each card its own skeleton so the layout does not jump.

## Using this with your AI tools

Start the prompt with the questions people ask. "The ops lead needs to know each morning whether any region is behind target" produces a better dashboard than "make an analytics dashboard".

Useful vocabulary: "KPI card with comparison to previous period", "sorted horizontal bar chart starting at zero", "line chart with labelled axes", "direct labels instead of a legend", "one accent colour, everything else grey", "right-aligned numeric columns with tabular figures", "sticky header, compact density", "filters stored in the URL", "separate zero, no-data and error states".

Then check the output for honesty: where axes start, what colours mean, whether units are stated, and whether the sample data is plausible.

> **Prompt:** Build a dashboard that answers three questions: are we on target this month, which channel drives the most sign-ups, and which accounts are at risk. Use KPI cards with change versus last month, a sorted bar chart starting at zero, and a table with right-aligned tabular figures.
`,
  takeaways: [
    "Write down the three to five questions a dashboard must answer before choosing a single chart.",
    "Every KPI needs a comparison, and change should be coloured by whether it is good or bad news, since up is bad for refunds and churn.",
    "People judge position and length far better than angle or area, so default to bar and line charts.",
    "Bar charts start at zero; avoid 3D, dual axes and decoration that carries no data.",
    "In tables, align text left and numbers right with tabular figures, and put units in the header.",
  ],
  check: [
    {
      q: "The head of customer support asks you for a dashboard. What should you do first?",
      options: [
        "Choose a charting library that supports many chart types",
        "List every metric available in the support database",
        "Design four KPI cards for the most common support metrics",
        "Ask which decisions they make, how often, and what they need to know to make them",
      ],
      answer: 3,
      why: "A dashboard is only as good as the questions it answers. Listing all available metrics feels thorough, but it produces a screen built around the database instead of around the person's decisions.",
    },
    {
      q: "You need to show monthly revenue for the last 18 months. Which is the best choice?",
      options: [
        "A pie chart with one slice per month",
        "A line chart with a labelled y-axis",
        "Eighteen KPI cards in a grid",
        "A donut chart for each month",
      ],
      answer: 1,
      why: "Change over time is what line charts are for, and position along a common scale is what people judge best. A pie chart might seem to show 'share of the period', but angles are hard to compare and order over time is lost.",
    },
    {
      q: "In an invoices table, the Amount column is centred and the font uses proportional digits. Amounts are hard to compare. What is the fix?",
      options: [
        "Right-align the amounts and their header, switch to tabular figures, and use consistent decimal places",
        "Make the amounts bold so they stand out",
        "Add zebra stripes to every other row",
        "Left-align everything for consistency",
      ],
      answer: 0,
      why: "Right alignment with fixed-width digits lines up units, tens and hundreds, so magnitudes can be read down the column. Left-aligning everything is tempting for neatness, but it puts £9.50 and £1,200.00 starting at the same point, hiding the difference in size.",
    },
  ],
  practice: [
    "lab-chart-pick",
    "lab-table",
    {
      type: "choice",
      title: "What is wrong with this chart",
      intro: "Each scenario describes a chart or card from a real-looking dashboard. Pick the best fix.",
      items: [
        {
          prompt: "A bar chart of sign-ups by channel starts its y-axis at 900, so Email (950) looks six times bigger than Social (910).",
          options: ["Start the axis at zero so bar length reflects the real values", "Make the chart 3D so the bars stand out", "Turn it into a pie chart"],
          answer: 0,
          why: "A bar's length is its value, so a truncated axis exaggerates differences. 3D adds more distortion, and a pie makes the comparison harder.",
        },
        {
          prompt: "A KPI card reads 'Refund rate +14%' in green with an upward arrow.",
          options: ["Keep it, because up arrows are always green", "Show it as a warning, since more refunds is bad, and keep the arrow and sign so it does not rely on colour", "Remove the arrow and keep the green"],
          answer: 1,
          why: "Colour should carry meaning (good or bad), and a rising refund rate is bad news. The arrow and sign keep the meaning clear for people with colour vision deficiencies.",
        },
        {
          prompt: "A line chart of daily orders plunges on its last point, which is today, half way through the day.",
          options: ["Switch to a bar chart", "Remove today from all charts", "Mark today as incomplete, for example with a dashed segment labelled 'so far'"],
          answer: 2,
          why: "An incomplete period looks like a collapse unless it is marked. Hiding today loses useful information, and a bar chart has the same problem.",
        },
        {
          prompt: "One chart shows revenue (£) and number of orders on two different y-axes, and the lines cross dramatically in March.",
          options: ["Add a third measure on another axis", "Split it into two charts stacked on the same time axis", "Make one of the lines dashed"],
          answer: 1,
          why: "With two scales, the designer chooses where lines cross, so the crossing means nothing. Two aligned charts let people compare timing honestly.",
        },
        {
          prompt: "Ten product categories are shown in a pie chart with a colour legend underneath.",
          options: ["Use a donut chart instead", "Make the legend larger", "Use a horizontal bar chart sorted by value, with labels next to the bars"],
          answer: 2,
          why: "Ten slices are impossible to compare by angle, and a legend forces people to match colours back and forth. Sorted bars with direct labels are read in seconds.",
        },
      ],
    },
  ],
  journal: "Open a dashboard you use, such as your hosting analytics, your payment provider or your bank's spending view. For each chart or card, write the question it answers. Note any element where you cannot name one, and what you would replace it with.",
  terms: ["dashboard", "kpi", "sparkline", "chartjunk", "tabular-figures", "information-density"],
});
