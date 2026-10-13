#!/usr/bin/env bash
# My School installer (macOS and Linux).
#
#   curl -fsSL https://raw.githubusercontent.com/Moe-G92/my-school/main/install.sh | bash
#
# Installs the my-school skill for your user account into:
#   ~/.agents/skills/my-school   shared folder read by Codex, GitHub Copilot, Cursor, Gemini CLI, OpenCode,
#                                Windsurf, Goose, Amp, Cline and other Agent Skills clients
#   ~/.claude/skills/my-school   Claude Code (only if Claude Code is installed)
#   ~/.kiro/skills/my-school     Kiro (only if Kiro is installed)
#
# Options (pass after "bash -s --" when piping, e.g. ... | bash -s -- --project):
#   --project          install into ./.agents/skills and ./.claude/skills of the current folder instead
#   --only <targets>   comma-separated: agents,claude,kiro (default: every target that applies)
#   --ref <branch|tag> install a specific version (default: main)
#   --uninstall        remove the skill from the same places
set -euo pipefail

REPO="Moe-G92/my-school"
SKILL="my-school"
REF="main"
SCOPE="user"
ONLY=""
UNINSTALL=0

while [ $# -gt 0 ]; do
  case "$1" in
    --project) SCOPE="project" ;;
    --only) ONLY="${2:-}"; shift ;;
    --ref) REF="${2:-main}"; shift ;;
    --uninstall) UNINSTALL=1 ;;
    -h|--help) sed -n '2,19p' "$0" 2>/dev/null || true; exit 0 ;;
    *) echo "Unknown option: $1" >&2; exit 1 ;;
  esac
  shift
done

say() { printf '%s\n' "$*"; }
want() { [ -z "$ONLY" ] || printf ',%s,' "$ONLY" | grep -q ",$1,"; }

if [ "$SCOPE" = "project" ]; then
  BASE="$(pwd)"
  TARGETS=""
  want agents && TARGETS="$TARGETS $BASE/.agents/skills"
  want claude && TARGETS="$TARGETS $BASE/.claude/skills"
else
  TARGETS=""
  want agents && TARGETS="$TARGETS $HOME/.agents/skills"
  if want claude && { [ -d "$HOME/.claude" ] || command -v claude >/dev/null 2>&1; }; then TARGETS="$TARGETS $HOME/.claude/skills"; fi
  if want kiro && [ -d "$HOME/.kiro" ]; then TARGETS="$TARGETS $HOME/.kiro/skills"; fi
fi
[ -n "$TARGETS" ] || { say "Nothing to do: no matching install targets."; exit 0; }

if [ "$UNINSTALL" = "1" ]; then
  for t in $TARGETS; do
    if [ -d "$t/$SKILL" ]; then rm -rf "${t:?}/$SKILL"; say "Removed $t/$SKILL"; fi
  done
  exit 0
fi

command -v curl >/dev/null 2>&1 || { say "curl is required." >&2; exit 1; }
command -v tar >/dev/null 2>&1 || { say "tar is required." >&2; exit 1; }
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
say "Downloading $REPO ($REF)..."
curl -fsSL "https://codeload.github.com/$REPO/tar.gz/$REF" -o "$TMP/src.tgz"
tar -xzf "$TMP/src.tgz" -C "$TMP"
SRC="$(find "$TMP" -mindepth 3 -maxdepth 3 -type d -path "*/skills/$SKILL" | head -n 1)"
[ -n "$SRC" ] && [ -f "$SRC/SKILL.md" ] || { say "Could not find skills/$SKILL/SKILL.md in the download." >&2; exit 1; }

for t in $TARGETS; do
  mkdir -p "$t"
  NEW="$t/.$SKILL.new.$$"
  cp -R "$SRC" "$NEW"
  if [ -d "$t/$SKILL" ]; then rm -rf "${t:?}/$SKILL"; fi
  mv "$NEW" "$t/$SKILL"
  say "Installed $t/$SKILL"
done

say ""
say "Done. Ask your agent something like: \"I want to learn music theory from scratch, 20 minutes a day.\""
say "Building the learning site needs Node.js 18 or later."
