# MANIFEST V1 — Installable MVP

This is a mobile-first Progressive Web App (PWA) prototype.

## Use
Serve this folder from HTTPS or localhost, then open `index.html` through that server. A PWA needs a web manifest and a secure context to be installable in supporting browsers.

### Local test
Python:
`python -m http.server 8000`

Then visit:
`http://localhost:8000`

On a phone, deploy the folder to an HTTPS host. On iPhone, use the browser's Share menu and Add to Home Screen. On supported browsers, the app can also expose an install prompt.

## Included
- Daily manifestation
- Repeat-after-me guided session
- Goal personalization
- Journal persistence
- Streak tracking
- Installable PWA manifest
- Service worker/offline app shell
- App icon
