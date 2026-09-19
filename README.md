# ESB Brand Suite

Cross-platform Expo app for iOS, Android, and web. The current client includes the brand-studio dashboard, provider selection, and a secure backend contract for Gemini and Grok.

## Run

```bash
npm install
cp .env.example .env
npm run start
```

Use `npm run web` for the browser, `npm run ios` for iOS Simulator, or `npm run android` for Android Emulator.

## AI integration

The client calls `POST /api/ai/brief` with `{ prompt, provider }`, where provider is `gemini` or `grok`. Implement this endpoint in a server or serverless function and keep `GEMINI_API_KEY` and `XAI_API_KEY` on the server. The Expo app cannot safely hold either secret.

Expected response:

```json
{ "provider": "grok", "text": "...", "requestId": "..." }
```

## Production readiness audit

- [x] iOS, Android, and web entry points
- [x] Typed client API boundary and explicit loading/error states
- [x] Provider choice for Gemini/Grok
- [x] No provider secrets in the mobile bundle
- [ ] Backend authentication and per-user authorization
- [ ] Rate limiting, quotas, input validation, and abuse protection
- [ ] Persistent projects/database
- [ ] Signed asset uploads and image export
- [ ] Sentry/crash reporting and analytics
- [ ] Push notification credentials
- [ ] Apple/Google in-app purchase configuration, if monetized
- [ ] Google OAuth credentials and consent-screen verification for Drive, Calendar, Gmail, or Sheets
- [ ] App icons, splash assets, privacy policy, terms, and store metadata

“Free tier” availability and limits vary by provider and can change. Google APIs also require a Google Cloud project, enabled APIs, OAuth consent configuration, and user authorization; they cannot be connected safely by a client-only app or without credentials.
