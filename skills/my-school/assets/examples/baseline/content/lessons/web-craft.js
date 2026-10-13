L({
  id: "web-craft",
  part: 4,
  n: 30,
  title: "Polish and review",
  short: "Perceived speed, every state, dark mode, the small details, and a systematic way to review an AI-built site.",
  minutes: { read: 5, watch: 12, practice: 20 },
  body: `
## Speed is a feeling

People judge speed by what they see happen, which is why designers talk about **perceived performance**. Jakob Nielsen's response-time limits, drawn from older research by Robert Miller, still hold: about 0.1 seconds feels instant, about 1 second keeps your train of thought though you notice the wait, and about 10 seconds is the limit of attention. The Doherty threshold of about 400 ms from lesson 22 sits between the first two.

Being fast matters. Google's **Core Web Vitals** measure loading (Largest Contentful Paint, good under 2.5 seconds), responsiveness (Interaction to Next Paint, good under 200 ms) and visual stability (Cumulative Layout Shift, good under 0.1). On most sites the biggest wins are images compressed and sized for their slot, fewer web fonts and less JavaScript.

Feeling fast matters as much. **Optimistic UI** shows the result before the server confirms it: a heart turns red the moment you tap it, and quietly reverts if the request fails. **Skeleton screens** show the shape of the content while it loads, so the page appears to arrive in place. And reserve space for images and embeds with set dimensions or an aspect ratio, because **layout shift**, content jumping as things load, is what makes people tap the wrong link.

## Every screen has more than one state

Mock-ups show the ideal state with perfect data, yet real screens spend much of their life in other states. Scott Hurff's **UI stack** names five that every screen needs.

- **Blank:** first use, or nothing yet, with one clear next action (lesson 24).
- **Loading:** a skeleton or progress indicator that matches the final layout.
- **Partial:** one item, or a half-filled profile, which should still look intentional.
- **Error:** what went wrong and how to recover, without losing the person's work.
- **Ideal:** plus its stress cases, such as a 40-character name, a thousand rows, a missing photo and a slow connection.

The component states from lesson 17 are the same idea at a smaller scale.

> **Common mistake:** AI tools build the ideal state with tidy sample data and stop there. Ask for every state by name, then test with ugly data: long names, empty lists, failed requests.

## Dark mode done properly

Dark mode is a second colour system, and inverting the light one does not produce it.

- Use dark grey for large surfaces. Material Design's dark theme starts from #121212, and bright text on pure black can seem to glow or blur for some readers.
- Show elevation with lighter surfaces, because shadows barely register on dark backgrounds (lesson 16).
- Lighten and desaturate brand colours, which otherwise vibrate against dark grey and often fail contrast.
- Re-check every text and control pair against WCAG AA in the dark theme as well as the light one (lesson 12).
- Swap images and logos that vanish on dark, like a black logo on a transparent background.
- Follow the system setting through prefers-color-scheme, offer a toggle, and apply the theme before the page paints so nobody sees a white flash.

With semantic tokens from lesson 18, all of this is a change of values in one place.

## The details people do notice

- **Favicon.** The small icon in tabs and bookmarks. Use a simplified mark that reads at 16 pixels, supply an SVG with a PNG fallback plus a 180 by 180 Apple touch icon, and check it on light and dark tabs.
- **Page titles.** Unique and front-loaded, such as "Pricing | Baseline", because they label tabs, bookmarks and search results.
- **Social preview.** When someone shares your link in a chat app or on LinkedIn, the card comes from **Open Graph** tags: a title, a description and an image, commonly 1200 by 630 pixels. Without them you get a bare link or a random image.
- **Consistency.** The same action looks and reads the same everywhere, with spacing from the scale, one radius family and one icon set. Small mismatches make a site feel unfinished even when nobody can say why.
- **The rest.** A helpful 404 page, the right copyright year, links that go somewhere and forms that actually send.

> **Try it now:** Paste the address of a site you have built into a message to yourself, and look at the preview card and the browser tab. Note what a stranger would see first.

## Review an AI-built site in passes

Looking for everything at once means noticing very little. Review in passes, one lens at a time, and log what you find with a severity from lesson 23.

1. **Truth.** Check that every claim, number, testimonial and logo is real, and delete placeholders. Content comes first because changing it moves everything else.
2. **Hierarchy.** Squint (lesson 7): one focal point and one primary action per screen.
3. **Layout and spacing.** Alignment, the spacing scale, consistent radii.
4. **Type and colour.** The scale, line length, and contrast in both themes.
5. **States.** Blank, loading, error, long data, a slow connection.
6. **Responsive.** Every width from 320 px up, touch, nothing hover-only.
7. **Accessibility.** Keyboard, focus, alt text, headings, reduced motion.
8. **Performance and details.** Lighthouse on a throttled connection, then favicon, titles, social preview and the 404 page.

## Using this with your AI tools

The passes double as prompts: after each one, hand the tool a tight list of problems, locations and fixes. Ask for states by name ("blank, loading, error and long-content states for the invoices table"), for the meta details ("a favicon set, unique page titles and Open Graph tags with a 1200 by 630 image") and for dark mode built on tokens. Ask it to run Lighthouse and fix the largest problem first.

Run the audit checklist after every significant change, as well as before launch, and remove anything the tool invented. AI tools produce convincing testimonials, user counts and logos; publishing them misleads people, and for reviews UK consumer law bans it outright.

> **Prompt:** Audit this page in passes (content truth, hierarchy, spacing, type and colour, states, responsive, accessibility, performance and meta details); for each pass list problems with location, severity from 0 to 4 and the fix, and change no code until I approve the list.
`,
  takeaways: [
    "Respond within about 100 ms, show progress after a second, and never let the layout jump.",
    "Design every state: blank, loading, partial, error, and ideal with ugly data.",
    "Dark mode is a second palette: dark grey surfaces, softer brand colours, contrast re-checked.",
    "Favicon, page titles and social previews are how your site looks everywhere except on itself.",
    "Review in passes, one lens at a time, starting with whether the content is true.",
  ],
  check: [
    {
      q: "On an article page, the text jumps down when a large image finishes loading, and people tap the wrong link. What is the best fix?",
      options: [
        "Reserve the image's space with set dimensions or an aspect ratio",
        "Lazy-load the image",
        "Put a loading spinner over the whole page",
        "Serve the image from a faster server",
      ],
      answer: 0,
      why: "The problem is layout shift: the browser does not know the image's size until it arrives. Reserving the space stops the jump. A faster server is tempting, but it shortens the wait while the jump still happens, and lazy-loading can make it later and more surprising.",
    },
    {
      q: "Your brand's saturated blue looks harsh and seems to vibrate on your dark theme's #121212 background. What is the best adjustment?",
      options: [
        "Keep it exactly, because brand colours must never change",
        "Switch the background to pure black for more contrast",
        "Use a lighter, less saturated tint of the blue in dark mode and re-check contrast",
        "Add a soft glow around blue elements",
      ],
      answer: 2,
      why: "Brand colours usually need a dark-mode variant: lighter and calmer, still recognisably the brand, checked against AA. Pure black is tempting because it raises contrast, but it makes the vibration and glare worse.",
    },
    {
      q: "You are about to review an AI-generated landing page. Which pass should come first?",
      options: [
        "Fine-tuning the spacing",
        "Checking that every claim, number, testimonial and logo is real, and removing what is not",
        "Compressing the images",
        "Adding dark mode",
      ],
      answer: 1,
      why: "Content changes everything downstream, and invented proof is the most damaging problem an AI-built page can have. Spacing is tempting to start with because it is visible and satisfying, but you would be polishing sections that may be rewritten or removed.",
    },
  ],
  practice: [
    "lab-audit",
    {
      type: "choice",
      title: "Speed, states and details",
      intro: "Pick the fix a careful designer would make.",
      items: [
        {
          prompt: "Tapping 'Like' on a post waits about 600 ms for the server before the heart turns red.",
          options: ["Add a spinner inside the heart", "Turn the heart red immediately and revert quietly if the request fails", "Leave it, because 600 ms is fast"],
          answer: 1,
          why: "Optimistic UI makes a low-risk action feel instant. A spinner draws attention to a wait that does not need to exist.",
        },
        {
          prompt: "Generating a yearly report takes about 20 seconds.",
          options: ["Show a progress indicator and let people keep working, with a notification when it is ready", "Show a spinner and block the screen", "Show nothing until it is done"],
          answer: 0,
          why: "Twenty seconds is past the limit of attention. People need to see progress and be free to do something else meanwhile.",
        },
        {
          prompt: "A dashboard shows a blank white area for two seconds while its data loads.",
          options: ["Show the word 'Loading' in the middle", "Hide the dashboard until everything is ready", "Show skeletons in the shape of the cards and charts that are coming"],
          answer: 2,
          why: "Skeletons make the page feel like it is arriving and prevent layout shift when the real content lands.",
        },
        {
          prompt: "The favicon is the full logo with its wordmark, and it is an unreadable smudge in browser tabs.",
          options: ["Use a simplified mark, such as the symbol or first letter, designed to read at 16 px", "Make the wordmark bolder", "Remove the favicon"],
          answer: 0,
          why: "At 16 pixels only a simple, bold shape survives. Without a favicon, the tab shows a generic icon and your site is hard to find among open tabs.",
        },
        {
          prompt: "Sharing your site's link in a chat app shows only the bare address.",
          options: ["Shorten the URL", "Add Open Graph tags: a title, a description and a 1200 by 630 image", "Add more keywords to the page"],
          answer: 1,
          why: "Link previews are built from Open Graph tags. A clear title, description and image turn a bare link into an invitation to click.",
        },
      ],
    },
    {
      type: "order",
      title: "Review in passes",
      intro: "Put the review passes for an AI-built site in a sensible order.",
      items: [
        "Check the content is true and remove placeholders",
        "Check the hierarchy with a squint test",
        "Check layout, alignment and spacing",
        "Check type and colour in both themes",
        "Check every state with real and ugly data",
        "Check every width and touch input",
        "Check keyboard, focus, alt text and motion",
        "Check performance and the meta details",
      ],
      why: "Content comes first, because changing words changes the hierarchy and layout. Broad structural passes come before fine visual ones, so you do not polish what is about to move. States, responsive and accessibility test how a settled design behaves, and performance and meta details rarely change the design, so they come last.",
    },
  ],
  journal: "Pick a site you have built, or one you like, and run a single pass today: the states pass. Write down every state you found missing or weak, and sketch in words how you would design each one.",
  terms: ["perceived-performance", "core-web-vitals", "optimistic-ui", "skeleton-screen", "layout-shift", "ui-stack", "favicon", "open-graph"],
});
