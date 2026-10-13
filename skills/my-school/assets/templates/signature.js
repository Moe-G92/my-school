/* signature.js (optional): the school's home-page hero. One memorable element drawn from the subject's own world,
   that also teaches something. Baseline drew real typographic guidelines behind its name; a music school might set
   its name on a stave and play the notes; a chess school might show a famous position. Delete this file to use the
   plain default hero (the name set large). Engine helpers ($, h, esc, S, Router...) are available here. */
SITE.hero = (el) => {
  el.innerHTML = `<h1 class="hero-name" style="--len:${SITE.name.length}">${esc(SITE.name)}</h1>`;
  // Draw or animate here. Respect prefers-reduced-motion, keep it complete at rest, and register cleanup:
  // Router.onLeave(() => observer.disconnect());
};
