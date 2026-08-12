# MANIFEST V3.1 — AI Becoming Coach

## New
- Real server-side OpenAI integration
- AI-personalized daily identity
- AI manifestation
- AI repeat-after-me affirmations
- AI visualization
- AI Today's Move
- AI journal prompt
- AI future-self message
- Ask MANIFEST coaching screen
- Daily AI result cached locally so normal navigation does not repeatedly call the API

## Security
The API key is NOT included in this repository. The browser calls `/api/manifest`. The Vercel serverless function reads `OPENAI_API_KEY` from Vercel's server environment.

## Files to deploy
Root:
- index.html
- manifest.json
- sw.js
- icon.svg
- README.md
- package.json

Folder:
- api/manifest.js

## Vercel environment variable
In Vercel:
Project → Settings → Environment Variables

Name:
OPENAI_API_KEY

Value:
your secret OpenAI API key

Apply it to Production (and Preview if you want AI to work in preview deployments). Save it, then Redeploy the project so the new deployment receives the environment variable.

Never paste the secret into index.html, GitHub, README, or any client-side JavaScript.

## First test
After GitHub/Vercel redeploy:
https://manifest-app-theta.vercel.app/?v=31

1. Open Today.
2. Tap PERSONALIZE WITH AI.
3. Wait for the AI ritual page.
4. Tap USE THIS AS TODAY'S RITUAL.
5. Check Today's Identity, Manifestation and Today's Move.
6. Open Journal and Future Me to see AI content.
7. Open ASK MANIFEST and ask a question.

If an AI call fails, the preset V3 experience continues to work.
