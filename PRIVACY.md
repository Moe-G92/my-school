# Privacy policy

My School is an open-source skill. It's a set of instructions, templates and local scripts that an AI agent uses to build a learning website for you.

## What the skill collects

Nothing. The skill has no servers, analytics or telemetry, and it never sends anything to its authors. Its scripts run on your own machine (or in your agent's sandbox) and only read and write files in the project folder they create, plus one temporary image during optional checks.

## While your school is being built

Your agent searches the web and fetches public pages (for example YouTube's oEmbed endpoint, podcast pages and articles) to confirm that each recommended link exists. This research goes through your agent and its provider under their own terms. In Claude, the finished site is published as a private artifact in your own account.

## The sites it builds

- **Your progress and journal** are stored in your browser. When the site is a Claude artifact, they're also stored in your private storage inside that artifact, where only you can read them. People you share the page with can't see them.
- **The coach and feedback on your work** send your question or the work you submit, with the course's lesson list, to Claude through your own Claude account. This happens only when you press a button, and only after you allow it the first time. Anthropic's privacy policy applies to that use.
- **Third-party resources:** the sites load fonts from Google Fonts and two small libraries (marked and DOMPurify) from cdnjs. Those services receive ordinary web requests, including your IP address, under their own policies. Videos, podcasts and articles open on third-party sites only when you click them.
- There are no ads, trackers or analytics.

## The installer

`install.sh` downloads this repository from GitHub and copies the skill into skills folders on your machine. It sends nothing else.

## Contact

Questions or concerns: open an issue at https://github.com/Moe-G92/my-school/issues.
