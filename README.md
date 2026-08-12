# MANIFEST V2.2 — Button Fix

This fixes the JavaScript syntax error that caused the onboarding form to display while all app buttons were unresponsive.

## Upload to GitHub
Replace these five files in the root of the existing manifest-app repository:
- index.html
- manifest.json
- sw.js
- icon.svg
- README.md

Commit the changes and allow Vercel to redeploy.

## First launch after deployment
Open:
https://manifest-app-theta.vercel.app/?v=22

The query string bypasses the previous cached page.

## Validation completed
The embedded JavaScript was syntax-checked with Node before packaging.

## Test
1. Enter a name.
2. Tap Career, Confidence, Discipline, Relationships, Peace, and Wealth.
3. Confirm the gold selected state moves to the tapped choice.
4. Enter a future goal.
5. Tap CREATE MY DAILY RITUAL.
6. Test all five bottom navigation buttons.
7. Complete a morning ritual.
