# MANIFEST V2.1 — Safari / Blank Screen Fix

This package fixes the blank content area seen after the V2 deployment.

## Upload these 5 files to the ROOT of the existing GitHub repository
- index.html
- manifest.json
- sw.js
- icon.svg
- README.md

Replace the matching files and Commit changes. Vercel should redeploy automatically.

## Important after Vercel finishes
Open the live URL in Safari and add `?v=21` to the end once, for example:
`https://YOUR-APP.vercel.app/?v=21`

This bypasses the old cached page. After the corrected app appears, normal launches can use the regular URL.

## Fixes
- Onboarding is visible even before JavaScript initializes
- App boot is delayed until page load and protected by a fallback
- Install prompt is null-safe
- New service worker cache version
- Old caches are deleted
- Navigation requests are network-first
- New PWA manifest ID forces an updated app identity/cache path
