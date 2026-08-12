# MANIFEST V2 — Live Upgrade

This is a drop-in replacement for the V1 GitHub/Vercel deployment.

## Replace in GitHub
Upload these files to the ROOT of your existing `manifest-app` repository and choose **Replace** when GitHub detects matching files:

- `index.html`
- `manifest.json`
- `sw.js`
- `icon.svg`

Commit the changes. Vercel should redeploy automatically.

## What V2 includes
- First-run onboarding
- Personalized goal/focus profile
- Dynamic daily manifestations
- Six-stage guided morning ritual
- Repeat-after-me experience
- Future Me letter and visualization
- Goal-specific daily action
- Daily journal
- Persistent local data
- Real session/action/journal counts
- Streak tracking based on completed sessions
- 28-day activity display
- Program preview
- Mobile PWA install support
- Offline app shell

## Important
This build intentionally does NOT expose an AI API key in browser code. The manifestation generator is personalized locally. The next production layer should add a secure server-side AI endpoint, authentication/cloud sync, push notifications, voice guidance and billing.

## Test after deployment
1. Open the live Vercel URL.
2. Complete onboarding.
3. Run a ritual through all six steps.
4. Complete Today's Move.
5. Save a journal entry.
6. Open Progress and verify counts.
7. Refresh the app and verify your profile/data remain.
