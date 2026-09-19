# Beginner setup guide

## What I completed

The repository now contains the iOS, Android, and web app, a Gemini/Grok selector, and a secure Vercel API function. I cannot create provider accounts, accept billing terms, or access your private keys for you.

## Easiest path to a working demo

1. Create a free Google AI Studio key at https://aistudio.google.com/ and optionally an xAI key at https://console.x.ai/.
2. Open https://vercel.com, sign in with GitHub, choose **Add New → Project**, and import `ramoneyx-netizen/esb-brand-suite`.
3. In Vercel project settings, add these environment variables for **Production, Preview, and Development**:

```text
GEMINI_API_KEY=your-key
GEMINI_MODEL=gemini-2.0-flash
XAI_API_KEY=your-key
XAI_MODEL=grok-3-mini
```

4. Deploy. Vercel automatically detects `api/ai/brief.ts`.
5. Copy the deployment URL. In the repository, create `.env` locally with:

```text
EXPO_PUBLIC_API_URL=https://your-project.vercel.app
```

6. Test the browser app from your computer using **Vercel → Visit**. Enter a brief and choose Gemini or Grok.

## Phone app

Install Node.js LTS and Expo Go on your phone. Then run:

```bash
npm install
npm run start
```

Scan the QR code. For store releases, an Expo account and Apple/Google developer accounts are required:

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform all
```

## Important limits

This is not yet a fully published production service. Google Workspace apps (Drive, Sheets, Calendar, Gmail), login, database, billing, file storage, notifications, and app-store submission each require your own accounts, consent, credentials, and configuration. Free tiers still require account ownership and may have quotas. Do not paste API keys into GitHub issues, chat, or the mobile app.
